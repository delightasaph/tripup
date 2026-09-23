/**
 * Poll rules (docs/PRODUCT_SPEC.md §6): count votes per option, rank them, and
 * break a tie by whichever tied option received a vote first.
 */

export interface Vote {
  personId: string
  optionId: string
  /** Cast order, ascending — 0 is the first vote of the poll. */
  order: number
}

export interface PollOutcome {
  /** Vote count per option id. */
  counts: Record<string, number>
  /** Option ids ranked by count, highest first; ties ordered by earliest vote. */
  ranked: string[]
  /** null when nobody has voted yet. */
  winnerId: string | null
  /** True when the top two ranked options are tied on count. */
  tie: boolean
}

/** The order of the earliest vote cast for an option, or +Infinity if it has none. */
function firstVoteOrder(optionId: string, votes: Vote[]): number {
  let earliest = Infinity
  for (const v of votes) {
    if (v.optionId === optionId && v.order < earliest) earliest = v.order
  }
  return earliest
}

export function tallyPoll(optionIds: string[], votes: Vote[]): PollOutcome {
  const counts: Record<string, number> = {}
  for (const id of optionIds) counts[id] = 0
  for (const v of votes) counts[v.optionId] = (counts[v.optionId] ?? 0) + 1

  const ranked = [...optionIds].sort((a, b) => {
    if (counts[b] !== counts[a]) return counts[b] - counts[a]
    return firstVoteOrder(a, votes) - firstVoteOrder(b, votes)
  })

  const winnerId = votes.length === 0 ? null : ranked[0]
  const tie = ranked.length >= 2 && counts[ranked[0]] === counts[ranked[1]] && counts[ranked[0]] > 0

  return { counts, ranked, winnerId, tie }
}

/** "Close poll" is disabled until at least one vote has been cast. */
export function canClosePoll(votes: Vote[]): boolean {
  return votes.length > 0
}

/** Bar fill, 0–1, for an option's share of the track — 0 when nobody has voted. */
export function voteShare(optionId: string, outcome: PollOutcome, totalVoters: number): number {
  if (totalVoters === 0) return 0
  return outcome.counts[optionId] / totalVoters
}
