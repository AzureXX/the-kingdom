/**
 * Building state initialization utilities
 * Handles initialization of building-related state in the game
 * 
 * @remarks
 * This module provides functions to initialize:
 * - Building counts (all set to 0 initially)
 * - Building validation and error handling
 * 
 */

import type { BuildingKey } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { isValidBuildingKey } from '@/lib/game/utils/validation/buildingValidation';
import { logInvalidKey, createStateErrorHandler } from '@/lib/game/utils/errorLogger';

const { buildings: BUILDINGS } = CONFIG;

// Create specialized error handler for building initialization
const stateErrorHandler = createStateErrorHandler('buildingInitializer');

/**
 * Initialize building state with default values
 * 
 * @returns Object containing initialized building state
 * 
 * @remarks
 * This function:
 * - Initializes all buildings with count 0
 * - Validates building keys against CONFIG
 * - Logs any invalid building keys found
 * 
 * @example
 * ```typescript
 * const buildingState = initBuildingState();
 * ```
 */
export function initBuildingState(): {
  buildings: Record<BuildingKey, number>;
} {
  try {
    const buildings: Record<BuildingKey, number> = {} as Record<BuildingKey, number>;
    
    // Initialize buildings dynamically from CONFIG
    for (const buildingKey of Object.keys(BUILDINGS)) {
      if (!isValidBuildingKey(buildingKey)) {
        logInvalidKey(buildingKey, 'building', 'buildingInitializer');
        continue;
      }
      
      buildings[buildingKey as BuildingKey] = 0;
    }
    
    return {
      buildings
    };
  } catch (error) {
    stateErrorHandler('Failed to initialize building state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error; // Re-throw for critical initialization errors
  }
}
