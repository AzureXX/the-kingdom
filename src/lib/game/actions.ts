import type { ResourceKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey, ActionKey, ResourceCost, GameState } from '@/lib/game/types';

import { 
  getResource, 
  getBuildingCount, 
  getUpgradeLevel, 
  addResources, 
  updateBuildingCount,
  updateUpgradeLevel,
  updateResource
} from './gameState';
import { payResources, calculateTimeBasedChanges, applyResourceChanges } from '@/lib/game/utils/resourceUpdates';
import { checkAchievements } from '@/lib/game/achievementSystem';
import { costFor, canAfford, getUpgradeCost, canBuyUpgrade, getPerSec } from '@/lib/game/calculations';
import { checkAndTriggerEvents } from '@/lib/game/eventSystem';
import { startResearch, checkResearchProgress } from '@/lib/game/technologySystem';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';
import { getAction } from '@/lib/game/config/actions';
import { ActionValidator } from '@/lib/game/utils/actionValidation';
import { GAME_CONSTANTS } from '@/lib/game/constants';

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
 * Update resources from production and track lifetime statistics
 * 
 * @param state - Current game state
 * @param dtSeconds - Time delta in seconds
 * @returns Updated game state with resource changes and lifetime tracking
 * 
 * @example
 * ```typescript
 * const updatedState = updateResourcesFromProduction(state, 0.05);
 * ```
 */
export function updateResourcesFromProduction(state: GameState, dtSeconds: number): GameState {
  try {
    // Early return if no time has passed
    if (dtSeconds <= 0) return state;
    
    const perSec = getPerSec(state);
    
    // Calculate resource changes using unified utility
    const resourceChanges = calculateTimeBasedChanges(state, perSec, dtSeconds);
    
    // Early return if no changes occurred
    if (Object.keys(resourceChanges).length === 0) {
      return state;
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
    
    return newState;
  } catch (error) {
    stateErrorHandler('Failed to update resources from production', { dtSeconds, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Check and process events with frame skipping optimization
 * 
 * @param state - Current game state
 * @param tickCounter - Current tick counter for frame skipping
 * @returns Updated game state with any triggered events
 * 
 * @example
 * ```typescript
 * const updatedState = checkAndProcessEvents(state, 15);
 * ```
 */
export function checkAndProcessEvents(state: GameState, tickCounter: number): GameState {
  try {
    // Check events with frame skipping (every 3 ticks)
    if (tickCounter % GAME_CONSTANTS.FRAME_SKIP.EVENTS === 0) {
      return checkAndTriggerEvents(state);
    }
    return state;
  } catch (error) {
    stateErrorHandler('Failed to check and process events', { tickCounter, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Check and process achievements with frame skipping optimization
 * 
 * @param state - Current game state
 * @param tickCounter - Current tick counter for frame skipping
 * @returns Updated game state with any triggered achievements
 * 
 * @example
 * ```typescript
 * const updatedState = checkAndProcessAchievements(state, 25);
 * ```
 */
export function checkAndProcessAchievements(state: GameState, tickCounter: number): GameState {
  try {
    // Check achievements with frame skipping (every 5 ticks)
    if (tickCounter % GAME_CONSTANTS.FRAME_SKIP.ACHIEVEMENTS === 0) {
      return checkAchievements(state);
    }
    return state;
  } catch (error) {
    stateErrorHandler('Failed to check and process achievements', { tickCounter, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Process game tick (time-based updates) - Optimized pure function with error handling and frame skipping
 */
export function tick(state: GameState, dtSeconds: number, tickCounter: number = 0): GameState {
  try {
    // Early return if no time has passed
    if (dtSeconds <= 0) return state;
    
    let newState = updateResourcesFromProduction(state, dtSeconds);
    
    newState = checkAndProcessEvents(newState, tickCounter);
    
    newState = checkResearchProgress(newState);
    
    newState = checkAndProcessAchievements(newState, tickCounter);
    
    return newState;
  } catch (error) {
    stateErrorHandler('Failed to process game tick', { dtSeconds, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}
