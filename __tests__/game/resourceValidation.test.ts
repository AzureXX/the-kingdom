import { isValidResourceKey, validateResources, validateResourceOperation } from '@/lib/game/utils/validation/resourceValidation'
import type { ResourceKey, ResourceDef } from '@/lib/game/types'

describe('resourceValidation', () => {
  describe('isValidResourceKey', () => {
    it('should validate resource keys', () => {
      expect(isValidResourceKey('gold')).toBe(true)
      expect(isValidResourceKey('wood')).toBe(true)
      expect(isValidResourceKey('stone')).toBe(true)
      expect(isValidResourceKey('food')).toBe(true)
      expect(isValidResourceKey('prestige')).toBe(true)
      expect(isValidResourceKey('researchPoints')).toBe(true)
    })

    it('should reject invalid resource keys', () => {
      expect(isValidResourceKey('invalid')).toBe(false)
      expect(isValidResourceKey('')).toBe(false)
      expect(isValidResourceKey('GOLD')).toBe(false)
      expect(isValidResourceKey('gold ')).toBe(false)
    })
  })

  describe('validateResources', () => {
    it('should validate valid resource definitions', () => {
      const resources: Record<ResourceKey, ResourceDef> = {
        gold: { name: 'Gold', icon: '💰', decimals: 0, start: 0 },
        wood: { name: 'Wood', icon: '🪵', decimals: 0, start: 0 },
        stone: { name: 'Stone', icon: '🪨', decimals: 0, start: 0 },
        food: { name: 'Food', icon: '🍖', decimals: 0, start: 0 },
        prestige: { name: 'Prestige', icon: '👑', decimals: 0, start: 0 },
        researchPoints: { name: 'Research Points', icon: '🔬', decimals: 0, start: 0 },
      }
      const allKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints']
      const result = validateResources(resources, allKeys)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject missing resource definitions', () => {
      const resources: Partial<Record<ResourceKey, ResourceDef>> = {
        gold: { name: 'Gold', icon: '💰', decimals: 0, start: 0 },
        // Missing wood, stone, etc.
      }
      const allKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints']
      const result = validateResources(resources as Record<ResourceKey, ResourceDef>, allKeys)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0].message).toContain('Missing resource definition')
    })

    it('should reject invalid resource definitions', () => {
      const resources: Record<ResourceKey, ResourceDef> = {
        gold: { name: '', icon: '💰', decimals: 0, start: 0 }, // Invalid name
        wood: { name: 'Wood', icon: '🪵', decimals: -1, start: 0 }, // Invalid decimals
        stone: { name: 'Stone', icon: '🪨', decimals: 0, start: -1 }, // Invalid start
      } as Record<ResourceKey, ResourceDef>
      const allKeys: ResourceKey[] = ['gold', 'wood', 'stone']
      const result = validateResources(resources, allKeys)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('validateResourceOperation', () => {
    it('should validate valid resource operations', () => {
      const operation = { gold: 25, wood: 15 }
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject operations with invalid resource keys', () => {
      const operation = { gold: 25, invalid: 15 } as Record<string, number>
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toContain('Unknown resource key')
    })

    it('should reject operations with negative amounts', () => {
      const operation = { gold: -25, wood: 15 }
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toContain('Invalid amount')
    })

    it('should reject operations with non-numeric amounts', () => {
      const operation = { gold: 'invalid', wood: 15 } as Record<string, string | number>
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toContain('Invalid amount')
    })
  })
})