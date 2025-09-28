/**
 * Resource-related actions
 * Handles resource updates, production, and time-based changes
 */

import type { ResourceKey, GameState, ResourceCost } from '@/lib/game/types';

import { payResources, calculateTimeBasedChanges, applyResourceChanges } from '@/lib/game/utils/resourceUpdates';
import { getPerSec } from '@/lib/game/utils/calculations';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

const stateErrorHandler = createStateErrorHandler('resourceActions');

/**
 * Pay resources (subtract from state) - Uses unified utility
 */
export function pay(state: GameState, cost: ResourceCost): GameState {
  try {
    return payResources(state, cost);
  } catch (error) {
    stateErrorHandler('Failed to pay resources', { cost, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Update resources from production and track lifetime statistics
 * 
 * @param state - Current game state
 * @param dtSeconds - Time delta in seconds
 * @returns Updated game state with resource changes and lifetime tracking
 */
export function updateResourcesFromProduction(state: GameState, dtSeconds: number): GameState {
  try {
    // Early return if no time has passed
    if (dtSeconds <= 0) return state;
    
    const perSec = getPerSec(state);
    
    // Calculate resource changes using unified utility
    const resourceChanges = calculateTimeBasedChanges(state, perSec, dtSeconds);
    
    // Early return if no changes occurred
    if (Object.keys(resourceChanges).length === 0) {
      return state;
    }
    
    // Apply resource updates using unified utility
    let newState = applyResourceChanges(state, resourceChanges);
    
    // Track lifetime resources for statistics and prestige calculations
    const lifetimeUpdates: Partial<Record<ResourceKey, number>> = {};
    let hasLifetimeChanges = false;
    
    for (const r in perSec) {
      const rk = r as ResourceKey;
      const delta = Math.max(0, (perSec[rk] || 0) * dtSeconds);
      if (delta > 0) {
        const currentLifetime = state.lifetime[rk] || 0;
        const newLifetime = currentLifetime + delta;
        lifetimeUpdates[rk] = newLifetime;
        hasLifetimeChanges = true;
      }
    }
    
    if (hasLifetimeChanges) {
      newState = {
        ...newState,
        lifetime: { ...newState.lifetime, ...lifetimeUpdates }
      };
    }
    
    return newState;
  } catch (error) {
    stateErrorHandler('Failed to update resources from production', { dtSeconds, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
