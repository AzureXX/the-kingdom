// Event choice logic

import { CONFIG } from '@/lib/game/config';
import type { EventKey, ResourceKey, GameState } from '@/lib/game/types';
import { EVENT_CONSTANTS, GAME_CONSTANTS } from '@/lib/game/constants';
import { getResource, addResources } from '@/lib/game/utils/gameState';
import { isValidResourceKey } from '@/lib/game/utils';
import { logInvalidKey } from '@/lib/game/utils/error';
import { applyResourceChanges } from '@/lib/game/utils/resource';

const { events: EVENTS } = CONFIG;

/**
 * Check if player can make a specific event choice
 */
export function canMakeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): boolean {
  const event = EVENTS[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return false;
  
  // Check if player has required resources
  for (const resource in choice.requires) {
    if (!isValidResourceKey(resource)) {
      logInvalidKey(resource, 'resource', 'event');
      return false;
    }
    const resourceKey = resource as ResourceKey;
    if (getResource(state, resourceKey) < (choice.requires[resourceKey] || 0)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Process an event choice and update game state - Pure function
 */
export function makeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): GameState {
  const event = EVENTS[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return state;
  
  let newState = { ...state };
  
  // Add resources that the choice gives
  newState = addResources(newState, choice.gives);
  
  // Apply resource changes from choice.takes using unified utility
  newState = applyResourceChanges(newState, choice.takes);
  
  // Record the choice in history - optimized to avoid array recreation
  const newEventHistory = [...newState.events.eventHistory, {
    eventKey,
    choiceIndex,
    timestamp: Date.now(),
  }];
  
  // Keep only the last N events - use in-place modification for better performance
  if (newEventHistory.length > EVENT_CONSTANTS.HISTORY_MAX_ENTRIES) {
    const excess = newEventHistory.length - EVENT_CONSTANTS.HISTORY_MAX_ENTRIES;
    newEventHistory.splice(0, excess); // Remove excess entries from the beginning
  }
  
  // Clear active event and schedule next one
  const minInterval = event.minInterval * GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND;
  const maxInterval = event.maxInterval * GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND;
  const nextEventTime = Date.now() + minInterval + Math.random() * (maxInterval - minInterval);
  
  return {
    ...newState,
    events: {
      ...newState.events,
      eventHistory: newEventHistory,
      activeEvent: null,
      activeEventStartTime: 0,
      nextEventTime
    }
  };
}
