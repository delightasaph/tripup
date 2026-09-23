import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { DUR_FAST, HOVER_SMALL, SPRING_FAB_EXPAND, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { Icon, type IconName } from './Icon'

export type QuickAddItem = {
  id: string
  label: string
  icon: IconName
  onSelect: () => void
}

const PANEL_WIDTH = 236
const PANEL_HEIGHT = 460
const FAB_SIZE = 60

/**
 * The FAB, and the quick-add menu it becomes (docs/INTERACTION_EXECUTION_
 * BRIEF.md §2). One element throughout — `layout` animates its own box from
 * a 60×60 circle into a rounded panel anchored at the same bottom-right
 * corner, a container transform rather than a sheet sliding up from the
 * edge. The "+" rotates into an "×" as it opens (a plus rotated 45° is a
 * times sign — no separate icon needed). `items` is a plain list so a third
 * or fourth action is just another array entry, not a layout rewrite.
 */
export function QuickAddFab({ items, label = 'Add to trip' }: { items: QuickAddItem[]; label?: string }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const close = () => setOpen(false)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            onClick={close}
            className="absolute right-0 bottom-0 left-0"
            style={{ top: 'calc(-1 * var(--status-bar-height))', background: 'var(--color-overlay-scrim)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR_FAST }}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        className="absolute flex flex-col items-stretch overflow-hidden"
        style={{
          position: 'absolute',
          right: 20,
          bottom: 28,
          width: open ? PANEL_WIDTH : FAB_SIZE,
          height: open ? PANEL_HEIGHT : FAB_SIZE,
          borderRadius: open ? 'var(--radius-card-lg)' : 'var(--radius-pill)',
          background: 'var(--color-ink-primary)',
          filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
        }}
        transition={reduceMotion ? { duration: DUR_FAST } : SPRING_FAB_EXPAND}
      >
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR_FAST, delay: reduceMotion ? 0 : 0.08 }}
            className="flex min-h-0 flex-1 flex-col items-stretch"
            style={{ padding: '14px 10px', paddingBottom: FAB_SIZE + 10, gap: 2 }}
          >
            <p
              className="text-caption font-medium uppercase"
              style={{ padding: '4px 10px 10px', color: 'var(--color-surface-white)', opacity: 0.55 }}
            >
              Add to trip
            </p>
            {items.map((item) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => {
                  close()
                  item.onSelect()
                }}
                whileHover={HOVER_SMALL}
                whileTap={TAP_SMALL}
                transition={TAP_TRANSITION}
                className="flex w-full shrink-0 items-center text-left"
                style={{
                  gap: 12,
                  height: 48,
                  padding: '0 10px',
                  borderRadius: 'var(--radius-row)',
                  color: 'var(--color-surface-white)',
                }}
              >
                <span
                  className="flex shrink-0 items-center justify-center rounded-pill"
                  style={{ width: 32, height: 32, background: 'rgb(255 255 255 / 0.12)' }}
                >
                  <Icon name={item.icon} size={16} color="var(--color-surface-white)" />
                </span>
                <span className="text-body font-medium">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        <motion.button
          type="button"
          aria-label={open ? 'Close' : label}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="absolute flex items-center justify-center rounded-pill"
          style={{ width: FAB_SIZE, height: FAB_SIZE, right: 0, bottom: 0 }}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={reduceMotion ? { duration: DUR_FAST } : SPRING_FAB_EXPAND}
            style={{ display: 'flex' }}
          >
            <Icon name="plus-white" size={20} />
          </motion.span>
        </motion.button>
      </motion.div>
    </>
  )
}
