/**
 * Line icons exported from Figma into public/assets/icons/.
 * Never hand-drawn and never from an icon library: each one is the exact
 * vector from the file, pulled with the screen it appears on.
 */
export type IconName =
  | 'arrow-left'
  | 'plus'
  | 'plus-small'
  | 'walk'
  | 'list'
  | 'calendar'
  | 'wallet'
  | 'bowl'
  | 'fork-knife'
  | 'fish'
  | 'check'
  | 'bell'

/**
 * Each file is the exact vector from Figma. Some carry a baked stroke colour
 * because of where they are used (`list` and `plus` are white, `wallet` is
 * Ink/Secondary); pass `color` to re-tint via a mask when a surface needs a
 * different one.
 */
const exported: Record<IconName, string> = {
  'arrow-left': '/assets/icons/arrow-left.svg',
  plus: '/assets/icons/plus.svg',
  'plus-small': '/assets/icons/plus-small.svg',
  walk: '/assets/icons/walk.svg',
  list: '/assets/icons/list.svg',
  calendar: '/assets/icons/calendar.svg',
  wallet: '/assets/icons/wallet.svg',
  bowl: '/assets/icons/bowl.svg',
  'fork-knife': '/assets/icons/fork-knife.svg',
  fish: '/assets/icons/fish.svg',
  check: '/assets/icons/check.svg',
  bell: '/assets/icons/bell.svg',
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
