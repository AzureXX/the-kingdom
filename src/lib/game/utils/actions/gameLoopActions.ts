/**
 * Game loop actions
 * Handles time-based game updates, events, and achievements
 */

import type { GameState } from '@/lib/game/types';

import { checkAchievements } from '@/lib/game/utils/achievement';
import { checkAndTriggerEvents } from '@/lib/game/utils/event';
import { checkResearchProgress } from '@/lib/game/utils/technology';
import { createStateErrorHandler } from '@/lib/game/utils/error';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { updateResourcesFromProduction } from './resourceActions';

const stateErrorHandler = createStateErrorHandler('gameLoopActions');

/**
 * Check and process events with frame skipping optimization
 * 
 * @param state - Current game state
 * @param tickCounter - Current tick counter for frame skipping
 * @returns Updated game state with any triggered events
 */
export function checkAndProcessEvents(state: GameState, tickCounter: number): GameState {
  try {
    // Check events with frame skipping (every 3 ticks)
    if (tickCounter % GAME_CONSTANTS.FRAME_SKIP.EVENTS === 0) {
      return checkAndTriggerEvents(state);
    }
    return state;
  } catch (error) {
    stateErrorHandler('Failed to check and process events', { tickCounter, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Check and process achievements with frame skipping optimization
 * 
 * @param state - Current game state
 * @param tickCounter - Current tick counter for frame skipping
 * @returns Updated game state with any triggered achievements
 */
export function checkAndProcessAchievements(state: GameState, tickCounter: number): GameState {
  try {
    // Check achievements with frame skipping (every 5 ticks)
    if (tickCounter % GAME_CONSTANTS.FRAME_SKIP.ACHIEVEMENTS === 0) {
      return checkAchievements(state);
    }
    return state;
  } catch (error) {
    stateErrorHandler('Failed to check and process achievements', { tickCounter, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Process game tick (time-based updates) - Optimized pure function with error handling and frame skipping
 */
export function tick(state: GameState, dtSeconds: number, tickCounter: number = 0): GameState {
  try {
    // Early return if no time has passed
    if (dtSeconds <= 0) return state;
    
    let newState = updateResourcesFromProduction(state, dtSeconds);
    
    newState = checkAndProcessEvents(newState, tickCounter);
    
    newState = checkResearchProgress(newState);
    
    newState = checkAndProcessAchievements(newState, tickCounter);
    
    return newState;
  } catch (error) {
    stateErrorHandler('Failed to process game tick', { dtSeconds, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
