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
export { clamp, formatNumber } from '@/lib/game/utils/number';

// String processing and encoding
export { safeJsonParse, encodeBase64, decodeBase64 } from '@/lib/game/utils/string';

// Performance utilities - consolidated from performance folder
export {
  // Monitoring
  updatePerformanceMetrics,
  updateHistoricalData,
  calculateAverages,
  checkMetricsChanged,
  // Optimization
  debounce,
  throttle,
  calculateMovingAverage,
  detectPerformanceAnomalies,
  // Formatting
  formatBytes,
  formatPerformanceMetric,
  // Budget
  checkPerformanceBudget,
  type PerformanceBudget
} from '@/lib/game/utils/performance';

// Game calculation utilities
export { 
  calculateTechnologyCosts, 
  calculateUpgradeCosts, 
  calculateAllGameCalculations, 
  createMemoizedCostFor, 
  createMemoizedCanAfford 
} from '@/lib/game/utils/gameCalculations';

// Resource update utilities
export { 
  payResources, 
  applyResourceChanges, 
  addResourcesToState, 
  processResourceChanges, 
  calculateTimeBasedChanges 
} from '@/lib/game/utils/resourceUpdates';

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
} from '@/lib/game/utils/validation/resourceValidation';

// Building validation
export { 
  isValidBuildingKey, 
  validateBuildings
} from '@/lib/game/utils/validation/buildingValidation';

// Technology validation
export { 
  isValidTechnologyKey,
  validateTechnologies
} from '@/lib/game/utils/validation/technologyValidation';

// Action validation
export { 
  validateActions
} from '@/lib/game/utils/validation/actionValidation';

// Cross-reference and comprehensive validation
export { 
  validateGameConfig,
  formatValidationResults
} from '@/lib/game/utils/validation/crossReferenceValidation';

// ============================================================================
// GAME-SPECIFIC UTILITIES
// ============================================================================

// Action validation and checking
export { ActionChecker } from '@/lib/game/utils/actionChecker';

// Loop action calculations and progress tracking
export { 
  calculatePointsPerTick,
  calculateProgress,
  calculateLoopActionEfficiency,
  getLoopActionStats
} from '@/lib/game/utils/loopActionCalculations';

// Game state migration utilities
export { 
  migrateGameState,
  needsMigration
} from '@/lib/game/utils/migration';

// ============================================================================
// ERROR HANDLING AND LOGGING
// ============================================================================

// Centralized error handling and logging
export { 
  handleGameError,
  createErrorHandler,
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
} from '@/lib/game/utils/errorLogger';
