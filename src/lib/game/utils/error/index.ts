// Error utilities exports

// Handlers
export { 
  createValidationErrorHandler,
  createCalculationErrorHandler,
  createStateErrorHandler
} from '@/lib/game/utils/error/handlers';

// Logging
export { 
  logMessage,
  logInvalidKey,
  logConfigValidation,
  logErrorBoundaryOperation,
  logGameError
} from '@/lib/game/utils/error/logging';
