/**
 * Netting (docs/PRODUCT_SPEC.md §3, "Netting algorithm"): turn a set of
 * balances into the fewest possible transfers. Prefer debtor subsets that sum
 * exactly to a creditor's balance (so nobody ends up with a leftover few
 * cents owed to a third person), then fall back to greedy largest-first for
 * whatever's left.
 */

export interface Balance {
  personId: string
  /** Positive: they're owed money. Negative: they owe money. */
  cents: number
}

export interface Transfer {
  fromId: string
  toId: string
  cents: number
}

interface Pool {
  personId: string
  cents: number
}

/** Finds the smallest debtor subset (by count, then by list order) summing exactly to `target`. */
function findExactSubset(pool: Pool[], target: number): Pool[] | null {
  const items = pool.filter((p) => p.cents > 0 && p.cents <= target)
  const n = items.length

  for (let size = 1; size <= n; size++) {
    const combo: Pool[] = []
    const found = search(0, target, size)
    if (found) return found

    function search(start: number, remaining: number, needed: number): Pool[] | null {
      if (needed === 0) return remaining === 0 ? [...combo] : null
      for (let i = start; i <= n - needed; i++) {
        const item = items[i]
        if (item.cents > remaining) continue
        combo.push(item)
        const result = search(i + 1, remaining - item.cents, needed - 1)
        if (result) return result
        combo.pop()
      }
      return null
    }
  }

  return null
}

export function nettedTransfers(balances: Balance[]): Transfer[] {
  const creditors: Pool[] = balances
    .filter((b) => b.cents > 0)
    .map((b) => ({ personId: b.personId, cents: b.cents }))
    .sort((a, b) => b.cents - a.cents)

  const debtors: Pool[] = balances
    .filter((b) => b.cents < 0)
    .map((b) => ({ personId: b.personId, cents: -b.cents }))
    .sort((a, b) => b.cents - a.cents)

  const transfers: Transfer[] = []

  // Pass 1: exact subset matches, so a creditor is settled by debtors who
  // between them owe exactly what's due, with no leftover.
  for (const creditor of creditors) {
    if (creditor.cents === 0) continue
    const subset = findExactSubset(debtors, creditor.cents)
    if (!subset) continue
    for (const debtor of subset) {
      transfers.push({ fromId: debtor.personId, toId: creditor.personId, cents: debtor.cents })
      debtor.cents = 0
    }
    creditor.cents = 0
  }

  // Pass 2: greedy largest-first for anything an exact match couldn't cover.
  const remCreditors = creditors.filter((c) => c.cents > 0)
  const remDebtors = debtors.filter((d) => d.cents > 0)
  let ci = 0
  let di = 0
  while (ci < remCreditors.length && di < remDebtors.length) {
    const creditor = remCreditors[ci]
    const debtor = remDebtors[di]
    const amount = Math.min(creditor.cents, debtor.cents)
    if (amount > 0) {
      transfers.push({ fromId: debtor.personId, toId: creditor.personId, cents: amount })
      creditor.cents -= amount
      debtor.cents -= amount
    }
    if (creditor.cents === 0) ci++
    if (debtor.cents === 0) di++
  }

  return transfers
}
