/**
 * Resource validation utilities for the game
 * Provides validation for resource definitions and resource operations
 * 
 * @remarks
 * This module handles validation of:
 * - Resource key validation
 * - Resource definition validation
 * - Resource operation validation (cost, production, consumption)
 * 
 * @example
 * ```typescript
 * import { isValidResourceKey, validateResources } from './resourceValidation';
 * 
 * // Validate a resource key
 
 * // Validate resource definitions
 * const result = validateResources(RESOURCES, ['gold', 'wood', 'stone']);
 * ```
 */

import type { 
  ResourceKey, 
  ResourceDef,
  ResourceCost,
  ResourceProduction,
  ResourceConsumption
} from '../../types';

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
  category: 'resource' | 'building' | 'technology' | 'action' | 'loopAction' | 'general';
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
  category: 'resource' | 'building' | 'technology' | 'action' | 'loopAction' | 'general';
  message: string;
  details?: Record<string, unknown>;
}

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
 * Validates resource definitions for completeness and correctness.
 * 
 * @param resources - Object containing resource definitions
 * @param allKeys - Array of all valid resource keys
 * @returns Validation result with errors and warnings
 * 
 * @remarks
 * This function validates:
 * - All required resource keys are present
 * - Resource definitions have required fields
 * - Data types are correct
 * - Values are within acceptable ranges
 * 
 * @example
 * ```typescript
 * const result = validateResources(RESOURCES, ['gold', 'wood', 'stone']);
 * 
 * 
 * ```
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
 * Validate resource operations (cost, production, consumption)
 * 
 * @param operation - The resource operation to validate
 * @param operationType - Type of operation (cost, production, consumption)
 * @param availableResources - Array of available resource keys
 * @returns Validation result with errors and warnings
 * 
 * @remarks
 * This function validates:
 * - Operation structure is valid
 * - Resource keys are valid
 * - Amounts are valid numbers
 * - No negative amounts
 */
export function validateResourceOperation(
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
