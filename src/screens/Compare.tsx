import { useState } from 'react'
import { StatusBar } from '@/components/StatusBar'
import { AddABuddy } from './AddABuddy'
import { Buddies } from './Buddies'
import { Home } from './Home'
import { NewPoll } from './NewPoll'
import { PlanUpdated } from './PlanUpdated'
import { LivePoll } from './LivePoll'
import { TripLisbon } from './TripLisbon'

type Mode = 'side' | 'overlay' | 'difference'

const builds: {
  id: string
  no: string
  title: string
  node: string
  time: string
  reference: string
  render: React.ReactNode
  gaps: string[]
  referenceStale?: boolean
}[] = [
  {
    id: 'home',
    no: '01',
    title: 'Home',
    node: '162:429',
    time: '18:05',
    reference: '/reference/01-home.png',
    render: <Home />,
    gaps: [],
    referenceStale: true,
  },
  {
    id: 'trip',
    no: '02',
    title: 'Trip · Lisbon',
    node: '4064:17467',
    time: '18:05',
    reference: '/reference/02-trip-lisbon.png',
    render: <TripLisbon />,
    gaps: [],
    referenceStale: true,
  },
  {
    id: 'buddies',
    no: '03a',
    title: 'Buddies',
    node: '4058:3678',
    time: '18:05',
    reference: '/reference/03-add-ren.png',
    render: <Buddies />,
    gaps: [],
    referenceStale: true,
  },
  {
    id: 'add-a-buddy',
    no: '03b',
    title: 'Add a buddy',
    node: '4058:3935',
    time: '18:05',
    reference: '/reference/03-add-ren.png',
    render: <AddABuddy />,
    gaps: [],
    referenceStale: true,
  },
  {
    id: 'new-poll',
    no: '04',
    title: 'New poll',
    node: '164:2379',
    time: '18:05',
    reference: '/reference/04-new-poll.png',
    render: <NewPoll />,
    gaps: [],
  },
  {
    id: 'live-poll',
    no: '05',
    title: 'Live poll',
    node: '84:169',
    time: '18:05',
    reference: '/reference/05-live-poll.png',
    render: <LivePoll />,
    gaps: [],
  },
  {
    id: 'plan-updated',
    no: '06',
    title: 'Plan updated',
    node: '4064:18080',
    time: '18:25',
    reference: '/reference/06-plan-updated.png',
    render: <PlanUpdated />,
    gaps: [],
  },
]

/**
 * /compare — each build at 390 × 844 next to the Figma frame it was built
 * from, with an overlay and a difference mode for checking alignment.
 */
export function Compare() {
  const [mode, setMode] = useState<Mode>('side')
  const [opacity, setOpacity] = useState(0.5)

  return (
    <main className="min-h-dvh px-6 py-10" style={{ background: 'var(--color-surface-canvas)' }}>
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-8">
          <p className="text-footnote font-medium uppercase tracking-[0.08em] text-ink-secondary">
            TripUp · build vs Figma
          </p>
          <h1 className="mt-2 text-title1 font-semibold">Compare</h1>
          <p className="mt-2 max-w-[62ch] text-body text-ink-secondary">
            Left is the Figma frame exported at 390 × 844. Right is the live build at the same size,
            unscaled. Overlay lays the frame on top of the build; difference blends them, so
            anything still misaligned glows.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div
              className="inline-flex rounded-pill p-[4px]"
              style={{ background: 'var(--color-surface-white)' }}
              role="tablist"
            >
              {(['side', 'overlay', 'difference'] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className="rounded-pill px-4 py-2 text-footnote font-medium capitalize"
                  style={{
                    background: mode === m ? 'var(--color-ink-primary)' : 'transparent',
                    color:
                      mode === m ? 'var(--color-surface-white)' : 'var(--color-ink-secondary)',
                  }}
                >
                  {m === 'side' ? 'Side by side' : m}
                </button>
              ))}
            </div>

            {mode === 'overlay' && (
              <label className="flex items-center gap-3 text-footnote text-ink-secondary">
                Frame opacity
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  style={{ width: 160 }}
                />
                <span className="tabular-nums">{Math.round(opacity * 100)}%</span>
              </label>
            )}
          </div>
        </header>

        {builds.map((b) => (
          <section key={b.id} className="mb-14">
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3">
              <h2 className="text-heading font-semibold">
                {b.no} · {b.title}
              </h2>
              <code className="text-caption text-ink-secondary">Figma {b.node}</code>
              <a
                href={`/?screen=${b.id}`}
                className="text-caption underline"
                style={{ color: 'var(--color-accent-violet)' }}
              >
                open on its own
              </a>
            </div>

            {mode === 'side' ? (
              <div className="flex flex-wrap gap-8">
                <Labelled label="Figma">
                  <img src={b.reference} alt={`${b.title} in Figma`} width={390} height={844} />
                </Labelled>
                <Labelled label="Build">
                  <Screen time={b.time}>{b.render}</Screen>
                </Labelled>
              </div>
            ) : (
              <Labelled label={mode === 'overlay' ? 'Frame over build' : 'Difference'}>
                <div className="relative" style={{ width: 390, height: 844 }}>
                  <Screen time={b.time}>{b.render}</Screen>
                  <img
                    src={b.reference}
                    alt=""
                    width={390}
                    height={844}
                    className="absolute inset-0"
                    style={{
                      opacity: mode === 'overlay' ? opacity : 1,
                      mixBlendMode: mode === 'difference' ? 'difference' : undefined,
                    }}
                  />
                </div>
              </Labelled>
            )}

            {b.referenceStale && (
              <p
                className="mt-3 max-w-[62ch] text-caption"
                style={{ color: 'var(--color-status-alert)' }}
              >
                The stored reference is the <strong>old</strong> frame — this screen was reworked
                in Figma and the build follows the new one. Compare against Figma directly until
                the reference is re-exported.
              </p>
            )}
            {b.gaps.length > 0 && (
              <p className="mt-3 max-w-[62ch] text-caption text-ink-secondary">
                Not yet matched: {b.gaps.join(', ')}.
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 18,
          boxShadow: 'var(--shadow-card)',
          background: 'var(--color-surface-ground)',
        }}
      >
        {children}
      </div>
      <figcaption className="mt-2 text-caption font-medium text-ink-secondary">{label}</figcaption>
    </figure>
  )
}

/** The screen surface at 390 × 844 with its chrome, but without the bezel.
 *  No home indicator — see DeviceFrame. */
function Screen({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ width: 390, height: 844, background: 'var(--color-surface-ground)' }}
    >
      <StatusBar time={time} />
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}
