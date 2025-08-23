import { GAME_CONSTANTS } from './constants';

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Formats numbers with K/M/B/T notation for large values
 */
export function formatNumber(n: number, dec = 0): string {
  if (!isFinite(n)) return '—';
  
  if (Math.abs(n) >= GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD) {
    const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
    let i = 0;
    let x = n;
    
    while (Math.abs(x) >= 1000 && i < units.length - 1) {
      x /= 1000;
      i++;
    }
    
    return x.toFixed(dec > GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS ? GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS : 2) + units[i];
  }
  
  return n.toFixed(dec);
}



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

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
} 