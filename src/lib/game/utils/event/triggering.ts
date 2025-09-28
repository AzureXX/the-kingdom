// Event triggering logic

import { CONFIG } from '@/lib/game/config';
import type { EventKey } from '@/lib/game/types';

const { events: EVENTS } = CONFIG;

/**
 * Trigger a random event based on weights
 */
export function triggerRandomEvent(): EventKey | null {
  const events = Object.keys(EVENTS) as EventKey[];
  const totalWeight = events.reduce((sum, key) => sum + EVENTS[key].weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const eventKey of events) {
    random -= EVENTS[eventKey].weight;
    if (random <= 0) {
      return eventKey;
    }
  }
  
  return events[0]; // fallback
}
