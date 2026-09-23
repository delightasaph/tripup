import { describe, expect, it } from 'vitest'
import { formatEuros, formatEurosAuto, formatEurosWithCents, splitEuroCents } from './money'

describe('formatEuros', () => {
  it('formats whole euros with no decimals', () => {
    expect(formatEuros(13000)).toBe('€130')
    expect(formatEuros(19000)).toBe('€190')
    expect(formatEuros(2000)).toBe('€20')
  })

  it('rounds a fractional cent amount to the nearest euro', () => {
    expect(formatEuros(150)).toBe('€2')
    expect(formatEuros(149)).toBe('€1')
  })

  it('keeps the sign on a negative balance', () => {
    expect(formatEuros(-3000)).toBe('-€30')
  })

  it('groups thousands', () => {
    expect(formatEuros(128400)).toBe('€1,284')
  })
})

describe('formatEurosWithCents', () => {
  it('formats with a comma decimal', () => {
    expect(formatEurosWithCents(19000)).toBe('€190,00')
    expect(formatEurosWithCents(2000)).toBe('€20,00')
  })

  it('pads single-digit cents', () => {
    expect(formatEurosWithCents(105)).toBe('€1,05')
  })
})

describe('formatEurosAuto', () => {
  it('drops the decimals for a whole euro amount', () => {
    expect(formatEurosAuto(3000)).toBe('€30')
  })

  it('keeps the decimals otherwise', () => {
    expect(formatEurosAuto(467)).toBe('€4,67')
    expect(formatEurosAuto(1650)).toBe('€16,50')
  })
})

describe('splitEuroCents', () => {
  it('splits the parts for two-tone rendering', () => {
    expect(splitEuroCents(19000)).toEqual({ sign: '', euros: '190', decimals: '00' })
    expect(splitEuroCents(-2005)).toEqual({ sign: '-', euros: '20', decimals: '05' })
  })
})
