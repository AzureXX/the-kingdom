// Error logging utilities

import type { ErrorLogOptions, ErrorLogDetails } from '@/lib/game/utils/error/types';
import type { ErrorInfo } from 'react';
import type { ValidationError } from '@/lib/game/utils/validation/resourceValidation';

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
