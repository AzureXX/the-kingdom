// Prestige-related achievement definitions

import type { AchievementDef } from '@/lib/game/types/achievements';

/**
 * Prestige achievements - focused on reset mechanics and progression
 */
export const PRESTIGE_ACHIEVEMENTS: Record<string, AchievementDef> = {
  firstAscension: {
    key: 'firstAscension',
    name: 'First Ascension',
    description: 'Perform your first prestige',
    icon: '⬆️',
    category: 'prestige',
    rarity: 'uncommon',
    points: 50,
    requirements: [
      { type: 'prestige', target: 'count', value: 1 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'all', value: 1.3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  ascended: {
    key: 'ascended',
    name: 'Ascended',
    description: 'Perform 5 prestiges',
    icon: '🌟',
    category: 'prestige',
    rarity: 'rare',
    points: 100,
    requirements: [
      { type: 'prestige', target: 'count', value: 5 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'all', value: 1.8, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  prestigeMaster: {
    key: 'prestigeMaster',
    name: 'Prestige Master',
    description: 'Perform 25 prestiges',
    icon: '👑',
    category: 'prestige',
    rarity: 'legendary',
    points: 250,
    requirements: [
      { type: 'prestige', target: 'count', value: 25 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'all', value: 3.0, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
