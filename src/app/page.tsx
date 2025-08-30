"use client";

import React, { useRef, useState } from 'react';
import styles from '@/styles/page.module.scss';
import { useGameContext } from '@/lib/game/GameContext';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { ActionList } from '@/components/game/ActionList';
import { LoopActionList } from '@/components/game/LoopActionList';
import { BuildingList } from '@/components/game/BuildingList';
import { TechnologyList } from '@/components/game/TechnologyList';
import { UpgradeList } from '@/components/game/UpgradeList';
import { Modal } from '@/components/ui/Modal';
import { EventModal } from '@/components/ui/EventModal';
import { EventNotification } from '@/components/ui/EventNotification';
import { SvgSprites } from '@/components/ui/SvgSprites';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { UI_CONSTANTS } from '@/lib/game/constants';
import { getPrestigeFormula } from '@/lib/game/prestigeSystem';
import { clearSave } from '@/lib/game/saveSystem';

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
    doExport,
    doImport,
    costFor,
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
  } = useGameContext();

  const [prestigeOpen, setPrestigeOpen] = useState(false);
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

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>🏰 Medieval Kingdom <span className={styles.tiny}>– idle/clicker</span></div>
        <div className={styles.footer}>
          <span className={styles.tiny}>Autosaves: <span className={`${styles.chip} ${secondsUntilNextSave <= 5 ? styles.timerSave : ''}`}>{timeUntilNextSave}</span></span>
          <span className={styles.tiny}>Next Event: <span className={`${styles.chip} ${secondsUntilNextEvent <= 10 ? styles.timerUrgent : ''}`}>{timeUntilNextEvent}</span></span>
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

      <main className={styles.wrap}>
        <section className={styles.card}>
          <h2>Resources</h2>
          <div className={styles.section}>
            <ResourceDisplay state={state} perSec={perSec} />
            <div className={styles.hr}></div>
            <div className={styles.controls}>
              <ActionList 
                state={state} 
                onExecuteAction={handleExecuteAction} 
                fmt={fmt} 
              />
              <span className={styles.tiny}>Actions unlock through progression.</span>
              <span className={styles.right}></span>
              <button className={`${styles.button} ${styles.bad}`} onClick={() => setPrestigeOpen(true)}>Ascend to Greater Kingdom (Prestige)</button>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Loop Actions</h2>
          <LoopActionList 
            gameState={state} 
            onToggleLoopAction={handleToggleLoopAction} 
          />
        </section>

        <section className={styles.card}>
          <h2>Buildings</h2>
          <BuildingList 
            state={state} 
            costFor={costFor} 
            onBuyBuilding={handleBuyBuilding} 
          />
        </section>

        <section className={styles.card}>
          <h2>Technologies</h2>
          <TechnologyList 
            state={state} 
            onResearchTechnology={handleResearchTechnology} 
          />
        </section>

        <section className={`${styles.card} ${styles.fullRow}`}>
          <h2>Prestige Upgrades</h2>
          <UpgradeList 
            state={state} 
            onBuyUpgrade={handleBuyUpgrade} 
          />
        </section>

        <section className={`${styles.card} ${styles.fullRow}`}>
          <PerformanceMonitor />
        </section>
      </main>

      <Modal 
        isOpen={prestigeOpen} 
        onClose={() => setPrestigeOpen(false)}
        title="Ascend to Greater Kingdom"
      >
        <p>Prestiging resets your resources and buildings, but grants <strong>Prestige</strong> based on your total <strong>Food</strong> generated. Prestige unlocks powerful permanent upgrades.</p>
        <p>Current potential Prestige: <span style={{ color: 'var(--good)' }}>{fmt(prestigePotential)}</span></p>
        <div className={styles.hr}></div>
        <div className={styles.row}>
          <button className={styles.bad} onClick={() => { handleDoPrestige(); setPrestigeOpen(false); }}>Ascend Now</button>
          <span className={styles.tiny}>Formula: {getPrestigeFormula()}</span>
        </div>
      </Modal>

      <Modal 
        isOpen={helpOpen} 
        onClose={() => setHelpOpen(false)}
        title="How to play"
      >
        <ul>
          <li>Click <em>Issue Royal Decree</em> to gain starter <strong>Gold</strong> and <strong>Food</strong>.</li>
          <li>Buy buildings. They produce resources continuously</li>
          <li>When progress slows, open <em>Ascend to Greater Kingdom</em> to prestige and spend <strong>Prestige</strong> on upgrades.</li>
          <li>Everything is data-driven – you can add new resources or buildings by editing the CONFIG object in the source.</li>
        </ul>
      </Modal>

      <EventNotification />
      
      <EventModal 
        isOpen={state?.events.activeEvent !== null} 
        onClose={() => {}} 
      />

      <SvgSprites />
    </div>
  );
}
