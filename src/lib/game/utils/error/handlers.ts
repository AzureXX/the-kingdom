// Error handler creation utilities

import type { GameError, ErrorLogDetails } from '@/lib/game/types/error';
import { logMessage } from '@/lib/game/utils/error/logging';


/**
 * Create a validation error handler for input validation
 */
export function createValidationErrorHandler(context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return (message: string, details?: ErrorLogDetails) => {
    const gameError: GameError = {
      message,
      category: 'validation',
      context,
      timestamp: new Date().toISOString(),
      details
    };

    logMessage(message, {
      level: 'warn',
      context,
      details: {
        category: 'validation',
        ...details
      }
    });

    return gameError;
  };
}

/**
 * Create a calculation error handler for mathematical operations
 */
export function createCalculationErrorHandler(context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return (message: string, details?: ErrorLogDetails) => {
    const gameError: GameError = {
      message,
      category: 'calculation',
      context,
      timestamp: new Date().toISOString(),
      details
    };

    logMessage(message, {
      level: 'error',
      context,
      details: {
        category: 'calculation',
        ...details
      }
    });

    return gameError;
  };
}

/**
 * Create a state error handler for state management operations
 */
export function createStateErrorHandler(context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return (message: string, details?: ErrorLogDetails) => {
    const gameError: GameError = {
      message,
      category: 'state',
      context,
      timestamp: new Date().toISOString(),
      details
    };

    logMessage(message, {
      level: 'error',
      context,
      details: {
        category: 'state',
        ...details
      }
    });

    return gameError;
  };
}
