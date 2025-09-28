/**
 * Performance monitoring analysis utilities
 * Used to measure the overhead of performance monitoring itself
 */

import { CircularBuffer } from '@/lib/game/utils/performance/circularBuffer';

export interface PerformanceOverheadMetrics {
  monitoringOverhead: number;
  historicalDataOverhead: number;
  calculationOverhead: number;
  totalOverhead: number;
  overheadPercentage: number;
}

export interface PerformanceAnalysisResult {
  overhead: PerformanceOverheadMetrics;
  recommendations: string[];
  criticalIssues: string[];
}

/**
 * Measure the overhead of performance monitoring operations
 */
export function measurePerformanceOverhead(): PerformanceOverheadMetrics {
  const iterations = 500;
  
  // Measure monitoring overhead
  const monitoringStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    // Simulate monitoring operations
    const tickDuration = Math.random() * 10;
    const renderTime = Math.random() * 5;
    // Simulate FPS and memory calculations (results not used, just measuring overhead)
    void (1000 / (tickDuration + renderTime));
    void (Math.random() * 100000000);
  }
  const monitoringEnd = performance.now();
  const monitoringOverhead = (monitoringEnd - monitoringStart) / iterations;
  
  // Measure historical data operations overhead with circular buffers
  const historyStart = performance.now();
  const tickTimeHistory = new CircularBuffer<number>(100);
  const renderTimeHistory = new CircularBuffer<number>(100);
  const fpsHistory = new CircularBuffer<number>(100);
  
  for (let i = 0; i < iterations; i++) {
    // Simulate historical data operations with circular buffers
    tickTimeHistory.push(Math.random() * 10);
    renderTimeHistory.push(Math.random() * 5);
    fpsHistory.push(Math.random() * 60);
  }
  const historyEnd = performance.now();
  const historicalDataOverhead = (historyEnd - historyStart) / iterations;
  
  // Measure calculation overhead with circular buffer averages
  const calculationStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    // Simulate performance calculations using circular buffer averages
    const averageTickTime = tickTimeHistory.getAverage();
    const averageRenderTime = renderTimeHistory.getAverage();
    void Math.min(100, Math.max(0, 100 - (averageTickTime * 2) - (averageRenderTime * 0.1)));
  }
  const calculationEnd = performance.now();
  const calculationOverhead = (calculationEnd - calculationStart) / iterations;
  
  const totalOverhead = monitoringOverhead + historicalDataOverhead + calculationOverhead;
  const overheadPercentage = (totalOverhead / 16.67) * 100; // Assuming 60 FPS target (16.67ms per frame)
  
  return {
    monitoringOverhead,
    historicalDataOverhead,
    calculationOverhead,
    totalOverhead,
    overheadPercentage
  };
}

/**
 * Analyze performance monitoring and provide recommendations
 */
export function analyzePerformanceMonitoring(): PerformanceAnalysisResult {
  const overhead = measurePerformanceOverhead();
  const recommendations: string[] = [];
  const criticalIssues: string[] = [];
  
  // Analyze overhead
  if (overhead.overheadPercentage > 5) {
    criticalIssues.push(`Performance monitoring overhead is ${overhead.overheadPercentage.toFixed(2)}% of frame budget`);
  } else if (overhead.overheadPercentage > 2) {
    recommendations.push(`Performance monitoring overhead is ${overhead.overheadPercentage.toFixed(2)}% of frame budget - consider optimization`);
  }
  
  // Analyze historical data overhead
  if (overhead.historicalDataOverhead > 0.1) {
    recommendations.push('Historical data operations are expensive - consider using circular buffers');
  }
  
  // Analyze calculation overhead
  if (overhead.calculationOverhead > 0.05) {
    recommendations.push('Performance calculations are expensive - consider caching or reducing frequency');
  }
  
  // Analyze monitoring overhead
  if (overhead.monitoringOverhead > 0.05) {
    recommendations.push('Basic monitoring operations are expensive - consider reducing update frequency');
  }
  
  return {
    overhead,
    recommendations,
    criticalIssues
  };
}

/**
 * Log performance analysis results
 */
export function logPerformanceAnalysis(): void {
  const analysis = analyzePerformanceMonitoring();
  
  console.group('🔍 Performance Monitoring Analysis');
  console.log('📊 Overhead Metrics:');
  console.log(`  Monitoring: ${analysis.overhead.monitoringOverhead.toFixed(4)}ms`);
  console.log(`  Historical Data: ${analysis.overhead.historicalDataOverhead.toFixed(4)}ms`);
  console.log(`  Calculations: ${analysis.overhead.calculationOverhead.toFixed(4)}ms`);
  console.log(`  Total: ${analysis.overhead.totalOverhead.toFixed(4)}ms`);
  console.log(`  Percentage of Frame Budget: ${analysis.overhead.overheadPercentage.toFixed(2)}%`);
  
  if (analysis.criticalIssues.length > 0) {
    console.warn('🚨 Critical Issues:');
    analysis.criticalIssues.forEach(issue => console.warn(`  - ${issue}`));
  }
  
  if (analysis.recommendations.length > 0) {
    console.info('💡 Recommendations:');
    analysis.recommendations.forEach(rec => console.info(`  - ${rec}`));
  }
  
  console.groupEnd();
}
