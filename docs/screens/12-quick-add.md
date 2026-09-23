# 12 · Quick add (FAB sheet)

Figma node `4093:2356`; the sheet is `4093:2534`, the scrim `4093:2533`. Built in
`src/components/QuickAddSheet.tsx`, opened from the FAB in `BottomBar`. **Do not re-fetch.**

Screen 02 (Itinerary, dinner still open, buddy stack "+3") under a scrim, with the quick-add sheet
on top. Everything behind the scrim is the ordinary `TripLisbon` — the frame composes the same
rows, same ticket, same day strip, same bottom bar, so nothing there needed rebuilding.

## Two tiles, not three
An earlier draft of the spec had a third "Smart add" tile on `Surface/Ground` at 88 high. It was
cut so that every tile in the menu is a real action; the frame — and now `PRODUCT_SPEC.md` §12 and
`DESIGN_SYSTEM.md` §5 — carry two tiles on `Accent/Violet Tint` at 66 high, and five quick-add
icons rather than six. There is no sparkle glyph.

## Sheet · Quick add — bottom-anchored, hugs its content
Full width, top corners 28, `drop-shadow(0 -8px 15px rgb(31 30 36 / .12))`, padding
`10 20 34`, gap **16** — the standard `Sheet` shell, with the 40 × 5 `Line/Default` grabber.
Scrim is `Overlay/Scrim` at inset 0 over the whole frame, status bar included.

Measured top edge ≈ y 500 with this content; the sheet is not height-set in the frame, so the
build lets it hug (no `frameTop`).

### Primary row — 350 wide, gap 10
Two equal tiles, `flex: 1 0 0`, **66 high**, radius **16**, `Accent/Violet Tint` (#F4F1FF),
centred column.

| Tile | Icon | Icon → label gap | Label |
|---|---|---|---|
| New poll | `quick-add-poll` 24 box | 8 | "New poll" |
| Log expense | `quick-add-expense` 24 | 4 | "Log expense" |

Labels are Caption/Medium (12/500) in `Ink/Primary`. Note the two gaps genuinely differ in the
frame (8 and 4) — the poll glyph is shorter than its 24 box.

### Categories — 350 wide, gap 2
Rows are `4 11` padding, gap 14, no background, no chevron.

| Row | Tile fill | Icon | Title / sub |
|---|---|---|---|
| Transport | `Accent/Blush` #F7DDD3 | `quick-add-transport` 22 | Transport / Flight, train, bus… |
| Stay | `Accent/Lilac` #EBD7FA | `quick-add-stay` 22 | Stay / Hotel, hostel, Airbnb… |
| Spot or event | `Accent/Sky` #DCE6FF | `quick-add-spot` 22 | Spot or event / Restaurant, museum, beach… |

Icon tile is 40 × 40, radius 12. Title Body/SemiBold (15/600) `Ink/Primary`, sub Caption/Regular
(12/400) `Ink/Secondary`, gap 1.

## Icons pulled with this screen
`quick-add-poll.svg` (bars — natural box 17.19 × 14.84, centre it inside a 24 container rather
than stretching it), `quick-add-expense.svg` (24), `quick-add-transport.svg`,
`quick-add-stay.svg`, `quick-add-spot.svg` (22 each).

## Behaviour
New poll → 18. Log expense → 16. The three category rows close the sheet and toast
("Adding transport isn't in this prototype yet", and so on) — an honest dead end beats a dead tap.
