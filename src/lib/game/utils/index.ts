// Number utilities
export { clamp, formatNumber } from './numberUtils';

// String utilities
export { safeJsonParse, encodeBase64, decodeBase64 } from './stringUtils';

// Performance utilities
export { debounce } from './performanceUtils';

// Validation utilities
export { 
  isValidResourceKey, 
  isValidBuildingKey, 
  isValidTechnologyKey,
  validateGameConfig,
  validateResources,
  validateBuildings,
  validateTechnologies,
  validateActions,
  formatValidationResults,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning
} from './validationUtils';
