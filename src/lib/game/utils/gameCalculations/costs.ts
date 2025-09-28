// Game calculation cost utilities

import { technologyCostFor, getUpgradeCost } from '@/lib/game/utils/calculations';
import { getUpgradeLevel } from '@/lib/game/utils/gameState';
import { CONFIG } from '@/lib/game/config';
import type { GameState, TechnologyKey, PrestigeUpgradeKey, ResourceCost } from '@/lib/game/types';

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
