// Action validation utilities

import type { GameState, ActionKey, ActionUnlockCondition } from '@/lib/game/types';
import { getAction } from '@/lib/game/config/actions';
import { getResource, getBuildingCount, getUpgradeLevel, getTechnologyLevel } from '@/lib/game/utils/gameState';
import { canAfford } from '@/lib/game/utils/calculations';

/**
 * Check if an action can be executed
 */
export function canExecuteAction(state: GameState, actionKey: ActionKey): boolean {
  const action = getAction(actionKey);
  if (!action) return false;

  // Check if action is unlocked
  if (!isActionUnlocked(state, actionKey)) {
    return false;
  }

  // Check if action is on cooldown
  if (isActionOnCooldown(state, actionKey)) {
    return false;
  }

  // Check if player can afford the cost
  if (action.cost && Object.keys(action.cost).length > 0) {
    if (!canAfford(state, action.cost)) {
      return false;
    }
  }

  return true;
}

/**
 * Check if an action is unlocked
 */
export function isActionUnlocked(state: GameState, actionKey: ActionKey): boolean {
  const action = getAction(actionKey);
  if (!action) return false;

  // If it's a one-time unlock action, check if it's been unlocked before
  if (action.oneTimeUnlock) {
    const unlock = state.actions?.unlocks?.[actionKey];
    if (unlock?.unlocked) {
      return true;
    }
  }

  // Check unlock conditions
  return checkUnlockConditions(state, action.unlockConditions);
}

/**
 * Check if an action is on cooldown
 */
export function isActionOnCooldown(state: GameState, actionKey: ActionKey): boolean {
  const cooldown = state.actions?.cooldowns?.[actionKey];
  if (!cooldown) return false;

  return state.t < cooldown;
}

/**
 * Check unlock conditions for an action - improved with discriminated union types
 */
export function checkUnlockConditions(
  state: GameState, 
  conditions: ActionUnlockCondition[]
): boolean {
  if (conditions.length === 0) return true;

  return conditions.every(condition => {
    switch (condition.type) {
      case 'technology':
        const techLevel = getTechnologyLevel(state, condition.key);
        return techLevel >= condition.value;

      case 'building':
        const buildingCount = getBuildingCount(state, condition.key);
        return buildingCount >= condition.value;

      case 'resource':
        const resourceAmount = getResource(state, condition.key);
        return resourceAmount >= condition.value;

      case 'prestige':
        const prestigeLevel = getUpgradeLevel(state, condition.key);
        return prestigeLevel >= condition.value;

      default:
        return false;
    }
  });
}
