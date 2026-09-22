# TripUp — Design system for the prototype

Values come from the Figma file's local styles (file `KhaiFU0rSdVKHHoM5r7ry6`, pages "Design System" and "Stamps"). If Figma and this file disagree, Figma wins; re-check with `get_variable_defs` / `get_design_context`.

## 1. Canvas
- Reference device: iPhone 14, **390 × 844 pt**. No scaling.
- Status bar: 50 pt (iOS style, black text; white on the lock screen). Home indicator: 134 × 5, 13 pt from the bottom.
- Screen padding: **20 pt** left/right, content starts at **64 pt** from the top.
- Floating bottom bar: tab bar 264 × 60 + FAB 60 × 60, at y = 756, with a 150 pt fade from `Surface/Ground` transparent → opaque behind it.
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

Initials avatar fills: Ari `#DCC0F6` · Nick `#C4D6FF` · Rebecca `#F5CDBF` · William `#D6EE8E` · Phil `#F1DC9F` · Jess `#BFE7D3` · **Ren `#FFCBAA`** · Marta `#E6E0FA` · Hugo `#F3E3C8`.

## 3. Typography
Two families with strict roles:
- **Rubik**: everything in the UI.
- **Anton**: only on the **trip ticket** (destination name) and inside **stamps** (country names). Never on page titles, buttons, amounts or other cards.

| Style | Font | Size / line height | Use |
|---|---|---|---|
| Display/Destination | Anton 400, uppercase, letter-spacing 1% | 56 / 58 | "LISBON" on the ticket |
| Display | Rubik 600 | 48 / 100% | Amounts (€130, €190, €20) |
| Title 1 | Rubik 600 | 34 / 105% | Screen titles ("Your trips", "Lisbon", "Lisbon is squared up.") |
| Title 2 | Rubik 600 | 28 / 115% | Poll question |
| Heading | Rubik 600 | 22 / 130% | Sheet titles, split sentence |
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
  - Stamps: `0 4–14 8–26 rgba(31,30,36,.12–.16)`.

## 5. Components
- **Ticket (trip hero)**: 350 × 150, sky gradient, rounded 24 with two semicircle notches (top and bottom, right third) like a ticket; left: Anton destination + dates (Footnote/Medium, navy); right: tilted Portugal stamp (~20°) partly cropped by the ticket edge. Export the ticket shape from Figma as SVG, don't approximate.
- **Stamp**: Figma component set "Stamp" (page "Stamps", node `17:3667`) with 15 countries. Parts: perforated paper, painted illustration, Anton country title, "VISITED" cancel, wavy cancel lines, round "TRIPUP 2026" postmark, optional "x1" count. Export each country as PNG @3x (or SVG + PNG artwork).
- **Avatar**: circle, sizes 20–52. Photo avatars crop to the face. Overlapping stacks use −6 spacing and a 2 px ring in the background colour. "+N" chip is white with Avatar/11.
- **Pill / chip**: 999 radius, 4–6 vertical × 9–12 horizontal padding, Caption/Medium or Footnote/Medium. Variants: white, lime, lilac, violet tint, ink (dark with lime text: "Next", "Won 4 · 2 · 1").
- **Timeline row**: time column 49 pt (Footnote/Medium), node column 21 pt (10 pt dot; done = grey, next = ink with soft ring, open = violet ring, filled = solid violet), card 280 pt. Continuous 2 pt rail behind nodes, fading into violet at the open slot.
- **Poll option card**: white card 24 radius, padding 14/16; photo tile 48 (radius 12) with a white 22 pt icon badge at bottom-right; name (Headline) + line (Caption); 8 pt bar (leader ink on lime card, others muted); voter faces + "n votes"; leader card is lime.
- **Live pill**: white pill, pulsing red dot, "Live" in Alert, divider, "closes in mm:ss".
- **Ticker**: pill on `rgba(31,30,36,.05)`, 20 pt avatar, bold name + event.
- **Toast**: ink pill-card 350 wide at y 56, lime 28 pt icon circle, title (Footnote/Medium white) + sub (Caption lime). Auto-dismiss 3 s.
- **Sheet**, **Scrim**, **Segmented control** (white track, ink selected segment), **Keypad** (Ground keys 48 high, radius 14, 8 gap), **Radio** (24 pt: empty 1.5 px ring at 25% ink; selected ink fill + white check).
- **Tab bar**: white 60 high rounded 999; active tab is an ink pill 48 high with white icon + label; inactive grey.
- **Icons**: 1.5 px stroke line icons, 13–20 pt, ink by default (from the Figma file; export as SVG).

## 6. Motion (Framer Motion)
- Sheets: slide up with spring (stiffness ~380, damping ~34); scrim fades 200 ms. Drag the grabber down to dismiss.
- Toasts: drop in from −20 px with fade, 250 ms; out after 3 s.
- Poll: bar widths spring to new values (400 ms); vote counts tick; new voter face pops in (scale 0.6 → 1); ticker text slides up. Leader change cross-fades card fill to lime.
- Live dot: pulsing ring, 1.6 s loop.
- Poll close → Plan updated: shared-element transition from the winning option card into the dinner slot; the dashed border resolves into the ink border; node fills violet.
- Split by item: tapping an avatar fades it to 35% and swaps the label to "Skipped"; amounts roll to new values.
- Balances: amounts count up on first view; rows paying you slide in slightly after others.
- Squared up: each receipt row checks in sequence (120 ms stagger). 11B: stamp drops from scale 1.3 with −5° rotation, lands with a small bounce and the shadow tightens; optional gentle haptic on iOS (`navigator.vibrate` is not available on iOS; skip).
- Respect `prefers-reduced-motion`: replace springs with fades.

## 7. Assets to export from Figma
Put them in `public/assets/`:
- `avatars/`: ari, nick, rebecca, william, phil, jess (PNG @3x, square; crop in CSS with `object-position` and scale).
- `places/`: taberna, timeout, ramiro (restaurant photos, JPG).
- `stamps/`: portugal, spain, france, italy, greece, germany (PNG @3x) + `belem-painting.jpg` (the painted Belém illustration used as the lock-screen wallpaper).
- `ticket.svg` (ticket shape with notches), all icons as SVG.
- Fonts: Rubik and Anton from Google Fonts.

Licensing: avatars are from the Material 3 3D avatar kit and restaurant photos are placeholders; credit them in the presentation.
