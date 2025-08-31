"use client";

import React, { createContext, useContext, useMemo, useState, ReactNode, useRef } from 'react';

import { usePerformanceMonitor, useSaveSystem, useGameLoop, useGameTime, useGameActions, useGameCalculations, useLoopActions } from './hooks';
import { formatNumber as fmt } from './utils';

import type { GameState, Multipliers, ResourceKey, TechnologyKey, PrestigeUpgradeKey, ResourceCost } from './types';
import type { GameActionHandlers, GameUtilityFunctions, GameTimeInfo, PerformanceMetrics, PerformanceSuggestion } from './types/context';

export interface GameContextType extends 
  GameActionHandlers, 
  GameUtilityFunctions, 
  GameTimeInfo {
  state: GameState | null;
  setState: React.Dispatch<React.SetStateAction<GameState | null>>;
  perSec: Record<ResourceKey, number>;
  prestigePotential: number;
  multipliers: Multipliers | null;
  technologyCosts: Record<TechnologyKey, ResourceCost>;
  upgradeCosts: Record<PrestigeUpgradeKey, number>;
  performanceMetrics: PerformanceMetrics;
  performanceFunctions: {
    updateMetrics: (tickDuration: number) => void;
    resetRenderTimer: () => void;
    getCurrentMetrics: () => PerformanceMetrics;
    getPerformanceSuggestions: () => PerformanceSuggestion[];
  };
  doExport: () => string;
  doImport: (str: string) => boolean;
  manualSave: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  // Core state management
  const [state, setState] = useState<GameState | null>(null);

  // Custom hooks for different game systems
  const { performanceMetrics, performanceFunctions } = usePerformanceMonitor();
  const { lastSavedAt, saveFunctions } = useSaveSystem(state, setState);
  const { timeValues } = useGameTime(state, lastSavedAt);
  const { actionHandlers } = useGameActions(state, setState);
  const { gameCalculations, utilityFunctions } = useGameCalculations(state);
  const { handleToggleLoopAction } = useLoopActions(state, setState);

  // Game loop integration
  useGameLoop(
    state,
    (newState) => setState(newState),
    (tickDuration) => performanceFunctions.updateMetrics(tickDuration)
  );

  const stableFmt = useRef(fmt);
  const stableSetState = useRef(setState);

  // Context value creation with final optimization
  const contextValue = useMemo((): GameContextType => ({
    state,
    setState: stableSetState.current,
    perSec: gameCalculations.perSec as Record<ResourceKey, number>,
    prestigePotential: gameCalculations.prestigePotential,
    multipliers: gameCalculations.multipliers,
    technologyCosts: gameCalculations.technologyCosts,
    upgradeCosts: gameCalculations.upgradeCosts,
    performanceMetrics,
    performanceFunctions,
    
    // Action handlers (from GameActionHandlers)
    handleExecuteAction: actionHandlers.handleExecuteAction,
    handleBuyBuilding: actionHandlers.handleBuyBuilding,
    handleBuyUpgrade: actionHandlers.handleBuyUpgrade,
    handleResearchTechnology: actionHandlers.handleResearchTechnology,
    handleDoPrestige: actionHandlers.handleDoPrestige,
    handleToggleLoopAction,
    handleTogglePause: actionHandlers.handleTogglePause,
    
    // Utility functions (from GameUtilityFunctions)
    fmt: stableFmt.current,
    costFor: utilityFunctions.memoizedCostFor,
    canAfford: utilityFunctions.memoizedCanAfford,
    
    // Time info (from GameTimeInfo)
    lastSavedAt,
    timeUntilNextEvent: timeValues.timeUntilNextEvent,
    secondsUntilNextEvent: timeValues.secondsUntilNextEvent,
    timeUntilNextSave: timeValues.timeUntilNextSave,
    secondsUntilNextSave: timeValues.secondsUntilNextSave,
    
    // Save functions
    doExport: saveFunctions.doExport,
    doImport: saveFunctions.doImport,
    manualSave: saveFunctions.manualSave,
  }), [
    state,
    timeValues,
    actionHandlers,
    gameCalculations,
    utilityFunctions,
    saveFunctions,
    lastSavedAt,
    handleToggleLoopAction,
    performanceMetrics,
    performanceFunctions,
  ]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
} 