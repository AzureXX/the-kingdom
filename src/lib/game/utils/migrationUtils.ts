// Migration utilities for handling save file compatibility

import type { GameState } from '../types';
import { initAchievementState } from '../achievementSystem';

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
        achievementMultipliers: {
          clickGain: 1,
          cost: 1,
          prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
          useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
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

      // Add achievement multipliers if missing
      const achievementMultipliers = state.achievementMultipliers || {
        clickGain: 1,
        cost: 1,
        prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
        useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
      };

      return {
        ...state,
        achievements,
        achievementMultipliers
      };
    }

    return state;
  } catch (error) {
    console.error('Failed to migrate game state:', error);
    // Return state with initialized achievements as fallback
    return {
      ...state,
      achievements: initAchievementState(),
      achievementMultipliers: {
        clickGain: 1,
        cost: 1,
        prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
        useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
      }
    };
  }
}

/**
 * Check if game state needs migration
 */
export function needsMigration(state: GameState): boolean {
  return !state.achievements || 
         !state.achievements.unlocked || 
         !state.achievements.progress || 
         !state.achievements.notifications ||
         state.achievements.totalPoints === undefined ||
         !state.achievements.stats ||
         !state.achievementMultipliers;
}
