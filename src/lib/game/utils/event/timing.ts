// Event timing and scheduling logic

import { CONFIG } from '@/lib/game/config';
import type { EventKey, GameState } from '@/lib/game/types';
import { EVENT_CONSTANTS, GAME_CONSTANTS } from '@/lib/game/constants';
import { triggerRandomEvent } from './triggering';
import { makeEventChoice } from './choices';

const { events: EVENTS } = CONFIG;

/**
 * Check and trigger events based on timing - Pure function
 */
export function checkAndTriggerEvents(state: GameState): GameState {
  const now = Date.now();
  let newState = { ...state };
  
  // If there's an active event, check if it's been too long (auto-resolve)
  if (newState.events.activeEvent && (now - newState.events.activeEventStartTime) > EVENT_CONSTANTS.AUTO_RESOLVE_TIMEOUT_MS) {
    // Auto-resolve by choosing the default choice
    const event = EVENTS[newState.events.activeEvent];
    const defaultChoiceIndex = event.defaultChoiceIndex || 0;
    newState = makeEventChoice(newState, newState.events.activeEvent, defaultChoiceIndex);
  }
  
  // Check if it's time for a new event
  if (!newState.events.activeEvent && now >= newState.events.nextEventTime) {
    const eventKey = triggerRandomEvent();
    if (eventKey) {
      return {
        ...newState,
        events: {
          ...newState.events,
          activeEvent: eventKey,
          activeEventStartTime: now
        }
      };
    }
  }
  
  return newState;
}

/**
 * Get time until next event in seconds
 */
export function getTimeUntilNextEvent(state: GameState): number {
  const now = Date.now();
  const timeUntil = state.events.nextEventTime - now;
  return Math.max(0, Math.ceil(timeUntil / GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND));
}

/**
 * Get formatted time until next event
 */
export function getFormattedTimeUntilNextEvent(state: GameState): string {
  const seconds = getTimeUntilNextEvent(state);
  
  if (seconds <= 0) {
    return 'Any moment...';
  }
  
  const minutes = Math.floor(seconds / GAME_CONSTANTS.TIME_CONSTANTS.SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % GAME_CONSTANTS.TIME_CONSTANTS.SECONDS_PER_MINUTE;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${seconds}s`;
  }
}
