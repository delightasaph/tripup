# TripUp — coded prototype

TripUp is a mobile app for organising group trips: friends plan the itinerary together, decide things with quick polls instead of long group chats, log shared expenses and settle up. This repo is a **working, coded, mobile-optimised prototype** of one end-to-end journey, built for a Bending Spoons product-design assessment.

The primary audience is a **PM who must be able to demo it without explanation**. Judged on: logic, usability, polish, consistency.

Read these before writing code:
- `docs/PRODUCT_SPEC.md` — the scenario, every screen, states, interactions, mock data and business rules.
- `docs/DESIGN_SYSTEM.md` — colour, type, spacing, radii, shadows, components, motion, assets.

## Hard constraints (from the brief)
- Real code. A Figma click-through does not count.
- One reference phone: **iPhone 14, 390 × 844 pt**, original dimensions, **no scaling**. On desktop, render the app inside a centred 390 × 844 device frame; on a real phone, render full-screen.
- Mock data is fine. No backend required.
- All text in English. Real content only, no lorem ipsum.

## Source of truth for visuals
Figma file key: `KhaiFU0rSdVKHHoM5r7ry6` (file "TripUp - Bending Spoons - Delight Asaph").
URL: https://www.figma.com/design/KhaiFU0rSdVKHHoM5r7ry6/TripUp---Bending-Spoons---Delight-Asaph
- Page **"Hi-Fidelity Screens"**: the high-fidelity screens. Build to these, pixel-close.
- Page **"Wireflow"**: the flow logic and annotations (sections "1 · Plan & decide" and "2 · Pay & settle").
- Page **"Low-fi Screens"**: the mid-fidelity screens used in the wireflow. Use for flow logic only, not visuals.
- Page **"00 · Brief & Research"**: brief, user insights, user goal, assumptions, information architecture, user flow.
- Page **"Design System"**: colour and type styles.
- Page **"Stamps"**: the "Stamp" component set (node `17:3667`, 15 countries) and its parts.

If the Figma MCP server is connected, use it (`get_design_context`, `get_screenshot`, `get_variable_defs`) on the node IDs listed in `docs/PRODUCT_SPEC.md` before building each screen, and compare your result against the screenshot. If it is not connected, ask the user to export PNGs of the screens into `design/screens/`.

**02 Trip · Lisbon** and **05 Live poll** are the two key high-fidelity screens required by the brief, and the visual reference for every other screen. When anything is ambiguous, match them.

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
3. Build screens in flow order (see spec). After each screen: run it, screenshot at 390 × 844, compare with Figma, fix differences.
4. Wire the flow and the simulated real-time events last, then the demo controls.
5. Keep commits small, one screen or component per commit.

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
