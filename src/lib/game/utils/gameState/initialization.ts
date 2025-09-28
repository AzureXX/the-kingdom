// Game state initialization logic

import { createNewGameState } from '@/lib/game/initializers/gameStateFactory';
import { createStateErrorHandler } from '@/lib/game/utils/error';
import type { GameState } from '@/lib/game/types';

// Create specialized error handler for game state initialization
const stateErrorHandler = createStateErrorHandler('gameState');

/**
 * Initialize a new game state with default values
 * 
 * @remarks
 * This function now uses the game state factory to create a new game state.
 * The factory composes all individual state initializers for better organization
 * and maintainability.
 */
export function initNewGame(): GameState {
  try {
    return createNewGameState();
  } catch (error) {
    stateErrorHandler('Failed to initialize new game state', { error: error instanceof Error ? error.message : String(error) });
    throw error; // Re-throw for critical initialization errors
  }
}

/**
 * Update the game timestamp - Pure function with validation
 */
export function updateTimestamp(state: GameState): GameState {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      throw new Error('Invalid state parameter');
    }

    return { ...state, t: Date.now() };
  } catch (error) {
    stateErrorHandler('Failed to update timestamp', { error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
