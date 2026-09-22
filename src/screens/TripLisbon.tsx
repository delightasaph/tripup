import { AvatarStack } from '@/components/Avatar'
import { BottomBar } from '@/components/BottomBar'
import { Button, IconButton } from '@/components/Button'
import { DayStrip } from '@/components/DayStrip'
import { Icon } from '@/components/Icon'
import { Pill } from '@/components/Pill'
import { SectionHeader } from '@/components/SectionHeader'
import { Timeline, TimelineRow } from '@/components/Timeline'
import { Ticket } from '@/components/Ticket'
import { lisbon, tripBuddies } from '@/data/trip'

/**
 * 02 · Trip · Lisbon (Itinerary) — Figma 122:7866.
 * Static layout; the flow and motion come later.
 *
 * Offsets are the Figma frame's own: content column at x 20 / y 64, 350 wide;
 * day strip at y 217; today's plan at y 291; the timeline rows at 0 / 54 /
 * 108 / 211 inside it.
 */
export function TripLisbon() {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute"
        style={{ left: 'var(--screen-padding)', top: 15, width: 350 }}
      >
        {/* Nav */}
        <div className="flex h-[40px] items-center justify-between">
          <IconButton label="Back to trips" size={40}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
          <div className="flex items-center gap-[8px]">
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

        <div style={{ height: 10 }} />
        <Ticket destination={lisbon.destination} dates={lisbon.dates} />

        <div style={{ height: 16 }} />
        <DayStrip days={lisbon.days} />

        {/* Today's plan starts 16 below the day strip; the header sits 8 into
            it and the timeline 35 in, straight off the frame. */}
        <div style={{ height: 16 }} />
        <div style={{ paddingTop: 8 }}>
          <SectionHeader label="Today’s plan" meta="2 of 4 done" />
        </div>

        <div style={{ height: 12 }} />
        <Timeline height={331}>
          <TimelineRow top={0} time="10:00" node="done" timeOpacity={0.6}>
            <DoneCard title="Pastéis de Belém" line="Breakfast · Belém · €18" />
          </TimelineRow>

          <TimelineRow top={54} time="15:00" node="done" timeOpacity={0.6}>
            <DoneCard title="Tram 28 to Graça" line="Praça Martim Moniz" />
          </TimelineRow>

          <TimelineRow top={108} time="18:30" timeTone="ink" timeOffset={16} node="next">
            <div
              style={{
                height: 95,
                borderRadius: 'var(--radius-card)',
                background: 'var(--gradient-sunset-card)',
                padding: '14px 14px 12px 16px',
              }}
            >
              <p className="text-headline font-semibold">Sunset at Miradouro</p>
              <p
                className="text-caption"
                style={{ marginTop: 1, color: 'var(--color-ink-secondary)' }}
              >
                Viewpoint · free
              </p>
              <div style={{ marginTop: 10 }}>
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
            </div>
          </TimelineRow>

          <TimelineRow
            top={211}
            time="20:30"
            timeTone="violet"
            timeOffset={20}
            nodeOffset={23}
            node="open"
          >
            <div
              style={{
                marginTop: 4,
                height: 116,
                borderRadius: 'var(--radius-card)',
                background: 'var(--color-accent-violet-tint)',
                // outline, not border: a border would eat 1.5 px out of the
                // padding box and shift every child.
                outline: '1.5px dashed rgb(91 79 232 / 0.55)',
                outlineOffset: '-1.5px',
                padding: '14px 16px 16px',
              }}
            >
              <p className="text-headline font-semibold">Dinner</p>
              <p
                className="text-caption"
                style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
              >
                Nothing booked yet · all 6 of you are free
              </p>
              <div style={{ marginTop: 12 }}>
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
            </div>
          </TimelineRow>
        </Timeline>
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

/** A past item: Surface/White 70%, text stepped back to Ink/Secondary. */
function DoneCard({ title, line }: { title: string; line: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 46,
        borderRadius: 'var(--radius-row)',
        background: 'var(--color-surface-white-70)',
        paddingInline: 14,
      }}
    >
      <div style={{ color: 'var(--color-ink-secondary)' }}>
        <p className="text-body font-medium">{title}</p>
        <p className="text-caption" style={{ marginTop: 1, opacity: 0.8 }}>
          {line}
        </p>
      </div>
    </div>
  )
}
