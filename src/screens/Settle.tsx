import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { IconButton } from '@/components/Button'
import { Icon, type IconName } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { paymentMethods, settleTransfers } from '@/data/expenses'
import { people } from '@/data/trip'
import { formatEuros, splitEuroCents } from '@/domain/money'

const renToNic = settleTransfers.find((t) => t.fromId === 'ren')!

/**
 * 10 · Ren settles — Figma `171:3175`.
 *
 * Ren's own phone: the amount he owes Nic (from `settleTransfers`, the same
 * netted list 09 shows), his choice of payment method, and the pay button.
 * Selection is local `useState`, defaulting to Apple Pay per the spec.
 */
export function Settle() {
  const [methodId, setMethodId] = useState('apple-pay')
  const { euros, decimals } = splitEuroCents(renToNic.cents)

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex h-full flex-col items-start" style={{ paddingTop: 14, paddingInline: 'var(--screen-padding)', gap: 20 }}>
        {/* Nav */}
        <div className="flex h-[40px] w-full shrink-0 items-center justify-between">
          <IconButton label="Close">
            <Icon name="close" size={20} />
          </IconButton>
          <Pill variant="lime" height={27} className="font-medium">
            On Ren’s phone
          </Pill>
        </div>

        {/* Amount card */}
        <div
          className="flex w-full shrink-0 flex-col items-center"
          style={{
            gap: 14,
            padding: '22px 20px 18px',
            borderRadius: 'var(--radius-sheet)',
            background: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 8px 12px rgb(31 30 36 / 0.06))',
          }}
        >
          <div className="flex items-center" style={{ gap: 12 }}>
            <Avatar person={people.ren} size={52} />
            <Icon name="arrow-right" size={16} color="var(--color-ink-secondary)" />
            <Avatar person={people.nic} size={52} />
          </div>
          <div className="flex flex-col items-center whitespace-nowrap" style={{ gap: 2 }}>
            <p className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
              You owe Nic
            </p>
            <p className="flex items-end font-semibold" style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-1.4px' }}>
              <span>€{euros}</span>
              <span style={{ color: 'var(--color-data-bar-muted)' }}>,{decimals}</span>
            </p>
          </div>
          <span aria-hidden="true" style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }} />
          <div className="flex w-full items-center justify-between whitespace-nowrap">
            <span className="text-footnote font-medium">Dinner at Taberna</span>
            <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
              Food only · you skipped the wine
            </span>
          </div>
        </div>

        {/* Pay with */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
          <h2 className="text-headline font-semibold whitespace-nowrap">Pay with</h2>
          {paymentMethods.map((m) => {
            const selected = m.id === methodId
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethodId(m.id)}
                aria-pressed={selected}
                className="flex w-full items-center text-left"
                style={{
                  gap: 12,
                  padding: '11px 14px 11px 12px',
                  borderRadius: 'var(--radius-row-lg)',
                  background: 'var(--color-surface-white)',
                  border: selected ? '2px solid var(--color-ink-primary)' : '2px solid transparent',
                }}
              >
                {'mark' in m ? (
                  <img src={`/assets/icons/${m.mark}.svg`} alt="" aria-hidden="true" width={38} height={26} />
                ) : (
                  <span
                    className="flex shrink-0 items-center justify-center"
                    style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--color-surface-ground)' }}
                  >
                    <Icon name={m.icon as IconName} size={18} />
                  </span>
                )}
                <div className="min-w-0 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <p className="text-body font-semibold whitespace-nowrap">{m.label}</p>
                  <p className="text-caption whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
                    {m.detail}
                  </p>
                </div>
                {selected ? (
                  <span
                    className="flex shrink-0 items-center justify-center rounded-pill"
                    style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                  >
                    <Icon name="check-white" size={13} />
                  </span>
                ) : (
                  <span
                    className="shrink-0 rounded-pill"
                    style={{ width: 24, height: 24, outline: '1.5px solid rgb(31 30 36 / 0.25)', outlineOffset: '-1.5px' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute flex flex-col items-center" style={{ left: 20, right: 20, bottom: 34, gap: 12 }}>
        <p className="text-caption whitespace-nowrap" style={{ color: 'var(--color-ink-secondary)' }}>
          Nic is told the moment it’s sent
        </p>
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            gap: 8,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
          }}
        >
          <Icon name="phone" size={18} color="var(--color-surface-white)" />
          Pay Nic {formatEuros(renToNic.cents)}
        </button>
      </div>
    </div>
  )
}
