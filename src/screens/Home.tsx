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
 *
 * The frame is 1022 tall, so this screen scrolls; the column carries 110 pt of
 * ground below its last item and there is no docked chrome on Home. Content
 * sections stack at gap 20.
 */
export function Home() {
  const paperWidth = stampNaturalSize.width * homeStampScale
  const paperHeight = paperWidth * (stampNaturalSize.height / stampNaturalSize.width)

  return (
    <div className="no-scrollbar h-full overflow-y-auto" style={{ overflowX: 'hidden' }}>
      <div
        className="flex flex-col items-start"
        style={{
          paddingTop: 14,
          paddingInline: 'var(--screen-padding)',
          paddingBottom: 110,
          gap: 20,
        }}
      >
        {/* Header */}
        <div className="flex h-[44px] w-full shrink-0 items-center justify-between">
          <div className="flex items-center" style={{ gap: 10 }}>
            <Avatar person={people.ari} size={40} />
            <div className="flex flex-col items-start" style={{ gap: 1 }}>
              <p className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
                Hi Ari
              </p>
              <p className="text-body font-medium">Last night in Lisbon</p>
            </div>
          </div>
          <div className="flex items-start" style={{ gap: 10 }}>
            {/* One exported asset: the button, its shadow and the unread dot,
                drawn on an 80 canvas around a 44 button. */}
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

        <h1 className="shrink-0 text-title1 font-semibold">Your trips</h1>

        {/* Happening now */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
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

          <Ticket destination={lisbon.destination} dates={lisbon.dates} variant="tall">
            {/* Next up — a frosted panel inside the card */}
            <div
              className="absolute flex items-center"
              style={{
                left: 12,
                top: 136,
                width: 326,
                padding: 12,
                borderRadius: 'var(--radius-row-lg)',
                background: 'var(--color-surface-white-70)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
              }}
            >
              <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 14 }}>
                <div className="flex w-full items-center" style={{ gap: 12 }}>
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
                  <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 2 }}>
                    <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                      Tonight · 20:30
                    </p>
                    <p className="text-body font-semibold">Dinner · not decided yet</p>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between">
                  <AvatarStack people={tripBuddies} size={30} max={3} />
                  <button
                    type="button"
                    className="flex shrink-0 items-center justify-center rounded-pill text-caption font-medium"
                    style={{
                      padding: '9px 14px',
                      background: 'var(--color-accent-violet)',
                      color: 'var(--color-surface-white)',
                    }}
                  >
                    Ask the group
                  </button>
                </div>
              </div>
            </div>
          </Ticket>
        </div>

        {/* Coming up */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
          <div className="flex w-full items-center justify-between" style={{ height: 20 }}>
            <h2 className="text-headline font-semibold">Coming up</h2>
            <span
              className="text-footnote underline"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              See all
            </span>
          </div>
          <div className="flex w-full items-start" style={{ gap: 10 }}>
            {upcomingTrips.map((t) => (
              <ComingUpCard key={t.id} trip={t} />
            ))}
          </div>
        </div>

        {/* Stamps */}
        <div
          className="flex w-full shrink-0 flex-col items-center"
          style={{ paddingTop: 16, gap: 8 }}
        >
          {/* The header block is a fixed 48 in the frame, taller than its
              39 of content — the slack is part of the rhythm. */}
          <div
            className="flex w-full flex-col items-center"
            style={{ height: 48, gap: 4 }}
          >
            <h2 className="text-headline font-semibold">Stamps</h2>
            <p className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
              Collect stamps with every successful trip
            </p>
          </div>

          {/* The row starts 15 left of the column and runs past the right edge —
              the last stamp is clipped by the phone, not by this container. */}
          <div className="relative w-full shrink-0" style={{ height: 183 }}>
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

          <button
            type="button"
            className="flex w-full items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              gap: 8,
              paddingInline: 22,
              background: 'var(--color-ink-primary)',
              color: 'var(--color-surface-white)',
              filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
            }}
          >
            See your Stamps collection
            <Icon name="arrow-right" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
