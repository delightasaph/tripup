/**
 * Framer Motion constants — the JS mirror of the tokens in
 * docs/DESIGN_SYSTEM.md §6.0 / src/styles/tokens.css. A `transition` prop
 * needs seconds and cubic-bezier arrays, not CSS strings, so these are kept
 * in sync by hand. Never hand-write a duration or a spring config in a
 * component — import it from here.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const

export const DUR_MICRO = 0.12
export const DUR_FAST = 0.2
export const DUR_BASE = 0.28
export const DUR_SLOW = 0.42

/** Sheets sliding up, and nothing else. */
export const SPRING_SHEET = { type: 'spring', stiffness: 380, damping: 34, mass: 0.9 } as const
/** Faces, chips, counts. */
export const SPRING_POP = { type: 'spring', stiffness: 500, damping: 30 } as const
/** The FAB's container-transform into the quick-add panel — snappier and
 *  less bouncy than the sheet spring, since it's a small element growing in
 *  place, not a large surface sliding from off-screen. */
export const SPRING_FAB_EXPAND = { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 } as const

/** Press feedback for ordinary controls — chips, rows, buttons. */
export const TAP_SMALL = { scale: 0.97 }
/** Press feedback for large cards, where 0.97 would be felt as jitter. */
export const TAP_LARGE = { scale: 0.985 }
export const TAP_TRANSITION = { duration: DUR_MICRO, ease: EASE_OUT }

/** Hover feedback — a mouse-driven nicety (the demo is often run on desktop);
 *  harmless on touch, which never fires `whileHover`. Subtle on purpose. */
export const HOVER_SMALL = { scale: 1.015 }
export const HOVER_LIFT = { y: -2 }
export const HOVER_TRANSITION = { duration: DUR_FAST, ease: EASE_OUT }

/** Lists stagger children 40ms on first mount only — never on re-render. */
export const STAGGER_CHILDREN = 0.04

export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DUR_FAST, ease: EASE_OUT },
}
