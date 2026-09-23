/** Asset paths, in one place so no screen hard-codes a filename.
 *  See docs/DESIGN_SYSTEM.md §7 for the rules that come with them. */

/** Already cropped to the face and already circular — render at size, unaltered.
 *  Ren is deliberately absent: he is the initials avatar "RT". */
export const avatarPhotos = {
  ari: '/assets/avatars/ari.png',
  nic: '/assets/avatars/nic.png',
  bea: '/assets/avatars/bea.png',
  kofi: '/assets/avatars/kofi.png',
  sven: '/assets/avatars/sven.png',
  mira: '/assets/avatars/mira.png',
} as const

export const placePhotos = {
  taberna: '/assets/places/taberna.webp',
  timeout: '/assets/places/timeout.webp',
  ramiro: '/assets/places/ramiro.webp',
} as const

/**
 * Every stamp is exported flat at 0°, with transparent padding and **no
 * shadow** — tilt them with CSS `rotate` and give them `stampShadow()`.
 *
 * `england`, `spain`, `italy` and `france` are the re-exports: 428 x 442, and
 * without the "x1" count badge. The other eleven are the first exports at
 * 1000 x 1032 (four times the bytes) and do carry the "x1" badge. Of those,
 * only `portugal` is actually used — on ending 11B, where "x1" is arguably
 * right, since it is Ari's first visit.
 */
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

/** The dashed "still to vote" ring behind Sven's avatar on 05 (Figma 84:306).
 *  Exported at 84 x 84 and drawn at 42. */
export const pendingRing = '/assets/pending-ring.png'

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
 * `cx`/`cy` are each stamp's **centre**, relative to the row's own origin
 * (which starts 26 px left of the content column so England bleeds off the
 * edge). Centres rather than corners because Figma reports a rotated node's
 * x/y as its *bounding box* top-left, which moves as the angle changes —
 * placing an unrotated box at those coordinates lands it about 12 px out.
 * A centre is rotation-invariant.
 */
export const homeStamps = [
  { country: 'england', rotate: -11.6, cx: 76.3, cy: 107 },
  { country: 'spain', rotate: -5.1, cx: 185.9, cy: 87.7 },
  { country: 'italy', rotate: -28.5, cx: 243.8, cy: 155.8 },
  { country: 'france', rotate: -33.6, cx: 385.6, cy: 91.7 },
] as const satisfies readonly { country: StampCountry; rotate: number; cx: number; cy: number }[]

/** The row starts this far left of the content column. */
export const homeStampsRowOffset = -26

/**
 * The stamp's drop shadow, scaled to the width you are drawing it at.
 *
 * It has to be a `filter`, not a `box-shadow`: the PNGs carry transparent
 * padding, so a box-shadow would trace a rectangle around the padding instead
 * of the perforated edge. The exports are flat and shadowless by design —
 * every stamp shadow in the UI comes from here.
 *
 * Figma uses a 17.143px offset and blur on the 300px-wide component, which is
 * `--stamp-shadow-ratio` (0.05714) of the rendered width.
 */
export function stampShadow(renderedWidth: number): string {
  const d = Math.round(renderedWidth * 0.05714 * 10) / 10
  return `drop-shadow(0 ${d}px ${d}px var(--stamp-shadow-color))`
}

/** Natural size of the Stamp component in Figma, before any scaling. */
export const stampNaturalSize = { width: 300, height: 316 } as const
export const homeStampScale = 0.4275

