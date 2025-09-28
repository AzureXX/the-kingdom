/**
 * Technology validation utilities for the game
 * Provides validation for technology definitions
 * 
 * @remarks
 * This module handles validation of:
 * - Technology key validation
 * - Technology definition validation
 * - Technology cost validation
 * - Technology requirements validation
 * - Technology building unlocks validation
 * 
 */

import type { 
  TechnologyKey, 
  TechnologyDef,
  ResourceKey,
  BuildingKey
} from '@/lib/game/types';

// Import validation types and resource operation validation
import type { ValidationResult } from '@/lib/game/utils/validation/resourceValidation';
import { validateResourceOperation } from '@/lib/game/utils/validation/resourceValidation';

/**
 * Validates if a string is a valid technology key.
 * 
 * @param key - The string to validate
 * @returns True if the key is a valid technology key, false otherwise
 * 
 */
export function isValidTechnologyKey(key: string): key is TechnologyKey {
  return ['writing', 'mathematics', 'engineering', 'chemistry', 'physics', 'biology'].includes(key as TechnologyKey);
}

/**
 * Validates technology definitions for completeness and correctness.
 * 
 * @param technologies - Object containing technology definitions
 * @param allKeys - Array of all valid technology keys
 * @param availableResources - Array of available resource keys
 * @param availableBuildings - Array of available building keys
 * @returns Validation result with errors and warnings
 * 
 * @remarks
 * This function validates:
 * - All required technology keys are present
 * - Technology definitions have required fields
 * - Cost structures are valid
 * - Technology requirements are valid
 * - Building unlocks are valid
 * 
 */
export function validateTechnologies(
  technologies: Record<TechnologyKey, TechnologyDef>,
  allKeys: TechnologyKey[],
  availableResources: ResourceKey[],
  availableBuildings: BuildingKey[]
): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Check if all required technology keys are present
  for (const key of allKeys) {
    if (!technologies[key]) {
      result.errors.push({
        type: 'error',
        category: 'technology',
        message: `Missing technology definition for key: ${key}`,
        details: { missingKey: key }
      });
      result.isValid = false;
    }
  }

  // Validate each technology definition
  for (const [key, technology] of Object.entries(technologies)) {
    if (!allKeys.includes(key as TechnologyKey)) {
      result.warnings.push({
        type: 'warning',
        category: 'technology',
        message: `Unused technology key: ${key}`,
        details: { unusedKey: key }
      });
    }

    // Validate required fields
    if (!technology.name || typeof technology.name !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'technology',
        message: `Technology ${key} has invalid or missing name`,
        details: { technologyKey: key, name: technology.name }
      });
      result.isValid = false;
    }

    if (!technology.icon || typeof technology.icon !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'technology',
        message: `Technology ${key} has invalid or missing icon`,
        details: { technologyKey: key, icon: technology.icon }
      });
      result.isValid = false;
    }

    if (!technology.desc || typeof technology.desc !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'technology',
        message: `Technology ${key} has invalid or missing description`,
        details: { technologyKey: key, desc: technology.desc }
      });
      result.isValid = false;
    }

    // Validate cost structure
    const costValidation = validateResourceOperation(technology.baseCost, 'cost', availableResources);
    if (!costValidation.isValid) {
      result.errors.push(...costValidation.errors.map(err => ({
        ...err,
        message: `Technology ${key} has invalid cost: ${err.message}`,
        details: { ...err.details, technologyKey: key }
      })));
      result.isValid = false;
    }

    // Validate building unlocks (technologies unlock buildings, not require them)
    if (technology.unlocksBuildings) {
      for (const buildingKey of technology.unlocksBuildings) {
        if (!availableBuildings.includes(buildingKey)) {
          result.warnings.push({
            type: 'warning',
            category: 'technology',
            message: `Technology ${key} unlocks unknown building: ${buildingKey}`,
            details: { technologyKey: key, unlockedBuilding: buildingKey, availableBuildings }
          });
        }
      }
    }

    // Validate technology requirements
    if (technology.requiresTech) {
      const requiredTechs = Array.isArray(technology.requiresTech) 
        ? technology.requiresTech 
        : [technology.requiresTech];
      
      for (const techKey of requiredTechs) {
        if (!allKeys.includes(techKey)) {
          result.errors.push({
            type: 'error',
            category: 'technology',
            message: `Technology ${key} requires unknown technology: ${techKey}`,
            details: { technologyKey: key, requiredTech: techKey, availableTechs: allKeys }
          });
          result.isValid = false;
        }
      }
    }
  }

  return result;
}
