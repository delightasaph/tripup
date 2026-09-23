import { AvatarStack, Avatar } from '@/components/Avatar'
import { BottomBar } from '@/components/BottomBar'
import { IconButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { Toast } from '@/components/Toast'
import {
  balanceAfterDinnerById,
  dinnerBill,
  dinnerShares,
  expenseLedger,
  openingBalanceCents,
  settleTransfers,
  tripSpend,
} from '@/data/expenses'
import { people, tripBuddies } from '@/data/trip'
import { formatEuros, formatEurosAuto } from '@/domain/money'

const you = balanceAfterDinnerById.ari
const wasBefore = openingBalanceCents.ari
const paidIn = dinnerBill.totalCents - dinnerShares.ari

/** "Sven, Bea and Kofi pay you. Ren and Mira pay Nic." — grouped straight off `settleTransfers`. */
function owedBySentence(): string {
  const byCreditor = new Map<string, string[]>()
  for (const t of settleTransfers) {
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
 * 09 · Balances (Expenses tab) — Figma `4048:16899`.
 *
 * Same trip-screen chrome as 02 (nav, buddy stack), but the Expenses tab's
 * own content: the "you're owed" card, the netted settle-up list, and the
 * full expense ledger. All amounts come from `src/data/expenses.ts`, which
 * is itself built on `src/domain/split.ts` and `src/domain/netting.ts` — the
 * €130, the 5 transfers and their split are computed, not copied in.
 */
export function Balances() {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="no-scrollbar h-full overflow-y-auto" style={{ overflowX: 'hidden' }}>
        <div
          className="flex flex-col items-start"
          style={{ paddingTop: 14, paddingInline: 'var(--screen-padding)', paddingBottom: 110, gap: 16 }}
        >
          {/* Nav */}
          <div className="flex h-[40px] w-full shrink-0 items-center justify-between">
            <IconButton label="Back to trips">
              <Icon name="arrow-left" size={20} />
            </IconButton>
            <div className="flex items-center" style={{ gap: 8 }}>
              <AvatarStack people={[...tripBuddies, people.ren]} size={30} max={3} />
              <IconButton
                label="Add a buddy"
                size={30}
                background="var(--color-accent-lime)"
                ring="var(--color-surface-ground)"
                style={{ filter: 'none' }}
              >
                <Icon name="plus-small" size={16} />
              </IconButton>
            </div>
          </div>

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
              {owedBySentence()}
            </p>
          </div>

          {/* Settle up */}
          <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
            <div className="flex w-full items-center justify-between">
              <h2 className="text-headline font-semibold whitespace-nowrap">Settle up</h2>
              <span className="text-footnote whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                {settleTransfers.length} transfers, netted
              </span>
            </div>
            <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 6 }}>
              {settleTransfers.map((t) => {
                const toYou = t.toId === 'ari'
                return (
                  <div
                    key={`${t.fromId}-${t.toId}`}
                    className="flex w-full items-center"
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
                    <span
                      className="text-headline font-semibold shrink-0"
                      style={{ color: toYou ? 'var(--color-status-positive)' : 'var(--color-ink-primary)' }}
                    >
                      {formatEuros(t.cents)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* All expenses */}
          <div className="flex w-full shrink-0 flex-col items-start" style={{ paddingTop: 16, gap: 20 }}>
            <h2 className="text-headline font-semibold whitespace-nowrap">All Expenses</h2>
            {expenseLedger.map((day) => (
              <div key={day.label} className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
                <span className="text-caption2 font-medium whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                  {day.label}
                </span>
                <div
                  className="flex w-full flex-col items-start overflow-hidden"
                  style={{ borderRadius: 'var(--radius-row-lg)', background: 'var(--color-surface-white)', boxShadow: 'var(--shadow-list)' }}
                >
                  {day.entries.map((entry, i) => (
                    <div key={entry.id} className="flex w-full flex-col items-start">
                      {i > 0 && (
                        <span aria-hidden="true" style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }} />
                      )}
                      <div className="flex w-full items-center justify-between" style={{ padding: '13px 16px' }}>
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
                                : entry.notIncluded
                                  ? 'var(--color-ink-secondary)'
                                  : 'var(--color-ink-primary)',
                              opacity: entry.notIncluded ? 0.65 : 1,
                            }}
                          >
                            {entry.youPaid ? '+ ' : ''}
                            {formatEuros(entry.amountCents)}
                          </p>
                          <p className="text-caption2 whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                            {entry.notIncluded
                              ? 'you were not in this one'
                              : `your share ${formatEurosAuto(entry.shareCents!)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Toast
        title={`Dinner logged · ${formatEuros(dinnerBill.totalCents)}`}
        detail={`You paid, so +${formatEuros(paidIn)} to you. Everyone’s updated.`}
      />

      <BottomBar
        tabs={[
          { id: 'itinerary', label: 'Itinerary', icon: 'calendar' },
          { id: 'expenses', label: 'Expenses', icon: 'wallet' },
        ]}
        activeId="expenses"
      />
    </div>
  )
}
