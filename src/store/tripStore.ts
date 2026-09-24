import { create } from 'zustand'
import type { IconName } from '@/components/Icon'
import { dinnerBillItems, dinnerBill, openingBalanceCents, settledAt } from '@/data/expenses'
import { placesCatalog } from '@/data/places'
import { NOW_MINUTES, clockOf, minutesOf, todaysPlan, type PlanItem } from '@/data/itinerary'
import { dinnerPoll, people, placeShortNames } from '@/data/trip'
import { formatEuros } from '@/domain/money'
import { nettedTransfers, type Balance, type Transfer } from '@/domain/netting'
import { canClosePoll, tallyPoll, voteShare, type Vote } from '@/domain/poll'
import { billTotal, splitByItems, splitEqually, type BillItem } from '@/domain/split'

/** Everyone on the trip once Ren has joined, Ari included — the voting body
 *  and the settle-up roster. */
const allSevenIds = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira', 'ren']
/** Who can actually vote *right now*. Ren is on the trip from the moment he
 *  is added and not before, so a poll started from the quick add before that
 *  is a poll of six — otherwise the simulation casts a seventh vote for
 *  someone the buddy stack doesn't yet show, and the count reads "6 of 6"
 *  with seven votes in it. */
function rosterOf(state: { renJoined: boolean }): string[] {
  return state.renJoined ? allSevenIds : allSevenIds.filter((id) => id !== 'ren')
}
/** Every place Ari could put on the poll — "Add a place" searches the whole
 *  catalog, not just the three pre-loaded onto the poll. Used to keep
 *  `pollOptionIds` in a stable, catalog-wide order as places are toggled. */
const catalogPlaceIds = placesCatalog.map((p) => p.id)
/** The poll starts pre-loaded with just the three real-photo places — the
 *  rest of the catalog is only pulled in via "Add a place". */
const initialPollOptionIds = dinnerPoll.places.map((p) => p.id)
/** Where a simulated voter's preferred pick lands if Ari removed it from the
 *  poll before sending — falls back to whichever catalog place is still in. */
function resolveOptionId(preferred: string, included: string[]): string {
  if (included.includes(preferred)) return preferred
  return included[0] ?? preferred
}
/** The order the four non-Ren transfers auto-complete in, once Ren pays —
 *  same order `settledAt` (docs/PRODUCT_SPEC.md §3) gives their clock times. */
const autoSettleOrder = ['sven', 'bea', 'kofi', 'mira']

export type SplitMode = 'equally' | 'by-item'
export type ViewAs = 'ari' | 'nic' | 'ren'
export type Ending = 'A' | 'B'

export type ToastPayload = { title: string; detail: string; icon?: IconName; iconSize?: number }

/** The latest thing that happened on the live poll — a vote, or Ari
 *  extending the deadline — so `Ticker.tsx` has one thing to render
 *  regardless of which kind it is. */
export type PollEvent =
  | { kind: 'vote'; personId: string; optionId: string }
  | { kind: 'deadline'; minutes: number }

/**
 * One poll. The dinner poll the scenario opens on is simply the first one;
 * every poll made from the quick add is the same shape, made by the same
 * action, and lands on the same timeline — so nothing downstream has to know
 * which route it came in by.
 */
export type Poll = {
  id: string
  question: string
  /** Minutes since midnight — the time of the thing being decided, and so
   *  the timeline row this poll sits on. */
  eventMinutes: number
  /** The open slot this poll fills, when it was started from one. A poll
   *  from the quick add has none and becomes a row of its own: a poll never
   *  replaces an item already on the plan. */
  slotId: string | null
  optionIds: string[]
  deadlineMinutes: number
  sent: boolean
  closed: boolean
  votes: Vote[]
  closesInSeconds: number
  lastEvent: PollEvent | null
  nudged: boolean
  winnerId: string | null
}

/** The poll being composed, before it is sent. Both routes fill this one
 *  object — the dinner slot arrives with the question and the time already
 *  known and skips straight to the places step (04); the quick add arrives
 *  with nothing and asks for them first (18 → 13). */
export type PollDraft = {
  question: string
  eventMinutes: number | null
  /** Minutes from now until the poll closes. */
  deadlineMinutes: number | null
  slotId: string | null
  optionIds: string[]
}

interface StoryState {
  renJoined: boolean

  /** Every poll on the trip, by id, in creation order. */
  polls: Record<string, Poll>
  pollIds: string[]
  /** The poll 05 and 04c are showing. */
  activePollId: string
  draft: PollDraft
  changingVote: boolean
  /** The bell on 01 loses its unread dot once the list has been opened. */
  notificationsSeen: boolean

  billLogged: boolean
  splitMode: SplitMode
  wineSharedBy: string[]

  renPaying: boolean
  settledIds: string[]

  toast: ToastPayload | null
}

interface DemoMeta {
  viewAs: ViewAs
  ending: Ending
  speed: 1 | 2 | 4
}

interface TripStore extends StoryState, DemoMeta {
  addRen: () => void
  seeNotifications: () => void
  /** Route 1 — the empty dinner slot on 02. The slot already knows the
   *  question and the time, so this fills them in and 04 comes next. */
  startPollForSlot: (slotId: string) => void
  /** Route 2 — the quick add. Nothing is known, so 18 → 13 ask first. */
  startBlankPoll: () => void
  setPollQuestion: (question: string) => void
  setDraftEventMinutes: (minutes: number | null) => void
  togglePollOption: (placeId: string) => void
  setPollDeadline: (minutes: number) => void
  extendDeadline: (minutes: number) => void
  /** The one action both routes end at: turns the draft into a real poll,
   *  makes it the active one and starts the simulated votes. */
  sendPoll: () => void
  castVote: (personId: string, optionId: string, options?: { allowChange?: boolean }) => void
  requestChangeVote: () => void
  changeVoteTo: (optionId: string) => void
  nudgeSven: () => void
  closePollNow: () => void
  setSplitMode: (mode: SplitMode) => void
  toggleWineShare: (personId: string) => void
  logExpense: () => void
  paySettlement: () => void
  showToast: (toast: ToastPayload, ms?: number) => void
  dismissToast: () => void
  setViewAs: (viewAs: ViewAs) => void
  setEnding: (ending: Ending) => void
  setSpeed: (speed: 1 | 2 | 4) => void
  resetDemo: () => void
}

const initialWineSharedBy = dinnerBillItems.find((i) => i.id === 'wine')!.sharedBy

/** The slot the scenario's poll fills, and the time it is for. */
const DINNER_SLOT = todaysPlan.find((i) => i.id === 'dinner')!

function makePoll(draft: PollDraft, id: string): Poll {
  return {
    id,
    question: draft.question,
    eventMinutes: draft.eventMinutes ?? DINNER_SLOT.minutes,
    slotId: draft.slotId,
    optionIds: draft.optionIds,
    deadlineMinutes: draft.deadlineMinutes ?? 20,
    sent: false,
    closed: false,
    votes: [],
    closesInSeconds: (draft.deadlineMinutes ?? 20) * 60,
    lastEvent: null,
    nudged: false,
    winnerId: null,
  }
}

/** The dinner draft — what "Ask the group" on the open slot starts from. It
 *  is also the initial draft, so a cold deep link straight to 04 opens on
 *  the scenario's poll rather than an empty one. */
const dinnerDraft: PollDraft = {
  question: dinnerPoll.question,
  eventMinutes: DINNER_SLOT.minutes,
  deadlineMinutes: 20,
  slotId: 'dinner',
  optionIds: initialPollOptionIds,
}

const initialStory: StoryState = {
  renJoined: false,
  polls: {},
  pollIds: [],
  activePollId: 'dinner',
  draft: dinnerDraft,
  changingVote: false,
  notificationsSeen: false,
  billLogged: false,
  splitMode: 'by-item',
  wineSharedBy: initialWineSharedBy,
  renPaying: false,
  settledIds: [],
  toast: null,
}

/** Timers live outside the store: they must survive whichever screen happens
 *  to be mounted (docs/PRODUCT_SPEC.md §5 — "when the demo switches phones,
 *  the state is shared"), and be sweepable in one go on reset/unmount. */
let pendingTimers: ReturnType<typeof setTimeout>[] = []
let countdownInterval: ReturnType<typeof setInterval> | null = null
let toastTimer: ReturnType<typeof setTimeout> | null = null

function schedule(fn: () => void, ms: number) {
  pendingTimers.push(setTimeout(fn, ms))
}

function clearAllTimers() {
  pendingTimers.forEach(clearTimeout)
  pendingTimers = []
  if (countdownInterval) clearInterval(countdownInterval)
  countdownInterval = null
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = null
}

export const useTripStore = create<TripStore>((set, get) => {
  /** Writes a change into one poll, leaving every other poll's object
   *  identity alone so selectors memoized on state identity stay cheap. */
  function patchPoll(id: string, patch: Partial<Poll> | ((p: Poll) => Partial<Poll>)) {
    set((state) => {
      const poll = state.polls[id]
      if (!poll) return state
      const next = typeof patch === 'function' ? patch(poll) : patch
      return { polls: { ...state.polls, [id]: { ...poll, ...next } } }
    })
  }

  function closePoll(id: string) {
    const poll = get().polls[id]
    if (!poll || poll.closed) return
    const outcome = tallyPoll(poll.optionIds, poll.votes)
    patchPoll(id, { closed: true, winnerId: outcome.winnerId })
    if (countdownInterval && get().activePollId === id) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
    const shortName = outcome.winnerId ? placeShortNames[outcome.winnerId] : ''
    get().showToast({
      title: `Poll closed · ${shortName} won`,
      detail: outcome.tie
        ? `Tie broken by first vote · Added to the plan for ${clockOf(poll.eventMinutes)}`
        : `Added to the plan for ${clockOf(poll.eventMinutes)}`,
      icon: 'calendar-check',
      iconSize: 14,
    })
  }

  function maybeAutoClose(id: string) {
    const poll = get().polls[id]
    if (!poll || poll.closed || !poll.sent) return
    const voted = new Set(poll.votes.map((v) => v.personId))
    const everyoneVoted = rosterOf(get()).every((pid) => voted.has(pid))
    const timedOut = poll.closesInSeconds <= 0 && poll.votes.length > 0
    if (everyoneVoted || timedOut) closePoll(id)
  }

  function startCountdown(id: string) {
    if (countdownInterval) clearInterval(countdownInterval)
    countdownInterval = setInterval(() => {
      const state = get()
      const poll = state.polls[id]
      if (!poll || poll.closed) {
        if (countdownInterval) clearInterval(countdownInterval)
        countdownInterval = null
        return
      }
      patchPoll(id, (p) => ({ closesInSeconds: Math.max(0, p.closesInSeconds - state.speed) }))
      maybeAutoClose(id)
    }, 1000)
  }

  return {
    ...initialStory,
    viewAs: 'ari',
    ending: 'A',
    speed: 1,

    seeNotifications: () => set({ notificationsSeen: true }),

    addRen: () => {
      if (get().renJoined) return
      set({ renJoined: true })
      get().showToast({ title: 'Ren joined the trip', detail: 'Everyone was told' })
    },

    startPollForSlot: (slotId) => {
      const slot = todaysPlan.find((i) => i.id === slotId)
      set({
        draft: {
          ...dinnerDraft,
          slotId,
          eventMinutes: slot?.minutes ?? dinnerDraft.eventMinutes,
        },
      })
    },

    startBlankPoll: () =>
      set({
        draft: {
          question: '',
          eventMinutes: null,
          deadlineMinutes: null,
          slotId: null,
          optionIds: initialPollOptionIds,
        },
      }),

    setPollQuestion: (question) => set((state) => ({ draft: { ...state.draft, question } })),

    setDraftEventMinutes: (minutes) =>
      set((state) => ({ draft: { ...state.draft, eventMinutes: minutes } })),

    togglePollOption: (placeId) =>
      set((state) => {
        const included = state.draft.optionIds.includes(placeId)
        // Always leave at least two places on the poll — one option isn't a vote.
        if (included && state.draft.optionIds.length <= 2) return state
        const optionIds = included
          ? state.draft.optionIds.filter((id) => id !== placeId)
          : catalogPlaceIds.filter((id) => id === placeId || state.draft.optionIds.includes(id))
        return { draft: { ...state.draft, optionIds } }
      }),

    setPollDeadline: (minutes) =>
      set((state) => ({ draft: { ...state.draft, deadlineMinutes: minutes } })),

    /** Changes the deadline mid-poll (05's countdown pill), re-basing the
     *  remaining time by the time already elapsed rather than just resetting
     *  the clock — 6 of the original 20 gone still means 6 gone of the new
     *  30. Pushes a `lastEvent` so the ticker announces it the way a vote
     *  does. */
    extendDeadline: (minutes) => {
      const id = get().activePollId
      const poll = get().polls[id]
      if (!poll || poll.closed || !poll.sent || minutes === poll.deadlineMinutes) return
      const elapsed = poll.deadlineMinutes * 60 - poll.closesInSeconds
      patchPoll(id, {
        deadlineMinutes: minutes,
        closesInSeconds: Math.max(0, minutes * 60 - elapsed),
        lastEvent: { kind: 'deadline', minutes },
      })
      maybeAutoClose(id)
    },

    sendPoll: () => {
      const state = get()
      const draft = state.draft
      // A poll made from the dinner slot keeps the id of the slot it fills,
      // so re-sending it can't produce two dinners; one from the quick add
      // gets a fresh id and becomes its own row.
      const id = draft.slotId ?? `poll-${state.pollIds.length + 1}-${clockOf(draft.eventMinutes ?? 0)}`
      if (state.polls[id]?.sent) return

      const included = draft.optionIds
      const first = included[0] ?? 'taberna'
      const poll: Poll = {
        ...makePoll(draft, id),
        sent: true,
        votes: [{ personId: 'ari', optionId: first, order: 0 }],
      }
      set({
        polls: { ...state.polls, [id]: poll },
        pollIds: state.pollIds.includes(id) ? state.pollIds : [...state.pollIds, id],
        activePollId: id,
      })

      // The other buddies answer over ~6 s, leaving Sven for the Nudge
      // (docs/PRODUCT_SPEC.md §5). Anyone not yet on the trip is skipped
      // rather than voting from nowhere.
      const speed = state.speed
      const roster = rosterOf(state)
      const simulated: [string, string][] = [
        ['bea', 'taberna'],
        ['kofi', 'taberna'],
        ['mira', 'ramiro'],
        ['ren', 'timeout'],
        ['nic', 'timeout'],
      ]
      simulated
        .filter(([personId]) => roster.includes(personId))
        .forEach(([personId, preferred], i) => {
          schedule(() => get().castVote(personId, resolveOptionId(preferred, included)), (1200 * (i + 1)) / speed)
        })
      startCountdown(id)
    },

    castVote: (personId, optionId, options) => {
      const id = get().activePollId
      const poll = get().polls[id]
      if (!poll || poll.closed) return
      if (!rosterOf(get()).includes(personId)) return
      const existing = poll.votes.find((v) => v.personId === personId)
      if (existing && !options?.allowChange) return
      const lastEvent: PollEvent = { kind: 'vote', personId, optionId }
      if (existing) {
        patchPoll(id, (p) => ({
          votes: p.votes.map((v) => (v.personId === personId ? { ...v, optionId } : v)),
          lastEvent,
        }))
      } else {
        patchPoll(id, (p) => ({
          votes: [
            ...p.votes,
            { personId, optionId, order: p.votes.length === 0 ? 0 : Math.max(...p.votes.map((v) => v.order)) + 1 },
          ],
          lastEvent,
        }))
      }
      maybeAutoClose(id)
    },

    requestChangeVote: () => {
      if (selectActivePoll(get()).closed) return
      set({ changingVote: true })
    },

    changeVoteTo: (optionId) => {
      get().castVote('ari', optionId, { allowChange: true })
      set({ changingVote: false })
    },

    nudgeSven: () => {
      const state = get()
      const poll = selectActivePoll(state)
      if (poll.nudged || poll.closed) return
      patchPoll(poll.id, { nudged: true })
      get().showToast({ title: 'Sven was nudged', detail: 'He’ll get a reminder', icon: 'bell', iconSize: 13 })
      schedule(() => get().castVote('sven', resolveOptionId('taberna', poll.optionIds)), 2000 / state.speed)
    },

    closePollNow: () => {
      const poll = selectActivePoll(get())
      if (!canClosePoll(poll.votes)) return
      closePoll(poll.id)
    },

    setSplitMode: (mode) => set({ splitMode: mode }),

    toggleWineShare: (personId) =>
      set((state) => ({
        wineSharedBy: state.wineSharedBy.includes(personId)
          ? state.wineSharedBy.filter((id) => id !== personId)
          : [...state.wineSharedBy, personId],
      })),

    logExpense: () => {
      const state = get()
      if (state.billLogged) return
      set({ billLogged: true })
      const shares = selectDinnerShares(get())
      const paidIn = dinnerBill.totalCents - (shares.ari ?? 0)
      get().showToast({
        title: `Dinner logged · ${formatEuros(dinnerBill.totalCents)}`,
        detail: `You paid, so +${formatEuros(paidIn)} to you. Everyone’s updated.`,
      })
    },

    paySettlement: () => {
      const state = get()
      if (state.renPaying || state.settledIds.includes('ren')) return
      set({ renPaying: true })
      schedule(() => {
        set((s) => ({ renPaying: false, settledIds: [...s.settledIds, 'ren'] }))
        autoSettleOrder.forEach((id, i) => {
          schedule(
            () => set((s) => (s.settledIds.includes(id) ? s : { settledIds: [...s.settledIds, id] })),
            (800 * (i + 1)) / get().speed,
          )
        })
      }, 1000 / state.speed)
    },

    showToast: (toast, ms = 3000) => {
      if (toastTimer) clearTimeout(toastTimer)
      set({ toast })
      toastTimer = setTimeout(() => {
        set({ toast: null })
        toastTimer = null
      }, ms)
    },

    dismissToast: () => {
      if (toastTimer) {
        clearTimeout(toastTimer)
        toastTimer = null
      }
      set({ toast: null })
    },

    setViewAs: (viewAs) => set({ viewAs }),
    setEnding: (ending) => set({ ending }),
    setSpeed: (speed) => set({ speed }),

    resetDemo: () => {
      clearAllTimers()
      set((state) => ({ ...initialStory, ending: state.ending, speed: state.speed, viewAs: 'ari' }))
    },
  }
})

/** Torn down once, from the app root — sweeps every pending vote/settle timer. */
export function clearTripStoreTimers() {
  clearAllTimers()
}

// ---- Derived selectors — plain functions over the store's state, always
// recomputed fresh so a deep link (or a fast-forwarded demo) is never stale.
//
// Zustand (via `useSyncExternalStore`) compares each selector's return value
// by reference between calls; one that builds a fresh array/object every time
// looks "changed" on every render and spins into an infinite update loop.
// `memoize` caches by state identity — zustand's `set` always produces a new
// top-level state object, so this recomputes exactly when the store actually
// changes, and returns the same reference otherwise. Selectors that already
// return a primitive (string/number/boolean/null) don't need it.
function memoize<R>(fn: (state: StoryState) => R): (state: StoryState) => R {
  let lastState: StoryState | undefined
  let lastResult: R
  return (state) => {
    if (state !== lastState) {
      lastState = state
      lastResult = fn(state)
    }
    return lastResult
  }
}

export const selectBuddies = memoize((state) =>
  state.renJoined ? [...allSevenIds.slice(0, -1), 'ren'] : allSevenIds.slice(0, -1),
)

export const selectBuddyPeople = memoize((state) => selectBuddies(state).map((id) => people[id]))

/**
 * The poll 05 and 04c are showing. Before it is sent there is no poll object
 * yet, so the draft stands in — a cold deep link to the live poll then shows
 * the poll about to be made rather than nothing at all.
 */
export const selectActivePoll = memoize(
  (state): Poll => state.polls[state.activePollId] ?? makePoll(state.draft, state.activePollId),
)

export const selectPollOutcome = memoize((state) => {
  const poll = selectActivePoll(state)
  return tallyPoll(poll.optionIds, poll.votes)
})

export function selectTotalVoters(state: StoryState): number {
  return state.renJoined ? 7 : 6
}

export const selectPendingVoters = memoize((state) => {
  const poll = selectActivePoll(state)
  if (!poll.sent) return []
  const voted = new Set(poll.votes.map((v) => v.personId))
  return rosterOf(state).filter((id) => !voted.has(id))
})

export function selectYourVote(state: StoryState, personId: string): string | null {
  return selectActivePoll(state).votes.find((v) => v.personId === personId)?.optionId ?? null
}

/** The ticker's one line, whatever kind of event produced it — a vote or a
 *  deadline extension. `Ticker.tsx` just renders whatever comes back. */
export const selectTickerEvent = memoize((state) => {
  const e = selectActivePoll(state).lastEvent
  if (!e) return null
  if (e.kind === 'deadline') {
    return { person: people.ari, event: `extended the deadline to ${e.minutes} min`, when: 'just now' }
  }
  const place = placesCatalog.find((p) => p.id === e.optionId)
  return { person: people[e.personId], event: `voted ${place?.name ?? ''}`, when: 'just now' }
})

/** The three option cards, with their voters/count/fill/leader status derived
 *  live from `state.votes` — 05 (Live poll) and 04c (Vote) both read this. */
export const selectPollOptionsView = memoize((state) => {
  const poll = selectActivePoll(state)
  const outcome = selectPollOutcome(state)
  const total = selectTotalVoters(state)
  return placesCatalog.filter((place) => poll.optionIds.includes(place.id)).map((place) => {
    const count = outcome.counts[place.id] ?? 0
    return {
      ...place,
      voters: poll.votes.filter((v) => v.optionId === place.id).map((v) => people[v.personId]),
      count,
      fill: voteShare(place.id, outcome, total),
      leading: outcome.ranked[0] === place.id && count > 0,
    }
  })
})

export const selectBillItems = memoize((state): BillItem[] =>
  dinnerBillItems.map((item) => (item.id === 'wine' ? { ...item, sharedBy: state.wineSharedBy } : item)),
)

export const selectDinnerShares = memoize((state): Record<string, number> => {
  if (state.splitMode === 'equally') return splitEqually(dinnerBill.totalCents, allSevenIds)
  return splitByItems(selectBillItems(state))
})

export function selectDinnerTotal(state: StoryState): number {
  return state.splitMode === 'equally' ? dinnerBill.totalCents : billTotal(selectBillItems(state))
}

export const selectBalancesAfterDinner = memoize((state): Balance[] => {
  const shares = selectDinnerShares(state)
  return allSevenIds.map((id) => {
    const paid = id === dinnerBill.paidBy.id ? dinnerBill.totalCents : 0
    return { personId: id, cents: openingBalanceCents[id] + paid - (shares[id] ?? 0) }
  })
})

export const selectSettleTransfers = memoize((state): Transfer[] =>
  nettedTransfers(selectBalancesAfterDinner(state)),
)

export function selectSettledClock(personId: string): string {
  return settledAt[personId]
}

export function selectAllSettled(state: StoryState): boolean {
  return selectSettleTransfers(state).every((t) => state.settledIds.includes(t.fromId))
}

export function formatCountdown(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds))
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

// ---- The day's plan ------------------------------------------------------

/**
 * One row of the timeline on 02 / 14. A poll started from an open slot
 * resolves that slot in place; a poll started from the quick add gets a row
 * of its own at the time it is for. Either way rows are sorted by time — a
 * new poll never displaces something already on the plan.
 */
export type PlanRow =
  | { id: string; minutes: number; kind: 'done'; item: PlanItem }
  | { id: string; minutes: number; kind: 'next'; item: PlanItem }
  | { id: string; minutes: number; kind: 'slot'; item: PlanItem; poll: Poll | null }
  | { id: string; minutes: number; kind: 'poll'; poll: Poll }

export const selectPlanRows = memoize((state): PlanRow[] => {
  const rows: PlanRow[] = todaysPlan.map((item) =>
    item.kind === 'slot'
      ? { id: item.id, minutes: item.minutes, kind: 'slot', item, poll: state.polls[item.id] ?? null }
      : item.kind === 'next'
        ? { id: item.id, minutes: item.minutes, kind: 'next', item }
        : { id: item.id, minutes: item.minutes, kind: 'done', item },
  )

  for (const id of state.pollIds) {
    const poll = state.polls[id]
    if (!poll || poll.slotId) continue
    rows.push({ id: poll.id, minutes: poll.eventMinutes, kind: 'poll', poll })
  }

  return rows.sort((a, b) => a.minutes - b.minutes)
})

/** "2 of 5 done" — the count follows the rows, so every poll added from the
 *  quick add shows up in it. */
export const selectPlanProgress = memoize((state) => {
  const rows = selectPlanRows(state)
  return { done: rows.filter((r) => r.kind === 'done').length, total: rows.length }
})

/** The dinner slot's poll, once one has been started on it. */
export function selectDinnerPoll(state: StoryState): Poll | null {
  return state.polls.dinner ?? null
}

/** The earliest time a new event can be set for: never in the past. */
export { NOW_MINUTES, clockOf, minutesOf }
