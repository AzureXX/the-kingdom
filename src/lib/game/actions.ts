import type { ResourceKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey, ActionKey, ResourceCost } from './types';
import type { GameState } from './types';

import { 
  getResource, 
  getBuildingCount, 
  getUpgradeLevel, 
  addResources, 
  updateBuildingCount,
  updateUpgradeLevel,
  updateResource
} from './gameState';
import { payResources, calculateTimeBasedChanges, applyResourceChanges } from './utils/resourceUpdates';
import { checkAchievements } from './achievementSystem';
import { costFor, canAfford, getUpgradeCost, canBuyUpgrade, getPerSec } from './calculations';
import { checkAndTriggerEvents } from './eventSystem';
import { startResearch, checkResearchProgress } from './technologySystem';
import { createStateErrorHandler } from './utils/errorLogger';
import { getAction } from './config/actions';
import { ActionValidator } from './utils/actionValidation';

const stateErrorHandler = createStateErrorHandler('actions');

/**
 * Pay resources (subtract from state) - Uses unified utility
 */
export function pay(state: GameState, cost: ResourceCost): GameState {
  try {
    return payResources(state, cost);
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
    const stateWithBuilding = updateBuildingCount(newState, key, current + 1);
    
    // Check achievements after building purchase
    return checkAchievements(stateWithBuilding);
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
    
    // Calculate resource changes using unified utility
    const resourceChanges = calculateTimeBasedChanges(state, perSec, dtSeconds);
    
    // Early return if no changes occurred
    if (Object.keys(resourceChanges).length === 0) {
      // Still need to check events, research progress, and achievements
      let newState = checkAndTriggerEvents(state);
      newState = checkResearchProgress(newState);
      newState = checkAchievements(newState);
      
      return newState;
    }
    
    // Apply resource updates using unified utility
    let newState = applyResourceChanges(state, resourceChanges);
    
    // Track lifetime resources for statistics and prestige calculations
    const lifetimeUpdates: Partial<Record<ResourceKey, number>> = {};
    let hasLifetimeChanges = false;
    
    for (const r in perSec) {
      const rk = r as ResourceKey;
      const delta = Math.max(0, (perSec[rk] || 0) * dtSeconds);
      if (delta > 0) {
        const currentLifetime = state.lifetime[rk] || 0;
        const newLifetime = currentLifetime + delta;
        lifetimeUpdates[rk] = newLifetime;
        hasLifetimeChanges = true;
      }
    }
    
    if (hasLifetimeChanges) {
      newState = {
        ...newState,
        lifetime: { ...newState.lifetime, ...lifetimeUpdates }
      };
    }
    
    // Always check for events and research progress, even if no resource changes
    // This ensures events trigger even when buildings aren't producing resources
    newState = checkAndTriggerEvents(newState);
    
    // Check research progress and update state
    newState = checkResearchProgress(newState);
    
    // Check achievements and update state
    newState = checkAchievements(newState);
    
    return newState;
  } catch (error) {
    stateErrorHandler('Failed to process game tick', { dtSeconds, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
