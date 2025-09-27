// Number utilities
export { clamp, formatNumber } from './numberUtils';

// String utilities
export { safeJsonParse, encodeBase64, decodeBase64 } from './stringUtils';

// Performance utilities
export { debounce } from './performanceUtils';

// Validation utilities
export { 
  isValidResourceKey, 
  validateResources,
  validateResourceOperation,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning
} from './validation/resourceValidation';

export { 
  isValidBuildingKey, 
  validateBuildings
} from './validation/buildingValidation';

export { 
  isValidTechnologyKey,
  validateTechnologies
} from './validation/technologyValidation';

export { 
  validateActions
} from './validation/actionValidation';

export { 
  validateGameConfig,
  formatValidationResults
} from './validation/crossReferenceValidation';
