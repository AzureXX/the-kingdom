/**
 * Performance monitoring utilities
 * Core performance tracking and metrics collection
 */

import type { PerformanceMetrics } from '../../hooks/usePerformanceMonitor';

/**
 * Update performance metrics with new tick data
 */
export function updatePerformanceMetrics(
  metricsRef: React.MutableRefObject<PerformanceMetrics>,
  tickDuration: number,
  renderStartTimeRef: React.MutableRefObject<number>,
  frameCountRef: React.MutableRefObject<number>,
  updateInterval: number
): PerformanceMetrics | null {
  frameCountRef.current++;
  
  // Only update performance metrics every N frames to reduce re-renders
  if (frameCountRef.current % updateInterval === 0) {
    // Update tick time with actual measurement
    metricsRef.current.tickTime = tickDuration;
    
    // Calculate render time (time since last render)
    const currentTime = performance.now();
    metricsRef.current.renderTime = currentTime - renderStartTimeRef.current;
    renderStartTimeRef.current = currentTime;
    
    // Calculate FPS
    const fps = 1000 / (tickDuration + metricsRef.current.renderTime);
    metricsRef.current.fps = fps;
    metricsRef.current.frameCount = frameCountRef.current;
    
    // Update memory usage if available
    if ('memory' in performance) {
      const memoryInfo = (performance as Performance & { memory: { usedJSHeapSize: number } }).memory;
      metricsRef.current.memoryUsage = memoryInfo.usedJSHeapSize;
    }
    
    return metricsRef.current;
  }
  
  return null;
}

/**
 * Update historical data arrays for performance metrics
 */
export function updateHistoricalData(
  tickTimeHistory: number[],
  renderTimeHistory: number[],
  fpsHistory: number[],
  tickDuration: number,
  renderTime: number,
  fps: number,
  historySize: number
): void {
  // Update historical data (keep last N samples)
  tickTimeHistory.push(tickDuration);
  renderTimeHistory.push(renderTime);
  fpsHistory.push(fps);
  
  if (tickTimeHistory.length > historySize) {
    tickTimeHistory.shift();
    renderTimeHistory.shift();
    fpsHistory.shift();
  }
}

/**
 * Calculate average values from historical data
 */
export function calculateAverages(
  tickTimeHistory: number[],
  renderTimeHistory: number[]
): { averageTickTime: number; averageRenderTime: number } {
  return {
    averageTickTime: tickTimeHistory.reduce((a, b) => a + b, 0) / tickTimeHistory.length,
    averageRenderTime: renderTimeHistory.reduce((a, b) => a + b, 0) / renderTimeHistory.length
  };
}

/**
 * Check if performance metrics have changed significantly
 */
export function checkMetricsChanged(
  currentMetrics: PerformanceMetrics,
  previousMetrics: PerformanceMetrics
): boolean {
  return (
    currentMetrics.tickTime !== previousMetrics.tickTime ||
    currentMetrics.renderTime !== previousMetrics.renderTime ||
    currentMetrics.memoryUsage !== previousMetrics.memoryUsage ||
    currentMetrics.fps !== previousMetrics.fps ||
    currentMetrics.frameCount !== previousMetrics.frameCount ||
    currentMetrics.averageTickTime !== previousMetrics.averageTickTime ||
    currentMetrics.averageRenderTime !== previousMetrics.averageRenderTime ||
    currentMetrics.performanceScore !== previousMetrics.performanceScore
  );
}
