/**
 * Action validation utilities for the game
 * Provides validation for action definitions
 * 
 * @remarks
 * This module handles validation of:
 * - Action definition validation
 * - Action cost and gains validation
 * - Action unlock conditions validation
 * 
 */

import type { 
  ActionKey, 
  ActionDef,
  ResourceKey,
  BuildingKey,
  TechnologyKey
} from '@/lib/game/types';

// Import validation types and resource operation validation
import type { ValidationResult } from '@/lib/game/utils/validation/resourceValidation';
import { validateResourceOperation } from '@/lib/game/utils/validation/resourceValidation';

/**
 * Validates action definitions for completeness and correctness.
 * 
 * @param actions - Object containing action definitions
 * @param allKeys - Array of all valid action keys
 * @param availableResources - Array of available resource keys
 * @param availableBuildings - Array of available building keys
 * @param availableTechnologies - Array of available technology keys
 * @returns Validation result with errors and warnings
 * 
 * @remarks
 * This function validates:
 * - All required action keys are present
 * - Action definitions have required fields
 * - Cost and gains structures are valid
 * - Unlock conditions are valid
 * 
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
