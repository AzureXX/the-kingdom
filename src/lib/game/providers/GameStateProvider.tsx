"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSaveSystem, useGameLoop, usePerformanceMonitor } from '../hooks';
import { validateConfiguration } from '../config';
import type { GameState } from '../types';
import type { PerformanceMetrics, PerformanceSuggestion } from '../types/context';

interface GameStateContextType {
  state: GameState | null;
  setState: React.Dispatch<React.SetStateAction<GameState | null>>;
  doExport: () => string;
  doImport: (str: string) => boolean;
  manualSave: () => void;
  lastSavedAt: number | null;
  performanceMetrics: PerformanceMetrics;
  performanceFunctions: {
    updateMetrics: (tickDuration: number) => void;
    resetRenderTimer: () => void;
    getCurrentMetrics: () => PerformanceMetrics;
    getPerformanceSuggestions: () => PerformanceSuggestion[];
  };
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

interface GameStateProviderProps {
  children: ReactNode;
}

export function GameStateProvider({ children }: GameStateProviderProps) {
  // Core state management
  const [state, setState] = useState<GameState | null>(null);

  // Validate configuration on startup
  React.useMemo(() => {
    validateConfiguration();
  }, []);

  // Save system integration
  const { lastSavedAt, saveFunctions } = useSaveSystem(state, setState);

  // Performance monitoring
  const { performanceMetrics, performanceFunctions } = usePerformanceMonitor();

  // Game loop integration
  useGameLoop(
    state,
    (newState) => setState(newState),
    (tickDuration) => performanceFunctions.updateMetrics(tickDuration)
  );

  const contextValue: GameStateContextType = {
    state,
    setState,
    doExport: saveFunctions.doExport,
    doImport: saveFunctions.doImport,
    manualSave: saveFunctions.manualSave,
    lastSavedAt,
    performanceMetrics,
    performanceFunctions,
  };

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameStateContext(): GameStateContextType {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameStateContext must be used within a GameStateProvider');
  }
  return context;
}
