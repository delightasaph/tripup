import type { ReactNode } from 'react'

/** done = grey dot · next = ink dot with a soft ring · open = violet ring ·
 *  filled = solid violet (once the poll has resolved the slot). */
export type NodeKind = 'done' | 'next' | 'open' | 'filled'

/** Node column height and the dot's offset within it, per the frame's own
 *  node graphics. */
const NODE: Record<NodeKind, { height: number; dotTop: number }> = {
  done: { height: 28, dotTop: 18 },
  next: { height: 34, dotTop: 19 },
  open: { height: 29, dotTop: 19 },
  filled: { height: 29, dotTop: 19 },
}

/**
 * The continuous 2 pt rail sits behind the nodes and fades into violet at the
 * open slot, so the eye is carried to the decision still to be made. Rows
 * stack in flow at gap 8 — the frame lays them out the same way.
 */
export function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex shrink-0 flex-col items-start" style={{ gap: 8 }}>
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: 53,
          top: 14,
          bottom: 32,
          width: 2,
          borderRadius: 1,
          background:
            'linear-gradient(180deg, rgb(31 30 36 / 0.1) 0%, rgb(31 30 36 / 0.12) 45%, rgb(91 79 232 / 0.5) 50%, rgb(91 79 232 / 0) 100%)',
        }}
      />
      {children}
    </div>
  )
}

function TimelineNode({ kind }: { kind: NodeKind }) {
  const { height, dotTop } = NODE[kind]

  const look: Record<NodeKind, React.CSSProperties> = {
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

  return (
    <div className="relative shrink-0" style={{ width: 21, height }} aria-hidden="true">
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: dotTop,
          width: 10,
          height: 10,
          borderRadius: '50%',
          ...look[kind],
        }}
      />
    </div>
  )
}

type TimelineRowProps = {
  time: string
  timeTone?: 'muted' | 'ink' | 'violet'
  /** Done rows step the time back to 60%. */
  timeOpacity?: number
  /** Top padding on the time column — 15 on done rows, 16 on live ones. */
  timeOffset?: number
  /** Top padding on the whole row; the open slot sits 4 lower. */
  rowOffset?: number
  node: NodeKind
  children: ReactNode
}

/** Time column 49 · node column 21 · card 280. */
export function TimelineRow({
  time,
  timeTone = 'muted',
  timeOpacity,
  timeOffset = 15,
  rowOffset = 0,
  node,
  children,
}: TimelineRowProps) {
  const timeColor = {
    muted: 'var(--color-ink-secondary)',
    ink: 'var(--color-ink-primary)',
    violet: 'var(--color-accent-violet)',
  }[timeTone]

  return (
    <div
      className="relative flex shrink-0 items-start"
      style={{ paddingTop: rowOffset || undefined }}
    >
      <div className="flex shrink-0 flex-col items-start" style={{ width: 49, paddingTop: timeOffset }}>
        <time
          className="text-footnote font-medium tabular-nums whitespace-nowrap"
          style={{ color: timeColor, opacity: timeOpacity }}
        >
          {time}
        </time>
      </div>
      <TimelineNode kind={node} />
      {children}
    </div>
  )
}
