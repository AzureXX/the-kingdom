// Affordability checking logic

import type { ResourceKey, BuildingKey, PrestigeUpgradeKey, ResourceCost, GameState } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { getResource, getUpgradeLevel, isBuildingUnlocked } from '@/lib/game/utils/gameState';
import { createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/errorLogger';
import { costFor, getUpgradeCost } from './costs';

const { prestige: PRESTIGE_CONFIG } = CONFIG;

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Check if the player can afford a given cost
 */
export function canAfford(state: GameState, cost: ResourceCost): boolean {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for canAfford', { state: typeof state });
      return false;
    }
    
    if (!cost || typeof cost !== 'object') {
      validationHandler('Invalid cost parameter for canAfford', { cost: typeof cost });
      return false;
    }

    for (const r in cost) {
      const rk = r as ResourceKey;
      if (getResource(state, rk) < (cost[rk] || 0)) return false;
    }
    return true;
  } catch (error) {
    calculationHandler('Failed to check affordability', { error: error instanceof Error ? error.message : String(error) });
    return false; // Return false on error for safety
  }
}

/**
 * Check if a building can be purchased (affordable and unlocked)
 */
export function canBuyBuilding(state: GameState, buildKey: BuildingKey): boolean {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for canBuyBuilding', { state: typeof state });
      return false;
    }
    
    if (!buildKey || typeof buildKey !== 'string') {
      validationHandler('Invalid building key for canBuyBuilding', { buildKey: typeof buildKey, value: buildKey });
      return false;
    }

    if (!isBuildingUnlocked(state, buildKey)) return false;
    return canAfford(state, costFor(state, buildKey));
  } catch (error) {
    calculationHandler('Failed to check if building can be purchased', { buildKey, error: error instanceof Error ? error.message : String(error) });
    return false; // Return false on error for safety
  }
}

/**
 * Check if an upgrade can be purchased
 */
export function canBuyUpgrade(state: GameState, upgradeKey: PrestigeUpgradeKey): boolean {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for canBuyUpgrade', { state: typeof state });
      return false;
    }
    
    if (!upgradeKey || typeof upgradeKey !== 'string') {
      validationHandler('Invalid upgrade key for canBuyUpgrade', { upgradeKey: typeof upgradeKey, value: upgradeKey });
      return false;
    }

    const def = PRESTIGE_CONFIG.upgrades[upgradeKey];
    if (!def) {
      validationHandler('Upgrade definition not found', { upgradeKey });
      return false;
    }

    const currentLevel = getUpgradeLevel(state, upgradeKey);
    const cost = getUpgradeCost(upgradeKey, currentLevel);
    const prestige = getResource(state, 'prestige');
    
    return currentLevel < def.max && prestige >= cost;
  } catch (error) {
    calculationHandler('Failed to check if upgrade can be purchased', { upgradeKey, error: error instanceof Error ? error.message : String(error) });
    return false; // Return false on error for safety
  }
}
