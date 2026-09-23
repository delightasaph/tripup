import { useNavigate } from 'react-router-dom'
import type { ScreenId } from '@/screens/registry'

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

  const go = (id: ScreenId) => navigate(`/?screen=${id}`)
  const replace = (id: ScreenId) => navigate(`/?screen=${id}`, { replace: true })
  const back = () => navigate(-1)

  return { go, replace, back }
}
