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

/**
 * Encodes a string to Base64 format.
 * Automatically detects environment and uses appropriate encoding method.
 * 
 * @param str - The string to encode
 * @returns Base64 encoded string
 * 
 * ```typescript
 * const encoded = encodeBase64('Hello World');
 * // Returns: "SGVsbG8gV29ybGQ="
 * ```
 * 
 * @remarks
 * - Uses Node.js Buffer in server environment
 * - Uses browser btoa() in client environment
 * - Handles UTF-8 encoding properly
 */
export function encodeBase64(str: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  return btoa(str);
}

/**
 * Decodes a Base64 string back to its original format.
 * Automatically detects environment and uses appropriate decoding method.
 * 
 * @param str - The Base64 string to decode
 * @returns Decoded string
 * 
 * ```typescript
 * const decoded = decodeBase64('SGVsbG8gV29ybGQ=');
 * // Returns: "Hello World"
 * ```
 * 
 * @remarks
 * - Uses Node.js Buffer in server environment
 * - Uses browser atob() in client environment
 * - Handles UTF-8 decoding properly
 * - Throws error if input is not valid Base64
 */
export function decodeBase64(str: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
  return atob(str);
}
