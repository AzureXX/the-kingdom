// Game calculation aggregation utilities

import { getPerSec, getMultipliers } from '@/lib/game/utils/calculations';
import { prestigeGain } from '@/lib/game/utils/prestige';
import { calculateTechnologyCosts, calculateUpgradeCosts } from '@/lib/game/utils/gameCalculations/costs';
import type { GameState, Multipliers, TechnologyKey, PrestigeUpgradeKey, ResourceKey, ResourceCost } from '@/lib/game/types';

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
