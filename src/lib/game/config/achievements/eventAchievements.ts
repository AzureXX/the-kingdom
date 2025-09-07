// Event-related achievement definitions

import type { AchievementDef } from '../../types/achievements';

/**
 * Event achievements - focused on random events and interactions
 */
export const EVENT_ACHIEVEMENTS: Record<string, AchievementDef> = {
  eventful: {
    key: 'eventful',
    name: 'Eventful',
    description: 'Experience 10 events',
    icon: '🎲',
    category: 'event',
    rarity: 'common',
    points: 20,
    requirements: [
      { type: 'event', target: 'count', value: 10 }
    ],
    rewards: [
      { type: 'resource', target: 'gold', value: 100, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  eventMaster: {
    key: 'eventMaster',
    name: 'Event Master',
    description: 'Experience 50 events',
    icon: '🎪',
    category: 'event',
    rarity: 'rare',
    points: 80,
    requirements: [
      { type: 'event', target: 'count', value: 50 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.5, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
