/** iOS home indicator: 134 × 5, sitting 13 pt from the bottom of the screen. */
export function HomeIndicator({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[34px] items-center justify-center"
      aria-hidden="true"
    >
      <span
        className="h-[5px] w-[134px] rounded-pill"
        style={{
          marginBottom: '13px',
          background:
            tone === 'light' ? 'var(--color-surface-white)' : 'var(--color-ink-primary)',
        }}
      />
    </div>
  )
}
