import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { lockScreenWallpaper, lockScreenWallpaperPosition } from '@/data/assets'

/**
 * 04b · Poll notification, Nic's lock screen — Figma `166:2578`.
 *
 * Not part of the original wireflow. Draws its own chrome (big clock, no iOS
 * status bar) — the screen renders with `chrome={false}` in the registry.
 * Tap → 04c.
 */
export function PollNotification() {
  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden" style={{ paddingTop: 70, paddingInline: 12 }}>
      <img
        src={lockScreenWallpaper}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: lockScreenWallpaperPosition }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'var(--gradient-legibility-shade)' }}
      />

      {/* Clock — the lock screen's own, not the app's status bar */}
      <div className="relative flex shrink-0 flex-col items-center whitespace-nowrap text-white">
        <p className="text-footnote font-medium" style={{ fontSize: 15 }}>
          Wednesday 16 September
        </p>
        <p
          className="font-medium"
          style={{ fontSize: 92, lineHeight: '100px', letterSpacing: '-1.84px' }}
        >
          18:05
        </p>
      </div>

      <div className="min-h-0 flex-1" />

      <Pill variant="lime" height={26} className="relative shrink-0 font-medium">
        On Nic’s phone
      </Pill>

      <div style={{ height: 10 }} />

      {/* Notifications */}
      <div className="relative flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
        <NotificationCard
          title="TripUp · Lisbon"
          time="now"
          body="Ari started a poll: Where are we eating tonight? Tap to vote, closes in 20 min."
        />
        <NotificationCard
          title="TripUp · Lisbon"
          time="2m ago"
          body="Ren joined the trip for tonight"
          faded
        />
      </div>

      {/* Quick actions */}
      <div
        className="relative flex w-full shrink-0 items-center justify-between"
        style={{ paddingInline: 34, paddingTop: 28, paddingBottom: 44 }}
      >
        <QuickAction label="Torch" icon="torch" />
        <QuickAction label="Camera" icon="camera" />
      </div>
    </div>
  )
}

function NotificationCard({
  title,
  time,
  body,
  faded,
}: {
  title: string
  time: string
  body: string
  faded?: boolean
}) {
  return (
    <div
      className="flex w-full shrink-0 items-start"
      style={{
        gap: 10,
        padding: '12px 14px',
        borderRadius: 22,
        background: faded ? 'rgb(245 242 236 / 0.62)' : 'rgb(245 242 236 / 0.82)',
        opacity: faded ? 0.9 : 1,
        backdropFilter: 'blur(12px)',
        filter: 'drop-shadow(0 8px 10px rgb(31 30 36 / 0.1))',
      }}
    >
      <span
        className="flex shrink-0 items-center justify-center"
        style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--color-accent-lime)' }}
      >
        <Icon name="app-mark" size={18} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 2 }}>
        <div className="flex w-full items-start justify-between whitespace-nowrap">
          <span className="text-footnote font-medium">{title}</span>
          <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            {time}
          </span>
        </div>
        <p className="w-full text-footnote">{body}</p>
      </div>
    </div>
  )
}

function QuickAction({ label, icon }: { label: string; icon: 'torch' | 'camera' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="flex shrink-0 items-center justify-center rounded-pill"
      style={{
        width: 50,
        height: 50,
        background: 'rgb(26 31 46 / 0.35)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Icon name={icon} size={20} />
    </span>
  )
}
