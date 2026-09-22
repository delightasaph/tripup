/**
 * Line icons exported from Figma into public/assets/icons/.
 *
 * Icons are never hand-drawn: each one is the exact vector from the file. An
 * icon we have not been able to export yet renders as a visible dashed box so
 * the gap shows up in review instead of hiding behind a lookalike glyph.
 */
export type IconName =
  | 'arrow-left'
  | 'plus-small'
  // Not yet exported — the Figma MCP hit its plan call limit mid-screen.
  | 'walk'
  | 'list'
  | 'calendar'
  | 'wallet'
  | 'bowl'
  | 'fork-knife'
  | 'fish'
  | 'check'
  | 'bell'

const exported: Record<string, string> = {
  'arrow-left': '/assets/icons/arrow-left.svg',
  'plus-small': '/assets/icons/plus-small.svg',
}

type IconProps = {
  name: IconName
  size: number
  /** Tints the glyph. Exported SVGs carry Ink/Primary, so this only applies
   *  where the design asks for another colour. */
  color?: string
  className?: string
}

export function Icon({ name, size, color, className }: IconProps) {
  const src = exported[name]

  if (!src) {
    return (
      <span
        role="img"
        aria-label={`${name} icon (not yet exported)`}
        title={`${name} — not yet exported from Figma`}
        className={className}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          borderRadius: 3,
          border: `1px dashed ${color ?? 'currentColor'}`,
          opacity: 0.45,
        }}
      />
    )
  }

  // Tinting needs a mask: an <img> cannot be recoloured.
  if (color) {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{
          display: 'inline-block',
          width: size,
          height: size,
          backgroundColor: color,
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

  return (
    <img src={src} alt="" aria-hidden="true" width={size} height={size} className={className} />
  )
}
