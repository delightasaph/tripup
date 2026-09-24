# 11 · Squared up — the ending

Design node `172:3255`. Built in `src/screens/SquaredUpStamp.tsx`, at `/squared-up`.

**There is one ending.** A plainer version without the stamp shipped alongside this one for a
while, behind a demo toggle so the two could be compared. Two endings made the finish ambiguous —
a trip that gets squared up earns the stamp — so the toggle and the plain version are gone. Its
receipt (the per-transfer list with checks and times) is now the detail behind this screen's
**"5 transfers · 22:14 – 22:22"** row: tapping it opens the list as a sheet.

## Reused the existing `Stamp` component, not Figma's raw stamp tree
The export of this node returns the entire Stamp component's internals exploded into ~40
primitive layers (paper, artwork, grain texture, two postmark stamps, a 10-vector plane icon...).
None of that needed rebuilding: `src/components/Stamp.tsx` already renders any country's stamp from
its flat PNG (`stamps.portugal`, per `DESIGN_SYSTEM.md` §7) with the correct crop and
`drop-shadow`. This screen just calls `<Stamp country="portugal" paperWidth={206} rotate={5} />`.
`portugal.png` carries the "x1" count badge Home's four stamps don't — correct here, since it's
Ari's first Portugal visit (design system note, confirmed on screen).

The stamp lands with the drop-from-scale-1.3 entrance in `DESIGN_SYSTEM.md` §6.

## Shared components
`SquaredUpActions` holds the "Share recap" / "Back to trip" row, and `TransferReceipts` holds the
settled-transfer list — the body of the old plain ending, which survives as the sheet this
screen's transfers row opens.

## Layout
Centred column, `padding-top: 40`, gap 18.
- "All squared up" — lime `Pill`, 28 tall, `padding-left: 8`, gap 6: an 18px ink circle holding a
  10px lime check (the existing `check` icon re-tinted lime — same trick as everywhere else, no new
  asset) + Footnote/Medium.
- The stamp, centred, 18px vertical breathing room.
- "Lisbon is squared up." Title 1 + "All 5 transfers are done. Your Portugal stamp is now in your
  collection." Body/Regular secondary, width 300, centred.
- 3 stat pills, gap 8: `€1,284 spent` (Blush), `5 days` (`Surface/Canvas` — the presentation-frame
  background colour, reused here as a pill fill), `7 buddies` (Lilac). All from `tripSpend`.
- "See transfers" row — white, radius 18, `--shadow-pop` (new token, factored out of 11's transfer
  card once this screen needed the same value): green 22 check circle, "5 transfers · 22:14 – 22:22"
  (derived from `settledAt`'s min/max, not hard-coded), trailing `chevron-right`.

## New token: `--shadow-pop`
`0 6px 9px rgb(31 30 36 / .05)` — was inline on 11's transfers card; promoted to a token once this
screen needed the identical value a second time, per the project's "no hard-coded... use tokens"
rule.

## Gotchas found while building
- Nearly all of this node's export was the Stamp component's own internals —
  a reminder to check for an existing component before touching the raw primitive tree, even when
  the tool hands back 40 layers that look like they need transcribing.
