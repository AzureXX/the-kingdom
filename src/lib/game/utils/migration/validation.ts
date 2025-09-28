// Migration validation logic

import type { GameState } from '@/lib/game/types';

/**
 * Check if game state needs migration
 */
export function needsMigration(state: GameState): boolean {
  return !state.achievements || 
         !state.achievements.unlocked || 
         !state.achievements.progress || 
         !state.achievements.notifications ||
         state.achievements.totalPoints === undefined ||
         !state.achievements.stats ||
         !state.achievementMultipliers;
}
