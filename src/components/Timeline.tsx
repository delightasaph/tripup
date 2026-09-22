import type { CSSProperties, ReactNode } from 'react'

/** done = grey dot · next = ink dot with a soft ring · open = violet ring ·
 *  filled = solid violet (once the poll has resolved the slot). */
export type NodeKind = 'done' | 'next' | 'open' | 'filled'

/**
 * The continuous 2 pt rail sits behind the nodes and fades into violet at the
 * open slot, so the eye is carried to the decision that still has to be made.
 */
export function Timeline({ height, children }: { height: number; children: ReactNode }) {
  return (
    <div className="relative" style={{ height }}>
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: 53,
          top: 14,
          width: 2,
          height: height - 32,
          borderRadius: 'var(--radius-pill)',
          background:
            'linear-gradient(180deg, rgb(31 30 36 / 0.1) 0%, rgb(31 30 36 / 0.12) 45%, rgb(91 79 232 / 0.5) 50%, rgb(91 79 232 / 0) 100%)',
        }}
      />
      {children}
    </div>
  )
}

function TimelineNode({ kind, top }: { kind: NodeKind; top: number }) {
  const base: CSSProperties = {
    position: 'absolute',
    left: 49,
    top,
    width: 10,
    height: 10,
    borderRadius: '50%',
  }

  const byKind: Record<NodeKind, CSSProperties> = {
    done: { background: 'var(--color-line-default)' },
    next: {
      background: 'var(--color-ink-primary)',
      boxShadow: '0 0 0 5px rgb(31 30 36 / 0.12)',
    },
    open: {
      background: 'var(--color-surface-ground)',
      boxShadow: 'inset 0 0 0 2px var(--color-accent-violet)',
    },
    filled: { background: 'var(--color-accent-violet)' },
  }

  return <span aria-hidden="true" style={{ ...base, ...byKind[kind] }} />
}

type TimelineRowProps = {
  /** Offset from the top of the timeline, straight off the Figma frame. */
  top: number
  time: string
  timeTone?: 'muted' | 'ink' | 'violet'
  /** Done rows step the time back to 60%. */
  timeOpacity?: number
  /** Where the time label and node sit relative to the row top. */
  timeOffset?: number
  nodeOffset?: number
  node: NodeKind
  children: ReactNode
}

/** Time column 49 · node column 21 · card 280. */
export function TimelineRow({
  top,
  time,
  timeTone = 'muted',
  timeOpacity,
  timeOffset = 15,
  nodeOffset = 18,
  node,
  children,
}: TimelineRowProps) {
  const timeColor = {
    muted: 'var(--color-ink-secondary)',
    ink: 'var(--color-ink-primary)',
    violet: 'var(--color-accent-violet)',
  }[timeTone]

  return (
    <div className="absolute left-0 w-full" style={{ top }}>
      <time
        className="absolute left-0 text-footnote font-medium tabular-nums"
        style={{ top: timeOffset, color: timeColor, opacity: timeOpacity }}
      >
        {time}
      </time>
      <TimelineNode kind={node} top={nodeOffset} />
      <div className="absolute" style={{ left: 70, width: 280 }}>
        {children}
      </div>
    </div>
  )
}
