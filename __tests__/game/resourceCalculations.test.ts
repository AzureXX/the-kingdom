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
        primitiveHut: 2, // 2 * 0.5 = 1.0 food/s
        toolWorkshop: 1, // 1 * 0.3 = 0.3 tools/s
        waterWell: 1,    // 1 * 1.0 = 1.0 water/s
      })
      
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations.perSec.food).toBeCloseTo(1.0, 2)
      expect(calculations.perSec.tools).toBeCloseTo(0.3, 2)
      expect(calculations.perSec.water).toBeCloseTo(1.0, 2)
    })

    it('should calculate consumption rates', () => {
      const state = createGameStateWithBuildings({
        toolWorkshop: 1, // Consumes 0.2 wood/s and 0.1 stone/s
        studyCorner: 1,  // Consumes 0.1 food/s
      })
      
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations.perSec.wood).toBeCloseTo(-0.2, 2)
      expect(calculations.perSec.stone).toBeCloseTo(-0.1, 2)
      expect(calculations.perSec.food).toBeCloseTo(-0.1, 2)
    })

    it('should calculate net production (production - consumption)', () => {
      const state = createGameStateWithBuildings({
        primitiveHut: 2, // +1.0 food/s
        toolWorkshop: 1, // +0.3 tools/s, -0.2 wood/s, -0.1 stone/s
        waterWell: 1,    // +1.0 water/s
        studyCorner: 1,  // +0.2 knowledge/s, -0.1 food/s
      })
      
      const calculations = calculateAllGameCalculations(state)
      
      expect(calculations.perSec.food).toBeCloseTo(0.9, 2) // 1.0 - 0.1
      expect(calculations.perSec.wood).toBeCloseTo(-0.2, 2) // 0 - 0.2
      expect(calculations.perSec.stone).toBeCloseTo(-0.1, 2) // 0 - 0.1
      expect(calculations.perSec.tools).toBeCloseTo(0.3, 2) // 0.3
      expect(calculations.perSec.water).toBeCloseTo(1.0, 2) // 1.0
      expect(calculations.perSec.knowledge).toBeCloseTo(0.2, 2) // 0.2
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
      
      const cost = costFor('primitiveHut')
      expect(cost).toHaveProperty('wood')
      expect(cost.wood).toBeGreaterThan(0)
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
        wood: 50,
        stone: 25,
        food: 30,
      })
      const canAfford = createMemoizedCanAfford(state)
      
      const affordable = canAfford({ wood: 25, stone: 15, food: 10 })
      expect(affordable).toBe(true)
      
      const notAffordable = canAfford({ wood: 100, stone: 50, food: 100 })
      expect(notAffordable).toBe(false)
    })
  })
})