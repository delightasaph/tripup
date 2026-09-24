# 10 · Ren settles (Ren's phone)

Figma node `171:3175`. Built in `src/screens/Settle.tsx`.

Full-screen (not a sheet) on Ren's phone, standard status bar. The amount owed comes straight from
`settleTransfers.find(t => t.fromId === 'ren')` in `src/data/expenses.ts` — the same netted list 09
renders — so if the netting math ever changed, this screen's €20,00 would move with it rather than
drift out of sync.

## Amount card
White, radius 28 (`--radius-sheet`), one-off `drop-shadow(0 8px 12px rgb(31 30 36 / .06))` — close
to but distinct from `--shadow-list`, and used only here, so it's inline rather than a new token.
Padding `22 20 18`, gap 14, centred.

- People row: Ren avatar 52 → `arrow-right` (re-tinted secondary, 16) → Nic avatar 52 (photo).
- "You owe Nic" Footnote secondary, then Display 48 "€20" ink + ",00" muted — `splitEuroCents()`
  again, not a literal string.
- 1px divider, then the "for" row: "Dinner at Taberna" Footnote/Medium ink, "Food only · you
  skipped the wine" Caption secondary — the one place this specific narrative detail appears, so
  it's inline in the screen rather than promoted into `expenses.ts`.

## Pay with
4 selectable rows (`useState`, defaults to Apple Pay), same selection pattern as 04c/08's toggles:
white always, `2px solid Ink/Primary` when selected, else transparent. Apple Pay and PayPal render
their own 38×26 brand mark directly (`apple-pay-mark.svg` / `paypal-mark.svg`, both genuine
multi-path brand assets, not recoloured); Card and Bank use a 38 `Surface/Ground` icon tile like
07/08's item rows, holding the new `card`/`bank` line icons. Selected control is the same
24px-circle-with-`check-white` pattern as 04c/08; unselected is the same 1.5px ring.

`src/data/expenses.ts`'s `paymentMethods` now carries either an `icon` (line glyph + tile) or a
`mark` (brand image, no tile) per method — the screen branches on `'mark' in m`.

## Footer
"Nic is told the moment it's sent" Caption secondary, centred. "Pay Nic €20" — full-width ink pill,
new `phone` icon (18, white — a device outline, not a payment-brand glyph; this is the generic "pay"
action icon Figma uses here, distinct from 07's `receipt` and 08's `check`).

## Icons on this screen
New: `card` (18), `bank` (18), `phone` (18, the pay-button glyph), `apple-pay-mark` (38×26 brand
image), `paypal-mark` (38×26 brand image). Reused: `close` (byte-identical to the existing export,
confirmed before skipping it), `arrow-right` re-tinted secondary at 16, `check-white` at 13.

## Gotchas found while building
- Ren's 52px avatar needed **Avatar/14**, but `Avatar.tsx`'s size formula (`Math.round(size * 0.3)`
  for anything past 44) gave 16 at that size. Added a `size <= 52 ? 14` bucket — it also covers the
  existing 46px avatar correctly (already 14 by coincidence) — rather than special-casing this one
  screen. The component's own comment already says these styles are "discrete, not a ratio," so
  this is filling in a size the formula hadn't been checked against yet, not overriding it.
