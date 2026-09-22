type StatusBarProps = {
  /** Clock as shown in the spec, e.g. "18:05". */
  time: string
  /** White glyphs for the lock screen (04b); black everywhere else. */
  tone?: 'dark' | 'light'
}

/** iOS-style status bar, 50 pt tall, matching the Figma frames. */
export function StatusBar({ time, tone = 'dark' }: StatusBarProps) {
  const color = tone === 'light' ? 'var(--color-surface-white)' : 'var(--color-ink-primary)'

  return (
    <div
      className="flex shrink-0 items-end justify-between px-[26px] pb-2 select-none"
      style={{ height: 'var(--status-bar-height)', color }}
      aria-hidden="true"
    >
      <span className="text-headline font-semibold tracking-[0.01em] tabular-nums">{time}</span>
      <span className="flex items-center gap-[6px]">
        <CellularIcon />
        <WifiIcon />
        <BatteryIcon />
      </span>
    </div>
  )
}

function CellularIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 4.6} y={9 - i * 3} width="3" height={3 + i * 3} rx="1" />
      ))}
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor">
      <path d="M1 4.2a10.5 10.5 0 0 1 14 0" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3.7 7a6.7 6.7 0 0 1 8.6 0" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8" cy="10" r="1.3" fill="currentColor" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
      <rect
        x="0.75"
        y="0.75"
        width="21"
        height="11.5"
        rx="3.5"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <rect x="2.5" y="2.5" width="15" height="8" rx="2" fill="currentColor" />
      <path
        d="M23.5 4.5c1 .4 1.5 1 1.5 2s-.5 1.6-1.5 2v-4Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  )
}
