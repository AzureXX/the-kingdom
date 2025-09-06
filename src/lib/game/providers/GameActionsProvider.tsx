"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useGameActions, useLoopActions } from '../hooks';
import type { GameActionHandlers } from '../types/context';
import { useGameStateContext } from './GameStateProvider';

const GameActionsContext = createContext<GameActionHandlers | undefined>(undefined);

interface GameActionsProviderProps {
  children: ReactNode;
}

export function GameActionsProvider({ children }: GameActionsProviderProps) {
  const { state, setState } = useGameStateContext();
  
  // Action handlers
  const { actionHandlers } = useGameActions(state, setState);
  const { handleToggleLoopAction } = useLoopActions(state, setState);

  const contextValue: GameActionHandlers = {
    handleExecuteAction: actionHandlers.handleExecuteAction,
    handleBuyBuilding: actionHandlers.handleBuyBuilding,
    handleBuyUpgrade: actionHandlers.handleBuyUpgrade,
    handleResearchTechnology: actionHandlers.handleResearchTechnology,
    handleDoPrestige: actionHandlers.handleDoPrestige,
    handleToggleLoopAction,
    handleTogglePause: actionHandlers.handleTogglePause,
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
