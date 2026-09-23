import { ticketShape } from '@/data/assets'

/** The ten paths that make up the plane inside the postmark, with the exact
 *  insets Figma nests them at. Outer inset positions the path's box inside the
 *  plane; inner inset bleeds the stroke past that box. */
const PLANE = [
  { box: '0.74% 37.87% 32.12% 37.95%', bleed: '-1.11% -4.43%' },
  { box: '28% 37.47% 5.07% 41.85%', bleed: '-1.11% -5.18%' },
  { box: '28% 0.91% 33.91% 61.45%', bleed: '-1.96% -2.85%' },
  { box: '27.25% 60.85% 33.9% 0.91%', bleed: '-1.92% -2.8%' },
  { box: '78.83% 25.55% 7.98% 55.98%', bleed: '-5.65% -5.8% -5.66% -5.8%' },
  { box: '78.83% 55.97% 7.98% 25.56%', bleed: '-5.65% -5.8% -5.66% -5.8%' },
  { box: '83.07% 49.76% 0.74% 50.24%', bleed: '-4.61% -0.37px' },
  { box: '48.29% 61.6% 36.88% 1.26%', bleed: '-5.03% -2.89%' },
  { box: '48.29% 1.16% 36.88% 61.7%', bleed: '-5.03% -2.89%' },
  { box: '11.6% 42.9% 84.8% 43.39%', bleed: '-20.69% -7.82%' },
]

const POSTMARK_INK = 'rgb(31 30 36 / 0.82)'

type TicketProps = {
  destination: string
  dates: string
}

/**
 * The trip hero: 350 × 150, used on 02, 03a, 03b, 04, 06, 07 and 08 (and 01).
 * Build it once — this is the only place the art lives.
 *
 * The art is no longer a single stamp PNG. It is four layers over the ticket
 * shape: a Belém painting behind a left-to-right fade mask, then the round
 * "TripUp 2026" postmark, the cancel waves, and the VISITED cancel — each with
 * its own rotation, all clipped by the ticket edge.
 */
export function Ticket({ destination, dates }: TicketProps) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ width: 350, height: 150, borderRadius: 'var(--radius-card-lg)' }}
    >
      <img
        src={ticketShape}
        alt=""
        aria-hidden="true"
        width={350}
        height={150}
        className="absolute inset-0 block"
      />

      {/* Belém painting, faded in from the left by an alpha mask */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: 181,
          top: -21.04,
          width: 169,
          height: 227.856,
          maskImage: 'url(/assets/ticket/belem-mask.svg)',
          WebkitMaskImage: 'url(/assets/ticket/belem-mask.svg)',
          maskSize: '169px 227.856px',
          WebkitMaskSize: '169px 227.856px',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/ticket/belem-painting.png"
            alt=""
            className="absolute h-full"
            style={{ left: '-17.8%', width: '135.59%', maxWidth: 'none' }}
          />
        </div>
      </div>

      {/* Round postmark */}
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-center"
        style={{ left: 239.95, top: 1.95, width: 107.622, height: 107.622 }}
      >
        <div style={{ rotate: '-16.74deg' }}>
          <div
            className="relative overflow-hidden"
            style={{
              width: 86.402,
              height: 86.402,
              borderRadius: 43.201,
              border: `2.348px solid ${POSTMARK_INK}`,
            }}
          >
            <div
              className="absolute flex items-center justify-center"
              style={{ left: 2.75, top: 2.49, width: 78.861, height: 78.859 }}
            >
              <div style={{ rotate: '0.59deg' }}>
                <div className="relative" style={{ width: 78.061, height: 78.06 }}>
                  <div className="absolute" style={{ inset: '-1.15% 0 0 0' }}>
                    <img
                      src="/assets/ticket/postmark-ring.svg"
                      alt=""
                      className="block h-full w-full"
                      style={{ maxWidth: 'none' }}
                    />
                  </div>
                  <div className="absolute" style={{ inset: '14.96% 26.5% 21.33% 28.9%' }}>
                    <div
                      className="absolute bottom-0 top-0 overflow-hidden"
                      style={{ left: '50%', transform: 'translateX(-50%)', width: 34.811 }}
                    >
                      {PLANE.map((p, i) => (
                        <div key={i} className="absolute" style={{ inset: p.box }}>
                          <div className="absolute" style={{ inset: p.bleed }}>
                            <img
                              src={`/assets/ticket/plane-${i}.svg`}
                              alt=""
                              className="block h-full w-full"
                              style={{ maxWidth: 'none' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel waves */}
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-center"
        style={{ left: 208, top: 19, width: 61.88, height: 38.143 }}
      >
        <div style={{ rotate: '-12.42deg' }}>
          <img
            src="/assets/ticket/cancel-waves.svg"
            alt=""
            className="block"
            style={{ width: 57.552, height: 26.378, maxWidth: 'none' }}
          />
        </div>
      </div>

      {/* VISITED cancel */}
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-center"
        style={{ left: 209, top: 55, width: 51.48, height: 31.18 }}
      >
        <div style={{ rotate: '-20.42deg' }}>
          <span
            className="inline-flex items-start font-semibold"
            style={{
              padding: '0.939px 4.697px',
              borderRadius: 1.409,
              border: `1.174px solid ${POSTMARK_INK}`,
              color: POSTMARK_INK,
              fontSize: 10.332,
              lineHeight: 1.3,
              letterSpacing: '-0.0939px',
              whiteSpace: 'nowrap',
            }}
          >
            VISITED
          </span>
        </div>
      </div>

      {/* Title sits over the art */}
      <div
        className="absolute flex flex-col items-start whitespace-nowrap"
        style={{ left: 16, top: 40, color: 'var(--color-ink-primary)' }}
      >
        <span className="font-display text-destination uppercase">{destination}</span>
        <span className="text-footnote font-medium">{dates}</span>
      </div>
    </div>
  )
}
