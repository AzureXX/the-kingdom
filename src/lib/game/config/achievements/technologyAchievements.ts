// Technology-related achievement definitions

import type { AchievementDef } from '../../types/achievements';

/**
 * Technology achievements - focused on research and scientific advancement
 */
export const TECHNOLOGY_ACHIEVEMENTS: Record<string, AchievementDef> = {
  firstDiscovery: {
    key: 'firstDiscovery',
    name: 'First Discovery',
    description: 'Research your first technology',
    icon: '🔬',
    category: 'technology',
    rarity: 'common',
    points: 20,
    requirements: [
      { type: 'technology', target: 'writing', value: 1 }
    ],
    rewards: [
      { type: 'resource', target: 'researchPoints', value: 10, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  scholarTech: {
    key: 'scholarTech',
    name: 'Scholar',
    description: 'Research 3 technologies',
    icon: '📚',
    category: 'technology',
    rarity: 'uncommon',
    points: 50,
    requirements: [
      { type: 'technology', target: 'writing', value: 1 },
      { type: 'technology', target: 'mathematics', value: 1 },
      { type: 'technology', target: 'engineering', value: 1 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.4, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  scientist: {
    key: 'scientist',
    name: 'Scientist',
    description: 'Research all technologies',
    icon: '🧪',
    category: 'technology',
    rarity: 'legendary',
    points: 300,
    requirements: [
      { type: 'technology', target: 'writing', value: 1 },
      { type: 'technology', target: 'mathematics', value: 1 },
      { type: 'technology', target: 'engineering', value: 1 },
      { type: 'technology', target: 'chemistry', value: 1 },
      { type: 'technology', target: 'physics', value: 1 },
      { type: 'technology', target: 'biology', value: 1 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 3.0, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
