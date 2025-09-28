/**
 * Performance budget utilities
 * Performance budget checking and validation
 */

import { formatBytes } from '@/lib/game/utils/performance/formatting';

/**
 * Performance budget configuration interface
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
 * Check if performance metrics are within the defined budget
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
