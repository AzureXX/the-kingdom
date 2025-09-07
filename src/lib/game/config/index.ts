import { RESOURCES } from './resources';
import { BUILDINGS } from './buildings';
import { TECHNOLOGIES } from './technologies';
import { PRESTIGE_CONFIG } from './prestige';
import { EVENTS } from './events';
import { ACTIONS } from './actions';
import { LOOP_ACTIONS } from './loopActions';
import { ACHIEVEMENTS } from './achievements';
import { validateGameConfig, formatValidationResults } from '../utils/validationUtils';

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
      console.log('✅ Configuration validation passed');
      
      if (validationResult.warnings.length > 0) {
        console.warn(`⚠️  Found ${validationResult.warnings.length} configuration warnings:`);
        for (const warning of validationResult.warnings) {
          console.warn(`  ${warning.category}: ${warning.message}`, warning.details);
        }
      }
    } else {
      console.error('❌ Configuration validation failed');
      console.error(formatValidationResults(validationResult));
      
      // Log detailed errors for debugging
      for (const error of validationResult.errors) {
        console.error(`  ${error.category}: ${error.message}`, error.details);
      }
    }
  } catch (error) {
    console.error('💥 Configuration validation crashed:', error);
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
