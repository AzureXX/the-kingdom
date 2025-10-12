// Achievement system initialization logic

import type { AchievementState } from '@/lib/game/types';
import { createStateErrorHandler } from '@/lib/game/utils/error';

// Create specialized error handler
const stateErrorHandler = createStateErrorHandler('achievementSystem');

/**
 * Create an empty achievement state object with all properties initialized
 */
export function getEmptyAchievementStateObject(): AchievementState {
  return {
    unlocked: {},
    progress: {},
    notifications: [],
    totalPoints: 0,
    stats: {
      unlockedCount: 0,
      sessionUnlocks: 0,
      lastUnlocked: undefined,
      lastUnlockTime: undefined
    }
  };
}

/**
 * Initialize achievement state for a new game
 */
export function initAchievementState(): AchievementState {
  try {
    return getEmptyAchievementStateObject();
  } catch (error) {
    stateErrorHandler('Failed to initialize achievement state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return getEmptyAchievementStateObject();
  }
}
