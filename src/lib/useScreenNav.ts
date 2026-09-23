import { useNavigate } from 'react-router-dom'
import type { ScreenId } from '@/screens/registry'

/** `balances` (09) isn't its own mounted screen any more — it's the trip
 *  shell's Expenses tab (see `TripLisbon.tsx`). Routing anything that still
 *  asks for it here keeps every call site (the demo panel's screen list, 11's
 *  "back to trip", 11B's transfers row) working unchanged. */
function urlFor(id: ScreenId): string {
  if (id === 'balances') return '/?screen=trip&tab=expenses'
  return `/?screen=${id}`
}

/**
 * Every tap in the flow (docs/PRODUCT_SPEC.md §4) moves through `?screen=`,
 * so the whole journey stays deep-linkable. Forward taps push a history
 * entry so the browser/device back gesture always works, including out of a
 * sheet. `replace` is for transitions the *simulation* makes on its own
 * (a poll auto-closing, a payment landing) — those shouldn't leave a step in
 * the user's back stack to undo.
 */
export function useScreenNav() {
  const navigate = useNavigate()

  const go = (id: ScreenId) => navigate(urlFor(id))
  const replace = (id: ScreenId) => navigate(urlFor(id), { replace: true })
  const back = () => navigate(-1)

  return { go, replace, back }
}
