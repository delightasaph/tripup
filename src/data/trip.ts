import type { Person } from '@/components/Avatar'
import { placesCatalog } from './places'

/** The cast, per docs/PRODUCT_SPEC.md §3. Ari is "You" on her own phone. */
export const people: Record<string, Person> = {
  ari: { id: 'ari', label: 'You', initials: 'AM', fill: '--color-avatar-ari', photo: 'ari' },
  nic: { id: 'nic', label: 'Nic', initials: 'NO', fill: '--color-avatar-nic', photo: 'nic' },
  bea: {
    id: 'bea',
    label: 'Bea',
    initials: 'BH',
    fill: '--color-avatar-bea',
    photo: 'bea',
  },
  kofi: {
    id: 'kofi',
    label: 'Kofi',
    initials: 'KC',
    fill: '--color-avatar-kofi',
    photo: 'kofi',
  },
  sven: { id: 'sven', label: 'Sven', initials: 'SD', fill: '--color-avatar-sven', photo: 'sven' },
  mira: { id: 'mira', label: 'Mira', initials: 'MM', fill: '--color-avatar-mira', photo: 'mira' },
  // New tonight, and deliberately without a photo.
  ren: { id: 'ren', label: 'Ren', initials: 'RT', fill: '--color-avatar-ren' },
  marta: { id: 'marta', label: 'Marta', initials: 'ML', fill: '--color-avatar-marta' },
  hugo: { id: 'hugo', label: 'Hugo', initials: 'HS', fill: '--color-avatar-hugo' },
}

/** Results for the "Ren" search in the Add-buddy sheet (03). */
export const buddySearch = {
  query: 'Ren',
  results: [
    { person: people.ren, name: 'Ren Takahashi', line: 'In your contacts · on TripUp', selected: true },
    { person: people.marta, name: 'Marta Lopes', line: 'In your contacts', selected: false },
    { person: people.hugo, name: 'Hugo Silva', line: 'In your contacts', selected: false },
  ],
}

export const tripBuddies = [
  people.ari,
  people.nic,
  people.bea,
  people.kofi,
  people.sven,
  people.mira,
]

export const lisbon = {
  destination: 'Lisbon',
  dates: '12 – 16 Sep',
  days: [
    { label: 'Sat', date: 12 },
    { label: 'Sun', date: 13 },
    { label: 'Mon', date: 14 },
    { label: 'Tue', date: 15 },
    { label: 'Today', date: 16, selected: true },
  ],
}

export const dinnerPoll = {
  question: 'Where are we eating tonight?',
  askedBy: people.ari,
  askedLine: 'Ari asked · for dinner at 20:30',
  closesIn: '18:24',
  /** Bar fills are the Figma widths over the 318 pt track. */
  options: [
    {
      id: 'taberna',
      name: 'Taberna da Rua das Flores',
      line: 'Cosy tasca · €€ · 6 min walk',
      photo: 'taberna' as const,
      icon: 'bowl' as const,
      voters: [people.ari, people.bea, people.kofi],
      fill: 159 / 318,
    },
    {
      id: 'timeout',
      name: 'Time Out Market',
      line: 'Buzzy food hall · € · 11 min walk',
      photo: 'timeout' as const,
      icon: 'fork-knife' as const,
      voters: [people.nic, people.ren],
      fill: 104.9 / 318,
    },
    {
      id: 'ramiro',
      name: 'Cervejaria Ramiro',
      line: 'Seafood feast · €€€ · 9 min by tram',
      photo: 'ramiro' as const,
      icon: 'fish' as const,
      voters: [people.mira],
      fill: 54.1 / 318,
    },
  ],
  /** The three places the poll starts with, composing it (04) — the same
   *  entries as in `src/data/places.ts`'s wider search catalog. */
  places: placesCatalog.filter((p) => p.id === 'taberna' || p.id === 'timeout' || p.id === 'ramiro'),
  ticker: { person: people.nic, event: 'voted Time Out Market', when: 'just now' },
  waitingOn: people.sven,
}

/** Short form of each place's name, for toasts and chips ("Poll closed · Taberna won"). */
export const placeShortNames: Record<string, string> = {
  taberna: 'Taberna',
  timeout: 'Time Out',
  ramiro: 'Ramiro',
}

export const upcomingTrips = [
  {
    id: 'porto',
    name: 'Porto',
    dates: '3 – 5 Oct',
    when: 'In 17 days',
    fill: 'var(--color-accent-sky)',
    people: [people.ari, people.nic, people.bea],
    more: 1,
  },
  {
    id: 'berlin',
    name: 'Berlin',
    dates: '27 – 30 Nov',
    when: 'In 2 months',
    fill: 'var(--color-accent-blush)',
    people: [people.ari, people.mira, people.kofi],
    more: 2,
  },
]
