# 08 · Split by item

Figma node `169:2976`, sheet `169:3180`. Built in `src/screens/SplitByItem.tsx`.

Same composition as 07 (trip screen with dinner resolved, under a scrim) — see the note in
`docs/screens/07-log-the-dinner.md` about deliberately not using this frame's own stale background
export (still shows the pre-rework "Won 4 · 2 · 1" pill / text "Map" button).

## Live numbers, not copy
Every amount on this screen comes from `src/domain/split.ts`'s `splitByItems()`, fed
`src/data/expenses.ts`'s `dinnerBillItems` with the wine item's `sharedBy` held in local
`useState`. Toggling an avatar re-runs the split and the summary sentence on every render — this is
the screen the spec's edge case "un-skipping someone on the wine re-computes shares instantly"
(§6) is actually about, so it's wired for real rather than mocked as a static image.

The default state (Nic and Ren skipped on wine) reproduces the spec's exact numbers: Mains €98/7 =
€14 each, Petiscos €42/7 = €6 each, Wine €50/5 = €10 each, summary "Nic & Ren pay €20 · Everyone
else €30" (order comes from iterating the buddies list `ari,nic,bea,kofi,sven,mira,ren`; the spec's
prose says "Ren & Nic" — same two people, cosmetic order only).

## Summary sentence
Heading 22 SemiBold, two lines, gap 6: "€190 for `[dinner at Taberna]`, / paid by `[you]`, split by
item." Chips are inline `<span>`s, radius 8, padding `1px 8px`, lime for the plan / lilac for the
payer — not a separate component, since nothing else in the app needs an inline text chip like this.

## Item rows
`Surface/Ground`, radius 20, padding `12 16 12 12`. Icon tile 38, radius 12: `Accent/Blush` +
`bowl` for mains (**reused** — see Gotchas), `Accent/Sand` + `bread` for petiscos, `Accent/Lilac` +
`wine` for the wine (both new icons). Title Body/SemiBold, meta Caption/Regular secondary, amount
Headline 17 semibold at the end.

The wine row is the only one that expands: white background, `1.5px solid Ink/Primary` border,
extra note line + the 7-avatar toggle row.

## Who's sharing (wine only)
7 buttons, each an avatar (38) + label, gap 5. Included: avatar at full opacity with a 16px ink
"Included" badge (1.5px white border) at its bottom-right holding a 9px white check. Skipped: avatar
at 35% opacity, label "Skipped" in `Status/Alert` instead of the name. Ren's initials avatar (no
photo, `Avatar/Ren` fill) behaves identically to the photo avatars when skipped/faded.

## Shares row + actions
`Surface/Ground` row, radius 18, the two-group summary sentence (see "Live numbers" above) on the
left, "Everyone else `€X`" (amount bold ink) on the right — hidden entirely if every buddy currently
shares the same total (all amounts equal). "Back" (secondary, returns to 07) + "Log expense"
(primary, `check` icon reused at 18/white — see Gotchas) → 09.

## Icons on this screen
New: `bread` (18, petiscos), `wine` (18, glass + stem). Reused: `bowl` at 18 (the mains icon turned
out to be the *exact same path* as the existing 13px `bowl.svg`, just exported bigger — diffed
before adding a duplicate), `check-white` at 9 (the "Included" badge check is the same checkmark
path scaled down, confirmed by ratio), `check` re-tinted white at 18 for "Log expense" (again the
same path as the existing 13px `check.svg`, just bigger — Figma's "Log expense" icon on this screen
is a checkmark, not the receipt glyph used on 07's button of the same name).

## Gotchas found while building
- The design export hands out a fresh `imgIconN` for every image reference regardless of whether
  the underlying asset is new — three of the five icons requested for this screen turned out to be
  bytewise-identical (up to scale) to icons already in `public/assets/icons/`. Always diff before
  downloading a "new" one.
- The summary-sentence grouping logic (`low`/`high` amounts) is generic over however many people
  end up in each bucket, not hard-coded to "Nic and Ren" — it re-derives the two groups from
  whatever `splitByItems()` returns, so it stays correct as the toggle changes.
