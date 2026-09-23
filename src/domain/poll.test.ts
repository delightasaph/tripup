import { describe, expect, it } from 'vitest'
import { canClosePoll, tallyPoll, voteShare, type Vote } from './poll'

const optionIds = ['taberna', 'timeout', 'ramiro']

/** The dinner poll's votes in the order they arrived (spec §3): Ari, Bea and
 *  Kofi vote Taberna first, then Nic and Ren vote Time Out, then Mira votes
 *  Ramiro, and Sven's Taberna vote closes the poll. */
const dinnerVotes: Vote[] = [
  { personId: 'ari', optionId: 'taberna', order: 0 },
  { personId: 'bea', optionId: 'taberna', order: 1 },
  { personId: 'kofi', optionId: 'taberna', order: 2 },
  { personId: 'nic', optionId: 'timeout', order: 3 },
  { personId: 'ren', optionId: 'timeout', order: 4 },
  { personId: 'mira', optionId: 'ramiro', order: 5 },
  { personId: 'sven', optionId: 'taberna', order: 6 },
]

describe('tallyPoll', () => {
  it('produces the spec\'s exact result: won 4 · 2 · 1', () => {
    const outcome = tallyPoll(optionIds, dinnerVotes)
    expect(outcome.counts).toEqual({ taberna: 4, timeout: 2, ramiro: 1 })
    expect(outcome.ranked).toEqual(['taberna', 'timeout', 'ramiro'])
    expect(outcome.winnerId).toBe('taberna')
    expect(outcome.tie).toBe(false)
  })

  it('mid-poll, before Sven votes, Taberna already leads 3 · 2 · 1', () => {
    const outcome = tallyPoll(optionIds, dinnerVotes.slice(0, 6))
    expect(outcome.counts).toEqual({ taberna: 3, timeout: 2, ramiro: 1 })
    expect(outcome.winnerId).toBe('taberna')
  })

  it('has no winner before anyone has voted', () => {
    const outcome = tallyPoll(optionIds, [])
    expect(outcome.winnerId).toBeNull()
    expect(outcome.tie).toBe(false)
  })

  it('breaks a tie by whichever option was voted first', () => {
    const votes: Vote[] = [
      { personId: 'nic', optionId: 'timeout', order: 0 },
      { personId: 'ari', optionId: 'taberna', order: 1 },
      { personId: 'bea', optionId: 'taberna', order: 2 },
      { personId: 'mira', optionId: 'timeout', order: 3 },
    ]
    const outcome = tallyPoll(optionIds, votes)
    expect(outcome.counts).toEqual({ taberna: 2, timeout: 2, ramiro: 0 })
    expect(outcome.tie).toBe(true)
    // Time Out got its first vote at order 0, before Taberna's at order 1.
    expect(outcome.winnerId).toBe('timeout')
  })
})

describe('canClosePoll', () => {
  it('is disabled until at least one vote is cast', () => {
    expect(canClosePoll([])).toBe(false)
    expect(canClosePoll(dinnerVotes.slice(0, 1))).toBe(true)
  })
})

describe('voteShare', () => {
  it('matches the spec\'s bar fills once the poll has closed', () => {
    const outcome = tallyPoll(optionIds, dinnerVotes)
    expect(voteShare('taberna', outcome, 7)).toBeCloseTo(4 / 7)
    expect(voteShare('timeout', outcome, 7)).toBeCloseTo(2 / 7)
    expect(voteShare('ramiro', outcome, 7)).toBeCloseTo(1 / 7)
  })

  it('is 0 when nobody has voted', () => {
    const outcome = tallyPoll(optionIds, [])
    expect(voteShare('taberna', outcome, 0)).toBe(0)
  })
})
