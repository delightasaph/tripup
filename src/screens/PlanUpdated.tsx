import { Toast } from '@/components/Toast'
import { people, tripBuddies } from '@/data/trip'
import { TripLisbon } from './TripLisbon'

/**
 * 06 · Plan updated — Figma 4064:18080.
 * The trip screen at 18:25 with the dinner slot resolved and the closing
 * toast up. Everything else is screen 02 unchanged.
 */
export function PlanUpdated() {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Ren is on the trip by now, so the stack reads +4. */}
      <TripLisbon dinner="decided" crew={[...tripBuddies, people.ren]} />
      <Toast
        title="Poll closed · Taberna won"
        detail="Added to the plan for 20:30"
        icon="calendar-check"
        iconSize={14}
      />
    </div>
  )
}
