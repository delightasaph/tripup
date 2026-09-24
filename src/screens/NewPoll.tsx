import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { DeadlineSheet } from '@/components/DeadlineSheet'
import { Icon } from '@/components/Icon'
import { PlaceTile } from '@/components/PlaceTile'
import { Scrim, Sheet } from '@/components/Sheet'
import { clockOf, todaysPlan } from '@/data/itinerary'
import { placesCatalog, searchPlaces } from '@/data/places'
import { useScreenNav } from '@/lib/useScreenNav'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { selectTotalVoters, useTripStore } from '@/store/tripStore'
import { TripLisbon } from './TripLisbon'

const SEARCH_DEBOUNCE_MS = 250

/**
 * 04 · New poll — Figma 164:2379.
 * The trip screen under a scrim, the "Ren joined" toast still up from 03, and
 * the New poll sheet (164:2513) at y 235.5.
 *
 * The places step, and the second half of both routes into a poll: the
 * question, the time and the deadline are settled on `PollQuestion` before
 * this opens, and this is where the options come from.
 *
 * **One surface.** Searching used to open a second sheet on top of this one,
 * with the first still visible behind its own scrim — two modals stacked,
 * which reads as a bug rather than a layer. The search field now lives in
 * this sheet: type and the list below becomes results you can add, clear it
 * and you are back to the places on the poll. The sheet grows and shrinks
 * with its content; nothing stacks.
 */
export function NewPoll() {
  const { go, back } = useScreenNav()
  const sendPoll = useTripStore((s) => s.sendPoll)
  const question = useTripStore((s) => s.draft.question)
  const setPollQuestion = useTripStore((s) => s.setPollQuestion)
  const optionIds = useTripStore((s) => s.draft.optionIds)
  const togglePollOption = useTripStore((s) => s.togglePollOption)
  const deadline = useTripStore((s) => s.draft.deadlineMinutes ?? 20)
  const slotId = useTripStore((s) => s.draft.slotId)
  const eventMinutes = useTripStore((s) => s.draft.eventMinutes ?? 0)
  const setPollDeadline = useTripStore((s) => s.setPollDeadline)
  // Who this actually goes to follows the trip: before Ren joins it is five
  // buddies, after he does it is six. A fixed number here would contradict
  // the buddy stack one row above.
  const totalVoters = useTripStore(selectTotalVoters)

  const [deadlineOpen, setDeadlineOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searching, setSearching] = useState(false)

  // The debounce timer is the one genuinely external-to-React part of the
  // search; the flicker to "Searching…" happens on the keystroke itself.
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query)
      setSearching(false)
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  const isSearching = debouncedQuery.trim().length > 0
  const results = searchPlaces(debouncedQuery)

  // The pill names what this poll is for. From the dinner slot that's the
  // slot itself; from the quick add there is no slot, so it names the time
  // the poll was set for on 13 — a poll never borrows another item's slot.
  const slot = todaysPlan.find((i) => i.id === slotId)
  const slotLabel = `${slot?.title ?? 'Today'} · ${clockOf(eventMinutes)}`

  const options = placesCatalog.filter((p) => optionIds.includes(p.id))
  const canSend = options.length >= 2 // at least two places to vote between

  const send = () => {
    if (options.length < 2) return
    sendPoll()
    go('live-poll')
  }

  return (
    <div className="relative h-full">
      <TripLisbon scaleForSheet />
      <Scrim onClick={back} />

      {/* No `frameTop`: the sheet hugs its content and grows upward from the
          bottom. The frame pins it at y 235.5, which was right for the frame's
          own content — adding the search field made the content taller than
          that box and pushed Send off the bottom of the phone. Hugging can't
          do that: the button is always the last thing above the safe area,
          whatever the list is showing. */}
      <Sheet gap={18} onDismiss={back}>
        <div className="flex w-full shrink-0 items-center justify-between">
          <h2 className="text-heading font-semibold">New poll</h2>
          {/* The slot this poll fills */}
          <span
            className="inline-flex shrink-0 items-center rounded-pill text-footnote font-medium"
            style={{
              gap: 5,
              padding: '6px 12px 6px 10px',
              background: 'var(--color-accent-violet-tint)',
              color: 'var(--color-accent-violet)',
            }}
          >
            <Icon name="clock-violet" size={14} />
            {slotLabel}
          </span>
        </div>

        {/* Question — editable */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            Question
          </span>
          <input
            value={question}
            onChange={(e) => setPollQuestion(e.target.value)}
            aria-label="Poll question"
            className="w-full bg-transparent text-heading font-semibold outline-none"
            style={{ border: 'none', padding: 0 }}
          />
          <span
            aria-hidden="true"
            style={{ width: '100%', height: 1.5, background: 'var(--color-ink-primary)' }}
          />
        </div>

        {/* Search — always here, in this sheet. Adding a place is the
            common thing you do on this step, so it is a field you type in,
            not a button that opens another surface. */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            height: 48,
            gap: 10,
            paddingInline: 14,
            borderRadius: 'var(--radius-row)',
            background: 'var(--color-surface-ground)',
          }}
        >
          <Icon name="search" size={18} className="shrink-0" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSearching(true)
            }}
            placeholder="Search places nearby"
            aria-label="Search places"
            className="min-w-0 flex-1 bg-transparent text-body outline-none"
            style={{ border: 'none' }}
          />
          {query && (
            <motion.button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('')
                setSearching(false)
              }}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              className="shrink-0"
            >
              <Icon name="remove" size={16} />
            </motion.button>
          )}
        </div>

        {/* What the list below is showing */}
        <div className="flex w-full shrink-0 items-center justify-between text-footnote">
          <span style={{ color: 'var(--color-ink-secondary)' }}>
            {isSearching
              ? `Results for “${debouncedQuery}”`
              : `${options.length} ${options.length === 1 ? 'place' : 'places'} near you`}
          </span>
          {isSearching && (
            <span style={{ color: 'var(--color-ink-secondary)' }}>{options.length} on the poll</span>
          )}
        </div>

        {/* The list — the poll's places, or the search results. Capped and
            scrollable so a long result set can't push the deadline row and
            Send below the fold. */}
        <div
          className="no-scrollbar flex w-full shrink-0 flex-col items-start overflow-y-auto"
          style={{ gap: 8, minHeight: 64, maxHeight: 232, overscrollBehavior: 'contain' }}
        >
          {searching ? (
            <div
              className="flex w-full items-center justify-center text-footnote"
              style={{ padding: '24px 0', color: 'var(--color-ink-secondary)' }}
            >
              Searching…
            </div>
          ) : isSearching && results.length === 0 ? (
            <div
              className="flex w-full flex-col items-center text-center"
              style={{ padding: '24px 0', gap: 4 }}
            >
              <p className="text-body font-medium">No places found</p>
              <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                Try a different search.
              </p>
            </div>
          ) : (
            (isSearching ? results : options).map((p) => {
              const included = optionIds.includes(p.id)
              // Removing the second-to-last place would leave a poll with one
              // option, which isn't a vote.
              const locked = included && options.length <= 2
              return (
                <motion.div
                  key={p.id}
                  layout
                  className="flex w-full shrink-0 items-center"
                  style={{
                    gap: 12,
                    padding: '10px 14px 10px 10px',
                    borderRadius: 'var(--radius-card)',
                    background: isSearching && included
                      ? 'var(--color-accent-lime)'
                      : 'var(--color-surface-ground)',
                  }}
                >
                  <PlaceTile place={p} />
                  <div className="min-w-0 flex-1">
                    <p className="text-headline font-semibold">{p.name}</p>
                    <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
                      {p.line}
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    aria-label={
                      isSearching
                        ? included
                          ? `Remove ${p.name} from the poll`
                          : `Add ${p.name} to the poll`
                        : `Remove ${p.name}`
                    }
                    onClick={() => togglePollOption(p.id)}
                    disabled={locked}
                    whileHover={locked ? undefined : HOVER_SMALL}
                    whileTap={locked ? undefined : TAP_SMALL}
                    transition={TAP_TRANSITION}
                    className="flex shrink-0 items-center justify-center"
                    style={{ width: 24, height: 24, opacity: locked ? 0.3 : 1 }}
                  >
                    {isSearching ? (
                      included ? (
                        <span
                          className="flex h-full w-full items-center justify-center rounded-pill"
                          style={{ background: 'var(--color-ink-primary)' }}
                        >
                          <Icon name="check-white" size={13} />
                        </span>
                      ) : (
                        <span
                          className="h-full w-full rounded-pill"
                          style={{
                            outline: '1.5px solid rgb(31 30 36 / 0.25)',
                            outlineOffset: '-1.5px',
                          }}
                        />
                      )
                    ) : (
                      <Icon name="remove" size={16} />
                    )}
                  </motion.button>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Deadline — tap to change */}
        <motion.button
          type="button"
          onClick={() => setDeadlineOpen(true)}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex w-full shrink-0 items-center text-left"
          style={{
            gap: 12,
            height: 61,
            padding: '12px 14px',
            borderRadius: 'var(--radius-row-lg)',
            outline: '1.5px solid var(--color-line-default)',
            outlineOffset: '-1.5px',
          }}
        >
          <Icon name="clock" size={20} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold">Closes in {deadline} min</p>
            <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
              or as soon as all {totalVoters} have voted
            </p>
          </div>
          <Icon name="chevron-right-16" size={16} className="shrink-0" />
        </motion.button>

        {/* Send */}
        <motion.button
          type="button"
          onClick={send}
          disabled={!canSend}
          whileHover={canSend ? HOVER_SMALL : undefined}
          whileTap={canSend ? TAP_SMALL : undefined}
          transition={TAP_TRANSITION}
          className="flex w-full shrink-0 items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            gap: 8,
            paddingInline: 22,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
            opacity: canSend ? 1 : 0.5,
          }}
        >
          <Icon name="send" size={18} />
          Send to {totalVoters - 1} {totalVoters - 1 === 1 ? 'buddy' : 'buddies'}
        </motion.button>
      </Sheet>

      <DeadlineSheet
        open={deadlineOpen}
        value={deadline}
        footnote={`Or as soon as all ${totalVoters} of you have voted, whichever comes first.`}
        onSelect={setPollDeadline}
        onClose={() => setDeadlineOpen(false)}
      />
    </div>
  )
}
