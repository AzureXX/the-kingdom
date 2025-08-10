"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CONFIG, type BuildingKey, type PrestigeUpgradeKey, type ResourceKey } from './config';
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
import type { GameState } from './types';

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const saved = loadSave();
    if (!saved) return initNewGame();
    // offline progress: advance time since last save up to a cap
    const now = Date.now();
    const last = saved.t || now;
    const dt = Math.min(60 * 60, Math.max(0, (now - last) / 1000)); // cap 1 hour
    if (dt > 0) tick(saved, dt);
    return saved;
  });
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number | null>(null);
  const last = useRef<number>(Date.now());

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) return;
    saveTimer.current = setTimeout(() => {
      saveTimer.current = null;
      doSave(state);
      setLastSavedAt(Date.now());
    }, 1200);
  }, [state]);

  const handleClick = useCallback(() => {
    setState((s) => {
      const next = { ...s };
      clickAction(next);
      return { ...next };
    });
    scheduleSave();
  }, [scheduleSave]);

  const handleBuyBuilding = useCallback((key: BuildingKey) => {
    setState((s) => {
      const next = { ...s };
      buyBuilding(next, key);
      return { ...next };
    });
    scheduleSave();
  }, [scheduleSave]);

  const handleBuyUpgrade = useCallback((key: PrestigeUpgradeKey) => {
    setState((s) => {
      const next = { ...s };
      buyUpgrade(next, key);
      return { ...next };
    });
    scheduleSave();
  }, [scheduleSave]);

  const handleDoPrestige = useCallback(() => {
    setState((s) => doPrestige({ ...s }));
    scheduleSave();
  }, [scheduleSave]);

  const perSec = useMemo(() => getPerSec(state), [state]);
  const prestigePotential = useMemo(() => prestigeGain(state), [state]);

  useEffect(() => {
    function loop() {
      const now = Date.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      const maxStep = 1 / CONFIG.tickRate;
      let acc = dt;
      if (acc > 5) acc = 5;
      setState((s) => {
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
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const doExport = useCallback(() => exportSave(state), [state]);
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

  // keyboard space to click
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

  return {
    state,
    setState,
    perSec,
    prestigePotential,
    fmt,
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleDoPrestige,
    doExport,
    doImport,
    costFor: (key: BuildingKey) => costFor(state, key),
    canAfford: (cost: Partial<Record<ResourceKey, number>>) => canAfford(state, cost),
    lastSavedAt,
  };
}

export type UseGame = ReturnType<typeof useGame>;
