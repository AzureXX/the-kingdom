import { GAME_CONSTANTS } from '../constants';

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
    
    while (Math.abs(x) >= GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD && i < units.length - 1) {
      x /= GAME_CONSTANTS.NUMBER_FORMAT_THRESHOLD;
      i++;
    }
    
    return x.toFixed(dec > GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS ? GAME_CONSTANTS.NUMBER_FORMAT_DECIMALS : 2) + units[i];
  }
  
  return n.toFixed(dec);
}
