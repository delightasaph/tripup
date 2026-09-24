import { screens, type ScreenEntry } from './registry'

/**
 * Stands in until the screens are built. It is not filler: it shows the
 * journey in flow order and the Figma node each frame is built from, so the
 * scaffold is demoable on its own.
 */
export function Placeholder({ active }: { active?: ScreenEntry }) {
  return (
    <div
      className="no-scrollbar h-full overflow-y-auto pb-10"
      style={{ paddingInline: 'var(--screen-padding)' }}
    >
      <div style={{ height: 'calc(var(--content-top) - var(--status-bar-height))' }} />
      <p className="text-footnote font-medium uppercase tracking-[0.08em] text-ink-secondary">
        Screen index
      </p>
      <h1 className="mt-2 text-title1 font-semibold">
        {active ? active.title : 'TripUp'}
      </h1>
      <p className="mt-2 text-body text-ink-secondary">
        {active
          ? `Frame ${active.no} · on ${active.phone}’s phone · Figma ${active.figmaNode}. Not built yet.`
          : 'Every screen in the journey, in flow order. Internal — the app opens on Home.'}
      </p>

      <ol className="mt-6 space-y-[6px]">
        {screens.map((s) => {
          const isActive = active?.id === s.id
          return (
            <li key={s.id}>
              <a
                href={s.path.replace(':entryId', 'fado')}
                className="flex items-center gap-3 rounded-row-lg px-4 py-3"
                style={{
                  background: isActive ? 'var(--color-accent-lime)' : 'var(--color-surface-white)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span className="w-[26px] shrink-0 text-caption font-medium text-ink-secondary">
                  {s.no}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-headline font-semibold">{s.title}</span>
                  <span className="block text-caption text-ink-secondary">{s.phone}’s phone</span>
                </span>
                <code className="shrink-0 text-caption2 text-ink-secondary">{s.path}</code>
              </a>
            </li>
          )
        })}
      </ol>

      <a
        href="/styleguide"
        className="mt-6 flex h-[54px] items-center justify-center rounded-pill text-body font-medium"
        style={{
          background: 'var(--color-ink-primary)',
          color: 'var(--color-surface-white)',
          boxShadow: 'var(--shadow-dark-button)',
        }}
      >
        Open the style guide
      </a>
    </div>
  )
}
