/**
 * Performance calculation utilities for the game
 * Extracted from usePerformanceMonitor.tsx to improve maintainability
 */

import type { PerformanceMetrics, PerformanceSuggestion, PerformanceThresholds } from '../hooks/usePerformanceMonitor';

/**
 * Calculate performance score (0-100, higher is better)
 * 
 * @param metrics - Current performance metrics
 * @param thresholds - Performance thresholds for warnings
 * @returns Performance score from 0-100
 * 
 * @example
 * ```typescript
 * const score = calculatePerformanceScore(metrics, thresholds);
 * console.log(`Performance score: ${score}/100`);
 * ```
 */
export function calculatePerformanceScore(
  metrics: PerformanceMetrics,
  thresholds: PerformanceThresholds
): number {
  let score = 100;
  
  // Deduct points for slow tick time
  if (metrics.averageTickTime > thresholds.tickTimeWarning) {
    score -= Math.min(30, (metrics.averageTickTime - thresholds.tickTimeWarning) * 2);
  }
  
  // Deduct points for slow render time
  if (metrics.averageRenderTime > thresholds.renderTimeWarning) {
    score -= Math.min(20, (metrics.averageRenderTime - thresholds.renderTimeWarning) * 3);
  }
  
  // Deduct points for low FPS
  if (metrics.fps < thresholds.fpsWarning) {
    score -= Math.min(25, (thresholds.fpsWarning - metrics.fps) * 2);
  }
  
  // Deduct points for high memory usage
  if (metrics.memoryUsage > thresholds.memoryWarning) {
    score -= Math.min(15, (metrics.memoryUsage - thresholds.memoryWarning) / (1024 * 1024));
  }
  
  return Math.max(0, Math.round(score));
}

/**
 * Generate performance suggestions based on current metrics
 * 
 * @param metrics - Current performance metrics
 * @param thresholds - Performance thresholds for warnings
 * @returns Array of performance suggestions
 * 
 * @example
 * ```typescript
 * const suggestions = getPerformanceSuggestions(metrics, thresholds);
 * suggestions.forEach(suggestion => {
 *   console.log(`${suggestion.priority}: ${suggestion.message}`);
 * });
 * ```
 */
export function getPerformanceSuggestions(
  metrics: PerformanceMetrics,
  thresholds: PerformanceThresholds
): PerformanceSuggestion[] {
  const suggestions: PerformanceSuggestion[] = [];
  
  if (metrics.averageTickTime > thresholds.tickTimeWarning) {
    suggestions.push({
      type: 'warning',
      message: `Tick time (${metrics.averageTickTime.toFixed(2)}ms) is above optimal threshold`,
      priority: metrics.averageTickTime > thresholds.tickTimeWarning * 2 ? 'high' : 'medium'
    });
  }
  
  if (metrics.averageRenderTime > thresholds.renderTimeWarning) {
    suggestions.push({
      type: 'warning',
      message: `Render time (${metrics.averageRenderTime.toFixed(2)}ms) is above optimal threshold`,
      priority: metrics.averageRenderTime > thresholds.renderTimeWarning * 2 ? 'high' : 'medium'
    });
  }
  
  if (metrics.fps < thresholds.fpsWarning) {
    suggestions.push({
      type: 'warning',
      message: `FPS (${metrics.fps.toFixed(1)}) is below optimal threshold`,
      priority: metrics.fps < thresholds.fpsWarning * 0.5 ? 'high' : 'medium'
    });
  }
  
  if (metrics.memoryUsage > thresholds.memoryWarning) {
    suggestions.push({
      type: 'warning',
      message: `Memory usage (${(metrics.memoryUsage / (1024 * 1024)).toFixed(1)}MB) is high`,
      priority: metrics.memoryUsage > thresholds.memoryWarning * 1.5 ? 'high' : 'medium'
    });
  }
  
  if (metrics.performanceScore > 80) {
    suggestions.push({
      type: 'info',
      message: 'Performance is optimal',
      priority: 'low'
    });
  } else if (metrics.performanceScore > 60) {
    suggestions.push({
      type: 'optimization',
      message: 'Consider reducing game complexity for better performance',
      priority: 'medium'
    });
  } else {
    suggestions.push({
      type: 'optimization',
      message: 'Performance issues detected - check browser console for details',
      priority: 'high'
    });
  }
  
  return suggestions;
}
