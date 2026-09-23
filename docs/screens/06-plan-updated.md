# 06 · Plan updated

> ## ⚠️ STALE — re-fetch this screen
> The Figma frame changed on 23 Sep after this record was written. **This record's
> "do not re-fetch" instruction does not apply any more.** Re-pull the frame with one
> `get_design_context` call, rewrite this record from what comes back, then rebuild the screen.
>
> **The node id also changed** — it is now `4064:18080`.
>
> What changed: the trip **ticket card** was reworked, and the winning dinner card now carries the restaurant photo as a 48 pt tile (the same tile as the poll option card on 05 — wire it as a shared element).

Figma node `4064:18080`; the changed row is `167:2997`, the toast `167:3250`. Reference render:
`design/screens/06-plan-updated.png`. Built as `TripLisbon dinner="decided"` plus a toast in
`src/screens/PlanUpdated.tsx`. **Do not re-fetch.**

Screen 02 at **18:25** with the dinner slot resolved. No scrim — the toast sits over the live
screen and covers the nav row entirely, which is what the frame does.

## The offset that matters
06's whole content column sits **4 px higher** than 02's: its `Top` is at y **−3**, not +1, and the
day strip at 213 rather than 217. The resolved card is 8 taller than the open slot (128 vs 120
row height), and the column was nudged up to absorb half of it. The timeline is **339** tall, not
331. `TripLisbon` takes `dinner` and shifts the column and the rail accordingly.

Resulting positions: section label 20, 359 · times 401 / 455 / 510 / 617 · card 90, 601.

## Dinner · Taberna — 280 × 124
`Accent/Lime`, radius 20, a 1.5 `Ink/Primary` stroke, padding 14, gap 12, and its own
`drop-shadow(0 12px 12px rgb(115 140 26 / .25))` — a green-cast shadow, not the usual ink one.
The timeline node is **filled violet**.

- Title Headline 17, then a meta row at gap 5: the "Won 4 · 2 · 1" pill is ink with
  `Accent/Lime` Caption 2/Medium, padding `3 8`, gap 4, `won` 11; then "6 min walk"
  Caption/Regular `Ink/Secondary` at gap 6.
- Actions gap 8, both 40 tall, radius pill, Footnote/Medium: "Map" hugs, white, `map` 16;
  "Log expense" fills, ink, `receipt` 16 (already white).

## Gotcha
Figma's stroke alignment varies per node, so a CSS `border` changes layout unpredictably — 03 and
04's stroked rows came out 3 px short with an outline and correct with a border, while this card
was the reverse. Pin the height from the frame and draw the stroke as an `outline` with a negative
offset, which never affects layout.
