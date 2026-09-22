import { stampShadow, stamps, ticketStamp, type StampCountry } from '@/data/assets'

/**
 * Every stamp PNG is exported with transparent padding around the artwork, so
 * the image box is bigger than the stamp itself. Figma sizes a stamp by its
 * *paper* (300 × 316 at component scale), so drawing the PNG at that width
 * would come out about 18% too small and sit off-centre.
 *
 * These fractions locate the paper inside the PNG. Measured on the exports and
 * identical across all three generations of them (428², 470², 1000²), because
 * the padding is proportional.
 */
const PAPER = {
  /**
   * The stamp width Figma reports covers the paper's *visual* extent —
   * scalloped edge included — not the inner rectangle. Checked against the
   * ticket on screen 02: this reading lands within 1 px, the inner-rectangle
   * reading was out by 8.
   */
  widthFrac: 0.898,
  leftFrac: 0.0579,
  topFrac: 0.0287,
  /** The PNG's own aspect, and the stamp frame's. */
  pngAspect: 485 / 470,
  paperAspect: 148.411 / 140.897,
}

type StampProps = {
  /** Omit for the untitled stamp that rides the trip ticket. */
  country?: StampCountry
  /**
   * Width of the stamp's paper in px — the number Figma reports for the
   * stamp, not the size of the image file.
   */
  paperWidth: number
  /** Degrees; counter-clockwise is negative. The PNGs are flat at 0°. */
  rotate?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * A travel stamp. The artwork is a flat, shadowless PNG — the tilt is a CSS
 * rotate and the shadow is a drop-shadow filter, which follows the perforated
 * edge rather than boxing the transparent padding.
 */
export function Stamp({ country, paperWidth, rotate = 0, className, style }: StampProps) {
  const src = country ? stamps[country] : ticketStamp
  const paperHeight = paperWidth * PAPER.paperAspect

  const imgWidth = paperWidth / PAPER.widthFrac
  const imgHeight = imgWidth * PAPER.pngAspect

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: paperWidth,
        height: paperHeight,
        rotate: `${rotate}deg`,
        ...style,
      }}
    >
      <img
        src={src}
        alt={country ? `${country} stamp` : ''}
        aria-hidden={country ? undefined : true}
        width={imgWidth}
        style={{
          position: 'absolute',
          left: -PAPER.leftFrac * imgWidth,
          top: -PAPER.topFrac * imgHeight,
          maxWidth: 'none',
          display: 'block',
          filter: stampShadow(paperWidth),
        }}
      />
    </div>
  )
}
