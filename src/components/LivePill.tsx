/** White pill with a pulsing red dot: "Live · closes in mm:ss". */
export function LivePill({ countdown }: { countdown: string }) {
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
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'var(--color-status-alert)',
            opacity: 0.18,
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
