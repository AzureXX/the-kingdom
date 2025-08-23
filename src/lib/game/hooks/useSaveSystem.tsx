import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { doSave, exportSave, importSave, loadSave, processOfflineProgress } from '../saveSystem';
import { initNewGame } from '../gameState';
import { GAME_CONSTANTS } from '../constants';
import type { GameState } from '../types';

export function useSaveSystem(
  state: GameState | null,
  setState: React.Dispatch<React.SetStateAction<GameState | null>>
) {
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const stateRef = useRef<GameState | null>(null);
  // Load initial game state
  const loadInitialGame = useCallback((): GameState => {
    const saved = loadSave();
    if (!saved) {
      const newState = initNewGame();
      // Immediate save for new games
      const saveTime = Date.now();
      doSave(newState);
      setLastSavedAt(saveTime);
      console.log(`[Initial Save] New game created and saved at ${new Date(saveTime).toLocaleTimeString()}`);
      return newState;
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
        // Save the processed state immediately
        const saveTime = Date.now();
        doSave(processedState);
        setLastSavedAt(saveTime);
        console.log(`[Initial Save] Offline progress processed and saved at ${new Date(saveTime).toLocaleTimeString()}`);
        return processedState;
      } else {
        // Save the loaded state immediately to update timestamp
        const saveTime = Date.now();
        doSave(saved);
        setLastSavedAt(saveTime);
        console.log(`[Initial Save] Existing game loaded and saved at ${new Date(saveTime).toLocaleTimeString()}`);
        return saved;
      }
    }
  }, []);

  // Autosave function
  const autoSave = useCallback((state: GameState) => {
    const saveTime = Date.now();
    doSave(state);
    setLastSavedAt(saveTime);
  }, []);

  // Manual save function
  const manualSave = useCallback((state: GameState) => {
    const saveTime = Date.now();
    doSave(state);
    setLastSavedAt(saveTime);
    console.log(`[Manual Save] Game saved at ${new Date(saveTime).toLocaleTimeString()}`);
  }, []);

  // Export save function
  const exportSaveData = useCallback((state: GameState): string => {
    return exportSave(state);
  }, []);

  // Import save function
  const importSaveData = useCallback((text: string): GameState | null => {
    const loaded = importSave(text);
    if (loaded) {
      const saveTime = Date.now();
      doSave(loaded); // Immediate save of imported data
      setLastSavedAt(saveTime);
      console.log(`[Import Save] Imported game saved at ${new Date(saveTime).toLocaleTimeString()}`);
      return loaded;
    }
    return null;
  }, []);

  // Export/Import handlers for GameContext interface
  const doExport = useCallback((): string => {
    return state ? exportSaveData(state) : '';
  }, [state, exportSaveData]);

  const doImport = useCallback((text: string): boolean => {
    const loaded = importSaveData(text);
    return loaded !== null;
  }, [importSaveData]);

  // Initial game loading effect
  useEffect(() => {
    if (state === null) {
      const newState = loadInitialGame();
      setState(newState);
    }
  }, [state, loadInitialGame, setState]);

  // State ref synchronization
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Autosave effect
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

  // Group save system functions together for cleaner consumption
  const saveFunctions = useMemo(() => ({
    loadInitialGame,
    autoSave,
    manualSave,
    exportSaveData,
    importSaveData,
    doExport,
    doImport,
  }), [loadInitialGame, autoSave, manualSave, exportSaveData, importSaveData, doExport, doImport]);

  return {
    saveFunctions, // Grouped save functions
    // Individual values still available for backward compatibility
    lastSavedAt,
    loadInitialGame,
    autoSave,
    manualSave,
    exportSaveData,
    importSaveData,
    doExport,
    doImport,
  };
}
