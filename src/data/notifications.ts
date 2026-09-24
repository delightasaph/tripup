import { expenseLedger, shareOf, type LedgerEntry } from './expenses'
import { people } from './trip'

/**
 * 15 · Notifications. Every row is **drawn from the ledger in
 * docs/PRODUCT_SPEC.md §3** — no invented events. An expense row names a real
 * entry by id and reads its payer, amount and your share off it; a plan row
 * names something already on the itinerary.
 */

export type NotificationRow =
  /** Someone logged an expense that's in the ledger. */
  | { id: string; kind: 'expense'; entryId: string; time: string; unread: boolean }
  /** Someone put something on the plan. */
  | { id: string; kind: 'plan'; title: string; sub: string; time: string; unread: boolean }

export type NotificationGroup = { label: string; rows: NotificationRow[] }

export const notificationGroups: NotificationGroup[] = [
  {
    label: 'TODAY',
    rows: [
      { id: 'n-bikes', kind: 'expense', entryId: 'bikes', time: '16:42', unread: true },
      {
        id: 'n-bea-plan',
        kind: 'plan',
        title: 'Bea added a plan',
        sub: 'Bikes along the river, today at 11:00',
        time: '16:40',
        unread: true,
      },
    ],
  },
  {
    label: 'YESTERDAY',
    rows: [
      { id: 'n-fado', kind: 'expense', entryId: 'fado', time: '21:30', unread: false },
      { id: 'n-campo', kind: 'expense', entryId: 'lunch-campo', time: '14:10', unread: false },
    ],
  },
  {
    label: 'EARLIER',
    rows: [
      { id: 'n-ponto', kind: 'expense', entryId: 'ponto-final', time: 'Mon 13:20', unread: false },
      {
        id: 'n-nic-plan',
        kind: 'plan',
        title: 'Nic added Ferry to Cacilhas',
        sub: 'Mon, 10:40',
        time: 'Mon 09:05',
        unread: false,
      },
    ],
  },
]

const byId = new Map<string, LedgerEntry>(
  expenseLedger.flatMap((day) => day.entries).map((entry) => [entry.id, entry]),
)

export function ledgerEntry(id: string): LedgerEntry {
  const entry = byId.get(id)
  if (!entry) throw new Error(`No ledger entry "${id}"`)
  return entry
}

/** "Sven paid €99" — or "You paid €96" when it was Ari. */
export function payerLine(entry: LedgerEntry, amount: string): string {
  const who = entry.payerId === 'ari' ? 'You' : people[entry.payerId].label
  return `${who} paid ${amount}`
}

/** "Bikes along the river · your share €16,50". Your own expenses don't
 *  quote a share back at you, and neither do the ones you weren't in. */
export function expenseSubLine(entry: LedgerEntry, formatShare: (cents: number) => string): string {
  const yours = shareOf(entry, 'ari')
  if (entry.payerId === 'ari' || yours === null) return entry.title
  return `${entry.title} · your share ${formatShare(yours)}`
}

export const unreadCount = notificationGroups
  .flatMap((g) => g.rows)
  .filter((r) => r.unread).length
