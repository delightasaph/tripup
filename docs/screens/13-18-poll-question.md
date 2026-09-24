# 18 / 13 · New poll · what are we deciding

Figma `4097:2617` (**18**, empty) and `4094:2129` (**13**, filled); the sheet is `4097:2795` /
`4094:2307`. Built in `src/screens/PollQuestion.tsx`.

Two frames, one sheet, two states — so one screen and one record. Everything behind the scrim is
the ordinary `TripLisbon` with the dinner slot still open.

## What actually differs between 18 and 13
Only three things, all data:

| | 18 (empty) | 13 (filled) |
|---|---|---|
| Question | placeholder "Ask the group a question…", Body/Regular `Ink/Secondary`, no caret | the typed question, Body/**SemiBold** `Ink/Primary`, 2 × 20 violet caret at the right edge |
| Both value rows | "Not set", Body/Regular `Ink/Secondary` | the value, Body/**SemiBold** `Ink/Primary` |
| Continue | `Data/Bar Muted` #CFCAD6, white label, disabled | `Ink/Primary` |

So the build is one component with a disabled state, not two screens.

## Sheet · New poll — bottom-anchored, hugs its content
The standard `Sheet` shell: full width, top corners 28, padding `10 20 34`, **gap 16**,
`drop-shadow(0 -8px 15px rgb(31 30 36 / .12))`, 40 × 5 `Line/Default` grabber. Scrim `Overlay/Scrim`
over the whole frame.

| Section | Notes |
|---|---|
| Header | "What are we deciding?" Heading 22, then "This is the question your buddies will see." Caption/Regular `Ink/Secondary`. Gap 4. |
| Question | `Surface/Ground`, radius 16, padding 16. A real `<input>` in the build, with `caret-color: Accent/Violet` — the frame draws the caret as a 2 × 20 violet rectangle, which is exactly what a caret in that field looks like. |
| Settings | Two rows, `15 2` padding, with a 1 px `Line/Default` divider between. Label Body/Regular `Ink/Secondary` left; value + chevron right, gap 8. |
| Actions | Cancel 120 wide (white, 1.5 `Line/Default` inside border) + Continue `flex: 1`, both 54 high, gap 10. |

Rows get `min-height: 44` in the build — the frame's 15 + 18 + 15 lands at 48, but the padding is
what the frame states, so the minimum is belt and braces rather than a change.

**Value formats**, taken from the frames verbatim: the event time is `Today 23:00`, the deadline is
`Closes 18:25`. The deadline is stored as minutes-from-now (the live countdown on 05 and
`extendDeadline` both work in those terms) and rendered as a clock time here.

## Chevron
`chevron-row.svg` — 6.5 × 12.5, 1.5 stroke, `Ink/Primary` at **45%**, drawn at 5 × 11. It is *not*
`chevron-right` (16 × 16, 1.2 stroke) — the two were pulled from different screens and genuinely
differ, so both are kept.

## Flow
Step 1 of **both** routes into a poll. Continue → the existing places step (04), which is not
duplicated. Cancel, the scrim and dragging the sheet down all go back.

- **FAB → New poll** → opens empty (18) → fill it in → 04 → send.
- **Dinner slot → "Ask the group"** → opens already filled (13), carrying the slot's violet pill.

An earlier draft sent the slot route straight to 04, since the slot already knew the question and
the time. It saved a tap and cost consistency: the two ways of making a poll looked like two
different features. Now they are the same two steps, and the slot route simply arrives with its
answers in — all still editable.

**The slot pill** (`Accent/Violet Tint` + `Accent/Violet`, `clock-violet` 14, padding `6 12 6 10`)
sits **above** the heading, not beside it: "What are we deciding?" wraps to two lines if the pill
crowds it. The places step carries the same pill, so the two steps read as one poll being composed.

Same draft object, same `sendPoll` action; the routes differ only in what `startBlankPoll` /
`startPollForSlot` put in the draft first. A cold deep link to `?screen=poll-question` opens on the
dinner draft, which is why it renders as 13 rather than 18.
