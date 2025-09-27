import { calculateAllGameCalculations, createMemoizedCostFor, createMemoizedCanAfford } from '@/lib/game/utils/gameCalculations'
import { createTestGameState, createGameStateWithResources, createGameStateWithBuildings } from '../utils/testHelpers'

describe('resourceCalculations', () => {
  describe('calculateAllGameCalculations', () => {
    it('should calculate all game calculations', () => {
      const state = createTestGameState()
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations).toHaveProperty('perSec')
      expect(calculations).toHaveProperty('multipliers')
      expect(calculations).toHaveProperty('technologyCosts')
      expect(calculations).toHaveProperty('upgradeCosts')
      expect(calculations).toHaveProperty('prestigePotential')
    })

    it('should calculate production rates', () => {
      const state = createGameStateWithBuildings({
        woodcutter: 2, // 2 * 1.2 = 2.4 wood/s
        quarry: 1,     // 1 * 0.8 = 0.8 stone/s
        farm: 1,       // 1 * 1.5 = 1.5 food/s
      })
      
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations.perSec.wood).toBeCloseTo(2.4, 2)
      expect(calculations.perSec.stone).toBeCloseTo(0.8, 2)
      expect(calculations.perSec.food).toBeCloseTo(1.5, 2)
    })

    it('should calculate consumption rates', () => {
      const state = createGameStateWithBuildings({
        blacksmith: 1, // Consumes 0.3 wood/s and 0.2 stone/s
        castle: 1,     // Consumes 0.5 food/s
      })
      
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations.perSec.wood).toBeCloseTo(-0.3, 2)
      expect(calculations.perSec.stone).toBeCloseTo(-0.2, 2)
      expect(calculations.perSec.food).toBeCloseTo(-0.5, 2)
    })

    it('should calculate net production (production - consumption)', () => {
      const state = createGameStateWithBuildings({
        woodcutter: 2, // +2.4 wood/s
        blacksmith: 1, // -0.3 wood/s, -0.2 stone/s
        farm: 1,       // +1.5 food/s
        castle: 1,     // -0.5 food/s
      })
      
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations.perSec.wood).toBeCloseTo(2.1, 2) // 2.4 - 0.3
      expect(calculations.perSec.stone).toBeCloseTo(-0.2, 2) // 0 - 0.2
      expect(calculations.perSec.food).toBeCloseTo(1.0, 2) // 1.5 - 0.5
    })
  })

  describe('createMemoizedCostFor', () => {
    it('should create a memoized cost function', () => {
      const state = createTestGameState()
      const costFor = createMemoizedCostFor(state)
      
      expect(typeof costFor).toBe('function')
    })

    it('should calculate building costs', () => {
      const state = createTestGameState()
      const costFor = createMemoizedCostFor(state)
      
      const cost = costFor('woodcutter')
      expect(cost).toHaveProperty('gold')
      expect(cost.gold).toBeGreaterThan(0)
    })
  })

  describe('createMemoizedCanAfford', () => {
    it('should create a memoized affordability function', () => {
      const state = createTestGameState()
      const canAfford = createMemoizedCanAfford(state)
      
      expect(typeof canAfford).toBe('function')
    })

    it('should check if player can afford costs', () => {
      const state = createGameStateWithResources({
        gold: 100,
        wood: 50,
      })
      const canAfford = createMemoizedCanAfford(state)
      
      const affordable = canAfford({ gold: 50, wood: 25 })
      expect(affordable).toBe(true)
      
      const notAffordable = canAfford({ gold: 200, wood: 100 })
      expect(notAffordable).toBe(false)
    })
  })
})