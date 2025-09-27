/**
 * Performance optimization utilities
 * General performance tools and helpers
 */

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

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Calculate moving average for performance metrics
 */
export function calculateMovingAverage(values: number[], windowSize: number = 10): number {
  if (values.length === 0) return 0;
  if (values.length <= windowSize) {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }
  
  const recentValues = values.slice(-windowSize);
  return recentValues.reduce((sum, val) => sum + val, 0) / recentValues.length;
}

/**
 * Detect performance anomalies in a series of values
 */
export function detectPerformanceAnomalies(values: number[], threshold: number = 2): number[] {
  if (values.length < 3) return [];
  
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  return values
    .map((val, index) => ({ val, index }))
    .filter(({ val }) => Math.abs(val - mean) > threshold * stdDev)
    .map(({ index }) => index);
}
