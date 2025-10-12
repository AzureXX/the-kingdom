// Resource processing utilities

import type { GameState, ResourceKey } from '@/lib/game/types';


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
