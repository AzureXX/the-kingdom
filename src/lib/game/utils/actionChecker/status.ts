// Action status utilities

import type { GameState, ActionKey, ActionStatus } from '@/lib/game/types';
import { getAction } from '@/lib/game/config/actions';
import { canAfford } from '@/lib/game/utils/calculations';
import { isActionUnlocked, isActionOnCooldown } from '@/lib/game/utils/actionChecker/validation';

/**
 * Get action status including availability and costs - simplified using consolidated validation
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

  // Use consolidated validation methods for cleaner logic
  const unlocked = isActionUnlocked(state, actionKey);
  const onCooldown = isActionOnCooldown(state, actionKey);
  const canAffordCost = !action.cost || Object.keys(action.cost).length === 0 || canAfford(state, action.cost);

  const canExecute = unlocked && !onCooldown && canAffordCost;
  let reason: string | undefined;

  if (!unlocked) {
    reason = 'Action not unlocked';
  } else if (onCooldown) {
    reason = 'Action on cooldown';
  } else if (!canAffordCost) {
    reason = 'Cannot afford cost';
  }

  const cooldownRemaining = onCooldown 
    ? (state.actions?.cooldowns?.[actionKey] || 0) - state.t
    : undefined;

  return {
    canExecute,
    reason,
    cost: action.cost || {},
    gains: action.gains,
    cooldownRemaining,
    isUnlocked: unlocked,
  };
}
