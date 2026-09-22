import { avatarPhotos, type AvatarPhotoId } from '@/data/assets'

export type Person = {
  id: string
  /** Label as it appears on the viewer's phone — "You" for Ari. */
  label: string
  initials: string
  /** CSS variable holding this person's initials-avatar fill. */
  fill: string
  photo?: AvatarPhotoId
}

type AvatarProps = {
  person: Person
  size: number
  /** Ring in the background colour, for overlapping stacks. */
  ring?: string
  className?: string
}

/**
 * Circle avatar. The photos are already cropped to the face and already
 * circular, so they are drawn at size and untouched — no zoom, no
 * object-position nudging. Ren has no photo by design and falls back to
 * initials on his own fill.
 */
export function Avatar({ person, size, ring, className }: AvatarProps) {
  const ringStyle = ring ? { boxShadow: `0 0 0 2px ${ring}` } : undefined

  if (person.photo) {
    return (
      <img
        src={avatarPhotos[person.photo]}
        alt={person.label}
        width={size}
        height={size}
        className={className}
        style={{ borderRadius: '50%', display: 'block', ...ringStyle }}
      />
    )
  }

  return (
    <span
      role="img"
      aria-label={person.label}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `var(${person.fill})`,
        fontWeight: 600,
        // Avatar/7–18 are discrete styles, not a ratio: Figma uses 7 inside a
        // 22 circle and 11 inside a 30.
        fontSize: size <= 24 ? 7 : size <= 34 ? 11 : Math.round(size * 0.34),
        letterSpacing: size <= 24 ? '0.1px' : '0.2px',
        color: 'var(--color-ink-primary)',
        ...ringStyle,
      }}
    >
      {person.initials}
    </span>
  )
}

type AvatarStackProps = {
  people: Person[]
  size: number
  /** Show at most this many faces, then a "+N" chip. */
  max?: number
  ring?: string
}

/** Overlapping faces at −6 spacing, each with a 2 px ring in the background. */
export function AvatarStack({
  people,
  size,
  max = people.length,
  ring = 'var(--color-surface-ground)',
}: AvatarStackProps) {
  const shown = people.slice(0, max)
  const rest = people.length - shown.length

  return (
    <div className="flex items-center">
      {shown.map((p, i) => (
        // The last element in the stack sits flush — whether that is the final
        // face or the "+N" chip. Trailing overlap would shrink the stack and
        // pull whatever follows it 6 px left.
        <span key={p.id} style={{ marginRight: i === shown.length - 1 && rest === 0 ? 0 : -6 }}>
          <Avatar person={p} size={size} ring={ring} />
        </span>
      ))}
      {rest > 0 && (
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'var(--color-surface-white)',
            boxShadow: `0 0 0 2px ${ring}`,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.2px',
          }}
        >
          +{rest}
        </span>
      )}
    </div>
  )
}
