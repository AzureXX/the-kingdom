import { useMemo, useCallback } from 'react';
import { getPerSec, costFor, canAfford, getMultipliers, technologyCostFor, getUpgradeCost } from '../calculations';
import { prestigeGain } from '../prestigeSystem';
import { getUpgradeLevel } from '../gameState';
import { CONFIG } from '../config';
import type { GameState, Multipliers } from '../types';
import type { BuildingKey, PrestigeUpgradeKey, ResourceKey, TechnologyKey, ResourceCost } from '../types';

export function useGameCalculations(state: GameState | null): {
  gameCalculations: {
    perSec: Partial<Record<ResourceKey, number>>;
    prestigePotential: number;
    multipliers: Multipliers | null;
    technologyCosts: Record<TechnologyKey, ResourceCost>;
    upgradeCosts: Record<PrestigeUpgradeKey, number>;
  };
  utilityFunctions: {
    memoizedCostFor: (key: BuildingKey) => ResourceCost;
    memoizedCanAfford: (cost: ResourceCost) => boolean;
  };
} {
  const TECHNOLOGIES = CONFIG.technologies;
  const PRESTIGE_UPGRADES = CONFIG.prestige.upgrades;
  
  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  // Memoize multipliers calculation since it's expensive and used by multiple functions
  const multipliers = useMemo(() => state ? getMultipliers(state) : null, [state]);
  
  // Memoized utility functions to prevent recreation
  const memoizedCostFor = useCallback((key: BuildingKey) => state ? costFor(state, key) : {}, [state]);
  const memoizedCanAfford = useCallback((cost: ResourceCost) => state ? canAfford(state, cost) : false, [state]);
    
  // Memoize technology costs to prevent recalculation on every render
  // TECHNOLOGIES is stable reference, so we only depend on state
  const technologyCosts = useMemo(() => {
    if (!state) return {} as Record<TechnologyKey, ResourceCost>;
    const costs: Record<TechnologyKey, ResourceCost> = {} as Record<TechnologyKey, ResourceCost>;
    for (const techKey of Object.keys(TECHNOLOGIES) as TechnologyKey[]) {
      costs[techKey] = technologyCostFor(state, techKey);
    }
    return costs;
  }, [state, TECHNOLOGIES]);
  
  // Memoize upgrade costs to prevent recalculation on every render
  // PRESTIGE_UPGRADES is stable reference, so we only depend on state
  const upgradeCosts = useMemo(() => {
    if (!state) return {} as Record<PrestigeUpgradeKey, number>;
    const costs: Record<PrestigeUpgradeKey, number> = {} as Record<PrestigeUpgradeKey, number>;
    for (const upgradeKey of Object.keys(PRESTIGE_UPGRADES) as PrestigeUpgradeKey[]) {
      const currentLevel = getUpgradeLevel(state, upgradeKey);
      costs[upgradeKey] = getUpgradeCost(upgradeKey, currentLevel);
    }
    return costs;
  }, [state, PRESTIGE_UPGRADES]);

  // Group calculation results together for cleaner consumption
  const gameCalculations = useMemo(() => ({
    perSec,
    prestigePotential,
    multipliers,
    technologyCosts,
    upgradeCosts,
  }), [perSec, prestigePotential, multipliers, technologyCosts, upgradeCosts]);

  // Group utility functions together for cleaner consumption
  const utilityFunctions = useMemo(() => ({
    memoizedCostFor,
    memoizedCanAfford,
  }), [memoizedCostFor, memoizedCanAfford]);

  return {
    gameCalculations,
    utilityFunctions,
  };
}
