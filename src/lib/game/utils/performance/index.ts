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

// Performance calculations and analysis
export {
  calculatePerformanceScore,
  getPerformanceSuggestions
} from './calculations';

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
