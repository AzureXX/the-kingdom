"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useGameActions, useLoopActions } from '@/hooks';
import type { GameActionHandlers } from '@/lib/game/types/context';
import { useGameStateContext } from '@/lib/game/providers/GameStateProvider';

const GameActionsContext = createContext<GameActionHandlers | undefined>(undefined);

interface GameActionsProviderProps {
  children: ReactNode;
}

export function GameActionsProvider({ children }: GameActionsProviderProps) {
  const { state, setState } = useGameStateContext();
  
  // Action handlers - now flattened for direct access
  const gameActions = useGameActions(state, setState);
  const { handleToggleLoopAction } = useLoopActions(state, setState);

  const contextValue: GameActionHandlers = {
    handleExecuteAction: gameActions.handleExecuteAction,
    handleBuyBuilding: gameActions.handleBuyBuilding,
    handleBuyUpgrade: gameActions.handleBuyUpgrade,
    handleResearchTechnology: gameActions.handleResearchTechnology,
    handleDoPrestige: gameActions.handleDoPrestige,
    handleToggleLoopAction,
    handleTogglePause: gameActions.handleTogglePause,
  };

  return (
    <GameActionsContext.Provider value={contextValue}>
      {children}
    </GameActionsContext.Provider>
  );
}

export function useGameActionsContext(): GameActionHandlers {
  const context = useContext(GameActionsContext);
  if (context === undefined) {
    throw new Error('useGameActionsContext must be used within a GameActionsProvider');
  }
  return context;
}
