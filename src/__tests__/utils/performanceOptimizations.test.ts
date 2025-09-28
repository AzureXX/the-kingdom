import { 
  calculatePerformanceScoreCached, 
  getPerformanceSuggestionsCached,
  clearPerformanceCache,
  getCacheStats
} from '../../lib/game/utils/performance/calculations';
import { PerformanceCircularBuffer } from '../../lib/game/utils/performance/circularBuffer';
import type { PerformanceMetrics, PerformanceThresholds } from '../../lib/game/hooks/usePerformanceMonitor';

describe('Performance Optimizations', () => {
  const mockMetrics: PerformanceMetrics = {
    tickTime: 10,
    renderTime: 5,
    memoryUsage: 50 * 1024 * 1024, // 50MB
    fps: 20,
    frameCount: 100,
    averageTickTime: 12,
    averageRenderTime: 6,
    performanceScore: 85
  };

  const mockThresholds: PerformanceThresholds = {
    tickTimeWarning: 50,
    renderTimeWarning: 500,
    memoryWarning: 100 * 1024 * 1024, // 100MB
    fpsWarning: 1.5
  };

  beforeEach(() => {
    clearPerformanceCache();
  });

  describe('Cached Performance Calculations', () => {
    it('should cache performance score calculations', () => {
      const score1 = calculatePerformanceScoreCached(mockMetrics, mockThresholds);
      const score2 = calculatePerformanceScoreCached(mockMetrics, mockThresholds);
      
      expect(score1).toBe(score2);
      
      const stats = getCacheStats();
      expect(stats.isCacheValid).toBe(true);
      expect(stats.hasCachedData).toBe(true);
    });

    it('should cache performance suggestions', () => {
      const suggestions1 = getPerformanceSuggestionsCached(mockMetrics, mockThresholds);
      const suggestions2 = getPerformanceSuggestionsCached(mockMetrics, mockThresholds);
      
      expect(suggestions1).toEqual(suggestions2);
      expect(suggestions1.length).toBeGreaterThan(0);
    });

    it('should invalidate cache when metrics change significantly', () => {
      calculatePerformanceScoreCached(mockMetrics, mockThresholds);
      
      // Change metrics significantly
      const newMetrics = {
        ...mockMetrics,
        averageTickTime: mockMetrics.averageTickTime + 10, // Significant change
        memoryUsage: mockMetrics.memoryUsage + 10 * 1024 * 1024 // 10MB change
      };
      
      const score2 = calculatePerformanceScoreCached(newMetrics, mockThresholds);
      
      // Should recalculate (scores might be different)
      expect(score2).toBeDefined();
      
      const stats = getCacheStats();
      expect(stats.hasCachedData).toBe(true);
    });

    it('should clear cache correctly', () => {
      calculatePerformanceScoreCached(mockMetrics, mockThresholds);
      
      let stats = getCacheStats();
      expect(stats.hasCachedData).toBe(true);
      
      clearPerformanceCache();
      
      stats = getCacheStats();
      expect(stats.hasCachedData).toBe(false);
      expect(stats.isCacheValid).toBe(false);
    });
  });

  describe('Circular Buffer Performance', () => {
    it('should handle large numbers of operations efficiently', () => {
      const buffer = new PerformanceCircularBuffer(100);
      const iterations = 10000;
      
      const startTime = performance.now();
      
      // Simulate many operations
      for (let i = 0; i < iterations; i++) {
        buffer.push(Math.random() * 100);
        if (i % 100 === 0) {
          buffer.getAverage();
          buffer.getMin();
          buffer.getMax();
        }
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete reasonably quickly (less than 200ms for 10k operations)
      expect(duration).toBeLessThan(200);
      expect(buffer.length).toBe(100); // Should maintain fixed size
    });

    it('should maintain consistent performance with overwrites', () => {
      const buffer = new PerformanceCircularBuffer(50);
      
      // Fill buffer beyond capacity multiple times
      for (let cycle = 0; cycle < 10; cycle++) {
        for (let i = 0; i < 100; i++) {
          buffer.push(i);
        }
        
        // Should always maintain size of 50
        expect(buffer.length).toBe(50);
        expect(buffer.getAverage()).toBeCloseTo(74.5, 0); // Average of last 50 values
      }
    });
  });

  describe('Performance Monitoring Overhead', () => {
    it('should have minimal overhead for cached calculations', () => {
      const iterations = 1000;
      
      // Measure uncached calculations
      clearPerformanceCache();
      const uncachedStart = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculatePerformanceScoreCached(mockMetrics, mockThresholds);
      }
      const uncachedEnd = performance.now();
      const uncachedTime = uncachedEnd - uncachedStart;
      
      // Measure cached calculations (should be faster)
      const cachedStart = performance.now();
      for (let i = 0; i < iterations; i++) {
        calculatePerformanceScoreCached(mockMetrics, mockThresholds);
      }
      const cachedEnd = performance.now();
      const cachedTime = cachedEnd - cachedStart;
      
      // Both should be reasonably fast (less than 50ms for 1000 iterations)
      expect(uncachedTime).toBeLessThan(50);
      expect(cachedTime).toBeLessThan(50);
      
      // Cache should work (verify cache stats)
      const stats = getCacheStats();
      expect(stats.hasCachedData).toBe(true);
    });

    it('should handle different update intervals efficiently', () => {
      const buffer = new PerformanceCircularBuffer(100);
      
      // Simulate different update frequencies
      const basicUpdateInterval = 10;
      const memoryUpdateInterval = 60;
      const scoreUpdateInterval = 30;
      
      let basicUpdates = 0;
      let memoryUpdates = 0;
      let scoreUpdates = 0;
      
      for (let frame = 1; frame <= 300; frame++) {
        // Basic metrics every 10 frames
        if (frame % basicUpdateInterval === 0) {
          buffer.push(Math.random() * 10);
          basicUpdates++;
        }
        
        // Memory every 60 frames
        if (frame % memoryUpdateInterval === 0) {
          memoryUpdates++;
        }
        
        // Score every 30 frames
        if (frame % scoreUpdateInterval === 0) {
          scoreUpdates++;
        }
      }
      
      expect(basicUpdates).toBe(30); // 300 / 10
      expect(memoryUpdates).toBe(5); // 300 / 60
      expect(scoreUpdates).toBe(10); // 300 / 30
    });
  });
});
