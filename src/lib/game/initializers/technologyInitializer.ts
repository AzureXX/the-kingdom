/**
 * Technology state initialization utilities
 * Handles initialization of technology-related state in the game
 * 
 * @remarks
 * This module provides functions to initialize:
 * - Technology levels (all set to 0 initially)
 * - Technology validation and error handling
 * 
 * // Returns: { technologies: {...} }
 * ```
 */

import type { TechnologyKey } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { isValidTechnologyKey } from '@/lib/game/utils/validation/technologyValidation';
import { logInvalidKey, createStateErrorHandler } from '@/lib/game/utils/errorLogger';

const { technologies: TECHNOLOGIES } = CONFIG;

// Create specialized error handler for technology initialization
const stateErrorHandler = createStateErrorHandler('technologyInitializer');

/**
 * Initialize technology state with default values
 * 
 * @returns Object containing initialized technology state
 * 
 * @remarks
 * This function:
 * - Initializes all technologies with level 0
 * - Validates technology keys against CONFIG
 * - Logs any invalid technology keys found
 * 
 */
export function initTechnologyState(): {
  technologies: Record<TechnologyKey, number>;
} {
  try {
    const technologies: Record<TechnologyKey, number> = {} as Record<TechnologyKey, number>;
    
    // Initialize technologies dynamically from CONFIG
    for (const techKey of Object.keys(TECHNOLOGIES)) {
      if (!isValidTechnologyKey(techKey)) {
        logInvalidKey(techKey, 'technology', 'technologyInitializer');
        continue;
      }
      
      technologies[techKey as TechnologyKey] = 0;
    }
    
    return {
      technologies
    };
  } catch (error) {
    stateErrorHandler('Failed to initialize technology state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error; // Re-throw for critical initialization errors
  }
}
