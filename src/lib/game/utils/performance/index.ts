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


// Performance formatting utilities
export {
  formatBytes
} from '@/lib/game/utils/performance/formatting';

// Performance budget utilities
export {
  checkPerformanceBudget,
  type PerformanceBudget
} from '@/lib/game/utils/performance/budget';


// Circular buffer utilities
export {
  CircularBuffer,
  PerformanceCircularBuffer
} from '@/lib/game/utils/performance/circularBuffer';

// Cached calculation utilities
export {
  calculatePerformanceScoreCached,
  getPerformanceSuggestionsCached,
} from '@/lib/game/utils/performance/calculations';
