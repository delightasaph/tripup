import { Avatar, type Person } from './Avatar'
import { Icon } from './Icon'

export type UpcomingTrip = {
  id: string
  name: string
  /** "3 – 5 Oct" — the buddy count moved to the avatar stack. */
  dates: string
  /** "In 17 days" */
  when: string
  /** CSS colour token for the card fill. */
  fill: string
  people: Person[]
  /** How many more beyond the faces shown. */
  more: number
}

/**
 * A trip that has not happened yet: 170 × 138, radius 24, a white-70 "when"
 * pill and a "more" button at the top, the name pinned to the bottom by a
 * spacer, and the crew as a 22 stack underneath.
 */
export function ComingUpCard({ trip, onClick }: { trip: UpcomingTrip; onClick?: () => void }) {
  const white70 = 'var(--color-surface-white-70)'

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${trip.name}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      className="flex min-w-0 flex-1 cursor-pointer flex-col items-start text-left"
      style={{
        height: 138,
        borderRadius: 'var(--radius-card-lg)',
        background: trip.fill,
        padding: '14px 14px 14px 16px',
      }}
    >
      <div className="flex w-full shrink-0 items-center justify-between">
        <span
          className="inline-flex shrink-0 items-start rounded-pill text-caption2 font-medium"
          style={{ background: white70, padding: '4px 9px' }}
        >
          {trip.when}
        </span>
        <button
          type="button"
          aria-label={`More about ${trip.name}`}
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation()
            onClick?.()
          }}
        >
          <Icon name="more" size={28} />
        </button>
      </div>

      <div className="min-h-0 w-full flex-1" />

      <p className="shrink-0 text-subheading font-semibold whitespace-nowrap">{trip.name}</p>
      <p
        className="shrink-0 text-caption whitespace-nowrap"
        style={{ color: 'var(--color-ink-secondary)' }}
      >
        {trip.dates}
      </p>

      <div className="flex w-full shrink-0 items-center" style={{ paddingTop: 10 }}>
        <div className="flex items-center">
          {trip.people.map((p) => (
            <span key={p.id} style={{ marginRight: -6 }}>
              <Avatar person={p} size={22} ring={white70} />
            </span>
          ))}
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: white70,
              boxShadow: `0 0 0 2px ${white70}`,
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: '0.2px',
            }}
          >
            +{trip.more}
          </span>
        </div>
      </div>
    </div>
  )
}
