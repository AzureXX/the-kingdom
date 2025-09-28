import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { doSave, exportSave, importSave, loadSave, processOfflineProgress } from '@/lib/game/utils/save';
import { initNewGame } from '@/lib/game/gameState';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { validateGameConfig } from '@/lib/game/utils/validation/crossReferenceValidation';
import { CONFIG } from '@/lib/game/config';
import { logConfigValidation } from '@/lib/game/utils/errorLogger';
import type { GameState } from '@/lib/game/types';

export function useSaveSystem(
  state: GameState | null,
  setState: React.Dispatch<React.SetStateAction<GameState | null>>
) {
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const stateRef = useRef<GameState | null>(null);
  // Load initial game state
  const loadInitialGame = useCallback((): GameState => {
    // Validate configuration at startup
    const validation = validateGameConfig(CONFIG);
    logConfigValidation(validation.isValid, validation.errors);
    
    const saved = loadSave();
    if (!saved) {
      const newState = initNewGame();
      // Immediate save for new games
      const saveTime = Date.now();
      doSave(newState);
      setLastSavedAt(saveTime);
      return newState;
    } else {
      const now = Date.now();
      const last = saved.t || now;
      const dt = Math.min(
        GAME_CONSTANTS.OFFLINE_PROGRESS_CAP_HOURS * GAME_CONSTANTS.TIME_CONSTANTS.MINUTES_PER_HOUR * GAME_CONSTANTS.TIME_CONSTANTS.SECONDS_PER_MINUTE, 
        Math.max(0, (now - last) / GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND)
      );
      
      if (dt > 0) {
        // Use optimized offline progress processing
        const processedState = processOfflineProgress(saved, dt);
        // Save the processed state immediately
        const saveTime = Date.now();
        doSave(processedState);
        setLastSavedAt(saveTime);
        return processedState;
      } else {
        // Save the loaded state immediately to update timestamp
        const saveTime = Date.now();
        doSave(saved);
        setLastSavedAt(saveTime);
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
  const manualSave = useCallback(() => {
    if (!stateRef.current) return;
    const saveTime = Date.now();
    doSave(stateRef.current);
    setLastSavedAt(saveTime);
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
    saveFunctions,
    lastSavedAt,
  };
}
