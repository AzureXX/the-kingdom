// Resource management logic

import type { ResourceKey, ResourceCost, ResourceProduction } from '@/lib/game/types';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { createValidationErrorHandler, createStateErrorHandler } from '@/lib/game/utils/error';
import { checkAchievements } from '@/lib/game/utils/achievement';
import type { GameState } from '@/lib/game/types';

// Create specialized error handlers for game state
const validationHandler = createValidationErrorHandler('gameState');
const stateErrorHandler = createStateErrorHandler('gameState');

/**
 * Get a resource value safely, returning 0 if not found
 */
export function getResource(state: GameState, resourceKey: ResourceKey): number {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getResource', { state: typeof state });
      return 0;
    }
    
    if (!resourceKey || typeof resourceKey !== 'string') {
      validationHandler('Invalid resource key for getResource', { resourceKey: typeof resourceKey, value: resourceKey });
      return 0;
    }

    return state.resources[resourceKey] || 0;
  } catch (error) {
    stateErrorHandler('Failed to get resource', { resourceKey, error: error instanceof Error ? error.message : String(error) });
    return 0; // Return 0 on error for safety
  }
}

/**
 * Set a resource value - Pure function with validation
 */
export function setResource(state: GameState, resourceKey: ResourceKey, value: number): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for setResource', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!resourceKey || typeof resourceKey !== 'string') {
      validationHandler('Invalid resource key for setResource', { resourceKey: typeof resourceKey, value: resourceKey });
      throw new Error('Invalid resource key');
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
      validationHandler('Invalid value for setResource', { value, type: typeof value });
      throw new Error('Invalid value');
    }

    const currentValue = state.resources[resourceKey] || 0;
    const newValue = Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value);
    if (currentValue === newValue) return state;
    
    return {
      ...state,
      resources: {
        ...state.resources,
        [resourceKey]: newValue
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to set resource', { resourceKey, value, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Update a resource value with structural sharing - Pure function with validation
 */
export function updateResource(state: GameState, resourceKey: ResourceKey, value: number): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for updateResource', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!resourceKey || typeof resourceKey !== 'string') {
      validationHandler('Invalid resource key for updateResource', { resourceKey: typeof resourceKey, value: resourceKey });
      throw new Error('Invalid resource key');
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
      validationHandler('Invalid value for updateResource', { value, type: typeof value });
      throw new Error('Invalid value');
    }

    const currentValue = state.resources[resourceKey] || 0;
    if (currentValue === value) return state;
    
    return {
      ...state,
      resources: {
        ...state.resources,
        [resourceKey]: Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value)
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to update resource', { resourceKey, value, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Update multiple resources at once - Pure function with validation
 */
export function updateMultipleResources(state: GameState, updates: ResourceCost): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for updateMultipleResources', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!updates || typeof updates !== 'object') {
      validationHandler('Invalid updates parameter for updateMultipleResources', { updates: typeof updates });
      throw new Error('Invalid updates parameter');
    }

    if (Object.keys(updates).length === 0) return state;
    
    const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
    let hasChanges = false;
    
    for (const [key, value] of Object.entries(updates)) {
      const resourceKey = key as ResourceKey;
      const currentValue = state.resources[resourceKey] || 0;
      const newValue = Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value);
      
      if (currentValue !== newValue) {
        resourceUpdates[resourceKey] = newValue;
        hasChanges = true;
      }
    }
    
    if (!hasChanges) return state;
    
    return {
      ...state,
      resources: {
        ...state.resources,
        ...resourceUpdates
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to update multiple resources', { error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Add resources to the game state - Pure function with lifetime resource tracking
 */
export function addResources(state: GameState, obj: ResourceProduction): GameState {
  if (Object.keys(obj).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  const lifetimeUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  let hasLifetimeChanges = false;
  
  for (const r in obj) {
    const rk = r as ResourceKey;
    const current = state.resources[rk] || 0;
    const delta = obj[rk] || 0;
    const newValue = current + delta;
    
    if (delta !== 0) {
      resourceUpdates[rk] = newValue;
      hasChanges = true;
      
      // Track lifetime resources for statistics and prestige calculations
      if (delta > 0) {
        const currentLifetime = state.lifetime[rk] || 0;
        const newLifetime = currentLifetime + delta;
        lifetimeUpdates[rk] = newLifetime;
        hasLifetimeChanges = true;
      }
    }
  }
  
  if (!hasChanges) return state;
  
  // Update resources
  let newState = {
    ...state,
    resources: {
      ...state.resources,
      ...resourceUpdates
    }
  };
  
  // Update lifetime resources if any were gained
  if (hasLifetimeChanges) {
    newState = {
      ...newState,
      lifetime: { ...newState.lifetime, ...lifetimeUpdates }
    };
  }
  
  // Check achievements after resource changes
  newState = checkAchievements(newState);
  
  return newState;
}
