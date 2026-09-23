import { describe, expect, it } from 'vitest'
import { billTotal, splitByItems, splitEqually, type BillItem } from './split'

const sevenPeople = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira', 'ren']

describe('splitEqually', () => {
  it('divides evenly when the total divides cleanly', () => {
    const shares = splitEqually(9800, sevenPeople)
    expect(Object.values(shares).every((c) => c === 1400)).toBe(true)
  })

  it('distributes a remainder one cent at a time, in list order', () => {
    const shares = splitEqually(100, ['a', 'b', 'c'])
    expect(shares).toEqual({ a: 34, b: 33, c: 33 })
    expect(shares.a + shares.b + shares.c).toBe(100)
  })

  it('returns nothing for an empty group', () => {
    expect(splitEqually(1000, [])).toEqual({})
  })
})

describe('splitByItems', () => {
  /** The Taberna dinner bill, docs/PRODUCT_SPEC.md §3. */
  const dinnerItems: BillItem[] = [
    { id: 'mains', label: 'Mains to share', amountCents: 9800, sharedBy: sevenPeople },
    { id: 'petiscos', label: 'Petiscos & bread', amountCents: 4200, sharedBy: sevenPeople },
    {
      id: 'wine',
      label: 'Vinho verde × 2',
      amountCents: 5000,
      sharedBy: sevenPeople.filter((p) => p !== 'nic' && p !== 'ren'),
    },
  ]

  it('produces the spec\'s exact per-person shares: Nic and Ren €20, everyone else €30', () => {
    const shares = splitByItems(dinnerItems)
    expect(shares.nic).toBe(2000)
    expect(shares.ren).toBe(2000)
    for (const id of ['ari', 'bea', 'kofi', 'sven', 'mira']) {
      expect(shares[id]).toBe(3000)
    }
  })

  it('sums back to the bill total', () => {
    const shares = splitByItems(dinnerItems)
    const sum = Object.values(shares).reduce((a, b) => a + b, 0)
    expect(sum).toBe(billTotal(dinnerItems))
    expect(sum).toBe(19000)
  })

  it('recomputes instantly when someone is un-skipped on an item', () => {
    const withRenBack: BillItem[] = dinnerItems.map((item) =>
      item.id === 'wine' ? { ...item, sharedBy: sevenPeople } : item,
    )
    const shares = splitByItems(withRenBack)
    // Wine now split 7 ways (714 each, remainder to the first sharers) instead of 5.
    expect(shares.ren).toBeGreaterThan(2000)
    expect(shares.nic).toBeGreaterThan(2000)
  })
})

describe('billTotal', () => {
  it('sums every item', () => {
    expect(billTotal([{ id: 'a', label: 'A', amountCents: 100, sharedBy: [] }])).toBe(100)
  })
})
