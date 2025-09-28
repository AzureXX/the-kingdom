// Resource processing utilities

import { applyResourceChanges } from './changes';
import { createStateErrorHandler } from '@/lib/game/utils/error';
import type { GameState, ResourceKey, ResourceCost } from '@/lib/game/types';

const stateErrorHandler = createStateErrorHandler('resourceUpdates');

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
