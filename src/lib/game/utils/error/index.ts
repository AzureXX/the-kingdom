// Error utilities exports

// Types
export type { ErrorLogDetails, ErrorLogOptions, ErrorCategory, GameError } from '@/lib/game/utils/error/types';

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
