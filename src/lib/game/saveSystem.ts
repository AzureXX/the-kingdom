import { CONFIG, SAVE_KEY } from './config';
import { GAME_CONSTANTS } from './constants';
import { safeJsonParse, encodeBase64, decodeBase64 } from './utils';
import { updateTimestamp } from './gameState';
import type { GameState } from './types';

/**
 * Load game state from localStorage
 */
export function loadSave(): GameState | null {
  if (typeof window === 'undefined') return null;
  
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  
  const obj = safeJsonParse(raw, null as GameState | null);
  if (obj && obj.version === CONFIG.version) return obj;
  
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
 * Export game state as base64 encoded string
 */
export function exportSave(state: GameState): string {
  const json = JSON.stringify(state);
  return encodeBase64(json);
}

/**
 * Import game state from base64 encoded string
 */
export function importSave(text: string): GameState | null {
  try {
    const json = decodeBase64(text);
    const obj = safeJsonParse(json, null as GameState | null);
    if (obj && obj.version === CONFIG.version) return obj;
  } catch {
    return null;
  }
  return null;
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

/**
 * Get time until next save in seconds
 */
export function getTimeUntilNextSave(lastSavedAt: number | null, currentTime: number): number {
  if (!lastSavedAt) {
    // If no save yet, calculate from current time
    const timeSinceStart = currentTime % GAME_CONSTANTS.SAVE_INTERVAL_MS;
    const timeUntilNextSave = GAME_CONSTANTS.SAVE_INTERVAL_MS - timeSinceStart;
    return Math.max(0, Math.ceil(timeUntilNextSave / 1000));
  }
  
  const timeSinceLastSave = currentTime - lastSavedAt;
  const timeUntilNextSave = GAME_CONSTANTS.SAVE_INTERVAL_MS - timeSinceLastSave;
  
  return Math.max(0, Math.ceil(timeUntilNextSave / 1000));
}

/**
 * Get formatted time until next save
 */
export function getFormattedTimeUntilNextSave(lastSavedAt: number | null, currentTime: number): string {
  const seconds = getTimeUntilNextSave(lastSavedAt, currentTime);
  
  if (seconds <= 0) {
    return 'Saving...';
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${seconds}s`;
  }
}
