import type { ReactNode } from 'react'
import { useFitsDeviceFrame } from '@/lib/useFitsDeviceFrame'
import { StatusBar } from './StatusBar'
import { HomeIndicator } from './HomeIndicator'

type ScreenProps = {
  children: ReactNode
  /** Clock shown in the status bar — each screen in the spec has its own. */
  time?: string
  /** Light glyphs for the lock-screen frame (04b). */
  tone?: 'dark' | 'light'
  /** Background behind the screen content. Defaults to Surface/Ground. */
  background?: string
  /** Hide the status bar and home indicator when a screen draws its own. */
  chrome?: boolean
}

/** The screen surface itself: status bar, content, home indicator. */
function Screen({
  children,
  time = '18:05',
  tone = 'dark',
  background = 'var(--color-surface-ground)',
  chrome = true,
}: ScreenProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ background }}>
      {chrome && <StatusBar time={time} tone={tone} />}
      <div className="relative min-h-0 flex-1">{children}</div>
      {chrome && <HomeIndicator tone={tone} />}
    </div>
  )
}

/**
 * A hard 390 × 844 pt bezel at 1:1, for embedding in a document (the
 * styleguide) where the page layout is not the device itself.
 */
export function PhoneShell({ children, ...screen }: ScreenProps) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: 'var(--device-width)',
        height: 'var(--device-height)',
        borderRadius: '54px',
        boxShadow: 'var(--shadow-device)',
        outline: '10px solid #17161b',
        outlineOffset: '-10px',
      }}
    >
      <Screen {...screen}>{children}</Screen>
    </div>
  )
}

/**
 * The one reference device: iPhone 14, 390 × 844 pt, never scaled.
 * On desktop it is a centred frame on Surface/Canvas; on a phone-sized
 * viewport it fills the screen instead, so the prototype is demoable on a
 * real handset without a transform.
 */
export function DeviceFrame({ children, ...screen }: ScreenProps) {
  const framed = useFitsDeviceFrame()

  if (!framed) {
    return (
      <div
        className="w-full overflow-hidden"
        style={{ height: '100dvh', background: screen.background ?? 'var(--color-surface-ground)' }}
      >
        <Screen {...screen}>{children}</Screen>
      </div>
    )
  }

  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center p-6"
      style={{ background: 'var(--color-surface-canvas)' }}
    >
      <PhoneShell {...screen}>{children}</PhoneShell>
    </div>
  )
}
