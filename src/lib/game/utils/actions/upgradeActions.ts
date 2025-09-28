/**
 * Upgrade-related actions
 * Handles prestige upgrade purchases and related functionality
 */

import type { PrestigeUpgradeKey, GameState } from '@/lib/game/types';

import { 
  getResource, 
  getUpgradeLevel, 
  updateUpgradeLevel,
  updateResource
} from '@/lib/game/gameState';
import { getUpgradeCost, canBuyUpgrade } from '@/lib/game/utils/calculations';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

const stateErrorHandler = createStateErrorHandler('upgradeActions');

/**
 * Buy an upgrade - Optimized pure function with error handling
 */
export function buyUpgrade(state: GameState, key: PrestigeUpgradeKey): GameState {
  try {
    if (!canBuyUpgrade(state, key)) return state;
    
    const currentLevel = getUpgradeLevel(state, key);
    const cost = getUpgradeCost(key, currentLevel);
    
    const currentPrestige = getResource(state, 'prestige');
    const newPrestige = currentPrestige - cost;
    
    // Only update if prestige actually changed
    if (newPrestige === currentPrestige) return state;
    
    const newState = updateResource(state, 'prestige', newPrestige);
    return updateUpgradeLevel(newState, key, currentLevel + 1);
  } catch (error) {
    stateErrorHandler('Failed to buy upgrade', { upgradeKey: key, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
