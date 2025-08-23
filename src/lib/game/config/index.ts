import { GAME_CONSTANTS } from '../constants';
import { RESOURCES, CLICK_CONFIG, type ResourceKey } from './resources';
import { BUILDINGS, type BuildingKey, type BuildingDef } from './buildings';
import { TECHNOLOGIES, type TechnologyKey, type TechnologyDef } from './technologies';
import { PRESTIGE_CONFIG, type PrestigeUpgradeKey } from './prestige';
import { EVENTS, type EventKey } from './events';

// Re-export all types for convenience
export type {
  ResourceKey,
  BuildingKey,
  BuildingDef,
  TechnologyKey,
  TechnologyDef,
  PrestigeUpgradeKey,
  EventKey,
};

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
