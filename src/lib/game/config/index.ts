import { RESOURCES } from './resources';
import { BUILDINGS } from './buildings';
import { TECHNOLOGIES } from './technologies';
import { PRESTIGE_CONFIG } from './prestige';
import { EVENTS } from './events';
import { ACTIONS } from './actions';
import { LOOP_ACTIONS } from './loopActions';
import { ACHIEVEMENTS } from './achievements';
import { validateGameConfig, formatValidationResults } from '../utils/validation/crossReferenceValidation';
import { logMessage } from '../utils/errorLogger';

// Re-export all config objects
export {
  RESOURCES,
  BUILDINGS,
  TECHNOLOGIES,
  PRESTIGE_CONFIG,
  EVENTS,
  ACTIONS,
  LOOP_ACTIONS,
  ACHIEVEMENTS,
};

// Main game configuration object - stable reference to prevent recreation
export const CONFIG = Object.freeze({
  version: 1,
  resources: RESOURCES,
  buildings: BUILDINGS,
  technologies: TECHNOLOGIES,
  prestige: PRESTIGE_CONFIG,
  events: EVENTS,
  actions: ACTIONS,
  achievements: ACHIEVEMENTS,
});

export const SAVE_KEY = 'medieval-kingdom-v1';

/**
 * Validate the game configuration on startup
 * This runs validation checks and logs any issues found
 */
export function validateConfiguration(): void {
  console.group('🔍 Game Configuration Validation');
  
  try {
    const validationResult = validateGameConfig({
      resources: RESOURCES,
      buildings: BUILDINGS,
      technologies: TECHNOLOGIES,
      actions: ACTIONS,
    });

    if (validationResult.isValid) {
      logMessage('Configuration validation passed', { level: 'log', context: 'config' });
      
      if (validationResult.warnings.length > 0) {
        logMessage(`Found ${validationResult.warnings.length} configuration warnings`, { level: 'warn', context: 'config' });
        for (const warning of validationResult.warnings) {
          logMessage(`${warning.category}: ${warning.message}`, { level: 'warn', context: 'config', details: warning.details });
        }
      }
    } else {
      logMessage('Configuration validation failed', { level: 'error', context: 'config' });
      logMessage(formatValidationResults(validationResult), { level: 'error', context: 'config' });
      
      // Log detailed errors for debugging
      for (const error of validationResult.errors) {
        logMessage(`${error.category}: ${error.message}`, { level: 'error', context: 'config', details: error.details });
      }
    }
  } catch (error) {
    logMessage('Configuration validation crashed', { level: 'error', context: 'config', details: { error: error instanceof Error ? error.message : String(error) } });
  }
  
  console.groupEnd();
}

/**
 * Get configuration validation status
 * Returns validation results for programmatic use
 */
export function getConfigurationStatus() {
  try {
    return validateGameConfig({
      resources: RESOURCES,
      buildings: BUILDINGS,
      technologies: TECHNOLOGIES,
      actions: ACTIONS,
    });
  } catch (error) {
    return {
      isValid: false,
      errors: [{
        type: 'error' as const,
        category: 'general' as const,
        message: 'Configuration validation crashed',
        details: { error: error instanceof Error ? error.message : String(error) }
      }],
      warnings: []
    };
  }
}
