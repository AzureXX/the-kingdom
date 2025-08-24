import type { ResourceKey, BuildingKey, TechnologyKey } from '../config';

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
