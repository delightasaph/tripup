import { motion } from 'framer-motion'
import { placePhotos } from '@/data/assets'
import { Avatar, type Person } from './Avatar'
import { Icon, type IconName } from './Icon'

export type PollOption = {
  id: string
  name: string
  /** "Cosy tasca · €€ · 6 min walk" */
  line: string
  photo: keyof typeof placePhotos
  /** The small badge on the photo tile. */
  icon: IconName
  voters: Person[]
}

type PollOptionCardProps = {
  option: PollOption
  /** Share of the 318 pt track, 0–1. */
  fill: number
  leading?: boolean
  /** Shows the "Your vote" chip on the viewer's own pick. */
  yourVote?: boolean
  /** This is the option that won — carries `layoutId="dinner-photo"` so its
   *  photo travels into the dinner slot on 06 instead of being swapped. */
  sharedElement?: boolean
  onClick?: () => void
}

/**
 * Poll option, laid out on the frame's own offsets: top row at 14/14, a 48
 * photo tile with a 22 icon badge at its corner, the 318 × 8 bar at 78, then
 * voter faces and the count. The leading card is lime with an ink bar; the
 * rest are white with a muted bar. The leader is 132 tall to make room for the
 * "Your vote" chip; the others are 120.
 */
export function PollOptionCard({ option, fill, leading, yourVote, sharedElement, onClick }: PollOptionCardProps) {
  const count = option.voters.length
  const height = yourVote ? 132 : 120
  // The count sits just past the overlapping faces: 22 wide, then 18 per extra.
  const votersWidth = 22 + 18 * (count - 1)
  const votesRowTop = yourVote ? 20 : 16

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Change vote to ${option.name}` : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      className="relative"
      style={{
        width: 350,
        height,
        cursor: onClick ? 'pointer' : undefined,
        borderRadius: 'var(--radius-card-lg)',
        background: leading ? 'var(--color-accent-lime)' : 'var(--color-surface-white)',
        // The frame gives these cards no shadow at all — the lime fill is the
        // only thing marking the leader.
      }}
    >
      {/* Top row */}
      <div className="absolute" style={{ left: 14, top: 14, width: 320, height: 52 }}>
        <div className="absolute" style={{ left: 0, top: 0, width: 52, height: 52 }}>
          <motion.img
            layoutId={sharedElement ? 'dinner-photo' : undefined}
            src={placePhotos[option.photo]}
            alt=""
            aria-hidden="true"
            style={{
              width: 48,
              height: 48,
              objectFit: 'cover',
              borderRadius: 'var(--radius-tile)',
              display: 'block',
            }}
          />
          <span
            className="absolute flex items-center justify-center"
            style={{
              left: 34,
              top: 34,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'var(--color-surface-white)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <Icon name={option.icon} size={13} />
          </span>
        </div>
        <div className="absolute" style={{ left: 66, top: 0, width: 254 }}>
          <h3 className="text-headline font-semibold" style={{ marginTop: 4 }}>
            {option.name}
          </h3>
          <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
            {option.line}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="absolute" style={{ left: 14, top: 78, width: 320 }}>
        <div
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={7}
          aria-label={`${option.name}: ${count} of 7 votes`}
          style={{
            marginLeft: 2,
            width: 318,
            height: 8,
            borderRadius: 'var(--radius-pill)',
            background: leading ? 'rgb(31 30 36 / 0.1)' : 'rgb(31 30 36 / 0.07)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${fill * 100}%`,
              height: '100%',
              borderRadius: 'var(--radius-pill)',
              background: leading ? 'var(--color-ink-primary)' : 'var(--color-data-bar-muted)',
            }}
          />
        </div>

        <div
          className="absolute"
          style={{ left: 2, top: votesRowTop, width: 318, height: yourVote ? 23 : 22 }}
        >
          <div className="absolute flex items-center" style={{ left: 0, top: 0 }}>
            {option.voters.map((p) => (
              <span key={p.id} style={{ marginRight: -4 }}>
                <Avatar
                  person={p}
                  size={22}
                  ring={leading ? 'var(--color-accent-lime)' : 'var(--color-surface-white)'}
                />
              </span>
            ))}
          </div>
          <span
            className="absolute text-caption"
            style={{ left: votersWidth + 8, top: 4, color: 'var(--color-ink-secondary)' }}
          >
            {count === 1 ? '1 vote' : `${count} votes`}
          </span>

          {yourVote && (
            <span
              className="absolute flex items-center"
              style={{
                left: 228,
                top: 0,
                width: 90,
                height: 23,
                borderRadius: 'var(--radius-pill)',
                background: 'var(--color-surface-white)',
              }}
            >
              <span style={{ marginLeft: 10, display: 'flex' }}>
                <Icon name="check" size={13} />
              </span>
              <span className="text-caption2 font-medium" style={{ marginLeft: 5 }}>
                Your vote
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
