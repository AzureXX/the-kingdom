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
  ...HIDDEN_ACHIEVEMENTS,
  
} as Record<AchievementKey, AchievementDef>;



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

