import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'

export type ButtonVariant = 'primary' | 'secondary' | 'violet' | 'lilac'

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>

type ButtonProps = NativeButtonProps & {
  children: ReactNode
  variant?: ButtonVariant
  /** 54 for full-width actions, 40 for in-card, 38 where Figma says so. */
  height?: number
  icon?: ReactNode
  fullWidth?: boolean
}

/**
 * Primary is Ink/Primary with white Body/Medium; secondary is white with a
 * 1.5 px Line/Default inside border. Every variant keeps a 44 pt tap target
 * even when the drawn height is smaller. Every touch answers: `whileTap`
 * scales to 0.97 over --dur-micro (docs/DESIGN_SYSTEM.md §6.0).
 */
export function Button({
  children,
  variant = 'primary',
  height = 54,
  icon,
  fullWidth,
  className = '',
  style,
  ...rest
}: ButtonProps) {
  const look: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: 'var(--color-ink-primary)',
      color: 'var(--color-surface-white)',
      boxShadow: 'var(--shadow-dark-button)',
    },
    secondary: {
      background: 'var(--color-surface-white)',
      color: 'var(--color-ink-primary)',
      boxShadow: 'inset 0 0 0 1.5px var(--color-line-default)',
    },
    violet: {
      background: 'var(--color-accent-violet)',
      color: 'var(--color-surface-white)',
    },
    lilac: {
      background: 'var(--color-accent-lilac)',
      color: 'var(--color-ink-primary)',
    },
  }

  return (
    <motion.button
      type="button"
      whileHover={rest.disabled ? undefined : HOVER_SMALL}
      whileTap={rest.disabled ? undefined : TAP_SMALL}
      transition={TAP_TRANSITION}
      className={`inline-flex items-center justify-center gap-[6px] rounded-pill text-body font-medium ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={{ height, paddingInline: 16, ...look[variant], ...style }}
      {...rest}
    >
      {icon}
      {children}
    </motion.button>
  )
}

type IconButtonProps = NativeButtonProps & {
  children: ReactNode
  size?: number
  /** White with a card shadow by default; pass a token for lime etc. */
  background?: string
  ring?: string
  label: string
}

/** Round icon button — 40 or 44 in nav, 30 in the buddy row. */
export function IconButton({
  children,
  size = 40,
  background = 'var(--color-surface-white)',
  ring,
  label,
  className = '',
  style,
  ...rest
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={rest.disabled ? undefined : HOVER_SMALL}
      whileTap={rest.disabled ? undefined : TAP_SMALL}
      transition={TAP_TRANSITION}
      className={`inline-flex shrink-0 items-center justify-center rounded-pill ${className}`}
      style={{
        width: size,
        height: size,
        background,
        filter: 'drop-shadow(0 6px 9px rgb(31 30 36 / 0.08))',
        boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
