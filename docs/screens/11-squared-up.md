# 11 · Squared up

Figma node `172:3175`. Built in `src/screens/SquaredUp.tsx`. **Do not re-fetch.**

Content starts at frame y 84 (screen-space 34), not the usual 64/14 — this screen sits lower than
every other full screen so far.

## Data
Everything traces back to `src/data/expenses.ts`'s `settleTransfers`/`settledAt`/`tripSpend` — the
same values 09 and 10 use. The row order is the one new wrinkle: `settleTransfers` comes out of the
netting algorithm grouped by creditor (Sven/Bea/Kofi→Ari, then Ren/Mira→Nic), but the spec's
settlement-times table and this frame both list rows in the order they actually **happened**
(Ren 22:14, Sven 22:16, Bea 22:18, Kofi 22:20, Mira 22:22). Added a local `inSettledOrder` — a sort
by `settledAt`, not a re-derivation — so the netting order (correct for computing the transfers) and
the display order (correct for narrating them) can both be right without one compromising the other.

## Squared up card
Lime, radius 28, padding `22 22 24`, gap 14.
- Top row: 56 ink circle holding a new 24px lime check (`check-lg` — see Gotchas), and a 7-avatar
  `AvatarStack` (28px, lime ring, no "+N" — all 7 shown) reusing the same component as Home/02.
- "Lisbon is squared up." Title 1, full width, wraps to 2 lines.
- "All 5 transfers are done and everyone got the news. Nobody owes anybody." Body/Regular secondary.

## Transfers card
White, radius 24, one-off `drop-shadow(0 6px 9px rgb(31 30 36 / .05))` (used nowhere else, so
inline rather than a token). Padding `6px 16px`; each row `padding: 11px 0`, gap 10, 1px divider
between: 22 green (`Status/Positive`) circle with `check-white` at 11 (reused, not re-exported —
see Gotchas), "{From} → {To}" Body/Medium flex-1 (same "→ You" phrasing 09 uses), time
Caption/Regular secondary, amount Headline 17. A `1.5px` top-bordered totals row closes it:
"€1,284 over 5 days" / "7 buddies".

## Actions
"Share recap" — secondary button, `send` icon re-tinted ink (same asset as 04's send button, just
recoloured — Figma's "share" glyph here is byte-identical to the existing `send.svg`). "Back to
trip" — primary, flex-1.

## Icons on this screen
New: `check-lg` (24, lime stroke, heavier weight than the 13px `check.svg` this screen's big circle
would otherwise reuse — Figma re-exports checkmarks at a bolder stroke for larger sizes rather than
scaling the thin one up, so this one earns its own file). Reused: `check-white` at 11 (the row
checks are the same path at a thicker relative stroke too, but 11px is small enough that the
difference isn't visible, so no duplicate asset), `send` re-tinted ink.

## Gotchas found while building
- Ren's 28px avatar in the "everyone" stack needed **Avatar/8**, and `Avatar.tsx`'s size formula
  had no bucket between 24 (→7) and 34 (→11). Added `size <= 28 ? 8`, matching Figma's discrete
  Avatar/N styles the same way the 52→14 fix on 10 did.
- Checked before adding `check-lg`: the 24px check is the *same path* as the 13px `check.svg`
  scaled by 24/13, but Figma bumps the stroke from an expected 1.8 to an explicit 2.4 at that size
  — an intentional optical correction, not a different icon. Worth a new asset; the 11px row check
  gets the same treatment but the difference is imperceptible at that size, so it stayed reused.
