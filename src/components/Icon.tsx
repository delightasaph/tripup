/**
 * Line icons exported from Figma into public/assets/icons/.
 * Never hand-drawn and never from an icon library: each one is the exact
 * vector from the file, pulled with the screen it appears on.
 */
export type IconName =
  | 'arrow-left'
  | 'plus-ink'
  | 'plus-white'
  | 'plus-small'
  | 'arrow-right'
  | 'notifications'
  | 'notifications-read'
  | 'fork-knife-lg'
  | 'walk'
  | 'list'
  | 'calendar'
  | 'wallet'
  | 'bowl'
  | 'fork-knife'
  | 'fish'
  | 'check'
  | 'bell'
  | 'search'
  | 'check-white'
  | 'calendar-plus'
  | 'chevron-right'
  | 'link'
  | 'clock-violet'
  | 'remove'
  | 'clock'
  | 'send'
  | 'chevron-right-16'
  | 'won'
  | 'map'
  | 'receipt'
  | 'calendar-check'
  | 'direction-right'
  | 'more'
  | 'person-plus'
  | 'walk-sm'
  | 'app-mark'
  | 'torch'
  | 'camera'
  | 'close'
  | 'scan'
  | 'backspace'
  | 'bread'
  | 'wine'
  | 'card'
  | 'bank'
  | 'phone'
  | 'apple-pay-mark'
  | 'paypal-mark'
  | 'check-lg'
  | 'chevron-row'
  | 'quick-add-poll'
  | 'quick-add-expense'
  | 'quick-add-transport'
  | 'quick-add-stay'
  | 'quick-add-event'

/**
 * Each file is the exact vector from Figma. Some carry a baked stroke colour
 * because of where they are used (`list` and `plus` are white, `wallet` is
 * Ink/Secondary); pass `color` to re-tint via a mask when a surface needs a
 * different one.
 */
const exported: Record<IconName, string> = {
  'arrow-left': '/assets/icons/arrow-left.svg',
  'plus-ink': '/assets/icons/plus-ink.svg',
  'plus-white': '/assets/icons/plus-white.svg',
  'plus-small': '/assets/icons/plus-small.svg',
  'arrow-right': '/assets/icons/arrow-right.svg',
  // The whole 44 button, shadow and unread dot included, on an 80 canvas.
  notifications: '/assets/icons/notifications.svg',
  // The same export with its one `<circle id="Unread">` layer removed — the
  // bell once the notifications have been seen (15). Derived from the file
  // Figma gave us, not redrawn.
  'notifications-read': '/assets/icons/notifications-read.svg',
  'fork-knife-lg': '/assets/icons/fork-knife-lg.svg',
  walk: '/assets/icons/walk.svg',
  list: '/assets/icons/list.svg',
  calendar: '/assets/icons/calendar.svg',
  wallet: '/assets/icons/wallet.svg',
  bowl: '/assets/icons/bowl.svg',
  'fork-knife': '/assets/icons/fork-knife.svg',
  fish: '/assets/icons/fish.svg',
  check: '/assets/icons/check.svg',
  bell: '/assets/icons/bell.svg',
  search: '/assets/icons/search.svg',
  'check-white': '/assets/icons/check-white.svg',
  'calendar-plus': '/assets/icons/calendar-plus.svg',
  'chevron-right': '/assets/icons/chevron-right.svg',
  link: '/assets/icons/link.svg',
  'clock-violet': '/assets/icons/clock-violet.svg',
  remove: '/assets/icons/remove.svg',
  clock: '/assets/icons/clock.svg',
  send: '/assets/icons/send.svg',
  'chevron-right-16': '/assets/icons/chevron-right-16.svg',
  won: '/assets/icons/won.svg',
  map: '/assets/icons/map.svg',
  receipt: '/assets/icons/receipt.svg',
  'calendar-check': '/assets/icons/calendar-check.svg',
  'direction-right': '/assets/icons/direction-right.svg',
  more: '/assets/icons/more.svg',
  'person-plus': '/assets/icons/person-plus.svg',
  'walk-sm': '/assets/icons/walk-sm.svg',
  'app-mark': '/assets/icons/app-mark.svg',
  torch: '/assets/icons/torch.svg',
  camera: '/assets/icons/camera.svg',
  close: '/assets/icons/close.svg',
  scan: '/assets/icons/scan.svg',
  backspace: '/assets/icons/backspace.svg',
  bread: '/assets/icons/bread.svg',
  wine: '/assets/icons/wine.svg',
  card: '/assets/icons/card.svg',
  bank: '/assets/icons/bank.svg',
  phone: '/assets/icons/phone.svg',
  'apple-pay-mark': '/assets/icons/apple-pay-mark.svg',
  'paypal-mark': '/assets/icons/paypal-mark.svg',
  'check-lg': '/assets/icons/check-lg.svg',
  // The row chevron on 13/18 — 6.5 × 12.5, 1.5 stroke at 45% ink, and so
  // not the same glyph as `chevron-right`.
  'chevron-row': '/assets/icons/chevron-row.svg',
  // Quick add (12). `quick-add-poll` is 17.19 × 14.84 in the frame, not a
  // square — draw it at that ratio inside its 24 box rather than stretching.
  'quick-add-poll': '/assets/icons/quick-add-poll.svg',
  'quick-add-expense': '/assets/icons/quick-add-expense.svg',
  'quick-add-transport': '/assets/icons/quick-add-transport.svg',
  'quick-add-stay': '/assets/icons/quick-add-stay.svg',
  // 19.71 × 15.13 in the frame — a plane, not a square glyph.
  'quick-add-event': '/assets/icons/quick-add-event.svg',
}

type IconProps = {
  name: IconName
  size: number
  /** Width stays `size`; pass this when the exported glyph isn't square
   *  (`quick-add-poll` is 17.19 × 14.84) so it isn't stretched to fit. */
  height?: number
  /** Tints the glyph. Exported SVGs carry Ink/Primary, so this only applies
   *  where the design asks for another colour. */
  color?: string
  className?: string
}

export function Icon({ name, size, height = size, color, className }: IconProps) {
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
          height,
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
    <img src={src} alt="" aria-hidden="true" width={size} height={height} className={className} />
  )
}
