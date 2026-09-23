/** The journey, in flow order (docs/PRODUCT_SPEC.md §4).
 *  `component` stays null until a screen is built; the deep link
 *  `/?screen=<id>` works for every id that has one. */
export type ScreenId =
  | 'home'
  | 'trip'
  | 'buddies'
  | 'add-a-buddy'
  | 'new-poll'
  | 'poll-notification'
  | 'vote'
  | 'live-poll'
  | 'plan-updated'
  | 'log-expense'
  | 'split-by-item'
  | 'balances'
  | 'settle'
  | 'squared-up'
  | 'squared-up-stamp'

export type ScreenEntry = {
  id: ScreenId
  /** Figma frame number from the spec, e.g. "05". */
  no: string
  title: string
  /** Whose phone the frame is on. */
  phone: 'Ari' | 'Nic' | 'Ren'
  /** Status-bar clock for this screen. */
  time: string
  figmaNode: string
  /** False when the screen draws its own chrome (04b's lock screen). */
  chrome?: boolean
  /** True when the screen is a sheet over the trip screen — it handles its
   *  own enter/exit motion (Sheet's spring, Scrim's fade), so the screen
   *  swap in App.tsx skips the ordinary slide transition for it. */
  sheet?: boolean
}

export const screens: ScreenEntry[] = [
  { id: 'home', no: '01', title: 'Home', phone: 'Ari', time: '18:05', figmaNode: '162:429' },
  { id: 'trip', no: '02', title: 'Trip · Lisbon', phone: 'Ari', time: '18:05', figmaNode: '4064:17467' },
  { id: 'buddies', no: '03a', title: 'Buddies', phone: 'Ari', time: '18:05', figmaNode: '4058:3678', sheet: true },
  { id: 'add-a-buddy', no: '03b', title: 'Add a buddy', phone: 'Ari', time: '18:05', figmaNode: '4058:3935', sheet: true },
  { id: 'new-poll', no: '04', title: 'New poll', phone: 'Ari', time: '18:05', figmaNode: '164:2379', sheet: true },
  { id: 'poll-notification', no: '04b', title: 'Poll notification', phone: 'Nic', time: '18:05', figmaNode: '166:2578', chrome: false },
  { id: 'vote', no: '04c', title: 'Vote', phone: 'Nic', time: '18:05', figmaNode: '166:2631' },
  { id: 'live-poll', no: '05', title: 'Live poll', phone: 'Ari', time: '18:05', figmaNode: '84:169' },
  { id: 'plan-updated', no: '06', title: 'Plan updated', phone: 'Ari', time: '18:25', figmaNode: '4064:18080' },
  { id: 'log-expense', no: '07', title: 'Log the dinner', phone: 'Ari', time: '22:10', figmaNode: '168:2777', sheet: true },
  { id: 'split-by-item', no: '08', title: 'Split by item', phone: 'Ari', time: '22:10', figmaNode: '169:2976', sheet: true },
  { id: 'balances', no: '09', title: 'Balances', phone: 'Ari', time: '22:12', figmaNode: '4048:16899' },
  { id: 'settle', no: '10', title: 'Ren settles', phone: 'Ren', time: '22:14', figmaNode: '171:3175' },
  { id: 'squared-up', no: '11', title: 'Squared up', phone: 'Ari', time: '22:25', figmaNode: '172:3175' },
  { id: 'squared-up-stamp', no: '11B', title: 'Squared up + stamp', phone: 'Ari', time: '22:25', figmaNode: '172:3255' },
]

export const screenById = (id: string): ScreenEntry | undefined =>
  screens.find((s) => s.id === id)
