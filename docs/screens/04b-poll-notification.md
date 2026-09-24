# 04b · Poll notification (Nic's lock screen)

Figma node `166:2578`. Built in `src/screens/PollNotification.tsx`.

Not in the original wireflow. Nic's lock screen, right after Ari sends the poll from 04. Renders
with `chrome: false` in the registry — this screen draws its own clock instead of the app's iOS
status bar, and the app draws none anywhere, so this screen owns everything above its wallpaper.

## Layout
Flex column, centred, `padding-top: 70`, `padding-inline: 12` — matches the Figma frame's own
structure (a flex column with a flex-1 spacer) rather than the screen's usual absolute offsets, since
that's how this one frame is actually built.

1. Wallpaper `assets/lockscreen-wallpaper.jpg`, `object-fit: cover`, `object-position: 52% center`
   — the existing asset from `DESIGN_SYSTEM.md` §7, not the flattened PNG Figma returns for
   this node (that PNG is the whole composed screen baked together, useless as a layer).
2. `--gradient-legibility-shade` over it, full bleed (already a token).
3. Clock: "Wednesday 16 September" (15px medium, white) over "18:05" (92px medium, white,
   `line-height: 100px`, `letter-spacing: -1.84px`). This size/tracking is lock-screen chrome, not a
   documented type style, so it's inline: a lock screen's clock is its own thing, not a UI token.
4. Flex-1 spacer, then the lime "On Nic's phone" pill (26 tall, `Pill` component).
5. Two notification cards, gap 8.
6. Quick actions row (torch left, camera right), `padding: 28px 34px 44px`.

No home indicator, per the project-wide rule.

## Notification card
`padding: 12px 14px`, radius 22, gap 10, `backdrop-filter: blur(12px)`,
`drop-shadow(0 8px 10px rgb(31 30 36 / .1))`. Background is `rgb(245 242 236 / .82)` for the newer
one; the older ("Ren joined…") is `rgb(245 242 236 / .62)` **and** `opacity: 0.9` — both a lighter
fill and a touch of extra fade, not just one or the other.

- App icon: 38 × 38, radius 10, `Accent/Lime`, holding an 18px pin-shaped mark (`app-mark` icon,
  ink stroke, baked in — no re-tint needed).
- Top row: title Footnote/Medium ink ("TripUp · Lisbon") left, time Caption/Regular `Ink/Secondary`
  right ("now" / "2m ago").
- Body: Footnote/Regular ink, full width, wraps to two lines on the longer one.

## Quick actions
50 × 50 circles, `rgb(26 31 46 / .35)`, `backdrop-filter: blur(10px)`, icon 20 centred. Both `torch`
and `camera` SVGs already carry a white stroke from the export — no colour prop needed.

## Icons on this screen
Exported into `public/assets/icons/`: `app-mark` (the notification glyph, 18), `torch` (20),
`camera` (20).

## Gotchas found while building
- This is the one screen so far with no 50pt status bar row at all — the lock screen's own giant
  clock replaces it. Getting this right needed a `chrome` flag on the registry entry, threaded
  through `App.tsx` into `DeviceFrame`.
- The registry's clock for 04b/04c was `18:06`; changed both to `18:05` to match the Figma frame
  exactly — the poll notification lands in the same minute as 04/05 in the spec's clock table.
