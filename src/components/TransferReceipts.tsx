import { motion } from 'framer-motion'
import { settledAt, tripSpend } from '@/data/expenses'
import { people } from '@/data/trip'
import { formatEuros } from '@/domain/money'
import type { Transfer } from '@/domain/netting'
import { SPRING_POP } from '@/styles/motion'
import { Icon } from './Icon'

/**
 * The settled-transfer receipt: who paid whom, when, and how much, with the
 * trip's totals underneath.
 *
 * It was the body of the old plain ending (11). That ending is gone — the
 * stamp is the ending now — but the receipt is the detail behind "5
 * transfers · 22:14 – 22:22", so it lives on as the thing that row opens.
 * Each row's check pops in sequence, 120 ms apart.
 */
export function TransferReceipts({
  transfers,
  buddyCount,
  animate = true,
}: {
  transfers: Transfer[]
  buddyCount: number
  animate?: boolean
}) {
  return (
    <div className="flex w-full shrink-0 flex-col items-start">
      {transfers.map((t, i) => (
        <div key={`${t.fromId}-${t.toId}`} className="flex w-full flex-col items-start">
          {i > 0 && (
            <span
              aria-hidden="true"
              style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }}
            />
          )}
          <div className="flex w-full items-center" style={{ gap: 10, padding: '11px 0' }}>
            <motion.span
              initial={animate ? { scale: 0.4, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...SPRING_POP, delay: animate ? i * 0.12 : 0 }}
              className="flex shrink-0 items-center justify-center rounded-pill"
              style={{ width: 22, height: 22, background: 'var(--color-status-positive)' }}
            >
              <Icon name="check-white" size={11} />
            </motion.span>
            <span className="min-w-0 flex-1 text-body font-medium whitespace-nowrap">
              {people[t.fromId].label} → {t.toId === 'ari' ? 'You' : people[t.toId].label}
            </span>
            <span className="text-caption shrink-0" style={{ color: 'var(--color-ink-secondary)' }}>
              {settledAt[t.fromId]}
            </span>
            <span className="text-headline shrink-0 font-semibold">{formatEuros(t.cents)}</span>
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
        <span>{buddyCount} buddies</span>
      </div>
    </div>
  )
}
