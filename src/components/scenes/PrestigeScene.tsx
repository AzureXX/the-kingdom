import React, { memo, useState } from 'react';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { UpgradeList } from '@/components/game/UpgradeList';
import { Modal } from '@/components/ui/Modal';
import { SCENE_CONFIGS } from '@/lib/game/types/scenes';
import { getPrestigeFormula } from '@/lib/game/prestigeSystem';
import type { GameState, ResourceAmount, PrestigeUpgradeKey } from '@/lib/game/types';
import styles from '@/styles/scenes/SceneLayout.module.scss';

interface PrestigeSceneProps {
  state: GameState;
  perSec: ResourceAmount;
  prestigePotential: number;
  fmt: (n: number, decimals?: number) => string;
  onBuyUpgrade: (key: PrestigeUpgradeKey) => void;
  onDoPrestige: () => void;
}

export const PrestigeScene = memo(function PrestigeScene({
  state,
  perSec,
  prestigePotential,
  fmt,
  onBuyUpgrade,
  onDoPrestige
}: PrestigeSceneProps) {
  const config = SCENE_CONFIGS.prestige;
  const [prestigeModalOpen, setPrestigeModalOpen] = useState(false);

  // Calculate prestige statistics
  const totalPrestige = state.resources.prestige || 0;
  const totalUpgrades = Object.values(state.upgrades).reduce((sum, level) => sum + level, 0);
  const maxUpgradeLevels = Object.values(state.upgrades).reduce((max, level) => Math.max(max, level), 0);

  const handlePrestige = () => {
    onDoPrestige();
    setPrestigeModalOpen(false);
  };

  return (
    <div className={`${styles.sceneContainer} ${styles.prestige}`}>
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

        <section style={{ 
          marginBottom: '2rem',
          background: 'rgba(156, 39, 176, 0.1)',
          border: '1px solid rgba(156, 39, 176, 0.3)',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#9C27B0', fontSize: '1.25rem' }}>
            👑 Prestige System
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(156, 39, 176, 0.1)', 
              border: '1px solid rgba(156, 39, 176, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👑</div>
              <div style={{ fontWeight: 'bold', color: '#9C27B0', marginBottom: '0.25rem' }}>
                Current Prestige
              </div>
              <div style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                {fmt(totalPrestige)}
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(156, 39, 176, 0.1)', 
              border: '1px solid rgba(156, 39, 176, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
              <div style={{ fontWeight: 'bold', color: '#9C27B0', marginBottom: '0.25rem' }}>
                Potential Prestige
              </div>
              <div style={{ fontSize: '1.2rem', color: '#4CAF50' }}>
                {fmt(prestigePotential)}
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(156, 39, 176, 0.1)', 
              border: '1px solid rgba(156, 39, 176, 0.3)',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📈</div>
              <div style={{ fontWeight: 'bold', color: '#9C27B0', marginBottom: '0.25rem' }}>
                Total Upgrades
              </div>
              <div style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                {totalUpgrades}
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#b0b0b0', fontSize: '0.9rem' }}>
                Prestige resets your progress but grants permanent upgrades based on your total Food generated.
              </p>
              <p style={{ margin: 0, color: '#888', fontSize: '0.8rem', fontStyle: 'italic' }}>
                Formula: {getPrestigeFormula()}
              </p>
            </div>
            <button
              style={{
                background: 'linear-gradient(135deg, #9C27B0, #E91E63)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(156, 39, 176, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(156, 39, 176, 0.3)';
              }}
              onClick={() => setPrestigeModalOpen(true)}
            >
              Ascend to Greater Kingdom
            </button>
          </div>
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
              Prestige Upgrades
            </h2>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              fontSize: '0.9rem',
              color: '#b0b0b0'
            }}>
              <span>Total: <strong style={{ color: '#9C27B0' }}>{totalUpgrades}</strong></span>
              <span>Max Level: <strong style={{ color: '#9C27B0' }}>{maxUpgradeLevels}</strong></span>
            </div>
          </div>
          
          <UpgradeList 
            state={state} 
            onBuyUpgrade={onBuyUpgrade} 
          />
          
          <p style={{ 
            margin: '0.5rem 0 0 0', 
            color: '#888', 
            fontSize: '0.9rem', 
            fontStyle: 'italic' 
          }}>
            Prestige upgrades provide permanent bonuses that persist through resets.
          </p>
        </section>
      </main>

      <footer className={styles.sceneFooter}>
        <div className={styles.sceneFooterHint}>
          Ascend to greater heights and unlock permanent upgrades
        </div>
        <div className={styles.sceneFooterShortcuts}>
          <span className={styles.shortcutItem}>Press 4 for Prestige</span>
          <span className={styles.shortcutItem}>← → Arrow keys to navigate</span>
        </div>
      </footer>

      <Modal 
        isOpen={prestigeModalOpen} 
        onClose={() => setPrestigeModalOpen(false)}
        title="Ascend to Greater Kingdom"
      >
        <p>Prestiging resets your resources and buildings, but grants <strong>Prestige</strong> based on your total <strong>Food</strong> generated. Prestige unlocks powerful permanent upgrades.</p>
        <p>Current potential Prestige: <span style={{ color: 'var(--good)' }}>{fmt(prestigePotential)}</span></p>
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            style={{
              background: 'linear-gradient(135deg, #9C27B0, #E91E63)',
              border: 'none',
              borderRadius: '8px',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={handlePrestige}
          >
            Ascend Now
          </button>
          <span style={{ color: '#888', fontSize: '0.8rem', fontStyle: 'italic' }}>
            Formula: {getPrestigeFormula()}
          </span>
        </div>
      </Modal>
    </div>
  );
});
