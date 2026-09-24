# 16 · Log expense (from quick add)

Figma node `4097:2350`; the sheet is `4097:2538`, the new field `4098:6343`. **Not a new screen** —
it is `src/screens/LogExpense.tsx` with `linked={false}`.

## The one difference
Screen 07's lime **linked-plan chip** is replaced by a "what for" field, because a quick-add
expense has no plan item to attach to:

- `Surface/Ground`, radius **16**, padding `14 16`, full width.
- Body/SemiBold `Ink/Primary`. The frame's content is "Taxi back to the flat"; in the build it is a
  real input, so a PM can type their own.

Everything else is 07 to the pixel: the header with the lilac "Scan receipt" pill, the 48/600
amount with its `Data/Bar Muted` cents and violet caret, the Ground `Paid by` / `Split` card
(radius 18, 1 px divider), the 3 × 4 keypad (48 high, radius 14, gap 8), and the 54 ink button.

## Two honest departures from the frame

**The split defaults to Equally, not By item.** The frame shows "By item" selected, but the by-item
step (08) itemises *the dinner bill* — there are no items for a taxi to divide. So a quick-add
expense opens on Equally (the button then reads "Log expense", which 07 already does), and
choosing By item and tapping Next says so in a toast rather than opening someone else's bill.

**The backdrop is live, not copied.** This frame's trip screen behind the scrim still shows the
*old* decided-dinner card — the "Won 4 · 2 · 1" pill and a labelled Map button, both removed in the
02/06 rework (see `06-plan-updated.md`). It is a stale backdrop, not a spec for one. The build
composes the current `TripLisbon` at whatever state the trip is actually in, which from the quick
add may still be an open dinner slot.

## Flow
12 → 16. Log expense → the expense is logged and the Expenses tab (09) opens, the same ending 07
has when it splits equally.
