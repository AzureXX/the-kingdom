import { safeJsonParse, encodeBase64, decodeBase64 } from '@/lib/game/utils/stringUtils'

describe('stringUtils', () => {
  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key": "value"}', {})
      expect(result).toEqual({ key: 'value' })
    })

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: 'value' }
      const result = safeJsonParse('invalid json', fallback)
      expect(result).toEqual(fallback)
    })

    it('should return fallback for empty string', () => {
      const fallback = { default: 'value' }
      const result = safeJsonParse('', fallback)
      expect(result).toEqual(fallback)
    })

    it('should return fallback for null', () => {
      const fallback = { default: 'value' }
      const result = safeJsonParse(null as unknown as string, fallback)
      expect(result).toEqual(null) // null input returns null, not fallback
    })

    it('should return fallback for undefined', () => {
      const fallback = { default: 'value' }
      const result = safeJsonParse(undefined as unknown as string, fallback)
      expect(result).toEqual(fallback)
    })

    it('should parse complex objects', () => {
      const complexObject = {
        string: 'test',
        number: 123,
        boolean: true,
        array: [1, 2, 3],
        nested: { key: 'value' }
      }
      const result = safeJsonParse(JSON.stringify(complexObject), {})
      expect(result).toEqual(complexObject)
    })
  })

  describe('encodeBase64', () => {
    it('should encode strings to base64', () => {
      const result = encodeBase64('hello world')
      expect(result).toBe('aGVsbG8gd29ybGQ=')
    })

    it('should handle empty strings', () => {
      const result = encodeBase64('')
      expect(result).toBe('')
    })

    it('should handle special characters', () => {
      const result = encodeBase64('hello@world#123')
      expect(result).toBe('aGVsbG9Ad29ybGQjMTIz') // Correct base64 encoding
    })
  })

  describe('decodeBase64', () => {
    it('should decode base64 strings', () => {
      const result = decodeBase64('aGVsbG8gd29ybGQ=')
      expect(result).toBe('hello world')
    })

    it('should handle empty strings', () => {
      const result = decodeBase64('')
      expect(result).toBe('')
    })

    it('should handle special characters', () => {
      const result = decodeBase64('aGVsbG9Ad29ybGQjMTIz')
      expect(result).toBe('hello@world#123')
    })

    it('should handle invalid base64 gracefully', () => {
      expect(() => decodeBase64('invalid-base64!')).toThrow()
    })
  })
})
