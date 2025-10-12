/**
 * Building-related actions
 * Handles building purchases and related functionality
 */

import type { BuildingKey, GameState } from '@/lib/game/types';
import { pay } from '@/lib/game/utils/actions/resourceActions';

import { 
  getBuildingCount, 
  updateBuildingCount,
  isBuildingUnlocked
} from '@/lib/game/utils/gameState';
import { payResources } from '@/lib/game/utils/resource';
import { checkAchievements } from '@/lib/game/utils/achievement';
import { costFor, canAfford } from '@/lib/game/utils/calculations';
import { createStateErrorHandler } from '@/lib/game/utils/error';

const stateErrorHandler = createStateErrorHandler('buildingActions');
/**
 * Buy a building - Optimized pure function with error handling
 */
export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  try {
    // Check if building is unlocked
    if (!isBuildingUnlocked(state, key)) {
      return state; // Building not unlocked, cannot purchase
    }
    
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
