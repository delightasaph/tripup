import { motion } from 'framer-motion'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet } from '@/components/Sheet'
import { placePhotos } from '@/data/assets'
import { dinnerBill } from '@/data/expenses'
import { people, tripBuddies } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import { splitEuroCents } from '@/domain/money'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { useTripStore } from '@/store/tripStore'
import { TripLisbon } from './TripLisbon'

/**
 * 07 · Log the dinner — Figma `168:2777`, sheet `168:2922`.
 *
 * Screen 02 with the dinner slot already resolved (06's `TripLisbon
 * dinner="decided"`) under a scrim, and the new-expense sheet on top. The
 * amount is shown already entered — €190,00, per the dinner bill in
 * `src/data/expenses.ts` — the keypad itself isn't wired to typing yet.
 * "By item" is selected by default, since that's the path the scenario takes
 * (→ 08).
 */
export function LogExpense() {
  const { go, back } = useScreenNav()
  const split = useTripStore((s) => s.splitMode)
  const setSplitMode = useTripStore((s) => s.setSplitMode)
  const logExpense = useTripStore((s) => s.logExpense)
  const showToast = useTripStore((s) => s.showToast)
  const { euros, decimals } = splitEuroCents(dinnerBill.totalCents)

  const next = () => {
    if (split === 'by-item') {
      go('split-by-item')
    } else {
      logExpense()
      go('balances')
    }
  }

  return (
    <div className="relative h-full">
      <TripLisbon dinner="decided" crew={[...tripBuddies, people.ren]} scaleForSheet />
      <Scrim onClick={back} />

      <Sheet gap={16} onDismiss={back}>
        {/* Header */}
        <div className="flex w-full shrink-0 items-center justify-between">
          <h2 className="text-heading font-semibold">New expense</h2>
          <motion.button
            type="button"
            onClick={() => showToast({ title: 'Coming soon', detail: 'Receipt scanning isn’t wired up yet' })}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="flex shrink-0 items-center rounded-pill text-footnote font-medium"
            style={{
              gap: 6,
              padding: '8px 14px 8px 12px',
              background: 'var(--color-accent-lilac)',
            }}
          >
            <Icon name="scan" size={16} />
            Scan receipt
          </motion.button>
        </div>

        {/* Linked plan */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            gap: 10,
            padding: '6px 14px 6px 6px',
            borderRadius: 'var(--radius-row)',
            background: 'var(--color-accent-lime)',
          }}
        >
          <img
            src={placePhotos[dinnerBill.place]}
            alt=""
            aria-hidden="true"
            style={{ width: 32, height: 32, borderRadius: 10, objectFit: 'cover' }}
          />
          <span className="min-w-0 flex-1 text-footnote font-medium">
            Dinner · {dinnerBill.restaurant}
          </span>
          <span className="text-caption shrink-0" style={{ color: 'var(--color-ink-secondary)' }}>
            20:30
          </span>
        </div>

        {/* Amount */}
        <div
          className="flex w-full shrink-0 items-end justify-center"
          style={{ gap: 2, padding: '6px 0' }}
        >
          <span
            className="font-semibold"
            style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-1.4px' }}
          >
            €{euros}
          </span>
          <span
            className="font-semibold"
            style={{
              fontSize: 48,
              lineHeight: 1,
              letterSpacing: '-1.4px',
              color: 'var(--color-data-bar-muted)',
            }}
          >
            ,{decimals}
          </span>
          <span
            aria-hidden="true"
            style={{ width: 2, height: 40, background: 'var(--color-accent-violet)' }}
          />
        </div>

        {/* Paid by / Split */}
        <div
          className="flex w-full shrink-0 flex-col items-start"
          style={{ borderRadius: 'var(--radius-row-lg)', background: 'var(--color-surface-ground)' }}
        >
          <motion.button
            type="button"
            onClick={() => showToast({ title: 'You paid this one', detail: 'Only one payer per expense in this demo' })}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="flex w-full items-center text-left"
            style={{ gap: 10, padding: '12px 14px 12px 16px' }}
          >
            <span className="text-body" style={{ color: 'var(--color-ink-secondary)' }}>
              Paid by
            </span>
            <div className="flex min-w-0 flex-1 items-center justify-end" style={{ gap: 8 }}>
              <Avatar person={dinnerBill.paidBy} size={26} />
              <span className="text-body font-semibold">You</span>
            </div>
            <Icon name="chevron-right" size={16} color="var(--color-ink-primary)" />
          </motion.button>
          <span
            aria-hidden="true"
            style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }}
          />
          <div
            className="flex w-full items-center justify-between"
            style={{ padding: '8px 8px 8px 16px' }}
          >
            <span className="text-body" style={{ color: 'var(--color-ink-secondary)' }}>
              Split
            </span>
            <div
              className="flex shrink-0 items-start rounded-pill"
              style={{ gap: 2, padding: 3, background: 'var(--color-surface-white)' }}
            >
              <SegmentButton label="Equally" active={split === 'equally'} onClick={() => setSplitMode('equally')} />
              <SegmentButton label="By item" active={split === 'by-item'} onClick={() => setSplitMode('by-item')} />
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            [',', '0', '⌫'],
          ].map((row, i) => (
            <div key={i} className="flex w-full items-start" style={{ gap: 8 }}>
              {row.map((key) => (
                <motion.button
                  key={key}
                  type="button"
                  aria-label={key === '⌫' ? 'Delete' : key}
                  whileHover={{ backgroundColor: 'rgba(31, 30, 36, 0.08)' }}
                  whileTap={TAP_SMALL}
                  transition={TAP_TRANSITION}
                  className="flex min-w-0 flex-1 items-center justify-center text-subheading font-medium"
                  style={{
                    height: 48,
                    borderRadius: 14,
                    background: 'var(--color-surface-ground)',
                  }}
                >
                  {key === '⌫' ? <Icon name="backspace" size={20} /> : key}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        {/* Next */}
        <motion.button
          type="button"
          onClick={next}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex w-full shrink-0 items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            gap: 8,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
          }}
        >
          <Icon name="arrow-right" size={18} />
          {split === 'by-item' ? 'Next: who had what' : 'Log expense'}
        </motion.button>
      </Sheet>
    </div>
  )
}

function SegmentButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={TAP_SMALL}
      transition={TAP_TRANSITION}
      className="flex items-center rounded-pill text-footnote font-medium"
      style={{
        padding: '8px 18px',
        background: active ? 'var(--color-ink-primary)' : 'transparent',
        color: active ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)',
      }}
    >
      {label}
    </motion.button>
  )
}
