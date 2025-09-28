// Loop action processing logic

import type { GameState } from '@/lib/game/types/game';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { pay } from '@/lib/game/utils/actions';
import { addResources } from '@/lib/game/utils/gameState';
import { canAfford } from '@/lib/game/utils/calculations';
import { logMessage } from '@/lib/game/utils/error';

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
