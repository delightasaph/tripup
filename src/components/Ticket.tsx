import { ticketShape } from '@/data/assets'
import { Stamp } from './Stamp'
import type { StampCountry } from '@/data/assets'

type TicketProps = {
  destination: string
  dates: string
  /** Omitted on the ticket for a trip that has not happened yet. */
  stampCountry?: StampCountry
}

/**
 * The trip hero: 350 × 150, the sky gradient and the two notches coming from
 * ticket.svg (Figma 141:12831) rather than an approximated shape. The stamp
 * is rotated −20.42° and clipped by the ticket edge.
 */
export function Ticket({ destination, dates, stampCountry }: TicketProps) {
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
      <div
        className="absolute flex flex-col items-start whitespace-nowrap"
        style={{ left: 16, top: 40, color: 'var(--color-stamp-title-navy)' }}
      >
        <span className="font-display text-destination uppercase">{destination}</span>
        <span className="text-footnote font-medium">{dates}</span>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 194, top: 11, width: 183.83, height: 188.25 }}
      >
        <Stamp country={stampCountry} paperWidth={140.897} rotate={-20.42} />
      </div>
    </div>
  )
}
