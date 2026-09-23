# 05 · Live poll (Ari's view)

Figma node `84:169`. Reference render: `design/screens/05-live-poll.png` (native 390 × 844).
Built in `src/screens/LivePoll.tsx`. **Do not re-fetch this screen.**

## Frame skeleton
| Part | Screen coords |
|---|---|
| Status bar | 0, 0 · 390 × 50 |
| Content column | 20, 64 · 350 × 686 |
| Nav | 20, 64 · 350 × 40 |
| Body | 20, 124 · 350 × 626 |
| — asked-by row | 20, 124 · 209 × 22 |
| — question | 20, 154 · 330 × 64 |
| — live ticker | 20, 234 · 255 × 28 |
| — options group | 20, 278 · 350 × 388 |
| — waiting on Sven | 20, 686 · 350 × 64 |
| Bottom fade | 0, 714 · 390 × 130 |
| Actions | 20, 756 · 350 × 54 |
| Home indicator | 128, 830 · 134 × 5 |

## Nav
- Back button 40 × 40, same as screen 02, icon `arrow-left`.
- **Live pill** at x 187 · 183 × 33, white, pill, `--shadow-card`:
  pulse dot at 12 (14 box, 8 dot, `Status/Alert`, with a 0.18-opacity ring) · "Live" Footnote/Medium
  in `Status/Alert` · 1 × 14 `Line/Default` divider · "closes in 18:24" Footnote/Medium ink,
  tabular numerals.

## Question block
- Asked-by: Ari avatar 22, then "Ari asked · for dinner at 20:30" Footnote/**Regular** in
  `Ink/Secondary`, 8 to the right. In code, show "You asked" when the viewer is the creator.
- Question: Title 2 — Rubik 600, 28, line-height 1.15, **letter-spacing −0.5** — ink, wrapped to
  330 wide, two lines, 64 tall. The tracking is not optional: without it the line runs ~4% long.

## Live ticker
Auto-width pill, 28 tall, background `rgb(31 30 36 / .05)`, padding `4 12 4 4`, gap 8, avatar 20.
Text is Caption 12: the **name** is Medium `Ink/Primary`, the rest Regular `Ink/Secondary`.
`aria-live="polite"`.

## Option cards
Group top 278, cards stacked with an 8 gap → offsets **0 / 140 / 268**; the leader is **132** tall,
the others **120**. Width 350, radius 24, padding `14 16 11 14` (leader) / `14 16 4 14`, gap 12.
Leader is `Accent/Lime`, the rest white. **No shadow on any of them** — the lime fill is the only
thing marking the leader.

Internals (card-relative):
- Top row at 14, 14 · 320 × 52.
  - Photo tile 48 × 48, radius 12, `object-fit: cover`.
  - Icon badge 22 × 22 at 34, 34 of the 52 box: white circle, `--shadow-card`, icon at 13.
  - Text block at x 66, width 254: name Headline 17 SemiBold (4 down), line Caption 12
    `Ink/Secondary` (26 down).
- Results at 14, 78.
  - Bar at x +2, 318 × 8, radius 4. Track is `rgb(31 30 36 / .1)` on the leader and
    `rgb(31 30 36 / .07)` on the others — they differ. Fill is `Ink/Primary` on the leader,
    `Data/Bar Muted` otherwise.
  - Votes row at x +2, **20** down on the leader (23 tall) and **16** on the others (22 tall).
    - Voter avatars 22, overlapping at 18 pitch (margin −4), ringed in the card's own background.
    - Count text sits 8 after the stack — `22 + 18 × (n − 1) + 8` — 4 down: Caption 12
      `Ink/Secondary`.
    - "Your vote" chip (leader only) at x 228 · 90 × 23: white pill, icon `check` 13 at inset 10,
      label Caption 2 (11) Medium.

Bar fills are the Figma pixel widths over the 318 track: **159 / 104.9 / 54.1** — i.e. Taberna 3,
Time Out 2, Ramiro 1.

## Waiting on Sven
350 × 64, radius **20**, `Surface/White 70%`, with a **1 px `Line/Default` border**, gap 11,
padding-left 11, padding-right 14.
- Pending avatar at 10, 10 · 42: the dashed ring is an exported PNG (`assets/pending-ring.png`,
  84 × 84 drawn at 42, Figma `84:306`), not a CSS border. Sven's 36 avatar sits at 3, 3 inside it at
  **55%** opacity.
- Text at 64, 13: "6 of 7 voted" Body 15 SemiBold; "Waiting on Sven" Caption 12 `Ink/Secondary`,
  21 down.
- Nudge button at 241, 13 · 95 × 38: `Accent/Lilac`, pill, ink Body/Medium, icon `bell` 16.

## Actions
Row at 20, 756, gap 10: "Change vote" 137 × 54 secondary (white, 1.5 px `Line/Default` inset
border); "Close poll now" 203 × 54 primary (`Ink/Primary`, white, `--shadow-dark-button`).
"Close poll now" is creator-only.

## Icons on this screen
All exported into `public/assets/icons/`: `arrow-left`, `bowl` (13), `fork-knife` (13), `fish` (13),
`check` (13), `bell` (16). The four 13 px glyphs all carry `Ink/Primary`.

## Gotchas found while building
- The leader card is taller than the others (132 vs 120) purely to fit the "Your vote" chip, and its
  bar-to-votes gap is 12 rather than 8. Don't let the cards auto-size.
- Photos are WebP and not square (`ramiro` is 860 × 1147), so the 48 tile needs `object-fit: cover`.
- Ren has no photo by design; he is the "RT" initials avatar in the Time Out voter stack. Its text
  is **Avatar/7** (Rubik 600, 7, tracking 0.1) — the Avatar/N styles are discrete, not a ratio:
  Figma uses 7 inside a 22 circle and 11 inside a 30.
- The icon badge on each photo tile has its own small shadow, `0 2px 4px rgb(0 0 0 / .12)`, even
  though the card it sits on has none.
- The "waiting on Sven" card's 1 px stroke must be an **`outline` with `outline-offset: -1px`**,
  not a `border` — a border moves its contents 1 px in. Figma draws a stroke on the frame without
  displacing children; CSS border-box does not.
