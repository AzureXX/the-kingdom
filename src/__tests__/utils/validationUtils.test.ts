import { isValidResourceKey, isValidBuildingKey, isValidTechnologyKey } from '@/lib/game/utils'

describe('validationUtils', () => {
  describe('isValidResourceKey', () => {
    it('should return true for valid resource keys', () => {
      expect(isValidResourceKey('gold')).toBe(true)
      expect(isValidResourceKey('wood')).toBe(true)
      expect(isValidResourceKey('stone')).toBe(true)
      expect(isValidResourceKey('food')).toBe(true)
      expect(isValidResourceKey('prestige')).toBe(true)
      expect(isValidResourceKey('researchPoints')).toBe(true)
    })

    it('should return false for invalid resource keys', () => {
      expect(isValidResourceKey('invalid')).toBe(false)
      expect(isValidResourceKey('')).toBe(false)
      expect(isValidResourceKey('GOLD')).toBe(false)
      expect(isValidResourceKey('gold ')).toBe(false)
    })

    it('should return false for non-string inputs', () => {
      expect(isValidResourceKey(null as unknown as string)).toBe(false)
      expect(isValidResourceKey(undefined as unknown as string)).toBe(false)
      expect(isValidResourceKey(123 as unknown as string)).toBe(false)
      expect(isValidResourceKey({} as unknown as string)).toBe(false)
    })
  })

  describe('isValidBuildingKey', () => {
    it('should return true for valid building keys', () => {
      expect(isValidBuildingKey('woodcutter')).toBe(true) // Correct key name
      expect(isValidBuildingKey('quarry')).toBe(true)
      expect(isValidBuildingKey('farm')).toBe(true)
      expect(isValidBuildingKey('blacksmith')).toBe(true)
      expect(isValidBuildingKey('castle')).toBe(true)
      expect(isValidBuildingKey('library')).toBe(true)
      expect(isValidBuildingKey('university')).toBe(true)
      expect(isValidBuildingKey('laboratory')).toBe(true)
    })

    it('should return false for invalid building keys', () => {
      expect(isValidBuildingKey('invalid')).toBe(false)
      expect(isValidBuildingKey('')).toBe(false)
      expect(isValidBuildingKey('WOODCUTTERS_HUT')).toBe(false)
      expect(isValidBuildingKey('woodcutters hut')).toBe(false)
    })

    it('should return false for non-string inputs', () => {
      expect(isValidBuildingKey(null as unknown as string)).toBe(false)
      expect(isValidBuildingKey(undefined as unknown as string)).toBe(false)
      expect(isValidBuildingKey(123 as unknown as string)).toBe(false)
      expect(isValidBuildingKey({} as unknown as string)).toBe(false)
    })
  })

  describe('isValidTechnologyKey', () => {
    it('should return true for valid technology keys', () => {
      expect(isValidTechnologyKey('writing')).toBe(true)
      expect(isValidTechnologyKey('mathematics')).toBe(true)
      expect(isValidTechnologyKey('engineering')).toBe(true)
      expect(isValidTechnologyKey('chemistry')).toBe(true)
      expect(isValidTechnologyKey('physics')).toBe(true)
      expect(isValidTechnologyKey('biology')).toBe(true)
    })

    it('should return false for invalid technology keys', () => {
      expect(isValidTechnologyKey('invalid')).toBe(false)
      expect(isValidTechnologyKey('')).toBe(false)
      expect(isValidTechnologyKey('WRITING')).toBe(false)
      expect(isValidTechnologyKey('writing ')).toBe(false)
    })

    it('should return false for non-string inputs', () => {
      expect(isValidTechnologyKey(null as unknown as string)).toBe(false)
      expect(isValidTechnologyKey(undefined as unknown as string)).toBe(false)
      expect(isValidTechnologyKey(123 as unknown as string)).toBe(false)
      expect(isValidTechnologyKey({} as unknown as string)).toBe(false)
    })
  })
})
