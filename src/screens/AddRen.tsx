import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet, SheetHeader } from '@/components/Sheet'
import { buddySearch, tripBuddies } from '@/data/trip'
import { TripLisbon } from './TripLisbon'

/**
 * 03 · Add Ren — Figma 163:2180.
 * The trip screen with a scrim and the Buddies sheet over it; the sheet's own
 * frame is 163:2307, 390 × 600 at y 244.
 */
export function AddRen() {
  return (
    <div className="relative h-full overflow-hidden">
      <TripLisbon />
      <Scrim />
      <Sheet frameTop={244}>
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

        {/* Search */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            height: 48,
            gap: 10,
            paddingInline: 14,
            borderRadius: 'var(--radius-row)',
            background: 'var(--color-surface-ground)',
          }}
        >
          <Icon name="search" size={18} />
          <span className="text-body">{buddySearch.query}</span>
          <span
            aria-hidden="true"
            style={{ width: 1.5, height: 18, background: 'var(--color-accent-violet)' }}
          />
        </div>

        {/* Results */}
        <div className="flex w-full shrink-0 flex-col" style={{ gap: 8 }}>
          {buddySearch.results.map((r) => (
            <div
              key={r.person.id}
              className="flex w-full items-center"
              style={{
                gap: 12,
                padding: '10px 14px 10px 12px',
                borderRadius: 'var(--radius-row-lg)',
                background: r.selected
                  ? 'var(--color-accent-lime)'
                  : 'var(--color-surface-ground)',
              }}
            >
              <Avatar person={r.person} size={40} />
              <div className="min-w-0 flex-1">
                <p className="text-body font-semibold">{r.name}</p>
                <p
                  className="text-caption"
                  style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
                >
                  {r.line}
                </p>
              </div>
              {r.selected ? (
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
                    // outline, not border — a border would resize the circle.
                    outline: '1.5px solid rgb(31 30 36 / 0.25)',
                    outlineOffset: '-1.5px',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Joins from tonight */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            gap: 12,
            height: 63,
            padding: '12px 14px 12px 12px',
            borderRadius: 'var(--radius-row-lg)',
            // Height pinned from the frame, stroke drawn as an outline so it
            // stays out of the layout — Figma's stroke alignment varies per
            // node, so a border's effect on height is not predictable.
            outline: '1.5px solid var(--color-line-default)',
            outlineOffset: '-1.5px',
          }}
        >
          <span
            className="flex shrink-0 items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-tile)',
              background: 'var(--color-accent-sky)',
            }}
          >
            <Icon name="calendar-plus" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold">Joins from tonight</p>
            <p
              className="text-caption"
              style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
            >
              Earlier expenses stay out of his share
            </p>
          </div>
          <Icon name="chevron-right" size={16} className="shrink-0" />
        </div>

        {/* Actions */}
        <div className="flex w-full shrink-0 items-start" style={{ gap: 10 }}>
          <button
            type="button"
            className="flex shrink-0 items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              gap: 8,
              paddingInline: 22,
              background: 'var(--color-surface-white)',
              // Hug width — the stroke counts toward it (144, not 140.3).
              border: '1.5px solid var(--color-line-default)',
            }}
          >
            <Icon name="link" size={18} />
            Invite link
          </button>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              paddingInline: 22,
              background: 'var(--color-ink-primary)',
              color: 'var(--color-surface-white)',
              filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
            }}
          >
            Add Ren
          </button>
        </div>
      </Sheet>
    </div>
  )
}
