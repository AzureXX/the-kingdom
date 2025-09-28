// Action query utilities

import type { GameState, ActionKey } from '@/lib/game/types';
import { getAllActions } from '@/lib/game/config/actions';
import { canExecuteAction, isActionUnlocked } from '@/lib/game/utils/actionChecker/validation';

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
