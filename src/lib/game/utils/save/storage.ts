// Save storage operations logic

import { CONFIG, SAVE_KEY } from '@/lib/game/config';
import { safeJsonParse } from '@/lib/game/utils';
import { updateTimestamp } from '@/lib/game/utils/gameState';
import { migrateGameState } from '@/lib/game/utils/migration';
import type { GameState } from '@/lib/game/types';

/**
 * Load game state from localStorage
 */
export function loadSave(): GameState | null {
  if (typeof window === 'undefined') return null;
  
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  
  const obj = safeJsonParse(raw, null as GameState | null);
  if (obj && obj.version === CONFIG.version) {
    // Migrate the state to ensure it has all required properties
    return migrateGameState(obj);
  }
  
  return null;
}

/**
 * Save game state to localStorage
 */
export function doSave(state: GameState): void {
  if (typeof window === 'undefined') return;
  
  try {
    const updatedState = updateTimestamp(state);
    localStorage.setItem(SAVE_KEY, JSON.stringify(updatedState));
  } catch {
    // ignore save errors
  }
}

/**
 * Clear all saved data
 */
export function clearSave(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // ignore clear errors
  }
}

/**
 * Check if save data exists
 */
export function hasSave(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}
