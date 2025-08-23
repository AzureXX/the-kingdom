import { useState, useCallback } from 'react';
import { doSave, exportSave, importSave, loadSave, processOfflineProgress } from '../saveSystem';
import { initNewGame } from '../gameState';
import { GAME_CONSTANTS } from '../constants';
import type { GameState } from '../types';

export function useSaveSystem() {
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

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

  return {
    lastSavedAt,
    loadInitialGame,
    autoSave,
    manualSave,
    exportSaveData,
    importSaveData,
  };
}
