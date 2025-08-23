import React from 'react';
import { useGameContext } from '@/lib/game/GameContext';
import styles from '@/styles/page.module.scss';

export const PerformanceMonitor: React.FC = () => {
  const { performanceMetrics } = useGameContext();

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

  return (
    <div className={styles.card}>
      <h2>Performance Monitor</h2>
      <div className={styles.section}>
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
    </div>
  );
};
