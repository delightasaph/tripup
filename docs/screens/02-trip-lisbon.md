# 02 · Trip · Lisbon (Itinerary)

Figma node **`4064:17467`**. Built in `src/screens/TripLisbon.tsx`.

Reference render: `design/screens/02-trip-lisbon.png` is the **old** frame and is stale. The build
follows the current frame; `/compare` flags this.

This is one of the two reference screens. Everything else inherits its spacing, type, colour and
component behaviour from here and from 05.

## The frame scrolls
The frame is **922 tall with a fold marked at 844**, so this screen scrolls. Layout is flow, not
absolute: root `padding-top 64, padding-inline 20`, Content a column at **gap 16**.

Chrome is docked to the **viewport**, never to the end of the content: bottom fade 150 tall ending
at 844, tab bar at 756, FAB at 756. In Figma these are expressed as offsets from the 922 frame
bottom (fade `bottom 78`, bar `bottom 106`, and the home indicator `bottom 87`), which lands them
exactly where they sat when the frame was 844. Don't copy those offsets — dock to the viewport.

The scrolling column gets **110 pt** of ground below its last item, per `PRODUCT_SPEC.md`. Content
ends at frame y 739, so the column runs to 849 and the screen scrolls by ~5 pt. Note the Figma
frame itself leaves 183 below the last item, not 110; the spec's number wins.

## Positions (screen coords, verified)
| Part | y |
|---|---|
| Nav | 64 |
| Ticket | 114 |
| Day strip | 280 |
| Section header | 362 |
| Timeline row 10:00 · time | 404 |
| row 15:00 · time | 488 |
| row 18:30 · time | 543 |
| row 20:30 · time | 639 |
| Tab bar / FAB | 756 |

## Ticket — one component, used on 01, 02, 03a, 03b, 04, 06, 07, 08
350 × 150, radius 24, `overflow: hidden`. `assets/ticket.svg` carries the shape, its two notches and
the sky gradient (only the gradient's internal id changed in the rework; the path is untouched).

**The art is no longer a single stamp PNG.** It is four layers over the shape, each with its own
rotation, all clipped by the ticket edge:

| Layer | Placement |
|---|---|
| Belém painting | 181, −21.04 · 169 × 227.856, behind `ticket/belem-mask.svg` — an alpha gradient that fades the art in from the left (0 at x 0, opaque from 45%). Inner image `left -17.8%`, `width 135.59%`. |
| Round postmark | 239.95, 1.95 · 107.622 box, rotated **−16.74°**; an 86.402 circle, 2.348 stroke `rgb(31 30 36 / .82)`, radius 43.201. Inside: the ring at 2.75/2.49, rotated 0.59°, plus the plane built from **ten** separate vectors at fixed insets (`ticket/plane-0…9.svg`). |
| Cancel waves | 208, 19 · 61.88 × 38.143 box, rotated **−12.42°**, art 57.552 × 26.378 |
| VISITED cancel | 209, 55 · 51.48 × 31.18 box, rotated **−20.42°**; 1.174 stroke, radius 1.409, padding 0.939/4.697, Rubik SemiBold 10.332/1.3, tracking −0.0939 |

Title at 16, 40: Anton 56/58, tracking 0.56 — **`Ink/Primary`, not Stamp/Title Navy**. The navy
title was the old treatment. Dates below in Footnote/Medium, same colour.

## Day strip
Unchanged: five 63.6 × 58 cells, gap 8, radius 18, padding-block 10, gap 2. Label Caption/Regular
at **70% opacity**, number Subheading/SemiBold. "Today" is `Ink/Primary` with white inherited by
both lines.

## Timeline
Rows stack in flow at **gap 8**. Columns: time 49 · node 21 · card 280. Rail at left 53, `top 14`
to `bottom 32`, 2 wide — ink to 45%, spiking to `rgb(91 79 232 / .5)` at 50%, fading to nothing.

Nodes are 10 × 10 from the frame's own graphics: done 28-tall column with the dot at 18; next
34-tall, dot at 19, ring `0 0 0 5px rgb(31 30 36 / .12)`; open and filled 29-tall, dot at 19.

| Row | Time | Node | Card |
|---|---|---|---|
| 10:00 | pt 15, `Ink/Secondary` at **60%** | done | 280 wide, padding `10 16 10 10`, gap 12, radius 16, `Surface/White 70%` — **with a 56 photo** at radius 12 and **65% opacity**, text gap 3, no opacity on the sub-line |
| 15:00 | pt 15, 60% | done | 280 × 46, padding `10 14`, radius 16, no photo, text gap **1**, sub-line at **80%** |
| 18:30 | pt 16, `Ink/Primary` | next | 280 × **84**, `justify-center`, gap 10, padding `14 14 12 16`, radius 20, gradient **158.199°** `rgb(247 221 211) 7.14% → rgb(245 231 196) 78.57%` |
| 20:30 | pt 16, `Accent/Violet`; row itself `padding-top 4` | open | 280, padding `14 16 16`, gap 12, radius 20, `Accent/Violet Tint`, 1.5 dashed `rgb(91 79 232 / .55)` |

The two done cards are **not** the same card: only 10:00 carries a photo, and their text gaps and
sub-line opacities differ. Don't collapse them into one variant.

### The Sunset card's directions button
New in this rework, and **only on the next item — done items never carry one**. Absolute at
`bottom 12, right 12`, 36 × 36, `border-radius: 999`, `drop-shadow(0 4px 5px rgb(31 30 36 / .1))`,
holding `direction-right` at 24. The button has **no background** — the glyph is a filled dark
arrow and the shadow sits under it.

Inside the card the text block is one column at gap 4: title, sub-line, then the "12 min walk"
chip (106 × 24, radius **12**, `Surface/White 70%`, `walk` 14 at inset 10/5).

## Status bar
Rebuilt from the frame: 50 tall, padding `21 24 19`, two equal flex columns **154 apart**, each
centring its contents. That puts the clock's glyphs at x 49 and the battery tip near 353 — the
numbers measured off the old render, now arrived at structurally.

The clock is **SF Pro 16 / weight 590**, not Rubik — it is system chrome. The three glyphs are the
exported system vectors in `assets/statusbar/`; they were hand-drawn before, which was wrong.

## Icons
`arrow-left` 20 · `plus-small` 16 · `walk` 14 · `direction-right` 24 · `list` 16 · `calendar` 18 ·
`wallet` 18 · `plus-white` 20.

## Gotchas
- Moving to a flow layout collapsed the day strip and the section header to hug width — both need
  `w-full`, because the column is `items-start`.
- No home indicator; the frame draws one, the build leaves it out.
