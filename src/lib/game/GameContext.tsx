"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useState, ReactNode } from 'react';
import { type BuildingKey, type PrestigeUpgradeKey, type ResourceKey, type TechnologyKey } from './config';
import {
  buyBuilding,
  buyUpgrade,
  clickAction,
  tick,
  researchTechnology,
} from './actions';
import {
  doSave,
  exportSave,
  importSave,
  loadSave,
  getFormattedTimeUntilNextSave,
  getTimeUntilNextSave,
  processOfflineProgress,
  debouncedSave,
  flushPendingSave,
} from './saveSystem';
import {
  getPerSec,
  costFor,
  canAfford,
} from './calculations';
import {
  initNewGame,
} from './gameState';
import {
  prestigeGain,
  doPrestige,
} from './prestigeSystem';
import {
  getFormattedTimeUntilNextEvent,
  getTimeUntilNextEvent,
} from './eventSystem';
import {
  formatNumber as fmt,
} from './utils';
import { GAME_CONSTANTS } from './constants';
import type { GameState } from './types';

export interface GameContextType {
  state: GameState | null;
  setState: React.Dispatch<React.SetStateAction<GameState | null>>;
  perSec: Record<ResourceKey, number>;
  prestigePotential: number;
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [performanceMetrics, setPerformanceMetrics] = useState({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  
  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  const timeUntilNextEvent = useMemo(() => state ? getFormattedTimeUntilNextEvent(state) : '--', [state]);
  const secondsUntilNextEvent = useMemo(() => state ? getTimeUntilNextEvent(state) : 0, [state]);
  const timeUntilNextSave = useMemo(() => getFormattedTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);
  const secondsUntilNextSave = useMemo(() => getTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);

  // Timer to update display every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Simple interval-based save system with debouncing
  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        debouncedSave(state);
        setLastSavedAt(Date.now());
      }
    }, GAME_CONSTANTS.SAVE_INTERVAL_MS);
    
    return () => {
      clearInterval(interval);
      flushPendingSave(); // Ensure pending saves are processed
    };
  }, [state]);

  // Load initial game state
  useEffect(() => {
    if (state === null) {
      const saved = loadSave();
      if (!saved) {
        const newState = initNewGame();
        setState(newState);
      } else {
        const now = Date.now();
        const last = saved.t || now;
        const dt = Math.min(
          GAME_CONSTANTS.OFFLINE_PROGRESS_CAP_HOURS * 60 * 60, 
          Math.max(0, (now - last) / 1000)
        );
        
        if (dt > 0) {
          // Use optimized offline progress processing
          const processedState = processOfflineProgress(saved, dt);
          setState(processedState);
        } else {
          setState(saved);
        }
      }
    }
  }, [state]);

  // Simplified game loop with fixed timestep and performance monitoring
  useEffect(() => {
    if (!state) return;
    
    const interval = setInterval(() => {
      const startTime = performance.now();
      
      setState(currentState => {
        if (!currentState) return currentState;
        
        const tickStart = performance.now();
        const newState = tick(currentState, 1 / GAME_CONSTANTS.TICK_RATE);
        const tickEnd = performance.now();
        
        // Update performance metrics
        setPerformanceMetrics(prev => ({
          ...prev,
          tickTime: tickEnd - tickStart,
          memoryUsage: 'memory' in performance ? (performance as Performance & { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize : 0
        }));
        
        return newState;
      });
      
      const endTime = performance.now();
      setPerformanceMetrics(prev => ({
        ...prev,
        renderTime: endTime - startTime
      }));
    }, 1000 / GAME_CONSTANTS.TICK_RATE);
    
    return () => clearInterval(interval);
  }, [state]);

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

  const doExport = useCallback(() => state ? exportSave(state) : '', [state]);
  const doImport = useCallback((str: string) => {
    const loaded = importSave(str);
    if (loaded) {
      flushPendingSave(); // Clear any pending saves
      setState(loaded);
      doSave(loaded); // Immediate save of imported data
      setLastSavedAt(Date.now());
      return true;
    }
    return false;
  }, []);

  // Keyboard event handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClick]);

  const contextValue: GameContextType = {
    state,
    setState,
    perSec: perSec as Record<ResourceKey, number>,
    prestigePotential,
    fmt,
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    doExport,
    doImport,
    costFor: (key: BuildingKey) => state ? costFor(state, key) : {},
    canAfford: (cost: Partial<Record<ResourceKey, number>>) => state ? canAfford(state, cost) : false,
    lastSavedAt,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
    performanceMetrics,
  };

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