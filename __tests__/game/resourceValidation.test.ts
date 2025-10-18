import { isValidResourceKey, validateResources, validateResourceOperation } from '@/lib/game/utils/validation/resourceValidation'
import type { ResourceKey, ResourceDef } from '@/lib/game/types'

describe('resourceValidation', () => {
  describe('isValidResourceKey', () => {
    it('should validate resource keys', () => {
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

    it('should reject invalid resource keys', () => {
      expect(isValidResourceKey('invalid')).toBe(false)
      expect(isValidResourceKey('')).toBe(false)
      expect(isValidResourceKey('WOOD')).toBe(false)
      expect(isValidResourceKey('wood ')).toBe(false)
    })
  })

  describe('validateResources', () => {
    it('should validate valid resource definitions', () => {
      const resources: Record<ResourceKey, ResourceDef> = {
        wood: { name: 'Wood', icon: '🪵', decimals: 0, start: 0 },
        stone: { name: 'Stone', icon: '🪨', decimals: 0, start: 0 },
        food: { name: 'Food', icon: '🍖', decimals: 0, start: 0 },
        water: { name: 'Water', icon: '💧', decimals: 0, start: 0 },
        clay: { name: 'Clay', icon: '🏺', decimals: 0, start: 0 },
        fiber: { name: 'Fiber', icon: '🌿', decimals: 0, start: 0 },
        tools: { name: 'Tools', icon: '🔨', decimals: 0, start: 0 },
        knowledge: { name: 'Knowledge', icon: '🧠', decimals: 0, start: 0 },
        prestige: { name: 'Prestige', icon: '👑', decimals: 0, start: 0 },
      }
      const allKeys: ResourceKey[] = ['wood', 'stone', 'food', 'water', 'clay', 'fiber', 'tools', 'knowledge', 'prestige']
      const result = validateResources(resources, allKeys)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject missing resource definitions', () => {
      const resources: Partial<Record<ResourceKey, ResourceDef>> = {
        wood: { name: 'Wood', icon: '🪵', decimals: 0, start: 0 },
        // Missing stone, food, etc.
      }
      const allKeys: ResourceKey[] = ['wood', 'stone', 'food', 'water', 'clay', 'fiber', 'tools', 'knowledge', 'prestige']
      const result = validateResources(resources as Record<ResourceKey, ResourceDef>, allKeys)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0].message).toContain('Missing resource definition')
    })

    it('should reject invalid resource definitions', () => {
      const resources: Record<ResourceKey, ResourceDef> = {
        wood: { name: '', icon: '🪵', decimals: 0, start: 0 }, // Invalid name
        stone: { name: 'Stone', icon: '🪨', decimals: -1, start: 0 }, // Invalid decimals
        food: { name: 'Food', icon: '🍖', decimals: 0, start: -1 }, // Invalid start
      } as Record<ResourceKey, ResourceDef>
      const allKeys: ResourceKey[] = ['wood', 'stone', 'food']
      const result = validateResources(resources, allKeys)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('validateResourceOperation', () => {
    it('should validate valid resource operations', () => {
      const operation = { wood: 25, stone: 15 }
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['wood', 'stone', 'food', 'water', 'clay', 'fiber', 'tools', 'knowledge', 'prestige']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject operations with invalid resource keys', () => {
      const operation = { wood: 25, invalid: 15 } as Record<string, number>
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['wood', 'stone', 'food', 'water', 'clay', 'fiber', 'tools', 'knowledge', 'prestige']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toContain('Unknown resource key')
    })

    it('should reject operations with negative amounts', () => {
      const operation = { wood: -25, stone: 15 }
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['wood', 'stone', 'food', 'water', 'clay', 'fiber', 'tools', 'knowledge', 'prestige']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toContain('Invalid amount')
    })

    it('should reject operations with non-numeric amounts', () => {
      const operation = { wood: 'invalid', stone: 15 } as Record<string, string | number>
      const operationType = 'cost' as const
      const availableResources: ResourceKey[] = ['wood', 'stone', 'food', 'water', 'clay', 'fiber', 'tools', 'knowledge', 'prestige']
      const result = validateResourceOperation(operation, operationType, availableResources)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].message).toContain('Invalid amount')
    })
  })
})