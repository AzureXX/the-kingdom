/**
 * Safely parses JSON with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Base64 encoding/decoding with proper error handling
 */
export function encodeBase64(str: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  return btoa(str);
}

export function decodeBase64(str: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
  return atob(str);
}
