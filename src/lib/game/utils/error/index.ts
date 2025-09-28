// Error utilities exports

// Handlers
export { 
  handleGameError,
  createErrorHandler,
  createValidationErrorHandler,
  createCalculationErrorHandler,
  createStateErrorHandler
} from '@/lib/game/utils/error/handlers';

// Logging
export { 
  logMessage,
  logInvalidKey,
  logConfigValidation,
  logSaveOperation,
  logErrorBoundaryOperation,
  logGameError
} from '@/lib/game/utils/error/logging';
