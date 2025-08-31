import { useState, useRef, useMemo, useCallback } from 'react';
import { GAME_CONSTANTS } from '../constants';

export interface PerformanceMetrics {
  tickTime: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  frameCount: number;
  averageTickTime: number;
  averageRenderTime: number;
  performanceScore: number;
}

export interface PerformanceThresholds {
  tickTimeWarning: number;
  renderTimeWarning: number;
  memoryWarning: number;
  fpsWarning: number;
}

export interface PerformanceSuggestion {
  type: 'warning' | 'info' | 'optimization';
  message: string;
  priority: 'low' | 'medium' | 'high';
}

export function usePerformanceMonitor(updateInterval: number = GAME_CONSTANTS.PERFORMANCE_MONITORING.UPDATE_INTERVAL): {
  performanceFunctions: {
    updateMetrics: (tickDuration: number) => void;
    resetRenderTimer: () => void;
    getCurrentMetrics: () => PerformanceMetrics;
    getPerformanceSuggestions: () => PerformanceSuggestion[];
  };
  performanceMetrics: PerformanceMetrics;
  updateMetrics: (tickDuration: number) => void;
  resetRenderTimer: () => void;
  getCurrentMetrics: () => PerformanceMetrics;
  getPerformanceSuggestions: () => PerformanceSuggestion[];
  frameCountRef: React.MutableRefObject<number>;
} {
  // Performance metrics stored in refs to avoid unnecessary re-renders
  const performanceMetricsRef = useRef<PerformanceMetrics>({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
    frameCount: 0,
    averageTickTime: 0,
    averageRenderTime: 0,
    performanceScore: 100
  });
  
  // Performance monitoring state - triggers re-renders when metrics change
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
    frameCount: 0,
    averageTickTime: 0,
    averageRenderTime: 0,
    performanceScore: 100
  });
  
  // Track render start time for performance measurement
  const renderStartTimeRef = useRef<number>(performance.now());
  
  // Track frame count for performance metrics updates
  const frameCountRef = useRef<number>(0);

  // Historical data for averages
  const tickTimeHistoryRef = useRef<number[]>([]);
  const renderTimeHistoryRef = useRef<number[]>([]);
  const fpsHistoryRef = useRef<number[]>([]);

  // Performance thresholds
  const thresholds = GAME_CONSTANTS.PERFORMANCE_MONITORING.THRESHOLDS;

  // Calculate performance score (0-100, higher is better)
  const calculatePerformanceScore = useCallback((metrics: PerformanceMetrics): number => {
    let score = 100;
    
    // Deduct points for slow tick time
    if (metrics.averageTickTime > thresholds.TICK_TIME_WARNING) {
      score -= Math.min(30, (metrics.averageTickTime - thresholds.TICK_TIME_WARNING) * 2);
    }
    
    // Deduct points for slow render time
    if (metrics.averageRenderTime > thresholds.RENDER_TIME_WARNING) {
      score -= Math.min(20, (metrics.averageRenderTime - thresholds.RENDER_TIME_WARNING) * 3);
    }
    
    // Deduct points for low FPS
    if (metrics.fps < thresholds.FPS_WARNING) {
      score -= Math.min(25, (thresholds.FPS_WARNING - metrics.fps) * 2);
    }
    
    // Deduct points for high memory usage
    if (metrics.memoryUsage > thresholds.MEMORY_WARNING) {
      score -= Math.min(15, (metrics.memoryUsage - thresholds.MEMORY_WARNING) / (1024 * 1024));
    }
    
    return Math.max(0, Math.round(score));
  }, [thresholds]);

  // Generate performance suggestions
  const getPerformanceSuggestions = useCallback((): PerformanceSuggestion[] => {
    const suggestions: PerformanceSuggestion[] = [];
    const metrics = performanceMetricsRef.current;
    
    if (metrics.averageTickTime > thresholds.TICK_TIME_WARNING) {
      suggestions.push({
        type: 'warning',
        message: `Tick time (${metrics.averageTickTime.toFixed(2)}ms) is above optimal threshold`,
        priority: metrics.averageTickTime > thresholds.TICK_TIME_WARNING * 2 ? 'high' : 'medium'
      });
    }
    
    if (metrics.averageRenderTime > thresholds.RENDER_TIME_WARNING) {
      suggestions.push({
        type: 'warning',
        message: `Render time (${metrics.averageRenderTime.toFixed(2)}ms) is above optimal threshold`,
        priority: metrics.averageRenderTime > thresholds.RENDER_TIME_WARNING * 2 ? 'high' : 'medium'
      });
    }
    
    if (metrics.fps < thresholds.FPS_WARNING) {
      suggestions.push({
        type: 'warning',
        message: `FPS (${metrics.fps.toFixed(1)}) is below optimal threshold`,
        priority: metrics.fps < thresholds.FPS_WARNING * 0.5 ? 'high' : 'medium'
      });
    }
    
    if (metrics.memoryUsage > thresholds.MEMORY_WARNING) {
      suggestions.push({
        type: 'warning',
        message: `Memory usage (${(metrics.memoryUsage / (1024 * 1024)).toFixed(1)}MB) is high`,
        priority: metrics.memoryUsage > thresholds.MEMORY_WARNING * 1.5 ? 'high' : 'medium'
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
  }, [thresholds]);

  // Update performance metrics in refs (no re-renders)
  const updateMetrics = useCallback((tickDuration: number) => {
    frameCountRef.current++;
    
    // Only update performance metrics every N frames to reduce re-renders
    if (frameCountRef.current % updateInterval === 0) {
      // Update tick time with actual measurement
      performanceMetricsRef.current.tickTime = tickDuration;
      
      // Calculate render time (time since last render)
      const currentTime = performance.now();
      performanceMetricsRef.current.renderTime = currentTime - renderStartTimeRef.current;
      renderStartTimeRef.current = currentTime;
      
      // Calculate FPS
      const fps = 1000 / (tickDuration + performanceMetricsRef.current.renderTime);
      performanceMetricsRef.current.fps = fps;
      performanceMetricsRef.current.frameCount = frameCountRef.current;
      
      // Update memory usage if available
      if ('memory' in performance) {
        const memoryInfo = (performance as Performance & { memory: { usedJSHeapSize: number } }).memory;
        performanceMetricsRef.current.memoryUsage = memoryInfo.usedJSHeapSize;
      }
      
      // Update historical data (keep last N samples)
      tickTimeHistoryRef.current.push(tickDuration);
      renderTimeHistoryRef.current.push(performanceMetricsRef.current.renderTime);
      fpsHistoryRef.current.push(fps);
      
      if (tickTimeHistoryRef.current.length > GAME_CONSTANTS.PERFORMANCE_MONITORING.HISTORY_SIZE) {
        tickTimeHistoryRef.current.shift();
        renderTimeHistoryRef.current.shift();
        fpsHistoryRef.current.shift();
      }
      
      // Calculate averages
      performanceMetricsRef.current.averageTickTime = tickTimeHistoryRef.current.reduce((a, b) => a + b, 0) / tickTimeHistoryRef.current.length;
      performanceMetricsRef.current.averageRenderTime = renderTimeHistoryRef.current.reduce((a, b) => a + b, 0) / renderTimeHistoryRef.current.length;
      
      // Calculate performance score
      performanceMetricsRef.current.performanceScore = calculatePerformanceScore(performanceMetricsRef.current);
      
      // Trigger a re-render of performance display components
      // Reuse the performanceMetricsRef.current object to reduce object creation
      setPerformanceMetrics({
        tickTime: performanceMetricsRef.current.tickTime,
        renderTime: performanceMetricsRef.current.renderTime,
        memoryUsage: performanceMetricsRef.current.memoryUsage,
        fps: performanceMetricsRef.current.fps,
        frameCount: performanceMetricsRef.current.frameCount,
        averageTickTime: performanceMetricsRef.current.averageTickTime,
        averageRenderTime: performanceMetricsRef.current.averageRenderTime,
        performanceScore: performanceMetricsRef.current.performanceScore,
      });
    }
  }, [updateInterval, calculatePerformanceScore]);

  // Reset render start time (called when game loop starts)
  const resetRenderTimer = useCallback(() => {
    renderStartTimeRef.current = performance.now();
  }, []);

  // Get current metrics without triggering re-render
  const getCurrentMetrics = useCallback(() => performanceMetricsRef.current, []);

  // Group performance monitoring functions together for cleaner consumption
  const performanceFunctions = useMemo(() => ({
    updateMetrics,
    resetRenderTimer,
    getCurrentMetrics,
    getPerformanceSuggestions,
  }), [updateMetrics, resetRenderTimer, getCurrentMetrics, getPerformanceSuggestions]);

  return {
    performanceFunctions, // Grouped performance functions
    // Individual values still available for backward compatibility
    performanceMetrics,
    updateMetrics,
    resetRenderTimer,
    getCurrentMetrics,
    getPerformanceSuggestions,
    frameCountRef,
  };
}
