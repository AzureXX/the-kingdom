/**
 * Cross-reference validation utilities for the game
 * Provides comprehensive validation of the entire game configuration
 * 
 * @remarks
 * This module handles validation of:
 * - Complete game configuration validation
 * - Cross-references between different configuration types
 * - Data integrity and consistency
 * - Validation result formatting
 * 
 * @example
 * ```typescript
 * 
 * // Validate complete game configuration
 * const validationResult = validateGameConfig({
 *   resources: RESOURCES,
 *   buildings: BUILDINGS,
 *   technologies: TECHNOLOGIES,
 *   actions: ACTIONS
 * });
 * 
 * }
 * ```
 */

import type { 
  ResourceKey, 
  ResourceDef,
  BuildingKey, 
  BuildingDef,
  TechnologyKey, 
  TechnologyDef,
  ActionKey, 
  ActionDef,
  LoopActionKey,
  LoopActionDef
} from '../../types';

// Import validation types and individual validation functions
import type { ValidationResult } from '@/lib/game/utils/validation/resourceValidation';
import { validateResources } from '@/lib/game/utils/validation/resourceValidation';
import { validateBuildings } from '@/lib/game/utils/validation/buildingValidation';
import { validateTechnologies } from '@/lib/game/utils/validation/technologyValidation';
import { validateActions } from '@/lib/game/utils/validation/actionValidation';
import { validateResourceOperation } from '@/lib/game/utils/validation/resourceValidation';

/**
 * Validates loop action definitions for completeness and correctness.
 * 
 * @param loopActions - Object containing loop action definitions
 * @param allKeys - Array of all valid loop action keys
 * @param availableResources - Array of available resource keys
 * @param availableBuildings - Array of available building keys
 * @param availableTechnologies - Array of available technology keys
 * @returns Validation result with errors and warnings
 */
function validateLoopActions(
  loopActions: Record<LoopActionKey, LoopActionDef>,
  allKeys: LoopActionKey[],
  availableResources: ResourceKey[],
): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Check if all required loop action keys are present
  for (const key of allKeys) {
    if (!loopActions[key]) {
      result.errors.push({
        type: 'error',
        category: 'loopAction',
        message: `Missing loop action definition for key: ${key}`,
        details: { missingKey: key }
      });
      result.isValid = false;
    }
  }

  // Validate each loop action definition
  for (const [key, loopAction] of Object.entries(loopActions)) {
    if (!allKeys.includes(key as LoopActionKey)) {
      result.warnings.push({
        type: 'warning',
        category: 'loopAction',
        message: `Unused loop action key: ${key}`,
        details: { unusedKey: key }
      });
    }

    // Validate required fields
    if (!loopAction.name || typeof loopAction.name !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'loopAction',
        message: `Loop action ${key} has invalid or missing name`,
        details: { loopActionKey: key, name: loopAction.name }
      });
      result.isValid = false;
    }

    if (!loopAction.icon || typeof loopAction.icon !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'loopAction',
        message: `Loop action ${key} has invalid or missing icon`,
        details: { loopActionKey: key, icon: loopAction.icon }
      });
      result.isValid = false;
    }

    if (!loopAction.description || typeof loopAction.description !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'loopAction',
        message: `Loop action ${key} has invalid or missing description`,
        details: { loopActionKey: key, description: loopAction.description }
      });
      result.isValid = false;
    }

    // Validate cost structure (cost is optional for loop actions)
    if (loopAction.cost) {
      const costValidation = validateResourceOperation(loopAction.cost, 'cost', availableResources);
      if (!costValidation.isValid) {
        result.errors.push(...costValidation.errors.map(err => ({
          ...err,
          message: `Loop action ${key} has invalid cost: ${err.message}`,
          details: { ...err.details, loopActionKey: key }
        })));
        result.isValid = false;
      }
    }

    // Validate gains structure
    const gainsValidation = validateResourceOperation(loopAction.gains, 'production', availableResources);
    if (!gainsValidation.isValid) {
      result.errors.push(...gainsValidation.errors.map(err => ({
        ...err,
        message: `Loop action ${key} has invalid gains: ${err.message}`,
        details: { ...err.details, loopActionKey: key }
      })));
      result.isValid = false;
    }

    // Validate loopPointsRequired
    if (typeof loopAction.loopPointsRequired !== 'number' || loopAction.loopPointsRequired < 0) {
      result.errors.push({
        type: 'error',
        category: 'loopAction',
        message: `Loop action ${key} has invalid loopPointsRequired: ${loopAction.loopPointsRequired}`,
        details: { loopActionKey: key, loopPointsRequired: loopAction.loopPointsRequired }
      });
      result.isValid = false;
    }

    // Validate loopCategory
    const validCategories = ['gathering', 'crafting', 'research', 'military'];
    if (!validCategories.includes(loopAction.loopCategory)) {
      result.errors.push({
        type: 'error',
        category: 'loopAction',
        message: `Loop action ${key} has invalid loopCategory: ${loopAction.loopCategory}`,
        details: { loopActionKey: key, loopCategory: loopAction.loopCategory, validCategories }
      });
      result.isValid = false;
    }
  }

  return result;
}

/**
 * Performs comprehensive validation of the entire game configuration.
 * This is the main entry point for configuration validation.
 * 
 * @param config - Complete game configuration object to validate
 * @returns Validation result with all errors and warnings found
 * 
 * @example
 * ```typescript
 * 
 * const validationResult = validateGameConfig({
 *   resources: RESOURCES,
 *   buildings: BUILDINGS,
 *   technologies: TECHNOLOGIES,
 *   actions: ACTIONS
 * });
 * 
 * ```
 * 
 * @remarks
 * This function validates:
 * - Individual configuration sections (resources, buildings, technologies, actions)
 * - Cross-references between different configuration types
 * - Data integrity and consistency
 * - Required fields and data types
 * 
 * The validation is comprehensive and will catch most configuration issues
 * before they cause runtime errors.
 */
export function validateGameConfig(config: {
  resources: Record<ResourceKey, ResourceDef>;
  buildings: Record<BuildingKey, BuildingDef>;
  technologies: Record<TechnologyKey, TechnologyDef>;
  actions: Record<ActionKey, ActionDef>;
  loopActions?: Record<LoopActionKey, LoopActionDef>;
}): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Get all available keys
  const resourceKeys = Object.keys(config.resources) as ResourceKey[];
  const buildingKeys = Object.keys(config.buildings) as BuildingKey[];
  const technologyKeys = Object.keys(config.technologies) as TechnologyKey[];
  const actionKeys = Object.keys(config.actions) as ActionKey[];
  const loopActionKeys = config.loopActions ? Object.keys(config.loopActions) as LoopActionKey[] : [];

  // Validate each configuration section
  const resourceValidation = validateResources(config.resources, resourceKeys);
  const buildingValidation = validateBuildings(config.buildings, buildingKeys, resourceKeys, technologyKeys);
  const technologyValidation = validateTechnologies(config.technologies, technologyKeys, resourceKeys, buildingKeys);
  const actionValidation = validateActions(config.actions, actionKeys, resourceKeys, buildingKeys, technologyKeys);
  
  // Validate loop actions if provided
  const loopActionValidation = config.loopActions ? validateLoopActions(config.loopActions, loopActionKeys, resourceKeys) : { isValid: true, errors: [], warnings: [] };

  // Combine all validation results
  result.errors.push(...resourceValidation.errors);
  result.errors.push(...buildingValidation.errors);
  result.errors.push(...technologyValidation.errors);
  result.errors.push(...actionValidation.errors);
  result.errors.push(...loopActionValidation.errors);

  result.warnings.push(...resourceValidation.warnings);
  result.warnings.push(...buildingValidation.warnings);
  result.warnings.push(...technologyValidation.warnings);
  result.warnings.push(...actionValidation.warnings);
  result.warnings.push(...loopActionValidation.warnings);

  result.isValid = result.errors.length === 0;

  return result;
}

/**
 * Formats validation results into a human-readable string for display.
 * Useful for logging, debugging, and user feedback.
 * 
 * @param results - Validation results to format
 * @returns Formatted string representation of validation results
 * 
 * @example
 * ```typescript
 * const results = validateGameConfig(config);
 * const formatted = formatValidationResults(results);
 * ```
 * 
 * @remarks
 * The formatted output includes:
 * - Error count and details
 * - Warning count and details  
 * - Overall validation status
 * - Clear visual indicators (✅, ❌, ⚠️)
 */
export function formatValidationResults(results: ValidationResult): string {
  let output = '';

  if (results.errors.length > 0) {
    output += `❌ Configuration Errors (${results.errors.length}):\n`;
    for (const error of results.errors) {
      output += `  • ${error.category.toUpperCase()}: ${error.message}\n`;
    }
    output += '\n';
  }

  if (results.warnings.length > 0) {
    output += `⚠️  Configuration Warnings (${results.warnings.length}):\n`;
    for (const warning of results.warnings) {
      output += `  • ${warning.category.toUpperCase()}: ${warning.message}\n`;
    }
    output += '\n';
  }

  if (results.errors.length === 0 && results.warnings.length === 0) {
    output += '✅ Configuration is valid with no issues.\n';
  } else if (results.errors.length === 0) {
    output += '✅ Configuration is valid with warnings.\n';
  } else {
    output += '❌ Configuration has errors and cannot be used.\n';
  }

  return output;
}
