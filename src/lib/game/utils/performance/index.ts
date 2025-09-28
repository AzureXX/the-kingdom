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
} from '@/lib/game/utils/performance/monitoring';

// Performance optimization tools
export {
  debounce,
  throttle,
  calculateMovingAverage,
  detectPerformanceAnomalies
} from '@/lib/game/utils/performance/optimization';

// Performance formatting utilities
export {
  formatBytes,
  formatPerformanceMetric
} from '@/lib/game/utils/performance/formatting';

// Performance budget utilities
export {
  checkPerformanceBudget,
  type PerformanceBudget
} from '@/lib/game/utils/performance/budget';

// Performance analysis utilities
export {
  measurePerformanceOverhead,
  analyzePerformanceMonitoring,
  logPerformanceAnalysis,
  type PerformanceOverheadMetrics,
  type PerformanceAnalysisResult
} from '@/lib/game/utils/performance/analysis';

// Circular buffer utilities
export {
  CircularBuffer,
  PerformanceCircularBuffer
} from '@/lib/game/utils/performance/circularBuffer';

// Cached calculation utilities
export {
  calculatePerformanceScoreCached,
  getPerformanceSuggestionsCached,
  clearPerformanceCache,
  getCacheStats
} from '@/lib/game/utils/performance/calculations';
