import type { ReactNode } from 'react'
import { PhoneShell } from '@/components/DeviceFrame'
import {
  avatarFills,
  colours,
  gradients,
  radii,
  shadows,
  spacing,
  typeScale,
} from '@/styles/tokenIndex'

/**
 * /styleguide — the token proof sheet.
 * Every value in docs/DESIGN_SYSTEM.md is rendered from its CSS variable, so a
 * missing or wrong token is visible here before any screen is built.
 */
export function Styleguide() {
  return (
    <main
      className="min-h-dvh px-6 py-12 md:px-12"
      style={{ background: 'var(--color-surface-canvas)' }}
    >
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-12">
          <p className="text-footnote font-medium uppercase tracking-[0.08em] text-ink-secondary">
            TripUp · design system
          </p>
          <h1 className="mt-2 text-title1 font-semibold">Style guide</h1>
          <p className="mt-2 max-w-[62ch] text-body text-ink-secondary">
            Live values from <code>src/styles/tokens.css</code>. If something here looks wrong, the
            token is wrong — fix it before touching a screen.
          </p>
        </header>

        <Section title="Colour" subtitle="Figma local styles, page “Design System”.">
          {colours.map((group) => (
            <div key={group.group} className="mb-8">
              <h3 className="mb-3 text-footnote font-medium uppercase tracking-[0.08em] text-ink-secondary">
                {group.group}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((c) => (
                  <div
                    key={c.varName}
                    className="overflow-hidden rounded-card bg-surface-white"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div
                      className="flex h-[76px] items-end justify-end p-2"
                      style={{
                        background: `var(${c.varName})`,
                        backgroundImage: ['scrim', 'track', 'white-70'].some((t) => c.varName.includes(t))
                          ? 'repeating-conic-gradient(#0000 0% 25%, rgba(31,30,36,.06) 0% 50%)'
                          : undefined,
                        backgroundSize: '16px 16px',
                      }}
                    >
                      <span
                        className="rounded-pill px-2 py-[2px] text-caption2 font-medium"
                        style={{
                          background: c.onDark
                            ? 'var(--color-surface-white-70)'
                            : 'var(--color-ink-primary)',
                          color: c.onDark ? 'var(--color-ink-primary)' : 'var(--color-surface-white)',
                        }}
                      >
                        Aa
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-caption font-medium">{c.name}</p>
                      <p className="mt-[2px] text-caption2 text-ink-secondary">{c.note}</p>
                      <code className="mt-1 block text-caption2 text-ink-secondary">
                        {c.varName}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        <Section title="Gradients">
          <div className="grid gap-3 sm:grid-cols-3">
            {gradients.map((g) => (
              <div
                key={g.varName}
                className="overflow-hidden rounded-card bg-surface-white"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="h-[96px]" style={{ background: `var(${g.varName})` }} />
                <div className="p-3">
                  <p className="text-caption font-medium">{g.name}</p>
                  <p className="text-caption2 text-ink-secondary">{g.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Avatar fills" subtitle="Initials avatars; photo avatars come from the asset kit.">
          <div className="flex flex-wrap gap-4">
            {avatarFills.map((a) => (
              <div key={a.varName} className="w-[72px] text-center">
                <div
                  className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-pill"
                  style={{ background: `var(${a.varName})` }}
                >
                  <span className="text-headline font-semibold">{a.initials}</span>
                </div>
                <p className="mt-2 text-caption2 font-medium">{a.name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography" subtitle="Rubik everywhere; Anton only on the ticket and stamps.">
          <div className="divide-y divide-line-default rounded-card bg-surface-white px-5">
            {typeScale.map((t) => (
              <div key={t.name} className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5">
                <div className="w-[240px] shrink-0">
                  <p className="text-caption font-medium">{t.name}</p>
                  <p className="text-caption2 text-ink-secondary">{t.use}</p>
                </div>
                <p className={`min-w-0 ${t.className}`}>{t.sample}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-caption text-ink-secondary">
            If the first row is not a condensed, all-caps grotesque, Anton failed to load.
          </p>
        </Section>

        <Section title="Radii">
          <div className="flex flex-wrap gap-4">
            {radii.map((r) => (
              <div key={r.varName} className="w-[132px]">
                <div
                  className="h-[84px] bg-surface-white"
                  style={{ borderRadius: `var(${r.varName})`, boxShadow: 'var(--shadow-card)' }}
                />
                <p className="mt-2 text-caption font-medium">{r.name}</p>
                <p className="text-caption2 text-ink-secondary">{r.use}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Elevation">
          <div className="flex flex-wrap gap-5">
            {shadows.map((s) => (
              <div key={s.varName} className="w-[160px]">
                <div
                  className="flex h-[84px] items-center justify-center rounded-card"
                  style={{
                    background:
                      s.name === 'winner' ? 'var(--color-accent-lime)' : 'var(--color-surface-white)',
                    boxShadow: `var(${s.varName})`,
                  }}
                >
                  <span className="text-caption2 text-ink-secondary">{s.name}</span>
                </div>
                <p className="mt-2 text-caption2 text-ink-secondary">{s.use}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Spacing" subtitle="The steps actually used in the design.">
          <div className="flex flex-wrap items-end gap-4">
            {spacing.map((s) => (
              <div key={s} className="text-center">
                <div
                  className="rounded-[4px]"
                  style={{ width: `${s}px`, height: '48px', background: 'var(--color-accent-violet)' }}
                />
                <p className="mt-2 text-caption2 text-ink-secondary">{s}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Device frame"
          subtitle="iPhone 14 · 390 × 844 pt · 1:1, never scaled. On a phone-sized viewport the app fills the screen instead."
        >
          <PhoneShell time="18:05">
            <div
              className="flex h-full flex-col"
              style={{ paddingInline: 'var(--screen-padding)' }}
            >
              <div style={{ height: 'calc(var(--content-top) - var(--status-bar-height))' }} />
              <p className="text-footnote font-medium uppercase tracking-[0.08em] text-ink-secondary">
                Frame check
              </p>
              <h2 className="mt-2 text-title1 font-semibold">390 × 844</h2>
              <p className="mt-2 text-body text-ink-secondary">
                Content starts 64 pt from the top with 20 pt side padding. The dashed box is the
                safe content column; the gap under it is where the floating tab bar sits at y = 756.
              </p>
              <div
                className="mt-6 flex-1 rounded-card"
                style={{
                  border: '1.5px dashed var(--color-accent-violet)',
                  background: 'var(--color-accent-violet-tint)',
                }}
              />
              <div className="h-[88px]" />
            </div>
          </PhoneShell>
        </Section>
      </div>
    </main>
  )
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section className="mb-14">
      <h2 className="text-heading font-semibold">{title}</h2>
      {subtitle && <p className="mt-1 mb-5 max-w-[62ch] text-caption text-ink-secondary">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
      {children}
    </section>
  )
}
