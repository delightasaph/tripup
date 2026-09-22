import { Icon } from '@/components/Icon'
import { Scrim, Sheet } from '@/components/Sheet'
import { Toast } from '@/components/Toast'
import { placePhotos } from '@/data/assets'
import { dinnerPoll } from '@/data/trip'
import { TripLisbon } from './TripLisbon'

/**
 * 04 · New poll — Figma 164:2379.
 * The trip screen under a scrim, the "Ren joined" toast still up from 03, and
 * the New poll sheet (164:2513) at y 235.5.
 */
export function NewPoll() {
  return (
    <div className="relative h-full overflow-hidden">
      <TripLisbon />
      <Scrim />
      <Toast title="Ren joined the trip" detail="Everyone was told" />

      <Sheet frameTop={235.5} gap={18}>
        <div className="flex w-full shrink-0 items-center justify-between">
          <h2 className="text-heading font-semibold">New poll</h2>
          {/* The slot this poll fills */}
          <span
            className="inline-flex shrink-0 items-center rounded-pill text-footnote font-medium"
            style={{
              gap: 5,
              padding: '6px 12px 6px 10px',
              background: 'var(--color-accent-violet-tint)',
              color: 'var(--color-accent-violet)',
            }}
          >
            <Icon name="clock-violet" size={14} />
            Dinner · 20:30
          </span>
        </div>

        {/* Question */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            Question
          </span>
          <p className="text-heading font-semibold whitespace-nowrap">{dinnerPoll.question}</p>
          <span
            aria-hidden="true"
            style={{ width: '100%', height: 1.5, background: 'var(--color-ink-primary)' }}
          />
        </div>

        {/* Options header */}
        <div className="flex w-full shrink-0 items-center justify-between text-footnote">
          <span style={{ color: 'var(--color-ink-secondary)' }}>3 places near you</span>
          <span className="font-medium" style={{ color: 'var(--color-accent-violet)' }}>
            + Add a place
          </span>
        </div>

        {/* Options */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          {dinnerPoll.places.map((p) => (
            <div
              key={p.id}
              className="flex w-full items-center"
              style={{
                gap: 12,
                padding: '10px 14px 10px 10px',
                borderRadius: 'var(--radius-card)',
                background: 'var(--color-surface-ground)',
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
                    left: 32,
                    top: 32,
                    width: 22,
                    height: 22,
                    background: 'var(--color-surface-white)',
                    filter: 'drop-shadow(0 2px 2px rgb(31 30 36 / 0.12))',
                  }}
                >
                  <Icon name={p.icon} size={13} />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-headline font-semibold">{p.name}</p>
                <p
                  className="text-caption"
                  style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
                >
                  {p.line}
                </p>
              </div>
              <button type="button" aria-label={`Remove ${p.name}`} className="shrink-0">
                <Icon name="remove" size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Deadline */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            gap: 12,
            height: 61,
            padding: '12px 14px',
            borderRadius: 'var(--radius-row-lg)',
            outline: '1.5px solid var(--color-line-default)',
            outlineOffset: '-1.5px',
          }}
        >
          <Icon name="clock" size={20} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold">Closes in 20 min</p>
            <p
              className="text-caption"
              style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
            >
              or as soon as all 7 have voted
            </p>
          </div>
          <Icon name="chevron-right-16" size={16} className="shrink-0" />
        </div>

        {/* Send */}
        <button
          type="button"
          className="flex w-full shrink-0 items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            gap: 8,
            paddingInline: 22,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
          }}
        >
          <Icon name="send" size={18} />
          Send to 6 buddies
        </button>
      </Sheet>
    </div>
  )
}
