import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { openingBalanceCents, shareOf, tripSpend } from '@/data/expenses'
import { people } from '@/data/trip'
import { useNavigate } from 'react-router-dom'
import { useScreenNav } from '@/lib/useScreenNav'
import { formatEuros, formatEurosAuto } from '@/domain/money'
import type { Transfer } from '@/domain/netting'
import { SPRING_POP, TAP_LARGE, TAP_TRANSITION } from '@/styles/motion'
import {
  selectAllSettled,
  selectBalancesAfterDinner,
  selectFullLedger,
  selectSettleTransfers,
  useTripStore,
} from '@/store/tripStore'

/** "Sven, Bea and Kofi pay you. Ren and Mira pay Nic." — grouped straight off the transfers. */
function owedBySentence(transfers: Transfer[]): string {
  const byCreditor = new Map<string, string[]>()
  for (const t of transfers) {
    byCreditor.set(t.toId, [...(byCreditor.get(t.toId) ?? []), t.fromId])
  }
  return [...byCreditor.entries()]
    .map(([toId, debtorIds]) => {
      const names = debtorIds.map((id) => people[id].label)
      const joined =
        names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
      const creditor = toId === 'ari' ? 'you' : people[toId].label
      return `${joined} pay ${creditor}.`
    })
    .join(' ')
}

/**
 * 09 · Balances — the Expenses tab's own body inside the trip shell
 * (`TripLisbon.tsx` owns the nav row and the tab bar now; see
 * docs/INTERACTION_EXECUTION_BRIEF.md §0). The "you're owed" card, the
 * netted settle-up list, and the full expense ledger. The €130, the
 * transfers and their split are read live off the store —
 * `src/domain/split.ts` and `src/domain/netting.ts` run on whatever split
 * mode the demo is currently in, not a fixed copy.
 *
 * `animateEntrance` gates the settle-up rows' stagger-in: true only the
 * first time this body is ever shown in the session, so flipping back to
 * this tab later doesn't replay it. The shell tracks that via a ref and
 * flips it after the first mount, through `onShown`.
 */
export function ExpensesBody({
  animateEntrance = true,
  onShown,
}: {
  animateEntrance?: boolean
  onShown?: () => void
}) {
  const { replace } = useScreenNav()
  const navigate = useNavigate()
  const settledIds = useTripStore((s) => s.settledIds)
  const allSettled = useTripStore(selectAllSettled)
  const balances = useTripStore(selectBalancesAfterDinner)
  const transfers = useTripStore(selectSettleTransfers)
  const shownOnce = useRef(false)

  const you = balances.find((b) => b.personId === 'ari')?.cents ?? 0
  const wasBefore = openingBalanceCents.ari

  const ledger = useTripStore(selectFullLedger)

  // Every transfer settles (via 10, then the auto-settle chain) → the trip
  // is squared up, and the stamp lands. There is one ending: a finished trip
  // earns the stamp, so offering a version without it made the finish
  // ambiguous. 11's receipt list is still there, as the detail behind 11B's
  // transfers row.
  useEffect(() => {
    if (allSettled) replace('squared-up-stamp')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSettled])

  useEffect(() => {
    if (!shownOnce.current) {
      shownOnce.current = true
      onShown?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 16 }}>
      {/* Title */}
      <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 4 }}>
        <h1 className="text-title1 font-semibold whitespace-nowrap">Lisbon</h1>
        <p className="text-footnote whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
          {formatEuros(tripSpend.totalCents)} spent in total
        </p>
      </div>

      {/* You're owed */}
      <div
        className="flex w-full shrink-0 flex-col items-start"
        style={{ gap: 6, padding: 18, borderRadius: 'var(--radius-card-lg)', background: 'var(--color-accent-lilac)' }}
      >
        <div className="flex w-full items-center justify-between">
          <span className="text-footnote font-medium" style={{ color: 'var(--color-ink-secondary)' }}>
            You’re owed
          </span>
          <Pill variant="white70" height={22} className="text-caption2 font-medium" style={{ color: 'var(--color-ink-secondary)' }}>
            was {formatEuros(wasBefore)} before dinner
          </Pill>
        </div>
        <p className="font-semibold" style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-1.4px' }}>
          {formatEuros(you)}
        </p>
        <p className="text-footnote w-full" style={{ color: 'var(--color-ink-secondary)' }}>
          {owedBySentence(transfers)}
        </p>
      </div>

      {/* Settle up */}
      <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-headline font-semibold whitespace-nowrap">Settle up</h2>
          <span className="text-footnote whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
            {transfers.length} transfers, netted
          </span>
        </div>
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 6 }}>
          {transfers.map((t, i) => {
            const toYou = t.toId === 'ari'
            const settled = settledIds.includes(t.fromId)
            return (
              <motion.div
                key={`${t.fromId}-${t.toId}`}
                className="flex w-full items-center"
                initial={animateEntrance ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: settled ? 0.55 : 1, y: 0 }}
                transition={{ duration: 0.25, delay: animateEntrance ? i * 0.04 : 0 }}
                style={{
                  gap: 8,
                  padding: '9px 16px 9px 10px',
                  borderRadius: 'var(--radius-row)',
                  background: toYou ? 'var(--color-status-positive-tint)' : 'var(--color-surface-white)',
                }}
              >
                <Avatar person={people[t.fromId]} size={30} />
                <span className="text-body font-medium whitespace-nowrap">{people[t.fromId].label}</span>
                <Icon name="arrow-right" size={14} color="var(--color-ink-secondary)" />
                <Avatar person={people[t.toId]} size={30} />
                <span className="min-w-0 flex-1 text-body font-medium">
                  {toYou ? 'You' : people[t.toId].label}
                </span>
                {settled ? (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={SPRING_POP}
                    className="flex shrink-0 items-center justify-center rounded-pill"
                    style={{ width: 22, height: 22, background: 'var(--color-status-positive)' }}
                  >
                    <Icon name="check-white" size={11} />
                  </motion.span>
                ) : (
                  <span
                    className="text-headline font-semibold shrink-0"
                    style={{ color: toYou ? 'var(--color-status-positive)' : 'var(--color-ink-primary)' }}
                  >
                    {formatEuros(t.cents)}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* All expenses */}
      <div className="flex w-full shrink-0 flex-col items-start" style={{ paddingTop: 16, gap: 20 }}>
        <h2 className="text-headline font-semibold whitespace-nowrap">All Expenses</h2>
        {ledger.map((day) => (
          <div key={day.label} className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
            <span className="text-caption2 font-medium whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
              {day.label}
            </span>
            <div
              className="flex w-full flex-col items-start overflow-hidden"
              style={{ borderRadius: 'var(--radius-row-lg)', background: 'var(--color-surface-white)', boxShadow: 'var(--shadow-list)' }}
            >
              {day.entries.map((entry, i) => {
                // Not everyone is in every expense — the Uber over the
                // bridge was three of them, Ari not among them. A null share
                // *is* the answer, not a missing one.
                const yourShare = shareOf(entry, 'ari')
                const notIncluded = yourShare === null
                return (
                <div key={entry.id} className="flex w-full flex-col items-start">
                  {i > 0 && (
                    <span aria-hidden="true" style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }} />
                  )}
                  <motion.button
                    type="button"
                    onClick={() => navigate(`/?screen=expense-detail&entry=${entry.id}`)}
                    whileTap={TAP_LARGE}
                    transition={TAP_TRANSITION}
                    className="flex w-full items-center justify-between text-left"
                    style={{ padding: '13px 16px' }}
                  >
                    <div className="min-w-0 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <p className="text-body font-semibold whitespace-nowrap">{entry.title}</p>
                      <p className="text-caption whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                        {entry.sub}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end" style={{ gap: 2 }}>
                      <p
                        className="text-headline font-semibold whitespace-nowrap"
                        style={{
                          color: entry.youPaid
                            ? 'var(--color-status-positive)'
                            : notIncluded
                              ? 'var(--color-ink-secondary)'
                              : 'var(--color-ink-primary)',
                          opacity: notIncluded ? 0.65 : 1,
                        }}
                      >
                        {entry.youPaid ? '+ ' : ''}
                        {formatEuros(entry.amountCents)}
                      </p>
                      <p className="text-caption2 whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                        {notIncluded ? 'you were not in this one' : `your share ${formatEurosAuto(yourShare)}`}
                      </p>
                    </div>
                  </motion.button>
                </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
