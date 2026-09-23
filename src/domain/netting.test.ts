import { describe, expect, it } from 'vitest'
import { nettedTransfers, type Balance } from './netting'

/** Balances after the dinner, docs/PRODUCT_SPEC.md §3 (cents). Sums to 0. */
const afterDinner: Balance[] = [
  { personId: 'ari', cents: 13000 },
  { personId: 'nic', cents: 3000 },
  { personId: 'sven', cents: -6000 },
  { personId: 'bea', cents: -5500 },
  { personId: 'kofi', cents: -1500 },
  { personId: 'mira', cents: -1000 },
  { personId: 'ren', cents: -2000 },
]

describe('nettedTransfers', () => {
  it('produces exactly the 5 transfers in the spec', () => {
    const transfers = nettedTransfers(afterDinner)

    expect(transfers).toHaveLength(5)
    expect(transfers).toEqual(
      expect.arrayContaining([
        { fromId: 'sven', toId: 'ari', cents: 6000 },
        { fromId: 'bea', toId: 'ari', cents: 5500 },
        { fromId: 'kofi', toId: 'ari', cents: 1500 },
        { fromId: 'ren', toId: 'nic', cents: 2000 },
        { fromId: 'mira', toId: 'nic', cents: 1000 },
      ]),
    )
  })

  it('every debtor pays exactly their balance and every creditor receives exactly theirs', () => {
    const transfers = nettedTransfers(afterDinner)
    for (const balance of afterDinner) {
      const paid = transfers
        .filter((t) => t.fromId === balance.personId)
        .reduce((sum, t) => sum + t.cents, 0)
      const received = transfers
        .filter((t) => t.toId === balance.personId)
        .reduce((sum, t) => sum + t.cents, 0)
      expect(received - paid).toBe(balance.cents)
    }
  })

  it('settles nobody when every balance is already 0', () => {
    expect(nettedTransfers([{ personId: 'ari', cents: 0 }])).toEqual([])
  })

  it('falls back to greedy matching when no exact subset exists', () => {
    // No combination of {40, 40} sums to the creditor's 70 exactly, so the
    // fallback must split one debtor across two creditors.
    const balances: Balance[] = [
      { personId: 'a', cents: 70 },
      { personId: 'b', cents: 10 },
      { personId: 'c', cents: -40 },
      { personId: 'd', cents: -40 },
    ]
    const transfers = nettedTransfers(balances)
    const total = transfers.reduce((sum, t) => sum + t.cents, 0)
    expect(total).toBe(80)
    for (const balance of balances) {
      const paid = transfers.filter((t) => t.fromId === balance.personId).reduce((s, t) => s + t.cents, 0)
      const received = transfers.filter((t) => t.toId === balance.personId).reduce((s, t) => s + t.cents, 0)
      expect(received - paid).toBe(balance.cents)
    }
  })

  it('settles a simple 1:1 exact match with a single transfer', () => {
    const transfers = nettedTransfers([
      { personId: 'a', cents: 5000 },
      { personId: 'b', cents: -5000 },
    ])
    expect(transfers).toEqual([{ fromId: 'b', toId: 'a', cents: 5000 }])
  })
})
