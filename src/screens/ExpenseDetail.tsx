import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Scrim, Sheet } from '@/components/Sheet'
import { entrySplit, shareOf } from '@/data/expenses'
import { people } from '@/data/trip'
import { formatEuros, formatEurosAuto } from '@/domain/money'
import { useScreenNav } from '@/lib/useScreenNav'
import { selectLedgerEntry, useTripStore } from '@/store/tripStore'
import { TripLisbon } from './TripLisbon'

/**
 * 17 · Expense detail — Figma `4098:2440`, sheet `4098:2690`.
 *
 * Read-only: tapping any row on the Expenses tab opens the expense behind
 * it. Which one is in the path — `/expenses/fado` — so a single expense is
 * shareable the way any other screen is.
 *
 * **Every amount here is computed, never written down.** The header's count,
 * the list of people and each person's share all come from the expense's own
 * `sharedBy` through the split logic in `src/domain/` — which is why the
 * expenses that aren't six-way (the surf lesson was four; the Uber over the
 * bridge was three, without Ari) need no special case: they are simply
 * expenses with a different `sharedBy`, and the same code reads them.
 */
export function ExpenseDetail({ entryId }: { entryId: string }) {
  const { back } = useScreenNav()
  const entry = useTripStore((s) => selectLedgerEntry(s, entryId))

  if (!entry) return null

  const split = entrySplit(entry)
  const yourShare = shareOf(entry, 'ari')
  // The dinner is the one expense split by item rather than evenly.
  const method = entry.shares ? 'SPLIT BY ITEM' : 'SPLIT EQUALLY'

  return (
    <div className="relative h-full">
      <TripLisbon initialTab="expenses" scaleForSheet />
      <Scrim onClick={back} />

      <Sheet frameTop={259} gap={16} onDismiss={back}>
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 3 }}>
          <h2 className="w-full text-heading font-semibold">{entry.title}</h2>
          <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            {entry.day} · {entry.time} · paid by{' '}
            {entry.payerId === 'ari' ? 'you' : people[entry.payerId].label}
          </p>
        </div>

        <div className="flex w-full shrink-0 items-center justify-between">
          <p className="text-title1 font-semibold">{formatEuros(entry.amountCents)}</p>
          {/* No share to quote when you weren't in this one — the row on 09
              says the same thing, and they have to agree. */}
          <span
            className="shrink-0 rounded-pill text-caption font-medium"
            style={{ padding: '6px 12px', background: 'var(--color-surface-ground)' }}
          >
            {yourShare === null ? 'you weren’t in this one' : `your share ${formatEurosAuto(yourShare)}`}
          </span>
        </div>

        <p className="w-full text-footnote font-medium" style={{ color: 'var(--color-ink-secondary)' }}>
          {method} · {entry.sharedBy.length} OF YOU
        </p>

        {/* The list takes whatever room is left and scrolls inside the
            sheet — tonight's dinner has seven people where the frame's
            expense has six, and Done must never be pushed below the fold
            (docs/PRODUCT_SPEC.md §4, "Scroll and breathing room"). */}
        <div
          className="no-scrollbar flex w-full min-h-0 flex-1 flex-col items-start overflow-y-auto"
          style={{
            borderRadius: 'var(--radius-row-lg)',
            background: 'var(--color-surface-ground)',
            overscrollBehavior: 'contain',
          }}
        >
          {entry.sharedBy.map((personId, i) => (
            <div key={personId} className="flex w-full flex-col items-start">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }}
                />
              )}
              <div className="flex w-full items-center" style={{ gap: 12, padding: '11px 16px' }}>
                <Avatar person={people[personId]} size={28} />
                <span className="min-w-0 flex-1 text-body">
                  {people[personId].label}
                  {personId === entry.payerId && ' · paid'}
                </span>
                <span className="shrink-0 text-body font-semibold">
                  {formatEurosAuto(split[personId] ?? 0)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button fullWidth onClick={back}>
          Done
        </Button>
      </Sheet>
    </div>
  )
}
