"use client";

import React, { ReactNode } from 'react';

import { 
  GameStateProvider, 
  GameActionsProvider, 
  GameCalculationsProvider
} from './providers';

interface GameProviderProps {
  children: ReactNode;
}

/**
 * Main GameProvider that composes all game-related providers.
 * This is now much simpler - each provider handles its own concerns.
 */
export function GameProvider({ children }: GameProviderProps) {
  return (
    <GameStateProvider>
      <GameActionsProvider>
        <GameCalculationsProvider>
          {children}
        </GameCalculationsProvider>
      </GameActionsProvider>
    </GameStateProvider>
  );
}

// Import the hooks for the combined useGameContext
import { 
  useGameStateContext,
  useGameActionsContext,
  useGameCalculationsContext
} from './providers';

// Legacy compatibility - create a combined hook that returns all contexts
export function useGameContext() {
  const state = useGameStateContext();
  const actions = useGameActionsContext();
  const calculations = useGameCalculationsContext();

  return {
    ...state,
    ...actions,
    ...calculations,
  };
} 