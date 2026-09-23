import { AvatarStack } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { SquaredUpActions } from '@/components/SquaredUpActions'
import { settledAt, settleTransfers, tripSpend } from '@/data/expenses'
import { people, tripBuddies } from '@/data/trip'
import { formatEuros } from '@/domain/money'

/**
 * 11 · Squared up — Figma `172:3175`.
 *
 * The transfer list and totals are the same `settleTransfers`/`tripSpend`
 * that drive 09 and 10 — nothing here is re-typed. See 11B
 * (`SquaredUpStamp.tsx`) for the alternative ending, shipped behind the demo
 * toggle per the spec.
 */
/** Settled order (by `settledAt`), not netting order — Ren pays first at 22:14. */
const inSettledOrder = [...settleTransfers].sort((a, b) =>
  settledAt[a.fromId].localeCompare(settledAt[b.fromId]),
)

export function SquaredUp() {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex flex-col items-start"
        style={{ paddingTop: 34, paddingInline: 'var(--screen-padding)', gap: 14 }}
      >
        {/* Squared up card */}
        <div
          className="flex w-full shrink-0 flex-col items-start"
          style={{
            gap: 14,
            padding: '22px 22px 24px',
            borderRadius: 'var(--radius-sheet)',
            background: 'var(--color-accent-lime)',
          }}
        >
          <div className="flex w-full items-center justify-between">
            <span
              className="flex shrink-0 items-center justify-center rounded-pill"
              style={{ width: 56, height: 56, background: 'var(--color-ink-primary)' }}
            >
              <Icon name="check-lg" size={24} />
            </span>
            <AvatarStack
              people={[...tripBuddies, people.ren]}
              size={28}
              ring="var(--color-accent-lime)"
            />
          </div>
          <h1 className="text-title1 font-semibold w-full">Lisbon is squared up.</h1>
          <p className="text-body w-full" style={{ color: 'var(--color-ink-secondary)' }}>
            All 5 transfers are done and everyone got the news. Nobody owes anybody.
          </p>
        </div>

        {/* Transfers */}
        <div
          className="flex w-full shrink-0 flex-col items-start"
          style={{
            padding: '6px 16px',
            borderRadius: 'var(--radius-card-lg)',
            background: 'var(--color-surface-white)',
            boxShadow: 'var(--shadow-pop)',
          }}
        >
          {inSettledOrder.map((t, i) => (
            <div key={`${t.fromId}-${t.toId}`} className="flex w-full flex-col items-start">
              {i > 0 && (
                <span aria-hidden="true" style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }} />
              )}
              <div className="flex w-full items-center" style={{ gap: 10, padding: '11px 0' }}>
                <span
                  className="flex shrink-0 items-center justify-center rounded-pill"
                  style={{ width: 22, height: 22, background: 'var(--color-status-positive)' }}
                >
                  <Icon name="check-white" size={11} />
                </span>
                <span className="min-w-0 flex-1 text-body font-medium whitespace-nowrap">
                  {people[t.fromId].label} → {t.toId === 'ari' ? 'You' : people[t.toId].label}
                </span>
                <span className="text-caption shrink-0" style={{ color: 'var(--color-ink-secondary)' }}>
                  {settledAt[t.fromId]}
                </span>
                <span className="text-headline font-semibold shrink-0">{formatEuros(t.cents)}</span>
              </div>
            </div>
          ))}
          <div
            className="flex w-full items-start justify-between text-caption whitespace-nowrap"
            style={{
              paddingTop: 12,
              paddingBottom: 8,
              borderTop: '1.5px solid var(--color-line-default)',
              color: 'var(--color-ink-secondary)',
            }}
          >
            <span>
              {formatEuros(tripSpend.totalCents)} over {tripSpend.days} days
            </span>
            <span>7 buddies</span>
          </div>
        </div>
      </div>

      <SquaredUpActions />
    </div>
  )
}
