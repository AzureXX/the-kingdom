"use client";

import React, { useMemo, useRef, useState } from 'react';
import styles from '@/styles/page.module.scss';
import { useGameContext } from '@/lib/game/GameContext';
import { ResourceDisplay } from '@/components/game/ResourceDisplay';
import { BuildingList } from '@/components/game/BuildingList';
import { UpgradeList } from '@/components/game/UpgradeList';
import { Modal } from '@/components/ui/Modal';
import { SvgSprites } from '@/components/ui/SvgSprites';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { getSaveTimeLabel } from '@/lib/game/utils';

export default function GamePage() {
  const {
    state,
    perSec,
    prestigePotential,
    fmt,
    handleClick,
    handleBuyBuilding,
    handleBuyUpgrade,
    handleDoPrestige,
    doExport,
    doImport,
    costFor,
    lastSavedAt,
  } = useGameContext();

  const [prestigeOpen, setPrestigeOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const saveLabel = useMemo(() => getSaveTimeLabel(lastSavedAt), [lastSavedAt]);

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
          <span className={styles.tiny}>Autosaves: <span className={styles.chip}>{saveLabel}</span></span>
          <button className={styles.button} onClick={() => setHelpOpen(true)}>Help</button>
          <button
            className={styles.button}
            onClick={() => {
              const text = doExport();
              const blob = new Blob([text], { type: 'text/plain' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = GAME_CONSTANTS.EXPORT_FILENAME;
              a.click();
            }}
          >Export Save</button>
          <input ref={fileInputRef} type="file" accept={GAME_CONSTANTS.IMPORT_FILE_TYPES} style={{ display: 'none' }} onChange={(e) => {
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
              localStorage.removeItem('medieval-kingdom-v2');
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
              <button onClick={handleClick} className={styles.button}>Issue Royal Decree (+)</button>
              <span className={styles.tiny}>Click gains scale with upgrades. Hold <span className={styles.kbd}>Space</span> to auto-click.</span>
              <span className={styles.right}></span>
              <button className={`${styles.button} ${styles.bad}`} onClick={() => setPrestigeOpen(true)}>Ascend to Greater Kingdom (Prestige)</button>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>Buildings</h2>
          <BuildingList 
            state={state} 
            costFor={costFor} 
            onBuyBuilding={handleBuyBuilding} 
          />
        </section>

        <section className={`${styles.card} ${styles.fullRow}`}>
          <h2>Prestige Upgrades</h2>
          <UpgradeList 
            state={state} 
            onBuyUpgrade={handleBuyUpgrade} 
          />
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
          <span className={styles.tiny}>Formula: floor( √(lifetimeFood / {GAME_CONSTANTS.PRESTIGE_DIVISOR}) )</span>
        </div>
      </Modal>

      <Modal 
        isOpen={helpOpen} 
        onClose={() => setHelpOpen(false)}
        title="How to play"
      >
        <ul>
          <li>Click <em>Issue Royal Decree</em> to gain starter <strong>Gold</strong> and <strong>Food</strong>.</li>
          <li>Buy buildings. They produce resources every second; some also consume inputs.</li>
          <li>When progress slows, open <em>Ascend to Greater Kingdom</em> to prestige and spend <strong>Prestige</strong> on upgrades.</li>
          <li>Everything is data-driven – you can add new resources or buildings by editing the CONFIG object in the source.</li>
        </ul>
      </Modal>

      <SvgSprites />
    </div>
  );
}
