// Event state management logic

import type { EventKey, GameState } from '@/lib/game/types';

/**
 * Get the currently active event
 */
export function getActiveEvent(state: GameState): EventKey | null {
  return state.events.activeEvent;
}
