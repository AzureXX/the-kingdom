// Achievement configuration and definitions - grouped by category

import type { AchievementDef, AchievementKey } from '@/lib/game/types/achievements';

// Import all achievement categories
import { RESOURCE_ACHIEVEMENTS } from '@/lib/game/config/achievements/resourceAchievements';
import { BUILDING_ACHIEVEMENTS } from '@/lib/game/config/achievements/buildingAchievements';
import { TECHNOLOGY_ACHIEVEMENTS } from '@/lib/game/config/achievements/technologyAchievements';
import { ACTION_ACHIEVEMENTS } from '@/lib/game/config/achievements/actionAchievements';
import { PRESTIGE_ACHIEVEMENTS } from '@/lib/game/config/achievements/prestigeAchievements';
import { EVENT_ACHIEVEMENTS } from '@/lib/game/config/achievements/eventAchievements';
import { TIME_ACHIEVEMENTS } from '@/lib/game/config/achievements/timeAchievements';
import { COMBO_ACHIEVEMENTS } from '@/lib/game/config/achievements/comboAchievements';
import { HIDDEN_ACHIEVEMENTS } from '@/lib/game/config/achievements/hiddenAchievements';

/**
 * Combined achievement definitions organized by category
 */
export const ACHIEVEMENTS: Record<AchievementKey, AchievementDef> = {
  // Resource achievements
  ...RESOURCE_ACHIEVEMENTS,
  
  // Building achievements
  ...BUILDING_ACHIEVEMENTS,
  
  // Technology achievements
  ...TECHNOLOGY_ACHIEVEMENTS,
  
  // Action achievements
  ...ACTION_ACHIEVEMENTS,
  
  // Prestige achievements
  ...PRESTIGE_ACHIEVEMENTS,
  
  // Event achievements
  ...EVENT_ACHIEVEMENTS,
  
  // Time achievements
  ...TIME_ACHIEVEMENTS,
  
  // Combo achievements
  ...COMBO_ACHIEVEMENTS,
  
  // Hidden achievements
  ...HIDDEN_ACHIEVEMENTS
} as Record<AchievementKey, AchievementDef>;

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

// Re-export individual category achievements for direct access
export {
  RESOURCE_ACHIEVEMENTS,
  BUILDING_ACHIEVEMENTS,
  TECHNOLOGY_ACHIEVEMENTS,
  ACTION_ACHIEVEMENTS,
  PRESTIGE_ACHIEVEMENTS,
  EVENT_ACHIEVEMENTS,
  TIME_ACHIEVEMENTS,
  COMBO_ACHIEVEMENTS,
  HIDDEN_ACHIEVEMENTS
};

