/** Money is stored in integer cents everywhere in the app. */

/** "€190" / "€1,284" — whole euros, no decimals, thousands-grouped. */
export function formatEuros(cents: number): string {
  const sign = cents < 0 ? '-' : ''
  const euros = Math.round(Math.abs(cents) / 100)
  return `${sign}€${euros.toLocaleString('en-US')}`
}

/** "€20,00" — full cents, comma decimal. For amounts entered or paid. */
export function formatEurosWithCents(cents: number): string {
  const { sign, euros, decimals } = splitEuroCents(cents)
  return `${sign}€${euros},${decimals}`
}

/** "€30" when the amount is a whole euro, "€4,67" when it isn't — the format
 *  the expense ledger's "your share" line uses throughout 09. */
export function formatEurosAuto(cents: number): string {
  return Math.round(Math.abs(cents)) % 100 === 0 ? formatEuros(cents) : formatEurosWithCents(cents)
}

/**
 * Splits a cents amount into its rendering parts so a screen can style the
 * decimals separately (Data/Bar Muted, per the design system's "€20,00"
 * amounts where the ",00" is dimmed).
 */
export function splitEuroCents(cents: number): { sign: string; euros: string; decimals: string } {
  const abs = Math.abs(Math.round(cents))
  return {
    sign: cents < 0 ? '-' : '',
    euros: String(Math.floor(abs / 100)),
    decimals: String(abs % 100).padStart(2, '0'),
  }
}
