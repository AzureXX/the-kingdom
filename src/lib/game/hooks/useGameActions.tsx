import { useCallback, useMemo } from 'react';

import { buyBuilding, buyUpgrade, executeAction, researchTechnology } from '../actions';
import { doPrestige } from '../prestigeSystem';

import type { GameState } from '../types';
import type { BuildingKey, PrestigeUpgradeKey, TechnologyKey, ActionKey } from '../types';

export function useGameActions(
  state: GameState | null,
  setState: React.Dispatch<React.SetStateAction<GameState | null>>
) {
  // Optimized action handlers using functional state updates
  const handleExecuteAction = useCallback((actionKey: ActionKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return executeAction(currentState, actionKey);
    });
  }, [setState]);

  const handleBuyBuilding = useCallback((key: BuildingKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return buyBuilding(currentState, key);
    });
  }, [setState]);

  const handleBuyUpgrade = useCallback((key: PrestigeUpgradeKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return buyUpgrade(currentState, key);
    });
  }, [setState]);

  const handleResearchTechnology = useCallback((key: TechnologyKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return researchTechnology(currentState, key);
    });
  }, [setState]);

  const handleDoPrestige = useCallback(() => {
    setState(currentState => {
      if (!currentState) return currentState;
      return doPrestige(currentState);
    });
  }, [setState]);

  const handleTogglePause = useCallback(() => {
    setState(currentState => {
      if (!currentState) return currentState;
      return { ...currentState, isPaused: !currentState.isPaused };
    });
  }, [setState]);

  // Group action handlers together for cleaner consumption
  const actionHandlers = useMemo(() => ({
    handleExecuteAction,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    handleTogglePause,
  }), [handleExecuteAction, handleBuyBuilding, handleBuyUpgrade, handleResearchTechnology, handleDoPrestige, handleTogglePause]);

  return {
    actionHandlers,
  };
}
