# 14 · Trip · an extra poll on the plan

Figma node `4101:2206`; the new row is `4101:2394`, its card `4101:2399`. This is a **state of
screen 02**, not a screen of its own — it is what `src/screens/TripLisbon.tsx` renders once a poll
exists that didn't come from a slot. **Do not re-fetch.**

## What the frame actually shows
- Section header reads **"2 of 5 done"** — the count includes the new poll. It follows the rows.
- The dinner slot at 20:30 is **untouched**. The new poll is a row of its own at **23:00**, after it.
- The frame is taller than 844 (it marks the fold at 844) — the day scrolls, and the floating bar
  and FAB stay docked. That was already true of 02.
- The rail's `bottom` moves from 18 to 32 with the extra row. The build's rail uses `bottom: 32`
  throughout, which is what 02 already had.

## The new row — identical to the open slot
Same card as the dinner slot, to the pixel: `Accent/Violet Tint`, 1.5 dashed
`rgb(91 79 232 / .55)`, radius 20, padding `14 16 16`, gap 12, width 280; violet time column, open
node. Only the words change.

| | Dinner slot | Poll row |
|---|---|---|
| Title (Headline) | "Dinner" | the poll's question |
| Line (Caption, `Ink/Secondary`) | "Nothing booked yet · all 6 of you are free" | "Live · closes in 18:24 · 2 of 7 voted" |
| Button (violet, 38, `list` 16) | "Ask the group" → 04 | "See the poll" → 05 |

So the build has **one** `OpenSlotCard` with `title` / `line` / `action` props rather than two cards
that would drift. The button's width is `min-width: 151` rather than a fixed 151 — "See the poll"
is shorter than "Ask the group", and the frame's 151 is the wider label's width.

"closes in 18:24" is mm:ss remaining, the same `formatCountdown` as the Live pill on 05 — not a
clock time.

## Why the timeline had to become data
02 used to write its four rows as JSX with a literal "2 of 4 done". A poll can be created for any
time, and **rows are ordered by time, always**, so the day is now `todaysPlan`
(`src/data/itinerary.ts`) merged with the polls that own a row, sorted by `minutes` —
`selectPlanRows` in the store. Create five more polls and five more rows appear, in time order,
and the count follows. Times are minutes since midnight so the sort is numeric; "9:00" would sort
after "20:30" as text.

A poll started **from a slot** carries that slot's id and resolves it in place. A poll started from
the **quick add** has `slotId: null` and becomes its own row. That is the whole of the rule "a new
poll never replaces an existing itinerary item", and it lives in one field.

## A bug this screen surfaced
Building it showed the vote simulation casting a vote for **Ren before he has joined the trip** —
the row then read "6 of 6 voted" with seven votes behind it. The roster is now derived
(`rosterOf`): Ren votes only once he is on the trip, and `castVote` ignores anyone who isn't.
The hard-coded "of 7" on 05 and 04c became `selectTotalVoters` at the same time, since the buddy
stack and the vote count have to agree.
