"use client";

import React, { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { type BuildingKey, type PrestigeUpgradeKey, type ResourceKey } from './config';
import {
  buyBuilding,
  buyUpgrade,
  clickAction,
  doPrestige,
  doSave,
  exportSave,
  getPerSec,
  importSave,
  initNewGame,
  loadSave,
  prestigeGain,
  tick,
  fmt,
  costFor,
  canAfford,
} from './logic';
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
  handleDoPrestige: () => void;
  doExport: () => string;
  doImport: (str: string) => boolean;
  costFor: (key: BuildingKey) => Partial<Record<ResourceKey, number>>;
  canAfford: (cost: Partial<Record<ResourceKey, number>>) => boolean;
  lastSavedAt: number | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(Date.now());
  const stateRef = useRef<GameState | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

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

  useEffect(() => {
    if (state === null) {
      const saved = loadSave();
      if (!saved) {
        setState(initNewGame());
      } else {
        const now = Date.now();
        const last = saved.t || now;
        const dt = Math.min(
          GAME_CONSTANTS.OFFLINE_PROGRESS_CAP_HOURS * 60 * 60, 
          Math.max(0, (now - last) / 1000)
        );
        if (dt > 0) tick(saved, dt);
        setState(saved);
      }
    }
  }, [state]);

  const handleClick = useCallback(() => {
    if (!state) return;
    setState((s) => {
      if (!s) return s;
      const next = { ...s };
      clickAction(next);
      return { ...next };
    });
  }, [state]);

  const handleBuyBuilding = useCallback((key: BuildingKey) => {
    if (!state) return;
    setState((s) => {
      if (!s) return s;
      const next = { ...s };
      buyBuilding(next, key);
      return { ...next };
    });
  }, [state]);

  const handleBuyUpgrade = useCallback((key: PrestigeUpgradeKey) => {
    if (!state) return;
    setState((s) => {
      if (!s) return s;
      const next = { ...s };
      buyUpgrade(next, key);
      return { ...next };
    });
  }, [state]);

  const handleDoPrestige = useCallback(() => {
    if (!state) return;
    setState((s) => s ? doPrestige({ ...s }) : s);
  }, [state]);

  const perSec = useMemo(() => state ? getPerSec(state) : {}, [state]);
  const prestigePotential = useMemo(() => state ? prestigeGain(state) : 0, [state]);

  useEffect(() => {
    if (!state) return;
    
    function loop() {
      const now = Date.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      const maxStep = 1 / GAME_CONSTANTS.TICK_RATE;
      let acc = dt;
      if (acc > GAME_CONSTANTS.MAX_TICK_STEP) acc = GAME_CONSTANTS.MAX_TICK_STEP;
      
      setState((s) => {
        if (!s) return s;
        const next = { ...s };
        while (acc > 0) {
          const step = Math.min(maxStep, acc);
          tick(next, step);
          acc -= step;
        }
        return { ...next };
      });
      raf.current = requestAnimationFrame(loop);
    }
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [state]);

  const doExport = useCallback(() => state ? exportSave(state) : '', [state]);
  const doImport = useCallback((str: string) => {
    const loaded = importSave(str);
    if (loaded) {
      setState(loaded);
      doSave(loaded);
      setLastSavedAt(Date.now());
      return true;
    }
    return false;
  }, []);

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
    handleDoPrestige,
    doExport,
    doImport,
    costFor: (key: BuildingKey) => state ? costFor(state, key) : {},
    canAfford: (cost: Partial<Record<ResourceKey, number>>) => state ? canAfford(state, cost) : false,
    lastSavedAt,
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