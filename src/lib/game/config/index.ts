import { GAME_CONSTANTS } from '../constants';
import { RESOURCES, CLICK_CONFIG } from './resources';
import { BUILDINGS } from './buildings';
import { TECHNOLOGIES } from './technologies';
import { PRESTIGE_CONFIG } from './prestige';
import { EVENTS } from './events';

// Import all types from centralized types directory
export type {
  ResourceKey,
  ResourceDef,
  ResourceCost,
  ResourceProduction,
  ResourceConsumption,
  ResourceAmount,
  BuildingKey,
  BuildingDef,
  TechnologyKey,
  TechnologyDef,
  PrestigeUpgradeKey,
  PrestigeUpgradeDef,
  EventKey,
  EventChoice,
  EventDef,
  GameState,
  Multipliers,
} from '../types';

// Re-export all config objects
export {
  RESOURCES,
  CLICK_CONFIG,
  BUILDINGS,
  TECHNOLOGIES,
  PRESTIGE_CONFIG,
  EVENTS,
};

// Main game configuration object
export const CONFIG = {
  tickRate: GAME_CONSTANTS.GAME_TICK_RATE,
  version: 4, // Increment version for save compatibility
  resources: RESOURCES,
  click: CLICK_CONFIG,
  buildings: BUILDINGS,
  technologies: TECHNOLOGIES,
  prestige: PRESTIGE_CONFIG,
  events: EVENTS,
};

export const SAVE_KEY = 'medieval-kingdom-v4';
