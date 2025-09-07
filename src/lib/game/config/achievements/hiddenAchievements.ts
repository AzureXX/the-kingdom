// Hidden achievement definitions

import type { AchievementDef } from '../../types/achievements';

/**
 * Hidden achievements - special achievements that are not visible until unlocked
 */
export const HIDDEN_ACHIEVEMENTS: Record<string, AchievementDef> = {
  perfectionist: {
    key: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete all achievements in a category',
    icon: '✨',
    category: 'misc',
    rarity: 'legendary',
    points: 500,
    requirements: [
      { type: 'combo', target: 'category_complete', value: 1 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 5.0, permanent: true }
    ],
    hidden: true,
    repeatable: false
  },

  completionist: {
    key: 'completionist',
    name: 'Completionist',
    description: 'Unlock all achievements',
    icon: '🏆',
    category: 'misc',
    rarity: 'legendary',
    points: 1000,
    requirements: [
      { type: 'combo', target: 'all_complete', value: 1 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 10.0, permanent: true }
    ],
    hidden: true,
    repeatable: false
  }
};
