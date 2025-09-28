/**
 * Technology-related actions
 * Handles technology research and related functionality
 */

import type { TechnologyKey, GameState } from '@/lib/game/types';

import { startResearch } from '@/lib/game/utils/technology';
import { createStateErrorHandler } from '@/lib/game/utils/error';

const stateErrorHandler = createStateErrorHandler('technologyActions');

/**
 * Start researching a technology - Pure function with error handling
 */
export function researchTechnology(state: GameState, key: TechnologyKey): GameState {
  try {
    return startResearch(state, key);
  } catch (error) {
    stateErrorHandler('Failed to start technology research', { technologyKey: key, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
