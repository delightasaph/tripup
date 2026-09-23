import type { ReactNode } from 'react'

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
}

/**
 * A bottom sheet over a scrim: full width, top corners 28, padding 10 / 20 /
 * 34, and a 40 × 5 grabber. The scrim is drawn by `Scrim` so a screen can
 * decide what sits behind it.
 */
export function Sheet({ children, frameTop, gap = 16 }: SheetProps) {
  return (
    <div
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
    </div>
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
export function Scrim() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-0 bottom-0 left-0"
      style={{
        top: 'calc(-1 * var(--status-bar-height))',
        background: 'var(--color-overlay-scrim)',
      }}
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
