import type { ResourceKey, BuildingKey, TechnologyKey } from '../types';

/**
 * Type validation helpers for better runtime safety
 */
export function isValidResourceKey(key: string): key is ResourceKey {
  const validKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
  return validKeys.includes(key as ResourceKey);
}

export function isValidBuildingKey(key: string): key is BuildingKey {
  const validKeys: BuildingKey[] = ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory'];
  return validKeys.includes(key as BuildingKey);
}

export function isValidTechnologyKey(key: string): key is TechnologyKey {
  const validKeys: TechnologyKey[] = ['writing', 'mathematics', 'engineering', 'chemistry', 'physics', 'biology'];
  return validKeys.includes(key as TechnologyKey);
}

/**
 * Generic resource amount validation with type constraints
 */
export function validateResourceAmount<T extends ResourceKey>(
  resource: T, 
  amount: number
): amount is number {
  return typeof amount === 'number' && 
         !isNaN(amount) && 
         isFinite(amount) && 
         amount >= 0;
}

/**
 * Generic building key validation with type constraints
 */
export function validateBuildingKey<T extends BuildingKey>(
  building: T, 
  count: number
): count is number {
  return typeof count === 'number' && 
         !isNaN(count) && 
         isFinite(count) && 
         count >= 0;
}
