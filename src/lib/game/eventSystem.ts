import { CONFIG, type ResourceKey, type EventKey } from './config';
import { GAME_CONSTANTS } from './constants';
import { addResources, getResource } from './gameState';
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
    const rk = resource as ResourceKey;
    if (getResource(state, rk) < (choice.requires[rk] || 0)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Process an event choice and update game state
 */
export function makeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): void {
  const event = CONFIG.events[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return;
  
  // Add resources that the choice gives
  addResources(state, choice.gives);
  
  // Remove resources that the choice takes
  for (const resource in choice.takes) {
    const rk = resource as ResourceKey;
    const amount = choice.takes[rk] || 0;
    if (amount > 0) {
      // For positive amounts, reduce resources (but not below 0)
      const current = getResource(state, rk);
      state.resources[rk] = Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, current - amount);
    } else if (amount < 0) {
      // For negative amounts, add resources (this is for prestige loss)
      state.resources[rk] = (getResource(state, rk) + amount);
    }
  }
  
  // Record the choice in history
  state.events.eventHistory.push({
    eventKey,
    choiceIndex,
    timestamp: Date.now(),
  });
  
  // Keep only the last N events
  if (state.events.eventHistory.length > GAME_CONSTANTS.EVENT.HISTORY_MAX_ENTRIES) {
    state.events.eventHistory = state.events.eventHistory.slice(-GAME_CONSTANTS.EVENT.HISTORY_MAX_ENTRIES);
  }
  
  // Clear active event and schedule next one
  state.events.activeEvent = null;
  state.events.activeEventStartTime = 0;
  const minInterval = event.minInterval * 1000;
  const maxInterval = event.maxInterval * 1000;
  state.events.nextEventTime = Date.now() + minInterval + Math.random() * (maxInterval - minInterval);
}

/**
 * Check and trigger events based on timing
 */
export function checkAndTriggerEvents(state: GameState): void {
  const now = Date.now();
  
  // If there's an active event, check if it's been too long (auto-resolve)
  if (state.events.activeEvent && (now - state.events.activeEventStartTime) > GAME_CONSTANTS.EVENT.AUTO_RESOLVE_TIMEOUT_MS) {
    // Auto-resolve by choosing the default choice
    const event = CONFIG.events[state.events.activeEvent];
    const defaultChoiceIndex = event.defaultChoiceIndex || 0;
    makeEventChoice(state, state.events.activeEvent, defaultChoiceIndex);
  }
  
  // Check if it's time for a new event
  if (!state.events.activeEvent && now >= state.events.nextEventTime) {
    const eventKey = triggerRandomEvent();
    if (eventKey) {
      state.events.activeEvent = eventKey;
      state.events.activeEventStartTime = now;
    }
  }
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
