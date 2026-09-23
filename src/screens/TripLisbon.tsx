import { AvatarStack } from '@/components/Avatar'
import { BottomBar } from '@/components/BottomBar'
import { Button, IconButton } from '@/components/Button'
import { DayStrip } from '@/components/DayStrip'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { SectionHeader } from '@/components/SectionHeader'
import { Timeline, TimelineRow } from '@/components/Timeline'
import { Ticket } from '@/components/Ticket'
import { placePhotos } from '@/data/assets'
import { lisbon, tripBuddies } from '@/data/trip'

/**
 * 02 · Trip · Lisbon (Itinerary) — Figma 4064:17467, and the same screen with
 * the dinner slot resolved for 06 Plan updated.
 *
 * The frame is 922 tall with a fold marked at 844, so this screen scrolls. The
 * chrome — bottom fade, tab bar, FAB — is docked to the viewport, not to the
 * end of the content, and never moves below the fold.
 */
export function TripLisbon({ dinner = 'open' }: { dinner?: 'open' | 'decided' } = {}) {
  const decided = dinner === 'decided'

  return (
    <div className="relative h-full overflow-hidden">
      <div className="no-scrollbar h-full overflow-y-auto" style={{ overflowX: 'hidden' }}>
        <div
          className="flex flex-col items-start"
          style={{
            // 64 from the top of the frame, less the 50 status bar.
            paddingTop: 14,
            paddingInline: 'var(--screen-padding)',
            paddingBottom: 110,
            gap: 16,
          }}
        >
          {/* Top: nav + ticket */}
          <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 10 }}>
            <div className="flex h-[40px] w-full items-center justify-between">
              <IconButton label="Back to trips" size={40}>
                <Icon name="arrow-left" size={20} />
              </IconButton>
              <div className="flex items-center" style={{ gap: 8 }}>
                <AvatarStack people={tripBuddies} size={30} max={3} />
                <IconButton
                  label="Add a buddy"
                  size={30}
                  background="var(--color-accent-lime)"
                  ring="var(--color-surface-ground)"
                  style={{ filter: 'none' }}
                >
                  <Icon name="plus-small" size={16} />
                </IconButton>
              </div>
            </div>
            <Ticket destination={lisbon.destination} dates={lisbon.dates} />
          </div>

          <DayStrip days={lisbon.days} />

          <div className="flex w-full shrink-0 flex-col items-start" style={{ paddingTop: 8, gap: 12 }}>
            <SectionHeader label="Today’s plan" meta="2 of 4 done" />

            <Timeline>
              <TimelineRow time="10:00" node="done" timeOpacity={0.6}>
                <DoneCard
                  title="Pastéis de Belém"
                  line="Breakfast · Belém · €18"
                  photo="pasteis"
                />
              </TimelineRow>

              <TimelineRow time="15:00" node="done" timeOpacity={0.6}>
                <DoneCard title="Tram 28 to Graça" line="Praça Martim Moniz" />
              </TimelineRow>

              <TimelineRow time="18:30" timeTone="ink" timeOffset={16} node="next">
                <div
                  className="relative flex shrink-0 flex-col items-start justify-center overflow-hidden"
                  style={{
                    width: 280,
                    height: 84,
                    gap: 10,
                    padding: '14px 14px 12px 16px',
                    borderRadius: 'var(--radius-card)',
                    background:
                      'linear-gradient(158.199deg, rgb(247 221 211) 7.1429%, rgb(245 231 196) 78.571%)',
                  }}
                >
                  <div className="flex w-full flex-col items-start" style={{ gap: 4 }}>
                    <p className="text-headline font-semibold">Sunset at Miradouro</p>
                    <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                      Viewpoint · free
                    </p>
                    <Pill
                      variant="white70"
                      height={24}
                      radius={12}
                      className="text-caption font-medium"
                      style={{ width: 106, paddingInline: 10, gap: 5 }}
                    >
                      <Icon name="walk" size={14} />
                      12 min walk
                    </Pill>
                  </div>
                  {/* Directions — only on the next item, never on done ones */}
                  <button
                    type="button"
                    aria-label="Directions to Miradouro da Graça"
                    className="absolute flex items-center justify-center rounded-pill"
                    style={{
                      bottom: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      filter: 'drop-shadow(0 4px 5px rgb(31 30 36 / 0.1))',
                    }}
                  >
                    <Icon name="direction-right" size={24} />
                  </button>
                </div>
              </TimelineRow>

              <TimelineRow
                time="20:30"
                timeTone="violet"
                timeOffset={16}
                rowOffset={4}
                node={decided ? 'filled' : 'open'}
              >
                {decided ? (
                  <DinnerDecided />
                ) : (
                  <div
                    className="flex shrink-0 flex-col items-start overflow-hidden"
                    style={{
                      width: 280,
                      gap: 12,
                      padding: '14px 16px 16px',
                      borderRadius: 'var(--radius-card)',
                      background: 'var(--color-accent-violet-tint)',
                      outline: '1.5px dashed rgb(91 79 232 / 0.55)',
                      outlineOffset: '-1.5px',
                    }}
                  >
                    <div className="flex flex-col items-start whitespace-nowrap" style={{ gap: 2 }}>
                      <p className="text-headline font-semibold">Dinner</p>
                      <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                        Nothing booked yet · all 6 of you are free
                      </p>
                    </div>
                    <Button
                      variant="violet"
                      height={38}
                      icon={<Icon name="list" size={16} />}
                      style={{
                        width: 151,
                        paddingInline: 14,
                        justifyContent: 'flex-start',
                        gap: 6,
                        filter: 'drop-shadow(0 6px 7px rgb(91 79 232 / 0.35))',
                      }}
                    >
                      Ask the group
                    </Button>
                  </div>
                )}
              </TimelineRow>
            </Timeline>
          </div>
        </div>
      </div>

      <BottomBar
        tabs={[
          { id: 'itinerary', label: 'Itinerary', icon: 'calendar' },
          { id: 'expenses', label: 'Expenses', icon: 'wallet' },
        ]}
        activeId="itinerary"
      />
    </div>
  )
}

/**
 * The dinner slot once the poll has resolved (06): lime with an ink stroke and
 * the winner's own shadow, 280 x 124.
 */
function DinnerDecided() {
  return (
    <div
      className="shrink-0"
      style={{
        width: 280,
        height: 124,
        borderRadius: 'var(--radius-card)',
        background: 'var(--color-accent-lime)',
        outline: '1.5px solid var(--color-ink-primary)',
        outlineOffset: '-1.5px',
        padding: 14,
        filter: 'drop-shadow(0 12px 12px rgb(115 140 26 / 0.25))',
      }}
    >
      <p className="text-headline font-semibold">Taberna da Rua das Flores</p>
      <div className="flex items-center" style={{ marginTop: 5, gap: 6 }}>
        <span
          className="inline-flex items-center rounded-pill text-caption2 font-medium"
          style={{
            gap: 4,
            padding: '3px 8px',
            background: 'var(--color-ink-primary)',
            color: 'var(--color-accent-lime)',
          }}
        >
          <Icon name="won" size={11} />
          Won 4 · 2 · 1
        </span>
        <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
          6 min walk
        </span>
      </div>
      <div className="flex items-start" style={{ marginTop: 12, gap: 8 }}>
        <button
          type="button"
          className="flex shrink-0 items-center justify-center rounded-pill text-footnote font-medium"
          style={{ height: 40, gap: 6, paddingInline: 14, background: 'var(--color-surface-white)' }}
        >
          <Icon name="map" size={16} />
          Map
        </button>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center justify-center rounded-pill text-footnote font-medium"
          style={{
            height: 40,
            gap: 6,
            paddingInline: 14,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
          }}
        >
          <Icon name="receipt" size={16} />
          Log expense
        </button>
      </div>
    </div>
  )
}

/**
 * A past item: Surface/White 70%, everything stepped back to Ink/Secondary.
 * The 10:00 row carries a 56 photo at 65% and a looser 3 pt text gap; the
 * 15:00 row has no photo, a 1 pt gap and its sub-line at 80%.
 */
function DoneCard({
  title,
  line,
  photo,
}: {
  title: string
  line: string
  photo?: keyof typeof placePhotos
}) {
  if (photo) {
    return (
      <div
        className="flex shrink-0 items-center"
        style={{
          width: 280,
          gap: 12,
          padding: '10px 16px 10px 10px',
          borderRadius: 'var(--radius-row)',
          background: 'var(--color-surface-white-70)',
        }}
      >
        <img
          src={placePhotos[photo]}
          alt=""
          aria-hidden="true"
          className="shrink-0 object-cover"
          style={{ width: 56, height: 56, borderRadius: 'var(--radius-tile)', opacity: 0.65 }}
        />
        <div
          className="flex min-w-0 flex-1 flex-col items-start"
          style={{ gap: 3, color: 'var(--color-ink-secondary)' }}
        >
          <p className="w-full text-body font-medium">{title}</p>
          <p className="w-full text-caption">{line}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex shrink-0 items-center overflow-hidden"
      style={{
        width: 280,
        height: 46,
        padding: '10px 14px',
        borderRadius: 'var(--radius-row)',
        background: 'var(--color-surface-white-70)',
      }}
    >
      <div
        className="flex min-w-0 flex-1 flex-col items-start whitespace-nowrap"
        style={{ gap: 1, color: 'var(--color-ink-secondary)' }}
      >
        <p className="text-body font-medium">{title}</p>
        <p className="text-caption" style={{ opacity: 0.8 }}>
          {line}
        </p>
      </div>
    </div>
  )
}
