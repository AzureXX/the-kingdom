import { addResources, getResource, setResource, updateMultipleResources } from '@/lib/game/utils/gameState'
import { createTestGameState, createGameStateWithResources, createGameStateWithResourcesNoAchievements, addResourcesNoAchievements } from '../utils/testHelpers'
import type { ResourceKey } from '@/lib/game/types'

describe('resourceUpdates', () => {
  describe('addResources', () => {
    it('should add resources to state', () => {
      const state = createGameStateWithResourcesNoAchievements({
        wood: 50,
        stone: 25,
        food: 30,
      })
      
      const newState = addResourcesNoAchievements(state, { wood: 15, stone: 10, food: 20 })
      
      expect(newState.resources.wood).toBe(65)  // 50 + 15
      expect(newState.resources.stone).toBe(35) // 25 + 10
      expect(newState.resources.food).toBe(50)  // 30 + 20
    })

    it('should handle adding zero resources', () => {
      const state = createGameStateWithResources({
        wood: 50,
        stone: 25,
      })
      
      const newState = addResources(state, { wood: 0, stone: 0 })
      
      expect(newState.resources.wood).toBe(50)  // Unchanged
      expect(newState.resources.stone).toBe(25) // Unchanged
    })

    it('should handle adding to zero resources', () => {
      const state = createGameStateWithResources({
        wood: 0,
        stone: 0,
      })
      
      const newState = addResources(state, { wood: 15, stone: 10 })
      
      expect(newState.resources.wood).toBe(15)
      expect(newState.resources.stone).toBe(10)
    })

    it('should preserve other state properties', () => {
      const state = createGameStateWithResourcesNoAchievements({
        wood: 50,
        stone: 25,
      })
      
      const newState = addResourcesNoAchievements(state, { wood: 15 })
      
      expect(newState.resources.wood).toBe(65) // Changed
      expect(newState.resources.stone).toBe(25) // Unchanged
      expect(newState.buildings).toEqual(state.buildings) // Unchanged
      expect(newState.technologies).toEqual(state.technologies) // Unchanged
    })
  })

  describe('updateMultipleResources', () => {
    it('should update multiple resources', () => {
      const state = createGameStateWithResources({
        wood: 50,
        stone: 25,
      })
      
      const newState = updateMultipleResources(state, { wood: 25, stone: 15 })
      
      expect(newState.resources.wood).toBe(25) // Set to 25
      expect(newState.resources.stone).toBe(15) // Set to 15
    })

    it('should not allow negative resource values', () => {
      const state = createGameStateWithResources({
        wood: 10,
        stone: 5,
      })
      
      const newState = updateMultipleResources(state, { wood: -25, stone: -15 })
      
      expect(newState.resources.wood).toBe(0)
      expect(newState.resources.stone).toBe(0)
    })

    it('should preserve other state properties', () => {
      const state = createGameStateWithResources({
        wood: 50,
        stone: 25,
      })
      
      const newState = updateMultipleResources(state, { wood: 25 })
      
      expect(newState.resources.wood).toBe(25)  // Changed
      expect(newState.resources.stone).toBe(25) // Unchanged
      expect(newState.buildings).toEqual(state.buildings) // Unchanged
      expect(newState.technologies).toEqual(state.technologies) // Unchanged
    })
  })

  describe('getResource', () => {
    it('should get resource values', () => {
      const state = createGameStateWithResources({
        wood: 50,
        stone: 25,
        food: 30,
      })
      
      expect(getResource(state, 'wood')).toBe(50)
      expect(getResource(state, 'stone')).toBe(25)
      expect(getResource(state, 'food')).toBe(30)
    })

    it('should return zero for missing resources', () => {
      const state = createTestGameState()
      
      expect(getResource(state, 'wood')).toBe(0) // Default starting amount
      expect(getResource(state, 'stone')).toBe(0)
      expect(getResource(state, 'food')).toBe(0)
    })

    it('should handle invalid resource keys', () => {
      const state = createTestGameState()
      
      expect(getResource(state, 'invalid' as ResourceKey)).toBe(0)
    })
  })

  describe('setResource', () => {
    it('should set resource values', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'wood', 200)
      
      expect(newState.resources.wood).toBe(200)
    })

    it('should not allow negative resource values', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'wood', -10)
      
      expect(newState.resources.wood).toBe(0)
    })

    it('should preserve other state properties', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'wood', 200)
      
      expect(newState.resources.wood).toBe(200) // Changed
      expect(newState.resources.stone).toBe(state.resources.stone) // Unchanged
      expect(newState.buildings).toEqual(state.buildings) // Unchanged
      expect(newState.technologies).toEqual(state.technologies) // Unchanged
    })

    it('should handle invalid resource keys', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'invalid' as unknown as ResourceKey, 100)
      
      expect(newState).not.toBe(state) // Function actually sets the invalid key
      // @ts-expect-error - Invalid key gets set
      expect(newState.resources.invalid as ResourceKey).toBe(100) // Invalid key gets set
    })
  })
})