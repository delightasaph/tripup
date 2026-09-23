import { placePhotos } from '@/data/assets'
import type { PlaceCatalogEntry } from '@/data/places'
import { Icon } from './Icon'

/** A place's 48×48 tile — its real photo when it has one (only the three
 *  the scenario photographed), an icon tile otherwise. Every "Add a place"
 *  search result beyond those three falls back to this
 *  (docs/INTERACTION_EXECUTION_BRIEF.md §1) rather than a missing image. */
export function PlaceTile({ place, size = 48 }: { place: Pick<PlaceCatalogEntry, 'photo' | 'icon'>; size?: number }) {
  if (place.photo) {
    return (
      <img
        src={placePhotos[place.photo]}
        alt=""
        aria-hidden="true"
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: 'var(--radius-tile)', display: 'block' }}
      />
    )
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ width: size, height: size, borderRadius: 'var(--radius-tile)', background: 'var(--color-surface-ground)' }}
    >
      <Icon name={place.icon} size={Math.round(size * 0.46)} />
    </div>
  )
}
