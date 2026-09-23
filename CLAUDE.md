# TripUp — coded prototype

TripUp is a mobile app for organising group trips: friends plan the itinerary together, decide things with quick polls instead of long group chats, log shared expenses and settle up. This repo is a **working, coded, mobile-optimised prototype** of one end-to-end journey, built for a Bending Spoons product-design assessment.

The primary audience is a **PM who must be able to demo it without explanation**. Judged on: logic, usability, polish, consistency.

Read these before writing code:
- `docs/PRODUCT_SPEC.md` — the scenario, every screen, states, interactions, mock data and business rules.
- `docs/DESIGN_SYSTEM.md` — colour, type, spacing, radii, shadows, components, motion, assets.
- `docs/INTERACTION_EXECUTION_BRIEF.md` — read after the two above, before any further UI/motion work. **§0 is a live bug to fix first** (the Itinerary/Expenses tab switch currently crossfades the whole screen instead of just the tab content — actively reported as broken). §1 lists the remaining feature gaps (live-poll deadline edit, real place search, the untouched poll-notification screen) and what's already done — check `git diff --stat` too before redoing anything. §2 is the FAB quick-add menu, next after the rest.

## Hard constraints (from the brief)
- Real code. A Figma click-through does not count.
- One reference phone: **iPhone 14, 390 × 844 pt**, original dimensions, **no scaling**. On desktop, render the app inside a centred 390 × 844 device frame; on a real phone, render full-screen.
- Mock data is fine. No backend required.
- All text in English. Real content only, no lorem ipsum.

## Source of truth for visuals
Figma file key: `qITM47IS3nfWVV3KxyH3pv` (file "TripUp - Bending Spoons - Delight Asaph").
URL: https://www.figma.com/design/qITM47IS3nfWVV3KxyH3pv/TripUp---Bending-Spoons---Delight-Asaph
- Page **"Hi-Fidelity Screens"**: the high-fidelity screens. Build to these, pixel-close.
- Page **"Wireflow"**: the flow logic and annotations (sections "1 · Plan & decide" and "2 · Pay & settle").
- Page **"Low-fi Screens"**: the mid-fidelity screens used in the wireflow. Use for flow logic only, not visuals.
- Page **"00 · Brief & Research"**: brief, user insights, user goal, assumptions, information architecture, user flow.
- Page **"Design System"**: colour and type styles.
- Page **"Stamps"**: the "Stamp" component set (node `17:3667`, 15 countries) and its parts.

All 14 screen node IDs in `docs/PRODUCT_SPEC.md` §4 are current and verified. Do not spend calls
re-checking them.

**02 Trip · Lisbon** and **05 Live poll** are the two key high-fidelity screens required by the brief, and the visual reference for every other screen. When anything is ambiguous, match them.

### Figma calls are rationed — batch them
The MCP has a hard per-plan call limit, and running out mid-screen stops the work. Treat every call
as expensive.

1. **Check what you already have first.** `design/screens/*.png` (native 390 × 844 renders),
   `docs/screens/*.md`, `docs/DESIGN_SYSTEM.md` and `docs/PRODUCT_SPEC.md` answer most questions —
   exact colours can be sampled from the PNGs, and geometry is recorded in `docs/screens/`. Only
   call Figma for what is genuinely missing.
2. **One `get_design_context` per screen**, on the screen's own top-level node. Never one call per
   component, card or icon — the response covers the whole subtree.
3. **Pull that screen's icons in the same call.** `get_design_context` returns SVG asset URLs; the
   URLs stay valid about 7 days, so download them immediately into `public/assets/icons/` with
   plain names (`arrow-back.svg`, `calendar.svg`, `walk.svg`). Reuse icons across screens. Never
   redraw an icon by hand and never substitute an icon library — if the export is missing, say so
   and ask.
4. **Write down what you learned, immediately after each screen**, in `docs/screens/<screen>.md`:
   exact offsets, sizes, colours, type styles, icon names, and anything that surprised you. This is
   what makes the next screen cheap.
5. **Never re-fetch a screen already recorded in `docs/screens/`.** If you believe you must, ask
   first.

If the MCP is unreachable or out of calls, say so plainly and ask — do not approximate the design
from memory.

## Recommended stack
- React + TypeScript + Vite.
- Styling: Tailwind CSS with the tokens from `DESIGN_SYSTEM.md` mapped into `tailwind.config` (or CSS variables). No component library: the look is custom.
- Motion: Framer Motion (sheets, toasts, poll bars, stamp moment, shared-element transitions).
- State: a single client-side store (Zustand or React context + reducer) holding the mock trip. "Real-time" is simulated with timers (see spec).
- Routing: React Router or simple screen-state machine; every screen must also be deep-linkable for demos (`/?screen=live-poll`).
- Fonts: Rubik (400/500/600) and Anton (400) from Google Fonts.
- Deploy: Vercel or Netlify so the PM gets a URL.

## How to work
1. Scaffold the app, the device frame, tokens and fonts first. Verify tokens render correctly on a style-guide route (`/styleguide`).
2. Build shared components (buttons, pills, avatars, cards, sheet, toast, tab bar, status bar) before screens.
3. Build screens in flow order (see spec). After each screen: run it, screenshot at 390 × 844, compare with Figma, fix differences, then record the screen in `docs/screens/<screen>.md`.
4. Wire the flow and the simulated real-time events last, then the demo controls.
5. Keep commits small, one screen or component per commit.

### Commits
Commits are the user's. Use the configured git name and email as they are — do not pass `-c
user.name`/`-c user.email` overrides. **Never** add `Co-Authored-By: Claude`, `🤖 Generated with
Claude Code`, or any other attribution trailer to a commit message or a PR description. This is
also enforced by `attribution: {commit: "", pr: ""}` in the user's settings; the rule stands even if
that setting is ever missing.

## Conventions
- Components in `src/components/`, screens in `src/screens/`, mock data in `src/data/`, domain logic (netting, splitting, poll rules) in `src/domain/` with unit tests (Vitest).
- Money is stored in integer cents. Format as `€190` / `€20,00` exactly as designed (see spec).
- No hard-coded colours or font sizes in components: use tokens.
- Accessibility: real buttons, visible focus, 44 pt minimum tap targets, `aria-live` on toasts and the live poll.

## Definition of done
- The full journey in `PRODUCT_SPEC.md` can be clicked through from Home to Squared up without dead ends.
- Every screen matches its Figma frame at 390 × 844.
- Netting, split-by-item and poll rules are covered by tests and produce the exact numbers in the spec.
- Works in Safari on iPhone and in Chrome on desktop.
- A PM can demo it using only the on-screen UI and the demo controls.
