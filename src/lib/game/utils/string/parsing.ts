// String parsing utilities

/**
 * Safely parses JSON strings with comprehensive error handling.
 * Returns a fallback value if parsing fails, preventing crashes.
 * 
 * @param json - The JSON string to parse
 * @param fallback - The value to return if parsing fails
 * @returns The parsed object or the fallback value
 * 
 * ```typescript
 * const data = safeJsonParse('{"name": "John"}', { name: 'Default' });
 * // Returns: { name: 'John' }
 * 
 * const invalid = safeJsonParse('invalid json', { name: 'Default' });
 * // Returns: { name: 'Default' }
 * ```
 * 
 * @remarks
 * - Uses try-catch for robust error handling
 * - Type-safe with generic parameter T
 * - Ideal for parsing user input or external data
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
