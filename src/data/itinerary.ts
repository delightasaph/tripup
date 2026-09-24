import type { PlacePhotoName } from './assets'

/**
 * Wednesday 16 September, the day the prototype plays out on
 * (docs/PRODUCT_SPEC.md §3). The timeline on 02 used to be four hand-written
 * rows; polls created from the quick add are inserted into the same day at
 * whatever time they're for (14), so the day has to be data the screen sorts
 * rather than markup the screen fixes.
 *
 * Times are **minutes since midnight** so ordering is a number comparison and
 * never a string one — "9:00" sorts after "20:30" as text.
 */

export type PlanItem = {
  id: string
  minutes: number
  title: string
  line: string
  /** done — already happened, faded. next — the warm gradient card with
   *  directions. slot — the dashed violet open slot the dinner poll fills. */
  kind: 'done' | 'next' | 'slot'
  photo?: PlacePhotoName
  /** The walking chip on the "next" card. */
  chip?: string
}

export function minutesOf(clock: string): number {
  const [h, m] = clock.split(':').map(Number)
  return h * 60 + m
}

export function clockOf(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

/** The clock the whole demo runs from — 18:05 on Wed 16 Sep. Every "not in
 *  the past" rule and every relative deadline is measured from here. */
export const NOW_MINUTES = minutesOf('18:05')

export const todaysPlan: PlanItem[] = [
  {
    id: 'pasteis',
    minutes: minutesOf('10:00'),
    kind: 'done',
    title: 'Pastéis de Belém',
    line: 'Breakfast · Belém · €18',
    photo: 'pasteis',
  },
  {
    id: 'tram',
    minutes: minutesOf('15:00'),
    kind: 'done',
    title: 'Tram 28 to Graça',
    line: 'Praça Martim Moniz',
  },
  {
    id: 'sunset',
    minutes: minutesOf('18:30'),
    kind: 'next',
    title: 'Sunset at Miradouro',
    line: 'Viewpoint · free',
    chip: '12 min walk',
  },
  {
    id: 'dinner',
    minutes: minutesOf('20:30'),
    kind: 'slot',
    title: 'Dinner',
    line: 'Nothing booked yet · all 6 of you are free',
  },
]
