"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  
  // Use refs to avoid recreating objects on every render
  const raf = useRef<number | null>(null);
  const lastTickTime = useRef<number>(Date.now());
  const stateRef = useRef<GameState | null>(null);
  const tickAccumulator = useRef<number>(0);
  
  // Memoized values to prevent unnecessary recalculations
  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);
  
  const timeUntilNextEvent = useMemo(() => state ? getFormattedTimeUntilNextEvent(state) : '--', [state]);
  const secondsUntilNextEvent = useMemo(() => state ? getTimeUntilNextEvent(state) : 0, [state]);
  const timeUntilNextSave = useMemo(() => getFormattedTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);
  const secondsUntilNextSave = useMemo(() => getTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);

  // Update state ref when state changes
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Timer to update display every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Simple interval-based save system
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = stateRef.current;
      if (currentState) {
        doSave(currentState);
        setLastSavedAt(Date.now());
      }
    }, GAME_CONSTANTS.SAVE_INTERVAL_MS);
    
    return () => clearInterval(interval);
  }, []);

  // Load initial game state
  useEffect(() => {
    if (state === null) {
      const saved = loadSave();
      if (!saved) {
        const newState = initNewGame();
        setState(newState);
        stateRef.current = newState;
      } else {
        const now = Date.now();
        const last = saved.t || now;
        const dt = Math.min(
          GAME_CONSTANTS.OFFLINE_PROGRESS_CAP_HOURS * 60 * 60, 
          Math.max(0, (now - last) / 1000)
        );
        if (dt > 0) {
          let processedState = { ...saved };
          // Process offline progress in chunks to avoid overwhelming the system
          const maxChunk = 60; // 1 minute chunks
          let remainingTime = dt;
          while (remainingTime > 0) {
            const chunk = Math.min(remainingTime, maxChunk);
            processedState = tick(processedState, chunk);
            remainingTime -= chunk;
          }
          setState(processedState);
          stateRef.current = processedState;
        } else {
          setState(saved);
          stateRef.current = saved;
        }
      }
    }
  }, [state]);

  // Optimized game loop with fixed timestep
  useEffect(() => {
    if (!state) return;
    
    const tickRate = GAME_CONSTANTS.TICK_RATE;
    const tickInterval = 1000 / tickRate;
    const maxStep = GAME_CONSTANTS.MAX_TICK_STEP;
    
    function gameLoop() {
      const now = Date.now();
      const deltaTime = now - lastTickTime.current;
      lastTickTime.current = now;
      
      // Accumulate time and process ticks
      tickAccumulator.current += deltaTime;
      
      if (tickAccumulator.current >= tickInterval) {
        const currentState = stateRef.current || state;
        if (currentState) {
          // Process multiple ticks if needed
          let processedState = { ...currentState };
          while (tickAccumulator.current >= tickInterval) {
            const step = Math.min(tickInterval / 1000, maxStep);
            processedState = tick(processedState, step);
            tickAccumulator.current -= tickInterval;
          }
          
          // Update both the ref and React state
          stateRef.current = processedState;
          setState(processedState);
        }
      }
      
      raf.current = requestAnimationFrame(gameLoop);
    }
    
    raf.current = requestAnimationFrame(gameLoop);
    return () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, [state]);

  // Optimized action handlers that work with the ref-based system
  const handleClick = useCallback(() => {
    if (!stateRef.current) return;
    
    const nextState = clickAction({ ...stateRef.current });
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const handleBuyBuilding = useCallback((key: BuildingKey) => {
    if (!stateRef.current) return;
    
    const nextState = buyBuilding({ ...stateRef.current }, key);
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const handleBuyUpgrade = useCallback((key: PrestigeUpgradeKey) => {
    if (!stateRef.current) return;
    
    const nextState = buyUpgrade({ ...stateRef.current }, key);
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const handleResearchTechnology = useCallback((key: TechnologyKey) => {
    if (!stateRef.current) return;
    
    const nextState = researchTechnology({ ...stateRef.current }, key);
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const handleDoPrestige = useCallback(() => {
    if (!stateRef.current) return;
    
    const nextState = doPrestige({ ...stateRef.current });
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const doExport = useCallback(() => stateRef.current ? exportSave(stateRef.current) : '', []);
  const doImport = useCallback((str: string) => {
    const loaded = importSave(str);
    if (loaded) {
      stateRef.current = loaded;
      setState(loaded);
      doSave(loaded);
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
    costFor: (key: BuildingKey) => stateRef.current ? costFor(stateRef.current, key) : {},
    canAfford: (cost: Partial<Record<ResourceKey, number>>) => stateRef.current ? canAfford(stateRef.current, cost) : false,
    lastSavedAt,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
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