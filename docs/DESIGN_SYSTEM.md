# TripUp — Design system for the prototype

Values come from the Figma file's local styles (file `qITM47IS3nfWVV3KxyH3pv`, pages "Design System" and "Stamps"). If Figma and this file disagree, Figma wins; re-check with `get_variable_defs` / `get_design_context`.

## 1. Canvas
- Reference device: iPhone 14, **390 × 844 pt**. No scaling.
- Status bar: 50 pt (iOS style, black text; white on the lock screen). Home indicator: 134 × 5, 13 pt from the bottom.
- Screen padding: **20 pt** left/right, content starts at **64 pt** from the top.
- Floating bottom bar: tab bar 264 × 60 + FAB 60 × 60, at y = 756, with a 150 pt fade from `Surface/Ground` transparent → opaque behind it.
- **Scroll padding:** the scrolling column gets 110 pt of empty ground below its last item, so
  content clears the floating bar. Docked controls — the tab bar and any pinned primary action —
  sit outside the scroll area and never move below the fold.
- Bottom sheets: full width, top corners **28**, padding 10 / 20 / 34, grabber 40 × 5 (`Line/Default`), over a scrim.

## 2. Colour
| Token | Hex / value | Use |
|---|---|---|
| Ink/Primary | `#1F1E24` | Text, dark buttons, selected states, toasts |
| Ink/Secondary | `#5E5B66` | Secondary text, meta |
| Surface/Ground | `#F7F4EF` | App background, inputs inside white sheets |
| Surface/White | `#FFFFFF` | Cards, sheets, secondary buttons |
| Surface/White 70% | `rgba(255,255,255,.70)` | Done items, pills on colour |
| Surface/Canvas | `#EFEAE2` | Presentation background around the phone |
| Line/Default | `#E7E2DA` | Dividers, outline buttons (1.5 px) |
| Overlay/Scrim | `rgba(31,30,36,.38)` | Behind sheets |
| Accent/Lime | `#E3F59E` | Brand highlight: leading/winning option, selection, success, toast icons |
| Accent/Lilac | `#EBD7FA` | Balances card, Nudge, Scan receipt |
| Accent/Blush | `#F7DDD3` | Warm cards (Berlin, mains) |
| Accent/Sky | `#DCE6FF` | Cool cards (Porto, info icons) |
| Accent/Sand | `#F5E7C4` | Food icon backgrounds, sunset gradient end |
| Accent/Violet | `#5B4FE8` | Open slot, "Ask the group", deadline pill, links |
| Accent/Violet Tint | `#F4F1FF` | Open slot fill, icon backgrounds |
| Status/Positive | `#17703F` | Money in, done checks, live dot on Home |
| Status/Positive Tint | `#E2F2E7` | Rows paying you |
| Status/Alert | `#A83A2B` | Live indicator, unread dot, "Skipped" |
| Data/Track | `rgba(31,30,36,.08)` | Progress bar track |
| Data/Bar Muted | `#CFCAD6` | Non-leading bars, ",00" decimals |
| Stamp/Paper | `#F8F5EE` | Stamp paper |
| Stamp/Title Navy | `#1B3A8A` | Anton destination title on the ticket |
| Stamp/Title Plum | `#2B2D5C` | Stamp titles |
| Ticket "sky gradient" | linear, top→bottom `#ADCCE8` → `#80A8D4` | Trip ticket background |
| Sunset card gradient | Blush `#F7DDD3` → Sand `#F5E7C4`, diagonal | "Next" itinerary item |

Initials avatar fills: Ari `#DCC0F6` · Nic `#C4D6FF` · Bea `#F5CDBF` · Kofi `#D6EE8E` · Sven `#F1DC9F` · Mira `#BFE7D3` · **Ren `#FFCBAA`** · Marta `#E6E0FA` · Hugo `#F3E3C8`.

## 3. Typography
Tracking is **0 on every style up to Headline**. Only the display sizes carry it: Title 1 −0.7,
Title 2 −0.5, Heading −0.2, Display/Destination +1%. **Display 48 is still unconfirmed** — check it
against the file before first use rather than assuming 0.

Two families with strict roles:
- **Rubik**: everything in the UI.
- **Anton**: only on the **trip ticket** (destination name) and inside **stamps** (country names). Never on page titles, buttons, amounts or other cards.

| Style | Font | Size / line height | Use |
|---|---|---|---|
| Display/Destination | Anton 400, uppercase, letter-spacing 1% | 56 / 58 | "LISBON" on the ticket |
| Display | Rubik 600 | 48 / 100% | Amounts (€130, €190, €20) |
| Title 1 | Rubik 600, letter-spacing −0.7 | 34 / 105% | Screen titles ("Your trips", "Lisbon", "Lisbon is squared up.") |
| Title 2 | Rubik 600, letter-spacing −0.5 | 28 / 115% | Poll question |
| Heading | Rubik 600, letter-spacing −0.2 | 22 / 130% | Sheet titles, split sentence |
| Subheading/Medium · SemiBold | Rubik 500 · 600 | 20 | Day numbers, keypad, upcoming trip names |
| Headline | Rubik 600 | 17 | Card titles, option names, amounts in rows |
| Body/Regular · Medium · SemiBold | Rubik 400 · 500 · 600 | 15 | Body, buttons (Medium), row titles (SemiBold) |
| Footnote/Regular · Medium | Rubik 400 · 500 | 13 | Section labels, meta, toasts |
| Caption/Regular · Medium | Rubik 400 · 500 | 12 | Sub-lines, chips |
| Caption 2/Regular · Medium | Rubik 400 · 500 | 11 | Small pills ("Next", "Your vote"), labels under avatars |
| Avatar/7–18 | Rubik 600 | 7–18 | Initials inside avatars |

Uppercase section labels ("TODAY'S PLAN", "HAPPENING NOW") use Footnote/Medium in Ink/Secondary.

## 4. Shape, spacing, elevation
- Radius: pills/buttons/avatars **999**; cards **20–24**; small cards/rows **16–18**; icon tiles **12**; sheets **28** (top only); photo tiles **12**.
- Spacing scale in use: 2, 4, 6, 8, 10, 12, 14, 16, 20. Screen sections: 16 gap. Card padding: 14–18. List gaps: 6–8.
- Buttons: primary 54 high, dark (`Ink/Primary`, white Body/Medium); secondary 54 high, white with 1.5 px `Line/Default` inside border. Icon buttons 40 or 44 round white. Small in-card buttons 40 high.
- Shadows:
  - Card / icon button: `0 6 18 rgba(31,30,36,.08)`.
  - Dark button / FAB: `0 10 20 -6 rgba(31,30,36,.25)`.
  - Toast: `0 10 24 -4 rgba(31,30,36,.25)`.
  - Sheet: `0 -8 30 rgba(31,30,36,.12)`.
  - Lime winner card: `0 12 24 -8 rgba(115,140,25,.25)`.
  - Stamps: a **`filter: drop-shadow()`**, never a `box-shadow` — the PNGs carry transparent
    padding, so a box-shadow would trace a rectangle around the padding instead of the
    perforated edge. Figma uses `0 17.143px 17.143px rgba(31,30,36,.12)` on the 300 px-wide
    component, i.e. `0.05714 × rendered width`; compose it with `stampShadow()` in
    `src/data/assets.ts` so it scales with the stamp.

## 5. Components
- **Ticket (trip hero)**: 350 × 150, sky gradient, rounded 16 with two notches (top and bottom, centred at x ≈ 175) like a ticket — use `assets/ticket.svg`, which carries the exact path and the gradient; left: Anton destination + dates (Footnote/Medium, navy); right: `stamps/portugal-ticket.png` (the untitled stamp) rotated ~20° in CSS and clipped by the ticket edge. Export the ticket shape from Figma as SVG, don't approximate.
- **Stamp**: Figma component set "Stamp" (page "Stamps", node `17:3667`) with 15 countries. Parts: perforated paper, painted illustration, Anton country title, "VISITED" cancel, wavy cancel lines, round "TRIPUP 2026" postmark, optional "x1" count. Exported as flat PNGs in `public/assets/stamps/` (see §7); apply any tilt in CSS.
- **Avatar**: circle, sizes 20–52. Photo avatars arrive pre-cropped to the face and pre-circular — draw them at size, unaltered. Overlapping stacks use −6 spacing and a 2 px ring in the background colour. "+N" chip is white with Avatar/11.
- **Pill / chip**: 999 radius, 4–6 vertical × 9–12 horizontal padding, Caption/Medium or Footnote/Medium. Variants: white, lime, lilac, violet tint, ink (dark with lime text: "Next", "Won 4 · 2 · 1").
- **Timeline row**: time column 49 pt (Footnote/Medium), node column 21 pt (10 pt dot; done = grey, next = ink with soft ring, open = violet ring, filled = solid violet), card 280 pt. Continuous 2 pt rail behind nodes, fading into violet at the open slot.
- **Poll option card**: white card 24 radius, padding 14/16; photo tile 48 (radius 12) with a white 22 pt icon badge at bottom-right; name (Headline) + line (Caption); 8 pt bar (leader ink on lime card, others muted); voter faces + "n votes"; leader card is lime.
- **Live pill**: white pill, pulsing red dot, "Live" in Alert, divider, "closes in mm:ss".
- **Ticker**: pill on `rgba(31,30,36,.05)`, 20 pt avatar, bold name + event.
- **Toast**: ink pill-card 350 wide at y 56, lime 28 pt icon circle, title (Footnote/Medium white) + sub (Caption lime). Auto-dismiss 3 s.
- **Wheel picker**: three columns (day 150, hour 52, minute 52), cells 44 high, five visible. Selected
  row on a `Surface/Ground` band, radius 12, inset 20; neighbours at 55% (±1) and 22% (±2) opacity.
  Selected text Subheading/SemiBold in `Ink/Primary`, the rest Subheading/Medium in `Ink/Secondary`.
  Actions: Clear (outline) and Done (ink). Native scroll-snap, never a `<select>`.
- **Quick-add icons**: five 1.5 px stroke icons drawn for the FAB sheet — bars (New poll), receipt
  (Log expense), paper plane (Transport), house (Stay), pin (Spot or event). Export them with
  screen 12; do not substitute an icon library.
- **Sheet**, **Scrim**, **Segmented control** (white track, ink selected segment), **Keypad** (Ground keys 48 high, radius 14, 8 gap), **Radio** (24 pt: empty 1.5 px ring at 25% ink; selected ink fill + white check).
- **Tab bar**: white 60 high rounded 999; active tab is an ink pill 48 high with white icon + label; inactive grey.
- **Icons**: 1.5 px stroke line icons, 13–20 pt, ink by default (from the Figma file; export as SVG).

## 6. Motion (Framer Motion)

### 6.0 The feel
The target is an iOS app, not a web page: nothing snaps, nothing janks, and every touch answers
immediately. These rules apply everywhere and come before the per-element list below.

**Tokens.** Put these in `tokens.css` / a motion module and never hand-write a duration in a
component.

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | anything entering or settling |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | anything moving between two states |
| `--dur-micro` | 120 ms | press feedback, checkbox, chip |
| `--dur-fast` | 200 ms | fades, toasts, scrim |
| `--dur-base` | 280 ms | screen transitions, cards |
| `--dur-slow` | 420 ms | the stamp landing, and nothing else |
| spring/sheet | `stiffness 380, damping 34, mass 0.9` | sheets |
| spring/pop | `stiffness 500, damping 30` | faces, chips, counts |

**Animate transform and opacity only.** Never animate `width`, `height`, `top`, `left`, `margin` or
`box-shadow` — they force layout on every frame. Move with `translate3d`, size with `scale`, and for
a shadow change, cross-fade a second element that carries the heavier shadow. Set `will-change` only
while a thing is actually animating.

**Every touch answers.** Interactive elements take `whileTap={{ scale: 0.97 }}` with
`--dur-micro`; large cards use `0.985` so the effect is felt, not seen. Tap targets stay 44 pt.
Never gate feedback behind the action's result.

**Scrolling is native momentum, never scripted.** Real scroll containers only — no scroll-jacking,
no animating `scrollTop` on a wheel event. Set `overscroll-behavior: contain` on sheets so a sheet
at its end doesn't drag the page behind it, and `scroll-behavior: smooth` only for programmatic
jumps. Sticky headers use `position: sticky`, not scroll listeners.

**Screen transitions: there are none.** Moving between screens is a **cut**. Screens used to slide
in and out, and it read as the page lurching on an ordinary tap — the thing a bug looks like.
Motion belongs to the thing you touched, not to the page around it: a button presses, a sheet
rises, a bar fills, a count ticks. Nothing animates the whole screen.

Sheets are the exception, and only because a sheet is a *surface arriving*, not a page changing
under you: up from the bottom with spring/sheet, scrim fading over `--dur-fast`, and the screen
behind scaling to `0.96` until it leaves. Sheets are draggable down and dismiss on distance **or**
velocity, not distance alone.

**One sheet at a time.** A sheet never opens on top of another sheet. When a sheet needs to show
something else — searching for a place to add, for instance — it swaps its own content and lets
its height follow; two stacked scrims and two stacked cards read as a bug, not as a layer.

**Continuity within a screen, not across one.** `layoutId` still earns its place where both
elements live in the same persistently-mounted component: the tab bar's ink pill slides between
Itinerary and Expenses because the bar never unmounts, and that reads as one control moving.

Across a navigation it no longer applies. Screens cut, so two screens never coexist and there is
nothing to animate between — the winning poll option's photo and the trip ticket both carried a
`layoutId` and now simply appear in place. That is the intended result, not a regression: an
element flying across an otherwise instant screen change reads as a glitch, which is exactly what
the ticket was doing between 01 and 02.

**Numbers and lists.** Amounts count up with spring/pop, never linearly. Lists stagger children
40 ms on first mount only — never on re-render, or the screen twitches every state change.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, every transform becomes a 120 ms
opacity fade, staggers drop to 0, the stamp lands without bounce, and the live dot stops pulsing.
Nothing becomes unreachable.

**Performance.** 60 fps on a mid-range phone is the bar. Images carry explicit width and height so
nothing reflows as they load; fonts are preloaded; no animation runs on a screen that isn't visible;
and timers for the simulated real-time events are cleared on unmount.

### 6.1 Per element
- Sheets: slide up with spring (stiffness ~380, damping ~34); scrim fades 200 ms. Drag the grabber down to dismiss.
- Toasts: drop in from −20 px with fade, 250 ms; out after 3 s.
- Poll: bar widths spring to new values (400 ms); vote counts tick; new voter face pops in (scale 0.6 → 1); ticker text slides up. Leader change cross-fades card fill to lime.
- Live dot: pulsing ring, 1.6 s loop.
- Poll close → Plan updated: shared-element transition from the winning option card into the dinner slot; the dashed border resolves into the ink border; node fills violet.
- Split by item: tapping an avatar fades it to 35% and swaps the label to "Skipped"; amounts roll to new values.
- Balances: amounts count up on first view; rows paying you slide in slightly after others.
- Squared up: each receipt row checks in sequence (120 ms stagger). 11B: stamp drops from scale 1.3 with −5° rotation, lands with a small bounce and the shadow tightens; optional gentle haptic on iOS (`navigator.vibrate` is not available on iOS; skip).
- Respect `prefers-reduced-motion`: replace springs with fades.

## 7. Assets
In `public/assets/`. Everything below is already exported and committed unless marked **missing**.

- `avatars/`: `ari`, `nic`, `bea`, `kofi`, `sven`, `mira` (PNG, 184 × 184).
  **Already cropped to the face and already circular — render them as they are.** No extra zoom,
  no `object-position` nudging, no CSS circular mask beyond the avatar's own border radius.
  Ren has no photo on purpose: he is the initials avatar "RT" on Avatar/Ren.
- `places/`: `taberna`, `timeout`, `ramiro` (WebP restaurant photos).
- `stamps/`: 15 countries as `<country>.png` — `albania`, `belgium`, `brazil`, `england`, `france`,
  `germany`, `greece`, `italy`, `kenya`, `netherlands`, `nigeria`, `portugal`, `spain`, `tanzania`,
  `usa` — plus `portugal-ticket.png`. All are exported **flat at 0°, uncropped, and with no
  shadow**, on transparent padding. Every tilt is a CSS `rotate` and every shadow is a CSS
  `filter: drop-shadow()` (see §4) — neither is ever baked into the file.
  - `england`, `spain`, `italy` and `france` — the four Home uses — are the re-exports:
    428 × 442, no "x1" count badge. The other eleven are the first exports at 1000 × 1032,
    about four times the bytes, and do carry the "x1" badge. Of those only `portugal` is used
    (ending 11B), where "x1" reads correctly as Ari's first visit.
  - `portugal-ticket.png` has **no country name**. This is the one on the Lisbon ticket, rotated
    ~20° and clipped by the ticket edge.
  - `portugal.png` has the Anton "PORTUGAL" title. This is the one that stamps down on ending 11B.
  - Home's "Your stamps" row uses `england`, `spain`, `italy` and `france` — in that order, and
    **not** Greece or Portugal. Verified against Figma `165:24924`. Arrangement in
    `src/data/assets.ts` (`homeStamps`).
  - The Stamp component is **300 × 316** natural; Home draws every instance at scale 0.4275.
- `lockscreen-wallpaper.jpg`: the lock-screen photo for 04b (1200 × 1774). A night-out street photo,
  **not** a stamp painting. Fill the frame with `object-fit: cover` at roughly `52% center`, and lay
  the **Legibility shade** over it — the gradient from Figma node `166:2579`, in tokens as
  `--gradient-legibility-shade`:
  `linear-gradient(180deg, rgb(20 36 71 / .45) 0%, rgb(20 36 71 / .05) 35%, rgb(13 26 51 / .15) 60%, rgb(8 15 31 / .6) 100%)`.
- `ticket.svg`: the ticket shape, pulled from Figma node `141:12831` ("Rectangle 2" inside the
  ticket on screen 02). 350 × 150, with the sky gradient baked into the file. Its two notches are
  **centred at x ≈ 175**, one on the top edge and one on the bottom — not at the right third.
- `icons/`: line icons, pulled per screen from `get_design_context` as each screen is built.
- Fonts: Rubik and Anton from Google Fonts.

Licensing: avatars are from the Material 3 3D avatar kit and restaurant photos are placeholders; credit them in the presentation.
