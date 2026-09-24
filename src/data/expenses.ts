import { billTotal, splitEqually, type BillItem } from '@/domain/split'
import { people } from './trip'

const allBuddies = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira', 'ren']
/** The six who were on the trip for everything before tonight — Ren joins
 *  in the evening and earlier expenses stay out of his share (03b). */
const sixBeforeRen = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira']

/** The Taberna bill, itemised — docs/PRODUCT_SPEC.md §3 "Dinner bill". Shares,
 *  balances and the netted transfers are all derived reactively from this in
 *  `src/store/tripStore.ts` (split mode and who's sharing the wine can change
 *  at runtime), not baked in here. */
export const dinnerBillItems: BillItem[] = [
  { id: 'mains', label: 'Mains to share', amountCents: 9800, sharedBy: allBuddies },
  { id: 'petiscos', label: 'Petiscos & bread', amountCents: 4200, sharedBy: allBuddies },
  {
    id: 'wine',
    label: 'Vinho verde × 2',
    amountCents: 5000,
    sharedBy: allBuddies.filter((id) => id !== 'nic' && id !== 'ren'),
  },
]

export const dinnerBill = {
  restaurant: 'Taberna da Rua das Flores',
  place: 'taberna' as const,
  paidBy: people.ari,
  totalCents: billTotal(dinnerBillItems),
}

/** Opening balances before dinner, from the 14 earlier expenses (€1,094, cents). */
export const openingBalanceCents: Record<string, number> = {
  ari: -3000,
  nic: 5000,
  sven: -3000,
  bea: -2500,
  kofi: 1500,
  mira: 2000,
  ren: 0,
}

/** Settlement times (screen 11), in the order the transfers actually land. */
export const settledAt: Record<string, string> = {
  ren: '22:14',
  sven: '22:16',
  bea: '22:18',
  kofi: '22:20',
  mira: '22:22',
}

/** Ren's payment methods, in display order (10 · Ren settles). */
export const paymentMethods = [
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    detail: 'Default on this iPhone · Face ID',
    mark: 'apple-pay-mark' as const,
    selected: true,
  },
  { id: 'card', label: 'Card', detail: 'Visa ·· 4410', icon: 'card' as const, selected: false },
  {
    id: 'paypal',
    label: 'PayPal',
    detail: 'Pay from your PayPal account',
    mark: 'paypal-mark' as const,
    selected: false,
  },
  {
    id: 'bank',
    label: 'Bank transfer',
    detail: 'To Nic’s saved account',
    icon: 'bank' as const,
    selected: false,
  },
]

/** Trip totals shown on 09 and 11 — 14 earlier expenses (€1,094) plus tonight's dinner. */
export const tripSpend = {
  totalCents: 128400,
  expenseCount: 15,
  days: 5,
}

export type LedgerEntry = {
  id: string
  title: string
  sub: string
  amountCents: number
  /** Green "+ €N", and it counts toward what's owed to Ari. */
  youPaid?: boolean
  /** Who paid. */
  payerId: string
  /**
   * Who actually shared it — **never assumed to be everyone**. Most of the
   * trip's expenses are the six who were there before Ren joined (his share
   * starts tonight, per 03b), but the surf lesson was four of them and the
   * Uber over the bridge was three, with Ari not among them. 17 reads its
   * header, its list and every amount off this, so the exceptions need no
   * special case anywhere.
   */
  sharedBy: string[]
  /** Clock time, for 15 and 17. */
  time: string
  /** The day it happened, spelled as 17's header wants it. */
  day: string
  /**
   * An explicit per-person breakdown, for the one expense that isn't an
   * equal split: tonight's dinner, which is split by item. Everything else
   * leaves this off and is divided evenly across `sharedBy`.
   */
  shares?: Record<string, number>
}

/**
 * What each person owes on one expense. The arithmetic is the domain's
 * (`splitEqually` / the by-item split behind `shares`) — nothing here
 * hard-codes an amount, and nothing assumes the sharers are everyone.
 */
export function entrySplit(entry: LedgerEntry): Record<string, number> {
  return entry.shares ?? splitEqually(entry.amountCents, entry.sharedBy)
}

/** One person's share, or `null` when they simply weren't in this one —
 *  which is a real case (the Uber over the bridge was Nic, Sven and Mira),
 *  not an error, and every screen reads it the same way. */
export function shareOf(entry: LedgerEntry, personId: string): number | null {
  if (!entry.sharedBy.includes(personId)) return null
  return entrySplit(entry)[personId] ?? null
}

export type LedgerDay = { label: string; entries: LedgerEntry[] }

/**
 * The full expense history behind "€1,284 spent in total" on 09 — Figma
 * `4048:16899`. Presentational: each historical item's payer/share split
 * isn't specified beyond what's shown here, so these are fixed figures
 * rather than run through `splitByItems`. Tonight's dinner is deliberately
 * **not** in here — the Balances screen prepends it live from the store, so
 * it can never drift from the split mode the demo is currently showing.
 */
export const expenseLedger: LedgerDay[] = [
  {
    label: 'WED 16 SEP · TODAY',
    entries: [
      {
        id: 'bikes',
        title: 'Bikes along the river',
        sub: 'Paid by Sven',
        amountCents: 9900,
        payerId: 'sven',
        sharedBy: sixBeforeRen,
        time: '16:42',
        day: 'Wed 16 Sep',
      },
      {
        id: 'pasteis',
        title: 'Pastéis de Belém',
        sub: 'You paid',
        amountCents: 2800,
        youPaid: true,
        payerId: 'ari',
        sharedBy: sixBeforeRen,
        time: '09:20',
        day: 'Wed 16 Sep',
      },
    ],
  },
  {
    label: 'TUE 15 SEP',
    entries: [
      {
        id: 'fado',
        title: 'Live music at Damas',
        sub: 'Paid by Kofi',
        amountCents: 15000,
        payerId: 'kofi',
        sharedBy: sixBeforeRen,
        time: '21:30',
        day: 'Tue 15 Sep',
      },
      {
        id: 'lunch-campo',
        title: 'Lunch at Campo de Ourique',
        sub: 'You paid',
        amountCents: 9600,
        youPaid: true,
        payerId: 'ari',
        sharedBy: sixBeforeRen,
        time: '14:10',
        day: 'Tue 15 Sep',
      },
      {
        id: 'surf',
        title: 'Surf lesson, Caparica',
        sub: 'Paid by Mira · 4 of you',
        amountCents: 8000,
        payerId: 'mira',
        sharedBy: ['ari', 'bea', 'kofi', 'mira'],
        time: '11:00',
        day: 'Tue 15 Sep',
      },
    ],
  },
  {
    label: 'MON 14 SEP',
    entries: [
      {
        id: 'ponto-final',
        title: 'Lunch at Ponto Final',
        sub: 'Paid by Mira',
        amountCents: 10800,
        payerId: 'mira',
        sharedBy: sixBeforeRen,
        time: '13:20',
        day: 'Mon 14 Sep',
      },
      {
        id: 'uber-bridge',
        title: 'Uber back over the bridge',
        sub: 'Paid by Sven · Nic, Sven, Mira',
        amountCents: 4800,
        payerId: 'sven',
        sharedBy: ['nic', 'sven', 'mira'],
        time: '23:40',
        day: 'Mon 14 Sep',
      },
      {
        id: 'ferry',
        title: 'Ferry to Cacilhas',
        sub: 'Paid by Nic',
        amountCents: 1100,
        payerId: 'nic',
        sharedBy: sixBeforeRen,
        time: '10:40',
        day: 'Mon 14 Sep',
      },
    ],
  },
  {
    label: 'SUN 13 SEP',
    entries: [
      {
        id: 'boat',
        title: 'Boat trip on the Tejo',
        sub: 'Paid by Bea',
        amountCents: 9900,
        payerId: 'bea',
        sharedBy: sixBeforeRen,
        time: '12:15',
        day: 'Sun 13 Sep',
      },
      {
        id: 'elevador',
        title: 'Elevador da Bica tickets',
        sub: 'You paid',
        amountCents: 2700,
        youPaid: true,
        payerId: 'ari',
        sharedBy: sixBeforeRen,
        time: '17:05',
        day: 'Sun 13 Sep',
      },
      {
        id: 'rooftop',
        title: 'Drinks at Park rooftop',
        sub: 'Paid by Mira',
        amountCents: 2900,
        payerId: 'mira',
        sharedBy: sixBeforeRen,
        time: '19:40',
        day: 'Sun 13 Sep',
      },
    ],
  },
  {
    label: 'SAT 12 SEP · ARRIVED',
    entries: [
      {
        id: 'flat',
        title: 'Flat on Rua da Bica · 4 nights',
        sub: 'Paid by Nic',
        amountCents: 21600,
        payerId: 'nic',
        sharedBy: sixBeforeRen,
        time: '15:30',
        day: 'Sat 12 Sep',
      },
      {
        id: 'groceries',
        title: 'Groceries at Pingo Doce',
        sub: 'Paid by Bea',
        amountCents: 5700,
        payerId: 'bea',
        sharedBy: sixBeforeRen,
        time: '18:10',
        day: 'Sat 12 Sep',
      },
      {
        id: 'taxis',
        title: 'Two taxis from the airport',
        sub: 'Paid by Kofi',
        amountCents: 4600,
        payerId: 'kofi',
        sharedBy: sixBeforeRen,
        time: '14:45',
        day: 'Sat 12 Sep',
      },
    ],
  },
]
