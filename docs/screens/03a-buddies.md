# 03a · Buddies

Figma node `4058:3678`; the sheet is `4058:3852`. Built in `src/screens/Buddies.tsx`.

The group view: who is on the trip, and one way in to adding someone. The brief's wording is two
beats — open a group view *and* add Ren — so this is deliberately not the search sheet.
"Add a buddy" goes to 03b. Replaces the retired combined sheet `163:2180`.

## Sheet · Buddies — 0, 532 · 390 × 312
Docked to the bottom. White, top corners 28, `drop-shadow(0 -8px 15px rgb(31 30 36 / .12))`,
padding `10 / 20 / 34`, gap 16. Grabber 40 × 5, radius 3, `Line/Default`.

| Part | Screen coords |
|---|---|
| Grabber | 175, 542 · 40 × 5 |
| Header | 20, 563 · 350 × 29 |
| On this trip | 20, 608 · 350 × 65 |
| Add a buddy row | 20, 689 · 350 × 64 |

**The sheet is a fixed 312 and its content fills only 255** — there is 57 pt of deliberate slack
below the last row. Don't hug the content; the frame sets the height.

- **Header** — "Buddies" Heading 22 (tracking −0.2), "6 on this trip" Footnote/Regular.
- **On this trip** — six columns `justify-between`, each a 46 avatar over a Caption 2/Regular label
  in `Ink/Secondary`, gap 6. Ari reads "You"; the rest are Nic, Bea, Kofi, Sven, Mira.
- **Add a buddy** — `Surface/Ground`, radius 18, padding `14 16`, gap 12. A **36 circle** (radius
  999, not the 12 tile used elsewhere) in `Accent/Violet Tint` holding `person-plus` 18, which
  carries `Accent/Violet`. Then "Add a buddy" Body/SemiBold over "Anyone on the trip can add
  people" Caption/Regular — the subtitle states assumption A1 on screen — and
  `chevron-right-16`.

## The background is not this frame's background
This frame embeds an **older copy of 02**: no photo on the 10:00 row, the sunset gradient at
155.66°, a white-backed 36 directions button with an 18 icon, and the rail inset 18 at the bottom.
The current 02 (`4064:17467`, a newer node) has the photo row, 158.199°, a *background-less*
directions button with a 24 icon, and the rail inset 32.

02 is the reference screen, so the build composes the sheet over the **current** `TripLisbon`. The
same will apply to 03b, 04 and 06 wherever their frames embed a stale trip screen.

## Icons
`person-plus` 18 (`Accent/Violet`) · `chevron-right-16` 16.
