import { useMemo, useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet } from '@/components/Sheet'
import { dinnerBillItems } from '@/data/expenses'
import { people, tripBuddies } from '@/data/trip'
import { formatEuros } from '@/domain/money'
import { billTotal, splitByItems, type BillItem } from '@/domain/split'
import { TripLisbon } from './TripLisbon'

const allBuddies = ['ari', 'nic', 'bea', 'kofi', 'sven', 'mira', 'ren']

const itemIconBg: Record<string, string> = {
  mains: 'var(--color-accent-blush)',
  petiscos: 'var(--color-accent-sand)',
  wine: 'var(--color-accent-lilac)',
}
const itemIcon: Record<string, 'bowl' | 'bread' | 'wine'> = {
  mains: 'bowl',
  petiscos: 'bread',
  wine: 'wine',
}

/**
 * 08 · Split by item — Figma `169:2976`, sheet `169:3180`.
 *
 * Same trip screen behind a scrim as 07 (dinner already resolved). Only the
 * wine item is expanded with the "who's sharing" avatar row, matching the
 * spec; mains and petiscos are fixed at all 7. Toggling an avatar re-runs
 * `splitByItems` from `src/domain/split.ts` live, so the per-item and
 * summary amounts are always the real computed numbers, not copy.
 */
export function SplitByItem() {
  const [wineSharedBy, setWineSharedBy] = useState<string[]>(
    () => dinnerBillItems.find((i) => i.id === 'wine')!.sharedBy,
  )

  const items: BillItem[] = useMemo(
    () =>
      dinnerBillItems.map((item) =>
        item.id === 'wine' ? { ...item, sharedBy: wineSharedBy } : item,
      ),
    [wineSharedBy],
  )

  const shares = useMemo(() => splitByItems(items), [items])
  const total = billTotal(items)

  const toggle = (personId: string) => {
    setWineSharedBy((current) =>
      current.includes(personId)
        ? current.filter((id) => id !== personId)
        : [...current, personId],
    )
  }

  const amounts = Object.values(shares)
  const low = Math.min(...amounts)
  const high = Math.max(...amounts)
  const lowGroup = allBuddies.filter((id) => shares[id] === low)
  const summary =
    low === high
      ? `Everyone pays ${formatEuros(low)}`
      : `${lowGroup.map((id) => people[id].label).join(' & ')} pay ${formatEuros(low)}`

  return (
    <div className="relative h-full">
      <TripLisbon dinner="decided" crew={[...tripBuddies, people.ren]} />
      <Scrim />

      <Sheet gap={14}>
        {/* Summary sentence */}
        <div className="flex w-full shrink-0 flex-col items-start text-heading font-semibold" style={{ gap: 6 }}>
          <p>
            {formatEuros(total)} for <Chip variant="lime">dinner at Taberna</Chip>,
          </p>
          <p>
            paid by <Chip variant="lilac">you</Chip>, split by item.
          </p>
        </div>

        {/* Items */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          {items.map((item) => {
            const isWine = item.id === 'wine'
            const each = formatEuros(Math.round(item.amountCents / item.sharedBy.length))
            return (
              <div
                key={item.id}
                className="flex w-full flex-col items-start"
                style={{
                  gap: 12,
                  padding: isWine ? '12px 16px 14px 12px' : '12px 16px 12px 12px',
                  borderRadius: 'var(--radius-card)',
                  background: isWine ? 'var(--color-surface-white)' : 'var(--color-surface-ground)',
                  border: isWine ? '1.5px solid var(--color-ink-primary)' : '1.5px solid transparent',
                }}
              >
                <div className="flex w-full items-center" style={{ gap: 12 }}>
                  <span
                    className="flex shrink-0 items-center justify-center"
                    style={{ width: 38, height: 38, borderRadius: 12, background: itemIconBg[item.id] }}
                  >
                    <Icon name={itemIcon[item.id]} size={18} />
                  </span>
                  <div className="min-w-0 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <p className="text-body font-semibold whitespace-nowrap">{item.label}</p>
                    <p className="text-caption whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                      {item.sharedBy.length === 7
                        ? `Everyone · 7 · ${each} each`
                        : `${item.sharedBy.length} of 7 · ${each} each`}
                    </p>
                  </div>
                  <span className="text-headline font-semibold shrink-0">
                    {formatEuros(item.amountCents)}
                  </span>
                </div>

                {isWine && (
                  <>
                    <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                      Who’s sharing this? Tap to leave someone out.
                    </p>
                    <div className="flex w-full items-start justify-between">
                      {allBuddies.map((id) => {
                        const included = wineSharedBy.includes(id)
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggle(id)}
                            aria-pressed={included}
                            className="flex flex-col items-center"
                            style={{ gap: 5 }}
                          >
                            <span className="relative" style={{ width: 38, height: 38 }}>
                              <span style={{ display: 'block', opacity: included ? 1 : 0.35 }}>
                                <Avatar person={people[id]} size={38} />
                              </span>
                              {included && (
                                <span
                                  className="absolute flex items-center justify-center rounded-pill"
                                  style={{
                                    right: -3,
                                    bottom: -3,
                                    width: 16,
                                    height: 16,
                                    background: 'var(--color-ink-primary)',
                                    border: '1.5px solid var(--color-surface-white)',
                                  }}
                                >
                                  <Icon name="check-white" size={9} />
                                </span>
                              )}
                            </span>
                            <span
                              className="text-caption2 font-medium whitespace-nowrap"
                              style={{
                                color: included
                                  ? 'var(--color-ink-secondary)'
                                  : 'var(--color-status-alert)',
                              }}
                            >
                              {included ? people[id].label : 'Skipped'}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Shares summary */}
        <div
          className="flex w-full shrink-0 items-center justify-between text-footnote"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-row-lg)',
            background: 'var(--color-surface-ground)',
            color: 'var(--color-ink-secondary)',
          }}
        >
          <span>{summary}</span>
          {low !== high && (
            <span>
              Everyone else <strong className="font-semibold" style={{ color: 'var(--color-ink-primary)' }}>{formatEuros(high)}</strong>
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex w-full shrink-0 items-start" style={{ gap: 10 }}>
          <button
            type="button"
            className="flex shrink-0 items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              paddingInline: 22,
              background: 'var(--color-surface-white)',
              border: '1.5px solid var(--color-line-default)',
            }}
          >
            Back
          </button>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              gap: 8,
              background: 'var(--color-ink-primary)',
              color: 'var(--color-surface-white)',
              filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
            }}
          >
            <Icon name="check" size={18} color="var(--color-surface-white)" />
            Log expense
          </button>
        </div>
      </Sheet>
    </div>
  )
}

function Chip({ children, variant }: { children: string; variant: 'lime' | 'lilac' }) {
  return (
    <span
      className="inline-flex"
      style={{
        borderRadius: 8,
        padding: '1px 8px',
        background: variant === 'lime' ? 'var(--color-accent-lime)' : 'var(--color-accent-lilac)',
      }}
    >
      {children}
    </span>
  )
}
