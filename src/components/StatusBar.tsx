type StatusBarProps = {
  /** Clock as shown in the spec, e.g. "18:05". */
  time: string
  /** White glyphs for the lock screen (04b); black everywhere else. */
  tone?: 'dark' | 'light'
}

/**
 * The iOS status bar, built the way the frames build it: 50 tall, 24 side
 * padding, two equal columns 154 apart, each centring its contents. That puts
 * the clock's glyphs at x 49 and the battery tip at ~353, which is where the
 * frames have them.
 *
 * The glyphs are the exported system vectors, not hand-drawn, and the clock is
 * SF Pro 16 / 590 — the system face, so it resolves to the real thing on iOS
 * and falls back to the UI font elsewhere.
 */
export function StatusBar({ time, tone = 'dark' }: StatusBarProps) {
  const light = tone === 'light'

  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{
        height: 'var(--status-bar-height)',
        gap: 154,
        padding: '21px 24px 19px',
        color: light ? 'var(--color-surface-white)' : '#000000',
      }}
      aria-hidden="true"
    >
      <div className="flex min-w-0 flex-1 items-center justify-center" style={{ height: 22 }}>
        <span
          style={{
            paddingTop: 1.5,
            fontFamily: '-apple-system, "SF Pro Text", "SF Pro", system-ui, sans-serif',
            fontSize: 16,
            fontWeight: 590,
            lineHeight: '22px',
            fontVariationSettings: '"wdth" 100',
            whiteSpace: 'nowrap',
          }}
        >
          {time}
        </span>
      </div>
      <div
        className="flex min-w-0 flex-1 items-center justify-center"
        style={{ height: 22, gap: 7, paddingRight: 1, paddingTop: 1 }}
      >
        <Glyph src="/assets/statusbar/cellular.svg" w={19.2} h={12.226} light={light} />
        <Glyph src="/assets/statusbar/wifi.svg" w={17.142} h={12.328} light={light} />
        <Glyph src="/assets/statusbar/battery.svg" w={27.328} h={13} light={light} />
      </div>
    </div>
  )
}

/** The exported glyphs are black; the lock screen needs them white, which an
 *  <img> cannot do — so tint through a mask there. */
function Glyph({ src, w, h, light }: { src: string; w: number; h: number; light: boolean }) {
  if (light) {
    return (
      <span
        style={{
          display: 'block',
          width: w,
          height: h,
          backgroundColor: 'var(--color-surface-white)',
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    )
  }
  return <img src={src} alt="" width={w} height={h} className="block" style={{ maxWidth: 'none' }} />
}
