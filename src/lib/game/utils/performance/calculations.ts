/**
 * Cached performance calculation utilities
 * Optimized performance calculations with caching to avoid redundant computations
 */

import type { PerformanceMetrics, PerformanceSuggestion, PerformanceThresholds } from '@/hooks/usePerformanceMonitor';

// Cache for performance calculations
interface PerformanceCache {
  lastMetrics: PerformanceMetrics | null;
  lastThresholds: PerformanceThresholds | null;
  cachedScore: number;
  cachedSuggestions: PerformanceSuggestion[];
  lastUpdateTime: number;
}

const performanceCache: PerformanceCache = {
  lastMetrics: null,
  lastThresholds: null,
  cachedScore: 100,
  cachedSuggestions: [],
  lastUpdateTime: 0
};

// Cache validity duration (in milliseconds)
const CACHE_DURATION = 1000; // 1 second

/**
 * Check if cached values are still valid
 */
function isCacheValid(metrics: PerformanceMetrics, thresholds: PerformanceThresholds): boolean {
  const now = performance.now();
  
  // Check if cache is expired
  if (now - performanceCache.lastUpdateTime > CACHE_DURATION) {
    return false;
  }
  
  // Check if metrics have changed significantly
  if (!performanceCache.lastMetrics || !performanceCache.lastThresholds) {
    return false;
  }
  
  const metricsChanged = (
    Math.abs(metrics.averageTickTime - performanceCache.lastMetrics.averageTickTime) > 0.1 ||
    Math.abs(metrics.averageRenderTime - performanceCache.lastMetrics.averageRenderTime) > 0.1 ||
    Math.abs(metrics.fps - performanceCache.lastMetrics.fps) > 0.1 ||
    Math.abs(metrics.memoryUsage - performanceCache.lastMetrics.memoryUsage) > 1024 * 1024 // 1MB threshold
  );
  
  const thresholdsChanged = (
    performanceCache.lastThresholds.tickTimeWarning !== thresholds.tickTimeWarning ||
    performanceCache.lastThresholds.renderTimeWarning !== thresholds.renderTimeWarning ||
    performanceCache.lastThresholds.fpsWarning !== thresholds.fpsWarning ||
    performanceCache.lastThresholds.memoryWarning !== thresholds.memoryWarning
  );
  
  return !metricsChanged && !thresholdsChanged;
}

/**
 * Calculate performance score with caching (0-100, higher is better)
 */
export function calculatePerformanceScoreCached(
  metrics: PerformanceMetrics,
  thresholds: PerformanceThresholds
): number {
  // Return cached value if still valid
  if (isCacheValid(metrics, thresholds)) {
    return performanceCache.cachedScore;
  }
  
  // Calculate new score
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
  
  const finalScore = Math.max(0, Math.round(score));
  
  // Update cache
  performanceCache.lastMetrics = { ...metrics };
  performanceCache.lastThresholds = { ...thresholds };
  performanceCache.cachedScore = finalScore;
  performanceCache.lastUpdateTime = performance.now();
  
  return finalScore;
}

/**
 * Generate performance suggestions with caching
 */
export function getPerformanceSuggestionsCached(
  metrics: PerformanceMetrics,
  thresholds: PerformanceThresholds
): PerformanceSuggestion[] {
  // Return cached suggestions if still valid
  if (isCacheValid(metrics, thresholds)) {
    return performanceCache.cachedSuggestions;
  }
  
  // Generate new suggestions
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
  
  // Update cache
  performanceCache.lastMetrics = { ...metrics };
  performanceCache.lastThresholds = { ...thresholds };
  performanceCache.cachedSuggestions = [...suggestions];
  performanceCache.lastUpdateTime = performance.now();
  
  return suggestions;
}

/**
 * Clear the performance cache (useful for testing or when thresholds change)
 */
export function clearPerformanceCache(): void {
  performanceCache.lastMetrics = null;
  performanceCache.lastThresholds = null;
  performanceCache.cachedScore = 100;
  performanceCache.cachedSuggestions = [];
  performanceCache.lastUpdateTime = 0;
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats(): {
  isCacheValid: boolean;
  lastUpdateTime: number;
  cacheAge: number;
  hasCachedData: boolean;
} {
  const now = performance.now();
  return {
    isCacheValid: performanceCache.lastUpdateTime > 0 && (now - performanceCache.lastUpdateTime) <= CACHE_DURATION,
    lastUpdateTime: performanceCache.lastUpdateTime,
    cacheAge: now - performanceCache.lastUpdateTime,
    hasCachedData: performanceCache.lastMetrics !== null
  };
}
