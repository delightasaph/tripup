# 03b · Add a buddy

Figma node `4058:3935`; the sheet is `4058:4109`. Built in `src/screens/AddABuddy.tsx`.
**Do not re-fetch** unless a STALE banner says otherwise.

Search, reached from 03a. **No back arrow** — Cancel is the way back, and so is dragging the sheet
down. The frame confirms it: the actions are **Cancel / Add Ren**, and there is no invite-link
affordance (assumption A6).

## Sheet · Add a buddy — 0, 325 · 390 × 519
**Hug height, bottom-anchored** — the frame sets no height, so the sheet sizes to its content and
lands at frame y 325. Don't pin it; `Sheet` takes no `frameTop` here.

White, top corners 28, `drop-shadow(0 -8px 15px rgb(31 30 36 / .12))`, padding `10 / 20 / 34`,
gap 16.

| Part | Screen coords |
|---|---|
| Header | 20, 356 · 350 × 29 |
| Search | 20, 401 · 350 × 48 |
| Results | 20, 465 · 350 × 196 |
| Joins from tonight | 20, 677 · 350 × 63 |
| Actions | 20, 756 · 350 × 54 |

- **Header** — "Add a buddy" Heading 22 (tracking −0.2), "6 on this trip" Footnote/Regular.
- **Search** — 48 tall, radius 16, `Surface/Ground`, padding-inline 14, gap 10: `search` 18, the
  query in Body/**Regular**, then a 1.5 × 18 `Accent/Violet` caret.
- **Results** — rows 60 tall, gap 8, radius 18, padding `10 14 10 12`, gap 12. Ren's row is
  `Accent/Lime` with a 24 ink circle and `check-white` 13; Marta and Hugo are `Surface/Ground`
  with an empty 24 circle stroked `rgb(31 30 36 / .25)`. Initials avatars are 40 → **Avatar/12**.
- **Joins from tonight** — height pinned to 63 (stroke counted), a 36 `Accent/Sky` tile (radius 12)
  with `calendar-plus` 18, then the text and `chevron-right` 16. Copy reads "Earlier expenses stay
  out of **their** share".
- **Actions** — "Cancel" hugs (white, 1.5 `Line/Default` stroke, ~96 wide); "Add Ren" fills the
  rest, ink, `drop-shadow(0 10px 10px rgb(31 30 36 / .25))`.

## Background
Composed over the **current** `TripLisbon`, not this frame's embedded copy — see the note in
`03a-buddies.md`. 02 is the reference screen.

## Icons
`search` 18 · `check-white` 13 · `calendar-plus` 18 · `chevron-right` 16.
