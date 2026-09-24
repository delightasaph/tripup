import { motion } from 'framer-motion'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet, SheetHeader } from '@/components/Sheet'
import { buddySearch } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import { HOVER_SMALL, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { selectBuddyPeople, useTripStore } from '@/store/tripStore'
import { TripLisbon } from './TripLisbon'

/**
 * 03b · Add a buddy — Figma 4058:3935, sheet 4058:4109.
 *
 * Search, reached from 03a. **No back arrow** — Cancel is the way back, and so
 * is dragging the sheet down. The sheet hugs its content (about 519 tall), so
 * it is bottom-anchored rather than pinned to a frame y.
 *
 * The root must not clip: the scrim reaches up over the status bar.
 */
export function AddABuddy() {
  const { replace, back } = useScreenNav()
  const buddies = useTripStore(selectBuddyPeople)
  const addRen = useTripStore((s) => s.addRen)
  const showToast = useTripStore((s) => s.showToast)

  /**
   * Adding someone is a complete act on its own: the sheet closes, you land
   * back on the trip you were looking at, the buddy stack ticks to +4 and
   * the toast lands there. It used to push straight on into the new-poll
   * sheet, which answered a question nobody had asked yet and left the
   * person demoing this two screens from where they started.
   *
   * `replace`, not `go`: the sheet shouldn't sit in the back stack waiting
   * to reopen.
   */
  const confirm = () => {
    addRen()
    replace('trip')
  }

  const tapResult = (name: string, selected: boolean) => {
    if (selected) return
    showToast({ title: 'Only Ren is joining tonight', detail: `${name} isn’t on this trip` })
  }

  return (
    <div className="relative h-full">
      <TripLisbon scaleForSheet />
      <Scrim onClick={back} />
      <Sheet onDismiss={back}>
        <SheetHeader title="Add a buddy" meta={`${buddies.length} on this trip`} />

        {/* Search */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            height: 48,
            gap: 10,
            paddingInline: 14,
            borderRadius: 'var(--radius-row)',
            background: 'var(--color-surface-ground)',
          }}
        >
          <Icon name="search" size={18} />
          <span className="text-body">{buddySearch.query}</span>
          <span
            aria-hidden="true"
            style={{ width: 1.5, height: 18, background: 'var(--color-accent-violet)' }}
          />
        </div>

        {/* Results */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          {buddySearch.results.map((r) => (
            <motion.button
              key={r.person.id}
              type="button"
              onClick={() => tapResult(r.name, r.selected)}
              whileHover={HOVER_SMALL}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              className="flex w-full items-center text-left"
              style={{
                gap: 12,
                padding: '10px 14px 10px 12px',
                borderRadius: 'var(--radius-row-lg)',
                background: r.selected
                  ? 'var(--color-accent-lime)'
                  : 'var(--color-surface-ground)',
              }}
            >
              <Avatar person={r.person} size={40} />
              <div className="min-w-0 flex-1">
                <p className="text-body font-semibold">{r.name}</p>
                <p
                  className="text-caption"
                  style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
                >
                  {r.line}
                </p>
              </div>
              {r.selected ? (
                <span
                  className="flex shrink-0 items-center justify-center rounded-pill"
                  style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                >
                  <Icon name="check-white" size={13} />
                </span>
              ) : (
                <span
                  className="shrink-0 rounded-pill"
                  style={{
                    width: 24,
                    height: 24,
                    outline: '1.5px solid rgb(31 30 36 / 0.25)',
                    outlineOffset: '-1.5px',
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Joins from tonight */}
        <div
          className="flex w-full shrink-0 items-center"
          style={{
            height: 63,
            gap: 12,
            padding: '12px 14px 12px 12px',
            borderRadius: 'var(--radius-row-lg)',
            outline: '1.5px solid var(--color-line-default)',
            outlineOffset: '-1.5px',
          }}
        >
          <span
            className="flex shrink-0 items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-tile)',
              background: 'var(--color-accent-sky)',
            }}
          >
            <Icon name="calendar-plus" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold">Joins from tonight</p>
            <p
              className="text-caption"
              style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
            >
              Earlier expenses stay out of their share
            </p>
          </div>
          <Icon name="chevron-right" size={16} className="shrink-0" />
        </div>

        {/* Actions — Cancel returns to 03a, as does dragging the sheet down */}
        <div className="flex w-full shrink-0 items-start" style={{ gap: 10 }}>
          <motion.button
            type="button"
            onClick={back}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="flex shrink-0 items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              paddingInline: 22,
              background: 'var(--color-surface-white)',
              border: '1.5px solid var(--color-line-default)',
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="button"
            onClick={confirm}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="flex min-w-0 flex-1 items-center justify-center rounded-pill text-body font-medium"
            style={{
              height: 54,
              paddingInline: 22,
              background: 'var(--color-ink-primary)',
              color: 'var(--color-surface-white)',
              filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
            }}
          >
            Add Ren
          </motion.button>
        </div>
      </Sheet>
    </div>
  )
}
