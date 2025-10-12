import { getResource, updateMultipleResources } from '@/lib/game/utils/gameState';
import { isValidResourceKey } from '@/lib/game/utils/validation';
import { logInvalidKey } from '@/lib/game/utils/error';
import type { GameState, ResourceKey, ResourceCost } from '@/lib/game/types';

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

