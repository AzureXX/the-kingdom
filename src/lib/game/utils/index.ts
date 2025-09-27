/**
 * Game Utilities - Organized by Category
 * 
 * This module provides a centralized export point for all game utility functions,
 * organized by logical categories for better discoverability and usage.
 */

// ============================================================================
// CORE UTILITIES
// ============================================================================

// Number manipulation and formatting
export { clamp, formatNumber } from './numberUtils';

// String processing and encoding
export { safeJsonParse, encodeBase64, decodeBase64 } from './stringUtils';

// Performance optimization utilities
export { 
  debounce, 
  throttle, 
  calculateMovingAverage, 
  detectPerformanceAnomalies, 
  formatPerformanceMetric, 
  formatBytes,
  checkPerformanceBudget,
  type PerformanceBudget
} from './performanceUtils';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

// Core validation types and functions
export { 
  isValidResourceKey, 
  validateResources,
  validateResourceOperation,
  type ValidationResult,
  type ValidationError,
  type ValidationWarning
} from './validation/resourceValidation';

// Building validation
export { 
  isValidBuildingKey, 
  validateBuildings
} from './validation/buildingValidation';

// Technology validation
export { 
  isValidTechnologyKey,
  validateTechnologies
} from './validation/technologyValidation';

// Action validation
export { 
  validateActions
} from './validation/actionValidation';

// Cross-reference and comprehensive validation
export { 
  validateGameConfig,
  formatValidationResults
} from './validation/crossReferenceValidation';

// ============================================================================
// GAME-SPECIFIC UTILITIES
// ============================================================================

// Action validation and checking
export { ActionValidator } from './actionValidation';

// Loop action calculations and progress tracking
export { 
  calculatePointsPerTick,
  calculateProgress,
  calculateLoopActionEfficiency,
  getLoopActionStats
} from './loopActionCalculations';

// Game state migration utilities
export { 
  migrateGameState,
  needsMigration
} from './migrationUtils';

// ============================================================================
// ERROR HANDLING AND LOGGING
// ============================================================================

// Centralized error handling and logging
export { 
  handleGameError,
  createValidationErrorHandler,
  createCalculationErrorHandler,
  createStateErrorHandler,
  logMessage,
  logInvalidKey,
  logConfigValidation,
  logSaveOperation,
  logErrorBoundaryOperation,
  logGameError,
  type ErrorLogOptions,
  type ErrorCategory,
  type GameError
} from './errorLogger';
