import { useCallback, useMemo } from 'react';
import { buyBuilding, buyUpgrade, clickAction, researchTechnology } from '../actions';
import { doPrestige } from '../prestigeSystem';
import type { GameState } from '../types';
import type { BuildingKey, PrestigeUpgradeKey, TechnologyKey } from '../config';

export function useGameActions(
  state: GameState | null,
  setState: React.Dispatch<React.SetStateAction<GameState | null>>
) {
  // Optimized action handlers using functional state updates
  const handleClick = useCallback(() => {
    setState(currentState => {
      if (!currentState) return currentState;
      return clickAction(currentState);
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

  // Group action handlers together for cleaner consumption
  const actionHandlers = useMemo(() => ({
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
  }), [handleClick, handleBuyBuilding, handleBuyUpgrade, handleResearchTechnology, handleDoPrestige]);

  return {
    actionHandlers, // Grouped action handlers
    // Individual handlers still available for backward compatibility
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
  };
}
