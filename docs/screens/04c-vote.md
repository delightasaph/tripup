# 04c · Vote (Nic's view)

Figma node `166:2631`. Built in `src/screens/Vote.tsx`. **Do not re-fetch.**

Not in the original wireflow. Nic's own vote screen, reached by tapping 04b's notification.
Standard chrome (unlike 04b) — normal status bar, `18:05`.

## Frame skeleton
Same content-column shell as 05 (`20, 64 · 350 wide`), but simpler: no leader/results styling on
the option cards (results are hidden until you vote), and the actions row is a single full-width
button instead of two.

## Nav
- `Close` — 40 white circle, `IconButton`, icon `close` (new: a plain × line icon, 20px, ink,
  1.5px stroke).
- "On Nic's phone" — lime `Pill`, height 27, Caption/Medium.
- `LivePill` on the right — same component as 05, unchanged.

## Question block
Identical structure to 05: asked-by row (Ari's avatar 22 + "Ari asked · for dinner at 20:30"),
Title 2 question, then the live ticker. The ticker here reads "**Bea** voted · 1 min ago" — no
option name, since Nic hasn't voted yet and results are hidden. `<Ticker person={people.bea}
event="voted" when="1 min ago" />` renders it correctly without changes to the component.

## Option rows — selectable, not `PollOptionCard`
This is a **different card** from the poll-results one on 05: no photo-tile-only top row, no bar,
no vote count — just the top row plus a trailing radio, because results stay hidden pre-vote.

- 350 wide, radius 24, padding `14 16 14 14`, white background always (no lime leader here).
- **Border** is the only selection signal: `2px solid transparent` unselected, `2px solid
  Ink/Primary` selected. (Figma uses a genuine 2px `border`, not an `outline` — unlike the 1px
  strokes elsewhere in the app, this one is allowed to shift the box by the border width since the
  card has no neighbouring edge to stay flush with.)
- Same 52-box photo tile + 22 icon badge as every other place card.
- Trailing control, 24 × 24: unselected is a `1.5px solid rgb(31 30 36 / .25)` ring; selected is a
  solid `Ink/Primary` circle with a 13px white check (`check-white` — confirmed byte-identical to
  the icon Figma exports for this state, so no new asset).
- Built as a real `<button>` per option (not a styled `<div>`), toggling local `useState` — the
  selection and the vote button's label both move together, per the spec's "label follows the
  selection." Default selection is Time Out Market, matching Nic's actual vote in the spec's vote
  table.

## Note + action
- "5 of 7 have voted · results show once you vote" — Footnote/Regular, `Ink/Secondary`, centred.
- Vote button: full width (not split like 05's two actions), 54 tall, ink, `Body/Medium` white,
  "Vote for {selected option's name}".

## Icons on this screen
New: `close` (20, ink, 1.5px stroke — the only new export this screen needed). Reused: `bowl`,
`fork-knife`, `fish` (place badges), `check-white` (selected radio).

## Gotchas found while building
- `get_design_context` names option badge icons and the selected-radio check with adjacent
  `imgIconN` variables in emission order, not by role — easy to grab the wrong one. Downloaded and
  diffed the actual SVG path before registering it: the "selected" icon turned out to be the exact
  same checkmark path as the existing `check-white.svg`, so nothing new was added for it.
- The photo/name/line block sits inside a `<button>`, so the text needed explicit `whitespace-nowrap`
  the same way `NewPoll`'s option rows do — Tailwind's default button text can wrap where a `<p>` in
  a `div`-based row wouldn't.
