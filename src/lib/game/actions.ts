import type { ResourceKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey, ActionKey } from './types';
import type { GameState } from './types';

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
import { costFor, canAfford, getUpgradeCost, canBuyUpgrade, getPerSec } from './calculations';
import { checkAndTriggerEvents } from './eventSystem';
import { startResearch, checkResearchProgress } from './technologySystem';
import { createStateErrorHandler } from './utils/errorLogger';
import { getAction } from './config/actions';
import { ActionValidator } from './utils/actionValidation';

const stateErrorHandler = createStateErrorHandler('actions');

/**
 * Pay resources (subtract from state) - Optimized pure function with error handling
 */
export function pay(state: GameState, cost: Partial<Record<ResourceKey, number>>): GameState {
  try {
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
  } catch (error) {
    stateErrorHandler('Failed to pay resources', { cost, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Buy a building - Optimized pure function with error handling
 */
export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  try {
    const cost = costFor(state, key);
    if (!canAfford(state, cost)) return state;
    
    const newState = pay(state, cost);
    const current = getBuildingCount(newState, key);
    return updateBuildingCount(newState, key, current + 1);
  } catch (error) {
    stateErrorHandler('Failed to buy building', { buildingKey: key, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Buy an upgrade - Optimized pure function with error handling
 */
export function buyUpgrade(state: GameState, key: PrestigeUpgradeKey): GameState {
  try {
    if (!canBuyUpgrade(state, key)) return state;
    
    const currentLevel = getUpgradeLevel(state, key);
    const cost = getUpgradeCost(key, currentLevel);
    
    const currentPrestige = getResource(state, 'prestige');
    const newPrestige = currentPrestige - cost;
    
    // Only update if prestige actually changed
    if (newPrestige === currentPrestige) return state;
    
    const newState = updateResource(state, 'prestige', newPrestige);
    return updateUpgradeLevel(newState, key, currentLevel + 1);
  } catch (error) {
    stateErrorHandler('Failed to buy upgrade', { upgradeKey: key, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}



/**
 * Execute a game action - Main function for the new action system
 */
export function executeAction(state: GameState, actionKey: ActionKey): GameState {
  try {
    const action = getAction(actionKey);
    if (!action) {
      stateErrorHandler('Action not found', { actionKey });
      return state;
    }

    // Check if action can be executed
    if (!ActionValidator.canExecuteAction(state, actionKey)) {
      return state;
    }

    // Pay the cost if any
    let newState = action.cost && Object.keys(action.cost).length > 0 
      ? pay(state, action.cost) 
      : state;

    // Add the gains
    newState = addResources(newState, action.gains);

    // Update action unlock tracking if it's a one-time unlock
    if (action.oneTimeUnlock) {
      newState = updateActionUnlock(newState, actionKey);
    }

    // Update action cooldown if applicable
    if (action.cooldown) {
      newState = updateActionCooldown(newState, actionKey, action.cooldown);
    }

    // Update click counter for legacy compatibility
    if (newState.clicks === state.clicks) {
      newState = { ...newState, clicks: newState.clicks + 1 };
    }

    return newState;
  } catch (error) {
    stateErrorHandler('Failed to execute action', { actionKey, error: error instanceof Error ? error.message : String(error) });
    return state;
  }
}

/**
 * Update action unlock status for one-time unlock actions
 */
function updateActionUnlock(state: GameState, actionKey: ActionKey): GameState {
  const currentUnlocks = state.actions?.unlocks || {};
  const currentUnlock = currentUnlocks[actionKey];
  
  if (currentUnlock?.unlocked) {
    return state; // Already unlocked
  }

  const newUnlock = {
    unlocked: true,
    unlockedAt: state.t,
    lastUsed: state.t,
  };

  const newUnlocks = {
    ...currentUnlocks,
    [actionKey]: newUnlock,
  };

  return {
    ...state,
    actions: {
      ...state.actions,
      unlocks: newUnlocks,
    },
  };
}

/**
 * Update action cooldown timer
 */
function updateActionCooldown(state: GameState, actionKey: ActionKey, cooldown: number): GameState {
  const currentCooldowns = state.actions?.cooldowns || {};
  const newCooldown = state.t + cooldown;

  const newCooldowns = {
    ...currentCooldowns,
    [actionKey]: newCooldown,
  };

  return {
    ...state,
    actions: {
      ...state.actions,
      cooldowns: newCooldowns,
    },
  };
}

/**
 * Start researching a technology - Pure function with error handling
 */
export function researchTechnology(state: GameState, key: TechnologyKey): GameState {
  try {
    return startResearch(state, key);
  } catch (error) {
    stateErrorHandler('Failed to start technology research', { technologyKey: key, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Process game tick (time-based updates) - Optimized pure function with error handling
 */
export function tick(state: GameState, dtSeconds: number): GameState {
  try {
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
  } catch (error) {
    stateErrorHandler('Failed to process game tick', { dtSeconds, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
