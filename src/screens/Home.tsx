import { motion } from 'framer-motion'
import { Avatar, AvatarStack } from '@/components/Avatar'
import { ComingUpCard } from '@/components/ComingUpCard'
import { Icon } from '@/components/Icon'
import { Ticket } from '@/components/Ticket'
import { homeStampsRow } from '@/data/assets'
import { lisbon, people, upcomingTrips } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import { HOVER_LIFT, HOVER_SMALL, TAP_LARGE, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { unreadCount } from '@/data/notifications'
import { selectBuddyPeople, useTripStore } from '@/store/tripStore'

/**
 * 01 · Home — Figma 162:429.
 *
 * The frame is 1022 tall, so this screen scrolls; the column carries 110 pt of
 * ground below its last item and there is no docked chrome on Home. Content
 * sections stack at gap 20.
 */
export function Home() {
  const { go } = useScreenNav()
  const crew = useTripStore(selectBuddyPeople)
  const showToast = useTripStore((s) => s.showToast)
  const notificationsSeen = useTripStore((s) => s.notificationsSeen)
  const seeNotifications = useTripStore((s) => s.seeNotifications)

  const comingSoon = () => showToast({ title: 'Coming soon', detail: 'Porto and Berlin aren’t open yet' })

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
            {/* One exported asset: the 44 button and the unread dot. The
                elevation is cast here rather than inside the SVG — an
                `feGaussianBlur` rasterises the glyph it wraps, which is what
                made the bell soft on a 3× screen. */}
            <motion.button
              type="button"
              aria-label={notificationsSeen ? 'Notifications' : `Notifications, ${unreadCount} unread`}
              onClick={() => {
                seeNotifications()
                go('notifications')
              }}
              whileHover={HOVER_SMALL}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              className="shrink-0"
              style={{ width: 44, height: 44, filter: 'drop-shadow(var(--shadow-card))' }}
            >
              <Icon name={notificationsSeen ? 'notifications-read' : 'notifications'} size={44} />
            </motion.button>
            <motion.button
              type="button"
              aria-label="New trip"
              onClick={() => showToast({ title: 'Coming soon', detail: 'Creating a new trip isn’t wired up yet' })}
              whileHover={HOVER_SMALL}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              className="flex shrink-0 items-center justify-center rounded-pill"
              style={{
                width: 44,
                height: 44,
                background: 'var(--color-surface-white)',
                filter: 'drop-shadow(0 6px 9px rgb(31 30 36 / 0.08))',
              }}
            >
              <Icon name="plus-ink" size={20} />
            </motion.button>
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

          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Open Lisbon"
            onClick={() => go('trip')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                go('trip')
              }
            }}
            whileHover={HOVER_LIFT}
            whileTap={TAP_LARGE}
            transition={TAP_TRANSITION}
            className="cursor-pointer"
          >
          <Ticket destination={lisbon.destination} dates={lisbon.dates} variant="tall" shared>
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
                // Figma background blur 4. Figma's radius is twice the CSS
                // backdrop-filter value, so 4 in the file is 2px here — the
                // export confirms it (blur 6 exported as 3px, 4 as 2px).
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
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
                  <AvatarStack people={crew} size={30} max={3} />
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      go('new-poll')
                    }}
                    whileHover={HOVER_SMALL}
                    whileTap={TAP_SMALL}
                    transition={TAP_TRANSITION}
                    className="flex shrink-0 items-center justify-center rounded-pill text-caption font-medium"
                    style={{
                      padding: '9px 14px',
                      background: 'var(--color-accent-violet)',
                      color: 'var(--color-surface-white)',
                    }}
                  >
                    Ask the group
                  </motion.button>
                </div>
              </div>
            </div>
          </Ticket>
          </motion.div>
        </div>

        {/* Coming up */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
          <div className="flex w-full items-center justify-between" style={{ height: 20 }}>
            <h2 className="text-headline font-semibold">Coming up</h2>
            <motion.button
              type="button"
              onClick={comingSoon}
              whileTap={{ scale: 0.95 }}
              transition={TAP_TRANSITION}
              className="text-footnote underline"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              See all
            </motion.button>
          </div>
          <div className="flex w-full items-start" style={{ gap: 10 }}>
            {upcomingTrips.map((t) => (
              <ComingUpCard key={t.id} trip={t} onClick={comingSoon} />
            ))}
          </div>
        </div>

        {/* Stamps */}
        <div
          className="flex w-full shrink-0 flex-col items-center"
          style={{ paddingTop: 16, gap: 8 }}
        >
          {/* Frame 7 is 292 wide and holds a 246 header block that is a fixed
              48 tall — taller than its 39 of content. The slack is part of the
              rhythm; collapsing it pulls everything below up by 9. */}
          <div className="flex shrink-0 flex-col items-center" style={{ width: 292 }}>
            <div
              className="flex flex-col items-center whitespace-nowrap"
              style={{ width: 246, height: 48, gap: 4 }}
            >
              <h2 className="text-headline font-semibold">Stamps</h2>
              <p className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
                Collect stamps with every successful trip
              </p>
            </div>
          </div>

          {/*
            The row is the frame's own render, not four placed stamps.

            Deriving each stamp's rotation from its bounding box did not work:
            the four instances are the same size, so the bbox differences come
            from the "VISITED" overhang rather than the angle, and solving
            three unknowns against two equations produced angles roughly three
            times too steep. The frame render is exact, so it wins.

            Figma exported it on white (Frame 15 has no fill), so the field was
            keyed out. Its origin is Frame 15 at (-20, -4), which puts it full
            bleed at screen x 0.
          */}
          <div className="relative w-full shrink-0" style={{ height: 183 }}>
            <img
              src={homeStampsRow}
              alt="Your stamps: England, Spain, Italy and France"
              width={390}
              height={207}
              className="absolute"
              style={{ left: -20, top: -4, maxWidth: 'none' }}
            />
          </div>

          <motion.button
            type="button"
            onClick={() => showToast({ title: 'Coming soon', detail: 'The stamps collection isn’t open yet' })}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
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
          </motion.button>
        </div>
      </div>
    </div>
  )
}
