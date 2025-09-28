"use client";

import React, { useRef, useState } from 'react';

import { useGameContext } from '@/lib/game/GameContext';
import { useSceneNavigation } from '@/hooks/useSceneNavigation';
import { 
  SceneNavigation, 
  ActionsScene, 
  BuildingsScene, 
  ResearchScene, 
  PrestigeScene, 
  PerformanceScene,
  AchievementScene
} from '@/components/scenes';
import { Modal } from '@/components/ui/Modal';
import { EventModal } from '@/components/ui/EventModal';
import { EventNotification } from '@/components/ui/EventNotification';
import { AchievementNotification } from '@/components/ui/AchievementNotification';
import { SvgSprites } from '@/components/ui/SvgSprites';
import { UI_CONSTANTS } from '@/lib/game/constants';
import { clearSave } from '@/lib/game/utils/save';

import styles from '@/styles/page.module.scss';

export default function GamePage() {
  const {
    state,
    perSec,
    prestigePotential,
    fmt,
    handleExecuteAction,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleResearchTechnology,
    handleDoPrestige,
    handleToggleLoopAction,
    handleTogglePause,
    doExport,
    doImport,
    costFor,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
  } = useGameContext();

  const {
    currentScene,
    isTransitioning,
    changeScene
  } = useSceneNavigation();

  // Add keyboard shortcut for pause (Space bar)
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        handleTogglePause();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleTogglePause]);

  const [helpOpen, setHelpOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!state) {
    return (
      <div className={styles.page}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Loading game...</div>
        </div>
      </div>
    );
  }

  const renderCurrentScene = () => {
    const sceneProps = {
      state,
      perSec,
      fmt,
      costFor,
      onExecuteAction: handleExecuteAction,
      onBuyBuilding: handleBuyBuilding,
      onBuyUpgrade: handleBuyUpgrade,
      onResearchTechnology: handleResearchTechnology,
      onToggleLoopAction: handleToggleLoopAction,
      prestigePotential
    };

    switch (currentScene) {
      case 'actions':
        return <ActionsScene {...sceneProps} />;
      case 'buildings':
        return <BuildingsScene {...sceneProps} />;
      case 'research':
        return <ResearchScene {...sceneProps} />;
      case 'prestige':
        return <PrestigeScene {...sceneProps} onDoPrestige={handleDoPrestige} />;
      case 'performance':
        return <PerformanceScene {...sceneProps} />;
      case 'achievements':
        return <AchievementScene {...sceneProps} />;
      default:
        return <ActionsScene {...sceneProps} />;
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>🏰 Medieval Kingdom <span className={styles.tiny}>– idle/clicker</span></div>
        <div className={styles.footer}>
          <span className={styles.tiny}>Autosaves: <span className={`${styles.chip} ${secondsUntilNextSave <= 5 ? styles.timerSave : ''}`}>{timeUntilNextSave}</span></span>
          <span className={styles.tiny}>Next Event: <span className={`${styles.chip} ${secondsUntilNextEvent <= 10 ? styles.timerUrgent : ''}`}>{timeUntilNextEvent}</span></span>
          <button 
            className={`${styles.button} ${state.isPaused ? styles.warn : ''}`} 
            onClick={handleTogglePause}
            title={state.isPaused ? 'Resume Game' : 'Pause Game'}
          >
            {state.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button className={styles.button} onClick={() => setHelpOpen(true)}>Help</button>
          <button
            className={styles.button}
            onClick={() => {
              const text = doExport();
              const blob = new Blob([text], { type: 'text/plain' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = UI_CONSTANTS.EXPORT_FILENAME;
              a.click();
            }}
          >Export Save</button>
          <input ref={fileInputRef} type="file" accept={UI_CONSTANTS.IMPORT_FILE_TYPES} style={{ display: 'none' }} onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const fr = new FileReader();
            fr.onload = () => {
              const text = String(fr.result || '');
              const ok = doImport(text);
              if (!ok) alert('Import failed or version mismatch.');
            };
            fr.readAsText(f);
            e.currentTarget.value = '';
          }} />
          <button className={styles.button} onClick={() => fileInputRef.current?.click()}>Import Save</button>
          <button className={`${styles.button} ${styles.warn}`} onClick={() => {
            if (confirm('Hard reset all progress?')) {
              clearSave();
              location.reload();
            }
          }}>Hard Reset</button>
        </div>
      </header>
      
      <SceneNavigation 
        currentScene={currentScene}
        onSceneChange={changeScene}
        disabled={isTransitioning}
      />
      
      <main className={`${styles.wrap} ${isTransitioning ? styles.transitioning : ''}`}>
        {renderCurrentScene()}
      </main>

      <Modal 
        isOpen={helpOpen} 
        onClose={() => setHelpOpen(false)}
        title="How to play"
      >
        <ul>
          <li>Use the scene navigation tabs to switch between different game aspects</li>
          <li>Click <em>Issue Royal Decree</em> to gain starter <strong>Gold</strong> and <strong>Food</strong></li>
          <li>Buy buildings in the Buildings scene - they produce resources continuously</li>
          <li>Research technologies in the Research scene to unlock new buildings and actions</li>
          <li>When progress slows, use the Prestige scene to ascend and spend <strong>Prestige</strong> on upgrades</li>
          <li>Monitor performance in the Performance scene</li>
          <li>Use number keys (1-6) or arrow keys to navigate between scenes</li>
        </ul>
      </Modal>

      <EventNotification />
      <AchievementNotification />
      
      <EventModal 
        isOpen={state?.events.activeEvent !== null} 
        onClose={() => {}} 
      />

      <SvgSprites />
    </div>
  );
}
