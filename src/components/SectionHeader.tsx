/** "TODAY'S PLAN" on the left, "2 of 4 done" on the right. */
export function SectionHeader({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="flex items-baseline justify-between" style={{ height: 15 }}>
      <h2
        className="text-footnote font-medium uppercase"
        style={{ color: 'var(--color-ink-secondary)' }}
      >
        {label}
      </h2>
      {meta && (
        <span className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
          {meta}
        </span>
      )}
    </div>
  )
}
