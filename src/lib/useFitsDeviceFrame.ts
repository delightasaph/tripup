import { useSyncExternalStore } from 'react'

/** The frame is only drawn when the viewport can hold 390 × 844 at 1:1 plus a
 *  little breathing room. On a real phone we fall through to full-screen so
 *  nothing is ever scaled. */
const QUERY = '(min-width: 460px) and (min-height: 900px)'

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

export function useFitsDeviceFrame(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
