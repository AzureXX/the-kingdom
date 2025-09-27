import { useMemo, useCallback } from 'react';
import { 
  calculateAllGameCalculations
} from '../utils/gameCalculations';
import { costFor, canAfford } from '../calculations';
import type { GameState, Multipliers } from '../types';
import type { BuildingKey, PrestigeUpgradeKey, ResourceKey, TechnologyKey, ResourceCost } from '../types';

export function useGameCalculations(state: GameState | null): {
  // Game calculations - flattened for easier access
  perSec: Partial<Record<ResourceKey, number>>;
  prestigePotential: number;
  multipliers: Multipliers | null;
  technologyCosts: Record<TechnologyKey, ResourceCost>;
  upgradeCosts: Record<PrestigeUpgradeKey, number>;
  
  // Utility functions - flattened for easier access
  memoizedCostFor: (key: BuildingKey) => ResourceCost;
  memoizedCanAfford: (cost: ResourceCost) => boolean;
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

  // Return flattened structure for easier consumption
  return {
    // Game calculations - direct access
    perSec: gameCalculationsData.perSec,
    prestigePotential: gameCalculationsData.prestigePotential,
    multipliers: gameCalculationsData.multipliers,
    technologyCosts: gameCalculationsData.technologyCosts,
    upgradeCosts: gameCalculationsData.upgradeCosts,
    
    // Utility functions - direct access
    memoizedCostFor,
    memoizedCanAfford,
  };
}
