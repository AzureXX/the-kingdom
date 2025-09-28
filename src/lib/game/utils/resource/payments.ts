// Resource payment utilities

import { getResource, updateMultipleResources } from '@/lib/game/utils/gameState';
import type { GameState, ResourceKey, ResourceCost } from '@/lib/game/types';

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
