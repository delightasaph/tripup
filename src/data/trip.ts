import type { Person } from '@/components/Avatar'

/** The cast, per docs/PRODUCT_SPEC.md §3. Ari is "You" on her own phone. */
export const people: Record<string, Person> = {
  ari: { id: 'ari', label: 'You', initials: 'AM', fill: '--color-avatar-ari', photo: 'ari' },
  nick: { id: 'nick', label: 'Nick', initials: 'NO', fill: '--color-avatar-nick', photo: 'nick' },
  rebecca: {
    id: 'rebecca',
    label: 'Rebecca',
    initials: 'RH',
    fill: '--color-avatar-rebecca',
    photo: 'rebecca',
  },
  william: {
    id: 'william',
    label: 'William',
    initials: 'WC',
    fill: '--color-avatar-william',
    photo: 'william',
  },
  phil: { id: 'phil', label: 'Phil', initials: 'PD', fill: '--color-avatar-phil', photo: 'phil' },
  jess: { id: 'jess', label: 'Jess', initials: 'JM', fill: '--color-avatar-jess', photo: 'jess' },
  // New tonight, and deliberately without a photo.
  ren: { id: 'ren', label: 'Ren', initials: 'RT', fill: '--color-avatar-ren' },
}

export const tripBuddies = [
  people.ari,
  people.nick,
  people.rebecca,
  people.william,
  people.phil,
  people.jess,
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
      voters: [people.ari, people.rebecca, people.william],
      fill: 159 / 318,
    },
    {
      id: 'timeout',
      name: 'Time Out Market',
      line: 'Buzzy food hall · € · 11 min walk',
      photo: 'timeout' as const,
      icon: 'fork-knife' as const,
      voters: [people.nick, people.ren],
      fill: 104.9 / 318,
    },
    {
      id: 'ramiro',
      name: 'Cervejaria Ramiro',
      line: 'Seafood feast · €€€ · 9 min by tram',
      photo: 'ramiro' as const,
      icon: 'fish' as const,
      voters: [people.jess],
      fill: 54.1 / 318,
    },
  ],
  ticker: { person: people.nick, event: 'voted Time Out Market', when: 'just now' },
  waitingOn: people.phil,
}

export const upcomingTrips = [
  {
    id: 'porto',
    name: 'Porto',
    line: '3 – 5 Oct · 4 buddies',
    when: 'In 17 days',
    // The frame uses lime here, not Sky as PRODUCT_SPEC.md §4 says.
    fill: 'var(--color-accent-lime)',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    line: '27 – 30 Nov · 5 buddies',
    when: 'In 2 months',
    fill: 'var(--color-accent-blush)',
    stampSlot: true,
  },
]
