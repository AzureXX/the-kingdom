/**
 * Performance formatting utilities
 * Formatting and display helpers for performance metrics
 */

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
