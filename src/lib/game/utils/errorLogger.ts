/**
 * Centralized error logging utility for consistent error handling across the game
 */

export interface ErrorLogOptions {
  level: 'warn' | 'error' | 'log';
  context: string;
  details?: Record<string, unknown>;
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
export function logConfigValidation(isValid: boolean, errors?: string[]): void {
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
export function logSaveOperation(operation: string, success: boolean, details?: Record<string, unknown>): void {
  const message = success 
    ? `✅ ${operation} completed successfully`
    : `❌ ${operation} failed`;
    
  logMessage(message, {
    level: success ? 'log' : 'error',
    context: 'save',
    details
  });
}
