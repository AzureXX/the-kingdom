// Error utilities exports

// Types
export type { ErrorLogDetails, ErrorLogOptions, ErrorCategory, GameError } from './types';

// Handlers
export { 
  handleGameError,
  createErrorHandler,
  createValidationErrorHandler,
  createCalculationErrorHandler,
  createStateErrorHandler
} from './handlers';

// Logging
export { 
  logMessage,
  logInvalidKey,
  logConfigValidation,
  logSaveOperation,
  logErrorBoundaryOperation,
  logGameError
} from './logging';
