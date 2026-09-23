import { motion } from 'framer-motion'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { Icon, type IconName } from './Icon'
import { QuickAddFab, type QuickAddItem } from './QuickAddFab'

export type Tab = { id: string; label: string; icon: IconName }

type BottomBarProps = {
  tabs: [Tab, Tab]
  activeId: string
  /** Label for the FAB, which adds to the trip. */
  fabLabel?: string
  onTabChange?: (id: string) => void
  /** The FAB's quick-add menu rows — omit to hide the FAB entirely. */
  fabItems?: QuickAddItem[]
}

/**
 * The floating bar: a 264 × 60 white tab bar plus a 60 × 60 dark FAB at
 * y = 756, over a 150 pt fade from Surface/Ground transparent to opaque so
 * the timeline scrolls away behind it.
 *
 * The active tab's ink pill carries `layoutId="tab-pill"` — Itinerary ↔
 * Expenses is really one tab bar, so switching slides the same pill across
 * instead of cutting between two flat colours, even though the two tabs live
 * on separate screens/routes.
 */
export function BottomBar({ tabs, activeId, fabLabel = 'Add to trip', onTabChange, fabItems }: BottomBarProps) {
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
              <motion.button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange?.(t.id)}
                whileHover={active ? undefined : HOVER_SMALL}
                whileTap={TAP_SMALL}
                transition={TAP_TRANSITION}
                className="relative flex h-[48px] items-center gap-[8px] rounded-pill"
                style={{
                  paddingInline: active ? 18 : 17,
                  color: active ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)',
                }}
              >
                {active && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-pill"
                    style={{ background: 'var(--color-ink-primary)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon
                  name={t.icon}
                  size={18}
                  color={active ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)'}
                  className="relative"
                />
                <span className="relative text-body font-medium">{t.label}</span>
              </motion.button>
            )
          })}
        </div>
        {/* The FAB manages its own absolute position (it grows into a panel
            that must escape this row's layout) — this spacer just keeps
            `justify-between` spacing the tab bar the same as when it sat
            here directly. */}
        <div aria-hidden="true" style={{ width: 60, height: 60 }} />
      </div>
      {fabItems && <QuickAddFab items={fabItems} label={fabLabel} />}
    </>
  )
}
