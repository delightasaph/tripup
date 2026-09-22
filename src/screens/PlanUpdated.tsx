import { Toast } from '@/components/Toast'
import { TripLisbon } from './TripLisbon'

/**
 * 06 · Plan updated — Figma 167:2903.
 * The trip screen at 18:25 with the dinner slot resolved and the closing
 * toast up. Everything else is screen 02 unchanged.
 */
export function PlanUpdated() {
  return (
    <div className="relative h-full overflow-hidden">
      <TripLisbon dinner="decided" />
      <Toast
        title="Poll closed · Taberna won"
        detail="Added to the plan for 20:30"
        icon="calendar-check"
        iconSize={14}
      />
    </div>
  )
}
