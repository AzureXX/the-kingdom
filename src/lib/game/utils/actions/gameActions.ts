/**
 * Game action system
 * Handles the main action execution system and related functionality
 */

import type { ActionKey, GameState } from '@/lib/game/types';

import { addResources } from '@/lib/game/utils/gameState';
import { getAction } from '@/lib/game/config/actions';
import { ActionChecker } from '@/lib/game/utils/actionChecker';
import { createStateErrorHandler } from '@/lib/game/utils/error';
import { pay } from './resourceActions';

const stateErrorHandler = createStateErrorHandler('gameActions');

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
    if (!ActionChecker.canExecuteAction(state, actionKey)) {
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
