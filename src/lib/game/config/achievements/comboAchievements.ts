// Combo and miscellaneous achievement definitions

import type { AchievementDef } from '@/lib/game/types/achievements';

/**
 * Combo achievements - focused on complex multi-requirement challenges
 */
export const COMBO_ACHIEVEMENTS: Record<string, AchievementDef> = {
  balancedKingdom: {
    key: 'balancedKingdom',
    name: 'Balanced Kingdom',
    description: 'Have 100+ of each resource simultaneously',
    icon: '⚖️',
    category: 'misc',
    rarity: 'uncommon',
    points: 50,
    requirements: [
      { type: 'resource', target: 'gold', value: 100 },
      { type: 'resource', target: 'wood', value: 100 },
      { type: 'resource', target: 'stone', value: 100 },
      { type: 'resource', target: 'food', value: 100 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.4, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  industrialComplex: {
    key: 'industrialComplex',
    name: 'Industrial Complex',
    description: 'Have 10+ of each building type',
    icon: '🏭',
    category: 'misc',
    rarity: 'epic',
    points: 150,
    requirements: [
      { type: 'building', target: 'woodcutter', value: 10 },
      { type: 'building', target: 'quarry', value: 10 },
      { type: 'building', target: 'farm', value: 10 },
      { type: 'building', target: 'blacksmith', value: 10 },
      { type: 'building', target: 'castle', value: 10 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 2.5, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
