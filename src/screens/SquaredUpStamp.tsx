import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { SquaredUpActions } from '@/components/SquaredUpActions'
import { Stamp } from '@/components/Stamp'
import { settledAt, tripSpend } from '@/data/expenses'
import { useScreenNav } from '@/lib/useScreenNav'
import { formatEuros } from '@/domain/money'
import { HOVER_SMALL, SPRING_POP, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { selectSettleTransfers, useTripStore } from '@/store/tripStore'

/**
 * 11B · Squared up + stamp collected — Figma `172:3255`.
 *
 * The alternative ending (spec §4, shipped behind a demo toggle — not wired
 * yet, this component is the "B" state on its own). Reuses the existing
 * `Stamp` component (built for the ticket/Home rows) rather than
 * reconstructing the postmark artwork from Figma's raw primitives — it's the
 * same `stamps.portugal` PNG, just at a bigger size and a different tilt.
 */
export function SquaredUpStamp() {
  const { go } = useScreenNav()
  const transfers = useTripStore(selectSettleTransfers)
  const showToast = useTripStore((s) => s.showToast)
  const reduceMotion = useReducedMotion()
  const times = Object.values(settledAt).sort()

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: 40, paddingInline: 'var(--screen-padding)', gap: 18 }}
      >
        <Pill variant="lime" height={28} className="shrink-0 font-medium" style={{ paddingLeft: 8, gap: 6 }}>
          <span
            className="flex items-center justify-center rounded-pill"
            style={{ width: 18, height: 18, background: 'var(--color-ink-primary)' }}
          >
            <Icon name="check" size={10} color="var(--color-accent-lime)" />
          </span>
          All squared up
        </Pill>

        <div className="flex w-full shrink-0 items-center justify-center" style={{ padding: '18px 0' }}>
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { scale: 1.3, rotate: -10, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 }}
            transition={
              reduceMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 280, damping: 16, mass: 0.9 }
            }
          >
            <Stamp country="portugal" paperWidth={206} rotate={5} />
          </motion.div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center text-center" style={{ gap: 8 }}>
          <h1 className="text-title1 font-semibold whitespace-nowrap">Lisbon is squared up.</h1>
          <p className="text-body" style={{ width: 300, color: 'var(--color-ink-secondary)' }}>
            All 5 transfers are done. Your Portugal stamp is now in your collection.
          </p>
        </div>

        <div className="flex shrink-0 items-start" style={{ gap: 8 }}>
          <Pill variant="white" height={30} style={{ background: 'var(--color-accent-blush)' }} className="font-medium">
            {formatEuros(tripSpend.totalCents)} spent
          </Pill>
          <Pill variant="white" height={30} style={{ background: 'var(--color-surface-canvas)' }} className="font-medium">
            {tripSpend.days} days
          </Pill>
          <Pill variant="lilac" height={30} className="font-medium">
            7 buddies
          </Pill>
        </div>

        <motion.button
          type="button"
          onClick={() => go('balances')}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex w-full shrink-0 items-center text-left"
          style={{
            gap: 10,
            padding: '14px 14px 14px 16px',
            borderRadius: 'var(--radius-row-lg)',
            background: 'var(--color-surface-white)',
            boxShadow: 'var(--shadow-pop)',
          }}
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING_POP}
            className="flex shrink-0 items-center justify-center rounded-pill"
            style={{ width: 22, height: 22, background: 'var(--color-status-positive)' }}
          >
            <Icon name="check-white" size={11} />
          </motion.span>
          <span className="min-w-0 flex-1 text-body font-medium whitespace-nowrap">
            {transfers.length} transfers · {times[0]} – {times.at(-1)}
          </span>
          <Icon name="chevron-right" size={16} />
        </motion.button>
      </div>

      <SquaredUpActions
        onShare={() => showToast({ title: 'Recap shared', detail: 'Everyone can see the final numbers' })}
        onBackToTrip={() => go('trip')}
      />
    </div>
  )
}
