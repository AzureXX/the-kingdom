import React, { memo } from 'react';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { BuildingList } from '@/components/game/BuildingList';
import { SCENE_CONFIGS } from '@/lib/game/types/scenes';
import type { BuildingSceneProps } from '@/lib/game/types/context';
import styles from '@/styles/scenes/SceneLayout.module.scss';

export const BuildingsScene = memo(function BuildingsScene({
  state,
  perSec,
  costFor,
  onBuyBuilding
}: BuildingSceneProps) {
  const config = SCENE_CONFIGS.buildings;

  // Calculate building statistics
  const totalBuildings = Object.values(state.buildings).reduce((sum, count) => sum + count, 0);
  const unlockedBuildings = Object.keys(state.buildings).length;

  return (
    <div className={`${styles.sceneContainer} ${styles.buildings}`}>
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
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <h2 style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem' }}>
                  Buildings
                </h2>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  fontSize: '0.9rem',
                  color: '#b0b0b0'
                }}>
                  <span>Total: <strong style={{ color: '#2196F3' }}>{totalBuildings}</strong></span>
                  <span>Types: <strong style={{ color: '#2196F3' }}>{unlockedBuildings}</strong></span>
                </div>
              </div>
              
              <BuildingList 
                state={state} 
                costFor={costFor} 
                onBuyBuilding={onBuyBuilding} 
              />
              
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#888', 
                fontSize: '0.9rem', 
                fontStyle: 'italic' 
              }}>
                Buildings provide continuous resource production and unlock new actions.
              </p>
            </section>
          </div>

          <div>
            <section>
              <h3 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.1rem' }}>
                Building Benefits
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <div style={{ 
                  background: 'rgba(33, 150, 243, 0.1)', 
                  border: '1px solid rgba(33, 150, 243, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏭</div>
                  <div style={{ fontWeight: 'bold', color: '#2196F3', marginBottom: '0.25rem' }}>
                    Production
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                    Buildings generate resources automatically
                  </div>
                </div>
                
                <div style={{ 
                  background: 'rgba(33, 150, 243, 0.1)', 
                  border: '1px solid rgba(33, 150, 243, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔓</div>
                  <div style={{ fontWeight: 'bold', color: '#2196F3', marginBottom: '0.25rem' }}>
                    Unlocks
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                    Buildings unlock new actions and technologies
                  </div>
                </div>
                
                <div style={{ 
                  background: 'rgba(33, 150, 243, 0.1)', 
                  border: '1px solid rgba(33, 150, 243, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📈</div>
                  <div style={{ fontWeight: 'bold', color: '#2196F3', marginBottom: '0.25rem' }}>
                    Scaling
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                    More buildings = more production
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className={styles.sceneFooter}>
        <div className={styles.sceneFooterHint}>
          Construct and manage buildings to expand your kingdom`s infrastructure
        </div>
        <div className={styles.sceneFooterShortcuts}>
          <span className={styles.shortcutItem}>Press 2 for Buildings</span>
          <span className={styles.shortcutItem}>← → Arrow keys to navigate</span>
        </div>
      </footer>
    </div>
  );
});
