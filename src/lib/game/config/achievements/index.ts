// Achievement configuration and definitions - organized by tier

import type { AchievementDef, AchievementKey } from '@/lib/game/types/achievements';

// Import tier-based achievement definitions
import { TIER1_ACHIEVEMENTS } from '@/lib/game/config/achievements/tier1Achievements';

/**
 * Combined achievement definitions organized by tier
 */
export const ACHIEVEMENTS: Record<AchievementKey, AchievementDef> = {
  // Tier 1 Achievements - Primitive Beginnings
  ...TIER1_ACHIEVEMENTS,
  
  // Future tiers will be added here
  // ...TIER2_ACHIEVEMENTS,
  // ...TIER3_ACHIEVEMENTS,
  // etc.
} as Record<AchievementKey, AchievementDef>;




