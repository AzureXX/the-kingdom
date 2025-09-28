// Cost calculation logic

import type { ResourceKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey, ResourceCost, GameState } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { getBuildingCount } from '@/lib/game/gameState';
import { isValidBuildingKey } from '@/lib/game/utils';
import { logInvalidKey, createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/errorLogger';
import { getMultipliers } from './multipliers';

const { buildings: BUILDINGS, technologies: TECHNOLOGIES, prestige: PRESTIGE_CONFIG } = CONFIG;

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Calculate the cost for a building based on current ownership and multipliers
 */
export function costFor(state: GameState, buildKey: BuildingKey): ResourceCost {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for costFor', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!buildKey || typeof buildKey !== 'string') {
      validationHandler('Invalid building key for costFor', { buildKey: typeof buildKey, value: buildKey });
      throw new Error('Invalid building key');
    }

    const def = BUILDINGS[buildKey];
    if (!def) {
      validationHandler('Building definition not found', { buildKey });
      throw new Error('Building definition not found');
    }

    const owned = getBuildingCount(state, buildKey);
    const muls = getMultipliers(state);
    const cost: ResourceCost = {};
    
    for (const r in def.baseCost) {
      const rk = r as ResourceKey;
      cost[rk] = Math.ceil((def.baseCost[rk] || 0) * Math.pow(def.costScale, owned) * muls.cost);
    }
    
    return cost;
  } catch (error) {
    calculationHandler('Failed to calculate building cost', { buildKey, error: error instanceof Error ? error.message : String(error) });
    return {}; // Return empty cost on error for safety
  }
}

/**
 * Calculate the cost for a technology
 */
export function technologyCostFor(state: GameState, techKey: TechnologyKey): ResourceCost {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for technologyCostFor', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!techKey || typeof techKey !== 'string') {
      validationHandler('Invalid technology key for technologyCostFor', { techKey: typeof techKey, value: techKey });
      throw new Error('Invalid technology key');
    }

    const def = TECHNOLOGIES[techKey];
    if (!def) {
      validationHandler('Technology definition not found', { techKey });
      throw new Error('Technology definition not found');
    }

    const cost: ResourceCost = {};
    
    for (const r in def.baseCost) {
      const rk = r as ResourceKey;
      cost[rk] = def.baseCost[rk] || 0;
    }
    
    return cost;
  } catch (error) {
    calculationHandler('Failed to calculate technology cost', { techKey, error: error instanceof Error ? error.message : String(error) });
    return {}; // Return empty cost on error for safety
  }
}

/**
 * Calculate upgrade cost for a given level
 */
export function getUpgradeCost(upgradeKey: PrestigeUpgradeKey, level: number): number {
  try {
    // Validate inputs
    if (!upgradeKey || typeof upgradeKey !== 'string') {
      validationHandler('Invalid upgrade key for getUpgradeCost', { upgradeKey: typeof upgradeKey, value: upgradeKey });
      throw new Error('Invalid upgrade key');
    }
    
    if (typeof level !== 'number' || isNaN(level) || level < 0) {
      validationHandler('Invalid level for getUpgradeCost', { level, type: typeof level });
      throw new Error('Invalid level');
    }

    const def = PRESTIGE_CONFIG.upgrades[upgradeKey];
    if (!def) {
      validationHandler('Upgrade definition not found', { upgradeKey });
      throw new Error('Upgrade definition not found');
    }

    return Math.ceil(def.costCurve(level));
  } catch (error) {
    calculationHandler('Failed to calculate upgrade cost', { upgradeKey, level, error: error instanceof Error ? error.message : String(error) });
    return 999999; // Return high cost on error to prevent purchase
  }
}
