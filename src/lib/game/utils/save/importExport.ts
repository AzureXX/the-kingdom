// Save import/export logic

import { CONFIG } from '@/lib/game/config';
import { safeJsonParse, encodeBase64, decodeBase64 } from '@/lib/game/utils';
import { migrateGameState } from '@/lib/game/utils/migration';
import type { GameState } from '@/lib/game/types';

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
    if (obj && obj.version === CONFIG.version) {
      // Migrate the state to ensure it has all required properties
      return migrateGameState(obj);
    }
  } catch {
    return null;
  }
  return null;
}
