// Loop action management logic (start, stop, pause, resume)

import type { GameState } from '@/lib/game/types/game';
import type { LoopActionKey, LoopActionState } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { pay } from '@/lib/game/utils/actions';
import { canAfford } from '@/lib/game/utils/calculations';
import { logMessage } from '@/lib/game/utils/error';
import { canStartLoopAction } from '@/lib/game/utils/loopActions/validation';

export function startLoopAction(state: GameState, actionKey: LoopActionKey): GameState {
  if (!canStartLoopAction(state, actionKey)) {
    return state;
  }
  
  // Check if we're at max concurrent actions
  if (state.loopActions.filter(la => la.isActive).length >= state.loopSettings.maxConcurrentActions) {
    // Pause oldest action
    const oldestAction = getOldestLoopAction(state);
    if (oldestAction) {
      state = pauseLoopAction(state, oldestAction.actionKey);
    }
  }
  
  // Start new loop action
  return addLoopAction(state, actionKey);
}

export function stopLoopAction(state: GameState, actionKey: LoopActionKey): GameState {
  const actionIndex = state.loopActions.findIndex(la => la.actionKey === actionKey);
  if (actionIndex === -1) return state;
  
  const updatedLoopActions = [...state.loopActions];
  updatedLoopActions[actionIndex] = {
    ...updatedLoopActions[actionIndex],
    isActive: false,
    isPaused: false,
    currentPoints: 0, // Reset points when stopping
  };
  
  return {
    ...state,
    loopActions: updatedLoopActions,
  };
}

export function pauseLoopAction(state: GameState, actionKey: LoopActionKey): GameState {
  const actionIndex = state.loopActions.findIndex(la => la.actionKey === actionKey);
  if (actionIndex === -1) return state;
  
  const updatedLoopActions = [...state.loopActions];
  updatedLoopActions[actionIndex] = {
    ...updatedLoopActions[actionIndex],
    isActive: false,
    isPaused: true,
  };
  
  return {
    ...state,
    loopActions: updatedLoopActions,
  };
}

export function resumeLoopAction(state: GameState, actionKey: LoopActionKey): GameState {
  const actionIndex = state.loopActions.findIndex(la => la.actionKey === actionKey);
  if (actionIndex === -1) return state;
  
  const action = state.loopActions[actionIndex];
  const actionDef = LOOP_ACTIONS[actionKey];
  
  let newState = state;
  
  // Only charge cost if there's no progress (meaning no cost was paid for current loop)
  if (actionDef.cost && Object.keys(actionDef.cost).length > 0 && action.currentPoints === 0) {
    if (!canAfford(state, actionDef.cost)) {
      logMessage(`Cannot resume loop action ${actionDef.name} - insufficient resources for next loop`, {
        level: 'warn',
        context: 'loopAction',
        details: { actionKey, cost: actionDef.cost }
      });
      return state;
    }
    
    newState = pay(state, actionDef.cost);
  }
  
  const updatedLoopActions = [...state.loopActions];
  updatedLoopActions[actionIndex] = {
    ...updatedLoopActions[actionIndex],
    isPaused: false,
  };
  
  return {
    ...newState,
    loopActions: updatedLoopActions,
  };
}

function addLoopAction(state: GameState, actionKey: LoopActionKey): GameState {
  const actionDef = LOOP_ACTIONS[actionKey];
  let newState = state;
  
  // Check if action already exists (from previous start/pause)
  const existingIndex = state.loopActions.findIndex((la: LoopActionState) => la.actionKey === actionKey);
  
  if (existingIndex !== -1) {
    // Update existing action - resume from paused state
    const existingAction = state.loopActions[existingIndex];
    
    // Only charge cost if there's no progress (meaning no cost was paid for current loop)
    if (actionDef.cost && Object.keys(actionDef.cost).length > 0 && existingAction.currentPoints === 0) {
      if (!canAfford(state, actionDef.cost)) {
        // Can't afford the cost - log and return unchanged state
        logMessage(`Cannot resume loop action ${actionDef.name} - insufficient resources for next loop`, {
          level: 'warn',
          context: 'loopAction',
          details: { actionKey, cost: actionDef.cost }
        });
        return state; // Return unchanged state
      }
      
      newState = pay(state, actionDef.cost);
    }
    
    const updatedLoopActions = [...newState.loopActions];
    updatedLoopActions[existingIndex] = {
      ...updatedLoopActions[existingIndex],
      isActive: true,
      // Keep current progress when resuming
      currentPoints: existingAction.currentPoints,
      startedAt: state.t,
      lastTickAt: state.t,
      isPaused: false,
    };
    
    return {
      ...newState,
      loopActions: updatedLoopActions,
    };
  } else {
    // Create new loop action - always charge cost for first loop
    if (actionDef.cost && Object.keys(actionDef.cost).length > 0) {
      if (!canAfford(state, actionDef.cost)) {
        // Can't afford the cost - log and return unchanged state
        logMessage(`Cannot start loop action ${actionDef.name} - insufficient resources for first loop`, {
          level: 'warn',
          context: 'loopAction',
          details: { actionKey, cost: actionDef.cost }
        });
        return state; // Return unchanged state
      }
      
      newState = pay(state, actionDef.cost);
    }
    
    // Create new loop action state
    const newLoopAction: LoopActionState = {
      actionKey,
      isActive: true,
      currentPoints: 0,
      totalLoopsCompleted: 0,
      startedAt: state.t,
      lastTickAt: state.t,
      isPaused: false,
    };
    
    return {
      ...newState,
      loopActions: [...newState.loopActions, newLoopAction],
    };
  }
}

function getOldestLoopAction(state: GameState): LoopActionState | null {
  const activeActions = state.loopActions.filter(la => la.isActive);
  if (activeActions.length === 0) return null;
  
  return activeActions.reduce((oldest, current) => 
    current.startedAt < oldest.startedAt ? current : oldest
  );
}
