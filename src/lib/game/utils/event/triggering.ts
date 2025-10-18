// Event triggering logic

import { CONFIG } from '@/lib/game/config';
import type { EventKey, GameState } from '@/lib/game/types';
import { checkUnlockConditions } from '@/lib/game/utils/actionChecker';

const { events: EVENTS } = CONFIG;

/**
 * Check if an event is unlocked based on its unlock conditions
 */
function isEventUnlocked(state: GameState, eventKey: EventKey): boolean {
  const event = EVENTS[eventKey];
  if (!event) return false;
  
  // If no unlock conditions, event is always available
  if (!event.unlockConditions || event.unlockConditions.length === 0) {
    return true;
  }
  
  // Check all unlock conditions
  return checkUnlockConditions(state, event.unlockConditions);
}

/**
 * Trigger a random event based on weights and unlock conditions
 */
export function triggerRandomEvent(state: GameState): EventKey | null {
  // Filter events to only include unlocked ones
  const unlockedEvents = Object.keys(EVENTS).filter(eventKey => 
    isEventUnlocked(state, eventKey as EventKey)
  ) as EventKey[];
  
  if (unlockedEvents.length === 0) {
    return null; // No events available
  }
  
  // Calculate total weight of unlocked events only
  const totalWeight = unlockedEvents.reduce((sum, key) => sum + EVENTS[key].weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const eventKey of unlockedEvents) {
    random -= EVENTS[eventKey].weight;
    if (random <= 0) {
      return eventKey;
    }
  }
  
  return unlockedEvents[0]; // fallback to first unlocked event
}
