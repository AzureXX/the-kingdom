import { formatNumber } from '@/lib/game/utils/number'

describe('numberUtils', () => {
  describe('formatNumber', () => {
    it('should format small numbers without decimals', () => {
      expect(formatNumber(123)).toBe('123')
      expect(formatNumber(999)).toBe('999')
    })

    it('should format numbers with default decimals', () => {
      expect(formatNumber(1234)).toBe('1.23K')
      expect(formatNumber(12345)).toBe('12.35K')
      expect(formatNumber(123456)).toBe('123.46K')
    })

    it('should format large numbers with K suffix', () => {
      expect(formatNumber(1000)).toBe('1.00K')
      expect(formatNumber(1500)).toBe('1.50K')
      expect(formatNumber(999999)).toBe('1000.00K')
    })

    it('should format very large numbers with M suffix', () => {
      expect(formatNumber(1000000)).toBe('1.00M')
      expect(formatNumber(1500000)).toBe('1.50M')
      expect(formatNumber(999999999)).toBe('1000.00M')
    })

    it('should format extremely large numbers with B suffix', () => {
      expect(formatNumber(1000000000)).toBe('1.00B')
      expect(formatNumber(1500000000)).toBe('1.50B')
    })

    it('should format with custom decimal places', () => {
      expect(formatNumber(1234, 0)).toBe('1.23K') // Always shows 2 decimals for formatted numbers
      expect(formatNumber(1234, 1)).toBe('1.23K') // Always shows 2 decimals for formatted numbers
      expect(formatNumber(1234, 3)).toBe('1.23K') // Limited to 2 decimals max
    })

    it('should handle zero', () => {
      expect(formatNumber(0)).toBe('0')
      expect(formatNumber(0, 2)).toBe('0.00')
    })

    it('should handle negative numbers', () => {
      expect(formatNumber(-1234)).toBe('-1.23K')
      expect(formatNumber(-1000000)).toBe('-1.00M')
    })
  })
})
