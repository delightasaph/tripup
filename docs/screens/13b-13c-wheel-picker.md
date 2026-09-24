# 13b / 13c · Wheel picker

Figma `4095:2140` ("Time of the event") and `4095:2389` ("Deadline"); the sheets are `4095:2346`
and `4095:2595`. Built in `src/components/WheelPicker.tsx`.

Both frames were pulled. They are the **same sheet with a different title and a different value** —
nothing else differs, not one measurement. One component, used twice.

## Sheet · picker — 0, 449 · 390 × 395
Its own `Scrim` over the whole frame, covering the New poll sheet underneath (the frame stacks two
scrims for that reason). Top corners 28, padding `10 20 34`, **gap 18**, contents centred — the
only sheet in the app that centres rather than left-aligning, so the build wraps the content in a
centred column rather than changing `Sheet`.

- **Grabber** 40 × 5, `Line/Default`, radius 999.
- **Title** Body/SemiBold 15, `Ink/Primary`, centred. "Time of the event" / "Deadline".
- **Wheel** full width, three columns, gap 16, justified centre.
- **Actions** Clear 120 wide (outline) + Done `flex: 1`, 54 high, gap 10.

## Wheel — 220 high (5 × 44)
| Column | Width |
|---|---|
| day | 150 |
| hour | 52 |
| minute | 52 |

- **Selection band**: 310 × 44, radius 12, `Surface/Ground`, centred, at y 88 within the wheel —
  i.e. row index 2 of 5. It sits *under* the columns and does not scroll.
- **Cells** 44 high. Selected: Subheading/SemiBold (20/600) `Ink/Primary`. Others:
  Subheading/Medium (20/500) `Ink/Secondary` at **55%** (±1) and **22%** (±2).
- Minutes step by **5** — the frames show 50/55/00/05/10 and 15/20/25/30/35.

## Built as a real wheel, not a `<select>`
Each column is its own scroll container with `scroll-snap-type: y mandatory`, cells at
`scroll-snap-align: center`, and two blank 44 cells of padding top and bottom so the first and last
options can both reach the band. Nothing animates `scrollTop`: the browser does the momentum and
the snap, and script only reads back (on `requestAnimationFrame`) which cell it came to rest on.
`overscroll-behavior: contain` keeps a column at its end from dragging the sheet.

## The event time can't be in the past — so past cells don't exist
Rather than validating after the fact, the columns are generated from the current clock (18:05):
hours run from 18, and within the first hour minutes start at the next 5-minute step (:10). Change
the hour and the minute column regenerates. There is nothing to reject because there is nothing
invalid to pick.

## Deliberate divergence: the day column offers only "Today"
The frames show five day cells — `Mon 14 Sep`, `Tue 15 Sep`, **Today**, `Thu 17 Sep`, `Fri 18 Sep`
— as static wheel context. The build offers **Today alone**:

- the three days *before* today are exactly what the "no times in the past" rule removes;
- the two *after* it would let a poll be scheduled onto a day this prototype has no timeline for
  (the plan is one day, the night of Wed 16), which would create a poll the demo can't show.

The band still reads "Today", and blank padding above and below is how a real iOS wheel looks at
the ends of its range — the same thing you see when the hour column is scrolled to 23.
