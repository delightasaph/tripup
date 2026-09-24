import { motion } from 'framer-motion'
import { Icon, type IconName } from '@/components/Icon'
import { Scrim, Sheet } from '@/components/Sheet'
import { useScreenNav } from '@/lib/useScreenNav'
import { useTripStore } from '@/store/tripStore'
import { HOVER_SMALL, TAP_LARGE, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { TripLisbon } from './TripLisbon'

/**
 * 12 · Quick add — Figma `4093:2356`, sheet `4093:2534`.
 *
 * The FAB's menu, as an ordinary bottom sheet over the trip: same `Sheet`,
 * same spring, same scrim, same 0.96 behind. Two tiles that do something and
 * three rows that say what the app would cover but this prototype doesn't —
 * the menu states the information architecture, and an honest toast beats a
 * dead tap.
 */

type Category = { id: string; title: string; sub: string; icon: IconName; fill: string; toast: string }

const categories: Category[] = [
  {
    id: 'transport',
    title: 'Transport',
    sub: 'Flight, train, bus…',
    icon: 'quick-add-transport',
    fill: 'var(--color-accent-blush)',
    toast: 'Adding transport isn’t in this prototype yet',
  },
  {
    id: 'stay',
    title: 'Stay',
    sub: 'Hotel, hostel, Airbnb…',
    icon: 'quick-add-stay',
    fill: 'var(--color-accent-lilac)',
    toast: 'Adding a stay isn’t in this prototype yet',
  },
  {
    id: 'spot',
    title: 'Spot or event',
    sub: 'Restaurant, museum, beach…',
    icon: 'quick-add-spot',
    fill: 'var(--color-accent-sky)',
    toast: 'Adding a spot isn’t in this prototype yet',
  },
]

export function QuickAdd() {
  const { go, back } = useScreenNav()
  const showToast = useTripStore((s) => s.showToast)
  const startBlankPoll = useTripStore((s) => s.startBlankPoll)

  const signpost = (c: Category) => {
    back()
    showToast({ title: c.title, detail: c.toast })
  }

  return (
    <div className="relative h-full">
      <TripLisbon scaleForSheet />
      <Scrim onClick={back} />

      <Sheet gap={16} onDismiss={back}>
        <h2 className="sr-only">Add to trip</h2>

        {/* Primary — the two tiles that are real actions */}
        <div className="flex w-full shrink-0 items-center" style={{ gap: 10 }}>
          <Tile label="New poll" gap={8} onClick={() => {
              startBlankPoll()
              go('poll-question')
            }}>
            {/* 17.19 × 14.84 in the frame — not a square glyph */}
            <Icon name="quick-add-poll" size={17.2} height={14.8} />
          </Tile>
          <Tile label="Log expense" gap={4} onClick={() => go('log-expense-new')}>
            <Icon name="quick-add-expense" size={24} />
          </Tile>
        </div>

        {/* Categories — signposts */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 2 }}>
          {categories.map((c) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => signpost(c)}
              whileHover={HOVER_SMALL}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              className="flex w-full shrink-0 items-center text-left"
              style={{ gap: 14, padding: '11px 4px' }}
            >
              <span
                className="flex shrink-0 items-center justify-center"
                style={{ width: 40, height: 40, borderRadius: 'var(--radius-tile)', background: c.fill }}
              >
                <Icon name={c.icon} size={22} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 1 }}>
                <span className="text-body font-semibold">{c.title}</span>
                <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                  {c.sub}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </Sheet>
    </div>
  )
}

/** 66 high, Violet Tint, radius 16, equal halves of the row. */
function Tile({
  label,
  gap,
  onClick,
  children,
}: {
  label: string
  /** The frame's two tiles genuinely differ: 8 under the poll glyph, 4 under
   *  the receipt, because the poll glyph is shorter than its 24 box. */
  gap: number
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={HOVER_SMALL}
      whileTap={TAP_LARGE}
      transition={TAP_TRANSITION}
      className="flex min-w-0 flex-1 flex-col items-center justify-center"
      style={{ height: 66, gap, borderRadius: 'var(--radius-row)', background: 'var(--color-accent-violet-tint)' }}
    >
      <span className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
        {children}
      </span>
      <span className="text-caption font-medium">{label}</span>
    </motion.button>
  )
}
