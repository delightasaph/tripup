import { useEffect, useMemo, useRef, useState } from 'react'
import { NOW_MINUTES } from '@/data/itinerary'
import { Button } from './Button'
import { Scrim, Sheet } from './Sheet'

/**
 * 13b / 13c · The wheel picker — Figma `4095:2140` and `4095:2389`. One
 * component, two titles: "Time of the event" and "Deadline" are the same
 * wheel over the same sheet, so they are one thing with a prop.
 *
 * It is a **real scrolling wheel**: each column is a scroll container with
 * `scroll-snap-type: y mandatory` and cells that snap to centre, so it
 * carries native momentum and rubber-banding on a phone. Not a `<select>`,
 * and no scripted scrolling — the only thing script does is read back which
 * cell the column came to rest on.
 */

const CELL = 44
/** Five visible rows, the middle one selected. */
const VISIBLE = 5
const PAD = CELL * Math.floor(VISIBLE / 2)
const MINUTE_STEP = 5

type Column = {
  key: string
  width: number
  options: { value: number; label: string }[]
}

export function WheelPicker({
  title,
  value,
  minMinutes = NOW_MINUTES,
  onDone,
  onClear,
  onDismiss,
}: {
  title: string
  /** Minutes since midnight, or null when nothing is chosen yet. */
  value: number | null
  /** Nothing earlier than this is offered — the event can't be in the past. */
  minMinutes?: number
  onDone: (minutes: number) => void
  onClear: () => void
  onDismiss: () => void
}) {
  /** The first selectable slot: the next whole step at or after `minMinutes`. */
  const firstSlot = Math.ceil(minMinutes / MINUTE_STEP) * MINUTE_STEP
  const [minutes, setMinutes] = useState(() =>
    value !== null && value >= firstSlot ? value : firstSlot,
  )

  const hour = Math.floor(minutes / 60)
  const minute = minutes % 60

  // Hours from the first one still available to the end of the day, and
  // within the chosen hour, only the minutes that haven't passed. The wheel
  // can't express a time in the past because those cells don't exist.
  const columns: Column[] = useMemo(() => {
    const firstHour = Math.floor(firstSlot / 60)
    const hours = Array.from({ length: 24 - firstHour }, (_, i) => firstHour + i)
    const minuteFloor = hour === firstHour ? firstSlot % 60 : 0
    const minuteCount = (60 - minuteFloor) / MINUTE_STEP
    return [
      {
        // The prototype's timeline is one day — the night of Wed 16 — so
        // "Today" is the only day a poll can be for. The frame shows
        // neighbouring dates around it as wheel context; offering them would
        // let a poll land on a day this build has no timeline for.
        key: 'day',
        width: 150,
        options: [{ value: 0, label: 'Today' }],
      },
      {
        key: 'hour',
        width: 52,
        options: hours.map((h) => ({ value: h, label: String(h).padStart(2, '0') })),
      },
      {
        key: 'minute',
        width: 52,
        options: Array.from({ length: minuteCount }, (_, i) => {
          const m = minuteFloor + i * MINUTE_STEP
          return { value: m, label: String(m).padStart(2, '0') }
        }),
      },
    ]
  }, [firstSlot, hour])

  const setHour = (h: number) => {
    const floor = h === Math.floor(firstSlot / 60) ? firstSlot % 60 : 0
    setMinutes(h * 60 + Math.max(minute, floor))
  }

  return (
    <>
      <Scrim onClick={onDismiss} />
      <Sheet frameTop={449} gap={18} onDismiss={onDismiss}>
        <div className="flex w-full flex-col items-center" style={{ gap: 18 }}>
          <h2 className="text-body font-semibold">{title}</h2>

          <div className="relative flex w-full items-center justify-center" style={{ gap: 16 }}>
            {/* The selected row sits on a Ground band the columns scroll over */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: PAD,
                width: 310,
                height: CELL,
                borderRadius: 'var(--radius-tile)',
                background: 'var(--color-surface-ground)',
              }}
            />
            {columns.map((col) => (
              <WheelColumn
                key={col.key}
                column={col}
                selected={col.key === 'hour' ? hour : col.key === 'minute' ? minute : 0}
                onSelect={(v) => {
                  if (col.key === 'hour') setHour(v)
                  else if (col.key === 'minute') setMinutes(hour * 60 + v)
                }}
                label={title}
              />
            ))}
          </div>

          <div className="flex w-full items-center" style={{ gap: 10 }}>
            <Button variant="secondary" onClick={onClear} style={{ width: 120 }}>
              Clear
            </Button>
            <Button fullWidth onClick={() => onDone(minutes)}>
              Done
            </Button>
          </div>
        </div>
      </Sheet>
    </>
  )
}

/**
 * One column. The scroll position *is* the value: the browser snaps a cell
 * to the middle and we read which one it settled on, rather than animating
 * `scrollTop` ourselves.
 */
function WheelColumn({
  column,
  selected,
  onSelect,
  label,
}: {
  column: Column
  selected: number
  onSelect: (value: number) => void
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const index = Math.max(
    0,
    column.options.findIndex((o) => o.value === selected),
  )
  const [scrolledIndex, setScrolledIndex] = useState(index)

  // Follow the value when it changes from outside (a new hour re-bases the
  // minutes), but never fight a scroll the finger is in the middle of.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = index * CELL
    if (Math.abs(el.scrollTop - target) > 1) el.scrollTop = target
    setScrolledIndex(index)
  }, [index, column.options.length])

  const handleScroll = () => {
    const el = ref.current
    if (!el || frame.current !== null) return
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      const i = Math.round(el.scrollTop / CELL)
      setScrolledIndex(i)
      const option = column.options[i]
      if (option && option.value !== selected) onSelect(option.value)
    })
  }

  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
  }, [])

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={`${label} · ${column.key}`}
      tabIndex={0}
      onScroll={handleScroll}
      className="no-scrollbar relative shrink-0 overflow-y-auto"
      style={{
        width: column.width,
        height: CELL * VISIBLE,
        scrollSnapType: 'y mandatory',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Two blank cells top and bottom so the first and last options can
          both reach the middle band. */}
      <div aria-hidden="true" style={{ height: PAD }} />
      {column.options.map((option, i) => {
        const distance = Math.abs(i - scrolledIndex)
        const isSelected = distance === 0
        return (
          <div
            key={option.value}
            role="option"
            aria-selected={isSelected}
            className="flex items-center justify-center"
            style={{
              height: CELL,
              scrollSnapAlign: 'center',
              opacity: distance === 0 ? 1 : distance === 1 ? 0.55 : 0.22,
            }}
          >
            <span
              className={isSelected ? 'text-subheading font-semibold' : 'text-subheading font-medium'}
              style={{ color: isSelected ? 'var(--color-ink-primary)' : 'var(--color-ink-secondary)' }}
            >
              {option.label}
            </span>
          </div>
        )
      })}
      <div aria-hidden="true" style={{ height: PAD }} />
    </div>
  )
}
