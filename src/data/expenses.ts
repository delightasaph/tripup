import { billTotal, splitByItems, type BillItem } from '@/domain/split'
import { nettedTransfers, type Balance } from '@/domain/netting'
import { people } from './trip'

const allBuddies = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira', 'ren']

/** The Taberna bill, itemised — docs/PRODUCT_SPEC.md §3 "Dinner bill". */
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

/** Per-person share of the dinner, derived from the items above (A5, split by item). */
export const dinnerShares = splitByItems(dinnerBillItems)

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

/** balance = what they had before + what they paid − their share of this bill. */
export const balancesAfterDinner: Balance[] = allBuddies.map((id) => {
  const paid = id === dinnerBill.paidBy.id ? dinnerBill.totalCents : 0
  const share = dinnerShares[id] ?? 0
  return { personId: id, cents: openingBalanceCents[id] + paid - share }
})

export const balanceAfterDinnerById: Record<string, number> = Object.fromEntries(
  balancesAfterDinner.map((b) => [b.personId, b.cents]),
)

/** The 5 transfers the netting algorithm settles the trip in — docs/PRODUCT_SPEC.md §3. */
export const settleTransfers = nettedTransfers(balancesAfterDinner)

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
  shareCents?: number
  /** Ari wasn't part of this one — no share, amount shown muted. */
  notIncluded?: boolean
}

export type LedgerDay = { label: string; entries: LedgerEntry[] }

/**
 * The full expense history behind "€1,284 spent in total" on 09 — Figma
 * `4048:16899`. Presentational: each historical item's payer/share split
 * isn't specified beyond what's shown here, so these are fixed figures
 * rather than run through `splitByItems`. Today's dinner entry is the
 * exception — it reads live off `dinnerBill`/`dinnerShares` so it can never
 * drift from the numbers on 07/08/09's balances card.
 */
export const expenseLedger: LedgerDay[] = [
  {
    label: 'WED 16 SEP · TODAY',
    entries: [
      {
        id: 'dinner',
        title: `Dinner · ${dinnerBill.restaurant}`,
        sub: 'You paid',
        amountCents: dinnerBill.totalCents,
        youPaid: true,
        shareCents: dinnerShares.ari,
      },
      {
        id: 'bikes',
        title: 'Bikes along the river',
        sub: 'Paid by Sven',
        amountCents: 9900,
        shareCents: 1650,
      },
      {
        id: 'pasteis',
        title: 'Pastéis de Belém',
        sub: 'You paid',
        amountCents: 2800,
        youPaid: true,
        shareCents: 467,
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
        shareCents: 2500,
      },
      {
        id: 'lunch-campo',
        title: 'Lunch at Campo de Ourique',
        sub: 'You paid',
        amountCents: 9600,
        youPaid: true,
        shareCents: 1600,
      },
      {
        id: 'surf',
        title: 'Surf lesson, Caparica',
        sub: 'Paid by Mira · 4 of you',
        amountCents: 8000,
        shareCents: 2000,
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
        shareCents: 1800,
      },
      {
        id: 'uber-bridge',
        title: 'Uber back over the bridge',
        sub: 'Paid by Sven · Nic, Sven, Mira',
        amountCents: 4800,
        notIncluded: true,
      },
      {
        id: 'ferry',
        title: 'Ferry to Cacilhas',
        sub: 'Paid by Nic',
        amountCents: 1100,
        shareCents: 183,
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
        shareCents: 1650,
      },
      {
        id: 'elevador',
        title: 'Elevador da Bica tickets',
        sub: 'You paid',
        amountCents: 2700,
        youPaid: true,
        shareCents: 450,
      },
      {
        id: 'rooftop',
        title: 'Drinks at Park rooftop',
        sub: 'Paid by Mira',
        amountCents: 2900,
        shareCents: 483,
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
        shareCents: 3600,
      },
      {
        id: 'groceries',
        title: 'Groceries at Pingo Doce',
        sub: 'Paid by Bea',
        amountCents: 5700,
        shareCents: 950,
      },
      {
        id: 'taxis',
        title: 'Two taxis from the airport',
        sub: 'Paid by Kofi',
        amountCents: 4600,
        shareCents: 767,
      },
    ],
  },
]
