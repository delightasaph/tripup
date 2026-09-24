# 01 · Home

Figma node `162:429`. Built in `src/screens/Home.tsx`. unless a
STALE banner says otherwise.

Reference render: `design/screens/01-home.png` is the **old** frame and is stale. `/compare` flags
it.

## The frame scrolls
**1022 tall**, Content 350 × 941 at 20, 64. Sections stack in a column at **gap 20**. There is no
docked chrome on Home — no tab bar — so the whole screen scrolls, with **110 pt** of ground below
the last item per `PRODUCT_SPEC.md`. Scroll height comes out at 1065.

| Section | y (screen) |
|---|---|
| Header | 64 · 350 × 44 |
| "Your trips" | 128 |
| "HAPPENING NOW" label | 184 |
| Trip card | 209 · 350 × 271 |
| — Next up panel | 345 · 326 × 110 |
| Coming up header | 500 |
| — cards | 530 · 350 × 138 |
| Stamps heading | 704 |
| — stamps row | 760 · 183 tall |
| — "See your Stamps collection" | 951 · 350 × 54 |

## What changed in this rework
- The greeting sub-line is **"Last night in Lisbon"** in **Body/Medium 15** — it was
  "3 trips with your crew" in Headline 17.
- **The ticket and the white stub have merged into one card.** The trip hero is now the ticket at
  its **tall** variant (350 × 271, radius 16) with the "Next up" panel sitting inside it.
- Coming up cards gained a **more** button and a crew stack, and lost "· N buddies" from the date
  line. **Porto is `Accent/Sky`** — an earlier pass recorded it as Lime, and the spec has been
  corrected back.
- The stamps row is now a full **Stamps** section with a centred heading, a subtitle and a
  full-width dark CTA. Its row offset is **−15**, not −26.

## Header
Greeting: Ari 40, gap 10, "Hi Ari" Footnote/Regular `Ink/Secondary` over "Last night in Lisbon"
Body/Medium ink, gap 1. Actions gap 10, both 44: notifications is the single exported asset
(button, shadow and unread dot on an 80 canvas, placed at −18/−12 in a 44 box); new trip is a white
circle with `drop-shadow(0 6px 9px rgb(31 30 36 / .08))` and `plus-ink` 20.

## Next up panel — inside the card at 12, 136 · 326 × 110
`Surface/White 70%` with **`backdrop-filter: blur(2px)`**, radius 18, padding 12. Inner column
gap 14:

> **Blur units.** The file's background blur is **4**; CSS needs **2px**. Figma's background-blur
> radius is twice the `backdrop-filter` value, and the export confirms it — the same node exported
> `3px` when the file said 6, and `2px` now it says 4. Always halve the Figma number; writing the
> file's value straight into CSS renders twice as blurry as the design.

- Tonight row, gap 12: a 40 `Accent/Violet Tint` tile (radius 12) with `fork-knife-lg` 18, then
  "Tonight · 20:30" Caption/Regular `Ink/Secondary` over "Dinner · not decided yet" Body/SemiBold,
  gap 2.
- Buddies row, `justify-between`: the 30 stack (Ari, Nic, Bea, "+3"), each ringed 2 px in
  **`Surface/Ground`** — not white, even though the panel is white-70 — and an "Ask the group"
  pill: `Accent/Violet`, padding `9 14`, Caption/Medium 12, white.

## Coming up — 170 × 138 cards, gap 10
Radius 24, padding `14 14 14 16`. Porto `Accent/Sky`, Berlin `Accent/Blush`.
Top row `justify-between`: the "when" pill (`Surface/White 70%`, padding `4 9`, Caption 2/Medium)
and `more` 28. Then a flex spacer, the name in Subheading/SemiBold, the dates in Caption/Regular
`Ink/Secondary`, and a people row with `padding-top 10`.

The crew stack is 22 avatars overlapped −6, ringed 2 px in `Surface/White 70%`, ending in a "+N"
chip on the same white-70 fill at **Avatar/8** (8 px, tracking 0.2). Note the "+N" chip's type is
size-driven: **Avatar/11 in a 30 stack, Avatar/8 in a 22 one** — 05's 22 voter avatars use
Avatar/7 for initials, which is a different element again.

"See all" is **underlined** Footnote/Regular.

## Stamps section
Container `padding-top 16`, gap 8.
- The heading block sits in a **292**-wide frame and is itself **246 × 48** — a fixed 48 even
  though its content is 39. "Stamps" Headline 17 centred over "Collect stamps with every successful
  trip" Footnote/Regular `Ink/Secondary`, gap 4. The 9 pt of slack is part of the rhythm;
  collapsing it pulls everything below up by 9. The subtitle is 248 wide, so it overhangs its own
  246 block by a pixel each side — centred, not clipped. *(Pulled from the file; an earlier pass
  inferred this from box heights and got the type right but not the widths.)*
- **Stamps row: the frame's own render, not four placed stamps.** 390 × 207, origin Frame 15 at
  (−20, −4), so it sits full bleed at screen x 0 inside a 183-tall block.

- CTA: full-width ink pill, 54, `drop-shadow(0 10px 10px rgb(31 30 36 / .25))`, Body/Medium plus
  `arrow-right` 20.

## Icons
`notifications` (whole button) · `plus-ink` 20 · `fork-knife-lg` 18 · `more` 28 · `arrow-right` 20.

## Gotchas
- This screen cost **five** calls: the top-level node came back sparse (five stamp instances), so
  the card, header, Coming up and the Stamps CTA were pulled separately. A screen with several
  stamp instances will always need splitting.
- The tall ticket's painting uses **two** masks composited with `mask-composite: intersect` — the
  ticket silhouette (offset −149 to line up with the card) and the left-to-right fade.

### Why the stamps row is a render
I first placed four `Stamp` components and derived each rotation by solving the rotated-bounding-box
equations against the instance bboxes in the metadata. **That was wrong** — it produced angles about
three times too steep (Italy −28.5°, France −33.6°, against roughly −12° at most in the frame).

The flaw: the four instances are the *same size*, so the bbox differences come from the "VISITED"
cancel overhanging each stamp by a different amount once rotated, not from the angle. Fitting three
unknowns to two equations gave a self-consistent but false answer — the "all four solve to scale
0.4275" result I treated as validation was an artefact of the fit, not evidence.

The per-stamp transforms are not recoverable from sparse metadata, and an export of the
row returns sparse because of the four stamp instances. So the row is the frame's render.

Two consequences worth knowing:
- Figma flattened it onto **white** (Frame 15 has no fill), so the field was keyed out with an
  edge flood fill. Interior highlights are untouched.
- **It cannot gain a fifth stamp.** `PRODUCT_SPEC.md` says Home shows 5 countries after the ending;
  that state needs its own render of the same frame.
