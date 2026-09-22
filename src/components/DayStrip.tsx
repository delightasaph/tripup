export type Day = {
  /** "Sat", or "Today" for the current day. */
  label: string
  /** Day of the month. */
  date: number
  selected?: boolean
}

/**
 * Sat 12 → Today 16. Five 63.6 × 58 cells, gap 8, radius 18.
 * Label is Caption/Regular at **70% opacity**; the number is
 * Subheading/SemiBold. The selected cell sets white on the container and both
 * lines inherit it, so the label keeps the same 70% step-back.
 */
export function DayStrip({ days }: { days: Day[] }) {
  return (
    <div className="flex shrink-0 gap-[8px]" style={{ height: 58 }}>
      {days.map((d) => (
        <div
          key={d.date}
          aria-current={d.selected ? 'date' : undefined}
          className="flex flex-1 flex-col items-center justify-center gap-[2px] overflow-hidden"
          style={{
            borderRadius: 'var(--radius-row-lg)',
            paddingBlock: 10,
            background: d.selected
              ? 'var(--color-ink-primary)'
              : 'var(--color-surface-white)',
            color: d.selected ? 'var(--color-surface-white)' : 'var(--color-ink-primary)',
          }}
        >
          <span
            className="text-caption"
            style={{
              opacity: 0.7,
              color: d.selected ? undefined : 'var(--color-ink-secondary)',
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
