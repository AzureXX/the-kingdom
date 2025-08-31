import type { ResourceKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey } from './types';
import type { GameState, Multipliers } from './types';

import { CONFIG } from './config';
import { GAME_CONSTANTS } from './constants';
import { getResource, getBuildingCount, getUpgradeLevel, isBuildingUnlocked } from './gameState';
import { isValidBuildingKey } from './utils';
import { logInvalidKey, createValidationErrorHandler, createCalculationErrorHandler } from './utils/errorLogger';

const { buildings: BUILDINGS, technologies: TECHNOLOGIES, prestige: PRESTIGE_CONFIG } = CONFIG;

// Create specialized error handlers for calculations
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Calculate all multipliers based on current upgrade levels
 */
export function getMultipliers(state: GameState): Multipliers {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getMultipliers', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    const ctx: Multipliers = {
      clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      cost: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
      useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
    };
    
    for (const key in PRESTIGE_CONFIG.upgrades) {
      const k = key as PrestigeUpgradeKey;
      const lvl = getUpgradeLevel(state, k);
      if (!lvl) continue;
      
      PRESTIGE_CONFIG.upgrades[k].effect(lvl, {
        muls: ctx,
        prodMul: ctx.prodMul,
        useMul: ctx.useMul,
      });
    }
    
    return ctx;
  } catch (error) {
    calculationHandler('Failed to calculate multipliers', { error: error instanceof Error ? error.message : String(error) });
    // Return default multipliers on error for safety
    return {
      clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      cost: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
      useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
    };
  }
}

/**
 * Calculate the cost for a building based on current ownership and multipliers
 */
export function costFor(state: GameState, buildKey: BuildingKey): Partial<Record<ResourceKey, number>> {
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
    const cost: Partial<Record<ResourceKey, number>> = {};
    
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
export function technologyCostFor(state: GameState, techKey: TechnologyKey): Partial<Record<ResourceKey, number>> {
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

    const cost: Partial<Record<ResourceKey, number>> = {};
    
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
 * Check if the player can afford a given cost
 */
export function canAfford(state: GameState, cost: Partial<Record<ResourceKey, number>>): boolean {
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
 * Calculate production per second for all resources
 */
export function getPerSec(state: GameState): Record<ResourceKey, number> {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getPerSec', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    const muls = getMultipliers(state);
    const out: Record<ResourceKey, number> = { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
    
    for (const key in BUILDINGS) {
      if (!isValidBuildingKey(key)) {
        logInvalidKey(key, 'building', 'calculation');
        continue;
      }
      const def = BUILDINGS[key];
      const n = getBuildingCount(state, key);
      if (!n) continue;
      
      // Add production
      for (const r in def.baseProd) {
        const rk = r as ResourceKey;
        out[rk] += (def.baseProd[rk] || 0) * n * (muls.prodMul[rk] || 1);
      }
      
      // Subtract consumption
      for (const r in def.baseUse) {
        const rk = r as ResourceKey;
        out[rk] -= (def.baseUse[rk] || 0) * n * (muls.useMul[rk] || 1);
      }
    }
    
    return out;
  } catch (error) {
    calculationHandler('Failed to calculate production per second', { error: error instanceof Error ? error.message : String(error) });
    // Return zero production on error for safety
    return { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
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
