# Screen records

One file per screen, written straight after building it, so a screen is fetched from Figma **once**.

Each record holds the exact geometry, colours, type styles and icon names taken from that screen's
single `get_design_context` call, plus anything that surprised us. Before touching Figma again,
read the record — and `design/screens/<screen>.png`, which is the native 390 × 844 render and can
be pixel-sampled for any colour.

**No home indicator.** The frames draw one at 128, 830; the build leaves it out — it is inert
chrome and it weighed the screens down. On /compare it is the one difference you should expect to
see, and it applies to every screen from here on.

Conventions in these files:
- Coordinates are **screen coordinates** (0,0 = top-left of the 390 × 844 frame) unless a heading
  says otherwise. Figma's own frames nest, so the record converts once and states the result.
- The status bar occupies y 0–50. The content column is x 20–370.
- "Frame node" is the Figma node id, for the record only. Do not re-fetch it — **unless the
  record carries a STALE or SUPERSEDED banner at the top, which overrides this rule for that
  screen only.**

| Screen | Record | Figma node | Built |
|---|---|---|---|
| 01 Home | [01-home.md](01-home.md) | `162:429` | yes — **rebuilt** |
| 02 Trip · Lisbon | [02-trip-lisbon.md](02-trip-lisbon.md) | `4064:17467` | yes — **rebuilt** |
| 03a Buddies | [03a-buddies.md](03a-buddies.md) | `4058:3678` | yes |
| 03b Add a buddy | [03b-add-a-buddy.md](03b-add-a-buddy.md) | `4058:3935` | yes |
| 04 New poll | [04-new-poll.md](04-new-poll.md) | `164:2379` | yes |
| 05 Live poll | [05-live-poll.md](05-live-poll.md) | `84:169` | yes |
| 06 Plan updated | [06-plan-updated.md](06-plan-updated.md) | `4064:18080` | yes |
| 12 Quick add | [12-quick-add.md](12-quick-add.md) | `4093:2356` | yes |
| 13 New poll (filled) | _to write_ | `4094:2129` | no — **new** |
| 13b Time picker | _to write_ | `4095:2140` | no — **new** |
| 13c Deadline picker | _to write_ | `4095:2389` | no — **new** |
| 14 Trip · extra poll | _to write_ | `4101:2206` | no — **new** |
| 15 Notifications | _to write_ | `4098:2195` | no — **new** |
| 16 Log expense (quick add) | _to write_ | `4097:2350` | no — **new** |
| 17 Expense detail | _to write_ | `4098:2440` | no — **new** |
| 18 New poll (empty) | _to write_ | `4097:2617` | no — **new** |
| 04b Poll notification | [04b-poll-notification.md](04b-poll-notification.md) | `166:2578` | yes |
| 04c Vote | [04c-vote.md](04c-vote.md) | `166:2631` | yes |
| 07 Log the dinner | [07-log-the-dinner.md](07-log-the-dinner.md) | `168:2777` | yes |
| 08 Split by item | [08-split-by-item.md](08-split-by-item.md) | `169:2976` | yes |
| 09 Balances | [09-balances.md](09-balances.md) | `4048:16899` | yes |
| 10 Ren settles | [10-ren-settles.md](10-ren-settles.md) | `171:3175` | yes |
| 11 Squared up | [11-squared-up.md](11-squared-up.md) | `172:3175` | yes |
| 11B Squared up + stamp | [11b-squared-up-stamp.md](11b-squared-up-stamp.md) | `172:3255` | yes |
