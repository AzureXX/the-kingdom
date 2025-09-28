/**
 * Performance utilities - Consolidated exports
 * Organized performance monitoring and optimization tools
 */

// Performance monitoring and metrics
export {
  updatePerformanceMetrics,
  updateHistoricalData,
  calculateAverages,
  checkMetricsChanged
} from './monitoring';

// Performance optimization tools
export {
  debounce,
  throttle,
  calculateMovingAverage,
  detectPerformanceAnomalies
} from './optimization';

// Performance formatting utilities
export {
  formatBytes,
  formatPerformanceMetric
} from './formatting';

// Performance budget utilities
export {
  checkPerformanceBudget,
  type PerformanceBudget
} from './budget';

// Performance analysis utilities
export {
  measurePerformanceOverhead,
  analyzePerformanceMonitoring,
  logPerformanceAnalysis,
  type PerformanceOverheadMetrics,
  type PerformanceAnalysisResult
} from './analysis';

// Circular buffer utilities
export {
  CircularBuffer,
  PerformanceCircularBuffer
} from './circularBuffer';

// Cached calculation utilities
export {
  calculatePerformanceScoreCached,
  getPerformanceSuggestionsCached,
  clearPerformanceCache,
  getCacheStats
} from './calculations';
