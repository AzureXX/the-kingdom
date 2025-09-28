// Upgrade management logic

import type { PrestigeUpgradeKey } from '@/lib/game/types';
import type { GameState } from '@/lib/game/types';

/**
 * Update upgrade level with structural sharing - Pure function
 */
export function updateUpgradeLevel(state: GameState, upgradeKey: PrestigeUpgradeKey, level: number): GameState {
  const currentLevel = state.upgrades[upgradeKey] || 0;
  if (currentLevel === level) return state;
  
  return {
    ...state,
    upgrades: {
      ...state.upgrades,
      [upgradeKey]: Math.max(0, level)
    }
  };
}

/**
 * Get upgrade level safely, returning 0 if not found
 */
export function getUpgradeLevel(state: GameState, upgradeKey: PrestigeUpgradeKey): number {
  return state.upgrades[upgradeKey] || 0;
}

/**
 * Set upgrade level - Pure function
 */
export function setUpgradeLevel(state: GameState, upgradeKey: PrestigeUpgradeKey, level: number): GameState {
  const currentLevel = state.upgrades[upgradeKey] || 0;
  const newLevel = Math.max(0, level);
  if (currentLevel === newLevel) return state;
  
  return {
    ...state,
    upgrades: {
      ...state.upgrades,
      [upgradeKey]: newLevel
    }
  };
}
