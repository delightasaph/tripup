import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { IconButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { LivePill } from '@/components/LivePill'
import { Pill } from '@/components/Pill'
import { Ticker } from '@/components/Ticker'
import { placePhotos } from '@/data/assets'
import { dinnerPoll, people } from '@/data/trip'

/**
 * 04c · Vote, Nic's view — Figma `166:2631`.
 *
 * Results are hidden until you vote (avoids herd voting) — so this is a plain
 * radio list, not `PollOptionCard`. Nic's default pick is Time Out Market, per
 * the spec's vote table; tapping another option moves the selection and
 * relabels the vote button, purely as local state (no cross-screen wiring
 * yet).
 */
export function Vote() {
  const [selected, setSelected] = useState('timeout')
  const option = dinnerPoll.places.find((p) => p.id === selected)!

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute" style={{ left: 'var(--screen-padding)', top: 14, width: 350 }}>
        {/* Nav */}
        <div className="flex h-[40px] items-center justify-between">
          <div className="flex items-center" style={{ gap: 10 }}>
            <IconButton label="Close">
              <Icon name="close" size={20} />
            </IconButton>
            <Pill variant="lime" height={27} className="font-medium">
              On Nic’s phone
            </Pill>
          </div>
          <LivePill countdown={dinnerPoll.closesIn} />
        </div>

        <div style={{ height: 20 }} />

        {/* Question */}
        <div className="flex items-center" style={{ height: 22 }}>
          <Avatar person={dinnerPoll.askedBy} size={22} />
          <span
            className="text-footnote"
            style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}
          >
            {dinnerPoll.askedLine}
          </span>
        </div>
        <h1 className="text-title2 font-semibold" style={{ marginTop: 8, width: 330 }}>
          {dinnerPoll.question}
        </h1>

        <div style={{ height: 16 }} />
        <Ticker person={people.bea} event="voted" when="1 min ago" />

        {/* Options — selectable, no results shown yet */}
        <div className="flex w-full flex-col items-start" style={{ marginTop: 16, gap: 8 }}>
          {dinnerPoll.places.map((p) => {
            const isSelected = p.id === selected
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                aria-pressed={isSelected}
                className="flex w-full items-center text-left"
                style={{
                  gap: 14,
                  width: 350,
                  padding: '14px 16px 14px 14px',
                  borderRadius: 'var(--radius-card-lg)',
                  background: 'var(--color-surface-white)',
                  border: isSelected
                    ? '2px solid var(--color-ink-primary)'
                    : '2px solid transparent',
                }}
              >
                <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
                  <img
                    src={placePhotos[p.photo]}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-tile)',
                      display: 'block',
                    }}
                  />
                  <span
                    className="absolute flex items-center justify-center rounded-pill"
                    style={{
                      left: 34,
                      top: 34,
                      width: 22,
                      height: 22,
                      background: 'var(--color-surface-white)',
                      boxShadow: '0 2px 4px rgb(0 0 0 / 0.12)',
                    }}
                  >
                    <Icon name={p.icon} size={13} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-headline font-semibold whitespace-nowrap">{p.name}</p>
                  <p
                    className="text-caption whitespace-nowrap"
                    style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
                  >
                    {p.line}
                  </p>
                </div>
                {isSelected ? (
                  <span
                    className="flex shrink-0 items-center justify-center rounded-pill"
                    style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                  >
                    <Icon name="check-white" size={13} />
                  </span>
                ) : (
                  <span
                    className="shrink-0 rounded-pill"
                    style={{
                      width: 24,
                      height: 24,
                      outline: '1.5px solid rgb(31 30 36 / 0.25)',
                      outlineOffset: '-1.5px',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div
          className="flex w-full items-center justify-center text-footnote"
          style={{ marginTop: 20, color: 'var(--color-ink-secondary)' }}
        >
          5 of 7 have voted · results show once you vote
        </div>
      </div>

      {/* Vote button, docked */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 130, background: 'var(--gradient-bottom-fade)' }}
      />
      <div className="absolute flex items-center" style={{ left: 20, right: 20, bottom: 34 }}>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
          }}
        >
          Vote for {option.name}
        </button>
      </div>
    </div>
  )
}
