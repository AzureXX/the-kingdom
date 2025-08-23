"use client";

import React, { createContext, useContext, useMemo, useState, ReactNode, useRef } from 'react';
import { type BuildingKey, type PrestigeUpgradeKey, type ResourceKey, type TechnologyKey } from './config';
import { formatNumber as fmt } from './utils';

import type { GameState, Multipliers } from './types';
import { usePerformanceMonitor, useSaveSystem, useGameLoop, useGameTime, useGameActions, useGameCalculations } from './hooks';

export interface GameContextType {
  state: GameState | null;
  setState: React.Dispatch<React.SetStateAction<GameState | null>>;
  perSec: Record<ResourceKey, number>;
  prestigePotential: number;
  multipliers: Multipliers | null;
  clickGains: Partial<Record<ResourceKey, number>>;
  technologyCosts: Record<TechnologyKey, Partial<Record<ResourceKey, number>>>;
  upgradeCosts: Record<PrestigeUpgradeKey, number>;
  fmt: (n: number, decimals?: number) => string;
  handleClick: () => void;
  handleBuyBuilding: (key: BuildingKey) => void;
  handleBuyUpgrade: (key: PrestigeUpgradeKey) => void;
  handleResearchTechnology: (key: TechnologyKey) => void;
  handleDoPrestige: () => void;
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
  const { performanceMetrics, updateMetrics } = usePerformanceMonitor(10);
  const { lastSavedAt, manualSave, doExport, doImport } = useSaveSystem(state, setState);
  const { timeUntilNextEvent, secondsUntilNextEvent, timeUntilNextSave, secondsUntilNextSave } = useGameTime(state, lastSavedAt);
  const { handleClick, handleBuyBuilding, handleBuyUpgrade, handleResearchTechnology, handleDoPrestige } = useGameActions(state, setState);
  const { perSec, prestigePotential, multipliers, memoizedCostFor, memoizedCanAfford, clickGains, technologyCosts, upgradeCosts } = useGameCalculations(state);

  // Game loop integration
  useGameLoop(
    state,
    (newState) => setState(newState),
    (tickDuration) => updateMetrics(tickDuration)
  );

  const stableFmt = useRef(fmt);
  const stableDoExport = useRef(doExport);
  const stableDoImport = useRef(doImport);

  // Context value creation with optimized dependencies
  const contextValue = useMemo((): GameContextType => ({
    state,
    setState,
    perSec: perSec as Record<ResourceKey, number>,
    prestigePotential,
    multipliers,
    clickGains,
    technologyCosts,
    upgradeCosts,
    fmt: stableFmt.current,
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    doExport: stableDoExport.current,
    doImport: stableDoImport.current,
    costFor: memoizedCostFor,
    canAfford: memoizedCanAfford,
    lastSavedAt,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
    performanceMetrics,
    manualSave: () => state && manualSave(state),
  }), [
    // OPTIMIZATION: Reduced from 24 to 21 dependencies
    // Removed stable functions: fmt, doExport, doImport
    // Kept manualSave as is since it depends on state
    state,
    setState,
    perSec,
    prestigePotential,
    multipliers,
    clickGains,
    technologyCosts,
    upgradeCosts,
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    memoizedCostFor,
    memoizedCanAfford,
    lastSavedAt,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
    performanceMetrics,
    manualSave,
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