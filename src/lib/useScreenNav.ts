import { useNavigate } from 'react-router-dom'
import { pathFor, type ScreenId } from '@/screens/registry'

/**
 * Every tap in the flow moves through a real route, so the whole journey is
 * shareable and the browser's own back gesture always works — including out
 * of a sheet.
 *
 * `go` pushes a history entry. `replace` is for transitions the *simulation*
 * makes on its own — a poll closing, a payment landing — which shouldn't
 * leave a step in the back stack for someone to undo.
 */
export function useScreenNav() {
  const navigate = useNavigate()

  const go = (id: ScreenId, params?: { entryId?: string }) => navigate(pathFor(id, params))
  const replace = (id: ScreenId, params?: { entryId?: string }) =>
    navigate(pathFor(id, params), { replace: true })
  const back = () => navigate(-1)

  return { go, replace, back }
}
