import { describe, expect, it } from 'vitest'
import { entrySplit, expenseLedger, shareOf, type LedgerEntry } from '@/data/expenses'

const entries = expenseLedger.flatMap((day) => day.entries)
const byId = (id: string): LedgerEntry => {
  const entry = entries.find((e) => e.id === id)
  if (!entry) throw new Error(`No entry ${id}`)
  return entry
}

/**
 * The ledger's per-person amounts are derived, not stored (17). These pin the
 * cases that would otherwise tempt a special case — the expenses that were
 * *not* shared by everyone.
 */
describe('expense shares', () => {
  it('splits an ordinary expense across the six who were on the trip', () => {
    const bikes = byId('bikes')
    expect(bikes.sharedBy).toHaveLength(6)
    expect(shareOf(bikes, 'ari')).toBe(1650)
    expect(Object.values(entrySplit(bikes)).reduce((a, b) => a + b, 0)).toBe(bikes.amountCents)
  })

  it('splits the surf lesson across the four who went, not the whole trip', () => {
    const surf = byId('surf')
    expect(surf.sharedBy).toHaveLength(4)
    expect(shareOf(surf, 'ari')).toBe(2000)
    expect(shareOf(surf, 'nic')).toBeNull()
  })

  it('leaves Ari out of the Uber she was not in', () => {
    const uber = byId('uber-bridge')
    expect(uber.sharedBy).toEqual(['nic', 'sven', 'mira'])
    expect(shareOf(uber, 'ari')).toBeNull()
    // €48 across three, to the cent.
    expect(entrySplit(uber)).toEqual({ nic: 1600, sven: 1600, mira: 1600 })
  })

  it('keeps Ren out of everything that happened before he joined', () => {
    for (const entry of entries) {
      expect(shareOf(entry, 'ren')).toBeNull()
    }
  })

  it('never loses or invents a cent, on any expense', () => {
    for (const entry of entries) {
      const total = Object.values(entrySplit(entry)).reduce((a, b) => a + b, 0)
      expect(total).toBe(entry.amountCents)
    }
  })

  it('gives a share to everyone who shared it, and to nobody else', () => {
    for (const entry of entries) {
      expect(Object.keys(entrySplit(entry)).sort()).toEqual([...entry.sharedBy].sort())
    }
  })
})
