import { people, tripBuddies } from '@/data/trip'
import { TripLisbon } from './TripLisbon'

/**
 * 06 · Plan updated — Figma 4064:18080.
 * The trip screen at 18:25 with the dinner slot resolved. The "Poll closed"
 * toast is fired by the store the moment the poll closes (see
 * `closePoll` in `src/store/tripStore.ts`) and rendered globally in App.tsx,
 * so it's already on its way up by the time this screen mounts.
 */
export function PlanUpdated() {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Ren is on the trip by now, so the stack reads +4. */}
      <TripLisbon dinner="decided" crew={[...tripBuddies, people.ren]} />
    </div>
  )
}
