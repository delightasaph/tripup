/** Asset paths, in one place so no screen hard-codes a filename.
 *  See docs/DESIGN_SYSTEM.md §7 for the rules that come with them. */

/** Already cropped to the face and already circular — render at size, unaltered.
 *  Ren is deliberately absent: he is the initials avatar "RT". */
export const avatarPhotos = {
  ari: '/assets/avatars/ari.png',
  nick: '/assets/avatars/nick.png',
  rebecca: '/assets/avatars/rebecca.png',
  william: '/assets/avatars/william.png',
  phil: '/assets/avatars/phil.png',
  jess: '/assets/avatars/jess.png',
} as const

export const placePhotos = {
  taberna: '/assets/places/taberna.webp',
  timeout: '/assets/places/timeout.webp',
  ramiro: '/assets/places/ramiro.webp',
} as const

/** Every stamp is exported flat at 0°. Tilts are CSS, never baked in. */
export const stamps = {
  albania: '/assets/stamps/albania.png',
  belgium: '/assets/stamps/belgium.png',
  brazil: '/assets/stamps/brazil.png',
  england: '/assets/stamps/england.png',
  france: '/assets/stamps/france.png',
  germany: '/assets/stamps/germany.png',
  greece: '/assets/stamps/greece.png',
  italy: '/assets/stamps/italy.png',
  kenya: '/assets/stamps/kenya.png',
  netherlands: '/assets/stamps/netherlands.png',
  nigeria: '/assets/stamps/nigeria.png',
  portugal: '/assets/stamps/portugal.png',
  spain: '/assets/stamps/spain.png',
  tanzania: '/assets/stamps/tanzania.png',
  usa: '/assets/stamps/usa.png',
} as const

/** The untitled stamp that sits on the Lisbon ticket (rotated ~20° in CSS and
 *  clipped by the ticket edge). `stamps.portugal` — the titled one — is the
 *  stamp that drops on ending 11B. They are not interchangeable. */
export const ticketStamp = '/assets/stamps/portugal-ticket.png'

/** Lock screen (04b). A night-out street photo, not a stamp painting.
 *  Cover the frame and lay `--gradient-legibility-shade` over it. */
export const lockScreenWallpaper = '/assets/lockscreen-wallpaper.jpg'
export const lockScreenWallpaperPosition = '52% center'

export type StampCountry = keyof typeof stamps
export type AvatarPhotoId = keyof typeof avatarPhotos

/** The ticket shape with its two notches, exported from Figma node 141:12831.
 *  350 x 150, with the sky gradient baked into the SVG. */
export const ticketShape = '/assets/ticket.svg'

/**
 * Home's "Your stamps · 4 countries" row, read off the Figma frame
 * (162:429 > 165:24924). The countries are England, Spain, Italy and France —
 * Portugal is NOT among them; it is the stamp Ari earns at the end of this trip.
 *
 * The stamp component is 300 x 316 natural; every instance on Home sits at
 * scale 0.4275 (128 x 135) and is rotated counter-clockwise. `x`/`y` are
 * offsets inside the row, which itself starts 26 px left of the content column
 * so England bleeds off the edge.
 */
export const homeStamps = [
  { country: 'england', rotate: -11.6, x: 0, y: 28 },
  { country: 'spain', rotate: -5.1, x: 116, y: 15 },
  { country: 'italy', rotate: -28.5, x: 155, y: 66 },
  { country: 'france', rotate: -33.6, x: 295, y: 0 },
] as const satisfies readonly { country: StampCountry; rotate: number; x: number; y: number }[]

/** Natural size of the Stamp component in Figma, before any scaling. */
export const stampNaturalSize = { width: 300, height: 316 } as const
export const homeStampScale = 0.4275

