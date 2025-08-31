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

/**
 * Format performance metrics for display
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
 * Format bytes into human readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Performance budget checker
 */
export interface PerformanceBudget {
  maxTickTime: number;
  maxRenderTime: number;
  minFPS: number;
  maxMemoryUsage: number;
}

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
