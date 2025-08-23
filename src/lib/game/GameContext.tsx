"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useState, useRef, ReactNode } from 'react';
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
  const currentTimeRef = useRef<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [performanceMetrics, setPerformanceMetrics] = useState({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  
  // Use ref to track current state for tick loop to avoid conflicts with rapid clicks
  const stateRef = useRef<GameState | null>(null);
  stateRef.current = state;

  // Memoize performance metrics to prevent unnecessary re-renders
  const memoizedPerformanceMetrics = useMemo(() => performanceMetrics, [performanceMetrics]);
  
  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  const timeUntilNextEvent = useMemo(() => state ? getFormattedTimeUntilNextEvent(state) : '--', [state]);
  const secondsUntilNextEvent = useMemo(() => state ? getTimeUntilNextEvent(state) : 0, [state]);
  const timeUntilNextSave = useMemo(() => getFormattedTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);
  const secondsUntilNextSave = useMemo(() => getTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);

  // Memoized utility functions to prevent recreation
  const memoizedCostFor = useCallback((key: BuildingKey) => state ? costFor(state, key) : {}, [state]);
  const memoizedCanAfford = useCallback((cost: Partial<Record<ResourceKey, number>>) => state ? canAfford(state, cost) : false, [state]);

  // Timer to update display every second (optimized to reduce re-renders)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      currentTimeRef.current = now;
      setCurrentTime(now);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Optimized save system with debouncing and state change detection
  useEffect(() => {
    if (!state) return;
    
    const interval = setInterval(() => {
      debouncedSave(state);
      setLastSavedAt(Date.now());
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

  // High-frequency game loop (20 FPS) for responsive building production and smooth gameplay
  // Runs independently of user actions to ensure buildings always produce resources
  useEffect(() => {
    if (!state) return;
    
    let frameCount = 0;
    const performanceUpdateInterval = GAME_CONSTANTS.PERFORMANCE_METRICS_UPDATE_INTERVAL; // Update performance metrics every 60 frames
    
    // Separate game logic from React state updates
    // Game logic runs at full speed (20 FPS), React state updates at 20 FPS
    const gameLoopInterval = setInterval(() => {
      // Use ref-based state access to avoid conflicts with rapid clicks
      // This ensures the game loop always runs independently
      const currentState = stateRef.current;
      if (!currentState) return;
      
      // Run game logic tick - this happens every 50ms (20 FPS)
      const newState = tick(currentState, 1 / GAME_CONSTANTS.GAME_TICK_RATE);
      
      // Update the ref immediately for next tick
      stateRef.current = newState;
      
      frameCount++;
      
      // Update performance metrics less frequently to reduce overhead
      if (frameCount % performanceUpdateInterval === 0) {
        setPerformanceMetrics(prev => ({
          ...prev,
          tickTime: performance.now() - performance.now(), // Will be updated properly in next step
          memoryUsage: 'memory' in performance ? (performance as Performance & { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize : 0
        }));
      }
    }, 1000 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // React state update interval - synchronized with game loop at 20 FPS
    const stateUpdateInterval = setInterval(() => {
      // Update React state with current game state from ref
      if (stateRef.current) {
        setState(stateRef.current);
      }
    }, 1000 / GAME_CONSTANTS.UI_UPDATE_RATE);
    
    return () => {
      clearInterval(gameLoopInterval);
      clearInterval(stateUpdateInterval);
    };
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



  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo((): GameContextType => ({
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
    costFor: memoizedCostFor,
    canAfford: memoizedCanAfford,
    lastSavedAt,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
    performanceMetrics: memoizedPerformanceMetrics,
  }), [
    state,
    setState,
    perSec,
    prestigePotential,
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
    memoizedPerformanceMetrics,
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