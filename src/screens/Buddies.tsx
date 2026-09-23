import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet, SheetHeader } from '@/components/Sheet'
import { tripBuddies } from '@/data/trip'
import { TripLisbon } from './TripLisbon'

/**
 * 03a · Buddies — Figma 4058:3678, sheet 4058:3852.
 *
 * The group view: who is on the trip, and one way in to adding someone. The
 * brief's wording is two beats — open a group view *and* add Ren — so this is
 * deliberately not the search sheet. "Add a buddy" goes to 03b.
 *
 * The sheet is a fixed 312 tall and its content only fills 255 of that, so
 * there is 57 of deliberate slack below the last row.
 *
 * The root must not clip: the scrim reaches up over the status bar, and
 * `overflow: hidden` here would cut that overhang off. TripLisbon clips
 * itself, and the device frame clips the screen.
 */
export function Buddies() {
  return (
    <div className="relative h-full">
      <TripLisbon />
      <Scrim />
      <Sheet frameTop={532}>
        <SheetHeader title="Buddies" meta={`${tripBuddies.length} on this trip`} />

        {/* On this trip — six columns spread across the full width */}
        <div className="flex w-full shrink-0 items-start justify-between">
          {tripBuddies.map((p) => (
            <div key={p.id} className="flex flex-col items-center" style={{ gap: 6 }}>
              <Avatar person={p} size={46} />
              <span className="text-caption2" style={{ color: 'var(--color-ink-secondary)' }}>
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add a buddy → 03b. The subtitle states assumption A1 on screen. */}
        <button
          type="button"
          className="flex w-full shrink-0 items-center text-left"
          style={{
            gap: 12,
            padding: '14px 16px',
            borderRadius: 'var(--radius-row-lg)',
            background: 'var(--color-surface-ground)',
          }}
        >
          <span
            className="flex shrink-0 items-center justify-center rounded-pill"
            style={{ width: 36, height: 36, background: 'var(--color-accent-violet-tint)' }}
          >
            <Icon name="person-plus" size={18} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 2 }}>
            <span className="text-body font-semibold">Add a buddy</span>
            <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
              Anyone on the trip can add people
            </span>
          </span>
          <Icon name="chevron-right-16" size={16} className="shrink-0" />
        </button>
      </Sheet>
    </div>
  )
}
