/**
 * Event state initialization utilities
 * Handles initialization of event-related state in the game
 * 
 * @remarks
 * This module provides functions to initialize:
 * - Event system state
 * - Event timing and scheduling
 * - Event history tracking
 * 
 * // Returns: Event state object
 * ```
 */

import type { EventState } from '@/lib/game/types';
import { GAME_CONSTANTS, EVENT_CONSTANTS } from '@/lib/game/constants';
import { createStateErrorHandler } from '@/lib/game/utils/error';

// Create specialized error handler for event initialization
const stateErrorHandler = createStateErrorHandler('eventInitializer');

/**
 * Create an empty event state object with all properties initialized
 */
export function getEmptyEventStateObject(): EventState['events'] {
  return {
    activeEvent: null,
    activeEventStartTime: 0,
    nextEventTime: 0,
    eventHistory: []
  };
}

/**
 * Initialize event state with default values
 * 
 * @returns Object containing initialized event state
 * 
 * @remarks
 * This function:
 * - Initializes event system with no active event
 * - Sets up initial event timing with random interval
 * - Initializes empty event history
 * 
 */
export function initEventState(): EventState['events'] {
  try {
    // Calculate initial event timing with random interval
    const randomIntervalSeconds = Math.random() * 
      (EVENT_CONSTANTS.INITIAL_MAX_INTERVAL_SECONDS - EVENT_CONSTANTS.INITIAL_MIN_INTERVAL_SECONDS) + 
      EVENT_CONSTANTS.INITIAL_MIN_INTERVAL_SECONDS;
    
    const nextEventTime = Date.now() + (randomIntervalSeconds * GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND);
    
    return {
      ...getEmptyEventStateObject(),
      nextEventTime
    };
  } catch (error) {
    stateErrorHandler('Failed to initialize event state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error; // Re-throw for critical initialization errors
  }
}
