import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet } from '@/components/Sheet'
import { WheelPicker } from '@/components/WheelPicker'
import { NOW_MINUTES, clockOf } from '@/data/itinerary'
import { useScreenNav } from '@/lib/useScreenNav'
import { useTripStore } from '@/store/tripStore'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { TripLisbon } from './TripLisbon'

/**
 * 18 / 13 · New poll · what are we deciding — Figma `4097:2617` (empty) and
 * `4094:2129` (filled). One sheet in two states, so one screen.
 *
 * This is step 1 of the **longer** of the two routes into a poll. Coming
 * from the quick add nothing is known yet, so the question and the time are
 * asked here and the places step (04) follows. Coming from an open slot on
 * the plan, both are already known and this step is skipped entirely — same
 * draft, same send action, one route just starts further along.
 */
export function PollQuestion() {
  const { go, back } = useScreenNav()
  const draft = useTripStore((s) => s.draft)
  const setPollQuestion = useTripStore((s) => s.setPollQuestion)
  const setDraftEventMinutes = useTripStore((s) => s.setDraftEventMinutes)
  const setPollDeadline = useTripStore((s) => s.setPollDeadline)

  /** Which wheel is open over the sheet — 13b or 13c. */
  const [picking, setPicking] = useState<'event' | 'deadline' | null>(null)

  const eventMinutes = draft.eventMinutes
  const deadlineMinutes = draft.deadlineMinutes
  const canContinue = draft.question.trim().length > 0 && eventMinutes !== null

  return (
    <div className="relative h-full">
      <TripLisbon scaleForSheet />
      <Scrim onClick={back} />

      <Sheet gap={16} onDismiss={back}>
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 4 }}>
          <h2 className="text-heading font-semibold">What are we deciding?</h2>
          <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            This is the question your buddies will see.
          </p>
        </div>

        {/* Question — Ground field with a violet caret */}
        <label
          className="flex w-full shrink-0 items-center"
          style={{ padding: 16, borderRadius: 'var(--radius-row)', background: 'var(--color-surface-ground)' }}
        >
          <span className="sr-only">Your question</span>
          <input
            value={draft.question}
            onChange={(e) => setPollQuestion(e.target.value)}
            placeholder="Ask the group a question…"
            className="min-w-0 flex-1 bg-transparent text-body font-semibold outline-none placeholder:font-normal"
            style={{ color: 'var(--color-ink-primary)', caretColor: 'var(--color-accent-violet)' }}
          />
        </label>

        {/* Settings */}
        <div className="flex w-full shrink-0 flex-col items-start">
          <SettingRow
            label="Time of the event"
            value={eventMinutes === null ? null : `Today ${clockOf(eventMinutes)}`}
            onClick={() => setPicking('event')}
          />
          <span
            aria-hidden="true"
            className="w-full shrink-0"
            style={{ height: 1, background: 'var(--color-line-default)' }}
          />
          <SettingRow
            label="Deadline"
            value={deadlineMinutes === null ? null : `Closes ${clockOf(NOW_MINUTES + deadlineMinutes)}`}
            onClick={() => setPicking('deadline')}
          />
        </div>

        <div className="flex w-full shrink-0 items-center" style={{ gap: 10 }}>
          <Button variant="secondary" onClick={back} style={{ width: 120, boxShadow: 'inset 0 0 0 1.5px var(--color-line-default)' }}>
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={!canContinue}
            onClick={() => go('new-poll')}
            // Disabled is Data/Bar Muted with white text and no lift — the
            // frame's own "not yet" state, not a dimmed primary.
            style={
              canContinue
                ? undefined
                : { background: 'var(--color-data-bar-muted)', boxShadow: 'none', cursor: 'default' }
            }
          >
            Continue
          </Button>
        </div>
      </Sheet>

      {/* 13b / 13c — the same wheel, twice */}
      <AnimatePresence>
        {picking === 'event' && (
          <WheelPicker
            key="event"
            title="Time of the event"
            /** Never in the past: the event can't be earlier than right now. */
            minMinutes={NOW_MINUTES}
            value={eventMinutes}
            onClear={() => {
              setDraftEventMinutes(null)
              setPicking(null)
            }}
            onDone={(minutes) => {
              setDraftEventMinutes(minutes)
              setPicking(null)
            }}
            onDismiss={() => setPicking(null)}
          />
        )}
        {picking === 'deadline' && (
          <WheelPicker
            key="deadline"
            title="Deadline"
            minMinutes={NOW_MINUTES}
            /** The deadline is stored as minutes from now; the wheel works in
             *  clock time, so it is converted on the way in and out. */
            value={deadlineMinutes === null ? null : NOW_MINUTES + deadlineMinutes}
            onClear={() => {
              setPollDeadline(20)
              setPicking(null)
            }}
            onDone={(minutes) => {
              setPollDeadline(Math.max(1, minutes - NOW_MINUTES))
              setPicking(null)
            }}
            onDismiss={() => setPicking(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/** "Time of the event … Not set ›" — grey until it has a value, then ink and
 *  semibold, which is the only difference between 18 and 13. */
function SettingRow({
  label,
  value,
  onClick,
}: {
  label: string
  value: string | null
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={HOVER_SMALL}
      whileTap={TAP_SMALL}
      transition={TAP_TRANSITION}
      className="flex w-full shrink-0 items-center justify-between"
      style={{ padding: '15px 2px', minHeight: 44 }}
    >
      <span className="text-body" style={{ color: 'var(--color-ink-secondary)' }}>
        {label}
      </span>
      <span className="flex shrink-0 items-center" style={{ gap: 8 }}>
        <span
          className={value ? 'text-body font-semibold' : 'text-body'}
          style={{ color: value ? 'var(--color-ink-primary)' : 'var(--color-ink-secondary)' }}
        >
          {value ?? 'Not set'}
        </span>
        <Icon name="chevron-row" size={5} height={11} />
      </span>
    </motion.button>
  )
}
