export type UpcomingTrip = {
  id: string
  name: string
  /** "3 – 5 Oct · 4 buddies" */
  line: string
  /** "In 17 days" */
  when: string
  /** CSS colour token for the card fill. */
  fill: string
  /** A trip far enough out to show the empty slot its stamp will fill. */
  stampSlot?: boolean
}

/**
 * A trip that has not happened yet: 138 tall, radius 24, a white-70 "when"
 * pill at the top and the name pinned to the bottom. Stamps are earned after
 * a trip, so an upcoming card can only show a dashed empty slot.
 */
export function ComingUpCard({ trip }: { trip: UpcomingTrip }) {
  return (
    <div
      className="flex flex-1 flex-col"
      style={{
        height: 138,
        minWidth: 0,
        borderRadius: 'var(--radius-card-lg)',
        background: trip.fill,
        padding: '14px 14px 16px 16px',
      }}
    >
      <div className="flex w-full items-start justify-between">
        <span
          className="inline-flex items-center rounded-pill text-caption2 font-medium"
          style={{
            background: 'var(--color-surface-white-70)',
            padding: '4px 9px',
          }}
        >
          {trip.when}
        </span>
        {trip.stampSlot && (
          <span
            aria-label="Stamp still to collect"
            role="img"
            style={{
              width: 34,
              height: 36,
              rotate: '-6deg',
              borderRadius: 4,
              background: 'rgb(255 255 255 / 0.35)',
              border: '1.2px dashed rgb(31 30 36 / 0.28)',
            }}
          />
        )}
      </div>
      <div className="flex-1" />
      <p className="text-subheading font-semibold">{trip.name}</p>
      <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
        {trip.line}
      </p>
    </div>
  )
}
