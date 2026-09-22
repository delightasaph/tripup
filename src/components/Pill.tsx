import type { ReactNode } from 'react'

export type PillVariant =
  | 'white'
  | 'white70'
  | 'lime'
  | 'lilac'
  | 'violet-tint'
  | 'ink'
  | 'violet'

const variants: Record<PillVariant, { background: string; color: string }> = {
  white: { background: 'var(--color-surface-white)', color: 'var(--color-ink-primary)' },
  white70: { background: 'var(--color-surface-white-70)', color: 'var(--color-ink-primary)' },
  lime: { background: 'var(--color-accent-lime)', color: 'var(--color-ink-primary)' },
  lilac: { background: 'var(--color-accent-lilac)', color: 'var(--color-ink-primary)' },
  'violet-tint': {
    background: 'var(--color-accent-violet-tint)',
    color: 'var(--color-accent-violet)',
  },
  // The dark pill with lime text: "Next", "Won 4 · 2 · 1".
  ink: { background: 'var(--color-ink-primary)', color: 'var(--color-accent-lime)' },
  violet: { background: 'var(--color-accent-violet)', color: 'var(--color-surface-white)' },
}

type PillProps = {
  children: ReactNode
  variant?: PillVariant
  /** Height in px; the radius is always a full pill. */
  height?: number
  className?: string
  style?: React.CSSProperties
}

export function Pill({
  children,
  variant = 'white',
  height = 24,
  className = '',
  style,
}: PillProps) {
  const v = variants[variant]
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-[6px] rounded-pill px-[10px] ${className}`}
      style={{ height, background: v.background, color: v.color, ...style }}
    >
      {children}
    </span>
  )
}
