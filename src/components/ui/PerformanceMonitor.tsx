import React, { useState } from 'react';
import { useGameStateContext } from '@/lib/game/providers';
import styles from '@/styles/page.module.scss';

export const PerformanceMonitor: React.FC = () => {
  const { performanceMetrics, performanceFunctions } = useGameStateContext();
  const [showDetailed, setShowDetailed] = useState(false);

  const formatMemory = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    return ms.toFixed(2) + 'ms';
  };

  const getPerformanceColor = (score: number): string => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'optimization': return '🔧';
      default: return '•';
    }
  };

  const performanceSuggestions = performanceFunctions.getPerformanceSuggestions();

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Performance Monitor</h2>
        <button
          onClick={() => setShowDetailed(!showDetailed)}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: showDetailed ? '#007bff' : '#fff',
            color: showDetailed ? '#fff' : '#333',
            cursor: 'pointer'
          }}
        >
          {showDetailed ? 'Simple View' : 'Detailed View'}
        </button>
      </div>

      {/* Performance Score */}
      <div className={styles.section} style={{ marginBottom: '1rem' }}>
        <div className={styles.row}>
          <span className={styles.tiny}>Performance Score:</span>
          <span 
            className={styles.pill} 
            style={{ 
              background: getPerformanceColor(performanceMetrics.performanceScore),
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {performanceMetrics.performanceScore}/100
          </span>
        </div>
      </div>

      {/* Basic Metrics */}
      <div className={styles.section}>
        <div className={styles.row}>
          <span className={styles.tiny}>FPS:</span>
          <span className={styles.pill}>{performanceMetrics.fps.toFixed(1)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.tiny}>Frame Count:</span>
          <span className={styles.pill}>{performanceMetrics.frameCount.toLocaleString()}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.tiny}>Tick Time:</span>
          <span className={styles.pill}>{formatTime(performanceMetrics.tickTime)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.tiny}>Render Time:</span>
          <span className={styles.pill}>{formatTime(performanceMetrics.renderTime)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.tiny}>Memory Usage:</span>
          <span className={styles.pill}>{formatMemory(performanceMetrics.memoryUsage)}</span>
        </div>
      </div>

      {/* Detailed Metrics */}
      {showDetailed && (
        <>
          <div className={styles.section}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Averages (Last 100 Frames)</h3>
            <div className={styles.row}>
              <span className={styles.tiny}>Avg Tick Time:</span>
              <span className={styles.pill}>{formatTime(performanceMetrics.averageTickTime)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.tiny}>Avg Render Time:</span>
              <span className={styles.pill}>{formatTime(performanceMetrics.averageRenderTime)}</span>
            </div>
          </div>

          {/* Performance Suggestions */}
          {performanceSuggestions.length > 0 && (
            <div className={styles.section}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Performance Insights</h3>
              {performanceSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  style={{ 
                    padding: '0.5rem',
                    margin: '0.25rem 0',
                    border: `1px solid ${getPriorityColor(suggestion.priority)}`,
                    borderRadius: '4px',
                    background: `${getPriorityColor(suggestion.priority)}10`,
                    fontSize: '0.9rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{getTypeIcon(suggestion.type)}</span>
                    <span style={{ fontWeight: 'bold' }}>{suggestion.message}</span>
                  </div>
                  <div style={{ 
                    marginTop: '0.25rem', 
                    fontSize: '0.8rem', 
                    color: getPriorityColor(suggestion.priority),
                    fontWeight: 'bold'
                  }}>
                    Priority: {suggestion.priority.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
