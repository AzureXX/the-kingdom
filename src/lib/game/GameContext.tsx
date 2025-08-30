"use client";

import React, { createContext, useContext, useMemo, useState, ReactNode, useRef } from 'react';
import { formatNumber as fmt } from './utils';

import type { GameState, Multipliers, BuildingKey, PrestigeUpgradeKey, ResourceKey, TechnologyKey, ActionKey } from './types';
import type { LoopActionKey } from './types/loopActions';
import { usePerformanceMonitor, useSaveSystem, useGameLoop, useGameTime, useGameActions, useGameCalculations, useLoopActions } from './hooks';

export interface GameContextType {
  state: GameState | null;
  setState: React.Dispatch<React.SetStateAction<GameState | null>>;
  perSec: Record<ResourceKey, number>;
  prestigePotential: number;
  multipliers: Multipliers | null;
  technologyCosts: Record<TechnologyKey, Partial<Record<ResourceKey, number>>>;
  upgradeCosts: Record<PrestigeUpgradeKey, number>;
  fmt: (n: number, decimals?: number) => string;
  handleExecuteAction: (key: ActionKey) => void;
  handleBuyBuilding: (key: BuildingKey) => void;
  handleBuyUpgrade: (key: PrestigeUpgradeKey) => void;
  handleResearchTechnology: (key: TechnologyKey) => void;
  handleDoPrestige: () => void;
  handleToggleLoopAction: (actionKey: LoopActionKey) => void;
  doExport: () => string;
  doImport: (str: string) => boolean;
  costFor: (key: BuildingKey) => Partial<Record<ResourceKey, number>>;
  canAfford: (cost: Partial<Record<ResourceKey, number>>) => boolean;
  lastSavedAt: number | null;
  timeUntilNextEvent: string;
  secondsUntilNextEvent: number;
  timeUntilNextSave: string;
  secondsUntilNextSave: number;
  performanceMetrics: {
    tickTime: number;
    renderTime: number;
    memoryUsage: number;
  };
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
  const { performanceMetrics, performanceFunctions } = usePerformanceMonitor(10);
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
    fmt: stableFmt.current,
    handleExecuteAction: actionHandlers.handleExecuteAction,
    handleBuyBuilding: actionHandlers.handleBuyBuilding,
    handleBuyUpgrade: actionHandlers.handleBuyUpgrade,
    handleResearchTechnology: actionHandlers.handleResearchTechnology,
    handleDoPrestige: actionHandlers.handleDoPrestige,
    handleToggleLoopAction,
    doExport: saveFunctions.doExport,
    doImport: saveFunctions.doImport,
    costFor: utilityFunctions.memoizedCostFor,
    canAfford: utilityFunctions.memoizedCanAfford,
    lastSavedAt,
    timeUntilNextEvent: timeValues.timeUntilNextEvent,
    secondsUntilNextEvent: timeValues.secondsUntilNextEvent,
    timeUntilNextSave: timeValues.timeUntilNextSave,
    secondsUntilNextSave: timeValues.secondsUntilNextSave,
    performanceMetrics,
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