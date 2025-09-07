// Resource-related achievement definitions

import type { AchievementDef } from '../../types/achievements';

/**
 * Resource achievements - focused on resource accumulation and management
 */
export const RESOURCE_ACHIEVEMENTS: Record<string, AchievementDef> = {
  firstGold: {
    key: 'firstGold',
    name: 'First Gold',
    description: 'Earn your first 100 Gold',
    icon: '🪙',
    category: 'resource',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'gold', value: 100 }
    ],
    rewards: [
      { type: 'multiplier', target: 'clickGain', value: 1.1, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  woodCollector: {
    key: 'woodCollector',
    name: 'Wood Collector',
    description: 'Accumulate 1,000 Wood',
    icon: '🌲',
    category: 'resource',
    rarity: 'common',
    points: 15,
    requirements: [
      { type: 'resource', target: 'wood', value: 1000 }
    ],
    rewards: [
      { type: 'resource', target: 'wood', value: 100, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  stoneMason: {
    key: 'stoneMason',
    name: 'Stone Mason',
    description: 'Accumulate 500 Stone',
    icon: '🪨',
    category: 'resource',
    rarity: 'common',
    points: 15,
    requirements: [
      { type: 'resource', target: 'stone', value: 500 }
    ],
    rewards: [
      { type: 'resource', target: 'stone', value: 50, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  foodStockpile: {
    key: 'foodStockpile',
    name: 'Food Stockpile',
    description: 'Accumulate 2,000 Food',
    icon: '🍖',
    category: 'resource',
    rarity: 'common',
    points: 20,
    requirements: [
      { type: 'resource', target: 'food', value: 2000 }
    ],
    rewards: [
      { type: 'resource', target: 'food', value: 200, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  prestigious: {
    key: 'prestigious',
    name: 'Prestigious',
    description: 'Gain 10 Prestige',
    icon: '👑',
    category: 'resource',
    rarity: 'uncommon',
    points: 50,
    requirements: [
      { type: 'resource', target: 'prestige', value: 10 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  scholar: {
    key: 'scholar',
    name: 'Scholar',
    description: 'Gain 100 Research Points',
    icon: '🔬',
    category: 'resource',
    rarity: 'uncommon',
    points: 30,
    requirements: [
      { type: 'resource', target: 'researchPoints', value: 100 }
    ],
    rewards: [
      { type: 'resource', target: 'researchPoints', value: 20, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  resourceMaster: {
    key: 'resourceMaster',
    name: 'Resource Master',
    description: 'Have 10,000 of each basic resource simultaneously',
    icon: '💎',
    category: 'resource',
    rarity: 'rare',
    points: 100,
    requirements: [
      { type: 'resource', target: 'gold', value: 10000 },
      { type: 'resource', target: 'wood', value: 10000 },
      { type: 'resource', target: 'stone', value: 10000 },
      { type: 'resource', target: 'food', value: 10000 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.5, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  lifetimeWealth: {
    key: 'lifetimeWealth',
    name: 'Lifetime Wealth',
    description: 'Generate 1,000,000 Gold lifetime',
    icon: '💰',
    category: 'resource',
    rarity: 'epic',
    points: 200,
    requirements: [
      { type: 'resource', target: 'gold', value: 1000000, operator: '>=' }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 2.0, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
