/**
 * Performance monitoring utilities
 * Core performance tracking and metrics collection
 */

import type { PerformanceMetrics } from '../../hooks/usePerformanceMonitor';
import { PerformanceCircularBuffer } from './circularBuffer';

/**
 * Update performance metrics with new tick data using different update intervals
 */
export function updatePerformanceMetrics(
  metricsRef: React.MutableRefObject<PerformanceMetrics>,
  tickDuration: number,
  renderStartTimeRef: React.MutableRefObject<number>,
  frameCountRef: React.MutableRefObject<number>,
  updateInterval: number,
  memoryUpdateInterval: number,
  scoreUpdateInterval: number
): PerformanceMetrics | null {
  frameCountRef.current++;
  
  let shouldUpdate = false;
  
  // Update basic metrics (tick time, render time, FPS) every N frames
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
    
    shouldUpdate = true;
  }
  
  // Update memory usage less frequently (every 60 frames = 3 seconds at 20 FPS)
  if (frameCountRef.current % memoryUpdateInterval === 0) {
    if ('memory' in performance) {
      const memoryInfo = (performance as Performance & { memory: { usedJSHeapSize: number } }).memory;
      metricsRef.current.memoryUsage = memoryInfo.usedJSHeapSize;
    }
    shouldUpdate = true;
  }
  
  // Update performance score less frequently (every 30 frames = 1.5 seconds at 20 FPS)
  if (frameCountRef.current % scoreUpdateInterval === 0) {
    // Performance score will be calculated in the hook after this function returns
    shouldUpdate = true;
  }
  
  return shouldUpdate ? metricsRef.current : null;
}

/**
 * Update historical data using circular buffers for performance metrics
 */
export function updateHistoricalData(
  tickTimeHistory: PerformanceCircularBuffer,
  renderTimeHistory: PerformanceCircularBuffer,
  fpsHistory: PerformanceCircularBuffer,
  tickDuration: number,
  renderTime: number,
  fps: number
): void {
  // Update historical data using circular buffers (automatically handles size limits)
  tickTimeHistory.push(tickDuration);
  renderTimeHistory.push(renderTime);
  fpsHistory.push(fps);
}

/**
 * Calculate average values from historical data using circular buffers
 */
export function calculateAverages(
  tickTimeHistory: PerformanceCircularBuffer,
  renderTimeHistory: PerformanceCircularBuffer
): { averageTickTime: number; averageRenderTime: number } {
  return {
    averageTickTime: tickTimeHistory.getAverage(),
    averageRenderTime: renderTimeHistory.getAverage()
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
