import { CONFIG, type ResourceKey, type TechnologyKey } from './config';
import { GAME_CONSTANTS } from './constants';
import type { GameState } from './types';

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
      nextEventTime: Date.now() + (GAME_CONSTANTS.EVENT.INITIAL_MIN_INTERVAL_SECONDS + Math.random() * GAME_CONSTANTS.EVENT.INITIAL_MAX_INTERVAL_SECONDS) * 1000,
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
 * Update the game timestamp
 */
export function updateTimestamp(state: GameState): void {
  state.t = Date.now();
}

/**
 * Get a resource value safely, returning 0 if not found
 */
export function getResource(state: GameState, resourceKey: ResourceKey): number {
  return state.resources[resourceKey] || 0;
}

/**
 * Set a resource value
 */
export function setResource(state: GameState, resourceKey: ResourceKey, value: number): void {
  state.resources[resourceKey] = Math.max(GAME_CONSTANTS.GAME.MIN_RESOURCE_AMOUNT, value);
}

/**
 * Get building count safely, returning 0 if not found
 */
export function getBuildingCount(state: GameState, buildingKey: string): number {
  return state.buildings[buildingKey as keyof typeof state.buildings] || 0;
}

/**
 * Set building count
 */
export function setBuildingCount(state: GameState, buildingKey: string, count: number): void {
  state.buildings[buildingKey as keyof typeof state.buildings] = Math.max(0, count);
}

/**
 * Get upgrade level safely, returning 0 if not found
 */
export function getUpgradeLevel(state: GameState, upgradeKey: string): number {
  return state.upgrades[upgradeKey as keyof typeof state.upgrades] || 0;
}

/**
 * Set upgrade level
 */
export function setUpgradeLevel(state: GameState, upgradeKey: string, level: number): void {
  state.upgrades[upgradeKey as keyof typeof state.upgrades] = Math.max(0, level);
}

/**
 * Add resources to the game state
 */
export function addResources(state: GameState, obj: Partial<Record<ResourceKey, number>>): void {
  for (const r in obj) {
    const rk = r as ResourceKey;
    const current = getResource(state, rk);
    setResource(state, rk, current + (obj[rk] || 0));
  }
}

/**
 * Get technology level safely, returning 0 if not found
 */
export function getTechnologyLevel(state: GameState, technologyKey: string): number {
  return state.technologies[technologyKey as keyof typeof state.technologies] || 0;
}

/**
 * Set technology level
 */
export function setTechnologyLevel(state: GameState, technologyKey: string, level: number): void {
  state.technologies[technologyKey as keyof typeof state.technologies] = Math.max(0, level);
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
export function isBuildingUnlocked(state: GameState, buildingKey: string): boolean {
  const building = CONFIG.buildings[buildingKey as keyof typeof CONFIG.buildings];
  if (!building || !building.requiresTech) return true;
  return hasAllRequiredTechnologiesForBuilding(state, building.requiresTech);
}

/**
 * Get all unlocked buildings
 */
export function getUnlockedBuildings(state: GameState): string[] {
  return Object.keys(CONFIG.buildings).filter(buildingKey => 
    isBuildingUnlocked(state, buildingKey)
  );
}
