import { isValidResourceKey, isValidBuildingKey, isValidTechnologyKey } from '@/lib/game/utils/validation'

describe('validationUtils', () => {
  describe('isValidResourceKey', () => {
    it('should return true for valid resource keys', () => {
      expect(isValidResourceKey('wood')).toBe(true)
      expect(isValidResourceKey('stone')).toBe(true)
      expect(isValidResourceKey('food')).toBe(true)
      expect(isValidResourceKey('water')).toBe(true)
      expect(isValidResourceKey('clay')).toBe(true)
      expect(isValidResourceKey('fiber')).toBe(true)
      expect(isValidResourceKey('tools')).toBe(true)
      expect(isValidResourceKey('knowledge')).toBe(true)
      expect(isValidResourceKey('prestige')).toBe(true)
    })

    it('should return false for invalid resource keys', () => {
      expect(isValidResourceKey('invalid')).toBe(false)
      expect(isValidResourceKey('')).toBe(false)
      expect(isValidResourceKey('WOOD')).toBe(false)
      expect(isValidResourceKey('wood ')).toBe(false)
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
      expect(isValidBuildingKey('primitiveHut')).toBe(true)
      expect(isValidBuildingKey('toolWorkshop')).toBe(true)
      expect(isValidBuildingKey('studyCorner')).toBe(true)
      expect(isValidBuildingKey('waterWell')).toBe(true)
      expect(isValidBuildingKey('clayPit')).toBe(true)
      expect(isValidBuildingKey('fiberGarden')).toBe(true)
    })

    it('should return false for invalid building keys', () => {
      expect(isValidBuildingKey('invalid')).toBe(false)
      expect(isValidBuildingKey('')).toBe(false)
      expect(isValidBuildingKey('PRIMITIVE_HUT')).toBe(false)
      expect(isValidBuildingKey('primitive hut')).toBe(false)
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
      expect(isValidTechnologyKey('basicAgriculture')).toBe(true)
      expect(isValidTechnologyKey('basicConstruction')).toBe(true)
      expect(isValidTechnologyKey('toolMaking')).toBe(true)
      expect(isValidTechnologyKey('waterManagement')).toBe(true)
      expect(isValidTechnologyKey('clayProcessing')).toBe(true)
      expect(isValidTechnologyKey('fiberWeaving')).toBe(true)
      expect(isValidTechnologyKey('primitiveMedicine')).toBe(true)
      expect(isValidTechnologyKey('basicStorage')).toBe(true)
    })

    it('should return false for invalid technology keys', () => {
      expect(isValidTechnologyKey('invalid')).toBe(false)
      expect(isValidTechnologyKey('')).toBe(false)
      expect(isValidTechnologyKey('BASIC_AGRICULTURE')).toBe(false)
      expect(isValidTechnologyKey('basic agriculture')).toBe(false)
    })

    it('should return false for non-string inputs', () => {
      expect(isValidTechnologyKey(null as unknown as string)).toBe(false)
      expect(isValidTechnologyKey(undefined as unknown as string)).toBe(false)
      expect(isValidTechnologyKey(123 as unknown as string)).toBe(false)
      expect(isValidTechnologyKey({} as unknown as string)).toBe(false)
    })
  })
})
