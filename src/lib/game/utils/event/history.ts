// Event history management logic

import type { EventKey, GameState } from '@/lib/game/types';

/**
 * Get event history
 */
export function getEventHistory(state: GameState): Array<{
  eventKey: EventKey;
  choiceIndex: number;
  timestamp: number;
}> {
  return state.events.eventHistory;
}
