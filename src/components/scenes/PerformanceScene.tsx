import React, { memo } from 'react';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { ConfigurationValidator } from '@/components/ui/ConfigurationValidator';
import { SCENE_CONFIGS } from '@/lib/game/types/scenes';
import type { GameState, ResourceAmount } from '@/lib/game/types';
import styles from '@/styles/scenes/SceneLayout.module.scss';

interface PerformanceSceneProps {
  state: GameState;
  perSec: ResourceAmount;
}

export const PerformanceScene = memo(function PerformanceScene({
  state,
  perSec
}: PerformanceSceneProps) {
  const config = SCENE_CONFIGS.performance;

  return (
    <div className={`${styles.sceneContainer} ${styles.performance}`}>
      <header className={styles.sceneHeader}>
        <h1 className={styles.sceneTitle}>
          <span className={styles.sceneIcon}>{config.icon}</span>
          {config.title}
        </h1>
        <p className={styles.sceneDescription}>{config.description}</p>
      </header>

      <main className={styles.sceneContent}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.25rem' }}>
            Resources
          </h2>
          <ResourceDisplay state={state} perSec={perSec} />
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.25rem' }}>
            Performance Monitor
          </h2>
          <PerformanceMonitor />
        </section>

        <section>
          <h2 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.25rem' }}>
            System Validation
          </h2>
          <ConfigurationValidator />
        </section>
      </main>

      <footer className={styles.sceneFooter}>
        <div className={styles.sceneFooterHint}>
          Monitor game performance and system health
        </div>
        <div className={styles.sceneFooterShortcuts}>
          <span className={styles.shortcutItem}>Press 5 for Performance</span>
          <span className={styles.shortcutItem}>← → Arrow keys to navigate</span>
        </div>
      </footer>
    </div>
  );
});
