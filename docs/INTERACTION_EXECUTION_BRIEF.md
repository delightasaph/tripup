# Interaction execution: what's left

Read this after `docs/PRODUCT_SPEC.md` and `docs/DESIGN_SYSTEM.md` §6 ("Motion"). It's a
continuation note, not a fresh spec. **The previous session was paused mid-task by the user, not
crashed or broken** — `git status` / `git diff --stat` shows a large, intentional, uncommitted pass
that already wired press/hover/focus states and shared-element motion across most of the app
(`App.tsx`, `Button.tsx`, `Sheet.tsx`, `Toast.tsx`, `Ticker.tsx`, `Ticket.tsx`, `LivePill.tsx`,
`PollOptionCard.tsx`, `BottomBar.tsx`, `ComingUpCard.tsx`, `DemoPanel.tsx` and most of
`src/screens/`). Read that diff first. Keep what's good — most of it is good. Don't revert or
restart it.

## 0. Fix first — the Itinerary ↔ Expenses switch is doing a full-screen crossfade, not a tab toggle

This is a regression the user has actually seen running and flagged as actively hurting the app:
clicking the Itinerary/Expenses tab currently blurs, glitches, and re-dissolves the *entire phone
screen*, with unrelated elements visibly shifting before the new screen settles. It should instead
read as one small, local control changing state — nothing else on screen should so much as flicker.

**Root cause.** `trip` and `balances` are two fully separate top-level screens
(`src/screens/TripLisbon.tsx`, `src/screens/Balances.tsx`), each rendering its *own* copy of the nav
row (back button, buddy stack) and its *own* `<BottomBar>`. Tapping the "Expenses" tab
(`TripLisbon.tsx`'s `onTabChange`) calls `go('balances')`, which changes the `?screen=` router
param, and `App.tsx`'s `Prototype()` swaps the mounted component via `AnimatePresence`. Because
they're two independent component trees, the *whole tree* unmounts and remounts on every tab
tap — nav row, buddy stack, everything — not just the part that actually differs (the itinerary
timeline vs. the balances cards). The existing `isTabSwitch` special case in `Prototype()` only
softens this (opacity + `scale: 0.99` instead of the normal slide) — it doesn't fix the structural
problem, and the `scale: 0.99` is very likely a direct cause of the blur the user is seeing: animating
a non-integer `scale` on text-heavy content forces the browser to rasterize at a fractional pixel
size for the duration of the transition, which reads as exactly the "fuzzy" look described. Framer
Motion's `layoutId="tab-pill"` on the tab bar's active pill (`BottomBar.tsx`) is the one piece that's
already correct — because both `TripLisbon` and `Balances` are briefly mounted together during the
`AnimatePresence` exit/enter, the pill already slides smoothly between them. That's the *only* thing
that should visibly move. Nothing else should.

**Fix.** Restructure so Itinerary and Expenses are one persistently-mounted screen with two internal
bodies, not two router-level screens:
- Introduce a shared shell (e.g. `TripShell` or fold it into `TripLisbon.tsx`) that owns the nav row
  (back + buddy stack) and the `<BottomBar>` once, permanently mounted — it should never unmount or
  re-render its identity when the tab changes.
- Tab selection becomes local state inside that shell (`const [tab, setTab] = useState<'itinerary' |
  'expenses'>(...)`), not a full router navigation. Keep `/?screen=trip` deep-linkable, and add the
  tab as a second, optional param (`/?screen=trip&tab=expenses`) so `balances`'s existing deep link
  can redirect into it rather than being its own screen.
- Only the differing body — the itinerary `<Timeline>` block vs. the balances cards/settle-up list —
  sits inside a small `AnimatePresence` scoped to just that inner container, not the whole screen.
  That crossfade should be **opacity only, no scale, no blur**, ~150 ms (`DUR_FAST`), and should not
  run any of each body's own mount/entrance animations (list staggers, count-ups) every time you
  toggle back and forth — those should only ever play once, on the very first time that body appears
  in the session, not on every tab switch. Guard this with a "have I already animated in once"
  ref/flag per body, not `AnimatePresence`'s default remount-triggers-entrance behavior.
- Once this lands, delete the `isTabSwitch` branch and the `TAB_SIBLINGS` set from `App.tsx`'s
  `Prototype()` entirely — tab switching should no longer go through the app-level screen transition
  at all, because it's no longer a screen change.
- Verify by rapidly toggling Itinerary ⇄ Expenses several times: only the tab pill and the body
  content should move: nav bar, buddy stack, and the tab bar's own outer chrome must be
  pixel-static throughout, no dissolve, no blur, no flash.

## 1. Confirmed gaps from the earlier audit (still open)

**Live poll has no deadline-edit affordance.** `NewPoll.tsx` already has a full deadline-picker
sheet (`DEADLINE_OPTIONS`, `deadlineOpen` state, `pollDeadlineMinutes`/`setPollDeadline` on the
store) reachable before the poll is sent. `LivePoll.tsx` has nothing equivalent. Build it by reusing
that exact sheet/store pattern, surfaced from an icon on `LivePoll.tsx`'s countdown pill, visible
only when the current viewer is the poll's creator. Extending the deadline mid-poll should re-base
`closesInSeconds` smoothly and push a line through `Ticker.tsx` the same way a vote event does —
e.g. "Ari extended the deadline to 30 min" — so the change is visible to everyone watching live.

**"Add a place" toggles a fixed list of 3, it doesn't search.** The nested sheet in `NewPoll.tsx`
(`addPlaceOpen`) toggles the same 3 `dinnerPoll.places` every time. Add a debounced (~250 ms) text
search over an expanded mock place list (no new photo assets needed — places without an entry in
`placePhotos` fall back to an icon tile), a "Nearby" section shown before typing vs. filtered
results while typing, a brief loading flash on filter, and a "No places found" empty state. Keep the
existing row layout, remove ×, and pop-in animation as they are.

**`PollNotification.tsx` (04b) wasn't touched in the current motion pass.** Give it the same
press/tap feedback and a real transition into `Vote.tsx` on tap, so it isn't the one screen that
still feels static.

Already resolved, don't redo: the FAB's routing (`TripLisbon.tsx`'s `onFabClick`, smart-routes to
New Poll or Log Expense depending on whether dinner is decided) and the deadline picker itself — see
§2 below for what changes about the FAB next.

## 2. ~~The FAB becomes a quick-add menu~~ — SUPERSEDED

**This section is no longer the design.** The container transform described below was built, then
replaced: the FAB now opens an ordinary bottom sheet (screen 12, Figma `4093:2356`) using the same
`Sheet`, spring, scrim and 0.96 backdrop scale as every other sheet in the app, with the content
the frame specifies. See `docs/PRODUCT_SPEC.md` §4 · 12 and `docs/screens/12-quick-add.md`.
`SPRING_FAB_EXPAND` was removed with it. The rest of this section is kept only as a record of what
was tried.

### Original brief (historical)

Right now the FAB does one fixed thing depending on state. Change it to open a small quick-add menu,
with room to grow:
- **Add a poll**
- **Add an expense**
(more actions may be added later — build the menu as a simple list the two items above populate, not
something hard-coded to exactly two rows.)

The interaction should be a **container transform**, not a bottom sheet: the panel visibly grows out
of the FAB itself — same corner, same `transform-origin` as the FAB's own position (bottom-right,
`right: 20, bottom: 28`) — expanding from the FAB's 60×60 circle up into a rounded panel that reaches
a meaningful portion of the screen height (roughly the upper half to two-thirds, not the whole
screen), rather than sliding up from the bottom edge like `Sheet.tsx` does. The FAB's own "+" icon
rotates into an "×" as it expands (reuse the FAB icon-swap idea already used elsewhere, if any — icon
rotates, doesn't hard-cut). Tapping a row in the menu, tapping the "×", or tapping the scrim collapses
the panel back down into the FAB with the reverse of the same motion. Each row gets the same
icon+label press treatment already used elsewhere (`HOVER_SMALL`/`TAP_SMALL`). This is a genuinely
different motion primitive from the sheet spring already in `src/styles/motion.ts` — add it there
(e.g. `SPRING_FAB_EXPAND`) rather than repurposing `SPRING_SHEET`.
