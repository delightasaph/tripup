# 15 · Notifications

Figma node `4098:2195`. Built in `src/screens/Notifications.tsx`, data in
`src/data/notifications.ts`.

A plain scrolling list on `Surface/Ground` — no tab bar, no FAB, no docked control, so nothing has
to stay above the fold. The frame is taller than 844 and marks the fold.

## Layout — content column 20 → 370, gap 18
| Section | Notes |
|---|---|
| Nav | the 40 back button alone, left. Nothing on the right. |
| Title | "Notifications" **Title 1** (34/600, −0.7, line-height 1.05) over "2 new" Caption/Regular `Ink/Secondary`, gap 2. |
| Group | label (TODAY / YESTERDAY / EARLIER) Footnote/Medium `Ink/Secondary`, then the card. Gap 8. |

## Group card
White, radius **18**, `box-shadow: 0 4px 12px rgb(31 30 36 / .06)` — the same day-group card as 09,
clipped so the rows' dividers meet the edge.

**Row** — padding `13 16`, gap 12:
- **Unread dot** 8 × 8, `Accent/Violet`. A read row keeps the 8 pt as empty space (the frame draws
  an empty 8 × 8 there), so every title starts on the same line.
- **Text**, gap 2: title Body/SemiBold `Ink/Primary`; sub Caption/Regular `Ink/Secondary`.
- **Time** Caption 2/Regular (11) `Ink/Secondary`, right. "16:42" today, "Mon 13:20" earlier.
- 1 px `Line/Default` divider between rows, none at the ends.

## Content is the ledger, not prose
Every expense row names a real entry by id and derives its own text:

| Frame row | Ledger entry | Derived |
|---|---|---|
| Sven paid €99 · Bikes along the river · your share €16,50 | `bikes` | €99, 9900 ÷ 6 = €16,50 |
| Kofi paid €150 · Live music at Damas · your share €25 | `fado` | 15000 ÷ 6 |
| You paid €96 · Lunch at Campo de Ourique | `lunch-campo` | **no share line** — it's yours |
| Mira paid €108 · Lunch at Ponto Final · your share €18 | `ponto-final` | 10800 ÷ 6 |

The two plan rows (Bea added a plan, Nic added Ferry to Cacilhas) name things already on the
itinerary. Nothing on this screen is invented, and no amount is typed out.

`formatEurosAuto` is what produces "€16,50" and "€25" from the same call — cents only when there
are cents.

## The bell's unread dot
`notifications.svg` is one export carrying the button, its shadow **and** the dot, as a single
`<circle id="Unread" fill="#A83A2B">`. Opening the list clears the dot, so the read state is that
same file with that one layer removed, saved as `notifications-read.svg` — mechanically derived
from Figma's export, not redrawn. The store's `notificationsSeen` picks between them, and the
button's `aria-label` follows.

## No bell on 02
The spec's §15 says the bell sits on 01 **and** 02. It isn't on 02 in any frame — not on this one,
not on 12, 13, 13b, 13c or 14, all of which draw 02's nav as back / buddy stack / lime "+". So the
build puts it on 01 only.
