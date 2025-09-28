/**
 * Unified resource update utilities
 * Consolidates common resource update patterns from across the codebase
 */

import { getResource, updateMultipleResources, addResources } from '@/lib/game/utils/gameState';
import { isValidResourceKey } from '@/lib/game/utils';
import { logInvalidKey } from '@/lib/game/utils/errorLogger';
import type { GameState, ResourceKey, ResourceCost, ResourceProduction } from '@/lib/game/types';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

const stateErrorHandler = createStateErrorHandler('resourceUpdates');
/**
 * Pay resources (subtract from state) - Unified implementation
 * 
 * @param state - Current game state
 * @param cost - Resources to pay
 * @returns Updated game state
 * 
 * ```typescript
 * const newState = payResources(state, { gold: 100, wood: 50 });
 * ```
 */
export function payResources(state: GameState, cost: ResourceCost): GameState {
  if (Object.keys(cost).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  
  for (const r in cost) {
    const rk = r as ResourceKey;
    const current = getResource(state, rk);
    const newValue = current - (cost[rk] || 0);
    
    if (newValue !== current) {
      resourceUpdates[rk] = newValue;
      hasChanges = true;
    }
  }
  
  if (!hasChanges) return state;
  return updateMultipleResources(state, resourceUpdates);
}

/**
 * Apply resource changes (both positive and negative) - Unified implementation
 * 
 * @param state - Current game state
 * @param changes - Resource changes to apply
 * @returns Updated game state
 * 
 * ```typescript
 * const newState = applyResourceChanges(state, { gold: 100, wood: -50 });
 * ```
 */
export function applyResourceChanges(state: GameState, changes: ResourceCost): GameState {
  if (Object.keys(changes).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  
  for (const resource in changes) {
    if (!isValidResourceKey(resource)) {
      logInvalidKey(resource, 'resource', 'resourceUpdates');
      continue;
    }
    
    const resourceKey = resource as ResourceKey;
    const amount = changes[resourceKey] || 0;
    const current = getResource(state, resourceKey);
    let newValue: number;
    
    if (amount > 0) {
      // For positive amounts, add resources
      newValue = current + amount;
    } else if (amount < 0) {
      // For negative amounts, subtract resources (but not below 0)
      newValue = Math.max(0, current + amount);
    } else {
      // No change for zero amounts
      continue;
    }
    
    if (newValue !== current) {
      resourceUpdates[resourceKey] = newValue;
      hasChanges = true;
    }
  }
  
  if (!hasChanges) return state;
  return updateMultipleResources(state, resourceUpdates);
}

/**
 * Add resources to the game state - Unified implementation
 * 
 * @param state - Current game state
 * @param resources - Resources to add
 * @returns Updated game state
 * 
 * ```typescript
 * const newState = addResourcesToState(state, { gold: 100, wood: 50 });
 * ```
 */
export function addResourcesToState(state: GameState, resources: ResourceProduction): GameState {
  return addResources(state, resources);
}

/**
 * Process resource changes with validation and error handling
 * 
 * @param state - Current game state
 * @param changes - Resource changes to apply
 * @param context - Context for error logging
 * @returns Updated game state
 * 
 * ```typescript
 * const newState = processResourceChanges(state, changes, 'eventSystem');
 * ```
 */
export function processResourceChanges(
  state: GameState, 
  changes: ResourceCost, 
  context: string
): GameState {
  try {
    return applyResourceChanges(state, changes);
  } catch (error) {
    stateErrorHandler(`Failed to process resource changes in ${context}`, { error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Calculate resource changes for time-based updates
 * 
 * @param state - Current game state
 * @param perSec - Per-second resource rates
 * @param dtSeconds - Time delta in seconds
 * @returns Resource changes to apply
 * 
 * ```typescript
 * const changes = calculateTimeBasedChanges(state, perSec, 0.05);
 * const newState = applyResourceChanges(state, changes);
 * ```
 */
export function calculateTimeBasedChanges(
  state: GameState,
  perSec: Partial<Record<ResourceKey, number>>,
  dtSeconds: number
): Partial<Record<ResourceKey, number>> {
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  
  for (const r in perSec) {
    const rk = r as ResourceKey;
    const delta = (perSec[rk] || 0) * dtSeconds;
    if (delta === 0) continue;
    
    const currentValue = state.resources[rk] || 0;
    let newValue: number;
    
    if (delta < 0) {
      // Resource consumption - don't go below 0
      newValue = Math.max(0, currentValue + delta);
    } else {
      // Resource production
      newValue = currentValue + delta;
    }
    
    if (newValue !== currentValue) {
      resourceUpdates[rk] = newValue - currentValue; // Return the delta, not absolute value
    }
  }
  
  return resourceUpdates;
}
