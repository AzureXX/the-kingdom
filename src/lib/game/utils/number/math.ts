// Number math utilities

/**
 * Clamps a numeric value between a minimum and maximum range.
 * 
 * @param value - The numeric value to clamp
 * @param min - The minimum allowed value (inclusive)
 * @param max - The maximum allowed value (inclusive)
 * @returns The clamped value within the [min, max] range
 * 
 * ```typescript
 * clamp(15, 0, 10);    // Returns 10
 * clamp(-5, 0, 10);    // Returns 0
 * clamp(7, 0, 10);     // Returns 7
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
