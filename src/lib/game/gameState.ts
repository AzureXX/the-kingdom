import { CONFIG } from './config';
import type { ResourceKey, TechnologyKey, BuildingKey, PrestigeUpgradeKey, ResourceCost, ResourceProduction } from './types';
import { GAME_CONSTANTS, EVENT_CONSTANTS } from './constants';
import type { GameState } from './types';
import { isValidBuildingKey } from './utils';
import { logInvalidKey, createValidationErrorHandler, createStateErrorHandler } from './utils/errorLogger';
import { DEFAULT_LOOP_SETTINGS } from './config/loopActions';

const { resources: RESOURCES, buildings: BUILDINGS, technologies: TECHNOLOGIES, prestige: PRESTIGE_CONFIG, version: CONFIG_VERSION } = CONFIG;

// Create specialized error handlers for game state
const validationHandler = createValidationErrorHandler('gameState');
const stateErrorHandler = createStateErrorHandler('gameState');

/**
 * Initialize a new game state with default values
 */
export function initNewGame(): GameState {
  try {
    const state: GameState = {
      t: Date.now(),
      resources: {},
      lifetime: {},
      buildings: {} as Record<BuildingKey, number>,
      technologies: {} as Record<TechnologyKey, number>,
      upgrades: {} as Record<PrestigeUpgradeKey, number>,
      clicks: 0,
      version: CONFIG_VERSION,
      isPaused: false,
      events: {
        activeEvent: null,
        activeEventStartTime: 0,
        nextEventTime: Date.now() + (Math.random() * (EVENT_CONSTANTS.INITIAL_MAX_INTERVAL_SECONDS - EVENT_CONSTANTS.INITIAL_MIN_INTERVAL_SECONDS) + EVENT_CONSTANTS.INITIAL_MIN_INTERVAL_SECONDS) * GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND,
        eventHistory: [],
      },
      research: {
        activeResearch: null,
        researchStartTime: 0,
        researchEndTime: 0,
      },
      actions: {
        unlocks: {},
        cooldowns: {},
      },
      loopActions: [],
      loopSettings: DEFAULT_LOOP_SETTINGS,
    };
    
    // Initialize resources with starting values
    for (const k in RESOURCES) {
      const key = k as ResourceKey;
      state.resources[key] = RESOURCES[key].start || 0;
    }
    
    // Initialize buildings dynamically from CONFIG
    for (const buildingKey of Object.keys(BUILDINGS)) {
      state.buildings[buildingKey as BuildingKey] = 0;
    }
    
    // Initialize technologies dynamically from CONFIG
    for (const techKey of Object.keys(TECHNOLOGIES)) {
      state.technologies[techKey as TechnologyKey] = 0;
    }
    
    // Initialize upgrades dynamically from CONFIG
    for (const upgradeKey of Object.keys(PRESTIGE_CONFIG.upgrades)) {
      state.upgrades[upgradeKey as PrestigeUpgradeKey] = 0;
    }
    
    return state;
  } catch (error) {
    stateErrorHandler('Failed to initialize new game state', { error: error instanceof Error ? error.message : String(error) });
    throw error; // Re-throw for critical initialization errors
  }
}

/**
 * Update the game timestamp - Pure function with validation
 */
export function updateTimestamp(state: GameState): GameState {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for updateTimestamp', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    return { ...state, t: Date.now() };
  } catch (error) {
    stateErrorHandler('Failed to update timestamp', { error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Get a resource value safely, returning 0 if not found
 */
export function getResource(state: GameState, resourceKey: ResourceKey): number {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getResource', { state: typeof state });
      return 0;
    }
    
    if (!resourceKey || typeof resourceKey !== 'string') {
      validationHandler('Invalid resource key for getResource', { resourceKey: typeof resourceKey, value: resourceKey });
      return 0;
    }

    return state.resources[resourceKey] || 0;
  } catch (error) {
    stateErrorHandler('Failed to get resource', { resourceKey, error: error instanceof Error ? error.message : String(error) });
    return 0; // Return 0 on error for safety
  }
}

/**
 * Set a resource value - Pure function with validation
 */
export function setResource(state: GameState, resourceKey: ResourceKey, value: number): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for setResource', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!resourceKey || typeof resourceKey !== 'string') {
      validationHandler('Invalid resource key for setResource', { resourceKey: typeof resourceKey, value: resourceKey });
      throw new Error('Invalid resource key');
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
      validationHandler('Invalid value for setResource', { value, type: typeof value });
      throw new Error('Invalid value');
    }

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
  } catch (error) {
    stateErrorHandler('Failed to set resource', { resourceKey, value, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Optimized state update functions using structural sharing
 */

/**
 * Update a resource value with structural sharing - Pure function with validation
 */
export function updateResource(state: GameState, resourceKey: ResourceKey, value: number): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for updateResource', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!resourceKey || typeof resourceKey !== 'string') {
      validationHandler('Invalid resource key for updateResource', { resourceKey: typeof resourceKey, value: resourceKey });
      throw new Error('Invalid resource key');
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
      validationHandler('Invalid value for updateResource', { value, type: typeof value });
      throw new Error('Invalid value');
    }

    const currentValue = state.resources[resourceKey] || 0;
    if (currentValue === value) return state;
    
    return {
      ...state,
      resources: {
        ...state.resources,
        [resourceKey]: Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value)
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to update resource', { resourceKey, value, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Update multiple resources at once - Pure function with validation
 */
export function updateMultipleResources(state: GameState, updates: ResourceCost): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for updateMultipleResources', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!updates || typeof updates !== 'object') {
      validationHandler('Invalid updates parameter for updateMultipleResources', { updates: typeof updates });
      throw new Error('Invalid updates parameter');
    }

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
  } catch (error) {
    stateErrorHandler('Failed to update multiple resources', { error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
}

/**
 * Update building count with structural sharing - Pure function with validation
 */
export function updateBuildingCount(state: GameState, buildingKey: BuildingKey, count: number): GameState {
  try {
    // Validate inputs
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for updateBuildingCount', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    if (!buildingKey || typeof buildingKey !== 'string') {
      validationHandler('Invalid building key for updateBuildingCount', { buildingKey: typeof buildingKey, value: buildingKey });
      throw new Error('Invalid building key');
    }
    
    if (typeof count !== 'number' || isNaN(count) || count < 0) {
      validationHandler('Invalid count for updateBuildingCount', { count, type: typeof count });
      throw new Error('Invalid count');
    }

    const currentCount = state.buildings[buildingKey] || 0;
    if (currentCount === count) return state;
    
    return {
      ...state,
      buildings: {
        ...state.buildings,
        [buildingKey]: Math.max(0, count)
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to update building count', { buildingKey, count, error: error instanceof Error ? error.message : String(error) });
    return state; // Return original state on error
  }
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
 * Add resources to the game state - Pure function with lifetime resource tracking
 */
export function addResources(state: GameState, obj: ResourceProduction): GameState {
  if (Object.keys(obj).length === 0) return state;
  
  const resourceUpdates: Partial<Record<ResourceKey, number>> = {};
  const lifetimeUpdates: Partial<Record<ResourceKey, number>> = {};
  let hasChanges = false;
  let hasLifetimeChanges = false;
  
  for (const r in obj) {
    const rk = r as ResourceKey;
    const current = state.resources[rk] || 0;
    const delta = obj[rk] || 0;
    const newValue = current + delta;
    
    if (delta !== 0) {
      resourceUpdates[rk] = newValue;
      hasChanges = true;
      
      // Track lifetime resources for statistics and prestige calculations
      if (delta > 0) {
        const currentLifetime = state.lifetime[rk] || 0;
        const newLifetime = currentLifetime + delta;
        lifetimeUpdates[rk] = newLifetime;
        hasLifetimeChanges = true;
      }
    }
  }
  
  if (!hasChanges) return state;
  
  // Update resources
  let newState = {
    ...state,
    resources: {
      ...state.resources,
      ...resourceUpdates
    }
  };
  
  // Update lifetime resources if any were gained
  if (hasLifetimeChanges) {
    newState = {
      ...newState,
      lifetime: { ...newState.lifetime, ...lifetimeUpdates }
    };
  }
  
  return newState;
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
  const building = BUILDINGS[buildingKey];
  if (!building || !building.requiresTech) return true;
  return hasAllRequiredTechnologiesForBuilding(state, building.requiresTech);
}

/**
 * Get all unlocked buildings
 */
export function getUnlockedBuildings(state: GameState): BuildingKey[] {
  const validKeys: BuildingKey[] = [];
  for (const buildingKey of Object.keys(BUILDINGS)) {
    if (!isValidBuildingKey(buildingKey)) {
      logInvalidKey(buildingKey, 'building', 'gameState');
      continue;
    }
    if (isBuildingUnlocked(state, buildingKey as BuildingKey)) {
      validKeys.push(buildingKey as BuildingKey);
    }
  }
  return validKeys;
}
