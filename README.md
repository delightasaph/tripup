# TripUp

A working, mobile-optimised prototype of one end-to-end journey in **TripUp** — an app for
organising group trips: friends plan the itinerary together, decide with quick polls instead of
long group chats, log shared expenses and settle up.

Built for a Bending Spoons product-design assessment. The scenario is the last evening of a trip
to Lisbon: add a friend, poll three restaurants, watch the votes land live, put the winner on the
itinerary, split the bill by item, net the debts and square up.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Serve the production build |
| `npm run lint` | oxlint |
| `npm test` | Vitest (domain logic: netting, splitting, poll rules) |

## The device

One reference phone: **iPhone 14, 390 × 844 pt, never scaled.** On desktop the app renders inside
a centred device frame on `Surface/Canvas`; on a phone-sized viewport it fills the screen instead.

## Routes

- `/` — the prototype. Every screen is deep-linkable for demos: `/?screen=live-poll`.
- `/styleguide` — a proof sheet for every design token (colour, type, radii, elevation, spacing,
  gradients, the device frame). If something looks wrong there, the token is wrong.

## Layout

```
docs/         PRODUCT_SPEC.md and DESIGN_SYSTEM.md — the source of truth for behaviour and visuals
src/styles/   tokens.css (the design system as CSS variables) + the token index the styleguide reads
src/components/  shared UI (device frame, status bar, home indicator, …)
src/screens/  one file per screen, plus the flow registry
src/domain/   netting, split-by-item and poll rules, unit-tested
src/data/     the mock trip
public/assets/  avatars, places, stamps exported from Figma
```

## Design source

Figma file `qITM47IS3nfWVV3KxyH3pv` — page "Hi-Fidelity Screens" for the visuals, "Wireflow" for
the flow logic. Screens **02 Trip · Lisbon** and **05 Live poll** are the visual reference for
everything else.

Fonts: Rubik (400/500/600) for the UI, Anton (400) for the ticket destination and stamp titles.

## Credits

Avatars are placeholders from the Material 3 3D avatar kit; restaurant photos are placeholders.
