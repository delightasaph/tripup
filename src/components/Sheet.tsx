import { motion, useReducedMotion, type PanInfo } from 'framer-motion'
import type { ReactNode } from 'react'
import { DUR_FAST, SPRING_SHEET } from '@/styles/motion'

type SheetProps = {
  children: ReactNode
  /**
   * The sheet's top edge **in Figma frame coordinates** (y from the top of the
   * 844 frame). Screens render below the status bar, so this is converted
   * internally — passing a screen-space value puts the sheet 50 px low.
   *
   * Omit it when the frame's sheet hugs its content (bottom-anchored, no
   * height set); the sheet then sizes to what it holds.
   */
  frameTop?: number
  /** Vertical gap between the sheet's sections. */
  gap?: number
  /** Dragging the grabber down past a distance or velocity threshold calls
   *  this — the same way Cancel or the scrim tap does. */
  onDismiss?: () => void
}

/**
 * A bottom sheet over a scrim: full width, top corners 28, padding 10 / 20 /
 * 34, and a 40 × 5 grabber. The scrim is drawn by `Scrim` so a screen can
 * decide what sits behind it.
 *
 * Comes up with spring/sheet (docs/DESIGN_SYSTEM.md §6.0) and is draggable
 * down, dismissing on distance **or** velocity, not distance alone.
 */
export function Sheet({ children, frameTop, gap = 16, onDismiss }: SheetProps) {
  const reduceMotion = useReducedMotion()

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!onDismiss) return
    if (info.offset.y > 120 || info.velocity.y > 700) onDismiss()
  }

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 flex flex-col items-start"
      style={{
        top:
          frameTop === undefined
            ? undefined
            : `calc(${frameTop}px - var(--status-bar-height))`,
        background: 'var(--color-surface-white)',
        borderTopLeftRadius: 'var(--radius-sheet)',
        borderTopRightRadius: 'var(--radius-sheet)',
        filter: 'drop-shadow(0 -8px 15px rgb(31 30 36 / 0.12))',
        padding: '10px 20px 34px',
        gap,
      }}
      initial={reduceMotion ? { opacity: 0 } : { y: '100%' }}
      animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { y: '100%' }}
      transition={reduceMotion ? { duration: DUR_FAST } : SPRING_SHEET}
      drag={onDismiss ? 'y' : false}
      dragDirectionLock
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.4 }}
      onDragEnd={handleDragEnd}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex w-full shrink-0 justify-center">
        <span
          aria-hidden="true"
          style={{
            width: 40,
            height: 5,
            borderRadius: 3,
            background: 'var(--color-line-default)',
          }}
        />
      </div>
      {children}
    </motion.div>
  )
}

/**
 * The scrim behind a sheet.
 *
 * It covers the **whole frame, status bar included** — the frames put it at
 * inset 0 on the 390 × 844 root. Screens render below the status bar, so the
 * scrim is pulled up by its height to reach over it.
 *
 * The screen wrapping this must not set `overflow: hidden`, or the overhang is
 * clipped and the status bar stays undimmed.
 */
export function Scrim({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      aria-hidden="true"
      onClick={onClick}
      className="absolute right-0 bottom-0 left-0"
      style={{
        top: 'calc(-1 * var(--status-bar-height))',
        background: 'var(--color-overlay-scrim)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR_FAST }}
    />
  )
}

/** "Buddies" on the left, "6 on this trip" on the right. */
export function SheetHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex w-full shrink-0 items-center justify-between">
      <h2 className="text-heading font-semibold">{title}</h2>
      {meta && (
        <span className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
          {meta}
        </span>
      )}
    </div>
  )
}
