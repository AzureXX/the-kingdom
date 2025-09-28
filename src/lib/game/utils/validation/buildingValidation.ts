/**
 * Building validation utilities for the game
 * Provides validation for building definitions
 * 
 * @remarks
 * This module handles validation of:
 * - Building key validation
 * - Building definition validation
 * - Building cost, production, and consumption validation
 * - Building technology requirements validation
 * 
 * ```typescript
 * 
 * // Validate a building key
 * 
 * // Validate building definitions
 * const result = validateBuildings(BUILDINGS, buildingKeys, resourceKeys, techKeys);
 * ```
 */

import type { 
  BuildingKey, 
  BuildingDef,
  ResourceKey,
  TechnologyKey
} from '@/lib/game/types';

// Import validation types and resource operation validation
import type { ValidationResult } from '@/lib/game/utils/validation/resourceValidation';
import { validateResourceOperation } from '@/lib/game/utils/validation/resourceValidation';

/**
 * Validates if a string is a valid building key.
 * 
 * @param key - The string to validate
 * @returns True if the key is a valid building key, false otherwise
 * 
 */
export function isValidBuildingKey(key: string): key is BuildingKey {
  return ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory'].includes(key as BuildingKey);
}

/**
 * Validates building definitions for completeness and correctness.
 * 
 * @param buildings - Object containing building definitions
 * @param allKeys - Array of all valid building keys
 * @param availableResources - Array of available resource keys
 * @param availableTechnologies - Array of available technology keys
 * @returns Validation result with errors and warnings
 * 
 * @remarks
 * This function validates:
 * - All required building keys are present
 * - Building definitions have required fields
 * - Cost, production, and consumption structures are valid
 * - Technology requirements are valid
 * - Cost scaling values are valid
 * 
 */
export function validateBuildings(
  buildings: Record<BuildingKey, BuildingDef>,
  allKeys: BuildingKey[],
  availableResources: ResourceKey[],
  availableTechnologies: TechnologyKey[]
): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Check if all required building keys are present
  for (const key of allKeys) {
    if (!buildings[key]) {
      result.errors.push({
        type: 'error',
        category: 'building',
        message: `Missing building definition for key: ${key}`,
        details: { missingKey: key }
      });
      result.isValid = false;
    }
  }

  // Validate each building definition
  for (const [key, building] of Object.entries(buildings)) {
    if (!allKeys.includes(key as BuildingKey)) {
      result.warnings.push({
        type: 'warning',
        category: 'building',
        message: `Unused building key: ${key}`,
        details: { unusedKey: key }
      });
    }

    // Validate required fields
    if (!building.name || typeof building.name !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'building',
        message: `Building ${key} has invalid or missing name`,
        details: { buildingKey: key, name: building.name }
      });
      result.isValid = false;
    }

    if (!building.icon || typeof building.icon !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'building',
        message: `Building ${key} has invalid or missing icon`,
        details: { buildingKey: key, icon: building.icon }
      });
      result.isValid = false;
    }

    if (!building.desc || typeof building.desc !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'building',
        message: `Building ${key} has invalid or missing description`,
        details: { buildingKey: key, desc: building.desc }
      });
      result.isValid = false;
    }

    // Validate cost structure
    const costValidation = validateResourceOperation(building.baseCost, 'cost', availableResources);
    if (!costValidation.isValid) {
      result.errors.push(...costValidation.errors.map(err => ({
        ...err,
        message: `Building ${key} has invalid cost: ${err.message}`,
        details: { ...err.details, buildingKey: key }
      })));
      result.isValid = false;
    }

    // Validate production structure
    const productionValidation = validateResourceOperation(building.baseProd, 'production', availableResources);
    if (!productionValidation.isValid) {
      result.errors.push(...productionValidation.errors.map(err => ({
        ...err,
        message: `Building ${key} has invalid production: ${err.message}`,
        details: { ...err.details, buildingKey: key }
      })));
      result.isValid = false;
    }

    // Validate consumption structure
    const consumptionValidation = validateResourceOperation(building.baseUse, 'consumption', availableResources);
    if (!consumptionValidation.isValid) {
      result.errors.push(...consumptionValidation.errors.map(err => ({
        ...err,
        message: `Building ${key} has invalid consumption: ${err.message}`,
        details: { ...err.details, buildingKey: key }
      })));
      result.isValid = false;
    }

    // Validate cost scaling
    if (typeof building.costScale !== 'number' || building.costScale <= 1) {
      result.errors.push({
        type: 'error',
        category: 'building',
        message: `Building ${key} has invalid cost scale (must be > 1)`,
        details: { buildingKey: key, costScale: building.costScale }
      });
      result.isValid = false;
    }

    // Validate technology requirements
    if (building.requiresTech) {
      for (const techKey of building.requiresTech) {
        if (!availableTechnologies.includes(techKey)) {
          result.errors.push({
            type: 'error',
            category: 'building',
            message: `Building ${key} requires unknown technology: ${techKey}`,
            details: { buildingKey: key, requiredTech: techKey, availableTechs: availableTechnologies }
          });
          result.isValid = false;
        }
      }
    }
  }

  return result;
}
