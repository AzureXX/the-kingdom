import { useMemo, useCallback } from 'react';
import { 
  calculateAllGameCalculations
} from '../utils/gameCalculations';
import { costFor, canAfford } from '../calculations';
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
  // Memoized game calculations using utility functions
  const gameCalculationsData = useMemo(() => {
    return state ? calculateAllGameCalculations(state) : {
      perSec: {} as Partial<Record<ResourceKey, number>>,
      prestigePotential: 0,
      multipliers: null,
      technologyCosts: {} as Record<TechnologyKey, ResourceCost>,
      upgradeCosts: {} as Record<PrestigeUpgradeKey, number>
    };
  }, [state]);
  
  // Memoized utility functions to prevent recreation
  const memoizedCostFor = useCallback((key: BuildingKey) => {
    return state ? costFor(state, key) : {};
  }, [state]);
  
  const memoizedCanAfford = useCallback((cost: ResourceCost) => {
    return state ? canAfford(state, cost) : false;
  }, [state]);

  // Group calculation results together for cleaner consumption
  const gameCalculations = useMemo(() => ({
    perSec: gameCalculationsData.perSec,
    prestigePotential: gameCalculationsData.prestigePotential,
    multipliers: gameCalculationsData.multipliers,
    technologyCosts: gameCalculationsData.technologyCosts,
    upgradeCosts: gameCalculationsData.upgradeCosts,
  }), [gameCalculationsData]);

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
