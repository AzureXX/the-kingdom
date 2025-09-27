import { useState, useRef, useMemo, useCallback } from 'react';
import { GAME_CONSTANTS } from '../constants';
import { 
  calculatePerformanceScore, 
  getPerformanceSuggestions,
  updatePerformanceMetrics, 
  updateHistoricalData, 
  calculateAverages, 
  checkMetricsChanged 
} from '../utils/performance';

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
  
  // Using a single state update mechanism to avoid duplicate state management
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>(() => performanceMetricsRef.current);
  
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

  // Create thresholds object for utility functions
  const thresholdsObject = useMemo(() => ({
    tickTimeWarning: thresholds.TICK_TIME_WARNING,
    renderTimeWarning: thresholds.RENDER_TIME_WARNING,
    memoryWarning: thresholds.MEMORY_WARNING,
    fpsWarning: thresholds.FPS_WARNING
  }), [thresholds]);

  // Generate performance suggestions - memoized for performance
  const getPerformanceSuggestionsMemo = useMemo(() => {
    return (): PerformanceSuggestion[] => {
      return getPerformanceSuggestions(performanceMetricsRef.current, thresholdsObject);
    };
  }, [thresholdsObject]);

  // Update performance metrics in refs (no re-renders)
  const updateMetrics = useCallback((tickDuration: number) => {
    // Update performance metrics using utility function
    const updatedMetrics = updatePerformanceMetrics(
      performanceMetricsRef,
      tickDuration,
      renderStartTimeRef,
      frameCountRef,
      updateInterval
    );
    
    if (updatedMetrics) {
      // Update historical data
      updateHistoricalData(
        tickTimeHistoryRef.current,
        renderTimeHistoryRef.current,
        fpsHistoryRef.current,
        tickDuration,
        updatedMetrics.renderTime,
        updatedMetrics.fps,
        GAME_CONSTANTS.PERFORMANCE_MONITORING.HISTORY_SIZE
      );
      
      // Calculate averages
      const averages = calculateAverages(tickTimeHistoryRef.current, renderTimeHistoryRef.current);
      performanceMetricsRef.current.averageTickTime = averages.averageTickTime;
      performanceMetricsRef.current.averageRenderTime = averages.averageRenderTime;
      
      // Calculate performance score
      performanceMetricsRef.current.performanceScore = calculatePerformanceScore(
        performanceMetricsRef.current, 
        thresholdsObject
      );
      
      // Only trigger re-render if metrics have actually changed
      if (checkMetricsChanged(performanceMetricsRef.current, performanceMetrics)) {
        setPerformanceMetrics(performanceMetricsRef.current);
      }
    }
  }, [updateInterval, performanceMetrics, thresholdsObject]);

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
    getPerformanceSuggestions: getPerformanceSuggestionsMemo,
  }), [updateMetrics, resetRenderTimer, getCurrentMetrics, getPerformanceSuggestionsMemo]);

  return {
    performanceFunctions, // Grouped performance functions
    // Individual values still available for backward compatibility
    performanceMetrics,
    updateMetrics,
    resetRenderTimer,
    getCurrentMetrics,
    getPerformanceSuggestions: getPerformanceSuggestionsMemo,
    frameCountRef,
  };
}
