/**
 * Configuration validation utilities for the game
 * Provides comprehensive validation for all game configuration objects
 * 
 * @remarks
 * This module provides a complete validation system for game configuration:
 * - Resource definitions validation
 * - Building definitions validation  
 * - Technology definitions validation
 * - Action definitions validation
 * - Cross-reference validation
 * - Comprehensive error reporting
 * 
 * @example
 * ```typescript
 * import { validateGameConfig } from './validationUtils';
 * 
 * const result = validateGameConfig({
 *   resources: RESOURCES,
 *   buildings: BUILDINGS,
 *   technologies: TECHNOLOGIES,
 *   actions: ACTIONS
 * });
 * 
 * if (result.isValid) {
 *   console.log('✅ Configuration is valid');
 * } else {
 *   console.error('❌ Configuration errors:', result.errors);
 * }
 * ```
 */

import type { 
  ResourceKey, 
  BuildingKey, 
  TechnologyKey, 
  ActionKey,
  ResourceDef,
  BuildingDef,
  TechnologyDef,
  ActionDef,
  ResourceCost,
  ResourceProduction,
  ResourceConsumption
} from '../types';

// Simple validation functions for individual keys
/**
 * Validates if a string is a valid resource key.
 * 
 * @param key - The string to validate
 * @returns True if the key is a valid resource key, false otherwise
 * 
 * @example
 * ```typescript
 * isValidResourceKey('gold');     // Returns: true
 * isValidResourceKey('invalid');  // Returns: false
 * ```
 */
export function isValidResourceKey(key: string): key is ResourceKey {
  return ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'].includes(key as ResourceKey);
}

/**
 * Validates if a string is a valid building key.
 * 
 * @param key - The string to validate
 * @returns True if the key is a valid building key, false otherwise
 * 
 * @example
 * ```typescript
 * isValidBuildingKey('woodcutter');  // Returns: true
 * isValidBuildingKey('invalid');     // Returns: false
 * ```
 */
export function isValidBuildingKey(key: string): key is BuildingKey {
  return ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory'].includes(key as BuildingKey);
}

/**
 * Validates if a string is a valid technology key.
 * 
 * @param key - The string to validate
 * @returns True if the key is a valid technology key, false otherwise
 * 
 * @example
 * ```typescript
 * isValidTechnologyKey('writing');   // Returns: true
 * isValidTechnologyKey('invalid');   // Returns: false
 * ```
 */
export function isValidTechnologyKey(key: string): key is TechnologyKey {
  return ['writing', 'mathematics', 'engineering', 'chemistry', 'physics', 'biology'].includes(key as TechnologyKey);
}

// Validation result types
/**
 * Result of a validation operation containing errors and warnings.
 * 
 * @remarks
 * - `isValid`: True if no errors were found, false otherwise
 * - `errors`: Array of validation errors that prevent the configuration from being valid
 * - `warnings`: Array of validation warnings that don't prevent validity but indicate potential issues
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * Represents a validation error that prevents the configuration from being valid.
 * 
 * @remarks
 * Errors are critical issues that must be fixed before the configuration can be used.
 * Examples: missing required fields, invalid data types, broken references.
 */
export interface ValidationError {
  type: 'error';
  category: 'resource' | 'building' | 'technology' | 'action' | 'general';
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Represents a validation warning that doesn't prevent validity but indicates potential issues.
 * 
 * @remarks
 * Warnings are non-critical issues that should be reviewed.
 * Examples: unused keys, deprecated patterns, performance concerns.
 */
export interface ValidationWarning {
  type: 'warning';
  category: 'resource' | 'building' | 'technology' | 'action' | 'general';
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Validates resource definitions for completeness and correctness.
 * 
 * @param resources - Record of resource definitions to validate
 * @param allKeys - Array of all expected resource keys
 * @returns Validation result with any errors or warnings found
 * 
 * @example
 * ```typescript
 * const result = validateResources(RESOURCES, ['gold', 'wood', 'stone']);
 * if (!result.isValid) {
 *   console.error('Resource validation failed:', result.errors);
 * }
 * ```
 * 
 * @remarks
 * Validates:
 * - All required resource keys are present
 * - Required fields (name, icon, decimals, start) are valid
 * - Data types are correct
 * - Values are within acceptable ranges
 */
export function validateResources(
  resources: Record<ResourceKey, ResourceDef>,
  allKeys: ResourceKey[]
): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Check if all required resource keys are present
  for (const key of allKeys) {
    if (!resources[key]) {
      result.errors.push({
        type: 'error',
        category: 'resource',
        message: `Missing resource definition for key: ${key}`,
        details: { missingKey: key }
      });
      result.isValid = false;
    }
  }

  // Validate each resource definition
  for (const [key, resource] of Object.entries(resources)) {
    if (!allKeys.includes(key as ResourceKey)) {
      result.warnings.push({
        type: 'warning',
        category: 'resource',
        message: `Unused resource key: ${key}`,
        details: { unusedKey: key }
      });
    }

    // Validate required fields
    if (!resource.name || typeof resource.name !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'resource',
        message: `Resource ${key} has invalid or missing name`,
        details: { resourceKey: key, name: resource.name }
      });
      result.isValid = false;
    }

    if (!resource.icon || typeof resource.icon !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'resource',
        message: `Resource ${key} has invalid or missing icon`,
        details: { resourceKey: key, icon: resource.icon }
      });
      result.isValid = false;
    }

    if (typeof resource.decimals !== 'number' || resource.decimals < 0) {
      result.errors.push({
        type: 'error',
        category: 'resource',
        message: `Resource ${key} has invalid decimals value`,
        details: { resourceKey: key, decimals: resource.decimals }
      });
      result.isValid = false;
    }

    if (typeof resource.start !== 'number' || resource.start < 0) {
      result.errors.push({
        type: 'error',
        category: 'resource',
        message: `Resource ${key} has invalid start value`,
        details: { resourceKey: key, start: resource.start }
      });
      result.isValid = false;
    }
  }

  return result;
}

/**
 * Validate building definitions
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

/**
 * Validate technology definitions
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

/**
 * Validate action definitions
 */
export function validateActions(
  actions: Record<ActionKey, ActionDef>,
  allKeys: ActionKey[],
  availableResources: ResourceKey[],
  availableBuildings: BuildingKey[],
  availableTechnologies: TechnologyKey[]
): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  // Check if all required action keys are present
  for (const key of allKeys) {
    if (!actions[key]) {
      result.errors.push({
        type: 'error',
        category: 'action',
        message: `Missing action definition for key: ${key}`,
        details: { missingKey: key }
      });
      result.isValid = false;
    }
  }

  // Validate each action definition
  for (const [key, action] of Object.entries(actions)) {
    if (!allKeys.includes(key as ActionKey)) {
      result.warnings.push({
        type: 'warning',
        category: 'action',
        message: `Unused action key: ${key}`,
        details: { unusedKey: key }
      });
    }

    // Validate required fields
    if (!action.name || typeof action.name !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'action',
        message: `Action ${key} has invalid or missing name`,
        details: { actionKey: key, name: action.name }
      });
      result.isValid = false;
    }

    if (!action.icon || typeof action.icon !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'action',
        message: `Action ${key} has invalid or missing icon`,
        details: { actionKey: key, icon: action.icon }
      });
      result.isValid = false;
    }

    if (!action.description || typeof action.description !== 'string') {
      result.errors.push({
        type: 'error',
        category: 'action',
        message: `Action ${key} has invalid or missing description`,
        details: { actionKey: key, description: action.description }
      });
      result.isValid = false;
    }

    // Validate cost structure (cost is optional for actions)
    if (action.cost) {
      const costValidation = validateResourceOperation(action.cost, 'cost', availableResources);
      if (!costValidation.isValid) {
        result.errors.push(...costValidation.errors.map(err => ({
          ...err,
          message: `Action ${key} has invalid cost: ${err.message}`,
          details: { ...err.details, actionKey: key }
        })));
        result.isValid = false;
      }
    }

    // Validate gains structure
    const gainsValidation = validateResourceOperation(action.gains, 'production', availableResources);
    if (!gainsValidation.isValid) {
      result.errors.push(...gainsValidation.errors.map(err => ({
        ...err,
        message: `Action ${key} has invalid gains: ${err.message}`,
        details: { ...err.details, actionKey: key }
      })));
      result.isValid = false;
    }

    // Validate unlock conditions
    if (action.unlockConditions) {
      for (const condition of action.unlockConditions) {
        if (condition.type === 'resource' && !availableResources.includes(condition.key as ResourceKey)) {
          result.errors.push({
            type: 'error',
            category: 'action',
            message: `Action ${key} has unlock condition for unknown resource: ${condition.key}`,
            details: { actionKey: key, condition, availableResources }
          });
          result.isValid = false;
        }
        if (condition.type === 'building' && !availableBuildings.includes(condition.key as BuildingKey)) {
          result.errors.push({
            type: 'error',
            category: 'action',
            message: `Action ${key} has unlock condition for unknown building: ${condition.key}`,
            details: { actionKey: key, condition, availableBuildings }
          });
          result.isValid = false;
        }
        if (condition.type === 'technology' && !availableTechnologies.includes(condition.key as TechnologyKey)) {
          result.errors.push({
            type: 'error',
            category: 'action',
            message: `Action ${key} has unlock condition for unknown technology: ${condition.key}`,
            details: { actionKey: key, condition, availableTechnologies }
          });
          result.isValid = false;
        }
      }
    }
  }

  return result;
}

/**
 * Validate resource operations (cost, production, consumption)
 */
function validateResourceOperation(
  operation: ResourceCost | ResourceProduction | ResourceConsumption,
  operationType: 'cost' | 'production' | 'consumption',
  availableResources: ResourceKey[]
): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };

  if (!operation || typeof operation !== 'object') {
    result.errors.push({
      type: 'error',
      category: 'general',
      message: `Invalid ${operationType} structure`,
      details: { operationType, operation }
    });
    result.isValid = false;
    return result;
  }

  for (const [resourceKey, amount] of Object.entries(operation)) {
    // Check if resource key is valid
    if (!availableResources.includes(resourceKey as ResourceKey)) {
      result.errors.push({
        type: 'error',
        category: 'general',
        message: `Unknown resource key in ${operationType}: ${resourceKey}`,
        details: { operationType, resourceKey, availableResources }
      });
      result.isValid = false;
    }

    // Check if amount is valid
    if (typeof amount !== 'number' || amount < 0) {
      result.errors.push({
        type: 'error',
        category: 'general',
        message: `Invalid amount in ${operationType} for resource ${resourceKey}`,
        details: { operationType, resourceKey, amount }
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
 * import { validateGameConfig } from './validationUtils';
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
    output += `⚠️  Configuration Warnings (${results.warnings}):\n`;
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
