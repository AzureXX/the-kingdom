/**
 * Centralized error logging utility for consistent error handling across the game
 */

import type { ErrorInfo } from 'react';
import type { ValidationError } from '@/lib/game/utils/validation/resourceValidation';

/**
 * Type for error log details - more specific than unknown but flexible enough for complex data
 */
export type ErrorLogDetails = Record<string, string | number | boolean | null | undefined | string[] | number[] | object>;

export interface ErrorLogOptions {
  level: 'warn' | 'error' | 'log';
  context: string;
  details?: ErrorLogDetails;
}

/**
 * Error categories for better error handling and debugging
 */
export type ErrorCategory = 'validation' | 'calculation' | 'state' | 'config' | 'system' | 'user';

/**
 * Enhanced error information with categorization
 */
export interface GameError {
  message: string;
  category: ErrorCategory;
  context: string;
  timestamp: string;
  details?: ErrorLogDetails;
  stack?: string;
}

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

/**
 * Log a message with consistent formatting and context
 */
export function logMessage(message: string, options: ErrorLogOptions): void {
  const { level, context, details } = options;
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${context.toUpperCase()}]`;
  
  const logMessage = `${prefix} ${message}`;
  
  switch (level) {
    case 'warn':
      console.warn(logMessage, details || '');
      break;
    case 'error':
      console.error(logMessage, details || '');
      break;
    case 'log':
      console.log(logMessage, details || '');
      break;
  }
}

/**
 * Log validation errors for invalid keys
 */
export function logInvalidKey(key: string, expectedType: string, context: string): void {
  logMessage(`Invalid ${expectedType} key: ${key}`, {
    level: 'warn',
    context,
    details: { key, expectedType }
  });
}

/**
 * Log configuration validation results
 */
export function logConfigValidation(isValid: boolean, errors?: ValidationError[]): void {
  if (isValid) {
    logMessage('Configuration validation passed', {
      level: 'log',
      context: 'config'
    });
  } else {
    logMessage('Configuration validation failed', {
      level: 'error',
      context: 'config',
      details: { errors }
    });
  }
}

/**
 * Log save system operations
 */
export function logSaveOperation(operation: string, success: boolean, details?: ErrorLogDetails): void {
  const message = success 
    ? `✅ ${operation} completed successfully`
    : `❌ ${operation} failed`;
    
  logMessage(message, {
    level: success ? 'log' : 'error',
    context: 'save',
    details
  });
}

/**
 * Log error boundary operations for better error tracking and recovery
 */
export function logErrorBoundaryOperation(operation: string, success: boolean, details?: ErrorLogDetails): void {
  const message = success 
    ? `✅ ${operation} completed successfully`
    : `❌ ${operation} failed`;
    
  logMessage(message, {
    level: success ? 'log' : 'error',
    context: 'errorBoundary',
    details
  });
}

/**
 * Log game errors caught by error boundary
 */
export function logGameError(error: Error, errorInfo: ErrorInfo): void {
  logMessage('Game Error caught by boundary', {
    level: 'error',
    context: 'errorBoundary',
    details: {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    }
  });
}