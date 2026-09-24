import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AvatarStack, type Person } from '@/components/Avatar'
import { BottomBar } from '@/components/BottomBar'
import { Button, IconButton } from '@/components/Button'
import { DayStrip } from '@/components/DayStrip'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { SectionHeader } from '@/components/SectionHeader'
import { Timeline, TimelineRow } from '@/components/Timeline'
import { Ticket } from '@/components/Ticket'
import { placePhotos } from '@/data/assets'
import { placesCatalog, type PlaceCatalogEntry } from '@/data/places'
import { clockOf, type PlanItem } from '@/data/itinerary'
import { dinnerPoll, lisbon } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import {
  formatCountdown,
  selectBuddyPeople,
  selectDinnerPoll,
  selectPlanProgress,
  selectPlanRows,
  selectTotalVoters,
  useTripStore,
} from '@/store/tripStore'
import { DUR_FAST, HOVER_SMALL, SPRING_SHEET, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { ExpensesBody } from './Balances'

type Tab = 'itinerary' | 'expenses'

/**
 * 02 · Trip · Lisbon — Figma 4064:17467 (Itinerary) and 4048:16899 (Expenses,
 * "Balances"). One persistently-mounted shell now owns the nav row and the
 * tab bar; Itinerary and Expenses are two internal bodies it swaps, not two
 * router-level screens — see docs/INTERACTION_EXECUTION_BRIEF.md §0. Tapping
 * the tab bar never remounts the nav row, the buddy stack, or the bar
 * itself; only the body content crossfades, opacity only.
 *
 * The frame is 922 tall with a fold marked at 844, so this screen scrolls. The
 * chrome — bottom fade, tab bar, FAB — is docked to the viewport, not to the
 * end of the content, and never moves below the fold.
 */
export function TripLisbon({
  dinner,
  crew,
  scaleForSheet,
  initialTab,
  syncTabToUrl,
}: {
  dinner?: 'open' | 'decided'
  crew?: Person[]
  scaleForSheet?: boolean
  /** Which body to open on. Re-syncs the tab if this changes later (e.g. the
   *  browser back button lands on a different `?tab=`). */
  initialTab?: Tab
  /** True only for the `/trip` and `/trip/expenses` routes — pushes tab
   *  changes into the path so the tab stays a real link. Backdrop reuses (a
   *  sheet's dimmed trip screen, Plan updated) leave this off: their tab
   *  state is purely local. */
  syncTabToUrl?: boolean
} = {}) {
  const { go, back } = useScreenNav()
  const navigate = useNavigate()
  const dinnerPollState = useTripStore(selectDinnerPoll)
  const pollClosed = dinnerPollState?.closed ?? false
  const winnerId = dinnerPollState?.winnerId ?? null
  const liveCrew = useTripStore(selectBuddyPeople)
  const showToast = useTripStore((s) => s.showToast)
  const startPollForSlot = useTripStore((s) => s.startPollForSlot)
  const rows = useTripStore(selectPlanRows)
  const progress = useTripStore(selectPlanProgress)
  const totalVoters = useTripStore(selectTotalVoters)
  const reduceMotion = useReducedMotion()

  const [tab, setTab] = useState<Tab>(initialTab ?? 'itinerary')
  const expensesAnimatedRef = useRef(false)

  // The browser back/forward buttons (or any external nav) change `initialTab`
  // out from under us — follow it. Tapping the tab bar itself goes through
  // `changeTab` below, which already set local state before the URL updates,
  // so this is a same-value no-op in that direction.
  useEffect(() => {
    if (initialTab && initialTab !== tab) setTab(initialTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab])

  const decided = (dinner ?? (pollClosed ? 'decided' : 'open')) === 'decided'
  const shownCrew = crew ?? liveCrew
  const winningPlace = placesCatalog.find((p) => p.id === winnerId) ?? dinnerPoll.places[0]

  const comingSoon = () => showToast({ title: 'Coming soon', detail: 'Maps aren’t wired up in this prototype' })

  const changeTab = (next: Tab) => {
    setTab(next)
    if (syncTabToUrl) {
      // `replace`, not push: flipping a tab isn't a place you go back to.
      navigate(next === 'expenses' ? '/trip/expenses' : '/trip', { replace: true })
    }
  }

  return (
    <motion.div
      className="relative h-full overflow-hidden"
      initial={false}
      animate={{ scale: scaleForSheet && !reduceMotion ? 0.96 : 1 }}
      transition={SPRING_SHEET}
      style={{ transformOrigin: '50% 0%' }}
    >
      <div className="no-scrollbar h-full overflow-y-auto" style={{ overflowX: 'hidden' }}>
        <div
          className="flex flex-col items-start"
          style={{
            // 64 from the top of the frame, less the 50 status bar.
            paddingTop: 14,
            paddingInline: 'var(--screen-padding)',
            paddingBottom: 110,
            gap: 16,
          }}
        >
          {/* Nav — shared by both tabs, mounted once, never remounts */}
          <div className="flex h-[40px] w-full shrink-0 items-center justify-between">
            <IconButton label="Back to trips" size={40} onClick={back}>
              <Icon name="arrow-left" size={20} />
            </IconButton>
            <div className="flex items-center" style={{ gap: 8 }}>
              <motion.button
                type="button"
                aria-label="Buddies on this trip"
                onClick={() => go('buddies')}
                whileHover={HOVER_SMALL}
                whileTap={TAP_SMALL}
                transition={TAP_TRANSITION}
              >
                <AvatarStack people={shownCrew} size={30} max={3} />
              </motion.button>
              <IconButton
                label="Add a buddy"
                size={30}
                background="var(--color-accent-lime)"
                ring="var(--color-surface-ground)"
                style={{ filter: 'none' }}
                onClick={() => go('add-a-buddy')}
              >
                <Icon name="plus-small" size={16} />
              </IconButton>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {tab === 'itinerary' ? (
              <motion.div
                key="itinerary"
                className="flex w-full shrink-0 flex-col items-start"
                style={{ gap: 16 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR_FAST }}
              >
                <Ticket destination={lisbon.destination} dates={lisbon.dates} />
                <DayStrip days={lisbon.days} />
                <div className="flex w-full shrink-0 flex-col items-start" style={{ paddingTop: 8, gap: 12 }}>
                  <SectionHeader label="Today’s plan" meta={`${progress.done} of ${progress.total} done`} />
                  <Timeline>
                    {rows.map((row) => {
                      if (row.kind === 'done') {
                        return (
                          <TimelineRow key={row.id} time={clockOf(row.minutes)} node="done" timeOpacity={0.6}>
                            <DoneCard title={row.item.title} line={row.item.line} photo={row.item.photo} />
                          </TimelineRow>
                        )
                      }

                      if (row.kind === 'next') {
                        return (
                          <TimelineRow
                            key={row.id}
                            time={clockOf(row.minutes)}
                            timeTone="ink"
                            timeOffset={16}
                            node="next"
                          >
                            <NextCard item={row.item} onDirections={comingSoon} />
                          </TimelineRow>
                        )
                      }

                      // A slot and a poll-of-its-own draw the same card: the
                      // only difference is what fills it and where it goes.
                      const poll = row.poll
                      // `dinner` forces the slot's state for the screens that
                      // compose this one as a backdrop (06, 07, 08).
                      const resolved = row.kind === 'slot' ? decided : (poll?.closed ?? false)

                      return (
                        <TimelineRow
                          key={row.id}
                          time={clockOf(row.minutes)}
                          timeTone="violet"
                          timeOffset={16}
                          rowOffset={4}
                          node={resolved ? 'filled' : 'open'}
                        >
                          {resolved ? (
                            <DinnerDecided
                              // `dinner="decided"` can force this row before
                              // a poll object exists (06, 07 and 08 compose
                              // this screen, and a deep link starts with no
                              // polls at all) — so read the winner off the
                              // poll only if there is one.
                              place={placesCatalog.find((p) => p.id === poll?.winnerId) ?? winningPlace}
                              label={row.kind === 'slot' ? row.item.title : 'Decided'}
                              shared={row.kind === 'slot'}
                              onLogExpense={() => go('log-expense')}
                              onMap={comingSoon}
                            />
                          ) : poll?.sent ? (
                            <OpenSlotCard
                              title={poll.question}
                              line={`Live · closes in ${formatCountdown(poll.closesInSeconds)} · ${poll.votes.length} of ${totalVoters} voted`}
                              action="See the poll"
                              onAction={() => go('live-poll')}
                            />
                          ) : (
                            <OpenSlotCard
                              title={row.kind === 'slot' ? row.item.title : 'Not decided yet'}
                              line={
                                row.kind === 'slot'
                                  ? row.item.line.replace('{n}', String(shownCrew.length))
                                  : 'Nothing booked yet'
                              }
                              action="Ask the group"
                              onAction={() => {
                                startPollForSlot(row.id)
                                go('poll-question')
                              }}
                            />
                          )}
                        </TimelineRow>
                      )
                    })}
                  </Timeline>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="expenses"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DUR_FAST }}
              >
                <ExpensesBody
                  animateEntrance={!expensesAnimatedRef.current}
                  onShown={() => {
                    expensesAnimatedRef.current = true
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BottomBar
        tabs={[
          { id: 'itinerary', label: 'Itinerary', icon: 'calendar' },
          { id: 'expenses', label: 'Expenses', icon: 'wallet' },
        ]}
        activeId={tab}
        onTabChange={(id) => changeTab(id as Tab)}
        onFabPress={() => go('quick-add')}
      />
    </motion.div>
  )
}

/**
 * The dinner slot once the poll has resolved (06) — Figma 4064:18230.
 *
 * Lime with an ink stroke and a green-cast shadow, hugging its content. The
 * photo is the **same 48 tile as the poll option card on 05** and shares its
 * `layoutId` — Framer Motion travels it into this slot rather than swapping
 * it, the one shared-element transition the spec calls out by name.
 *
 * There is no "Won 4 · 2 · 1" pill any more, and Map is an icon-only button.
 */
function DinnerDecided({
  place,
  label = 'Dinner',
  shared = true,
  onLogExpense,
  onMap,
}: {
  place: PlaceCatalogEntry
  /** The meta line's first word — "Dinner" on the slot, the poll's own word
   *  on a row a poll created. */
  label?: string
  /** Only the dinner slot carries the shared `layoutId`: it is the one the
   *  winning option's photo travels into from 05 (docs/DESIGN_SYSTEM.md
   *  §6.0). Two elements sharing one layoutId would fight over it. */
  shared?: boolean
  onLogExpense: () => void
  onMap: () => void
}) {
  const travelDetail = place.line.split('·').at(-1)!.trim()

  return (
    <div
      className="flex shrink-0 flex-col items-start"
      style={{
        width: 280,
        gap: 12,
        borderRadius: 'var(--radius-card)',
        background: 'var(--color-accent-lime)',
        border: '1.5px solid var(--color-ink-primary)',
        padding: 14,
        filter: 'drop-shadow(0 12px 12px rgb(115 140 26 / 0.25))',
      }}
    >
      <div className="flex w-full items-start" style={{ gap: 12 }}>
        <div
          className="shrink-0 overflow-hidden"
          style={{ width: 48, height: 48, borderRadius: 'var(--radius-tile)' }}
        >
          {place.photo ? (
            <motion.img
              layoutId={shared ? 'dinner-photo' : undefined}
              src={placePhotos[place.photo]}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : (
            <motion.div
              layoutId={shared ? 'dinner-photo' : undefined}
              className="flex h-full w-full items-center justify-center"
              style={{ background: 'var(--color-surface-white-70)' }}
            >
              <Icon name={place.icon} size={22} />
            </motion.div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 5 }}>
          <p className="w-full text-headline font-semibold">{place.name}</p>
          <div className="flex items-center" style={{ gap: 4 }}>
            <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
              {label} ·
            </span>
            <span className="flex items-center" style={{ gap: 2 }}>
              <Icon name="walk-sm" size={14} />
              <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                {travelDetail}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-start" style={{ gap: 8 }}>
        <motion.button
          type="button"
          onClick={onLogExpense}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex shrink-0 items-center justify-center rounded-pill text-footnote font-medium"
          style={{
            width: 201,
            height: 40,
            gap: 6,
            paddingInline: 14,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
          }}
        >
          <Icon name="receipt" size={16} />
          Log expense
        </motion.button>
        <motion.button
          type="button"
          aria-label="Map"
          onClick={onMap}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex shrink-0 items-center justify-center rounded-pill"
          // No horizontal padding: 43 wide less 14 either side leaves 15px,
          // and the icon — which can shrink inside a flex row — was being
          // squeezed from 24 to 15. It's the same glyph at the same size as
          // the directions button on the next-item card; it should look it.
          style={{ width: 43, height: 40 }}
        >
          <Icon name="direction-right" size={24} className="shrink-0" />
        </motion.button>
      </div>
    </div>
  )
}

/**
 * A past item: Surface/White 70%, everything stepped back to Ink/Secondary.
 * The 10:00 row carries a 56 photo at 65% and a looser 3 pt text gap; the
 * 15:00 row has no photo, a 1 pt gap and its sub-line at 80%.
 */
function DoneCard({
  title,
  line,
  photo,
}: {
  title: string
  line: string
  photo?: keyof typeof placePhotos
}) {
  if (photo) {
    return (
      <div
        className="flex shrink-0 items-center"
        style={{
          width: 280,
          gap: 12,
          padding: '10px 16px 10px 10px',
          borderRadius: 'var(--radius-row)',
          background: 'var(--color-surface-white-70)',
        }}
      >
        <img
          src={placePhotos[photo]}
          alt=""
          aria-hidden="true"
          className="shrink-0 object-cover"
          style={{ width: 56, height: 56, borderRadius: 'var(--radius-tile)', opacity: 0.65 }}
        />
        <div
          className="flex min-w-0 flex-1 flex-col items-start"
          style={{ gap: 3, color: 'var(--color-ink-secondary)' }}
        >
          <p className="w-full text-body font-medium">{title}</p>
          <p className="w-full text-caption">{line}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex shrink-0 items-center overflow-hidden"
      style={{
        width: 280,
        height: 46,
        padding: '10px 14px',
        borderRadius: 'var(--radius-row)',
        background: 'var(--color-surface-white-70)',
      }}
    >
      <div
        className="flex min-w-0 flex-1 flex-col items-start whitespace-nowrap"
        style={{ gap: 1, color: 'var(--color-ink-secondary)' }}
      >
        <p className="text-body font-medium">{title}</p>
        <p className="text-caption" style={{ opacity: 0.8 }}>
          {line}
        </p>
      </div>
    </div>
  )
}

/**
 * The dashed violet card — one component for both things that can be
 * undecided at a time on the plan: an empty slot the day came with, and a
 * poll someone added from the quick add (14, Figma `4101:2399`). The frames
 * draw them identically; only the title, the line and the button's words
 * change, so this is one card with three props rather than two cards that
 * would drift apart.
 */
function OpenSlotCard({
  title,
  line,
  action,
  onAction,
}: {
  title: string
  line: string
  action: string
  onAction: () => void
}) {
  return (
    <div
      className="flex shrink-0 flex-col items-start overflow-hidden"
      style={{
        width: 280,
        gap: 12,
        padding: '14px 16px 16px',
        borderRadius: 'var(--radius-card)',
        background: 'var(--color-accent-violet-tint)',
        outline: '1.5px dashed rgb(91 79 232 / 0.55)',
        outlineOffset: '-1.5px',
      }}
    >
      <div className="flex w-full flex-col items-start" style={{ gap: 2 }}>
        <p className="w-full text-headline font-semibold">{title}</p>
        <p className="w-full text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
          {line}
        </p>
      </div>
      <Button
        variant="violet"
        height={38}
        icon={<Icon name="list" size={16} />}
        onClick={onAction}
        style={{
          minWidth: 151,
          paddingInline: 14,
          justifyContent: 'flex-start',
          gap: 6,
          filter: 'drop-shadow(0 6px 7px rgb(91 79 232 / 0.35))',
        }}
      >
        {action}
      </Button>
    </div>
  )
}

/** The item happening next: the warm gradient card, and the only row that
 *  carries a directions button. */
function NextCard({ item, onDirections }: { item: PlanItem; onDirections: () => void }) {
  return (
    <div
      className="relative flex shrink-0 flex-col items-start justify-center overflow-hidden"
      style={{
        width: 280,
        height: 84,
        gap: 10,
        padding: '14px 14px 12px 16px',
        borderRadius: 'var(--radius-card)',
        background: 'linear-gradient(158.199deg, rgb(247 221 211) 7.1429%, rgb(245 231 196) 78.571%)',
      }}
    >
      <div className="flex w-full flex-col items-start" style={{ gap: 4 }}>
        <p className="text-headline font-semibold">{item.title}</p>
        <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
          {item.line}
        </p>
        {item.chip && (
          <Pill
            variant="white70"
            height={24}
            radius={12}
            className="text-caption font-medium"
            style={{ width: 106, paddingInline: 10, gap: 5 }}
          >
            <Icon name="walk" size={14} />
            {item.chip}
          </Pill>
        )}
      </div>
      <motion.button
        type="button"
        aria-label={`Directions to ${item.title}`}
        onClick={onDirections}
        whileHover={HOVER_SMALL}
        whileTap={TAP_SMALL}
        transition={TAP_TRANSITION}
        className="absolute flex items-center justify-center rounded-pill"
        style={{
          bottom: 12,
          right: 12,
          width: 36,
          height: 36,
          filter: 'drop-shadow(0 4px 5px rgb(31 30 36 / 0.1))',
        }}
      >
        <Icon name="direction-right" size={24} />
      </motion.button>
    </div>
  )
}
