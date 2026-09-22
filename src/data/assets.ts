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

/** The four countries already in Ari's collection on Home; Portugal joins them
 *  after ending 11B. */
export const collectedStamps = ['spain', 'france', 'italy', 'greece'] as const

export type StampCountry = keyof typeof stamps
export type AvatarPhotoId = keyof typeof avatarPhotos
