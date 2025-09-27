import type { GameState } from '@/lib/game/types'

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
    gold: 100,
    wood: 50,
    stone: 25,
    food: 75,
    prestige: 0,
    researchPoints: 0,
  },
  
  // Buildings
  buildings: {
    woodcutter: 1,
    quarry: 0,
    farm: 0,
    blacksmith: 0,
    castle: 0,
    library: 0,
    university: 0,
    laboratory: 0,
  },
  
  // Technologies
  technologies: {
    writing: 0,
    mathematics: 0,
    engineering: 0,
    chemistry: 0,
    physics: 0,
    biology: 0,
  },
  
  // Events
  events: {
    activeEvent: null,
    activeEventStartTime: 0,
    nextEventTime: 0,
    eventHistory: [],
  },
  
  // Research
  research: {
    activeResearch: null,
    researchStartTime: 0,
    researchEndTime: 0,
  },
  
  // Actions
  actions: {
    unlocks: {
      gatherWood: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      gatherStone: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      huntFood: { unlocked: true, unlockedAt: 0, lastUsed: 0 },
      sellWood: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      sellStone: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      sellFood: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      craftTools: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      forgeWeapons: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      farmWork: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      advancedMining: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      scientificResearch: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
      royalDiplomacy: { unlocked: false, unlockedAt: 0, lastUsed: 0 },
    },
    cooldowns: {},
  },
  
  // Upgrades
  upgrades: {
    royalDecrees: 0,
    masterCraftsmen: 0,
    fertileLands: 0,
    militaryMight: 0,
  },
  
  // Loop actions
  loopActions: [],
  loopSettings: {
    maxConcurrentActions: 3,
    basePointsPerTick: 1,
  },
  
  // Achievements
  achievements: {
    unlocked: {},
    progress: {},
    notifications: [],
    totalPoints: 0,
    stats: {
      unlockedCount: 0,
      sessionUnlocks: 0,
    },
  },
  
  // Achievement multipliers
  achievementMultipliers: {
    clickGain: 1,
    cost: 1,
    prodMul: {},
    useMul: {},
  },
  
  // Lifetime resources
  lifetime: {
    gold: 100,
    wood: 50,
    stone: 25,
    food: 75,
    prestige: 0,
    researchPoints: 0,
  },
}

/**
 * Sample game state with advanced resources
 */
export const mockAdvancedGameState: GameState = {
  ...mockBasicGameState,
  resources: {
    gold: 10000,
    wood: 5000,
    stone: 2500,
    food: 7500,
    prestige: 100,
    researchPoints: 500,
  },
  
  buildings: {
    woodcutter: 10,
    quarry: 5,
    farm: 8,
    blacksmith: 3,
    castle: 1,
    library: 2,
    university: 1,
    laboratory: 0,
  },
  
  technologies: {
    writing: 1,
    mathematics: 1,
    engineering: 0,
    chemistry: 0,
    physics: 0,
    biology: 0,
  },
  
  upgrades: {
    royalDecrees: 5,
    masterCraftsmen: 3,
    fertileLands: 2,
    militaryMight: 1,
  },
}

/**
 * Sample game state with all technologies researched
 */
export const mockMaxedGameState: GameState = {
  ...mockAdvancedGameState,
  resources: {
    gold: 1000000,
    wood: 500000,
    stone: 250000,
    food: 750000,
    prestige: 10000,
    researchPoints: 50000,
  },
  
  buildings: {
    woodcutter: 100,
    quarry: 50,
    farm: 80,
    blacksmith: 30,
    castle: 10,
    library: 20,
    university: 10,
    laboratory: 5,
  },
  
  technologies: {
    writing: 1,
    mathematics: 1,
    engineering: 1,
    chemistry: 1,
    physics: 1,
    biology: 1,
  },
  
  upgrades: {
    royalDecrees: 20,
    masterCraftsmen: 25,
    fertileLands: 25,
    militaryMight: 20,
  },
}

/**
 * Sample resource cost for testing
 */
export const mockResourceCost = {
  gold: 100,
  wood: 50,
  stone: 25,
}

/**
 * Sample resource gains for testing
 */
export const mockResourceGains = {
  gold: 10,
  wood: 5,
  stone: 2,
}

/**
 * Sample building costs for testing
 */
export const mockBuildingCosts = {
  woodcutter: { gold: 15 },
  quarry: { gold: 30, wood: 5 },
  farm: { gold: 25, wood: 8 },
  blacksmith: { gold: 50, wood: 15, stone: 10 },
}

/**
 * Sample technology costs for testing
 */
export const mockTechnologyCosts = {
  writing: { gold: 50, wood: 20 },
  mathematics: { gold: 100, wood: 30, stone: 20 },
  engineering: { gold: 150, wood: 50, stone: 40 },
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
