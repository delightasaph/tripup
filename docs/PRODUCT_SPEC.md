# TripUp — Product spec for the prototype

## 1. The brief (summary)
TripUp is an all-in-one mobile app for organising group trips, from a weekend getaway to a music festival abroad. Friends build itineraries together, vote on decisions, track expenses and settle up. The beta has early adopters; the app needs a full redesign.

Deliverables: a wireflow (the thinking), two high-fidelity screens (the craft), and **this prototype** (the result, the primary deliverable: something a PM can demo).

### What we know about users (from the brief)
- Friend groups travelling together. One person often leads, but everyone wants a say, especially on food, activities and expenses.
- Decisions are **spontaneous and happen mid-trip**. Low tolerance for friction: if it takes more than a couple of taps, they switch to WhatsApp.
- They prefer **polls over chats**, **simple expense tracking** with in-app payment, and **real-time feedback**: when a decision is made they expect the shared itinerary to reflect it instantly.
- Familiar patterns beat new ones (e.g. Splitwise for balances).

### Positioning (use this when writing copy)
People plan the big things before a trip and deliberately leave some slots open. TripUp holds both, and it is built for the open slots, where group chats break down: deciding fast, together, on the go, and settling up without chasing anyone.

## 2. The scenario to prototype
Last evening of a group trip to Lisbon (Wed 16 Sep, day 5 of 5). The group is back at the house before going out. **Ari**, a participant (not necessarily the organiser), uses the downtime to sort out dinner.

1. Ari opens TripUp and lands on **Home**.
2. She opens the current trip, **Lisbon**.
3. She adds **Ren**, a new friend joining for the final dinner.
4. She creates a **poll** with three nearby restaurants, each with a different vibe.
5. Everyone gets a notification; votes update the leading option **in real time**.
6. The poll closes and the winner is **added to the itinerary** automatically.
7. After dinner the bill is **logged and split by item**; debts are **netted into the fewest transfers**.
8. Friends **settle in the app**; a confirmation tells everyone they are **squared up**.

### Success criteria
- Each step takes a tap or two.
- Everyone sees votes and the final plan update live.
- The winner lands on the itinerary without anyone retyping it.
- Debts are netted into the fewest possible transfers.
- Everyone gets a clear "squared up" at the end.

### Assumptions (keep consistent in the build)
- A1 Anyone on the trip can add people and start a poll.
- A2 People who join late don't owe for earlier costs (Ren only shares tonight's dinner).
- A3 Used on the go, one-handed, in short bursts.
- A4 Polls have a deadline: close after 20 min **or** as soon as everyone has voted.
- A5 Bills can be split by item, as easily as evenly.
- A6 Everyone has the app; a new friend joins via contact or invite link.
- A7 Balances and settling feel like tools people already know.

## 3. Cast and mock data

### People (7 on the trip after Ren joins)
| id | Name | Label on Ari's phone | Avatar | Notes |
|---|---|---|---|---|
| ari | Ari M. | "You" | 3D illustrated avatar | The demo user |
| nick | Nick O. | Nick | 3D avatar | |
| rebecca | Rebecca H. | Rebecca | 3D avatar | |
| william | William C. | William | 3D avatar | |
| phil | Phil D. | Phil | 3D avatar | Last to vote |
| jess | Jess M. | Jess | 3D avatar | |
| ren | Ren Takahashi | Ren | **Initials "RT"** on Avatar/Ren colour | New tonight; no photo yet on purpose |

Contacts shown in the Add-buddy search: Marta Lopes (ML), Hugo Silva (HS), initials avatars.

Avatars come from the Material 3 3D avatar kit (placeholder, credit in the presentation). The PNGs in `public/assets/avatars/` are **already cropped to the face and already circular** — render them as they are, with no extra zoom or cropping.

### Trips (Home)
- **Lisbon**, 12–16 Sep, you + 5 buddies (+ Ren tonight). Happening now.
- **Porto**, 3–5 Oct, 4 buddies, in 17 days.
- **Berlin**, 27–30 Nov, 5 buddies, in 2 months.
- Stamps collected (past trips): **England, Spain, Italy, France** (checked against Figma frame `165:24924`; Greece and Portugal are not on Home). Files `stamps/england.png`, `spain.png`, `italy.png`, `france.png`, tilted in code.

### Lisbon itinerary, Wed 16 Sep (Today)
| Time | Item | Detail | State |
|---|---|---|---|
| 10:00 | Pastéis de Belém | Breakfast · Belém · €18 | done |
| 15:00 | Tram 28 to Graça | Praça Martim Moniz | done |
| 18:30 | Sunset at Miradouro | Viewpoint · free · 12 min walk | next |
| 20:30 | Dinner | Nothing booked yet · all 6 of you are free | **open slot** → later "Taberna da Rua das Flores" |

Section header shows "2 of 4 done".

### Poll: "Where are we eating tonight?"
Asked by Ari, for dinner at 20:30. Closes in 20 min or when all 7 have voted.

| Option | Line | Photo | Icon |
|---|---|---|---|
| Taberna da Rua das Flores | Cosy tasca · €€ · 6 min walk | restaurant photo | bowl |
| Time Out Market | Buzzy food hall · € · 11 min walk | restaurant photo | fork & knife |
| Cervejaria Ramiro | Seafood feast · €€€ · 9 min by tram | restaurant photo | fish |

Votes: Taberna = Ari, Rebecca, William (+ Phil last) · Time Out = Nick, Ren · Ramiro = Jess.
Live state shown on screen 05: 3 · 2 · 1, 6 of 7 voted, waiting on Phil. Final: **Won 4 · 2 · 1**.

### Dinner bill (Taberna, paid by Ari): €190
| Item | Price | Shared by | Each |
|---|---|---|---|
| Mains to share | €98 | all 7 | €14 |
| Petiscos & bread | €42 | all 7 | €6 |
| Vinho verde × 2 | €50 | 5 (Nick and Ren skipped) | €10 |

Shares: Nick and Ren **€20**; everyone else **€30**. Check: 2×20 + 5×30 = 190.

### Balances
Opening balances before dinner (from the 14 earlier expenses, €1,094 total; Ren has none, per A2):
Ari −30 · Nick +50 · Phil −30 · Rebecca −25 · William +15 · Jess +20 · Ren 0 (sum 0).

After dinner (Ari paid 190): Ari **+130** · Nick +30 · Phil −60 · Rebecca −55 · William −15 · Jess −10 · Ren −20 (sum 0).
Trip total: **€1,284 over 15 expenses, 5 days**.

Netted transfers (exactly these 5, shown on screen 09):
1. Phil → You €60
2. Rebecca → You €55
3. William → You €15
4. Ren → Nick €20
5. Jess → Nick €10

Netting algorithm: minimise the number of transfers. Prefer exact debtor/creditor matches and subsets that sum exactly to a creditor's balance, then fall back to greedy largest-first. Unit-test that the balances above produce exactly the 5 transfers above.

Settlement times (screen 11): Ren→Nick 22:14 · Phil→You 22:16 · Rebecca→You 22:18 · William→You 22:20 · Jess→Nick 22:22.

### Clock (status bar) per screen
18:05 Home → New poll and Live poll · 18:25 poll closes (06) · 22:10 logging the dinner (07/08) · 22:12 balances (09) · 22:14 Ren pays (10) · 22:25 squared up (11).

## 4. Screens
Figma file `KhaiFU0rSdVKHHoM5r7ry6`, page "Hi-Fidelity Screens". Build in this order.

| # | Screen | Figma node | Whose phone |
|---|---|---|---|
| 01 | Home | `162:429` | Ari |
| 02 | Trip · Lisbon (Itinerary tab) | `122:7866` | Ari |
| 03 | Add Ren (Buddies sheet) | `163:2180` | Ari |
| 04 | New poll (sheet) | `164:2379` | Ari |
| 04b | Poll notification (lock screen) | `166:2578` | Nick |
| 04c | Vote (buddy view) | `166:2631` | Nick |
| 05 | Live poll | `84:169` | Ari |
| 06 | Plan updated | `167:2903` | Ari |
| 07 | Log the dinner (expense sheet) | `168:2777` | Ari |
| 08 | Split by item | `169:2976` | Ari |
| 09 | Balances (Expenses tab) | `170:3175` | Ari |
| 10 | Ren settles | `171:3175` | Ren |
| 11 | Squared up | `172:3175` | Ari |
| 11B | Squared up + stamp collected (alternative) | `172:3255` | Ari |

Screens 02 and 05 are the two key high-fidelity screens from the brief and the visual reference for the rest. Screens 04b, 04c and 11B were not in the original wireflow.

### 01 Home
- Header: Ari avatar, "Hi Ari", "3 trips with your crew"; notifications button (red unread dot) and "+" new trip.
- "Your trips" title. "HAPPENING NOW" label with green dot.
- **Ticket card** (the trip hero, same component as screen 02): LISBON, 12–16 Sep, `stamps/portugal-ticket.png` (no country name) tilted ~20° in code. Below it a white stub: "Tonight · 20:30 / Dinner · not decided yet", dark arrow button, avatars "You + 5 buddies".
- "Coming up": Porto (Sky) and Berlin (Blush) cards with "In 17 days"/"In 2 months" pill and an empty dashed **stamp slot** (stamps are earned after a trip).
- "Your stamps · 4 countries": row of stamp thumbnails — England, Spain, Italy, France, in that
  order — overlapping and tilted counter-clockwise in code (the PNGs are flat). Figma has them all
  at scale 0.4275 of the 300 × 316 component, rotated −11.6° / −5.1° / −28.5° / −33.6°, in a row
  that starts 26 px left of the content column so England bleeds off the edge. The exact offsets
  live in `src/data/assets.ts` as `homeStamps`.
- Tap ticket, stub or arrow → 02.

### 02 Trip · Lisbon (Itinerary)
- Nav: back, buddy stack (3 avatars + "+3") and lime "+" to add a buddy.
- Ticket hero (Anton "LISBON", dates, `stamps/portugal-ticket.png` tilted ~20° in code). No "last night"/"day x of y" chips: the date lives in one place.
- Day strip Sat 12 → Today 16 (Today selected, dark).
- "TODAY'S PLAN · 2 of 4 done". Vertical timeline: time column, node, card. Done items faded. Sunset card is "Next" (warm gradient, "12 min walk"). Dinner is the **dashed violet open slot** with "Ask the group" (violet primary).
- Floating tab bar (Itinerary / Expenses) + dark "+" FAB, with a fade behind.
- Buddy stack or lime "+" → 03. "Ask the group" → 04.

### 03 Add Ren (sheet over 02)
- Scrim over the trip. Sheet: "Buddies · 6 on this trip", row of current buddies (Ari labelled "You"), search field with "Ren", results: **Ren Takahashi** selected (lime row, check), Marta Lopes, Hugo Silva.
- Info row: "Joins from tonight · Earlier expenses stay out of his share".
- Buttons: "Invite link" (outline), "Add Ren" (dark).
- Add Ren → sheet closes, buddy stack becomes "+4", toast "Ren joined the trip · Everyone was told". Continue to 04 if the user came from "Ask the group"; otherwise stay on 02.

### 04 New poll (sheet)
- Toast from step 03 still visible at top. Sheet: "New poll" + violet pill "Dinner · 20:30" (the slot it fills).
- Question: "Where are we eating tonight?" (editable, underlined).
- "3 places near you" + "+ Add a place". Three option rows (photo with icon badge, name, line, remove ×).
- Deadline row: "Closes in 20 min · or as soon as all 7 have voted" (tap to change).
- "Send to 6 buddies" → 05 (Ari's view) and triggers 04b on the demo's "other phones".

### 04b Poll notification (Nick's lock screen)
- Wallpaper: the photo `assets/lockscreen-wallpaper.jpg` (`object-fit: cover`, ~`52% center`) under the **Legibility shade** gradient (`--gradient-legibility-shade`, Figma node `166:2579`). It is a night-out street photo — not a stamp painting. Then the date and time, and the “On Nick’s phone” lime pill.
- Notification: TripUp · Lisbon · now — "Ari started a poll: Where are we eating tonight? Tap to vote, closes in 20 min." Older: "Ren joined the trip for tonight · 2m ago".
- Tap → 04c.

### 04c Vote (Nick's view)
- Close (×), "On Nick's phone", Live pill with countdown.
- Same question header; ticker "Rebecca voted · 1 min ago".
- Options as selectable cards (radio). Selected card has a 2 px ink border and filled check. **Results are hidden until you vote** (avoids herd voting); note "5 of 7 have voted · results show once you vote".
- "Vote for Time Out Market" (label follows the selection). After voting, show the live results view (same layout as 05 without the asker controls).

### 05 Live poll (Ari's view)
- Back, Live pill "closes in mm:ss" (counts down every second).
- "Ari asked · for dinner at 20:30" (in code: show "You asked" when the viewer is the creator), question title.
- Live ticker: latest vote event, animates in ("Nick voted Time Out Market · just now").
- Option cards: photo tile + name + line, progress bar, voter faces, "3 votes". Leader card is lime; "Your vote" chip on Ari's pick. Bars and counts animate when votes arrive.
- "6 of 7 voted · Waiting on Phil" with dashed pending avatar and **Nudge** (lilac). Nudge → toast "Phil was nudged"; simulated Phil votes Taberna ~2 s later → all voted → poll auto-closes → 06.
- "Change vote" (outline) and "Close poll now" (dark, only for the creator) → closes → 06.

### 06 Plan updated
- Back on the trip at 18:25. Toast: "Poll closed · Taberna won / Added to the plan for 20:30".
- The dashed dinner slot **morphs** into a lime card with ink border: "Taberna da Rua das Flores", dark pill "Won 4 · 2 · 1", "6 min walk", buttons "Map" (outline) and "Log expense" (dark). Timeline node turns solid violet.
- Log expense → 07.

### 07 Log the dinner (sheet)
- "New expense" + "Scan receipt" (lilac pill; not functional in the prototype, show a toast "Coming soon").
- Linked plan chip (lime): photo, "Dinner · Taberna da Rua das Flores", 20:30.
- Amount "€190,00" with caret; custom keypad enters the amount.
- "Paid by · You" (row, chevron), "Split" segmented: Equally / **By item**.
- "Next: who had what" → 08 (if Equally: skip 08 and log directly).

### 08 Split by item (sheet)
- Sentence header: "€190 for [dinner at Taberna], paid by [you], split by item." (lime and lilac inline chips).
- Item rows: Mains to share €98 (Everyone · 7 · €14 each), Petiscos & bread €42 (Everyone · 7 · €6 each), Vinho verde × 2 €50 expanded (ink border): "Who's sharing this? Tap to leave someone out." 7 avatars; tapping toggles; skipped people are faded with "Skipped" in alert red. Per-person amounts recompute live.
- Summary: "Ren & Nick pay €20 · Everyone else €30".
- "Back" / "Log expense" → 09.

### 09 Balances (Expenses tab)
- Title "Lisbon" (Rubik, Title 1) and "€1,284 spent · 15 expenses". Tab bar: Expenses active.
- Toast: "Dinner logged · €190 / You paid, so +€160 to you. Everyone's updated."
- Lilac card: "You're owed" + pill "was −€30 before dinner", **€130** (large), "Phil, Rebecca and William pay you. Ren and Jess pay Nick."
- "Settle up · 5 transfers, netted": rows from → to with amounts; rows paying you are green-tinted.
- Demo: switching to Ren's phone → 10.

### 10 Ren settles (Ren's phone)
- Close (×), "On Ren's phone". Amount card: RT → Nick, "You owe Nick", **€20,00**, "Dinner at Taberna · Food only · you skipped the wine".
- "Pay with": Apple Pay (default, selected), Card Visa ·· 4410, PayPal, Bank transfer. Radio selection.
- "Nick is told the moment it's sent" + "Pay Nick €20" (dark, with method icon). Tap → short processing (Apple Pay-like sheet or spinner ~1 s) → success → back to Ari's phone; the Ren → Nick row flips to done.
- Demo: remaining transfers complete automatically one by one (~0.8 s apart) → 11.

### 11 Squared up
- Lime card: dark check, all 7 faces, "Lisbon is squared up." "All 5 transfers are done and everyone got the news. Nobody owes anybody."
- Receipt list with green checks and times; footer "€1,284 over 5 days · 7 buddies".
- "Share recap" (outline; native share sheet or toast) and "Back to trip".

### 11B Squared up + stamp collected (alternative ending)
- "All squared up" lime badge; `stamps/portugal.png` (the titled "PORTUGAL" stamp) **stamps down** (scale 1.3 → 1, slight rotation, soft shadow settles); "Lisbon is squared up." "All 5 transfers are done. Your Portugal stamp is now in your collection."; stat pills; "5 transfers · 22:14 – 22:22" row; same actions.
- Ship both endings behind a demo toggle so the team can compare. Home's "Your stamps" updates to 5 countries after 11B — Portugal joins England, Spain, Italy and France.

## 5. Real-time simulation and demo controls
- A small **demo panel** (collapsible, outside the phone frame on desktop; long-press the status bar on mobile) with: "View as: Ari / Nick / Ren", "Jump to screen", "Reset demo", "Ending: A / B", speed.
- Simulated events: after "Send to 6 buddies", votes from the other buddies arrive over ~6 s (Rebecca, William, Jess, Ren, Nick), leaving Phil pending; the ticker and bars update on each. Nudge triggers Phil's vote.
- When the demo switches phones, the state is shared: Nick's vote in 04c shows up on Ari's 05.

## 6. Edge cases worth handling (lightweight)
- Close poll early with a tie → leader by earliest vote; show "Tie broken by first vote".
- Nobody voted → "Close poll" disabled.
- Un-skipping someone on the wine re-computes shares instantly.
- Amount 0 → "Next" disabled.

## 7. Out of scope
Account creation, real payments, maps, receipt scanning, push infrastructure, multiple trips' detail screens (Porto/Berlin can show a simple "Coming soon" trip).
