import { AnimatePresence, motion } from 'framer-motion'
import { HOVER_SMALL, SPRING_POP, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { Icon } from './Icon'
import { Scrim, Sheet } from './Sheet'

const DEADLINE_OPTIONS = [10, 20, 30, 60]

/**
 * The "Closes in" picker — built once for 04's composer, reused by 05's
 * live poll (docs/INTERACTION_EXECUTION_BRIEF.md §1) so extending a
 * deadline mid-poll is the exact same sheet/interaction as setting it the
 * first time, just reachable from a different place.
 */
export function DeadlineSheet({
  open,
  value,
  footnote,
  onSelect,
  onClose,
}: {
  open: boolean
  value: number
  /** The line under the options — 04 and 05 phrase the "or as soon as..."
   *  half slightly differently depending on how many have already voted. */
  footnote: string
  onSelect: (minutes: number) => void
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <Scrim onClick={onClose} />
          <Sheet onDismiss={onClose}>
            <h2 className="text-heading font-semibold">Closes in</h2>
            <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
              {DEADLINE_OPTIONS.map((minutes) => {
                const selected = minutes === value
                return (
                  <motion.button
                    key={minutes}
                    type="button"
                    onClick={() => {
                      onSelect(minutes)
                      onClose()
                    }}
                    whileHover={HOVER_SMALL}
                    whileTap={TAP_SMALL}
                    transition={TAP_TRANSITION}
                    className="flex w-full items-center justify-between text-left"
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-row-lg)',
                      background: 'var(--color-surface-ground)',
                      border: selected ? '2px solid var(--color-ink-primary)' : '2px solid transparent',
                    }}
                  >
                    <span className="text-body font-semibold">{minutes} min</span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={SPRING_POP}
                        className="flex shrink-0 items-center justify-center rounded-pill"
                        style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                      >
                        <Icon name="check-white" size={13} />
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </div>
            <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
              {footnote}
            </p>
          </Sheet>
        </>
      )}
    </AnimatePresence>
  )
}
