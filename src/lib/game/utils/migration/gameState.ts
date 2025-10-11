// Game state migration logic

import type { GameState } from '@/lib/game/types';
import { initAchievementState } from '@/lib/game/utils/achievement';
import { createStateErrorHandler } from '@/lib/game/utils/error';

/**
 * Migrate game state to include achievement data if missing
 */
export function migrateGameState(state: GameState): GameState {
  try {
    // If achievements state is missing, initialize it
    if (!state.achievements) {
      return {
        ...state,
        achievements: initAchievementState(),
        achievementBonuses: {
          resourceGain: {},
          resourceGainMultiplier: {},
          buildingGain: {},
          buildingGainMultiplier: {},
          clickGain: {},
          clickMultiplier: {},
          actionClickGain: {},
          actionClickMultiplier: {},
          loopGain: {},
          loopMultiplier: {},
          actionLoopGain: {},
          actionLoopMultiplier: {},
        }
      };
    }

    // If achievements state exists but is missing required properties, fill them
    if (state.achievements) {
      const achievements = {
        unlocked: state.achievements.unlocked || {},
        progress: state.achievements.progress || {},
        notifications: state.achievements.notifications || [],
        totalPoints: state.achievements.totalPoints || 0,
        stats: {
          unlockedCount: state.achievements.stats?.unlockedCount || 0,
          sessionUnlocks: state.achievements.stats?.sessionUnlocks || 0,
          lastUnlocked: state.achievements.stats?.lastUnlocked,
          lastUnlockTime: state.achievements.stats?.lastUnlockTime
        }
      };

      // Add achievement bonuses if missing
      const achievementBonuses = state.achievementBonuses || {
        resourceGain: {},
        resourceGainMultiplier: {},
        buildingGain: {},
        buildingGainMultiplier: {},
        clickGain: {},
        clickMultiplier: {},
        actionClickGain: {},
        actionClickMultiplier: {},
        loopGain: {},
        loopMultiplier: {},
        actionLoopGain: {},
        actionLoopMultiplier: {},
      };

      return {
        ...state,
        achievements,
        achievementBonuses
      };
    }

    return state;
  } catch (error) {
    const migrationErrorHandler = createStateErrorHandler('migration');
    migrationErrorHandler('Failed to migrate game state', { error: error instanceof Error ? error.message : String(error) });
    // Return state with initialized achievements as fallback
    return {
      ...state,
      achievements: initAchievementState(),
      achievementBonuses: {
        resourceGain: {},
        resourceGainMultiplier: {},
        buildingGain: {},
        buildingGainMultiplier: {},
        clickGain: {},
        clickMultiplier: {},
        actionClickGain: {},
        actionClickMultiplier: {},
        loopGain: {},
        loopMultiplier: {},
        actionLoopGain: {},
        actionLoopMultiplier: {},
      }
    };
  }
}
