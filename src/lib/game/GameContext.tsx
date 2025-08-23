"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useState, useRef, ReactNode } from 'react';
import { type BuildingKey, type PrestigeUpgradeKey, type ResourceKey, type TechnologyKey, CONFIG } from './config';
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
} from './saveSystem';
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
  initNewGame,
  getUpgradeLevel,
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
import type { GameState, Multipliers } from './types';

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
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const currentTimeRef = useRef<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  
  // Performance metrics stored in refs to avoid unnecessary re-renders
  const performanceMetricsRef = useRef({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  
  // Performance monitoring state - triggers re-renders when metrics change
  const [performanceMetrics, setPerformanceMetrics] = useState({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  
  // Track render start time for performance measurement
  const renderStartTimeRef = useRef<number>(performance.now());
  
  // Track frame count for performance metrics updates
  const frameCountRef = useRef<number>(0);
  
  // Use ref to track current state for tick loop to avoid conflicts with rapid clicks
  const stateRef = useRef<GameState | null>(null);
  stateRef.current = state;
  
  // Ref to collect pending state updates for batching
  // This allows multiple game ticks to be processed before updating React state
  const pendingStateUpdatesRef = useRef<GameState | null>(null);

  // Optimized tick function wrapped in useCallback to prevent recreation
  const processTick = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState) return null;
    
    // Measure tick performance
    const tickStartTime = performance.now();
    
    // Run game logic tick - this happens every 50ms (20 FPS)
    const newState = tick(currentState, 1 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // Measure tick completion time
    const tickEndTime = performance.now();
    const tickDuration = tickEndTime - tickStartTime;
    
    // Early return if no changes occurred (optimization)
    if (newState === currentState) return null;
    
    return { newState, tickDuration };
  }, []);

  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  // Memoize multipliers calculation since it's expensive and used by multiple functions
  const multipliers = useMemo(() => state ? getMultipliers(state) : null, [state]);
  
  // Memoize time calculations to prevent unnecessary recalculations
  const timeUntilNextEvent = useMemo(() => state ? getFormattedTimeUntilNextEvent(state) : '--', [state]);
  const secondsUntilNextEvent = useMemo(() => state ? getTimeUntilNextEvent(state) : 0, [state]);
  const timeUntilNextSave = useMemo(() => getFormattedTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);
  const secondsUntilNextSave = useMemo(() => getTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);

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

  // Timer to update display every second (optimized to reduce re-renders)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      currentTimeRef.current = now;
      setCurrentTime(now);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Autosave system
  useEffect(() => {        
    const interval = setInterval(() => {
      if (stateRef.current) {
        const saveTime = Date.now();
        doSave(stateRef.current);
        setLastSavedAt(saveTime);
      }
    }, GAME_CONSTANTS.SAVE_INTERVAL_MS);
    
    
    return () => {
      clearInterval(interval);
    };
  }, []); 

  // Load initial game state
  useEffect(() => {
    if (state === null) {
      const saved = loadSave();
      if (!saved) {
        const newState = initNewGame();
        setState(newState);
        // Immediate save for new games
        const saveTime = Date.now();
        doSave(newState);
        setLastSavedAt(saveTime);
        console.log(`[Initial Save] New game created and saved at ${new Date(saveTime).toLocaleTimeString()}`);
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
          // Save the processed state immediately
          const saveTime = Date.now();
          doSave(processedState);
          setLastSavedAt(saveTime);
          console.log(`[Initial Save] Offline progress processed and saved at ${new Date(saveTime).toLocaleTimeString()}`);
        } else {
          setState(saved);
          // Save the loaded state immediately to update timestamp
          const saveTime = Date.now();
          doSave(saved);
          setLastSavedAt(saveTime);
          console.log(`[Initial Save] Existing game loaded and saved at ${new Date(saveTime).toLocaleTimeString()}`);
        }
      }
    }
  }, [state]);

  // High-frequency game loop (20 FPS) for responsive building production and smooth gameplay
  // Runs independently of user actions to ensure buildings always produce resources
  useEffect(() => {
    if (!state) return;
    
    // Initialize refs with current state
    stateRef.current = state;
    pendingStateUpdatesRef.current = state;
    
    const performanceUpdateInterval = 10; // Update performance metrics every 10 frames (every 500ms at 20 FPS)
    
    // Game loop: Collects state updates for batching
    // Game logic runs at full speed (20 FPS), but React state updates are batched
    const gameLoopInterval = setInterval(() => {
      // Use optimized tick function
      const tickResult = processTick();
      if (!tickResult) return; // Early return if no changes
      
      const { newState, tickDuration } = tickResult;
      
      // Collect state updates for batching instead of immediately updating
      pendingStateUpdatesRef.current = newState;
      
      frameCountRef.current++;
      
      // Update performance metrics in refs (no re-renders)
      if (frameCountRef.current % performanceUpdateInterval === 0) {
        // Update tick time with actual measurement
        performanceMetricsRef.current.tickTime = tickDuration;
        
        // Calculate render time (time since last render)
        const currentTime = performance.now();
        performanceMetricsRef.current.renderTime = currentTime - renderStartTimeRef.current;
        renderStartTimeRef.current = currentTime;
        
        // Update memory usage if available
        if ('memory' in performance) {
          const memoryInfo = (performance as Performance & { memory: { usedJSHeapSize: number } }).memory;
          performanceMetricsRef.current.memoryUsage = memoryInfo.usedJSHeapSize;
        }
        
        // Trigger a re-render of performance display components
        // Reuse the performanceMetricsRef.current object to reduce object creation
        setPerformanceMetrics({
          tickTime: performanceMetricsRef.current.tickTime,
          renderTime: performanceMetricsRef.current.renderTime,
          memoryUsage: performanceMetricsRef.current.memoryUsage,
        });
      }
    }, 1000 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // React state update interval: Processes batched updates
    // Synchronized with game loop at 20 FPS, but processes accumulated changes
    const stateUpdateInterval = setInterval(() => {
      // Update React state with batched game state updates
      if (pendingStateUpdatesRef.current) {
        // Update React state with the latest batched state
        setState(pendingStateUpdatesRef.current);
        
        // Update stateRef for next tick to use the latest state
        stateRef.current = pendingStateUpdatesRef.current;
        
        // Clear pending updates after processing
        pendingStateUpdatesRef.current = null;
      }
    }, 1000 / GAME_CONSTANTS.UI_UPDATE_RATE);
    
    return () => {
      clearInterval(gameLoopInterval);
      clearInterval(stateUpdateInterval);
      
      // Cleanup performance monitoring
      renderStartTimeRef.current = performance.now();
    };
  }, [state, processTick]);

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
      const saveTime = Date.now();
      setState(loaded);
      doSave(loaded); // Immediate save of imported data
      setLastSavedAt(saveTime);
      console.log(`[Import Save] Imported game saved at ${new Date(saveTime).toLocaleTimeString()}`);
      return true;
    }
    return false;
  }, []);

  const manualSave = useCallback(() => {
    if (state) {
      const saveTime = Date.now();
      doSave(state);
      setLastSavedAt(saveTime);
      console.log(`[Manual Save] Game saved at ${new Date(saveTime).toLocaleTimeString()}`);
    }
  }, [state]);


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
    manualSave,
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