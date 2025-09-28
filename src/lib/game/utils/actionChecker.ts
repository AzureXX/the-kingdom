import type { GameState, ActionKey, ActionStatus, ActionUnlockCondition } from '@/lib/game/types';
import { getAction, getAllActions } from '@/lib/game/config/actions';
import { getResource, getBuildingCount, getUpgradeLevel, getTechnologyLevel } from '@/lib/game/gameState';
import { canAfford } from '@/lib/game/utils/calculations';

/**
 * Consolidated action validator class
 * Provides all action validation functionality in a single, organized interface
 */
export class ActionChecker {
  /**
   * Check if an action can be executed
   */
  static canExecuteAction(state: GameState, actionKey: ActionKey): boolean {
    const action = getAction(actionKey);
    if (!action) return false;

    // Check if action is unlocked
    if (!this.isActionUnlocked(state, actionKey)) {
      return false;
    }

    // Check if action is on cooldown
    if (this.isActionOnCooldown(state, actionKey)) {
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
  static isActionUnlocked(state: GameState, actionKey: ActionKey): boolean {
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
    return this.checkUnlockConditions(state, action.unlockConditions);
  }

  /**
   * Check if an action is on cooldown
   */
  static isActionOnCooldown(state: GameState, actionKey: ActionKey): boolean {
    const cooldown = state.actions?.cooldowns?.[actionKey];
    if (!cooldown) return false;

    return state.t < cooldown;
  }

  /**
   * Check unlock conditions for an action - improved with discriminated union types
   */
  static checkUnlockConditions(
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

  /**
   * Get action status including availability and costs - simplified using consolidated validation
   */
  static getActionStatus(state: GameState, actionKey: ActionKey): ActionStatus {
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

    // Use consolidated validation methods for cleaner logic
    const isUnlocked = this.isActionUnlocked(state, actionKey);
    const isOnCooldown = this.isActionOnCooldown(state, actionKey);
    const canAffordCost = !action.cost || Object.keys(action.cost).length === 0 || canAfford(state, action.cost);

    const canExecute = isUnlocked && !isOnCooldown && canAffordCost;
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
  static getAvailableActions(state: GameState): ActionKey[] {
    const allActions = getAllActions();
    return Object.keys(allActions).filter(actionKey => this.canExecuteAction(state, actionKey as ActionKey)) as ActionKey[];
  }

  /**
   * Get actions that are unlocked but cannot be executed (e.g., due to cost or cooldown)
   */
  static getUnlockedButUnavailableActions(state: GameState): ActionKey[] {
    const allActions = getAllActions();
    return Object.keys(allActions).filter(actionKey => 
      this.isActionUnlocked(state, actionKey as ActionKey) && !this.canExecuteAction(state, actionKey as ActionKey)
    ) as ActionKey[];
  }
}


