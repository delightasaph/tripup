# 07 · Log the dinner

Figma node `168:2777`, sheet `168:2922`. Built in `src/screens/LogExpense.tsx`.

## Composition
Screen 02 with the dinner slot already resolved, under a scrim, with the new-expense sheet on top —
same recipe as 06/07's background: `<TripLisbon dinner="decided" crew={[...tripBuddies, people.ren]}
/>` (Ren has joined by 22:10) + `<Scrim />` + `<Sheet>`.

**Deliberately did not** copy the raw Figma background for this frame, which still shows the old
"Won 4 · 2 · 1" pill and a text-label "Map" button on the dinner card. That variant predates the
06 rework (see `docs/screens/06-plan-updated.md` / the `DinnerDecided` component in `TripLisbon.tsx`,
which intentionally dropped the pill and made Map icon-only). Screens 02/05 are the project's visual
source of truth when frames disagree, and the trip screen is one shared component — reusing it here
keeps 06 and 07 consistent instead of regressing 07 to a stale export.

## Sheet · New expense
Bottom-anchored (`<Sheet>` with no `frameTop`, hugs its content, gap 16).

- **Header** — "New expense" Heading 22; "Scan receipt" lilac pill (`padding: 8 14 8 12`, gap 6,
  icon `scan` 16). Not functional — tapping it is meant to toast "Coming soon" once toasts are
  wired to interaction, per the spec; not wired yet since no screen click-handlers are wired this
  phase.
- **Linked plan chip** — lime, radius 16, `padding: 6 14 6 6`, gap 10: 32×32 photo (radius 10,
  `placePhotos.taberna`), "Dinner · Taberna da Rua das Flores" Footnote/Medium flex-1, "20:30"
  Caption/Regular secondary.
- **Amount** — centred row, Display 48/600/−1.4 tracking: "€190" ink + ",00" in `Data/Bar Muted`
  (the two-tone rendering the design system calls for), then a 2×40 violet caret. Built from
  `dinnerBill.totalCents` via `splitEuroCents()` in `src/domain/money.ts`, not a hard-coded string —
  ties this screen to the same 19000-cent figure `src/data/expenses.ts` feeds into the split and
  netting math on 08/09.
- **Paid by / Split** card — `Surface/Ground`, radius 18.
  - Paid by row: "Paid by" secondary Body/Regular, right-aligned 26 avatar + "You" Body/SemiBold,
    trailing `chevron-right` **re-tinted to ink** via the `Icon` `color` prop (the exported asset is
    baked `Ink/Secondary` for its usual use in 03b; this row needs it darker — confirmed by diffing
    the Figma export against the existing file rather than pulling a duplicate).
  - 1px `Line/Default` divider.
  - Split row: "Split" secondary, then a white segmented control (`Equally` / `By item`), selected
    segment ink-filled. **`useState`, defaults to "By item"** — the scenario's actual path — and
    the button label switches between "Log expense" and "Next: who had what" accordingly, matching
    the spec's "if Equally: skip 08 and log directly."
- **Keypad** — 4 rows × 3 keys, `Surface/Ground` keys, 48 tall, radius 14, gap 8. Last row is
  `,` / `0` / backspace (new `backspace` icon, 20). Visual only — not wired to actually edit the
  amount yet, consistent with every other screen at this build stage (no cross-screen click wiring).
- **Next** — full-width ink pill, `arrow-right` 18 (reused — same glyph as the existing icon, just
  exported at a different size/stroke-width in this frame) + label.

## Icons on this screen
New: `scan` (16, the receipt-scan glyph), `backspace` (20 × 14, exported as one path). Reused:
`chevron-right` (re-tinted ink), `arrow-right`.

## Gotchas found while building
- The design export returns `imgIcon11`/`imgIcon12` for the chevron and arrow, and both turned
  out to be **pixel-identical paths** to already-exported icons, just different colours/sizes —
  diffed the raw SVGs before deciding, rather than assuming a new `imgIconN` means a new asset.
- The background dinner card diverges from this frame's own Figma export (see Composition above) —
  worth flagging explicitly in case a future pixel-diff against this exact node ID looks "wrong."
