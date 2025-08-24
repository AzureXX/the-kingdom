import { CONFIG, type ResourceKey, type TechnologyKey, type BuildingKey, type PrestigeUpgradeKey } from './config';
import { GAME_CONSTANTS } from './constants';
import type { GameState } from './types';
import { isValidBuildingKey } from './utils';
import { logInvalidKey } from './utils/errorLogger';

/**
 * Initialize a new game state with default values
 */
export function initNewGame(): GameState {
  const state: GameState = {
    t: Date.now(),
    resources: {},
    lifetime: { food: 0 },
    buildings: { woodcutter: 0, quarry: 0, farm: 0, blacksmith: 0, castle: 0, library: 0, university: 0, laboratory: 0 },
    technologies: { writing: 0, mathematics: 0, engineering: 0, chemistry: 0, physics: 0, biology: 0 },
    upgrades: { royalDecrees: 0, masterCraftsmen: 0, fertileLands: 0, militaryMight: 0 },
    clicks: 0,
    version: CONFIG.version,
    events: {
      activeEvent: null,
      activeEventStartTime: 0,
      nextEventTime: Date.now() + (Math.random() * (GAME_CONSTANTS.EVENT.INITIAL_MAX_INTERVAL_SECONDS - GAME_CONSTANTS.EVENT.INITIAL_MIN_INTERVAL_SECONDS) + GAME_CONSTANTS.EVENT.INITIAL_MIN_INTERVAL_SECONDS) * 1000,
      eventHistory: [],
    },
    research: {
      activeResearch: null,
      researchStartTime: 0,
      researchEndTime: 0,
    },
  };
  
  // Initialize resources with starting values
  for (const k in CONFIG.resources) {
    const key = k as ResourceKey;
    state.resources[key] = CONFIG.resources[key].start || 0;
  }
  
  return state;
}

/**
 * Update the game timestamp - Pure function
 */
export function updateTimestamp(state: GameState): GameState {
  return { ...state, t: Date.now() };
}

/**
 * Get a resource value safely, returning 0 if not found
 */
export function getResource(state: GameState, resourceKey: ResourceKey): number {
  return state.resources[resourceKey] || 0;
}

/**
 * Set a resource value - Pure function
 */
export function setResource(state: GameState, resourceKey: ResourceKey, value: number): GameState {
  const currentValue = state.resources[resourceKey] || 0;
  const newValue = Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value);
  if (currentValue === newValue) return state;
  
  return {
    ...state,
    resources: {
      ...state.resources,
      [resourceKey]: newValue
    }
  };
}

/**
 * Optimized state update functions using structural sharing
 */

/**
 * Update a resource value with structural sharing - Pure function
 */
export function updateResource(state: GameState, resourceKey: ResourceKey, value: number): GameState {
  const currentValue = state.resources[resourceKey] || 0;
  if (currentValue === value) return state;
  
  return {
    ...state,
    resources: {
      ...state.resources,
      [resourceKey]: Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value)
    }
  };
}

/**
 * Update multiple resources at once - Pure function
 */
export function updateMultipleResources(state: GameState, updates: Partial<Record<ResourceKey, number>>): GameState {
  if (Object.keys(updates).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  
  for (const [key, value] of Object.entries(updates)) {
    const resourceKey = key as ResourceKey;
    const currentValue = state.resources[resourceKey] || 0;
    const newValue = Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value);
    
    if (currentValue !== newValue) {
      resourceUpdates[resourceKey] = newValue;
      hasChanges = true;
    }
  }
  
  if (!hasChanges) return state;
  
  return {
    ...state,
    resources: {
      ...state.resources,
      ...resourceUpdates
    }
  };
}

/**
 * Update building count with structural sharing - Pure function
 */
export function updateBuildingCount(state: GameState, buildingKey: BuildingKey, count: number): GameState {
  const currentCount = state.buildings[buildingKey] || 0;
  if (currentCount === count) return state;
  
  return {
    ...state,
    buildings: {
      ...state.buildings,
      [buildingKey]: Math.max(0, count)
    }
  };
}

/**
 * Update upgrade level with structural sharing - Pure function
 */
export function updateUpgradeLevel(state: GameState, upgradeKey: PrestigeUpgradeKey, level: number): GameState {
  const currentLevel = state.upgrades[upgradeKey] || 0;
  if (currentLevel === level) return state;
  
  return {
    ...state,
    upgrades: {
      ...state.upgrades,
      [upgradeKey]: Math.max(0, level)
    }
  };
}

/**
 * Update technology level with structural sharing - Pure function
 */
export function updateTechnologyLevel(state: GameState, technologyKey: TechnologyKey, level: number): GameState {
  const currentLevel = state.technologies[technologyKey] || 0;
  if (currentLevel === level) return state;
  
  return {
    ...state,
    technologies: {
      ...state.technologies,
      [technologyKey]: Math.max(0, level)
    }
  };
}

/**
 * Get building count safely, returning 0 if not found
 */
export function getBuildingCount(state: GameState, buildingKey: BuildingKey): number {
  return state.buildings[buildingKey] || 0;
}

/**
 * Set building count - Pure function
 */
export function setBuildingCount(state: GameState, buildingKey: BuildingKey, count: number): GameState {
  const currentCount = state.buildings[buildingKey] || 0;
  const newCount = Math.max(0, count);
  if (currentCount === newCount) return state;
  
  return {
    ...state,
    buildings: {
      ...state.buildings,
      [buildingKey]: newCount
    }
  };
}

/**
 * Get upgrade level safely, returning 0 if not found
 */
export function getUpgradeLevel(state: GameState, upgradeKey: PrestigeUpgradeKey): number {
  return state.upgrades[upgradeKey] || 0;
}

/**
 * Set upgrade level - Pure function
 */
export function setUpgradeLevel(state: GameState, upgradeKey: PrestigeUpgradeKey, level: number): GameState {
  const currentLevel = state.upgrades[upgradeKey] || 0;
  const newLevel = Math.max(0, level);
  if (currentLevel === newLevel) return state;
  
  return {
    ...state,
    upgrades: {
      ...state.upgrades,
      [upgradeKey]: newLevel
    }
  };
}

/**
 * Add resources to the game state - Pure function
 */
export function addResources(state: GameState, obj: Partial<Record<ResourceKey, number>>): GameState {
  if (Object.keys(obj).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  
  for (const r in obj) {
    const rk = r as ResourceKey;
    const current = state.resources[rk] || 0;
    const delta = obj[rk] || 0;
    const newValue = current + delta;
    
    if (delta !== 0) {
      resourceUpdates[rk] = newValue;
      hasChanges = true;
    }
  }
  
  if (!hasChanges) return state;
  
  return {
    ...state,
    resources: {
      ...state.resources,
      ...resourceUpdates
    }
  };
}

/**
 * Get technology level safely, returning 0 if not found
 */
export function getTechnologyLevel(state: GameState, technologyKey: TechnologyKey): number {
  return state.technologies[technologyKey] || 0;
}

/**
 * Set technology level - Pure function
 */
export function setTechnologyLevel(state: GameState, technologyKey: TechnologyKey, level: number): GameState {
  const currentLevel = state.technologies[technologyKey] || 0;
  const newLevel = Math.max(0, level);
  if (currentLevel === newLevel) return state;
  
  return {
    ...state,
    technologies: {
      ...state.technologies,
      [technologyKey]: newLevel
    }
  };
}

/**
 * Check if a technology is researched
 */
export function isTechnologyResearched(state: GameState, technologyKey: TechnologyKey): boolean {
  return getTechnologyLevel(state, technologyKey) > 0;
}

/**
 * Check if all required technologies are researched for a building
 */
export function hasAllRequiredTechnologiesForBuilding(state: GameState, requiredTechs: TechnologyKey | TechnologyKey[] | undefined): boolean {
  if (!requiredTechs) return true;
  
  const techArray = Array.isArray(requiredTechs) ? requiredTechs : [requiredTechs];
  
  return techArray.every(techKey => state.technologies[techKey] > 0);
}

/**
 * Check if a building is unlocked (no tech requirement or tech is researched)
 */
export function isBuildingUnlocked(state: GameState, buildingKey: BuildingKey): boolean {
  const building = CONFIG.buildings[buildingKey];
  if (!building || !building.requiresTech) return true;
  return hasAllRequiredTechnologiesForBuilding(state, building.requiresTech);
}

/**
 * Get all unlocked buildings
 */
export function getUnlockedBuildings(state: GameState): BuildingKey[] {
  const validKeys: BuildingKey[] = [];
  for (const buildingKey of Object.keys(CONFIG.buildings)) {
    if (!isValidBuildingKey(buildingKey)) {
      logInvalidKey(buildingKey, 'building', 'gameState');
      continue;
    }
    if (isBuildingUnlocked(state, buildingKey)) {
      validKeys.push(buildingKey);
    }
  }
  return validKeys;
}
