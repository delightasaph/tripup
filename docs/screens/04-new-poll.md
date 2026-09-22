# 04 · New poll

Figma node `164:2379`; the sheet is `164:2513`, the toast `164:2506`. Reference render:
`design/screens/04-new-poll.png`. Built in `src/screens/NewPoll.tsx`. **Do not re-fetch.**

Screen 02 under a scrim, the "Ren joined" toast still up from 03, and the New poll sheet.

## Toast — 20, 56 · 350 × 50
Ink, radius 20, padding `10 16 10 10`, gap 10,
`drop-shadow(0 10px 12px rgb(31 30 36 / .25))`. A 28 lime circle holds the glyph; title is
Footnote/Medium white over a Caption/Regular detail in `Accent/Lime`, gap 1.
04 uses `check` at 13; 06 uses `calendar-check` at 14.

## Sheet · New poll — 0, 235.5 · 390 × 608.5
Same shell as 03 but **gap 18**.

| Section | Screen coords |
|---|---|
| Header | 20, 268.5 · 350 × 29 |
| Question | 20, 315.5 · 350 × 60.5 |
| Options header | 20, 394 · 350 × 15 |
| Options | 20, 427 · 350 × 232 |
| Deadline | 20, 677 · 350 × 61 |
| Send | 20, 756 · 350 × 54 |

- **Header** — "New poll" Heading 22; the slot pill is `Accent/Violet Tint` with `Accent/Violet`
  Footnote/Medium, padding `6 12 6 10`, gap 5, and **`clock-violet` 14** (a clock, not cutlery).
- **Question** — "Question" Caption/Regular label, the question in Heading 22, then a full-width
  1.5 ink underline. Gap 8.
- **Options header** — "3 places near you" Footnote/Regular `Ink/Secondary`; "+ Add a place"
  Footnote/Medium `Accent/Violet`.
- **Options** — rows 350 × 72, gap 8, radius **20**, `Surface/Ground`, padding `10 14 10 10`,
  gap 12. A 52 photo box holds a 48 tile (radius 12) with a 22 white badge at 32, 32 carrying
  `drop-shadow(0 2px 2px rgb(31 30 36 / .12))`; name Headline 17, line Caption 12; `remove` 16 at
  the end.
- **Deadline** — `clock` 20, text, `chevron-right-16`. Height pinned to 61.
- **Send** — full width ink pill, `send` 18 + Body/Medium.
