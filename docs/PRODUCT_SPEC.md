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

### When each screen happens
The evening runs 18:05 → 22:25: 18:05 Home, the new poll and the live poll · 18:25 the poll closes
(06) · 22:10 logging the dinner (07/08) · 22:12 the expenses tab (09) · 22:14 Ren pays (10) ·
22:25 squared up (11). The settlement times appear on screen; the rest is the story's clock, and
is no longer drawn anywhere now that there is no status bar.

## 4. Screens
Design file page "Hi-Fidelity Screens". Built in this order; each screen's build note is in
`docs/screens/`.

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
| 12 | Quick add (FAB sheet) | `4093:2356` | Ari |
| 13 | New poll · what are we deciding (filled) | `4094:2129` | Ari |
| 13b | Time of the event (wheel picker) | `4095:2140` | Ari |
| 13c | Deadline (wheel picker) | `4095:2389` | Ari |
| 14 | Trip · an extra poll on the plan | `4101:2206` | Ari |
| 15 | Notifications | `4098:2195` | Ari |
| 16 | Log expense (from quick add) | `4097:2350` | Ari |
| 17 | Expense detail (sheet over 09) | `4098:2440` | Ari |
| 18 | New poll · empty state | `4097:2617` | Ari |

### Scroll and breathing room
Long screens scroll; the **scrolling column** gets 110 pt of empty ground below its last item so
content can always be dragged clear of the floating bar and never dead-stops at the viewport edge.

This is padding on the scrolling column only. **Docked controls never scroll and never move below
the fold** — the floating tab bar, and any primary action pinned to the bottom of a screen or a
sheet (the vote button on 04c, the pay button on 10, the sheet buttons on 03b, 04, 07, 08). A
screen must never be reachable in a state where its primary action is off-screen. If a frame is
taller than 844 in Figma, that extra height is content, not chrome.

**No device chrome.** The frames draw an iOS status bar (y 0–50) and a home indicator; the build
draws neither. Together they cost about 60 pt of a 844 pt screen without telling anyone anything
the real OS isn't already showing, so the space goes to the content — and a frame coordinate is a
screen coordinate.

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
- Buddy stack or lime "+" → 03a. "Ask the group" → **13** (the question step), then 04.

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
- Add Ren → sheet closes and you land **back on 02**, whichever way you came in. The buddy stack
  becomes "+4", the dinner slot's head count becomes "all 7 of you are free", and the toast "Ren
  joined the trip · Everyone was told" lands there. Adding someone is a complete act: it never
  pushes on into the poll, which would answer a question nobody asked yet and leave the person
  demoing two screens from where they started.

### 04 New poll · the places step (sheet)
Step **2** of both routes into a poll — the question, the time and the deadline are settled on 13
before this opens.
- Toast from step 03 still visible at top. Sheet: "New poll" + violet pill naming what the poll is
  for ("Dinner · 20:30" from the slot; the chosen time from the quick add).
- Question (editable, underlined) — carried in from 13, still correctable here.
- **A search field, in this sheet.** Type and the list below becomes results you can add; clear it
  and you are back to the poll's own places. It used to be a second sheet stacked on this one,
  which read as a bug. One surface, height following its content — see §6.0 "One sheet at a time".
- Option rows (photo with icon badge, name, line, remove ×); the last two can't be removed.
- Deadline row: "Closes in 20 min · or as soon as all N have voted" (tap to change).
- **Every head count is derived** from who is on the trip: "Send to 5 buddies" before Ren joins,
  "6 buddies" after. → 05 (Ari's view) and triggers 04b on the demo's "other phones".

### 04b Poll notification (Nic's lock screen)
- Wallpaper: the photo `assets/lockscreen-wallpaper.jpg` (`object-fit: cover`, ~`52% center`) under the **Legibility shade** gradient (`--gradient-legibility-shade`, Figma node `166:2579`). It is a night-out street photo — not a stamp painting. Then the date and time, and the “On Nic’s phone” lime pill.
- Notification: TripUp · Lisbon · now — "Ari started a poll: Where are we eating tonight? Tap to vote, closes in 20 min." Older: "Ren joined the trip for tonight · 2m ago".
- Tap → 04c.

### 04c Vote (Nic's view)
- Close (×), "On Nic's phone", Live pill with countdown.
- Same question header; ticker "Bea voted · 1 min ago".
- Options as selectable cards (radio). Selected card has a 2 px ink border and filled check. **Results are hidden until you vote** (avoids herd voting); note "5 of 7 have voted · results show once you vote".
- "Vote for Time Out Market" (label follows the selection). After voting, show the live results view (same layout as 05 without the asker controls).
- **Closing (×) lands on the trip, never back on the lock screen.** The notification is how Nic got
  here; it is an entry point, not somewhere to return to — you don't leave an app into your own
  lock screen. The same rule sends Ren's settle sheet back to the trip's Expenses tab.

### 05 Live poll (Ari's view)
- Back, Live pill "closes in mm:ss" (counts down every second).
- "Ari asked · for dinner at 20:30" (in code: show "You asked" when the viewer is the creator), question title.
- Live ticker: latest vote event, animates in ("Nic voted Time Out Market · just now").
- Option cards: photo tile + name + line, progress bar, voter faces, "3 votes". Leader card is lime; "Your vote" chip on Ari's pick. Bars and counts animate when votes arrive.
- "6 of 7 voted · Waiting on Sven" with dashed pending avatar and **Nudge** (lilac). Nudge → toast "Sven was nudged"; simulated Sven votes Taberna ~2 s later → all voted → poll auto-closes → 06.
- "Change vote" (outline) and "Close poll now" (dark, only for the creator) → closes → 06.

### 06 Plan updated
- Back on the trip at 18:25. Toast: "Poll closed · Taberna won / Added to the plan for 20:30".
- The dashed dinner slot **morphs** into a lime card with an ink border: the restaurant's **48 pt photo tile** (the same tile as the poll option card on 05 — wire it as a shared element), "Taberna da Rua das Flores", and a meta line "Dinner · 6 min walk". Actions: **"Log expense"** (dark, 201 wide) and **"Map"** (icon only, 43 wide, no background). Timeline node turns solid violet. The buddy stack reads "+4" — Ren is on the trip by now.
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

### 11 Squared up + stamp collected — **the ending**
- "All squared up" lime badge; `stamps/portugal.png` (the titled "PORTUGAL" stamp) **stamps down** (scale 1.3 → 1, slight rotation, soft shadow settles); "Lisbon is squared up." "All 5 transfers are done. Your Portugal stamp is now in your collection."; stat pills; "5 transfers · 22:14 – 22:22" row; "Share recap" and "Back to trip".
- **There is one ending.** A plainer version without the stamp used to ship alongside it behind a
  demo toggle; two endings made the finish ambiguous, and a finished trip earns the stamp. Its
  receipt — the per-transfer list with green checks and times, footer "€1,284 over 5 days ·
  7 buddies" — is now what the **"5 transfers · 22:14 – 22:22" row opens**, as a sheet.
- Home's "Your stamps" updates to 5 countries after this — Portugal joins England, Spain, Italy
  and France.


### 12 Quick add (sheet over 02)
The FAB opens a **bottom sheet**, not an expanding overlay. Same `Sheet` component, spring and scrim
as every other sheet; the screen behind scales to 0.96.
- Two tiles: **New poll** and **Log expense** — `Accent/Violet Tint`, radius 16, 66 high. Both are
  real actions. (An earlier draft had a third "Smart add" tile; it was cut, so every tile works.)
- Three rows: **Transport** (Flight, train, bus…), **Stay** (Hotel, hostel, Airbnb…), **Spot or
  event** (Restaurant, museum, beach…).
- **The three rows are signposts, not flows.** Each closes the sheet and shows a toast — "Adding
  transport isn't in this prototype yet", and so on. This is deliberate: the menu states the
  information architecture, and an honest toast beats a dead tap. Do not build those flows.
- New poll → 18. Log expense → 16.

### 13 / 18 New poll · what are we deciding (sheet)
**18** (`4097:2617`) is how it opens: placeholder question, both rows read "Not set", Continue
disabled. **13** (`4094:2129`) is the same sheet filled in.
- Question field (Ground, radius 16) with a violet caret.
- "Time of the event" → 13b. "Deadline" → 13c. Values sit right-aligned with a chevron; grey and
  "Not set" until chosen, then ink and semibold.
- Cancel / Continue. Continue is disabled until there is a question **and** an event time.
- Continue → the **existing places step (04)**. Do not build a second places step.

**Two entry points, one shape.** Both routes go 18/13 → 04 → send:
- **FAB → New poll** → the sheet opens empty (18): placeholder question, both rows "Not set".
- **Dinner slot → "Ask the group"** → the same sheet opens **filled** (13) and carries the slot's
  violet pill above the heading: the question, the time and the deadline are already in, and are
  all still editable.

An earlier draft sent the slot straight to 04 to save a step. It made the two ways of making a poll
look like two different features; the saving wasn't worth the inconsistency. Same store action,
same poll object, same two steps — the slot route just arrives with its answers already filled in.

### 13b / 13c Wheel picker (sheet over 13)
One component, two titles. Three columns — day, hour, minute — five visible rows of 44. The selected
row sits on a Ground band (radius 12, inset 20); neighbours drop to 55% opacity at ±1 and 22% at ±2.
The day column shows **"Today"** for the current date. Clear / Done.
- Build it as a real scrolling wheel with snap (`scroll-snap-type: y mandatory` on the column,
  `scroll-snap-align: center` on the cells) so it carries native momentum. Not a `<select>`.
- **The event time cannot be in the past.** Options start from the current clock; earlier times are
  not offered.

### 14 Trip · an extra poll on the plan
What the itinerary looks like after a poll is created from the quick add.
- **A new poll never replaces an existing item.** The dinner slot at 20:30 is untouched. The new poll
  is inserted as its own timeline row at the event time chosen in 13 — here **23:00**, after dinner.
- Card is the same open-slot component: dashed violet, question as the title, "Live · closes in
  18:24 · 2 of 7 voted", violet **See the poll** → 05.
- Section header counts the new item: "2 of 5 done".
- Create five more polls and five more rows appear, in time order, and the day scrolls. Rows are
  ordered by time, always.

### 15 Notifications
Pushed from the bell on 01 and 02; clears the unread dot.
- "Notifications" + "2 new". Groups: TODAY / YESTERDAY / EARLIER.
- Rows: violet unread dot, title (who did what, with the amount), sub-line (the item and your
  share), time right-aligned. Content is drawn from the ledger in §3 — no invented events.

### 16 Log expense (from quick add)
Screen 07 with one difference: there is no plan to link to, so the lime linked-plan chip is replaced
by a **"what's this for"** field (Ground, radius 16). Same amount keypad, same Paid by / Split rows.
One prop on the existing component, not a new screen.

### 17 Expense detail (sheet over 09)
Tapping any ledger row on 09 opens it, read-only.
- Title, "Tue 15 Sep · 21:30 · paid by Kofi", the amount as Title 1 with a "your share €25" pill.
- "SPLIT EQUALLY · 6 OF YOU" and the six people with their share; the payer is marked "· paid".
- One dark **Done**. Per-person amounts come from the split logic in `src/domain/`, never hard-coded.

## 5. Real-time simulation and demo controls
- A small **demo panel** (collapsible, outside the phone frame on desktop) with: "View as: Ari /
  Nic / Ren", "Jump to screen", "Reset demo", speed.
- **The link opens the app, on Home.** No `?screen=` means Home — a shared production link has to
  behave like an app, not like a contents page. The screen index is still there for the team at
  `?screen=index`, and the demo panel reaches every screen directly.
- Simulated events: after "Send to 6 buddies", votes from the other buddies arrive over ~6 s (Bea, Kofi, Mira, Ren, Nic), leaving Sven pending; the ticker and bars update on each. Nudge triggers Sven's vote.
- When the demo switches phones, the state is shared: Nic's vote in 04c shows up on Ari's 05.

## 6. Edge cases worth handling (lightweight)
- Close poll early with a tie → leader by earliest vote; show "Tie broken by first vote".
- Nobody voted → "Close poll" disabled.
- Un-skipping someone on the wine re-computes shares instantly.
- Amount 0 → "Next" disabled.

## 7. Out of scope
Account creation, real payments, maps, receipt scanning, push infrastructure, multiple trips' detail screens (Porto/Berlin can show a simple "Coming soon" trip).
