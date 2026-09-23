import { Avatar, type Person } from './Avatar'

/** The latest vote event, on a faint ink pill: "Nic voted Time Out Market". */
export function Ticker({ person, event, when }: { person: Person; event: string; when: string }) {
  return (
    <div
      className="inline-flex items-center"
      aria-live="polite"
      style={{
        height: 28,
        paddingRight: 12,
        borderRadius: 'var(--radius-pill)',
        background: 'rgb(31 30 36 / 0.05)',
      }}
    >
      <span style={{ marginLeft: 4 }}>
        <Avatar person={person} size={20} />
      </span>
      <span
        className="text-caption"
        style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}
      >
        <strong className="font-medium" style={{ color: 'var(--color-ink-primary)' }}>
          {person.label}
        </strong>{' '}
        {event} · {when}
      </span>
    </div>
  )
}
