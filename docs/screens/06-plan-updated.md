# 06 · Plan updated

Figma node `4064:18080`; the changed row is `167:2997`, the toast `167:3250`. Reference render:
`design/screens/06-plan-updated.png`. Built as `TripLisbon dinner="decided"` plus a toast in
`src/screens/PlanUpdated.tsx`.

Screen 02 at **18:25** with the dinner slot resolved. No scrim — the toast sits over the live
screen and covers the nav row entirely, which is what the frame does.

## Layout
Identical to 02 — same flow column, same gaps, same scroll model, chrome docked to the viewport.
The old −4 nudge is gone: this frame's Content matches 02's exactly. Times land at 404 / 488 /
543 / 639, the same as 02.

**The buddy stack reads "+4" here, not "+3"** — Ren is on the trip by now. `TripLisbon` takes a
`crew` prop for this.

## Dinner · Taberna — 280 × 142, Figma `4064:18230`
`Accent/Lime`, radius 20, a 1.5 `Ink/Primary` stroke, padding 14, gap 12, and its own
`drop-shadow(0 12px 12px rgb(115 140 26 / .25))` — a green-cast shadow, not the usual ink one.
It **hugs its content**; the title wraps to two lines at 280, which is what makes it 142.

- Place row, gap 12, `items-start`: a **48 photo tile** at radius 12 — the *same tile as the poll
  option card on 05*, which is what makes the shared-element transition from the poll into the slot
  possible — then a text column at gap 5.
- Title Headline 17, wrapping. Below it a meta row at gap 4: "Dinner ·" Caption/Regular
  `Ink/Secondary`, then `walk-sm` 14 and "6 min walk" at gap 2.
- Actions gap 8: **"Log expense"** is a fixed **201 × 40** ink pill with `receipt` 16 and
  Footnote/Medium; **"Map"** is a **43 × 40 icon-only** button with `direction-right` 24 and **no
  background**.

**What the rework removed:** the "Won 4 · 2 · 1" ink pill is gone, and Map is no longer a labelled
white pill. Don't reintroduce either from the old record.

The timeline node is **filled violet**.

## Gotcha
This card hugs its content, and here a real `border` gives the right height (142 = 139 content
plus the 3 of stroke). Fixed-height stroked boxes still need an `outline` with a negative offset —
Figma's stroke alignment varies per node, so check the resulting height rather than assuming.
