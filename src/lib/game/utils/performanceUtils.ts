/**
 * Debounce function for performance optimization.
 * Delays the execution of a function until after a specified delay has passed
 * since the last time it was invoked.
 * 
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function
 * 
 * @example
 * ```typescript
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching for:', query);
 * }, 300);
 * 
 * // Only executes after 300ms of no calls
 * debouncedSearch('a');
 * debouncedSearch('ab');
 * debouncedSearch('abc'); // Only this will execute
 * ```
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
 * Throttle function for performance optimization.
 * Ensures a function is called at most once per specified time period.
 * 
 * @param func - The function to throttle
 * @param limit - The time period in milliseconds
 * @returns A throttled version of the function
 * 
 * @example
 * ```typescript
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll event');
 * }, 100);
 * 
 * // Will only execute once every 100ms
 * throttledScroll(); // Executes immediately
 * throttledScroll(); // Ignored
 * throttledScroll(); // Ignored
 * // After 100ms, next call will execute
 * ```
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
 * Calculate moving average for performance metrics.
 * Computes the average of the most recent values within a specified window.
 * 
 * @param values - Array of numeric values to average
 * @param windowSize - Number of recent values to include in the average (default: 10)
 * @returns The moving average of the recent values
 * 
 * @example
 * ```typescript
 * const frameTimes = [16, 17, 15, 18, 16, 19, 14, 17, 16, 18];
 * const avgFrameTime = calculateMovingAverage(frameTimes, 5);
 * console.log(avgFrameTime); // Average of last 5 values
 * ```
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
 * Detect performance anomalies in a series of values.
 * Uses statistical analysis to identify values that deviate significantly from the mean.
 * 
 * @param values - Array of numeric values to analyze
 * @param threshold - Number of standard deviations to consider as anomaly (default: 2)
 * @returns Array of indices where anomalies were detected
 * 
 * @example
 * ```typescript
 * const frameTimes = [16, 17, 15, 18, 16, 19, 14, 17, 16, 18, 50, 16]; // 50 is anomaly
 * const anomalies = detectPerformanceAnomalies(frameTimes, 2);
 * console.log(anomalies); // [10] - index of the anomalous value
 * ```
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

/**
 * Format performance metrics for display.
 * Provides consistent formatting for different types of performance metrics.
 * 
 * @param value - The numeric value to format
 * @param unit - The unit type ('ms', 'fps', 'bytes', or custom)
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted string representation of the metric
 * 
 * @example
 * ```typescript
 * formatPerformanceMetric(16.67, 'ms'); // "16.67ms"
 * formatPerformanceMetric(60, 'fps'); // "60.00 FPS"
 * formatPerformanceMetric(1024, 'bytes'); // "1.00 KB"
 * formatPerformanceMetric(95.5, 'score'); // "95.50 score"
 * ```
 */
export function formatPerformanceMetric(value: number, unit: string, decimals: number = 2): string {
  if (unit === 'ms') {
    return `${value.toFixed(decimals)}ms`;
  }
  if (unit === 'fps') {
    return `${value.toFixed(decimals)} FPS`;
  }
  if (unit === 'bytes') {
    return formatBytes(value);
  }
  return `${value.toFixed(decimals)} ${unit}`;
}

/**
 * Format bytes into human readable format.
 * Converts byte values to appropriate units (B, KB, MB, GB).
 * 
 * @param bytes - The number of bytes to format
 * @returns Human-readable string representation
 * 
 * @example
 * ```typescript
 * formatBytes(0); // "0 B"
 * formatBytes(1024); // "1.00 KB"
 * formatBytes(1048576); // "1.00 MB"
 * formatBytes(1536); // "1.50 KB"
 * ```
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Performance budget configuration interface.
 * Defines acceptable performance thresholds for game metrics.
 */
export interface PerformanceBudget {
  /** Maximum acceptable tick time in milliseconds */
  maxTickTime: number;
  /** Maximum acceptable render time in milliseconds */
  maxRenderTime: number;
  /** Minimum acceptable frames per second */
  minFPS: number;
  /** Maximum acceptable memory usage in bytes */
  maxMemoryUsage: number;
}

/**
 * Check if performance metrics are within the defined budget.
 * Compares current performance metrics against acceptable thresholds.
 * 
 * @param metrics - Current performance metrics to check
 * @param budget - Performance budget with acceptable thresholds
 * @returns Object indicating if metrics are within budget and any violations
 * 
 * @example
 * ```typescript
 * const budget: PerformanceBudget = {
 *   maxTickTime: 16.67,
 *   maxRenderTime: 8.33,
 *   minFPS: 30,
 *   maxMemoryUsage: 50 * 1024 * 1024 // 50MB
 * };
 * 
 * const result = checkPerformanceBudget(currentMetrics, budget);
 * if (!result.withinBudget) {
 *   console.log('Performance violations:', result.violations);
 * }
 * ```
 */
export function checkPerformanceBudget(
  metrics: { tickTime: number; renderTime: number; fps: number; memoryUsage: number },
  budget: PerformanceBudget
): { withinBudget: boolean; violations: string[] } {
  const violations: string[] = [];
  
  if (metrics.tickTime > budget.maxTickTime) {
    violations.push(`Tick time (${metrics.tickTime.toFixed(2)}ms) exceeds budget (${budget.maxTickTime}ms)`);
  }
  
  if (metrics.renderTime > budget.maxRenderTime) {
    violations.push(`Render time (${metrics.renderTime.toFixed(2)}ms) exceeds budget (${budget.maxRenderTime}ms)`);
  }
  
  if (metrics.fps < budget.minFPS) {
    violations.push(`FPS (${metrics.fps.toFixed(1)}) below budget (${budget.minFPS})`);
  }
  
  if (metrics.memoryUsage > budget.maxMemoryUsage) {
    violations.push(`Memory usage (${formatBytes(metrics.memoryUsage)}) exceeds budget (${formatBytes(budget.maxMemoryUsage)})`);
  }
  
  return {
    withinBudget: violations.length === 0,
    violations
  };
}
