import { type ResourceKey, type BuildingKey, type PrestigeUpgradeKey } from './config';
import { getResource, setResource, getBuildingCount, setBuildingCount, getUpgradeLevel, setUpgradeLevel, addResources } from './gameState';
import { costFor, canAfford, getClickGains, getUpgradeCost, canBuyUpgrade, getPerSec } from './calculations';
import { checkAndTriggerEvents } from './eventSystem';
import type { GameState } from './types';



/**
 * Pay resources (subtract from state)
 */
export function pay(state: GameState, cost: Partial<Record<ResourceKey, number>>): void {
  for (const r in cost) {
    const rk = r as ResourceKey;
    const current = getResource(state, rk);
    setResource(state, rk, current - (cost[rk] || 0));
  }
}

/**
 * Buy a building
 */
export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  const cost = costFor(state, key);
  if (!canAfford(state, cost)) return state;
  
  pay(state, cost);
  const current = getBuildingCount(state, key);
  setBuildingCount(state, key, current + 1);
  
  return state;
}

/**
 * Buy an upgrade
 */
export function buyUpgrade(state: GameState, key: PrestigeUpgradeKey): GameState {
  if (!canBuyUpgrade(state, key)) return state;
  
  const currentLevel = getUpgradeLevel(state, key);
  const cost = getUpgradeCost(key, currentLevel);
  
  const currentPrestige = getResource(state, 'prestige');
  setResource(state, 'prestige', currentPrestige - cost);
  setUpgradeLevel(state, key, currentLevel + 1);
  
  return state;
}

/**
 * Perform click action
 */
export function clickAction(state: GameState): GameState {
  const gains = getClickGains(state);
  addResources(state, gains);
  state.clicks++;
  return state;
}

/**
 * Process game tick (time-based updates)
 */
export function tick(state: GameState, dtSeconds: number): GameState {
  const perSec = getPerSec(state);
  
  for (const r in perSec) {
    const rk = r as ResourceKey;
    const delta = (perSec[rk] || 0) * dtSeconds;
    
    if (delta < 0) {
      // Resource consumption - don't go below 0
      const have = getResource(state, rk);
      const allowed = Math.max(-have, delta);
      setResource(state, rk, have + allowed);
    } else {
      // Resource production
      const current = getResource(state, rk);
      setResource(state, rk, current + delta);
    }
  }
  
  // Update lifetime food
  const foodDelta = Math.max(0, (perSec.food || 0) * dtSeconds);
  state.lifetime.food += foodDelta;
  
  // Check for events
  checkAndTriggerEvents(state);
  
  return state;
}
