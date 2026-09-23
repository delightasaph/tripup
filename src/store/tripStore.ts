import { create } from 'zustand'
import type { IconName } from '@/components/Icon'
import { dinnerBillItems, dinnerBill, openingBalanceCents, settledAt } from '@/data/expenses'
import { dinnerPoll, people, placeShortNames } from '@/data/trip'
import { formatEuros } from '@/domain/money'
import { nettedTransfers, type Balance, type Transfer } from '@/domain/netting'
import { canClosePoll, tallyPoll, voteShare, type Vote } from '@/domain/poll'
import { billTotal, splitByItems, splitEqually, type BillItem } from '@/domain/split'

/** Everyone on the trip once Ren has joined, Ari included — the voting body
 *  and the settle-up roster. */
const allSevenIds = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira', 'ren']
const pollOptionIds = dinnerPoll.places.map((p) => p.id)
/** The order the four non-Ren transfers auto-complete in, once Ren pays —
 *  same order `settledAt` (docs/PRODUCT_SPEC.md §3) gives their clock times. */
const autoSettleOrder = ['sven', 'bea', 'kofi', 'mira']

export type SplitMode = 'equally' | 'by-item'
export type ViewAs = 'ari' | 'nic' | 'ren'
export type Ending = 'A' | 'B'

export type ToastPayload = { title: string; detail: string; icon?: IconName; iconSize?: number }

interface StoryState {
  renJoined: boolean

  pollSent: boolean
  pollClosed: boolean
  votes: Vote[]
  closesInSeconds: number
  nudged: boolean
  changingVote: boolean
  winnerId: string | null

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

const initialStory: StoryState = {
  renJoined: false,
  pollSent: false,
  pollClosed: false,
  votes: [],
  closesInSeconds: 1200,
  nudged: false,
  changingVote: false,
  winnerId: null,
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
  function closePoll() {
    const state = get()
    if (state.pollClosed) return
    const outcome = tallyPoll(pollOptionIds, state.votes)
    set({ pollClosed: true, winnerId: outcome.winnerId })
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
    const shortName = outcome.winnerId ? placeShortNames[outcome.winnerId] : ''
    get().showToast({
      title: `Poll closed · ${shortName} won`,
      detail: outcome.tie ? 'Tie broken by first vote · Added to the plan for 20:30' : 'Added to the plan for 20:30',
      icon: 'calendar-check',
      iconSize: 14,
    })
  }

  function maybeAutoClose() {
    const state = get()
    if (state.pollClosed || !state.pollSent) return
    const voted = new Set(state.votes.map((v) => v.personId))
    const everyoneVoted = allSevenIds.every((id) => voted.has(id))
    const timedOut = state.closesInSeconds <= 0 && state.votes.length > 0
    if (everyoneVoted || timedOut) closePoll()
  }

  function startCountdown() {
    if (countdownInterval) return
    countdownInterval = setInterval(() => {
      const state = get()
      if (state.pollClosed) {
        if (countdownInterval) clearInterval(countdownInterval)
        countdownInterval = null
        return
      }
      set({ closesInSeconds: Math.max(0, state.closesInSeconds - state.speed) })
      maybeAutoClose()
    }, 1000)
  }

  return {
    ...initialStory,
    viewAs: 'ari',
    ending: 'A',
    speed: 1,

    addRen: () => {
      if (get().renJoined) return
      set({ renJoined: true })
      get().showToast({ title: 'Ren joined the trip', detail: 'Everyone was told' })
    },

    sendPoll: () => {
      const state = get()
      if (state.pollSent) return
      set({ pollSent: true, votes: [{ personId: 'ari', optionId: 'taberna', order: 0 }], closesInSeconds: 1200 })
      const speed = state.speed
      schedule(() => get().castVote('bea', 'taberna'), 1200 / speed)
      schedule(() => get().castVote('kofi', 'taberna'), 2400 / speed)
      schedule(() => get().castVote('mira', 'ramiro'), 3600 / speed)
      schedule(() => get().castVote('ren', 'timeout'), 4800 / speed)
      schedule(() => get().castVote('nic', 'timeout'), 6000 / speed)
      startCountdown()
    },

    castVote: (personId, optionId, options) => {
      const state = get()
      if (state.pollClosed) return
      const existing = state.votes.find((v) => v.personId === personId)
      if (existing && !options?.allowChange) return
      if (existing) {
        set({ votes: state.votes.map((v) => (v.personId === personId ? { ...v, optionId } : v)) })
      } else {
        const order = state.votes.length === 0 ? 0 : Math.max(...state.votes.map((v) => v.order)) + 1
        set({ votes: [...state.votes, { personId, optionId, order }] })
      }
      maybeAutoClose()
    },

    requestChangeVote: () => {
      if (get().pollClosed) return
      set({ changingVote: true })
    },

    changeVoteTo: (optionId) => {
      get().castVote('ari', optionId, { allowChange: true })
      set({ changingVote: false })
    },

    nudgeSven: () => {
      const state = get()
      if (state.nudged || state.pollClosed) return
      set({ nudged: true })
      get().showToast({ title: 'Sven was nudged', detail: 'He’ll get a reminder', icon: 'bell', iconSize: 13 })
      schedule(() => get().castVote('sven', 'taberna'), 2000 / state.speed)
    },

    closePollNow: () => {
      if (!canClosePoll(get().votes)) return
      closePoll()
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

export const selectPollOutcome = memoize((state) => tallyPoll(pollOptionIds, state.votes))

export function selectTotalVoters(state: StoryState): number {
  return state.renJoined ? 7 : 6
}

export const selectPendingVoters = memoize((state) => {
  if (!state.pollSent) return []
  const voted = new Set(state.votes.map((v) => v.personId))
  return allSevenIds.filter((id) => !voted.has(id))
})

export function selectYourVote(state: StoryState, personId: string): string | null {
  return state.votes.find((v) => v.personId === personId)?.optionId ?? null
}

/** The three option cards, with their voters/count/fill/leader status derived
 *  live from `state.votes` — 05 (Live poll) and 04c (Vote) both read this. */
export const selectPollOptionsView = memoize((state) => {
  const outcome = selectPollOutcome(state)
  const total = selectTotalVoters(state)
  return dinnerPoll.places.map((place) => {
    const count = outcome.counts[place.id] ?? 0
    return {
      ...place,
      voters: state.votes.filter((v) => v.optionId === place.id).map((v) => people[v.personId]),
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
