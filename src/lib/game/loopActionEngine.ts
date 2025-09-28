import type { GameState } from '@/lib/game/types/game';
import type { LoopActionKey, LoopActionState, LoopActionProgress } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { pay } from '@/lib/game/actions';
import { addResources } from '@/lib/game/gameState';
import { canAfford } from '@/lib/game/calculations';
import { logMessage } from '@/lib/game/utils/errorLogger';
import { ActionValidator } from '@/lib/game/utils/actionValidation';

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

export function processLoopActionTick(state: GameState): GameState {
  let newState = { ...state };
  
  // Process each action and collect completed loops
  const updatedActions = newState.loopActions.map(action => {
    if (!action.isActive || action.isPaused) return action;
    
    // 100 points per tick, not per second
    const pointsPerTick = newState.loopSettings.basePointsPerTick;
    const newPoints = action.currentPoints + pointsPerTick;
    const pointsRequired = LOOP_ACTIONS[action.actionKey].loopPointsRequired;
    
    // Check if loop is complete
    if (newPoints >= pointsRequired) {
      const actionDef = LOOP_ACTIONS[action.actionKey];
      
      newState = addResources(newState, actionDef.gains);
      
      if (actionDef.cost && Object.keys(actionDef.cost).length > 0) {
        if (!canAfford(newState, actionDef.cost)) {
          logMessage(`Loop action ${actionDef.name} paused after completing loop - insufficient resources for next loop`, {
            level: 'warn',
            context: 'loopAction',
            details: { actionKey: action.actionKey, cost: actionDef.cost }
          });
          
          return {
            ...action,
            currentPoints: 0,
            totalLoopsCompleted: action.totalLoopsCompleted + 1,
            isActive: false,
            isPaused: true,
            lastTickAt: newState.t,
          };
        }
        
        newState = pay(newState, actionDef.cost);
      }
      
      return {
        ...action,
        currentPoints: 0,
        totalLoopsCompleted: action.totalLoopsCompleted + 1,
        lastTickAt: newState.t,
      };
    }
    
    // Update progress
    return {
      ...action,
      currentPoints: newPoints,
      lastTickAt: newState.t,
    };
  });
  
  // Update the state with the new actions
  newState.loopActions = updatedActions;
  
  return newState;
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

export function canStartLoopAction(state: GameState, actionKey: LoopActionKey): boolean {
  const actionDef = LOOP_ACTIONS[actionKey];
  if (!actionDef) return false;
  
  // Check unlock conditions
  if (!ActionValidator.checkUnlockConditions(state, actionDef.unlockConditions)) {
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

export function getLoopActionProgress(action: LoopActionState): LoopActionProgress {
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const pointsRequired = actionDef.loopPointsRequired;
  const progressPercentage = (action.currentPoints / pointsRequired) * 100;
  
  // Calculate time remaining (rough estimate)
  const pointsPerSecond = GAME_CONSTANTS.PERFORMANCE.POINTS_PER_SECOND;
  const pointsRemaining = pointsRequired - action.currentPoints;
  const timeRemaining = pointsRemaining / pointsPerSecond;
  
  return {
    actionKey: action.actionKey,
    currentPoints: action.currentPoints,
    pointsRequired,
    progressPercentage,
    timeRemaining,
    loopsCompleted: action.totalLoopsCompleted,
  };
}
