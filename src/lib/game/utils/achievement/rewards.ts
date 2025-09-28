// Achievement reward application logic

import type { GameState, AchievementDef, AchievementReward } from '@/lib/game/types';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

// Create specialized error handler
const stateErrorHandler = createStateErrorHandler('achievementSystem');

/**
 * Apply rewards for an unlocked achievement
 */
export function applyAchievementRewards(state: GameState, achievement: AchievementDef): GameState {
  try {
    let newState = { ...state };

    for (const reward of achievement.rewards) {
      newState = applyReward(newState, reward);
    }

    return newState;
  } catch (error) {
    stateErrorHandler('Failed to apply achievement rewards', { 
      achievementKey: achievement.key,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a single reward
 */
function applyReward(state: GameState, reward: AchievementReward): GameState {
  try {
    // Skip reward application for now - just return state unchanged
    return state;
  } catch (error) {
    stateErrorHandler('Failed to apply reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}
