import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { screens, type ScreenId } from '@/screens/registry'
import { HOVER_SMALL, SPRING_SHEET, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { type Ending, type ViewAs, useTripStore } from '@/store/tripStore'

/**
 * The presenter's remote (docs/PRODUCT_SPEC.md §5) — never part of the
 * prototype itself. Fixed to the viewport, not the device frame, so it sits
 * outside the phone on desktop and floats over it on a real one; a PM
 * running the demo needs it reachable either way.
 */
export function DemoPanel() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const viewAs = useTripStore((s) => s.viewAs)
  const ending = useTripStore((s) => s.ending)
  const speed = useTripStore((s) => s.speed)
  const setViewAs = useTripStore((s) => s.setViewAs)
  const setEnding = useTripStore((s) => s.setEnding)
  const setSpeed = useTripStore((s) => s.setSpeed)
  const resetDemo = useTripStore((s) => s.resetDemo)

  const go = (id: ScreenId) => navigate(`/?screen=${id}`)

  const viewAsHome: Record<ViewAs, ScreenId> = {
    ari: 'trip',
    nic: 'poll-notification',
    ren: 'settle',
  }

  const selectViewAs = (who: ViewAs) => {
    setViewAs(who)
    go(viewAsHome[who])
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!open ? (
        <motion.button
          key="toggle"
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="fixed rounded-pill font-medium"
          style={{
            right: 16,
            bottom: 16,
            zIndex: 50,
            padding: '10px 16px',
            fontSize: 13,
            background: '#17161b',
            color: '#f5f2ec',
            boxShadow: '0 8px 20px rgb(0 0 0 / 0.25)',
          }}
        >
          Demo
        </motion.button>
      ) : (
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          transition={SPRING_SHEET}
          className="fixed flex flex-col items-stretch"
          style={{
            right: 16,
            bottom: 16,
            zIndex: 50,
            width: 260,
            gap: 14,
            padding: 16,
            borderRadius: 20,
            background: '#17161b',
            color: '#f5f2ec',
            boxShadow: '0 12px 30px rgb(0 0 0 / 0.35)',
            fontSize: 13,
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ fontWeight: 600 }}>Demo controls</span>
            <motion.button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close demo controls"
              whileHover={{ opacity: 1 }}
              whileTap={TAP_SMALL}
              transition={TAP_TRANSITION}
              style={{ opacity: 0.6 }}
            >
              ✕
            </motion.button>
          </div>

          <Field label="View as">
            <SegmentRow>
              {(['ari', 'nic', 'ren'] as const).map((who) => (
                <SegmentButton key={who} active={viewAs === who} onClick={() => selectViewAs(who)}>
                  {who === 'ari' ? 'Ari' : who === 'nic' ? 'Nic' : 'Ren'}
                </SegmentButton>
              ))}
            </SegmentRow>
          </Field>

          <Field label="Jump to screen">
            <select
              onChange={(e) => e.target.value && go(e.target.value as ScreenId)}
              value=""
              className="w-full rounded-md"
              style={{ padding: '8px 10px', background: '#2a2833', color: '#f5f2ec', border: 'none' }}
            >
              <option value="" disabled>
                Choose a screen…
              </option>
              {screens.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.no} · {s.title}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Ending">
            <SegmentRow>
              {(['A', 'B'] as const).map((e) => (
                <SegmentButton key={e} active={ending === e} onClick={() => setEnding(e as Ending)}>
                  {e === 'A' ? '11 · Plain' : '11B · Stamp'}
                </SegmentButton>
              ))}
            </SegmentRow>
          </Field>

          <Field label="Speed">
            <SegmentRow>
              {([1, 2, 4] as const).map((s) => (
                <SegmentButton key={s} active={speed === s} onClick={() => setSpeed(s)}>
                  {s}×
                </SegmentButton>
              ))}
            </SegmentRow>
          </Field>

          <motion.button
            type="button"
            onClick={() => {
              resetDemo()
              go('home')
            }}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="rounded-pill font-medium"
            style={{ padding: '10px 0', background: '#f5f2ec', color: '#17161b' }}
          >
            Reset demo
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-stretch" style={{ gap: 6 }}>
      <span style={{ opacity: 0.6, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
      {children}
    </div>
  )
}

function SegmentRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-stretch" style={{ gap: 4, padding: 3, borderRadius: 10, background: '#2a2833' }}>
      {children}
    </div>
  )
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={TAP_SMALL}
      transition={TAP_TRANSITION}
      className="min-w-0 flex-1 rounded-md"
      style={{
        padding: '6px 4px',
        background: active ? '#f5f2ec' : 'transparent',
        color: active ? '#17161b' : '#f5f2ec',
        fontWeight: 500,
      }}
    >
      {children}
    </motion.button>
  )
}
