import { useCallback } from 'react';

import { buyBuilding, buyUpgrade, executeAction, researchTechnology } from '@/lib/game/utils/actions';
import { doPrestige } from '@/lib/game/utils/prestige';

import type { GameState } from '@/lib/game/types';
import type { BuildingKey, PrestigeUpgradeKey, TechnologyKey, ActionKey } from '@/lib/game/types';

export function useGameActions(
  state: GameState | null,
  setState: React.Dispatch<React.SetStateAction<GameState | null>>
): {
  // Action handlers - flattened for easier access
  handleExecuteAction: (actionKey: ActionKey) => void;
  handleBuyBuilding: (key: BuildingKey) => void;
  handleBuyUpgrade: (key: PrestigeUpgradeKey) => void;
  handleResearchTechnology: (key: TechnologyKey) => void;
  handleDoPrestige: () => void;
  handleTogglePause: () => void;
} {
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

  // Return flattened structure for easier consumption
  return {
    handleExecuteAction,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    handleTogglePause,
  };
}
