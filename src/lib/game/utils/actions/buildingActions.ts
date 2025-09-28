/**
 * Building-related actions
 * Handles building purchases and related functionality
 */

import type { BuildingKey, GameState, ResourceCost } from '@/lib/game/types';

import { 
  getBuildingCount, 
  updateBuildingCount
} from '@/lib/game/gameState';
import { payResources } from '@/lib/game/utils/resourceUpdates';
import { checkAchievements } from '@/lib/game/utils/achievement';
import { costFor, canAfford } from '@/lib/game/utils/calculations';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

const stateErrorHandler = createStateErrorHandler('buildingActions');

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
 * Buy a building - Optimized pure function with error handling
 */
export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  try {
    const cost = costFor(state, key);
    if (!canAfford(state, cost)) return state;
    
    const newState = pay(state, cost);
    const current = getBuildingCount(newState, key);
    const stateWithBuilding = updateBuildingCount(newState, key, current + 1);
    
    // Check achievements after building purchase
    return checkAchievements(stateWithBuilding);
  } catch (error) {
    stateErrorHandler('Failed to buy building', { buildingKey: key, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
