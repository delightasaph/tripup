# 17 · Expense detail (sheet over 09)

Figma node `4098:2440`; the sheet is `4098:2690`. Built in `src/screens/ExpenseDetail.tsx`.
**Do not re-fetch.**

The Expenses tab under a scrim, with a read-only sheet on top. Which expense is in the URL —
`?screen=expense-detail&entry=fado` — so it is deep-linkable like every other screen, and tapping
any ledger row on 09 opens it.

## Sheet · Expense — 0, 259 · 390 × 585
Padding `10 20 34`, gap **16**, top corners 28, 40 × 5 grabber.

| Section | Notes |
|---|---|
| Header | title Heading 22; sub Caption/Regular `Ink/Secondary` — "Tue 15 Sep · 21:30 · paid by Kofi". Gap 3. |
| Amount | **Title 1** (34/600, −0.7) left; "your share €25" pill right — `Surface/Ground`, radius 999, padding `6 12`, Caption/Medium. |
| Method | "SPLIT EQUALLY · 6 OF YOU" Footnote/Medium `Ink/Secondary`. |
| People | `Surface/Ground` card, radius 18, clipped. Rows padding `11 16`, gap 12: avatar 28, name Body/Regular, amount Body/SemiBold. 1 px `Line/Default` dividers. |
| Done | ink, 54, full width. |

The payer's row reads "Kofi · paid". The frame gives the first two avatars a 2 px `Surface/Ground`
ring and the rest none; the build draws them all the same, through `Avatar`.

## Nothing on this screen is written down
The count in the header, who is listed, and every amount come from the expense's own `sharedBy`
run through `src/domain/` — `splitEqually`, or the by-item split for the one expense that has one.
That is what makes the exceptions free:

| Expense | Header | List | Share pill |
|---|---|---|---|
| Live music at Damas | SPLIT EQUALLY · **6** OF YOU | the six | your share €25 |
| Surf lesson, Caparica | SPLIT EQUALLY · **4** OF YOU | Ari, Bea, Kofi, Mira | your share €20 |
| Uber back over the bridge | SPLIT EQUALLY · **3** OF YOU | Nic, Sven, Mira | **"you weren't in this one"** |
| Dinner · Taberna | SPLIT **BY ITEM** · 7 OF YOU | all seven | your share €30 |

The Uber is the row that demonstrates exclusions work, and it is the same rule that keeps Ren out
of every expense before tonight — not a special case, just a different `sharedBy`.

## What the ledger had to gain
`LedgerEntry` used to carry a `sub` string ("Paid by Sven") and a stored `shareCents`. It now
carries `payerId`, `sharedBy`, `time` and `day`, and the share is **derived** — `shareOf(entry,
'ari')` returns `null` when you weren't in it, which is what both 09's row and this sheet render.
No figure changed: every stored `shareCents` was already the exact equal split (9900 ÷ 6 = 1650,
2800 ÷ 6 = 467, 8000 ÷ 4 = 2000, 1100 ÷ 6 = 183).

Tonight's dinner isn't in `expenseLedger` — `selectFullLedger` prepends it live from the store, so
it always reflects the split mode and the wine-sharing the demo is currently showing, and 09 and 17
read the same list.

## One thing the frame can't show
The frame's expense has six people and fits. Tonight's dinner has seven and would push **Done**
below the fold, which the spec forbids. The people list is therefore `flex: 1` with its own scroll
inside the sheet (`overscroll-behavior: contain`), so the list gives way and the action never does.
