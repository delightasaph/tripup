# Screen notes

One note per screen, written as it was built: the exact geometry, colours, type styles and icon
names taken off the design file, plus the decisions made where the build and the frame had to
differ and why.

They are the working record behind `../DESIGN_SYSTEM.md` — that document states the system, these
state how each screen uses it.

Conventions:
- Coordinates are **screen coordinates**: 0,0 is the top-left of the 390 × 844 frame. The design
  file's frames nest, so each note converts once and states the result.
- The content column is x 20–370.
- No status bar and no home indicator. The frames draw both; the build leaves both out and gives
  the space to the content, so a frame coordinate is a screen coordinate.

| Screen | Note | Design node |
|---|---|---|
| 01 Home | [01-home.md](01-home.md) | `162:429` |
| 02 Trip · Lisbon | [02-trip-lisbon.md](02-trip-lisbon.md) | `4064:17467` |
| 03a Buddies | [03a-buddies.md](03a-buddies.md) | `4058:3678` |
| 03b Add a buddy | [03b-add-a-buddy.md](03b-add-a-buddy.md) | `4058:3935` |
| 04 New poll | [04-new-poll.md](04-new-poll.md) | `164:2379` |
| 05 Live poll | [05-live-poll.md](05-live-poll.md) | `84:169` |
| 06 Plan updated | [06-plan-updated.md](06-plan-updated.md) | `4064:18080` |
| 12 Quick add | [12-quick-add.md](12-quick-add.md) | `4093:2356` |
| 13 New poll (filled) | [13-18-poll-question.md](13-18-poll-question.md) | `4094:2129` |
| 13b Time picker | [13b-13c-wheel-picker.md](13b-13c-wheel-picker.md) | `4095:2140` |
| 13c Deadline picker | [13b-13c-wheel-picker.md](13b-13c-wheel-picker.md) | `4095:2389` |
| 14 Trip · extra poll | [14-trip-extra-poll.md](14-trip-extra-poll.md) | `4101:2206` |
| 15 Notifications | [15-notifications.md](15-notifications.md) | `4098:2195` |
| 16 Log expense (quick add) | [16-log-expense-quick-add.md](16-log-expense-quick-add.md) | `4097:2350` |
| 17 Expense detail | [17-expense-detail.md](17-expense-detail.md) | `4098:2440` |
| 18 New poll (empty) | [13-18-poll-question.md](13-18-poll-question.md) | `4097:2617` |
| 04b Poll notification | [04b-poll-notification.md](04b-poll-notification.md) | `166:2578` |
| 04c Vote | [04c-vote.md](04c-vote.md) | `166:2631` |
| 07 Log the dinner | [07-log-the-dinner.md](07-log-the-dinner.md) | `168:2777` |
| 08 Split by item | [08-split-by-item.md](08-split-by-item.md) | `169:2976` |
| 09 Balances | [09-balances.md](09-balances.md) | `4048:16899` |
| 10 Ren settles | [10-ren-settles.md](10-ren-settles.md) | `171:3175` |
| 11 Squared up | [11-squared-up.md](11-squared-up.md) | `172:3255` |
