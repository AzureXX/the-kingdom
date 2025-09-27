import React, { memo } from 'react';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { TechnologyList } from '@/components/game/TechnologyList';
import { SCENE_CONFIGS } from '@/lib/game/types/scenes';
import { getResearchProgress, getResearchTimeRemaining } from '@/lib/game/technologySystem';
import type { ResearchSceneProps } from '@/lib/game/types/context';
import styles from '@/styles/scenes/SceneLayout.module.scss';

export const ResearchScene = memo(function ResearchScene({
  state,
  perSec,
  onResearchTechnology
}: ResearchSceneProps) {
  const config = SCENE_CONFIGS.research;

  // Calculate research statistics
  const researchedCount = Object.values(state.technologies).filter(count => count > 0).length;
  const totalTechnologies = Object.keys(state.technologies).length;
  const activeResearch = state.research.activeResearch;
  const researchProgress = getResearchProgress(state);
  const timeRemaining = getResearchTimeRemaining(state);

  return (
    <div className={`${styles.sceneContainer} ${styles.research}`}>
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

            {activeResearch && (
              <section style={{ 
                marginBottom: '1.5rem',
                background: 'rgba(255, 152, 0, 0.1)',
                border: '1px solid rgba(255, 152, 0, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#FF9800', fontSize: '1.1rem' }}>
                  🔬 Currently Researching
                </h3>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
                    {state.research.activeResearch}
                  </span>
                  <span style={{ color: '#FF9800', fontSize: '0.9rem' }}>
                    {researchProgress.toFixed(1)}% complete
                  </span>
                </div>
                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '4px',
                  height: '8px',
                  overflow: 'hidden',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ 
                    background: 'linear-gradient(90deg, #FF9800, #FFC107)',
                    height: '100%',
                    width: `${researchProgress}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                  Time remaining: {timeRemaining}s
                </div>
              </section>
            )}

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
                  Technologies
                </h2>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  fontSize: '0.9rem',
                  color: '#b0b0b0'
                }}>
                  <span>Researched: <strong style={{ color: '#FF9800' }}>{researchedCount}/{totalTechnologies}</strong></span>
                  {activeResearch && (
                    <span>Progress: <strong style={{ color: '#FF9800' }}>{researchProgress.toFixed(1)}%</strong></span>
                  )}
                </div>
              </div>
              
              <TechnologyList 
                state={state} 
                onResearchTechnology={onResearchTechnology} 
              />
              
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#888', 
                fontSize: '0.9rem', 
                fontStyle: 'italic' 
              }}>
                Research technologies to unlock advanced buildings and new capabilities.
              </p>
            </section>
          </div>

          <div>
            <section>
              <h3 style={{ margin: '0 0 1rem 0', color: '#ffffff', fontSize: '1.1rem' }}>
                Research Benefits
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr', 
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <div style={{ 
                  background: 'rgba(255, 152, 0, 0.1)', 
                  border: '1px solid rgba(255, 152, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏗️</div>
                  <div style={{ fontWeight: 'bold', color: '#FF9800', marginBottom: '0.25rem' }}>
                    Unlock Buildings
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                    Advanced buildings require research
                  </div>
                </div>
                
                <div style={{ 
                  background: 'rgba(255, 152, 0, 0.1)', 
                  border: '1px solid rgba(255, 152, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
                  <div style={{ fontWeight: 'bold', color: '#FF9800', marginBottom: '0.25rem' }}>
                    New Actions
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                    Research unlocks powerful actions
                  </div>
                </div>
                
                <div style={{ 
                  background: 'rgba(255, 152, 0, 0.1)', 
                  border: '1px solid rgba(255, 152, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔬</div>
                  <div style={{ fontWeight: 'bold', color: '#FF9800', marginBottom: '0.25rem' }}>
                    Research Points
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#b0b0b0' }}>
                    Earn research points for discoveries
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className={styles.sceneFooter}>
        <div className={styles.sceneFooterHint}>
          Advance your kingdom through scientific research and technological innovation
        </div>
        <div className={styles.sceneFooterShortcuts}>
          <span className={styles.shortcutItem}>Press 3 for Research</span>
          <span className={styles.shortcutItem}>← → Arrow keys to navigate</span>
        </div>
      </footer>
    </div>
  );
});
