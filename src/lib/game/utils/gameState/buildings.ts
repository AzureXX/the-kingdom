// Building management logic

import type { BuildingKey } from '@/lib/game/types';
import { createValidationErrorHandler, createStateErrorHandler, logInvalidKey } from '@/lib/game/utils/error';
import { isValidBuildingKey } from '@/lib/game/utils/validation';
import { CONFIG } from '@/lib/game/config';
import type { GameState } from '@/lib/game/types';
import type { TechnologyKey } from '@/lib/game/types';

const { buildings: BUILDINGS } = CONFIG;

// Create specialized error handlers for game state
const validationHandler = createValidationErrorHandler('gameState');
const stateErrorHandler = createStateErrorHandler('gameState');

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
