// Time-related achievement definitions

import type { AchievementDef } from '../../types/achievements';

/**
 * Time achievements - focused on playtime and speed challenges
 */
export const TIME_ACHIEVEMENTS: Record<string, AchievementDef> = {
  dedicatedPlayer: {
    key: 'dedicatedPlayer',
    name: 'Dedicated Player',
    description: 'Play for 1 hour total',
    icon: '⏰',
    category: 'time',
    rarity: 'common',
    points: 30,
    requirements: [
      { type: 'time', target: 'total', value: 3600 } // 1 hour in seconds
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  marathon: {
    key: 'marathon',
    name: 'Marathon',
    description: 'Play for 8 hours total',
    icon: '🏃',
    category: 'time',
    rarity: 'rare',
    points: 100,
    requirements: [
      { type: 'time', target: 'total', value: 28800 } // 8 hours in seconds
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.8, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  speedRunner: {
    key: 'speedRunner',
    name: 'Speed Runner',
    description: 'Reach 1,000 Gold in under 10 minutes',
    icon: '⚡',
    category: 'time',
    rarity: 'rare',
    points: 75,
    requirements: [
      { type: 'resource', target: 'gold', value: 1000 },
      { type: 'time', target: 'session', value: 600 } // 10 minutes
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.5, permanent: false }
    ],
    hidden: false,
    repeatable: true
  }
};
