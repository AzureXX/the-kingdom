// Error handler creation utilities

import type { ErrorCategory, GameError, ErrorLogDetails } from './types';
import { logMessage } from './logging';

/**
 * Centralized error handling function for consistent error handling across all game systems
 */
export function handleGameError(
  error: Error | string,
  category: ErrorCategory,
  context: string,
  details?: ErrorLogDetails
): GameError {
  const gameError: GameError = {
    message: typeof error === 'string' ? error : error.message,
    category,
    context,
    timestamp: new Date().toISOString(),
    details,
    stack: error instanceof Error ? error.stack : undefined
  };

  // Log the error with appropriate level based on category
  const level = category === 'validation' ? 'warn' : 'error';
  logMessage(gameError.message, {
    level,
    context: gameError.context,
    details: {
      category: gameError.category,
      ...gameError.details,
      stack: gameError.stack
    }
  });

  return gameError;
}

/**
 * Create a generic error handler for any error category
 * This is the base factory that all specific error handlers use
 */
export function createErrorHandler(category: ErrorCategory, context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return (message: string, details?: ErrorLogDetails) => {
    return handleGameError(message, category, context, details);
  };
}

/**
 * Create a validation error handler for input validation
 */
export function createValidationErrorHandler(context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return createErrorHandler('validation', context);
}

/**
 * Create a calculation error handler for mathematical operations
 */
export function createCalculationErrorHandler(context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return createErrorHandler('calculation', context);
}

/**
 * Create a state error handler for state management operations
 */
export function createStateErrorHandler(context: string): (message: string, details?: ErrorLogDetails) => GameError {
  return createErrorHandler('state', context);
}
