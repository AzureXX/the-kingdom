import type { GameState } from '@/lib/game/types'
import { getEmptyAchievementBonusesObject } from '@/lib/game/utils/achievement/bonusCalculator'
import { getEmptyPrestigeBonusesObject } from '@/lib/game/utils/prestige/bonusApplication'
import { getEmptyAchievementStateObject } from '@/lib/game/utils/achievement/initialization'
import { getEmptyResearchStateObject } from '@/lib/game/initializers/researchInitializer'
import { getEmptyEventStateObject } from '@/lib/game/initializers/eventInitializer'
import { getEmptyLoopActionsArray } from '@/lib/game/initializers/gameStateFactory'

/**
 * Mock data for testing game functionality
 */

/**
 * Sample game state with basic resources
 */
export const mockBasicGameState: GameState = {
  t: 1000000,
  version: 1,
  isPaused: false,
  clicks: 0,
  
  // Resources
  resources: {
    wood: 50,
    stone: 25,
    food: 75,
    water: 30,
    clay: 15,
    fiber: 10,
    tools: 5,
    knowledge: 20,
    prestige: 0,
  },
  
  // Buildings
  buildings: {
    primitiveHut: 1,
    toolWorkshop: 0,
    studyCorner: 0,
    waterWell: 0,
    clayPit: 0,
    fiberGarden: 0,
  },
  
  // Technologies
  technologies: {
    basicAgriculture: 0,
    basicConstruction: 0,
    toolMaking: 0,
    waterManagement: 0,
    clayProcessing: 0,
    fiberWeaving: 0,
    primitiveMedicine: 0,
    basicStorage: 0,
  },
  
  // Events
  events: getEmptyEventStateObject(),
  
  // Research
  research: getEmptyResearchStateObject(),
  
  // Actions
  actions: {
    unlocks: {
      gatherWood: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      gatherStone: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      huntFood: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      rest: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      craftBasicTools: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      thinkAndLearn: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      collectWater: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      digClay: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      gatherFiber: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
    },
    cooldowns: {},
  },
  
  // Upgrades
  upgrades: {
    royalDecrees: 0,
    masterCraftsmen: 0,
    fertileLands: 0,
    militaryMight: 0,
    goldenTouch: 0,
    forestMastery: 0,
    stoneQuarry: 0,
    researchAcceleration: 0,
    efficientBuilders: 0,
    merchantGuilds: 0,
    royalTreasury: 0,
    militaryEngineers: 0,
    scholarlyPursuits: 0,
    agriculturalRevolution: 0,
    miningInnovation: 0,
    diplomaticRelations: 0,
    technologicalAdvancement: 0,
    economicStimulation: 0,
    culturalHeritage: 0,
    strategicPlanning: 0,
  },
  
  // Loop actions
  loopActions: getEmptyLoopActionsArray(),
  loopSettings: {
    maxConcurrentActions: 3,
    basePointsPerTick: 1,
  },
  
  // Achievements
  achievements: getEmptyAchievementStateObject(),
  
  // Achievement bonuses (new system)
  achievementBonuses: getEmptyAchievementBonusesObject(),
  
  // Lifetime resources
  lifetime: {
    wood: 50,
    stone: 25,
    food: 75,
    water: 30,
    clay: 15,
    fiber: 10,
    tools: 5,
    knowledge: 20,
    prestige: 0,
  },
  
  // Prestige bonuses
  prestigeBonuses: getEmptyPrestigeBonusesObject(),
}

/**
 * Sample game state with advanced resources
 */
export const mockAdvancedGameState: GameState = {
  ...mockBasicGameState,
  resources: {
    wood: 5000,
    stone: 2500,
    food: 7500,
    water: 3000,
    clay: 1500,
    fiber: 1000,
    tools: 500,
    knowledge: 2000,
    prestige: 100,
  },
  
  buildings: {
    primitiveHut: 5,
    toolWorkshop: 3,
    studyCorner: 2,
    waterWell: 4,
    clayPit: 2,
    fiberGarden: 1,
  },
  
  technologies: {
    basicAgriculture: 1,
    basicConstruction: 1,
    toolMaking: 1,
    waterManagement: 1,
    clayProcessing: 0,
    fiberWeaving: 0,
    primitiveMedicine: 0,
    basicStorage: 0,
  },
  
  upgrades: {
    royalDecrees: 5,
    masterCraftsmen: 3,
    fertileLands: 2,
    militaryMight: 1,
    goldenTouch: 0,
    forestMastery: 0,
    stoneQuarry: 0,
    researchAcceleration: 0,
    efficientBuilders: 0,
    merchantGuilds: 0,
    royalTreasury: 0,
    militaryEngineers: 0,
    scholarlyPursuits: 0,
    agriculturalRevolution: 0,
    miningInnovation: 0,
    diplomaticRelations: 0,
    technologicalAdvancement: 0,
    economicStimulation: 0,
    culturalHeritage: 0,
    strategicPlanning: 0,
  },
}

/**
 * Sample game state with all technologies researched
 */
export const mockMaxedGameState: GameState = {
  ...mockAdvancedGameState,
  resources: {
    wood: 500000,
    stone: 250000,
    food: 750000,
    water: 300000,
    clay: 150000,
    fiber: 100000,
    tools: 50000,
    knowledge: 200000,
    prestige: 10000,
  },
  
  buildings: {
    primitiveHut: 50,
    toolWorkshop: 30,
    studyCorner: 20,
    waterWell: 40,
    clayPit: 25,
    fiberGarden: 15,
  },
  
  technologies: {
    basicAgriculture: 1,
    basicConstruction: 1,
    toolMaking: 1,
    waterManagement: 1,
    clayProcessing: 1,
    fiberWeaving: 1,
    primitiveMedicine: 1,
    basicStorage: 1,
  },
  
  upgrades: {
    royalDecrees: 20,
    masterCraftsmen: 25,
    fertileLands: 25,
    militaryMight: 20,
    goldenTouch: 0,
    forestMastery: 0,
    stoneQuarry: 0,
    researchAcceleration: 0,
    efficientBuilders: 0,
    merchantGuilds: 0,
    royalTreasury: 0,
    militaryEngineers: 0,
    scholarlyPursuits: 0,
    agriculturalRevolution: 0,
    miningInnovation: 0,
    diplomaticRelations: 0,
    technologicalAdvancement: 0,
    economicStimulation: 0,
    culturalHeritage: 0,
    strategicPlanning: 0,
  },
}

/**
 * Sample resource cost for testing
 */
export const mockResourceCost = {
  wood: 50,
  stone: 25,
  food: 30,
  water: 20,
  clay: 15,
  fiber: 10,
  tools: 5,
  knowledge: 25,
}

/**
 * Sample resource gains for testing
 */
export const mockResourceGains = {
  wood: 5,
  stone: 2,
  food: 3,
  water: 4,
  clay: 1,
  fiber: 1,
  tools: 1,
  knowledge: 2,
}

/**
 * Sample building costs for testing
 */
export const mockBuildingCosts = {
  primitiveHut: { wood: 25, stone: 15, food: 5 },
  toolWorkshop: { wood: 60, stone: 40, tools: 8 },
  studyCorner: { wood: 40, stone: 25, knowledge: 15 },
  waterWell: { wood: 30, stone: 20, water: 10 },
  clayPit: { wood: 20, stone: 15, clay: 5 },
  fiberGarden: { wood: 25, stone: 10, fiber: 8 },
}

/**
 * Sample technology costs for testing
 */
export const mockTechnologyCosts = {
  basicAgriculture: { knowledge: 150 },
  basicConstruction: { knowledge: 300 },
  toolMaking: { knowledge: 200, tools: 10 },
  waterManagement: { knowledge: 180, water: 15 },
  clayProcessing: { knowledge: 250, clay: 20 },
  fiberWeaving: { knowledge: 220, fiber: 25 },
  primitiveMedicine: { knowledge: 400, food: 30, water: 20 },
  basicStorage: { knowledge: 350, wood: 40, stone: 20 },
}

/**
 * Sample upgrade costs for testing
 */
export const mockUpgradeCosts = {
  royalDecrees: { prestige: 5 },
  masterCraftsmen: { prestige: 8 },
  fertileLands: { prestige: 6 },
  militaryMight: { prestige: 10 },
}
