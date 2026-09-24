import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { DeadlineSheet } from '@/components/DeadlineSheet'
import { Icon } from '@/components/Icon'
import { PlaceTile } from '@/components/PlaceTile'
import { Scrim, Sheet } from '@/components/Sheet'
import { clockOf, todaysPlan } from '@/data/itinerary'
import { placesCatalog, searchPlaces } from '@/data/places'
import { useScreenNav } from '@/lib/useScreenNav'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { useTripStore } from '@/store/tripStore'
import { TripLisbon } from './TripLisbon'

const SEARCH_DEBOUNCE_MS = 250

/**
 * 04 · New poll — Figma 164:2379.
 * The trip screen under a scrim, the "Ren joined" toast still up from 03, and
 * the New poll sheet (164:2513) at y 235.5.
 *
 * The question is editable and the option list is real (remove a place, or
 * bring one in from "Add a place", which actually searches — not in the
 * Figma, but Ari composing a poll has to actually compose it). Two nested
 * sheets (add a place, the deadline) layer on top, matching how an iOS
 * picker sheet stacks on a form.
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

  const [addPlaceOpen, setAddPlaceOpen] = useState(false)
  // Bumped every time the sheet opens, so it's passed as `key` below — a
  // fresh mount resets its search field for free, no reset effect needed.
  const [addPlaceOpenCount, setAddPlaceOpenCount] = useState(0)
  const [deadlineOpen, setDeadlineOpen] = useState(false)

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

      <Sheet frameTop={235.5} gap={18} onDismiss={back}>
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

        {/* Options header */}
        <div className="flex w-full shrink-0 items-center justify-between text-footnote">
          <span style={{ color: 'var(--color-ink-secondary)' }}>
            {options.length} {options.length === 1 ? 'place' : 'places'} near you
          </span>
          <motion.button
            type="button"
            onClick={() => {
              setAddPlaceOpenCount((n) => n + 1)
              setAddPlaceOpen(true)
            }}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="font-medium"
            style={{ color: 'var(--color-accent-violet)' }}
          >
            + Add a place
          </motion.button>
        </div>

        {/* Options — capped so adding several places from search can't push
            the deadline row and Send button below the frame. */}
        <div
          className="no-scrollbar flex w-full shrink-0 flex-col items-start overflow-y-auto"
          style={{ gap: 8, maxHeight: 260, overscrollBehavior: 'contain' }}
        >
          <AnimatePresence initial={false}>
            {options.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex w-full items-center overflow-hidden"
                style={{
                  gap: 12,
                  padding: '10px 14px 10px 10px',
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--color-surface-ground)',
                }}
              >
                <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
                  <PlaceTile place={p} />
                  <span
                    className="absolute flex items-center justify-center rounded-pill"
                    style={{
                      left: 32,
                      top: 32,
                      width: 22,
                      height: 22,
                      background: 'var(--color-surface-white)',
                      filter: 'drop-shadow(0 2px 2px rgb(31 30 36 / 0.12))',
                    }}
                  >
                    <Icon name={p.icon} size={13} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-headline font-semibold">{p.name}</p>
                  <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
                    {p.line}
                  </p>
                </div>
                <motion.button
                  type="button"
                  aria-label={`Remove ${p.name}`}
                  onClick={() => togglePollOption(p.id)}
                  disabled={options.length <= 2}
                  whileHover={options.length <= 2 ? undefined : HOVER_SMALL}
                  whileTap={options.length <= 2 ? undefined : TAP_SMALL}
                  transition={TAP_TRANSITION}
                  className="shrink-0"
                  style={{ opacity: options.length <= 2 ? 0.3 : 1 }}
                >
                  <Icon name="remove" size={16} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
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
              or as soon as all 7 have voted
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
          Send to 6 buddies
        </motion.button>
      </Sheet>

      <AddPlaceSheet
        key={addPlaceOpenCount}
        open={addPlaceOpen}
        selectedIds={optionIds}
        canRemove={options.length > 2}
        onToggle={togglePollOption}
        onClose={() => setAddPlaceOpen(false)}
      />

      <DeadlineSheet
        open={deadlineOpen}
        value={deadline}
        footnote="Or as soon as all 7 of you have voted, whichever comes first."
        onSelect={setPollDeadline}
        onClose={() => setDeadlineOpen(false)}
      />
    </div>
  )
}

/**
 * "Add a place" — a real (debounced, mock) search over the wider catalog in
 * `src/data/places.ts`, not a fixed toggle of 3. Shows "Nearby" before
 * typing, a brief loading flash while filtering, and an empty state.
 */
function AddPlaceSheet({
  open,
  selectedIds,
  canRemove,
  onToggle,
  onClose,
}: {
  open: boolean
  selectedIds: string[]
  /** False once only two places are left — removing the last two isn't a poll. */
  canRemove: boolean
  onToggle: (placeId: string) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searching, setSearching] = useState(false)

  // The flicker-to-"Searching…" happens right on the keystroke that causes it
  // (in the input's onChange below) — the effect only owns the debounce
  // timer itself, the one genuinely external-to-React part of this.
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(query)
      setSearching(false)
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  const results = searchPlaces(debouncedQuery)
  const isSearching = debouncedQuery.trim().length > 0

  return (
    <AnimatePresence>
      {open && (
        <>
          <Scrim onClick={onClose} />
          <Sheet onDismiss={onClose}>
            <div className="flex w-full shrink-0 items-center justify-between">
              <h2 className="text-heading font-semibold">Add a place</h2>
              <span className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
                {selectedIds.length} added
              </span>
            </div>

            {/* Search */}
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
              <Icon name="search" size={18} />
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
            </div>

            <div className="flex w-full shrink-0 items-center text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
              {isSearching ? `Results for “${debouncedQuery}”` : 'Nearby'}
            </div>

            {/* Capped and independently scrollable — the sheet itself doesn't
                scroll, so an uncapped list this long would push the search
                field and the header off the top of the 844 frame with no way
                back to them. */}
            <div
              className="no-scrollbar flex w-full shrink-0 flex-col items-start overflow-y-auto"
              style={{ gap: 8, minHeight: 64, maxHeight: 320, overscrollBehavior: 'contain' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {searching ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex w-full items-center justify-center text-footnote"
                    style={{ padding: '24px 0', color: 'var(--color-ink-secondary)' }}
                  >
                    Searching…
                  </motion.div>
                ) : results.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex w-full flex-col items-center text-center"
                    style={{ padding: '24px 0', gap: 4 }}
                  >
                    <p className="text-body font-medium">No places found</p>
                    <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                      Try a different search.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex w-full flex-col items-start"
                    style={{ gap: 8 }}
                  >
                    {results.map((p) => {
                      const included = selectedIds.includes(p.id)
                      const disabled = included && !canRemove
                      return (
                        <motion.button
                          key={p.id}
                          type="button"
                          onClick={() => onToggle(p.id)}
                          disabled={disabled}
                          whileHover={disabled ? undefined : HOVER_SMALL}
                          whileTap={disabled ? undefined : TAP_SMALL}
                          transition={TAP_TRANSITION}
                          className="flex w-full items-center text-left"
                          style={{
                            gap: 12,
                            padding: '10px 14px 10px 10px',
                            borderRadius: 'var(--radius-card)',
                            background: included ? 'var(--color-accent-lime)' : 'var(--color-surface-ground)',
                            opacity: disabled ? 0.6 : 1,
                          }}
                        >
                          <PlaceTile place={p} />
                          <div className="min-w-0 flex-1">
                            <p className="text-headline font-semibold">{p.name}</p>
                            <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
                              {p.line}
                            </p>
                          </div>
                          {included ? (
                            <span
                              className="flex shrink-0 items-center justify-center rounded-pill"
                              style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                            >
                              <Icon name="check-white" size={13} />
                            </span>
                          ) : (
                            <span
                              className="shrink-0 rounded-pill"
                              style={{
                                width: 24,
                                height: 24,
                                outline: '1.5px solid rgb(31 30 36 / 0.25)',
                                outlineOffset: '-1.5px',
                              }}
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={HOVER_SMALL}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              className="flex w-full shrink-0 items-center justify-center rounded-pill text-body font-medium"
              style={{
                height: 54,
                background: 'var(--color-ink-primary)',
                color: 'var(--color-surface-white)',
              }}
            >
              Done
            </motion.button>
          </Sheet>
        </>
      )}
    </AnimatePresence>
  )
}
