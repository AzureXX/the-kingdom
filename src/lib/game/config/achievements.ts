// Achievement configuration and definitions

import type { AchievementDef, AchievementKey } from '../types/achievements';

/**
 * Achievement definitions organized by category
 */
export const ACHIEVEMENTS: Record<AchievementKey, AchievementDef> = {
  // ===== RESOURCE ACHIEVEMENTS =====
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
  },

  // ===== BUILDING ACHIEVEMENTS =====
  firstBuilding: {
    key: 'firstBuilding',
    name: 'First Building',
    description: 'Build your first building',
    icon: '🏗️',
    category: 'building',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'building', target: 'woodcutterHut', value: 1 }
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
      { type: 'multiplier', target: 'cost', value: 0.95, permanent: false }
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
      { type: 'building', target: 'woodcutterHut', value: 1 },
      { type: 'building', target: 'quarry', value: 1 },
      { type: 'building', target: 'farm', value: 1 },
      { type: 'building', target: 'blacksmith', value: 1 },
      { type: 'building', target: 'castle', value: 1 }
    ],
    rewards: [
      { type: 'multiplier', target: 'prodMul', value: 1.3, permanent: true }
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
      { type: 'multiplier', target: 'cost', value: 0.9, permanent: true }
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
      { type: 'multiplier', target: 'prodMul', value: 1.8, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // ===== TECHNOLOGY ACHIEVEMENTS =====
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
  },

  // ===== ACTION ACHIEVEMENTS =====
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
  },

  // ===== PRESTIGE ACHIEVEMENTS =====
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
      { type: 'multiplier', target: 'prodMul', value: 1.3, permanent: true }
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
      { type: 'multiplier', target: 'prodMul', value: 1.8, permanent: true }
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
      { type: 'multiplier', target: 'prodMul', value: 3.0, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // ===== EVENT ACHIEVEMENTS =====
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
  },

  // ===== TIME ACHIEVEMENTS =====
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
  },

  // ===== COMBO ACHIEVEMENTS =====
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
      { type: 'building', target: 'woodcutterHut', value: 10 },
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
  },

  // ===== HIDDEN ACHIEVEMENTS =====
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

/**
 * Get all achievements by category
 */
export function getAchievementsByCategory(category: string): AchievementDef[] {
  return Object.values(ACHIEVEMENTS).filter(achievement => 
    category === 'all' || achievement.category === category
  );
}

/**
 * Get achievements by rarity
 */
export function getAchievementsByRarity(rarity: string): AchievementDef[] {
  return Object.values(ACHIEVEMENTS).filter(achievement => 
    rarity === 'all' || achievement.rarity === rarity
  );
}

/**
 * Get total achievement points available
 */
export function getTotalAchievementPoints(): number {
  return Object.values(ACHIEVEMENTS).reduce((total, achievement) => 
    total + achievement.points, 0
  );
}

/**
 * Get achievement count by category
 */
export function getAchievementCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    counts[achievement.category] = (counts[achievement.category] || 0) + 1;
  });
  
  return counts;
}

/**
 * Get achievement count by rarity
 */
export function getAchievementCountByRarity(): Record<string, number> {
  const counts: Record<string, number> = {};
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    counts[achievement.rarity] = (counts[achievement.rarity] || 0) + 1;
  });
  
  return counts;
}
