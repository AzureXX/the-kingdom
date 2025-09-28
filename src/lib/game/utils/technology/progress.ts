// Technology progress tracking logic

import type { GameState } from '@/lib/game/types';
import { GAME_CONSTANTS } from '@/lib/game/constants';

/**
 * Get research progress as a percentage (0-100)
 */
export function getResearchProgress(state: GameState): number {
  if (!state.research.activeResearch) return 0;
  
  const now = Date.now();
  const start = state.research.researchStartTime;
  const end = state.research.researchEndTime;
  
  if (now >= end) return 100;
  if (now <= start) return 0;
  
  return ((now - start) / (end - start)) * 100;
}

/**
 * Get time remaining for current research in seconds
 */
export function getResearchTimeRemaining(state: GameState): number {
  if (!state.research.activeResearch) return 0;
  
  const remaining = state.research.researchEndTime - Date.now();
  return Math.max(0, Math.ceil(remaining / GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND));
}
