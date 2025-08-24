import { CONFIG, type EventKey } from './config';
import { GAME_CONSTANTS } from './constants';
import { addResources, getResource, setResource } from './gameState';
import { isValidResourceKey } from './utils';
import type { GameState } from './types';

/**
 * Trigger a random event based on weights
 */
export function triggerRandomEvent(): EventKey | null {
  const events = Object.keys(CONFIG.events) as EventKey[];
  const totalWeight = events.reduce((sum, key) => sum + CONFIG.events[key].weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const eventKey of events) {
    random -= CONFIG.events[eventKey].weight;
    if (random <= 0) {
      return eventKey;
    }
  }
  
  return events[0]; // fallback
}

/**
 * Check if player can make a specific event choice
 */
export function canMakeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): boolean {
  const event = CONFIG.events[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return false;
  
  // Check if player has required resources
  for (const resource in choice.requires) {
    if (!isValidResourceKey(resource)) {
      console.warn(`Invalid resource key: ${resource}`);
      return false;
    }
    if (getResource(state, resource) < (choice.requires[resource] || 0)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Process an event choice and update game state - Pure function
 */
export function makeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): GameState {
  const event = CONFIG.events[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return state;
  
  let newState = { ...state };
  
  // Add resources that the choice gives
  newState = addResources(newState, choice.gives);
  
  // Remove resources that the choice takes
  for (const resource in choice.takes) {
    if (!isValidResourceKey(resource)) {
      console.warn(`Invalid resource key: ${resource}`);
      continue;
    }
    const amount = choice.takes[resource] || 0;
    if (amount > 0) {
      // For positive amounts, reduce resources (but not below 0)
      const current = getResource(newState, resource);
      newState = setResource(newState, resource, current - amount);
    } else if (amount < 0) {
      // For negative amounts, add resources (this is for prestige loss)
      newState = setResource(newState, resource, getResource(newState, resource) + amount);
    }
  }
  
  // Record the choice in history - optimized to avoid array recreation
  const newEventHistory = [...newState.events.eventHistory, {
    eventKey,
    choiceIndex,
    timestamp: Date.now(),
  }];
  
  // Keep only the last N events - use in-place modification for better performance
  if (newEventHistory.length > GAME_CONSTANTS.EVENT.HISTORY_MAX_ENTRIES) {
    const excess = newEventHistory.length - GAME_CONSTANTS.EVENT.HISTORY_MAX_ENTRIES;
    newEventHistory.splice(0, excess); // Remove excess entries from the beginning
  }
  
  // Clear active event and schedule next one
  const minInterval = event.minInterval * 1000;
  const maxInterval = event.maxInterval * 1000;
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

/**
 * Check and trigger events based on timing - Pure function
 */
export function checkAndTriggerEvents(state: GameState): GameState {
  const now = Date.now();
  let newState = { ...state };
  
  // If there's an active event, check if it's been too long (auto-resolve)
  if (newState.events.activeEvent && (now - newState.events.activeEventStartTime) > GAME_CONSTANTS.EVENT.AUTO_RESOLVE_TIMEOUT_MS) {
    // Auto-resolve by choosing the default choice
    const event = CONFIG.events[newState.events.activeEvent];
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
 * Get the currently active event
 */
export function getActiveEvent(state: GameState): EventKey | null {
  return state.events.activeEvent;
}

/**
 * Get event history
 */
export function getEventHistory(state: GameState) {
  return state.events.eventHistory;
}

/**
 * Get time until next event in seconds
 */
export function getTimeUntilNextEvent(state: GameState): number {
  const now = Date.now();
  const timeUntil = state.events.nextEventTime - now;
  return Math.max(0, Math.ceil(timeUntil / 1000));
}

/**
 * Get formatted time until next event
 */
export function getFormattedTimeUntilNextEvent(state: GameState): string {
  const seconds = getTimeUntilNextEvent(state);
  
  if (seconds <= 0) {
    return 'Any moment...';
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${seconds}s`;
  }
}
