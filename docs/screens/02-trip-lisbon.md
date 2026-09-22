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
Five cells, 63.6 wide, 58 tall, gap 8, radius 18, padding-block 10, gap 2, contents centred.
Unselected white; "Today" is `Ink/Primary` and sets white on the cell so both lines inherit it.
- Label — **Caption/Regular 12 at 70% opacity**, `Ink/Secondary` when unselected. The 70% applies
  in both states; it is the only thing separating label from number.
- Number — **Subheading/SemiBold 20**, `Ink/Primary`. (`DESIGN_SYSTEM.md` lists Subheading as
  Medium *or* SemiBold; day numbers are SemiBold.)

## Timeline
Columns: time 49 · node 21 · card 280 (card starts at x 70 within the column, i.e. screen x 90).

Rail: x 73 (2 wide), inset 14 from the timeline top and 18 from its bottom, radius 1. The gradient
is not a simple fade — it holds ink, spikes violet at the open slot, then fades out:
`linear-gradient(180deg, rgb(31 30 36 / .1) 0%, rgb(31 30 36 / .12) 45%, rgb(91 79 232 / .5) 50%, rgb(91 79 232 / 0) 100%)`.

Rows, by offset from the timeline top (390):

| Row | Top | Card h | Time offset | Node offset | Node |
|---|---|---|---|---|---|
| 10:00 Pastéis de Belém | 0 | 46 | 15 | 18 | done |
| 15:00 Tram 28 to Graça | 54 | 46 | 15 | 18 | done |
| 18:30 Sunset at Miradouro | 108 | 95 | 16 | 18 | next |
| 20:30 Dinner (open slot) | 211 | 116 (card starts 4 down) | 20 | 23 | open |

Nodes are 10 × 10 (from the frame's own SVGs): done = r5 `Line/Default`; next = r5 `Ink/Primary`
with an r7.5 stroke at **12%**; open = r4 `Surface/Ground` with a 2 px `Accent/Violet` stroke.
Kept as CSS rather than the exported SVGs so the open node can fill violet when the poll closes.

Cards:
- **Done** — `Surface/White 70%`, radius 16, padding-inline 14, contents vertically centred.
  Title Body 15 **Medium** and line Caption 12 Regular at 80% opacity, both `Ink/Secondary`. The
  time label is `Ink/Secondary` at **60%**. **No shadow** on any itinerary card.
- **Next (sunset)** — radius **20**, padding `14 14 12 16`, gap 10. Gradient is
  `linear-gradient(155.66deg, rgb(247 221 211) 7.14%, rgb(245 231 196) 78.57%)`. Title Headline 17
  SemiBold ink, line Caption 12 `Ink/Secondary`. Chip "12 min walk" 106 × 24, `Surface/White 70%`,
  radius **12 — not a pill**, icon `walk` 14 at inset 10/5, label Caption 12.
  The "Next" pill is **hidden** in this frame — do not add it.
- **Open slot** — `Accent/Violet Tint`, radius **20**, border `1.5px dashed rgb(91 79 232 / .55)`,
  padding `14 16 16`, gap 12. Title Headline 17 SemiBold, line Caption 12 `Ink/Secondary`. Button
  151 × 38, `Accent/Violet`, radius 19, white Body/Medium, icon `list` 16, and its own
  `drop-shadow(0 6px 7px rgb(91 79 232 / .35))`.

## Bottom bar
Tab bar 264 × 60, white, radius 30, `drop-shadow(0 10px 12px rgb(31 30 36 / .1))`, 6 padding. Active tab is an ink pill 48 tall with
white icon + Body/Medium label; inactive is `Ink/Secondary` on transparent. Icons 18
(`calendar`, `wallet`). FAB 60 × 60 at x 310, `Ink/Primary`,
`drop-shadow(0 10px 10px rgb(31 30 36 / .25))`, `plus` at 20 (already white). Behind it, a 150 tall `--gradient-bottom-fade`.

## Icons on this screen
All exported into `public/assets/icons/`: `arrow-left`, `plus-small`, `walk` (14), `list` (16,
baked white), `calendar` (18, baked white), `wallet` (18, baked `Ink/Secondary`), `plus` (20, baked
white). Tint via `Icon`'s `color` prop where a surface needs a different one — the tab-bar pair is
drawn in both ink-on-white and white-on-ink.

## Gotchas found while building
- The status bar is **not** symmetrically padded: the clock's glyphs start at x 49 and the battery
  tip lands at x 352, glyph baseline y 32. Same on every screen.
- Figma reports a stamp's width as the paper's **visual** extent (scalloped edge included), not the
  inner rectangle. Reading it as the inner rect put this ticket's stamp 8 px out.
- Done-row titles are Body 15, but the live rows use Headline 17. The sizes really do differ.
- Several cards are radius **20**, not the 18 the design-system doc implies, and the "12 min walk"
  chip is radius 12 rather than a pill. Measure, don't assume the scale.
- Done rows are stepped back with **opacity**, not different colours: time at 60%, sub-line at 80%.
- "TODAY'S PLAN" is Footnote/Medium with **tracking 0**. Added letter-spacing ran it 5 px long.
- The open slot's dashed stroke must be an **`outline` with a negative offset**, never a `border`:
  a border eats 1.5 px out of the padding box and shifts every child inside the card.
