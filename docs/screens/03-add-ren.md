# 03 · Add Ren

Figma node `163:2180`; the sheet itself is `163:2307`. Reference render:
`design/screens/03-add-ren.png`. Built in `src/screens/AddRen.tsx`. **Do not re-fetch this screen.**

Screen 02 unchanged, under a full-frame `Overlay/Scrim`, with the Buddies sheet over it.

## Sheet · Buddies — 0, 244 · 390 × 600
White, top corners 28, `drop-shadow(0 -8px 15px rgb(31 30 36 / .12))`, padding `10 / 20 / 34`,
**gap 16**. Grabber 40 × 5, radius 3, `Line/Default`.

| Section | Screen coords |
|---|---|
| Grabber | 175, 254 · 40 × 5 |
| Header | 20, 275 · 350 × 29 |
| On this trip | 20, 320 · 350 × 65 |
| Search | 20, 401 · 350 × 48 |
| Results | 20, 465 · 350 × 196 |
| Joins from tonight | 20, 677 · 350 × 63 |
| Actions | 20, 753 · 350 × 54 |

- **Header** — "Buddies" Heading 22 (tracking −0.2), "6 on this trip" Footnote/Regular.
- **On this trip** — six columns spread `justify-between`, each a 46 avatar over a Caption 2/Regular
  label in `Ink/Secondary`, gap 6. Ari's label is "You".
- **Search** — 48 tall, radius 16, `Surface/Ground`, padding-inline 14, gap 10: `search` 18, the
  query in Body/Regular, then a 1.5 × 18 `Accent/Violet` caret.
- **Results** — rows radius 18, padding `10 14 10 12`, gap 12. The selected row is `Accent/Lime`
  with a 24 ink circle and `check-white` 13; the others are `Surface/Ground` with an empty 24
  circle stroked `rgb(31 30 36 / .25)`. Initials avatars are 40 → **Avatar/12**.
- **Joins from tonight** — 36 `Accent/Sky` tile (radius 12) with `calendar-plus` 18, text, then
  `chevron-right` 16. Height pinned to 63.
- **Actions** — "Invite link" hugs at 144 × 54 with a 1.5 `Line/Default` stroke and `link` 18;
  "Add Ren" fills the rest, ink, `drop-shadow(0 10px 10px rgb(31 30 36 / .25))`.

## Gotchas
- A sheet's Figma y is **frame** coordinates. Screens render below the 50 status bar, so `Sheet`
  takes `frameTop` and subtracts it — passing the raw number puts the sheet 50 px low.
- Nothing in a sheet may flex-shrink. The frame heights are exact and the content fills the sheet
  almost exactly; default `flex-shrink: 1` silently collapsed the search field from 48 to 18.
