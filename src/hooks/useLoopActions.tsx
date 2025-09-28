import { useCallback } from 'react';
import type { LoopActionKey } from '@/lib/game/types/loopActions';
import type { GameState } from '@/lib/game/types/game';
import { 
  startLoopAction, 
  pauseLoopAction, 
  canStartLoopAction,
  canHaveMoreLoopActions 
} from '@/lib/game/utils/loopActions';

export function useLoopActions(
  gameState: GameState | null,
  onStateUpdate: (newState: GameState) => void
) {
  const handleStartLoopAction = useCallback((actionKey: LoopActionKey) => {
    if (gameState && canStartLoopAction(gameState, actionKey)) {
      const newState = startLoopAction(gameState, actionKey);
      onStateUpdate(newState);
    }
  }, [gameState, onStateUpdate]);

  const handlePauseLoopAction = useCallback((actionKey: LoopActionKey) => {
    if (gameState) {
      const newState = pauseLoopAction(gameState, actionKey);
      onStateUpdate(newState);
    }
  }, [gameState, onStateUpdate]);

  const handleToggleLoopAction = useCallback((actionKey: LoopActionKey) => {
    if (!gameState) return;
    
    const existingAction = gameState.loopActions.find(la => la.actionKey === actionKey);
    
    if (existingAction && existingAction.isActive) {
      // Pause the action
      const newState = pauseLoopAction(gameState, actionKey);
      onStateUpdate(newState);
    } else {
      // Start/resume the action
      if (canStartLoopAction(gameState, actionKey)) {
        const newState = startLoopAction(gameState, actionKey);
        onStateUpdate(newState);
      }
    }
  }, [gameState, onStateUpdate]);

  const canStartAction = useCallback((actionKey: LoopActionKey) => {
    return gameState ? canStartLoopAction(gameState, actionKey) : false;
  }, [gameState]);

  const canStartMoreActions = useCallback(() => {
    return gameState ? canHaveMoreLoopActions(gameState) : false;
  }, [gameState]);

  return {
    handleStartLoopAction,
    handlePauseLoopAction,
    handleToggleLoopAction,
    canStartAction,
    canStartMoreActions,
  };
}
