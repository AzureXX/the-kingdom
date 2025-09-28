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
 * @example
 * ```typescript
 * 
 * const researchState = initResearchState();
 * // Returns: { research: {...}, actions: {...} }
 * ```
 */

import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

// Create specialized error handler for research initialization
const stateErrorHandler = createStateErrorHandler('researchInitializer');

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
 * @example
 * ```typescript
 * const researchState = initResearchState();
 * ```
 */
export function initResearchState(): {
  research: {
    activeResearch: null;
    researchStartTime: 0;
    researchEndTime: 0;
  };
  actions: {
    unlocks: Record<string, boolean>;
    cooldowns: Record<string, number>;
  };
} {
  try {
    return {
      research: {
        activeResearch: null,
        researchStartTime: 0,
        researchEndTime: 0,
      },
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
