import { Avatar, AvatarStack } from '@/components/Avatar'
import { ComingUpCard } from '@/components/ComingUpCard'
import { Icon } from '@/components/Icon'
import { Stamp } from '@/components/Stamp'
import { Ticket } from '@/components/Ticket'
import {
  homeStampScale,
  homeStamps,
  homeStampsRowOffset,
  stampNaturalSize,
} from '@/data/assets'
import { lisbon, people, tripBuddies, upcomingTrips } from '@/data/trip'

/**
 * 01 · Home — Figma 162:429.
 * Static layout; the flow and motion come later.
 *
 * The content column is 838 tall inside an 844 frame, so this screen scrolls —
 * the stamps row sits below the fold on purpose.
 */
export function Home() {
  const paperWidth = stampNaturalSize.width * homeStampScale
  const paperHeight = paperWidth * (stampNaturalSize.height / stampNaturalSize.width)

  return (
    <div className="no-scrollbar h-full overflow-y-auto" style={{ overflowX: 'hidden' }}>
      <div
        className="relative"
        style={{ marginLeft: 'var(--screen-padding)', width: 350, paddingTop: 14, paddingBottom: 24 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ height: 44 }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <Avatar person={people.ari} size={40} />
            <div>
              <p className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
                Hi Ari
              </p>
              <p className="text-headline font-semibold" style={{ marginTop: 1 }}>
                3 trips with your crew
              </p>
            </div>
          </div>
          <div className="flex items-start" style={{ gap: 10 }}>
            {/* The exported asset is the whole button — fill, shadow and the
                unread dot — drawn on an 80 canvas around a 44 button. */}
            <button
              type="button"
              aria-label="Notifications, 1 unread"
              className="relative shrink-0"
              style={{ width: 44, height: 44 }}
            >
              <img
                src="/assets/icons/notifications.svg"
                alt=""
                aria-hidden="true"
                width={80}
                height={80}
                className="absolute"
                style={{ left: -18, top: -12, maxWidth: 'none' }}
              />
            </button>
            <button
              type="button"
              aria-label="New trip"
              className="flex shrink-0 items-center justify-center rounded-pill"
              style={{
                width: 44,
                height: 44,
                background: 'var(--color-surface-white)',
                filter: 'drop-shadow(0 6px 9px rgb(31 30 36 / 0.08))',
              }}
            >
              <Icon name="plus-ink" size={20} />
            </button>
          </div>
        </div>

        <h1 className="text-title1 font-semibold" style={{ marginTop: 20 }}>
          Your trips
        </h1>

        {/* Happening now */}
        <div style={{ marginTop: 20 }}>
          <div className="flex items-center" style={{ height: 15 }}>
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--color-status-positive)',
              }}
            />
            <span
              className="text-footnote font-medium uppercase"
              style={{ marginLeft: 6, color: 'var(--color-ink-secondary)' }}
            >
              Happening now
            </span>
          </div>

          <div style={{ marginTop: 10 }}>
            <Ticket destination={lisbon.destination} dates={lisbon.dates} />

            {/* Stub — overlaps nothing; it sits 6 below the ticket. */}
            <div
              style={{
                marginTop: 6,
                width: 350,
                borderRadius: 'var(--radius-card-lg)',
                background: 'var(--color-surface-white)',
                filter: 'drop-shadow(0 6px 9px rgb(31 30 36 / 0.06))',
                padding: 16,
              }}
            >
              <div className="flex items-center" style={{ gap: 12 }}>
                <span
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-tile)',
                    background: 'var(--color-accent-violet-tint)',
                  }}
                >
                  <Icon name="fork-knife-lg" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                    Tonight · 20:30
                  </p>
                  <p className="text-body font-semibold" style={{ marginTop: 2 }}>
                    Dinner · not decided yet
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Open Lisbon"
                  className="flex shrink-0 items-center justify-center rounded-pill"
                  style={{ width: 44, height: 44, background: 'var(--color-ink-primary)' }}
                >
                  <Icon name="arrow-right" size={20} />
                </button>
              </div>

              <div className="flex items-center" style={{ marginTop: 14, gap: 8 }}>
                <AvatarStack
                  people={tripBuddies}
                  size={26}
                  ring="var(--color-surface-white)"
                />
                <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                  You + 5 buddies
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Coming up */}
        <div style={{ marginTop: 20 }}>
          <div className="flex items-center justify-between" style={{ height: 20 }}>
            <h2 className="text-headline font-semibold">Coming up</h2>
            <span className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
              See all
            </span>
          </div>
          <div className="flex" style={{ marginTop: 10, gap: 10 }}>
            {upcomingTrips.map((t) => (
              <ComingUpCard key={t.id} trip={t} />
            ))}
          </div>
        </div>

        {/* Stamps collected */}
        <div style={{ marginTop: 20 }}>
          <div className="flex items-center justify-between" style={{ height: 20 }}>
            <h2 className="text-headline font-semibold">Your stamps</h2>
            <span className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
              {homeStamps.length} countries
            </span>
          </div>
          {/* The row starts 26 left of the column and runs past the right edge —
              France is clipped by the phone, not by this container. */}
          <div className="relative" style={{ marginTop: 10, height: 183 }}>
            <div className="absolute" style={{ left: homeStampsRowOffset, top: 0 }}>
              {homeStamps.map((s) => (
                <div
                  key={s.country}
                  className="absolute"
                  style={{ left: s.cx - paperWidth / 2, top: s.cy - paperHeight / 2 }}
                >
                  <Stamp country={s.country} paperWidth={paperWidth} rotate={s.rotate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
