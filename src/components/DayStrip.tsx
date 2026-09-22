export type Day = {
  /** "Sat", or "Today" for the current day. */
  label: string
  /** Day of the month. */
  date: number
  selected?: boolean
}

/** Sat 12 → Today 16, five 63.6 × 58 cells with an 8 px gap. */
export function DayStrip({ days }: { days: Day[] }) {
  return (
    <div className="flex shrink-0 gap-[8px]" style={{ height: 58 }}>
      {days.map((d) => (
        <div
          key={d.date}
          aria-current={d.selected ? 'date' : undefined}
          className="flex flex-1 flex-col items-center justify-center gap-[2px]"
          style={{
            borderRadius: 'var(--radius-row-lg)',
            background: d.selected
              ? 'var(--color-ink-primary)'
              : 'var(--color-surface-white)',
            color: d.selected ? 'var(--color-surface-white)' : 'var(--color-ink-primary)',
          }}
        >
          <span
            className="text-caption"
            style={{
              color: d.selected ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)',
            }}
          >
            {d.label}
          </span>
          <span className="text-subheading font-semibold">{d.date}</span>
        </div>
      ))}
    </div>
  )
}
