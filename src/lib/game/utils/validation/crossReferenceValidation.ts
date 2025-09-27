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
 * import { validateGameConfig, formatValidationResults } from './crossReferenceValidation';
 * 
 * // Validate complete game configuration
 * const validationResult = validateGameConfig({
 *   resources: RESOURCES,
 *   buildings: BUILDINGS,
 *   technologies: TECHNOLOGIES,
 *   actions: ACTIONS
 * });
 * 
 * if (validationResult.isValid) {
 *   console.log('✅ Game configuration is valid');
 * } else {
 *   console.error('❌ Configuration validation failed:');
 *   validationResult.errors.forEach(error => {
 *     console.error(`  ${error.category}: ${error.message}`);
 *   });
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
  ActionDef
} from '../../types';

// Import validation types and individual validation functions
import type { ValidationResult } from './resourceValidation';
import { validateResources } from './resourceValidation';
import { validateBuildings } from './buildingValidation';
import { validateTechnologies } from './technologyValidation';
import { validateActions } from './actionValidation';

/**
 * Performs comprehensive validation of the entire game configuration.
 * This is the main entry point for configuration validation.
 * 
 * @param config - Complete game configuration object to validate
 * @returns Validation result with all errors and warnings found
 * 
 * @example
 * ```typescript
 * import { validateGameConfig } from './crossReferenceValidation';
 * 
 * const validationResult = validateGameConfig({
 *   resources: RESOURCES,
 *   buildings: BUILDINGS,
 *   technologies: TECHNOLOGIES,
 *   actions: ACTIONS
 * });
 * 
 * if (validationResult.isValid) {
 *   console.log('✅ Game configuration is valid');
 * } else {
 *   console.error('❌ Configuration validation failed:');
 *   validationResult.errors.forEach(error => {
 *     console.error(`  ${error.category}: ${error.message}`);
 *   });
 * }
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
}): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Get all available keys
  const resourceKeys = Object.keys(config.resources) as ResourceKey[];
  const buildingKeys = Object.keys(config.buildings) as BuildingKey[];
  const technologyKeys = Object.keys(config.technologies) as TechnologyKey[];
  const actionKeys = Object.keys(config.actions) as ActionKey[];

  // Validate each configuration section
  const resourceValidation = validateResources(config.resources, resourceKeys);
  const buildingValidation = validateBuildings(config.buildings, buildingKeys, resourceKeys, technologyKeys);
  const technologyValidation = validateTechnologies(config.technologies, technologyKeys, resourceKeys, buildingKeys);
  const actionValidation = validateActions(config.actions, actionKeys, resourceKeys, buildingKeys, technologyKeys);

  // Combine all validation results
  result.errors.push(...resourceValidation.errors);
  result.errors.push(...buildingValidation.errors);
  result.errors.push(...technologyValidation.errors);
  result.errors.push(...actionValidation.errors);

  result.warnings.push(...resourceValidation.warnings);
  result.warnings.push(...buildingValidation.warnings);
  result.warnings.push(...technologyValidation.warnings);
  result.warnings.push(...actionValidation.warnings);

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
 * console.log(formatted);
 * // Output:
 * // ❌ Configuration Errors (2):
 * //   • RESOURCE: Resource gold has invalid start value
 * //   • BUILDING: Building woodcutter requires unknown technology: invalid
 * // 
 * // ❌ Configuration has errors and cannot be used.
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
