# Screen records

One file per screen, written straight after building it, so a screen is fetched from Figma **once**.

Each record holds the exact geometry, colours, type styles and icon names taken from that screen's
single `get_design_context` call, plus anything that surprised us. Before touching Figma again,
read the record — and `design/screens/<screen>.png`, which is the native 390 × 844 render and can
be pixel-sampled for any colour.

Conventions in these files:
- Coordinates are **screen coordinates** (0,0 = top-left of the 390 × 844 frame) unless a heading
  says otherwise. Figma's own frames nest, so the record converts once and states the result.
- The status bar occupies y 0–50. The content column is x 20–370.
- "Frame node" is the Figma node id, for the record only. Do not re-fetch it.

| Screen | Record | Figma node | Built |
|---|---|---|---|
| 02 Trip · Lisbon | [02-trip-lisbon.md](02-trip-lisbon.md) | `122:7866` | yes |
| 05 Live poll | [05-live-poll.md](05-live-poll.md) | `84:169` | yes |
