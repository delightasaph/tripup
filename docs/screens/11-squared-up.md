# 11B · Squared up + stamp collected (alternative ending)

Figma node `172:3255`. Built in `src/screens/SquaredUpStamp.tsx`.

The alternative ending (spec §4/§5): ships alongside 11, meant to sit behind a demo toggle the team
can compare — the toggle itself isn't wired yet (demo controls are a later phase, per
the build order), so this is the "B" state as its own reachable screen for now
(`/?screen=squared-up-stamp`).

## Reused the existing `Stamp` component, not Figma's raw stamp tree
The export of this node returns the entire Stamp component's internals exploded into ~40
primitive layers (paper, artwork, grain texture, two postmark stamps, a 10-vector plane icon...).
None of that needed rebuilding: `src/components/Stamp.tsx` already renders any country's stamp from
its flat PNG (`stamps.portugal`, per `DESIGN_SYSTEM.md` §7) with the correct crop and
`drop-shadow`. This screen just calls `<Stamp country="portugal" paperWidth={206} rotate={5} />`.
`portugal.png` carries the "x1" count badge Home's four stamps don't — correct here, since it's
Ari's first Portugal visit (design system note, confirmed on screen).

Left the drop-from-scale-1.3 entrance motion (`DESIGN_SYSTEM.md` §6) for the later motion pass
— every screen at this stage is a static snapshot of its narrative moment, this one included.

## New shared component: `SquaredUpActions`
11 and 11B end in the exact same "Share recap" / "Back to trip" button row. Pulled it into
`src/components/SquaredUpActions.tsx` (using the existing `Button` component rather than the
hand-rolled `<button>`s 11 had) and pointed both screens at it — this also simplified 11's own
action row, which had duplicated `Button`'s styling by hand.

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
