import { motion } from 'framer-motion'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { Icon } from './Icon'

/**
 * The dark "+" that adds to the trip — 60 × 60 at the right end of the
 * floating bar.
 *
 * It opens the quick-add sheet (12) like every other sheet in the app: the
 * same `Sheet` component, the same spring, the same scrim, the same 0.96
 * scale on the screen behind. It used to expand into a panel anchored at its
 * own corner; that made it the one surface in the app that behaved unlike
 * the rest, so it was dropped (docs/PRODUCT_SPEC.md §4 · 12).
 */
export function Fab({ onPress, label = 'Add to trip' }: { onPress: () => void; label?: string }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={onPress}
      whileHover={HOVER_SMALL}
      whileTap={TAP_SMALL}
      transition={TAP_TRANSITION}
      className="absolute flex items-center justify-center rounded-pill"
      style={{
        right: 20,
        bottom: 28,
        width: 60,
        height: 60,
        background: 'var(--color-ink-primary)',
        filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
      }}
    >
      <Icon name="plus-white" size={20} />
    </motion.button>
  )
}
