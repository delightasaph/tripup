import { AnimatePresence, motion } from 'framer-motion'
import { DUR_FAST } from '@/styles/motion'
import { Avatar, type Person } from './Avatar'

/** The latest vote event, on a faint ink pill: "Nic voted Time Out Market".
 *  Slides up and crossfades when the event changes — keyed by who and what,
 *  so a new vote always re-triggers the entrance (§6.1 "ticker text slides
 *  up"). */
export function Ticker({ person, event, when }: { person: Person; event: string; when: string }) {
  return (
    <div className="relative" style={{ height: 28 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${person.id}-${event}`}
          className="absolute inline-flex items-center"
          aria-live="polite"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: DUR_FAST, ease: 'easeOut' }}
          style={{
            height: 28,
            paddingRight: 12,
            borderRadius: 'var(--radius-pill)',
            background: 'rgb(31 30 36 / 0.05)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ marginLeft: 4 }}>
            <Avatar person={person} size={20} />
          </span>
          <span className="text-caption" style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}>
            <strong className="font-medium" style={{ color: 'var(--color-ink-primary)' }}>
              {person.label}
            </strong>{' '}
            {event} · {when}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
