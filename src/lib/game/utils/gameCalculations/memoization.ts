// Game calculation memoization utilities

import { costFor, canAfford } from '@/lib/game/utils/calculations';
import type { GameState, BuildingKey, ResourceCost } from '@/lib/game/types';

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
