import { motion, useReducedMotion } from 'framer-motion'

/** White pill with a pulsing red dot: "Live · closes in mm:ss". */
export function LivePill({ countdown }: { countdown: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="flex items-center"
      style={{
        width: 183,
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
      <span className="text-footnote font-medium tabular-nums" style={{ marginLeft: 8 }}>
        closes in {countdown}
      </span>
    </div>
  )
}
