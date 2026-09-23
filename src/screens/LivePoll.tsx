import { Avatar } from '@/components/Avatar'
import { Button, IconButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { LivePill } from '@/components/LivePill'
import { PollOptionCard } from '@/components/PollOptionCard'
import { Ticker } from '@/components/Ticker'
import { pendingRing } from '@/data/assets'
import { dinnerPoll } from '@/data/trip'

/**
 * 05 · Live poll, Ari's view — Figma 84:169.
 * Static layout; the countdown, arriving votes and animation come later.
 *
 * Offsets are the frame's own: content at x 20 / y 64, body at +60, options at
 * +154 with cards at 0 / 140 / 268, "Waiting on Sven" at +562, actions at 756.
 */
export function LivePoll() {
  const { question, askedLine, askedBy, closesIn, options, ticker, waitingOn } = dinnerPoll

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute" style={{ left: 'var(--screen-padding)', top: 14, width: 350 }}>
        {/* Nav */}
        <div className="flex h-[40px] items-center justify-between">
          <IconButton label="Back to itinerary" size={40}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
          <LivePill countdown={closesIn} />
        </div>

        <div style={{ height: 20 }} />

        {/* Question */}
        <div className="flex items-center" style={{ height: 22 }}>
          <Avatar person={askedBy} size={22} />
          <span
            className="text-footnote"
            style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}
          >
            {askedLine}
          </span>
        </div>
        <h1 className="text-title2 font-semibold" style={{ marginTop: 8, width: 330 }}>
          {question}
        </h1>

        <div style={{ height: 16 }} />
        <Ticker person={ticker.person} event={ticker.event} when={ticker.when} />

        {/* Options — 0 / 140 / 268 from the top of the group */}
        <div className="relative" style={{ marginTop: 16, height: 388 }}>
          {options.map((o, i) => (
            <div key={o.id} className="absolute left-0" style={{ top: [0, 140, 268][i] }}>
              <PollOptionCard option={o} fill={o.fill} leading={i === 0} yourVote={i === 0} />
            </div>
          ))}
        </div>

        {/* Waiting on Sven */}
        <div
          className="relative"
          style={{
            marginTop: 20,
            width: 350,
            height: 64,
            borderRadius: 'var(--radius-card)',
            background: 'var(--color-surface-white-70)',
            outline: '1px solid var(--color-line-default)',
            outlineOffset: '-1px',
          }}
        >
          <span
            className="absolute"
            style={{ left: 10, top: 10, width: 42, height: 42 }}
          >
            <img
              src={pendingRing}
              alt=""
              aria-hidden="true"
              width={42}
              height={42}
              className="absolute inset-0"
            />
            <span className="absolute" style={{ left: 3, top: 3, opacity: 0.55 }}>
              <Avatar person={waitingOn} size={36} />
            </span>
          </span>
          <div className="absolute" style={{ left: 64, top: 13 }}>
            <p className="text-body font-semibold">6 of 7 voted</p>
            <p
              className="text-caption"
              style={{ marginTop: 3, color: 'var(--color-ink-secondary)' }}
            >
              Waiting on {waitingOn.label}
            </p>
          </div>
          <div className="absolute" style={{ left: 241, top: 13 }}>
            <Button
              variant="lilac"
              height={38}
              icon={<Icon name="bell" size={16} />}
              style={{ width: 95, paddingInline: 0 }}
            >
              Nudge
            </Button>
          </div>
        </div>
      </div>

      {/* Actions over a 130 fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 130, background: 'var(--gradient-bottom-fade)' }}
      />
      <div
        className="absolute flex"
        style={{ left: 20, bottom: 34, width: 350, height: 54, gap: 10 }}
      >
        <Button variant="secondary" height={54} style={{ width: 137 }}>
          Change vote
        </Button>
        <Button variant="primary" height={54} style={{ width: 203 }}>
          Close poll now
        </Button>
      </div>
    </div>
  )
}
