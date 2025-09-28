/**
 * Game calculation utilities
 * Extracted from useGameCalculations.tsx to improve maintainability
 */

import { getPerSec, costFor, canAfford, getMultipliers, technologyCostFor, getUpgradeCost } from '@/lib/game/utils/calculations';
import { prestigeGain } from '@/lib/game/prestigeSystem';
import { getUpgradeLevel } from '@/lib/game/gameState';
import { CONFIG } from '@/lib/game/config';
import type { GameState, Multipliers } from '@/lib/game/types';
import type { BuildingKey, PrestigeUpgradeKey, ResourceKey, TechnologyKey, ResourceCost } from '@/lib/game/types';

/**
 * Calculate all technology costs for a given game state
 * 
 * @param state - Current game state
 * @returns Object with technology costs
 * 
 * ```typescript
 * const techCosts = calculateTechnologyCosts(state);
 * ```
 */
export function calculateTechnologyCosts(state: GameState): Record<TechnologyKey, ResourceCost> {
  const TECHNOLOGIES = CONFIG.technologies;
  const costs: Record<TechnologyKey, ResourceCost> = {} as Record<TechnologyKey, ResourceCost>;
  
  for (const techKey of Object.keys(TECHNOLOGIES) as TechnologyKey[]) {
    costs[techKey] = technologyCostFor(state, techKey);
  }
  
  return costs;
}

/**
 * Calculate all upgrade costs for a given game state
 * 
 * @param state - Current game state
 * @returns Object with upgrade costs
 * 
 * ```typescript
 * const upgradeCosts = calculateUpgradeCosts(state);
 * ```
 */
export function calculateUpgradeCosts(state: GameState): Record<PrestigeUpgradeKey, number> {
  const PRESTIGE_UPGRADES = CONFIG.prestige.upgrades;
  const costs: Record<PrestigeUpgradeKey, number> = {} as Record<PrestigeUpgradeKey, number>;
  
  for (const upgradeKey of Object.keys(PRESTIGE_UPGRADES) as PrestigeUpgradeKey[]) {
    const currentLevel = getUpgradeLevel(state, upgradeKey);
    costs[upgradeKey] = getUpgradeCost(upgradeKey, currentLevel);
  }
  
  return costs;
}

/**
 * Calculate all game calculations for a given state
 * 
 * @param state - Current game state
 * @returns Object with all game calculations
 * 
 * ```typescript
 * const calculations = calculateAllGameCalculations(state);
 * ```
 */
export function calculateAllGameCalculations(state: GameState): {
  perSec: Partial<Record<ResourceKey, number>>;
  prestigePotential: number;
  multipliers: Multipliers | null;
  technologyCosts: Record<TechnologyKey, ResourceCost>;
  upgradeCosts: Record<PrestigeUpgradeKey, number>;
} {
  return {
    perSec: getPerSec(state),
    prestigePotential: prestigeGain(state),
    multipliers: getMultipliers(state),
    technologyCosts: calculateTechnologyCosts(state),
    upgradeCosts: calculateUpgradeCosts(state)
  };
}

/**
 * Create memoized cost calculation function
 * 
 * @param state - Current game state
 * @returns Function to calculate building costs
 * 
 * ```typescript
 * const costFor = createMemoizedCostFor(state);
 * const woodcutterCost = costFor('woodcutter');
 * ```
 */
export function createMemoizedCostFor(state: GameState | null) {
  return (key: BuildingKey): ResourceCost => {
    return state ? costFor(state, key) : {};
  };
}

/**
 * Create memoized affordability check function
 * 
 * @param state - Current game state
 * @returns Function to check if costs can be afforded
 * 
 * ```typescript
 * const canAfford = createMemoizedCanAfford(state);
 * const affordable = canAfford({ gold: 100, wood: 50 });
 * ```
 */
export function createMemoizedCanAfford(state: GameState | null) {
  return (cost: ResourceCost): boolean => {
    return state ? canAfford(state, cost) : false;
  };
}
