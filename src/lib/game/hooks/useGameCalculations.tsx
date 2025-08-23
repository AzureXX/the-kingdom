import { useMemo, useCallback } from 'react';
import { getPerSec, costFor, canAfford, getMultipliers, getClickGains, technologyCostFor, getUpgradeCost } from '../calculations';
import { prestigeGain } from '../prestigeSystem';
import { getUpgradeLevel } from '../gameState';
import { CONFIG } from '../config';
import type { GameState } from '../types';
import type { BuildingKey, PrestigeUpgradeKey, ResourceKey, TechnologyKey } from '../config';

export function useGameCalculations(state: GameState | null) {
  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  // Memoize multipliers calculation since it's expensive and used by multiple functions
  const multipliers = useMemo(() => state ? getMultipliers(state) : null, [state]);
  
  // Memoized utility functions to prevent recreation
  const memoizedCostFor = useCallback((key: BuildingKey) => state ? costFor(state, key) : {}, [state]);
  const memoizedCanAfford = useCallback((cost: Partial<Record<ResourceKey, number>>) => state ? canAfford(state, cost) : false, [state]);
  
  // Memoize click gains calculation since it depends on multipliers
  const clickGains = useMemo(() => state ? getClickGains(state) : {}, [state]);
  
  // Memoize technology costs to prevent recalculation on every render
  const technologyCosts = useMemo(() => {
    if (!state) return {} as Record<TechnologyKey, Partial<Record<ResourceKey, number>>>;
    const costs: Record<TechnologyKey, Partial<Record<ResourceKey, number>>> = {} as Record<TechnologyKey, Partial<Record<ResourceKey, number>>>;
    for (const techKey of Object.keys(CONFIG.technologies) as TechnologyKey[]) {
      costs[techKey] = technologyCostFor(state, techKey);
    }
    return costs;
  }, [state]);
  
  // Memoize upgrade costs to prevent recalculation on every render
  const upgradeCosts = useMemo(() => {
    if (!state) return {} as Record<PrestigeUpgradeKey, number>;
    const costs: Record<PrestigeUpgradeKey, number> = {} as Record<PrestigeUpgradeKey, number>;
    for (const upgradeKey of Object.keys(CONFIG.prestige.upgrades) as PrestigeUpgradeKey[]) {
      const currentLevel = getUpgradeLevel(state, upgradeKey);
      costs[upgradeKey] = getUpgradeCost(upgradeKey, currentLevel);
    }
    return costs;
  }, [state]);

  // Group calculation results together for cleaner consumption
  const gameCalculations = useMemo(() => ({
    perSec,
    prestigePotential,
    multipliers,
    clickGains,
    technologyCosts,
    upgradeCosts,
  }), [perSec, prestigePotential, multipliers, clickGains, technologyCosts, upgradeCosts]);

  // Group utility functions together for cleaner consumption
  const utilityFunctions = useMemo(() => ({
    memoizedCostFor,
    memoizedCanAfford,
  }), [memoizedCostFor, memoizedCanAfford]);

  return {
    gameCalculations, // Grouped calculation results
    utilityFunctions, // Grouped utility functions
    // Individual values still available for backward compatibility
    perSec,
    prestigePotential,
    multipliers,
    memoizedCostFor,
    memoizedCanAfford,
    clickGains,
    technologyCosts,
    upgradeCosts,
  };
}
