// Loop action validation logic

import type { GameState } from '@/lib/game/types/game';
import type { LoopActionKey } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { canAfford } from '@/lib/game/utils/calculations';
import { ActionChecker } from '@/lib/game/utils/actionChecker';

export function canStartLoopAction(state: GameState, actionKey: LoopActionKey): boolean {
  const actionDef = LOOP_ACTIONS[actionKey];
  if (!actionDef) return false;
  
  // Check unlock conditions
  if (!ActionChecker.checkUnlockConditions(state, actionDef.unlockConditions)) {
    return false;
  }
  
  // Check if already active - only prevent starting if it's currently active
  if (state.loopActions.some(la => la.actionKey === actionKey && la.isActive)) {
    return false;
  }
  
  // Check if we can afford the cost (only for new actions, not resuming paused ones)
  const existingAction = state.loopActions.find(la => la.actionKey === actionKey);
  if (!existingAction) {
    // This is a new action, check if we can afford the cost
    if (actionDef.cost && Object.keys(actionDef.cost).length > 0) {
      if (!canAfford(state, actionDef.cost)) {
        return false;
      }
    }
  } else {
    // This is an existing action (paused), allow resuming without cost check
    return true;
  }
  
  return true;
}

export function canHaveMoreLoopActions(state: GameState): boolean {
  const activeCount = state.loopActions.filter(la => la.isActive).length;
  return activeCount < state.loopSettings.maxConcurrentActions;
}
