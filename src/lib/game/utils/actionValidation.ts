// Action validation utilities

import type { GameState, ActionKey, ActionStatus, ResourceKey, BuildingKey, TechnologyKey } from '../types';
import { getAction, getAllActions } from '../config/actions';
import { getResource, getBuildingCount, getUpgradeLevel } from '../gameState';
import { canAfford } from '../calculations';

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
 * Check unlock conditions for an action
 */
export function checkUnlockConditions(
  state: GameState, 
  conditions: Array<{ type: string; key: string; value: number }>
): boolean {
  if (conditions.length === 0) return true;

  return conditions.every(condition => {
    switch (condition.type) {
      case 'technology':
        const techLevel = getUpgradeLevel(state, condition.key as TechnologyKey);
        return techLevel >= condition.value;

      case 'building':
        const buildingCount = getBuildingCount(state, condition.key as BuildingKey);
        return buildingCount >= condition.value;

      case 'resource':
        const resourceAmount = getResource(state, condition.key as ResourceKey);
        return resourceAmount >= condition.value;

      case 'prestige':
        const prestigeLevel = getUpgradeLevel(state, condition.key as any); // Prestige upgrade
        return prestigeLevel >= condition.value;

      default:
        return false;
    }
  });
}

/**
 * Get action status including availability and costs
 */
export function getActionStatus(state: GameState, actionKey: ActionKey): ActionStatus {
  const action = getAction(actionKey);
  if (!action) {
    return {
      canExecute: false,
      reason: 'Action not found',
      cost: {},
      gains: {},
      isUnlocked: false,
    };
  }

  const isUnlocked = isActionUnlocked(state, actionKey);
  const isOnCooldown = isActionOnCooldown(state, actionKey);
  const canAffordCost = !action.cost || Object.keys(action.cost).length === 0 || canAfford(state, action.cost);

  let canExecute = isUnlocked && !isOnCooldown && canAffordCost;
  let reason: string | undefined;

  if (!isUnlocked) {
    reason = 'Action not unlocked';
  } else if (isOnCooldown) {
    reason = 'Action on cooldown';
  } else if (!canAffordCost) {
    reason = 'Cannot afford cost';
  }

  const cooldownRemaining = isOnCooldown 
    ? (state.actions?.cooldowns?.[actionKey] || 0) - state.t
    : undefined;

  return {
    canExecute,
    reason,
    cost: action.cost || {},
    gains: action.gains,
    cooldownRemaining,
    isUnlocked,
  };
}

/**
 * Get all available actions for the current game state
 */
export function getAvailableActions(state: GameState): ActionKey[] {
  const allActions = getAllActions();
  return Object.keys(allActions).filter(actionKey => canExecuteAction(state, actionKey as ActionKey)) as ActionKey[];
}

/**
 * Get actions that are unlocked but cannot be executed (e.g., due to cost or cooldown)
 */
export function getUnlockedButUnavailableActions(state: GameState): ActionKey[] {
  const allActions = getAllActions();
  return Object.keys(allActions).filter(actionKey => 
    isActionUnlocked(state, actionKey as ActionKey) && !canExecuteAction(state, actionKey as ActionKey)
  ) as ActionKey[];
}
