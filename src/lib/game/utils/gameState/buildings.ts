// Building management logic

import type { BuildingKey } from '@/lib/game/types';
import { createValidationErrorHandler, createStateErrorHandler, logInvalidKey } from '@/lib/game/utils/error';
import { isValidBuildingKey } from '@/lib/game/utils/validation';
import { CONFIG } from '@/lib/game/config';
import type { GameState } from '@/lib/game/types';

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
 * Check if a building is unlocked (all unlock conditions met OR already owned)
 */
export function isBuildingUnlocked(state: GameState, buildingKey: BuildingKey): boolean {
  const building = BUILDINGS[buildingKey];
  if (!building) return false;
  
  // If player already owns this building, it should always be visible
  const ownedCount = getBuildingCount(state, buildingKey);
  if (ownedCount > 0) {
    return true;
  }
  
  // If no unlock conditions, building is always available
  if (!building.unlockConditions || building.unlockConditions.length === 0) {
    return true;
  }
  
  // Check all unlock conditions
  return building.unlockConditions.every(condition => {
    switch (condition.type) {
      case 'technology':
        return state.technologies[condition.key] >= condition.value;
      case 'building':
        return getBuildingCount(state, condition.key) >= condition.value;
      case 'resource':
        return (state.resources[condition.key] || 0) >= condition.value;
      case 'prestige':
        return (state.upgrades[condition.key] || 0) >= condition.value;
      case 'achievement':
        return state.achievements.unlocked[condition.key] !== undefined;
      default:
        return true; // For unknown condition types, assume they're met
    }
  });
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
