import { type ResourceKey, type BuildingKey, type PrestigeUpgradeKey, type TechnologyKey } from './config';
import { 
  getResource, 
  getBuildingCount, 
  getUpgradeLevel, 
  addResources, 
  updateMultipleResources,
  updateBuildingCount,
  updateUpgradeLevel,
  updateResource
} from './gameState';
import { costFor, canAfford, getClickGains, getUpgradeCost, canBuyUpgrade, getPerSec } from './calculations';
import { checkAndTriggerEvents } from './eventSystem';
import { startResearch, checkResearchProgress } from './technologySystem';
import type { GameState } from './types';

/**
 * Pay resources (subtract from state) - Optimized pure function
 */
export function pay(state: GameState, cost: Partial<Record<ResourceKey, number>>): GameState {
  if (Object.keys(cost).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  
  for (const r in cost) {
    const rk = r as ResourceKey;
    const current = getResource(state, rk);
    const newValue = current - (cost[rk] || 0);
    
    if (newValue !== current) {
      resourceUpdates[rk] = newValue;
      hasChanges = true;
    }
  }
  
  if (!hasChanges) return state;
  return updateMultipleResources(state, resourceUpdates);
}

/**
 * Buy a building - Optimized pure function
 */
export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  const cost = costFor(state, key);
  if (!canAfford(state, cost)) return state;
  
  const newState = pay(state, cost);
  const current = getBuildingCount(newState, key);
  return updateBuildingCount(newState, key, current + 1);
}

/**
 * Buy an upgrade - Optimized pure function
 */
export function buyUpgrade(state: GameState, key: PrestigeUpgradeKey): GameState {
  if (!canBuyUpgrade(state, key)) return state;
  
  const currentLevel = getUpgradeLevel(state, key);
  const cost = getUpgradeCost(key, currentLevel);
  
  const currentPrestige = getResource(state, 'prestige');
  const newPrestige = currentPrestige - cost;
  
  // Only update if prestige actually changed
  if (newPrestige === currentPrestige) return state;
  
  const newState = updateResource(state, 'prestige', newPrestige);
  return updateUpgradeLevel(newState, key, currentLevel + 1);
}

/**
 * Perform click action - Optimized pure function
 */
export function clickAction(state: GameState): GameState {
  const gains = getClickGains(state);
  const newState = addResources(state, gains);
  

  
  // Only update clicks if it actually changed
  if (newState.clicks === state.clicks) return newState;
  
  return { ...newState, clicks: newState.clicks + 1 };
}

/**
 * Start researching a technology - Pure function
 */
export function researchTechnology(state: GameState, key: TechnologyKey): GameState {
  return startResearch(state, key);
}

/**
 * Process game tick (time-based updates) - Optimized pure function
 */
export function tick(state: GameState, dtSeconds: number): GameState {
  // Early return if no time has passed
  if (dtSeconds <= 0) return state;
  
  const perSec = getPerSec(state);
  
  // Calculate all resource changes first
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasResourceChanges = false;
  
  for (const r in perSec) {
    const rk = r as ResourceKey;
    const delta = (perSec[rk] || 0) * dtSeconds;
    if (delta === 0) continue;
    
    const currentValue = state.resources[rk] || 0;
    let newValue: number;
    
    if (delta < 0) {
      // Resource consumption - don't go below 0
      newValue = Math.max(0, currentValue + delta);
    } else {
      // Resource production
      newValue = currentValue + delta;
    }
    
    if (newValue !== currentValue) {
      resourceUpdates[rk] = newValue;
      hasResourceChanges = true;
    }
    
  }
  
  // Early return if no changes occurred
  if (!hasResourceChanges) {
    // Still need to check events and research progress
    let newState = checkAndTriggerEvents(state);
    newState = checkResearchProgress(newState);
    
    return newState;
  }
  
  // Apply resource updates
  let newState = hasResourceChanges ? updateMultipleResources(state, resourceUpdates) : state;
  
  // Calculate lifetime food change
  const foodDelta = Math.max(0, (perSec.food || 0) * dtSeconds);
  const hasLifetimeChange = foodDelta > 0;
  if (hasLifetimeChange) {
    // Only create new lifetime object if food actually changed
    const currentLifetimeFood = state.lifetime.food;
    const newLifetimeFood = currentLifetimeFood + foodDelta;
    
    if (newLifetimeFood !== currentLifetimeFood) {
      newState = {
        ...newState,
        lifetime: { ...newState.lifetime, food: newLifetimeFood }
      };
    }
  }
  
  // Always check for events and research progress, even if no resource changes
  // This ensures events trigger even when buildings aren't producing resources
  newState = checkAndTriggerEvents(newState);
  
  // Check research progress and update state
  newState = checkResearchProgress(newState);
  
  return newState;
}
