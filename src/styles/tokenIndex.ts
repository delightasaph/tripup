/** A readable index of the tokens, used by /styleguide to prove every token
 *  in docs/DESIGN_SYSTEM.md actually resolves in the browser. */

export type Swatch = { name: string; varName: string; note: string; onDark?: boolean }

export const colours: { group: string; items: Swatch[] }[] = [
  {
    group: 'Ink & surface',
    items: [
      { name: 'Ink/Primary', varName: '--color-ink-primary', note: 'Text, dark buttons, toasts', onDark: true },
      { name: 'Ink/Secondary', varName: '--color-ink-secondary', note: 'Secondary text, meta', onDark: true },
      { name: 'Surface/Ground', varName: '--color-surface-ground', note: 'App background' },
      { name: 'Surface/White', varName: '--color-surface-white', note: 'Cards, sheets' },
      { name: 'Surface/White 70%', varName: '--color-surface-white-70', note: 'Done items, pills on colour' },
      { name: 'Surface/Canvas', varName: '--color-surface-canvas', note: 'Around the phone' },
      { name: 'Line/Default', varName: '--color-line-default', note: 'Dividers, 1.5px outlines' },
      { name: 'Overlay/Scrim', varName: '--color-overlay-scrim', note: 'Behind sheets', onDark: true },
    ],
  },
  {
    group: 'Accents',
    items: [
      { name: 'Accent/Lime', varName: '--color-accent-lime', note: 'Leading option, success' },
      { name: 'Accent/Lilac', varName: '--color-accent-lilac', note: 'Balances, Nudge, Scan receipt' },
      { name: 'Accent/Blush', varName: '--color-accent-blush', note: 'Berlin, mains' },
      { name: 'Accent/Sky', varName: '--color-accent-sky', note: 'Porto, info icons' },
      { name: 'Accent/Sand', varName: '--color-accent-sand', note: 'Food icons, sunset end' },
      { name: 'Accent/Violet', varName: '--color-accent-violet', note: 'Open slot, Ask the group', onDark: true },
      { name: 'Accent/Violet Tint', varName: '--color-accent-violet-tint', note: 'Open slot fill' },
    ],
  },
  {
    group: 'Status & data',
    items: [
      { name: 'Status/Positive', varName: '--color-status-positive', note: 'Money in, done checks', onDark: true },
      { name: 'Status/Positive Tint', varName: '--color-status-positive-tint', note: 'Rows paying you' },
      { name: 'Status/Alert', varName: '--color-status-alert', note: 'Live, unread, Skipped', onDark: true },
      { name: 'Data/Track', varName: '--color-data-track', note: 'Progress bar track' },
      { name: 'Data/Bar Muted', varName: '--color-data-bar-muted', note: 'Non-leading bars, ",00"' },
    ],
  },
  {
    group: 'Stamps',
    items: [
      { name: 'Stamp/Paper', varName: '--color-stamp-paper', note: 'Stamp paper' },
      { name: 'Stamp/Title Navy', varName: '--color-stamp-title-navy', note: 'Anton title on the ticket', onDark: true },
      { name: 'Stamp/Title Plum', varName: '--color-stamp-title-plum', note: 'Stamp titles', onDark: true },
    ],
  },
]

export const avatarFills: { name: string; varName: string; initials: string }[] = [
  { name: 'Ari', varName: '--color-avatar-ari', initials: 'AM' },
  { name: 'Nick', varName: '--color-avatar-nick', initials: 'NO' },
  { name: 'Rebecca', varName: '--color-avatar-rebecca', initials: 'RH' },
  { name: 'William', varName: '--color-avatar-william', initials: 'WC' },
  { name: 'Phil', varName: '--color-avatar-phil', initials: 'PD' },
  { name: 'Jess', varName: '--color-avatar-jess', initials: 'JM' },
  { name: 'Ren', varName: '--color-avatar-ren', initials: 'RT' },
  { name: 'Marta', varName: '--color-avatar-marta', initials: 'ML' },
  { name: 'Hugo', varName: '--color-avatar-hugo', initials: 'HS' },
]

export const gradients = [
  { name: 'Ticket sky', varName: '--gradient-ticket-sky', note: 'Trip ticket background' },
  { name: 'Sunset card', varName: '--gradient-sunset-card', note: '"Next" itinerary item' },
  { name: 'Bottom fade', varName: '--gradient-bottom-fade', note: '150pt fade behind the tab bar' },
  { name: 'Legibility shade', varName: '--gradient-legibility-shade', note: 'Over the lock-screen photo' },
]

export type TypeSpec = {
  name: string
  className: string
  sample: string
  use: string
  font: 'Rubik' | 'Anton'
}

export const typeScale: TypeSpec[] = [
  { name: 'Display/Destination · Anton 400', className: 'font-display text-destination uppercase', sample: 'Lisbon', use: 'Ticket destination only', font: 'Anton' },
  { name: 'Display · Rubik 600 · 48', className: 'text-display font-semibold', sample: '€190', use: 'Amounts', font: 'Rubik' },
  { name: 'Title 1 · Rubik 600 · 34', className: 'text-title1 font-semibold', sample: 'Your trips', use: 'Screen titles', font: 'Rubik' },
  { name: 'Title 2 · Rubik 600 · 28', className: 'text-title2 font-semibold', sample: 'Where are we eating tonight?', use: 'Poll question', font: 'Rubik' },
  { name: 'Heading · Rubik 600 · 22', className: 'text-heading font-semibold', sample: 'Buddies · 6 on this trip', use: 'Sheet titles', font: 'Rubik' },
  { name: 'Subheading · Rubik 600 · 20', className: 'text-subheading font-semibold', sample: 'Porto', use: 'Day numbers, keypad', font: 'Rubik' },
  { name: 'Headline · Rubik 600 · 17', className: 'text-headline font-semibold', sample: 'Taberna da Rua das Flores', use: 'Card titles, row amounts', font: 'Rubik' },
  { name: 'Body/Medium · Rubik 500 · 15', className: 'text-body font-medium', sample: 'Send to 6 buddies', use: 'Buttons', font: 'Rubik' },
  { name: 'Body/Regular · Rubik 400 · 15', className: 'text-body', sample: 'Nothing booked yet · all 6 of you are free', use: 'Body copy', font: 'Rubik' },
  { name: 'Footnote/Medium · Rubik 500 · 13', className: 'text-footnote font-medium uppercase', sample: "Today's plan", use: 'Section labels', font: 'Rubik' },
  { name: 'Caption/Regular · Rubik 400 · 12', className: 'text-caption', sample: 'Cosy tasca · €€ · 6 min walk', use: 'Sub-lines, chips', font: 'Rubik' },
  { name: 'Caption 2/Medium · Rubik 500 · 11', className: 'text-caption2 font-medium', sample: 'Your vote', use: 'Small pills', font: 'Rubik' },
]

export const radii = [
  { name: 'tile', varName: '--radius-tile', use: 'Icon tiles, photo tiles' },
  { name: 'row', varName: '--radius-row', use: 'Small cards, rows' },
  { name: 'row-lg', varName: '--radius-row-lg', use: 'Rows' },
  { name: 'card', varName: '--radius-card', use: 'Cards' },
  { name: 'card-lg', varName: '--radius-card-lg', use: 'Ticket, poll option card' },
  { name: 'sheet', varName: '--radius-sheet', use: 'Sheets (top only)' },
  { name: 'pill', varName: '--radius-pill', use: 'Pills, buttons, avatars' },
]

export const shadows = [
  { name: 'card', varName: '--shadow-card', use: 'Cards, icon buttons' },
  { name: 'dark-button', varName: '--shadow-dark-button', use: 'Dark button, FAB' },
  { name: 'toast', varName: '--shadow-toast', use: 'Toast' },
  { name: 'sheet', varName: '--shadow-sheet', use: 'Sheet' },
  { name: 'winner', varName: '--shadow-winner', use: 'Lime winner card' },
  { name: 'stamp', varName: '--shadow-stamp', use: 'Stamps' },
]

export const spacing = [2, 4, 6, 8, 10, 12, 14, 16, 20]
