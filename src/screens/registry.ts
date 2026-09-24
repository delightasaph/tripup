/**
 * Every screen in the journey, in flow order, with the path it lives at.
 *
 * Paths are real routes, the way an app's are — `/trip/expenses`, not
 * `/?screen=balances`. The screen id stays as the internal handle the code
 * navigates by; `path` is what a person sees and shares.
 */
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
  | 'quick-add'
  | 'poll-question'
  | 'notifications'
  | 'log-expense-new'
  | 'expense-detail'

export type ScreenEntry = {
  id: ScreenId
  /** The route this screen lives at. */
  path: string
  /** Frame number in the design file, e.g. "05" — for the screen index. */
  no: string
  title: string
  /** Whose phone the screen is on. */
  phone: 'Ari' | 'Nic' | 'Ren'
  figmaNode: string
  /** True when the screen is a sheet over the trip screen. */
  sheet?: boolean
}

export const screens: ScreenEntry[] = [
  { id: 'home', path: '/', no: '01', title: 'Home', phone: 'Ari', figmaNode: '162:429' },
  { id: 'trip', path: '/trip', no: '02', title: 'Trip · Lisbon', phone: 'Ari', figmaNode: '4064:17467' },
  { id: 'buddies', path: '/trip/buddies', no: '03a', title: 'Buddies', phone: 'Ari', figmaNode: '4058:3678', sheet: true },
  { id: 'add-a-buddy', path: '/trip/buddies/add', no: '03b', title: 'Add a buddy', phone: 'Ari', figmaNode: '4058:3935', sheet: true },
  { id: 'quick-add', path: '/trip/add', no: '12', title: 'Quick add', phone: 'Ari', figmaNode: '4093:2356', sheet: true },
  // 18 and 13 are one sheet in two states — empty, then filled — so they are
  // one screen. 13b/13c (the wheel picker) are a layer inside it, not routes.
  { id: 'poll-question', path: '/poll/new', no: '18 / 13', title: 'New poll · what are we deciding', phone: 'Ari', figmaNode: '4097:2617', sheet: true },
  { id: 'new-poll', path: '/poll/places', no: '04', title: 'New poll · places', phone: 'Ari', figmaNode: '164:2379', sheet: true },
  { id: 'poll-notification', path: '/poll/alert', no: '04b', title: 'Poll notification', phone: 'Nic', figmaNode: '166:2578' },
  { id: 'vote', path: '/poll/vote', no: '04c', title: 'Vote', phone: 'Nic', figmaNode: '166:2631' },
  { id: 'live-poll', path: '/poll/live', no: '05', title: 'Live poll', phone: 'Ari', figmaNode: '84:169' },
  { id: 'plan-updated', path: '/trip/plan-updated', no: '06', title: 'Plan updated', phone: 'Ari', figmaNode: '4064:18080' },
  { id: 'log-expense', path: '/expenses/new', no: '07', title: 'Log the dinner', phone: 'Ari', figmaNode: '168:2777', sheet: true },
  { id: 'split-by-item', path: '/expenses/new/items', no: '08', title: 'Split by item', phone: 'Ari', figmaNode: '169:2976', sheet: true },
  { id: 'log-expense-new', path: '/expenses/add', no: '16', title: 'Log expense (quick add)', phone: 'Ari', figmaNode: '4097:2350', sheet: true },
  { id: 'balances', path: '/trip/expenses', no: '09', title: 'Expenses', phone: 'Ari', figmaNode: '4048:16899' },
  { id: 'expense-detail', path: '/expenses/:entryId', no: '17', title: 'Expense detail', phone: 'Ari', figmaNode: '4098:2440', sheet: true },
  { id: 'notifications', path: '/notifications', no: '15', title: 'Notifications', phone: 'Ari', figmaNode: '4098:2195' },
  { id: 'settle', path: '/settle', no: '10', title: 'Ren settles', phone: 'Ren', figmaNode: '171:3175' },
  // The ending. A plainer version without the stamp was removed — its receipt
  // list opens from this screen's transfers row instead.
  { id: 'squared-up', path: '/squared-up', no: '11', title: 'Squared up', phone: 'Ari', figmaNode: '172:3255' },
]

export const screenById = (id: string): ScreenEntry | undefined => screens.find((s) => s.id === id)

/** The path for a screen, with `:entryId` filled in where the route has one. */
export function pathFor(id: ScreenId, params?: { entryId?: string }): string {
  const path = screenById(id)?.path ?? '/'
  return params?.entryId ? path.replace(':entryId', params.entryId) : path
}
