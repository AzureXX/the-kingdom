import { CONFIG, type ResourceKey, type BuildingKey, type PrestigeUpgradeKey, type TechnologyKey } from './config';
import { GAME_CONSTANTS } from './constants';
import type { GameState, Multipliers } from './types';
import { getResource, getBuildingCount, getUpgradeLevel, isBuildingUnlocked } from './gameState';
import { isValidBuildingKey } from './utils';

/**
 * Calculate all multipliers based on current upgrade levels
 */
export function getMultipliers(state: GameState): Multipliers {
  const ctx: Multipliers = {
    clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
    cost: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
    prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
    useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
  };
  
  for (const key in CONFIG.prestige.upgrades) {
    const k = key as PrestigeUpgradeKey;
    const lvl = getUpgradeLevel(state, k);
    if (!lvl) continue;
    
    CONFIG.prestige.upgrades[k].effect(lvl, {
      muls: ctx,
      prodMul: ctx.prodMul,
      useMul: ctx.useMul,
    });
  }
  
  return ctx;
}

/**
 * Calculate the cost for a building based on current ownership and multipliers
 */
export function costFor(state: GameState, buildKey: BuildingKey): Partial<Record<ResourceKey, number>> {
  const def = CONFIG.buildings[buildKey];
  const owned = getBuildingCount(state, buildKey);
  const muls = getMultipliers(state);
  const cost: Partial<Record<ResourceKey, number>> = {};
  
  for (const r in def.baseCost) {
    const rk = r as ResourceKey;
    cost[rk] = Math.ceil((def.baseCost[rk] || 0) * Math.pow(def.costScale, owned) * muls.cost);
  }
  
  return cost;
}

/**
 * Calculate the cost for a technology
 */
export function technologyCostFor(state: GameState, techKey: TechnologyKey): Partial<Record<ResourceKey, number>> {
  const def = CONFIG.technologies[techKey];
  const cost: Partial<Record<ResourceKey, number>> = {};
  
  for (const r in def.baseCost) {
    const rk = r as ResourceKey;
    cost[rk] = def.baseCost[rk] || 0;
  }
  
  return cost;
}

/**
 * Check if the player can afford a given cost
 */
export function canAfford(state: GameState, cost: Partial<Record<ResourceKey, number>>): boolean {
  for (const r in cost) {
    const rk = r as ResourceKey;
    if (getResource(state, rk) < (cost[rk] || 0)) return false;
  }
  return true;
}

/**
 * Check if a building can be purchased (affordable and unlocked)
 */
export function canBuyBuilding(state: GameState, buildKey: BuildingKey): boolean {
  if (!isBuildingUnlocked(state, buildKey)) return false;
  return canAfford(state, costFor(state, buildKey));
}

/**
 * Calculate production per second for all resources
 */
export function getPerSec(state: GameState): Record<ResourceKey, number> {
  const muls = getMultipliers(state);
  const out: Record<ResourceKey, number> = { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
  
  for (const key in CONFIG.buildings) {
    if (!isValidBuildingKey(key)) {
      console.warn(`Invalid building key: ${key}`);
      continue;
    }
    const def = CONFIG.buildings[key];
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
}

/**
 * Calculate click gains based on current multipliers
 */
export function getClickGains(state: GameState): Partial<Record<ResourceKey, number>> {
  const muls = getMultipliers(state);
  const base = CONFIG.click.base;
  const gains: Partial<Record<ResourceKey, number>> = {};
  
  for (const r in base) {
    const rk = r as ResourceKey;
    const baseValue = base[rk as keyof typeof base] || 0;
    gains[rk] = baseValue * (muls.clickGain || 1);
  }
  
  return gains;
}

/**
 * Calculate upgrade cost for a given level
 */
export function getUpgradeCost(upgradeKey: PrestigeUpgradeKey, level: number): number {
  const def = CONFIG.prestige.upgrades[upgradeKey];
  return Math.ceil(def.costCurve(level));
}

/**
 * Check if an upgrade can be purchased
 */
export function canBuyUpgrade(state: GameState, upgradeKey: PrestigeUpgradeKey): boolean {
  const def = CONFIG.prestige.upgrades[upgradeKey];
  const currentLevel = getUpgradeLevel(state, upgradeKey);
  const cost = getUpgradeCost(upgradeKey, currentLevel);
  const prestige = getResource(state, 'prestige');
  
  return currentLevel < def.max && prestige >= cost;
}
