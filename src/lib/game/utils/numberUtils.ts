import { GAME_CONSTANTS } from '../constants';

/**
 * Clamps a numeric value between a minimum and maximum range.
 * 
 * @param value - The numeric value to clamp
 * @param min - The minimum allowed value (inclusive)
 * @param max - The maximum allowed value (inclusive)
 * @returns The clamped value within the [min, max] range
 * 
 * @example
 * ```typescript
 * clamp(15, 0, 10);    // Returns 10
 * clamp(-5, 0, 10);    // Returns 0
 * clamp(7, 0, 10);     // Returns 7
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Formats large numbers using K/M/B/T notation for better readability.
 * Automatically switches to abbreviated format when the value exceeds the threshold.
 * 
 * @param n - The number to format
 * @param dec - Number of decimal places to show (default: 0)
 * @returns Formatted string representation of the number
 * 
 * @example
 * ```typescript
 * formatNumber(1234);           // Returns "1.23K"
 * formatNumber(1234567);        // Returns "1.23M"
 * formatNumber(1234567890);     // Returns "1.23B"
 * formatNumber(123, 2);         // Returns "123.00"
 * ```
 * 
 * @remarks
 * - Uses threshold from GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD (1000)
 * - Maximum decimal places limited by GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS (2)
 * - Supports units: K (thousands), M (millions), B (billions), T (trillions), Qa (quadrillions), Qi (quintillions)
 */
export function formatNumber(n: number, dec = 0): string {
  if (!isFinite(n)) return '—';
  
  if (Math.abs(n) >= GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD) {
    const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
    let i = 0;
    let x = n;
    
    while (Math.abs(x) >= GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD && i < units.length - 1) {
      x /= GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD;
      i++;
    }
    
    return x.toFixed(dec > GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS ? GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS : 2) + units[i];
  }
  
  return n.toFixed(dec);
}
