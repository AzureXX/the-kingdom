import { addResources, getResource, setResource, updateMultipleResources } from '@/lib/game/utils/gameState'
import { createTestGameState, createGameStateWithResources } from '@/__tests__/utils/testHelpers'
import type { ResourceKey } from '@/lib/game/types'

describe('resourceUpdates', () => {
  describe('addResources', () => {
    it('should add resources to state', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
      })
      
      const newState = addResources(state, { gold: 25, wood: 15 })
      
      expect(newState.resources.gold).toBe(125) // 100 + 25
      expect(newState.resources.wood).toBe(65)  // 50 + 15
    })

    it('should handle adding zero resources', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
      })
      
      const newState = addResources(state, { gold: 0, wood: 0 })
      
      expect(newState.resources.gold).toBe(100) // Unchanged
      expect(newState.resources.wood).toBe(50)  // Unchanged
    })

    it('should handle adding to zero resources', () => {
      const state = createGameStateWithResources({
        gold: 0,
        wood: 0,
      })
      
      const newState = addResources(state, { gold: 25, wood: 15 })
      
      expect(newState.resources.gold).toBe(25)
      expect(newState.resources.wood).toBe(15)
    })

    it('should preserve other state properties', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
      })
      
      const newState = addResources(state, { gold: 25 })
      
      expect(newState.resources.gold).toBe(125) // Changed
      expect(newState.resources.wood).toBe(50)  // Unchanged
      expect(newState.buildings).toEqual(state.buildings) // Unchanged
      expect(newState.technologies).toEqual(state.technologies) // Unchanged
    })
  })

  describe('updateMultipleResources', () => {
    it('should update multiple resources', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
      })
      
      const newState = updateMultipleResources(state, { gold: 25, wood: 15 })
      
      expect(newState.resources.gold).toBe(25) // Set to 25
      expect(newState.resources.wood).toBe(15) // Set to 15
    })

    it('should not allow negative resource values', () => {
      const state = createGameStateWithResources({
        gold: 10,
        wood: 5,
      })
      
      const newState = updateMultipleResources(state, { gold: -25, wood: -15 })
      
      expect(newState.resources.gold).toBe(0) // Clamped to 0
      expect(newState.resources.wood).toBe(0) // Clamped to 0
    })

    it('should preserve other state properties', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
      })
      
      const newState = updateMultipleResources(state, { gold: 25 })
      
      expect(newState.resources.gold).toBe(25)  // Changed
      expect(newState.resources.wood).toBe(50)  // Unchanged
      expect(newState.buildings).toEqual(state.buildings) // Unchanged
      expect(newState.technologies).toEqual(state.technologies) // Unchanged
    })
  })

  describe('getResource', () => {
    it('should get resource values', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
        stone: 25,
      })
      
      expect(getResource(state, 'gold')).toBe(100)
      expect(getResource(state, 'wood')).toBe(50)
      expect(getResource(state, 'stone')).toBe(25)
    })

    it('should return zero for missing resources', () => {
      const state = createTestGameState()
      
      expect(getResource(state, 'gold')).toBe(10) // Default starting amount
      expect(getResource(state, 'wood')).toBe(0)
      expect(getResource(state, 'stone')).toBe(0)
    })

    it('should handle invalid resource keys', () => {
      const state = createTestGameState()
      
      expect(getResource(state, 'invalid' as ResourceKey)).toBe(0)
    })
  })

  describe('setResource', () => {
    it('should set resource values', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'gold', 200)
      
      expect(newState.resources.gold).toBe(200)
    })

    it('should not allow negative resource values', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'gold', -10)
      
      expect(newState.resources.gold).toBe(0) // Clamped to 0
    })

    it('should preserve other state properties', () => {
      const state = createTestGameState()
      
      const newState = setResource(state, 'gold', 200)
      
      expect(newState.resources.gold).toBe(200) // Changed
      expect(newState.resources.wood).toBe(state.resources.wood) // Unchanged
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