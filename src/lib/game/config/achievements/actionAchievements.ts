// Action-related achievement definitions

import type { AchievementDef } from '@/lib/game/types/achievements';

/**
 * Action achievements - focused on player interactions and clicking
 */
export const ACTION_ACHIEVEMENTS: Record<string, AchievementDef> = {
  clicker: {
    key: 'clicker',
    name: 'Clicker',
    description: 'Perform 100 manual clicks',
    icon: '👆',
    category: 'action',
    rarity: 'common',
    points: 15,
    requirements: [
      { type: 'click', target: 'total', value: 100 }
    ],
    rewards: [
      { type: 'multiplier', target: 'clickGain', value: 1.2, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  dedicated: {
    key: 'dedicated',
    name: 'Dedicated',
    description: 'Perform 1,000 manual clicks',
    icon: '💪',
    category: 'action',
    rarity: 'uncommon',
    points: 40,
    requirements: [
      { type: 'click', target: 'total', value: 1000 }
    ],
    rewards: [
      { type: 'multiplier', target: 'clickGain', value: 1.5, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  clickMaster: {
    key: 'clickMaster',
    name: 'Click Master',
    description: 'Perform 10,000 manual clicks',
    icon: '👑',
    category: 'action',
    rarity: 'epic',
    points: 100,
    requirements: [
      { type: 'click', target: 'total', value: 10000 }
    ],
    rewards: [
      { type: 'multiplier', target: 'clickGain', value: 2.0, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  actionHero: {
    key: 'actionHero',
    name: 'Action Hero',
    description: 'Execute 100 actions',
    icon: '⚔️',
    category: 'action',
    rarity: 'rare',
    points: 60,
    requirements: [
      { type: 'action', target: 'total', value: 100 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.6, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
