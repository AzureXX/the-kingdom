// Error logging types and interfaces


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
