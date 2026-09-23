# Screen records

One file per screen, written straight after building it, so a screen is fetched from Figma **once**.

Each record holds the exact geometry, colours, type styles and icon names taken from that screen's
single `get_design_context` call, plus anything that surprised us. Before touching Figma again,
read the record — and `design/screens/<screen>.png`, which is the native 390 × 844 render and can
be pixel-sampled for any colour.

**No home indicator.** The frames draw one at 128, 830; the build leaves it out — it is inert
chrome and it weighed the screens down. On /compare it is the one difference you should expect to
see, and it applies to every screen from here on.

Conventions in these files:
- Coordinates are **screen coordinates** (0,0 = top-left of the 390 × 844 frame) unless a heading
  says otherwise. Figma's own frames nest, so the record converts once and states the result.
- The status bar occupies y 0–50. The content column is x 20–370.
- "Frame node" is the Figma node id, for the record only. Do not re-fetch it — **unless the
  record carries a STALE or SUPERSEDED banner at the top, which overrides this rule for that
  screen only.**

| Screen | Record | Figma node | Built |
|---|---|---|---|
| 01 Home | [01-home.md](01-home.md) | `162:429` | yes |
| 02 Trip · Lisbon | [02-trip-lisbon.md](02-trip-lisbon.md) | `4064:17467` | yes |
| 03a Buddies | _to write_ | `4058:3678` | no — **new** |
| 03b Add a buddy | _to write_ | `4058:3935` | no — **new** |
| ~~03 Add Ren~~ | [03-add-ren.md](03-add-ren.md) | ~~`163:2180`~~ | superseded |
| 04 New poll | [04-new-poll.md](04-new-poll.md) | `164:2379` | yes |
| 05 Live poll | [05-live-poll.md](05-live-poll.md) | `84:169` | yes |
| 06 Plan updated | [06-plan-updated.md](06-plan-updated.md) | `4064:18080` | yes |
