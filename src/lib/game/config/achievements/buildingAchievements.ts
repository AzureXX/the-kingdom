// Building-related achievement definitions

import type { AchievementDef } from '@/lib/game/types/achievements';

/**
 * Building achievements - focused on construction and development
 */
export const BUILDING_ACHIEVEMENTS: Record<string, AchievementDef> = {
  firstBuilding: {
    key: 'firstBuilding',
    name: 'First Building',
    description: 'Build your first building',
    icon: '🏗️',
    category: 'building',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'building', target: 'total', value: 1 }
    ],
    rewards: [
      { type: 'resource', target: 'gold', value: 50, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  architect: {
    key: 'architect',
    name: 'Architect',
    description: 'Build 10 buildings total',
    icon: '🏛️',
    category: 'building',
    rarity: 'common',
    points: 25,
    requirements: [
      { type: 'building', target: 'total', value: 10 }
    ],
    rewards: [
      { type: 'resourceGain', target: 'gold', value: 1, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  cityPlanner: {
    key: 'cityPlanner',
    name: 'City Planner',
    description: 'Build 5 different building types',
    icon: '🏙️',
    category: 'building',
    rarity: 'uncommon',
    points: 40,
    requirements: [
      { type: 'building', target: 'woodcutter', value: 1 },
      { type: 'building', target: 'quarry', value: 1 },
      { type: 'building', target: 'farm', value: 1 },
      { type: 'building', target: 'blacksmith', value: 1 },
      { type: 'building', target: 'castle', value: 1 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'all', value: 1.3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  industrialist: {
    key: 'industrialist',
    name: 'Industrialist',
    description: 'Build 50 buildings total',
    icon: '🏭',
    category: 'building',
    rarity: 'rare',
    points: 75,
    requirements: [
      { type: 'building', target: 'total', value: 50 }
    ],
    rewards: [
      { type: 'resourceGain', target: 'gold', value: 2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  metropolis: {
    key: 'metropolis',
    name: 'Metropolis',
    description: 'Build 100 buildings total',
    icon: '🌆',
    category: 'building',
    rarity: 'epic',
    points: 150,
    requirements: [
      { type: 'building', target: 'total', value: 100 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'all', value: 1.8, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
