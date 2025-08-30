import { GAME_CONSTANTS } from '../constants';
import { RESOURCES } from './resources';
import { BUILDINGS } from './buildings';
import { TECHNOLOGIES } from './technologies';
import { PRESTIGE_CONFIG } from './prestige';
import { EVENTS } from './events';
import { ACTIONS } from './actions';

// Re-export all config objects
export {
  RESOURCES,
  BUILDINGS,
  TECHNOLOGIES,
  PRESTIGE_CONFIG,
  EVENTS,
  ACTIONS,
};

// Main game configuration object - stable reference to prevent recreation
export const CONFIG = Object.freeze({
  tickRate: GAME_CONSTANTS.GAME_TICK_RATE,
  version: 5, // Increment version for save compatibility with new action system
  resources: RESOURCES,
  buildings: BUILDINGS,
  technologies: TECHNOLOGIES,
  prestige: PRESTIGE_CONFIG,
  events: EVENTS,
  actions: ACTIONS,
});

export const SAVE_KEY = 'medieval-kingdom-v5';
