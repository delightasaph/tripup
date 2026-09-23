/**
 * Bill-splitting rules (docs/PRODUCT_SPEC.md §3, "Dinner bill" and A5): split a
 * total evenly, or split an itemised bill where each item can be shared by a
 * different subset of the group. Remainders (a total that doesn't divide
 * evenly) go one cent at a time to the first sharers in list order, so shares
 * always sum back to the exact total.
 */

export interface BillItem {
  id: string
  label: string
  amountCents: number
  /** Person ids sharing this item — "skipped" people are simply left out. */
  sharedBy: string[]
}

/** Divides `totalCents` across `peopleIds`, distributing any remainder cent by cent. */
export function splitEqually(totalCents: number, peopleIds: string[]): Record<string, number> {
  const shares: Record<string, number> = {}
  if (peopleIds.length === 0) return shares

  const base = Math.floor(totalCents / peopleIds.length)
  let remainder = totalCents - base * peopleIds.length

  peopleIds.forEach((id) => {
    shares[id] = base + (remainder > 0 ? 1 : 0)
    if (remainder > 0) remainder -= 1
  })

  return shares
}

/** Sums each person's share across every item they're part of. */
export function splitByItems(items: BillItem[]): Record<string, number> {
  const shares: Record<string, number> = {}

  for (const item of items) {
    const itemShares = splitEqually(item.amountCents, item.sharedBy)
    for (const [personId, cents] of Object.entries(itemShares)) {
      shares[personId] = (shares[personId] ?? 0) + cents
    }
  }

  return shares
}

/** Total of an itemised bill — the sum of every item's price. */
export function billTotal(items: BillItem[]): number {
  return items.reduce((sum, item) => sum + item.amountCents, 0)
}
