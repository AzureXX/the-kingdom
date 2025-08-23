import { useState, useRef } from 'react';

export interface PerformanceMetrics {
  tickTime: number;
  renderTime: number;
  memoryUsage: number;
}

export function usePerformanceMonitor(updateInterval: number = 10) {
  // Performance metrics stored in refs to avoid unnecessary re-renders
  const performanceMetricsRef = useRef<PerformanceMetrics>({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  
  // Performance monitoring state - triggers re-renders when metrics change
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    tickTime: 0,
    renderTime: 0,
    memoryUsage: 0
  });
  
  // Track render start time for performance measurement
  const renderStartTimeRef = useRef<number>(performance.now());
  
  // Track frame count for performance metrics updates
  const frameCountRef = useRef<number>(0);

  // Update performance metrics in refs (no re-renders)
  const updateMetrics = (tickDuration: number) => {
    frameCountRef.current++;
    
    // Only update performance metrics every N frames to reduce re-renders
    if (frameCountRef.current % updateInterval === 0) {
      // Update tick time with actual measurement
      performanceMetricsRef.current.tickTime = tickDuration;
      
      // Calculate render time (time since last render)
      const currentTime = performance.now();
      performanceMetricsRef.current.renderTime = currentTime - renderStartTimeRef.current;
      renderStartTimeRef.current = currentTime;
      
      // Update memory usage if available
      if ('memory' in performance) {
        const memoryInfo = (performance as Performance & { memory: { usedJSHeapSize: number } }).memory;
        performanceMetricsRef.current.memoryUsage = memoryInfo.usedJSHeapSize;
      }
      
      // Trigger a re-render of performance display components
      // Reuse the performanceMetricsRef.current object to reduce object creation
      setPerformanceMetrics({
        tickTime: performanceMetricsRef.current.tickTime,
        renderTime: performanceMetricsRef.current.renderTime,
        memoryUsage: performanceMetricsRef.current.memoryUsage,
      });
    }
  };

  // Reset render start time (called when game loop starts)
  const resetRenderTimer = () => {
    renderStartTimeRef.current = performance.now();
  };

  // Get current metrics without triggering re-render
  const getCurrentMetrics = () => performanceMetricsRef.current;

  return {
    performanceMetrics,
    updateMetrics,
    resetRenderTimer,
    getCurrentMetrics,
    frameCountRef,
  };
}
