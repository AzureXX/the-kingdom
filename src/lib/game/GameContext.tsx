"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useState, useRef, ReactNode } from 'react';
import { type BuildingKey, type PrestigeUpgradeKey, type ResourceKey, type TechnologyKey, CONFIG } from './config';
import {
  buyBuilding,
  buyUpgrade,
  clickAction,
  researchTechnology,
} from './actions';

import {
  getPerSec,
  costFor,
  canAfford,
  getMultipliers,
  getClickGains,
  technologyCostFor,
  getUpgradeCost,
} from './calculations';
import {
  getUpgradeLevel,
} from './gameState';
import {
  prestigeGain,
  doPrestige,
} from './prestigeSystem';
// Time management functions are now used by useGameTime hook
import {
  formatNumber as fmt,
} from './utils';
import { GAME_CONSTANTS } from './constants';
import type { GameState, Multipliers } from './types';
import { usePerformanceMonitor, useSaveSystem, useGameLoop, useGameTime } from './hooks';

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
  const [state, setState] = useState<GameState | null>(null);
  const stateRef = useRef<GameState | null>(null);
  const { performanceMetrics, updateMetrics } = usePerformanceMonitor(10);
  const { lastSavedAt, loadInitialGame, autoSave, manualSave, exportSaveData, importSaveData } = useSaveSystem();
  const { timeUntilNextEvent, secondsUntilNextEvent, timeUntilNextSave, secondsUntilNextSave } = useGameTime(state, lastSavedAt);
  
  // Use game loop hook
  useGameLoop(
    state,
    (newState) => setState(newState),
    (tickDuration) => updateMetrics(tickDuration)
  );

  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  // Memoize multipliers calculation since it's expensive and used by multiple functions
  const multipliers = useMemo(() => state ? getMultipliers(state) : null, [state]);
  
  // Time calculations are now handled by useGameTime hook

  // Memoized utility functions to prevent recreation
  const memoizedCostFor = useCallback((key: BuildingKey) => state ? costFor(state, key) : {}, [state]);
  const memoizedCanAfford = useCallback((cost: Partial<Record<ResourceKey, number>>) => state ? canAfford(state, cost) : false, [state]);
  
  // Memoize click gains calculation since it depends on multipliers
  const clickGains = useMemo(() => state ? getClickGains(state) : {}, [state]);
  
  // Memoize technology costs to prevent recalculation on every render
  const technologyCosts = useMemo(() => {
    if (!state) return {} as Record<TechnologyKey, Partial<Record<ResourceKey, number>>>;
    const costs: Record<TechnologyKey, Partial<Record<ResourceKey, number>>> = {} as Record<TechnologyKey, Partial<Record<ResourceKey, number>>>;
    for (const techKey of Object.keys(CONFIG.technologies) as TechnologyKey[]) {
      costs[techKey] = technologyCostFor(state, techKey);
    }
    return costs;
  }, [state]);
  
  // Memoize upgrade costs to prevent recalculation on every render
  const upgradeCosts = useMemo(() => {
    if (!state) return {} as Record<PrestigeUpgradeKey, number>;
    const costs: Record<PrestigeUpgradeKey, number> = {} as Record<PrestigeUpgradeKey, number>;
    for (const upgradeKey of Object.keys(CONFIG.prestige.upgrades) as PrestigeUpgradeKey[]) {
      const currentLevel = getUpgradeLevel(state, upgradeKey);
      costs[upgradeKey] = getUpgradeCost(upgradeKey, currentLevel);
    }
    return costs;
  }, [state]);

  // Time management is now handled by useGameTime hook

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Autosave system
  useEffect(() => {        
    const interval = setInterval(() => {
      if (stateRef.current) {
        autoSave(stateRef.current);
      }
    }, GAME_CONSTANTS.SAVE_INTERVAL_MS);
    
    
    return () => {
      clearInterval(interval);
    };
  }, [autoSave]); 

  // Load initial game state
  useEffect(() => {
    if (state === null) {
      const newState = loadInitialGame();
      setState(newState);
    }
  }, [state, loadInitialGame]);

  // Game loop is now handled by useGameLoop hook
  // Performance monitoring cleanup is handled by the hook

  // Optimized action handlers using functional state updates
  const handleClick = useCallback(() => {
    setState(currentState => {
      if (!currentState) return currentState;
      return clickAction(currentState);
    });
  }, []);

  const handleBuyBuilding = useCallback((key: BuildingKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return buyBuilding(currentState, key);
    });
  }, []);

  const handleBuyUpgrade = useCallback((key: PrestigeUpgradeKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return buyUpgrade(currentState, key);
    });
  }, []);

  const handleResearchTechnology = useCallback((key: TechnologyKey) => {
    setState(currentState => {
      if (!currentState) return currentState;
      return researchTechnology(currentState, key);
    });
  }, []);

  const handleDoPrestige = useCallback(() => {
    setState(currentState => {
      if (!currentState) return currentState;
      return doPrestige(currentState);
    });
  }, []);

  const doExport = useCallback(() => state ? exportSaveData(state) : '', [state, exportSaveData]);
  const doImport = useCallback((str: string) => {
    const loaded = importSaveData(str);
    if (loaded) {
      setState(loaded);
      return true;
    }
    return false;
  }, [importSaveData]);


  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo((): GameContextType => ({
    state,
    setState,
    perSec: perSec as Record<ResourceKey, number>,
    prestigePotential,
    multipliers,
    clickGains,
    technologyCosts,
    upgradeCosts,
    fmt,
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    doExport,
    doImport,
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
    doExport,
    doImport,
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