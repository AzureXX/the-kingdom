/**
 * Resource state initialization utilities
 * Handles initialization of resource-related state in the game
 * 
 * @remarks
 * This module provides functions to initialize:
 * - Resource amounts with starting values
 * - Lifetime resource tracking
 * - Achievement multipliers for resources
 * 
 * @example
 * ```typescript
 * import { initResourceState } from './resourceInitializer';
 * 
 * const resourceState = initResourceState();
 * // Returns: { resources: {...}, lifetime: {...}, achievementMultipliers: {...} }
 * ```
 */

import type { ResourceKey } from '../types';
import { CONFIG } from '../config';
import { createStateErrorHandler } from '../utils/errorLogger';

const { resources: RESOURCES } = CONFIG;

// Create specialized error handler for resource initialization
const stateErrorHandler = createStateErrorHandler('resourceInitializer');

/**
 * Initialize resource state with starting values
 * 
 * @returns Object containing initialized resource state
 * 
 * @remarks
 * This function:
 * - Initializes all resources with their starting values from CONFIG
 * - Sets up lifetime tracking for all resources
 * - Initializes achievement multipliers for all resources
 * 
 * @example
 * ```typescript
 * const resourceState = initResourceState();
 * console.log(resourceState.resources.gold); // Starting gold amount
 * ```
 */
export function initResourceState(): {
  resources: Partial<Record<ResourceKey, number>>;
  lifetime: Partial<Record<ResourceKey, number>>;
  achievementMultipliers: {
    prodMul: Partial<Record<ResourceKey, number>>;
    useMul: Partial<Record<ResourceKey, number>>;
  };
} {
  try {
    const resources: Partial<Record<ResourceKey, number>> = {};
    const lifetime: Partial<Record<ResourceKey, number>> = {};
    const prodMul: Partial<Record<ResourceKey, number>> = {};
    const useMul: Partial<Record<ResourceKey, number>> = {};
    
    // Initialize resources with starting values
    for (const k in RESOURCES) {
      const key = k as ResourceKey;
      const startValue = RESOURCES[key].start || 0;
      
      resources[key] = startValue;
      lifetime[key] = startValue; // Initialize lifetime with starting value
      prodMul[key] = 1; // Initialize production multiplier
      useMul[key] = 1;  // Initialize usage multiplier
    }
    
    return {
      resources,
      lifetime,
      achievementMultipliers: {
        prodMul,
        useMul
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to initialize resource state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error; // Re-throw for critical initialization errors
  }
}
