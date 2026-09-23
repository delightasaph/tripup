import { motion } from 'framer-motion'
import { Icon, type IconName } from './Icon'

type ToastProps = {
  title: string
  detail: string
  /** The glyph inside the lime circle. */
  icon?: IconName
  /** Glyph size — 13 on 04's check, 14 on 06's calendar. */
  iconSize?: number
}

/**
 * Ink pill-card, 350 wide, sitting at y 56 in frame coordinates. Lime 28
 * circle, title in white Footnote/Medium over a lime Caption/Regular detail.
 * Drops in from −20px with a fade, 250ms (§6.1); auto-dismiss is 3s, timed by
 * the store.
 */
export function Toast({ title, detail, icon = 'check', iconSize = 13 }: ToastProps) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="absolute flex items-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        left: 20,
        top: 'calc(56px - var(--status-bar-height))',
        width: 350,
        gap: 10,
        padding: '10px 16px 10px 10px',
        borderRadius: 'var(--radius-card)',
        background: 'var(--color-ink-primary)',
        filter: 'drop-shadow(0 10px 12px rgb(31 30 36 / 0.25))',
      }}
    >
      <span
        className="flex shrink-0 items-center justify-center rounded-pill"
        style={{ width: 28, height: 28, background: 'var(--color-accent-lime)' }}
      >
        <Icon name={icon} size={iconSize} />
      </span>
      <span className="flex flex-col items-start">
        <span
          className="text-footnote font-medium"
          style={{ color: 'var(--color-surface-white)' }}
        >
          {title}
        </span>
        <span
          className="text-caption"
          style={{ marginTop: 1, color: 'var(--color-accent-lime)' }}
        >
          {detail}
        </span>
      </span>
    </motion.div>
  )
}
