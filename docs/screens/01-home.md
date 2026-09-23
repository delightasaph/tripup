# 01 · Home

> ## ⚠️ STALE — re-fetch this screen
> The Figma frame changed on 23 Sep after this record was written. **This record's
> "do not re-fetch" instruction does not apply any more.** Re-pull the frame with one
> `get_design_context` call, rewrite this record from what comes back, then rebuild the screen.
>
> What changed: the buddy stack now reads **+3**, not +4 — the trip has six people until Ren joins.

Figma node `162:429`. Reference render: `design/screens/01-home.png` (native 390 × 844).
Built in `src/screens/Home.tsx`. **Do not re-fetch this screen.**

The content column is **838 tall inside an 844 frame**, so Home scrolls — the stamps row sits below
the fold by design.

## Frame skeleton
| Part | Screen coords |
|---|---|
| Content column | 20, 64 · 350 × 838 |
| Header | 20, 64 · 350 × 44 |
| "Your trips" | 20, 128 · 156 × 36 |
| Happening now | 20, 184 · 350 × 297 |
| — label | 20, 184 · 121 × 15 |
| — ticket | 20, 209 · 350 × 150 |
| — stub | 20, 365 · 350 × 116 |
| Coming up | 20, 501 · 350 × 168 |
| — cards | 20, 531 · 350 × 138 |
| Stamps collected | 20, 689 · 350 × 213 |
| — row | 20, 719 · 350 × 183 |

## Header
- Greeting: Ari avatar 40, gap 10, then "Hi Ari" Footnote/Regular `Ink/Secondary` over
  "3 trips with your crew" Headline 17 SemiBold, gap 1.
- Actions right, gap 10, both 44:
  - **Notifications** is a single exported asset — `icons/notifications.svg` contains the white
    circle, its shadow *and* the red unread dot, drawn on an 80 canvas with the button at 18, 12.
    Place it in a 44 box at `left: -18, top: -12`; do not rebuild it out of parts.
  - **New trip**: white circle, `drop-shadow(0 6px 9px rgb(31 30 36 / .08))`, `plus-ink` at 20.

## Happening now
- Label: 8 green dot (`Status/Positive`) then "HAPPENING NOW" Footnote/Medium uppercase
  `Ink/Secondary` at x 14.
- Ticket: the same component as screen 02.
- **Stub** — white, radius 24, padding 16, gap 14,
  `drop-shadow(0 6px 9px rgb(31 30 36 / .06))`, sitting 6 below the ticket.
  - Tonight row, gap 12: a 40 `Accent/Violet Tint` tile (radius 12) holding `fork-knife-lg` at 18
    (the glyph carries `Accent/Violet`); then "Tonight · 20:30" Caption/Regular `Ink/Secondary`
    over "Dinner · not decided yet" Body/SemiBold; then a 44 `Ink/Primary` circle with
    `arrow-right` at 20 (already white).
  - Buddies row, gap 8: six 26 avatars, overlap −6, **2 px white ring** (not Surface/Ground — the
    stub is white), then "You + 5 buddies" Caption/Regular `Ink/Secondary`.

## Coming up
Header: "Coming up" Headline 17 SemiBold, "See all" Footnote/Regular `Ink/Secondary`.
Cards 170 × 138, gap 10, radius 24, padding `14 14 16 16`, name pinned to the bottom by a spacer.
- **Porto is `Accent/Lime`** — `PRODUCT_SPEC.md` §4 says Sky, and it is wrong. Berlin is
  `Accent/Blush`.
- "When" pill: `Surface/White 70%`, padding `4 9`, Caption 2/Medium 11.
- Name Subheading/SemiBold 20, dates Caption/Regular `Ink/Secondary`.
- Only **Berlin** shows a stamp slot; Porto's is hidden in the frame. Slot: 34 × 36, radius 4,
  `rgb(255 255 255 / .35)` on a `1.2px dashed rgb(31 30 36 / .28)` border, rotated −6°.

## Stamps row
England, Spain, Italy, France at scale 0.4275 of the 300 × 316 component (paper width 128.25),
rotated −11.6 / −5.1 / −28.5 / −33.6. The row starts 26 left of the content column and runs past
the right edge — **France is clipped by the phone frame, not by a container**, so do not clip the
row at 350.

Positions are stored as **centres** (`homeStamps` in `src/data/assets.ts`), not corners: Figma
reports a rotated node's x/y as its *bounding box* top-left, which shifts with the angle. Placing
an unrotated box at those coordinates puts every stamp about 12 px out. A centre is
rotation-invariant.

## Icons on this screen
`notifications` (the whole 44 button), `plus-ink` (20), `fork-knife-lg` (18, `Accent/Violet`),
`arrow-right` (20, baked white).

## Gotchas found while building
- The greeting sub-line is Headline 17, not a title style — "Your trips" below it is the Title 1.
- The stub's avatar rings are white, while screen 02's nav rings are `Surface/Ground`. The ring
  always matches whatever is behind the stack.
- "Your trips" is Title 1, which carries **letter-spacing −0.7**. Tracking is 0 on every style up
  to Headline; only the display sizes have it. Leaving it off ran the title 5.6 px long.
- "HAPPENING NOW" is Footnote/Medium with **tracking 0** — the uppercase comes from the content,
  not from added letter-spacing.
- The stub's avatar stack shows all six faces with no "+N" chip, so the **last face must sit
  flush**; a trailing −6 overlap shrinks the stack and pulls "You + 5 buddies" 6 px left.
