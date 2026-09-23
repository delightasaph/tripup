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
- A6 Everyone has the app; a new friend joins from contacts. (The invite-link affordance was cut
  from 03b to keep the sheet to two actions — see the note in §4.)
- A7 Balances and settling feel like tools people already know.

## 3. Cast and mock data

### People (7 on the trip after Ren joins)
| id | Name | Label on Ari's phone | Avatar | Notes |
|---|---|---|---|---|
| ari | Ari M. | "You" | 3D illustrated avatar | The demo user |
| nic | Nic O. | Nic | 3D avatar | |
| bea | Bea H. | Bea | 3D avatar | |
| kofi | Kofi C. | Kofi | 3D avatar | |
| sven | Sven D. | Sven | 3D avatar | Last to vote |
| mira | Mira M. | Mira | 3D avatar | |
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

Votes: Taberna = Ari, Bea, Kofi (+ Sven last) · Time Out = Nic, Ren · Ramiro = Mira.
Live state shown on screen 05: 3 · 2 · 1, 6 of 7 voted, waiting on Sven. Final: **Won 4 · 2 · 1**.

### Dinner bill (Taberna, paid by Ari): €190
| Item | Price | Shared by | Each |
|---|---|---|---|
| Mains to share | €98 | all 7 | €14 |
| Petiscos & bread | €42 | all 7 | €6 |
| Vinho verde × 2 | €50 | 5 (Nic and Ren skipped) | €10 |

Shares: Nic and Ren **€20**; everyone else **€30**. Check: 2×20 + 5×30 = 190.

### Balances
Opening balances before dinner (from the 14 earlier expenses, €1,094 total; Ren has none, per A2):
Ari −30 · Nic +50 · Sven −30 · Bea −25 · Kofi +15 · Mira +20 · Ren 0 (sum 0).

After dinner (Ari paid 190): Ari **+130** · Nic +30 · Sven −60 · Bea −55 · Kofi −15 · Mira −10 · Ren −20 (sum 0).
Trip total: **€1,284 over 15 expenses, 5 days**.

Netted transfers (exactly these 5, shown on screen 09):
1. Sven → You €60
2. Bea → You €55
3. Kofi → You €15
4. Ren → Nic €20
5. Mira → Nic €10

Netting algorithm: minimise the number of transfers. Prefer exact debtor/creditor matches and subsets that sum exactly to a creditor's balance, then fall back to greedy largest-first. Unit-test that the balances above produce exactly the 5 transfers above.

Settlement times (screen 11): Ren→Nic 22:14 · Sven→You 22:16 · Bea→You 22:18 · Kofi→You 22:20 · Mira→Nic 22:22.

### Clock (status bar) per screen
18:05 Home → New poll and Live poll · 18:25 poll closes (06) · 22:10 logging the dinner (07/08) · 22:12 balances (09) · 22:14 Ren pays (10) · 22:25 squared up (11).

## 4. Screens
Figma file `qITM47IS3nfWVV3KxyH3pv`, page "Hi-Fidelity Screens". Build in this order.

| # | Screen | Figma node | Whose phone |
|---|---|---|---|
| 01 | Home | `162:429` | Ari |
| 02 | Trip · Lisbon (Itinerary tab) | `4064:17467` | Ari |
| 03a | Buddies (group view sheet) | `4058:3678` | Ari |
| 03b | Add a buddy (search sheet) | `4058:3935` | Ari |
| 04 | New poll (sheet) | `164:2379` | Ari |
| 04b | Poll notification (lock screen) | `166:2578` | Nic |
| 04c | Vote (buddy view) | `166:2631` | Nic |
| 05 | Live poll | `84:169` | Ari |
| 06 | Plan updated | `4064:18080` | Ari |
| 07 | Log the dinner (expense sheet) | `168:2777` | Ari |
| 08 | Split by item | `169:2976` | Ari |
| 09 | Balances (Expenses tab) | `4048:16899` | Ari |
| 10 | Ren settles | `171:3175` | Ren |
| 11 | Squared up | `172:3175` | Ari |
| 11B | Squared up + stamp collected (alternative) | `172:3255` | Ari |

### Scroll and breathing room
Long screens scroll; the **scrolling column** gets 110 pt of empty ground below its last item so
content can always be dragged clear of the floating bar and never dead-stops at the viewport edge.

This is padding on the scrolling column only. **Docked controls never scroll and never move below
the fold** — the floating tab bar, and any primary action pinned to the bottom of a screen or a
sheet (the vote button on 04c, the pay button on 10, the sheet buttons on 03b, 04, 07, 08). A
screen must never be reachable in a state where its primary action is off-screen. If a frame is
taller than 844 in Figma, that extra height is content, not chrome.

No home indicator: the frames draw one, the build leaves it out.

Screens 02 and 05 are the two key high-fidelity screens from the brief and the visual reference for the rest. Screens 04b, 04c and 11B were not in the original wireflow.

### 01 Home
- Header: Ari avatar, "Hi Ari", **"Last night in Lisbon"**; notifications button (red unread dot) and "+" new trip.
- "Your trips" title. "HAPPENING NOW" label with green dot.
- **Trip card** — the ticket at its **tall** size, 350 × 271, radius 16. Same component as screen 02, same art; the ticket and the old white stub have merged into one card. LISBON, 12–16 Sep, and a frosted **"Next up"** panel inside it at 12/136: dinner icon tile, "Tonight · 20:30 / Dinner · not decided yet", the buddy stack ("+3": six people until Ren joins) and a violet "Ask the group" pill.
- "Coming up": Porto (**Sky**) and Berlin (**Blush**) cards — "In 17 days"/"In 2 months" pill, a "more" button, the name, the dates, and the crew as a 22 pt stack with a "+N" chip. No stamp slot on these cards any more.
- **Stamps** section: a centred "Stamps" heading over "Collect stamps with every successful trip",
  then the row of thumbnails — England, Spain, Italy, France, in that order — overlapping and
  tilted counter-clockwise in code (the PNGs are flat). Figma has them all at scale 0.4275 of the
  300 × 316 component, rotated −11.6° / −5.1° / −28.5° / −33.6°, in a row that starts **15 px**
  left of the content column so England bleeds off the edge. The exact offsets live in
  `src/data/assets.ts` as `homeStamps`. Below the row, a full-width dark pill:
  "See your Stamps collection".
- Tap ticket, stub or arrow → 02.

### 02 Trip · Lisbon (Itinerary)
- Nav: back, buddy stack (3 avatars + "+3") and lime "+" to add a buddy.
- Ticket hero (Anton "LISBON", dates, `stamps/portugal-ticket.png` tilted ~20° in code). No "last night"/"day x of y" chips: the date lives in one place.
- Day strip Sat 12 → Today 16 (Today selected, dark).
- "TODAY'S PLAN · 2 of 4 done". Vertical timeline: time column, node, card. Done items faded. Sunset card is "Next" (warm gradient, "12 min walk", plus a 36 pt white round **directions** button at its bottom-right — only on the next item, never on done items). Dinner is the **dashed violet open slot** with "Ask the group" (violet primary).
- Floating tab bar (Itinerary / Expenses) + dark "+" FAB, with a fade behind.
- Buddy stack or lime "+" → 03a. "Ask the group" → 04.

### 03a Buddies (sheet over 02)
The group view. The brief's wording is two beats — Ari "taps into the current trip to open up a
group view **and** adds Ren" — so seeing who is on the trip and adding someone are separate steps.
- Scrim over the trip. Sheet hugs its content (short): "Buddies" + "6 on this trip".
- Row of the six current buddies with names under each avatar; Ari is labelled "You".
- One row: violet-tint "+" tile, **"Add a buddy"** / "Anyone on the trip can add people" (assumption
  A1, stated on screen), chevron right.
- Add a buddy → 03b.

### 03b Add a buddy (sheet over 02)
- Header: "Add a buddy" left, "6 on this trip" right. **No back arrow** — the sheet carries two
  actions already, and a third control at the top makes it top-heavy.
- Search field with "Ren" typed. Results: **Ren Takahashi** selected (lime row, check), Marta Lopes,
  Hugo Silva.
- Info row: "Joins from tonight · Earlier expenses stay out of their share".
- Buttons: **"Cancel"** (outline, returns to 03a) and "Add Ren" (dark). Cancel is the way back;
  dragging the sheet down does the same.
- Add Ren → sheet closes, buddy stack becomes "+4", toast "Ren joined the trip · Everyone was told".
  Continue to 04 if the user came from "Ask the group"; otherwise stay on 02.

### 04 New poll (sheet)
- Toast from step 03 still visible at top. Sheet: "New poll" + violet pill "Dinner · 20:30" (the slot it fills).
- Question: "Where are we eating tonight?" (editable, underlined).
- "3 places near you" + "+ Add a place". Three option rows (photo with icon badge, name, line, remove ×).
- Deadline row: "Closes in 20 min · or as soon as all 7 have voted" (tap to change).
- "Send to 6 buddies" → 05 (Ari's view) and triggers 04b on the demo's "other phones".

### 04b Poll notification (Nic's lock screen)
- Wallpaper: the photo `assets/lockscreen-wallpaper.jpg` (`object-fit: cover`, ~`52% center`) under the **Legibility shade** gradient (`--gradient-legibility-shade`, Figma node `166:2579`). It is a night-out street photo — not a stamp painting. Then the date and time, and the “On Nic’s phone” lime pill.
- Notification: TripUp · Lisbon · now — "Ari started a poll: Where are we eating tonight? Tap to vote, closes in 20 min." Older: "Ren joined the trip for tonight · 2m ago".
- Tap → 04c.

### 04c Vote (Nic's view)
- Close (×), "On Nic's phone", Live pill with countdown.
- Same question header; ticker "Bea voted · 1 min ago".
- Options as selectable cards (radio). Selected card has a 2 px ink border and filled check. **Results are hidden until you vote** (avoids herd voting); note "5 of 7 have voted · results show once you vote".
- "Vote for Time Out Market" (label follows the selection). After voting, show the live results view (same layout as 05 without the asker controls).

### 05 Live poll (Ari's view)
- Back, Live pill "closes in mm:ss" (counts down every second).
- "Ari asked · for dinner at 20:30" (in code: show "You asked" when the viewer is the creator), question title.
- Live ticker: latest vote event, animates in ("Nic voted Time Out Market · just now").
- Option cards: photo tile + name + line, progress bar, voter faces, "3 votes". Leader card is lime; "Your vote" chip on Ari's pick. Bars and counts animate when votes arrive.
- "6 of 7 voted · Waiting on Sven" with dashed pending avatar and **Nudge** (lilac). Nudge → toast "Sven was nudged"; simulated Sven votes Taberna ~2 s later → all voted → poll auto-closes → 06.
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
- Summary: "Ren & Nic pay €20 · Everyone else €30".
- "Back" / "Log expense" → 09.

### 09 Balances (Expenses tab)
- Title "Lisbon" (Rubik, Title 1) and "€1,284 spent · 15 expenses". Tab bar: Expenses active.
- Toast: "Dinner logged · €190 / You paid, so +€160 to you. Everyone's updated."
- Lilac card: "You're owed" + pill "was −€30 before dinner", **€130** (large), "Sven, Bea and Kofi pay you. Ren and Mira pay Nic."
- "Settle up · 5 transfers, netted": rows from → to with amounts; rows paying you are green-tinted.
- Demo: switching to Ren's phone → 10.

### 10 Ren settles (Ren's phone)
- Close (×), "On Ren's phone". Amount card: RT → Nic, "You owe Nic", **€20,00**, "Dinner at Taberna · Food only · you skipped the wine".
- "Pay with": Apple Pay (default, selected), Card Visa ·· 4410, PayPal, Bank transfer. Radio selection.
- "Nic is told the moment it's sent" + "Pay Nic €20" (dark, with method icon). Tap → short processing (Apple Pay-like sheet or spinner ~1 s) → success → back to Ari's phone; the Ren → Nic row flips to done.
- Demo: remaining transfers complete automatically one by one (~0.8 s apart) → 11.

### 11 Squared up
- Lime card: dark check, all 7 faces, "Lisbon is squared up." "All 5 transfers are done and everyone got the news. Nobody owes anybody."
- Receipt list with green checks and times; footer "€1,284 over 5 days · 7 buddies".
- "Share recap" (outline; native share sheet or toast) and "Back to trip".

### 11B Squared up + stamp collected (alternative ending)
- "All squared up" lime badge; `stamps/portugal.png` (the titled "PORTUGAL" stamp) **stamps down** (scale 1.3 → 1, slight rotation, soft shadow settles); "Lisbon is squared up." "All 5 transfers are done. Your Portugal stamp is now in your collection."; stat pills; "5 transfers · 22:14 – 22:22" row; same actions.
- Ship both endings behind a demo toggle so the team can compare. Home's "Your stamps" updates to 5 countries after 11B — Portugal joins England, Spain, Italy and France.

## 5. Real-time simulation and demo controls
- A small **demo panel** (collapsible, outside the phone frame on desktop; long-press the status bar on mobile) with: "View as: Ari / Nic / Ren", "Jump to screen", "Reset demo", "Ending: A / B", speed.
- Simulated events: after "Send to 6 buddies", votes from the other buddies arrive over ~6 s (Bea, Kofi, Mira, Ren, Nic), leaving Sven pending; the ticker and bars update on each. Nudge triggers Sven's vote.
- When the demo switches phones, the state is shared: Nic's vote in 04c shows up on Ari's 05.

## 6. Edge cases worth handling (lightweight)
- Close poll early with a tie → leader by earliest vote; show "Tie broken by first vote".
- Nobody voted → "Close poll" disabled.
- Un-skipping someone on the wine re-computes shares instantly.
- Amount 0 → "Next" disabled.

## 7. Out of scope
Account creation, real payments, maps, receipt scanning, push infrastructure, multiple trips' detail screens (Porto/Berlin can show a simple "Coming soon" trip).
