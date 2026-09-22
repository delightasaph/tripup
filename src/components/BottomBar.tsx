import { Icon, type IconName } from './Icon'

export type Tab = { id: string; label: string; icon: IconName }

type BottomBarProps = {
  tabs: [Tab, Tab]
  activeId: string
  /** Label for the FAB, which adds to the trip. */
  fabLabel?: string
}

/**
 * The floating bar: a 264 × 60 white tab bar plus a 60 × 60 dark FAB at
 * y = 756, over a 150 pt fade from Surface/Ground transparent to opaque so
 * the timeline scrolls away behind it.
 */
export function BottomBar({ tabs, activeId, fabLabel = 'Add to trip' }: BottomBarProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 150, background: 'var(--gradient-bottom-fade)' }}
      />
      <div
        className="absolute flex items-center justify-between"
        style={{ left: 20, bottom: 28, width: 350, height: 60 }}
      >
        <div
          className="flex items-center"
          style={{
            width: 264,
            height: 60,
            borderRadius: 'var(--radius-pill)',
            background: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 12px rgb(31 30 36 / 0.1))',
            padding: 6,
          }}
          role="tablist"
        >
          {tabs.map((t) => {
            const active = t.id === activeId
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                className="flex h-[48px] items-center gap-[8px] rounded-pill"
                style={{
                  paddingInline: active ? 18 : 17,
                  background: active ? 'var(--color-ink-primary)' : 'transparent',
                  color: active ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)',
                }}
              >
                <Icon
                  name={t.icon}
                  size={18}
                  color={active ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)'}
                />
                <span className="text-body font-medium">{t.label}</span>
              </button>
            )
          })}
        </div>
        <button
          type="button"
          aria-label={fabLabel}
          className="flex items-center justify-center rounded-pill"
          style={{
            width: 60,
            height: 60,
            background: 'var(--color-ink-primary)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
          }}
        >
          <Icon name="plus" size={20} />
        </button>
      </div>
    </>
  )
}
