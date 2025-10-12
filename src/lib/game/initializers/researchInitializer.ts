/**
 * Research state initialization utilities
 * Handles initialization of research-related state in the game
 * 
 * @remarks
 * This module provides functions to initialize:
 * - Research system state
 * - Research timing and progress tracking
 * - Action unlocks and cooldowns
 * 
 * // Returns: { research: {...}, actions: {...} }
 * ```
 */

import { createStateErrorHandler } from '@/lib/game/utils/error';
import type { ResearchState } from '@/lib/game/types';

// Create specialized error handler for research initialization
const stateErrorHandler = createStateErrorHandler('researchInitializer');

/**
 * Create an empty research state object with all properties initialized
 */
export function getEmptyResearchStateObject(): ResearchState['research'] {
  return {
    activeResearch: null,
    researchStartTime: 0,
    researchEndTime: 0
  };
}

/**
 * Initialize research state with default values
 * 
 * @returns Object containing initialized research state
 * 
 * @remarks
 * This function:
 * - Initializes research system with no active research
 * - Sets up action unlocks and cooldowns
 * - Initializes empty research timing
 * 
 */
export function initResearchState(): {
  research: ResearchState['research'];
  actions: {
    unlocks: Record<string, boolean>;
    cooldowns: Record<string, number>;
  };
} {
  try {
    return {
      research: getEmptyResearchStateObject(),
      actions: {
        unlocks: {},
        cooldowns: {},
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to initialize research state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error; // Re-throw for critical initialization errors
  }
}
