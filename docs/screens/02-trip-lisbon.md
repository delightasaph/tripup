# 02 · Trip · Lisbon (Itinerary)

Figma node `122:7866`. Reference render: `design/screens/02-trip-lisbon.png` (native 390 × 844).
Built in `src/screens/TripLisbon.tsx`. **Do not re-fetch this screen.**

## Frame skeleton
| Part | Screen coords |
|---|---|
| Status bar | 0, 0 · 390 × 50 |
| Content column | 20, 64 · 350 × 658 |
| Nav | 20, 65 · 350 × 40 |
| Ticket | 20, 115 · 350 × 150 |
| Day strip | 20, 281 · 350 × 58 |
| Today's plan | 20, 355 · 350 × 366 |
| — section header | 20, 363 · 350 × 15 |
| — timeline | 20, 390 · 350 × 331 |
| Bottom fade | 0, 694 · 390 × 150 |
| Bottom bar | 20, 756 · 350 × 60 |
| Home indicator | 128, 830 · 134 × 5 |

Vertical rhythm: nav → 10 → ticket → 16 → day strip → 16 → Today's plan (header 8 in, timeline
35 in).

## Nav
- Back button 40 × 40, white, full pill radius, `drop-shadow(0 6px 9px rgb(31 30 36 / .08))`.
  Icon `arrow-left` at 20, inset 10.
- Buddy stack, right-aligned, gap 8 to the add button. Avatars 30 × 30, overlap −6, 2 px ring in
  `Surface/Ground`. Three faces (Ari, Nick, Rebecca) then a white "+3" chip, Rubik SemiBold 11,
  letter-spacing 0.2.
- Add-a-buddy button 30 × 30, `Accent/Lime`, 2 px `Surface/Ground` ring, **no shadow**. Icon
  `plus-small` at 16.

## Ticket
- `assets/ticket.svg` (Figma `141:12831`), 350 × 150, sky gradient baked in, notches centred at
  x ≈ 175 top and bottom, corner radius 16.
- Title block at 16, 40 inside the ticket: Anton 56/58, letter-spacing 0.56, `Stamp/Title Navy`;
  under it "12 – 16 Sep" in Footnote/Medium, same colour.
- Stamp: container at 194, 11 · 183.83 × 188.25 inside the ticket, stamp centred in it, paper
  width **140.897**, rotated **−20.42°**, clipped by the ticket's overflow.

## Day strip
Five cells, 63.6 wide, 58 tall, gap 8, radius 18. Unselected white; "Today" is `Ink/Primary` with
white text. Label Caption 12 in `Ink/Secondary` (white when selected), number Subheading 20
SemiBold.

## Timeline
Columns: time 49 · node 21 · card 280 (card starts at x 70 within the column, i.e. screen x 90).

Rail: x 73 (2 wide), y 404 → 703, radius pill. `rgb(31 30 36 / .10)` fading to
`rgb(91 79 232 / .22)` at the bottom, so the eye is carried to the open slot.

Rows, by offset from the timeline top (390):

| Row | Top | Card h | Time offset | Node offset | Node |
|---|---|---|---|---|---|
| 10:00 Pastéis de Belém | 0 | 46 | 15 | 18 | done |
| 15:00 Tram 28 to Graça | 54 | 46 | 15 | 18 | done |
| 18:30 Sunset at Miradouro | 108 | 95 | 16 | 18 | next |
| 20:30 Dinner (open slot) | 211 | 116 (card starts 4 down) | 20 | 23 | open |

Nodes are 10 × 10: done = `Line/Default`; next = `Ink/Primary` with `0 0 0 5px rgb(31 30 36 / .10)`;
open = `Surface/Ground` with a 2 px `Accent/Violet` inset ring.

Cards:
- **Done** — `Surface/White 70%`, radius 16, padding 14 / 6.5. Title Body 15 SemiBold in
  `Ink/Secondary`; line Caption 12 at `rgb(94 91 102 / .75)`. **No shadow** on any itinerary card.
- **Next (sunset)** — `--gradient-sunset-card`, radius 18. Title Headline 17 SemiBold ink, line
  Caption 12 `Ink/Secondary`. Chip "12 min walk" at 16, 59 · 106 × 24, `Surface/White 70%`, pill,
  icon `walk` 14 at inset 10/5, label Caption 12.
  The "Next" pill is **hidden** in this frame — do not add it.
- **Open slot** — `Accent/Violet Tint`, radius 18, border `1.5px dashed rgb(91 79 232 / .55)`.
  Title Headline 17 SemiBold, line Caption 12 `Ink/Secondary`. Button at 16, 62 · 151 × 38,
  `Accent/Violet`, pill, white Body/Medium, icon `list` 16.

## Bottom bar
Tab bar 264 × 60, white, pill, `--shadow-card`, 6 padding. Active tab is an ink pill 48 tall with
white icon + Body/Medium label; inactive is `Ink/Secondary` on transparent. Icons 18
(`calendar`, `wallet`). FAB 60 × 60 at x 310, `Ink/Primary`, `--shadow-dark-button`, `plus-small`
at 20 in white. Behind it, a 150 tall `--gradient-bottom-fade`.

## Icons on this screen
`arrow-left` ✅ · `plus-small` ✅ · `walk` ❌ · `list` ❌ · `calendar` ❌ · `wallet` ❌
(❌ = not yet exported; rendered as a dashed placeholder by `Icon`.)

## Gotchas found while building
- The status bar is **not** symmetrically padded: the clock's glyphs start at x 49 and the battery
  tip lands at x 352, glyph baseline y 32. Same on every screen.
- Figma reports a stamp's width as the paper's **visual** extent (scalloped edge included), not the
  inner rectangle. Reading it as the inner rect put this ticket's stamp 8 px out.
- Done-row titles are Body 15, but the live rows use Headline 17. The sizes really do differ.
- Browser text renders about 3% wider than the Figma raster at the same size and weight. Not a
  font-loading bug — Rubik 400/500/600 all load.
