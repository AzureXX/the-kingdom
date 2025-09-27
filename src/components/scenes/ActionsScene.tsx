import React, { memo } from 'react';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { ActionList } from '@/components/game/ActionList';
import { LoopActionList } from '@/components/game/LoopActionList';
import { SCENE_CONFIGS } from '@/lib/game/types/scenes';
import type { ActionKey, LoopActionKey } from '@/lib/game/types';
import type { BaseSceneProps } from '@/lib/game/types/context';
import styles from '@/styles/scenes/SceneLayout.module.scss';

interface ActionsSceneProps extends BaseSceneProps {
  onExecuteAction: (actionKey: ActionKey) => void;
  onToggleLoopAction: (actionKey: LoopActionKey) => void;
}

export const ActionsScene = memo(function ActionsScene({
  state,
  perSec,
  fmt,
  onExecuteAction,
  onToggleLoopAction
}: ActionsSceneProps) {
  const config = SCENE_CONFIGS.actions;

  return (
    <div className={`${styles.sceneContainer} ${styles.actions}`}>
      <header className={styles.sceneHeader}>
        <h1 className={styles.sceneTitle}>
          <span className={styles.sceneIcon}>{config.icon}</span>
          {config.title}
        </h1>
        <p className={styles.sceneDescription}>{config.description}</p>
      </header>

      <main className={styles.sceneContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <section style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.25rem' }}>
                Resources
              </h2>
              <ResourceDisplay state={state} perSec={perSec} />
            </section>

            <section>
              <h2 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.25rem' }}>
                Manual Actions
              </h2>
              <ActionList 
                state={state} 
                onExecuteAction={onExecuteAction} 
                fmt={fmt} 
              />
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#888', 
                fontSize: '0.9rem', 
                fontStyle: 'italic' 
              }}>
                Actions unlock through progression and building construction.
              </p>
            </section>
          </div>

          <div>
            <section>
              <h2 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.25rem' }}>
                Automated Loop Actions
              </h2>
              <LoopActionList 
                gameState={state} 
                onToggleLoopAction={onToggleLoopAction} 
              />
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#888', 
                fontSize: '0.9rem', 
                fontStyle: 'italic' 
              }}>
                Loop actions run continuously and provide passive resource generation.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className={styles.sceneFooter}>
        <div className={styles.sceneFooterHint}>
          Manage your kingdom`s daily operations and automated processes
        </div>
        <div className={styles.sceneFooterShortcuts}>
          <span className={styles.shortcutItem}>Press 1 for Actions</span>
          <span className={styles.shortcutItem}>← → Arrow keys to navigate</span>
        </div>
      </footer>
    </div>
  );
});
