// Achievement statistics and analytics logic

import type { GameState } from '@/lib/game/types';
import { ACHIEVEMENTS } from '@/lib/game/config/achievements';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

// Create specialized error handler
const stateErrorHandler = createStateErrorHandler('achievementSystem');

/**
 * Get achievement statistics
 */
export function getAchievementStats(state: GameState) {
  try {
    const achievements = Object.values(ACHIEVEMENTS);
    const unlocked = state.achievements?.unlocked || {};
    
    const categoryBreakdown: Record<string, number> = {};
    const rarityBreakdown: Record<string, number> = {};
    
    achievements.forEach(achievement => {
      if (unlocked[achievement.key]) {
        categoryBreakdown[achievement.category] = (categoryBreakdown[achievement.category] || 0) + 1;
        rarityBreakdown[achievement.rarity] = (rarityBreakdown[achievement.rarity] || 0) + 1;
      }
    });

    const recentUnlocks = (state.achievements?.notifications || [])
      .filter(n => !n.shown)
      .slice(-10)
      .map(n => n.achievementKey);

    return {
      totalAchievements: achievements.length,
      unlockedAchievements: Object.keys(unlocked).length,
      completionPercentage: (Object.keys(unlocked).length / achievements.length) * 100,
      totalPoints: state.achievements.totalPoints,
      maxPoints: achievements.reduce((total, a) => total + a.points, 0),
      categoryBreakdown,
      rarityBreakdown,
      recentUnlocks
    };
  } catch (error) {
    stateErrorHandler('Failed to get achievement stats', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {
      totalAchievements: 0,
      unlockedAchievements: 0,
      completionPercentage: 0,
      totalPoints: 0,
      maxPoints: 0,
      categoryBreakdown: {},
      rarityBreakdown: {},
      recentUnlocks: []
    };
  }
}
