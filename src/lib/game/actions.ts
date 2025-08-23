import { type ResourceKey, type BuildingKey, type PrestigeUpgradeKey, type TechnologyKey } from './config';
import { getResource, setResource, getBuildingCount, setBuildingCount, getUpgradeLevel, setUpgradeLevel, addResources } from './gameState';
import { costFor, canAfford, getClickGains, getUpgradeCost, canBuyUpgrade, getPerSec } from './calculations';
import { checkAndTriggerEvents } from './eventSystem';
import { startResearch, checkResearchProgress } from './technologySystem';
import type { GameState } from './types';


/**
 * Pay resources (subtract from state) - Pure function
 */
export function pay(state: GameState, cost: Partial<Record<ResourceKey, number>>): GameState {
  let newState = { ...state };
  for (const r in cost) {
    const rk = r as ResourceKey;
    const current = getResource(newState, rk);
    newState = setResource(newState, rk, current - (cost[rk] || 0));
  }
  return newState;
}

/**
 * Buy a building - Pure function
 */
export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  const cost = costFor(state, key);
  if (!canAfford(state, cost)) return state;
  
  const newState = pay(state, cost);
  const current = getBuildingCount(newState, key);
  return setBuildingCount(newState, key, current + 1);
}

/**
 * Buy an upgrade - Pure function
 */
export function buyUpgrade(state: GameState, key: PrestigeUpgradeKey): GameState {
  if (!canBuyUpgrade(state, key)) return state;
  
  const currentLevel = getUpgradeLevel(state, key);
  const cost = getUpgradeCost(key, currentLevel);
  
  let newState = { ...state };
  const currentPrestige = getResource(newState, 'prestige');
  newState = setResource(newState, 'prestige', currentPrestige - cost);
  return setUpgradeLevel(newState, key, currentLevel + 1);
}

/**
 * Perform click action - Pure function
 */
export function clickAction(state: GameState): GameState {
  const gains = getClickGains(state);
  const newState = addResources(state, gains);
  return { ...newState, clicks: newState.clicks + 1 };
}

/**
 * Start researching a technology - Pure function
 */
export function researchTechnology(state: GameState, key: TechnologyKey): GameState {
  return startResearch(state, key);
}

/**
 * Process game tick (time-based updates) - Pure function
 */
export function tick(state: GameState, dtSeconds: number): GameState {
  const newState = { ...state };
  const perSec = getPerSec(newState);
  
  let currentState = newState;
  for (const r in perSec) {
    const rk = r as ResourceKey;
    const delta = (perSec[rk] || 0) * dtSeconds;
    
    if (delta < 0) {
      // Resource consumption - don't go below 0
      const have = getResource(currentState, rk);
      const allowed = Math.max(-have, delta);
      currentState = setResource(currentState, rk, have + allowed);
    } else {
      // Resource production
      const current = getResource(currentState, rk);
      currentState = setResource(currentState, rk, current + delta);
    }
  }
  
  // Update lifetime food
  const foodDelta = Math.max(0, (perSec.food || 0) * dtSeconds);
  currentState.lifetime = { ...currentState.lifetime, food: currentState.lifetime.food + foodDelta };
  
  // Check for events and update state
  currentState = checkAndTriggerEvents(currentState);
  
  // Check research progress and update state
  currentState = checkResearchProgress(currentState);
  
  return currentState;
}
