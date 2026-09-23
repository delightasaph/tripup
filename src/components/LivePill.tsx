import { motion, useReducedMotion } from 'framer-motion'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { Icon } from './Icon'

/**
 * White pill with a pulsing red dot: "Live · closes in mm:ss". `onEdit`
 * (05's own view only — the poll's creator, never Nic's 04c) appends a
 * chevron that opens the same deadline sheet 04 composes with
 * (docs/INTERACTION_EXECUTION_BRIEF.md §1) — the pill grows to fit it
 * rather than staying pinned to Figma's fixed 183, since this affordance
 * isn't in the frame.
 */
export function LivePill({ countdown, onEdit }: { countdown: string; onEdit?: () => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="flex shrink-0 items-center"
      style={{
        width: onEdit ? undefined : 183,
        paddingRight: onEdit ? 4 : undefined,
        height: 33,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--color-surface-white)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <span
        aria-hidden="true"
        className="relative flex shrink-0 items-center justify-center"
        style={{ marginLeft: 12, width: 14, height: 14 }}
      >
        <motion.span
          animate={reduceMotion ? { opacity: 0.18 } : { scale: [1, 2.2, 1], opacity: [0.18, 0, 0.18] }}
          transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'var(--color-status-alert)',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-status-alert)',
          }}
        />
      </span>
      <span
        className="text-footnote font-medium"
        style={{ marginLeft: 8, color: 'var(--color-status-alert)' }}
      >
        Live
      </span>
      <span
        aria-hidden="true"
        style={{
          marginLeft: 8,
          width: 1,
          height: 14,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-line-default)',
        }}
      />
      <span
        className="text-footnote font-medium tabular-nums whitespace-nowrap"
        style={{ marginLeft: 8, marginRight: onEdit ? 0 : 12 }}
      >
        closes in {countdown}
      </span>
      {onEdit && (
        <motion.button
          type="button"
          aria-label="Change the poll's deadline"
          onClick={onEdit}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex shrink-0 items-center justify-center rounded-pill"
          style={{ width: 25, height: 25, marginLeft: 2 }}
        >
          <Icon name="chevron-right-16" size={14} />
        </motion.button>
      )}
    </div>
  )
}
