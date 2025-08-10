"use client";

import React, { useMemo, useRef, useState } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG, type BuildingKey, type PrestigeUpgradeKey } from '@/lib/game/config';
import { useGame } from '@/lib/game/useGame';

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
  } = useGame();

  const [prestigeOpen, setPrestigeOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const saveLabel = useMemo(() => {
    if (!lastSavedAt) return 'never';
    const diff = Date.now() - lastSavedAt;
    if (diff < 3000) return 'just now';
    return 'a moment ago';
  }, [lastSavedAt]);

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
              a.download = 'medieval-kingdom.save.txt';
              a.click();
            }}
          >Export Save</button>
          <input ref={fileInputRef} type="file" accept=".txt,.save" style={{ display: 'none' }} onChange={(e) => {
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
            <div className={styles.resources}>
              {Object.keys(CONFIG.resources).map((key) => {
                const res = CONFIG.resources[key as keyof typeof CONFIG.resources];
                const v = state.resources[key as keyof typeof state.resources] || 0;
                const per = perSec[key as keyof typeof perSec] || 0;
                const cls = per >= 0 ? styles.good : styles.bad;
                return (
                  <div key={key} className={styles.res}>
                    <span className={styles.icon} style={{ color: key === 'influence' ? '#ffd166' : '#8ea2ff' }}>
                      <svg className={styles.icon}><use href={`#${res.icon}`}></use></svg>
                    </span>
                    <div className={styles.meta}>
                      <div className={styles.amt}>{res.name}: {fmt(v as number, res.decimals)}</div>
                      <small className={`${styles.tiny} ${cls}`}>{per >= 0 ? '+' : ''}{fmt(per as number, res.decimals)}/s</small>
                    </div>
                  </div>
                );
              })}
            </div>
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
          <div className={`${styles.section} ${styles.buy}`}>
            {(Object.keys(CONFIG.buildings) as BuildingKey[]).map((k) => {
              const b = CONFIG.buildings[k as keyof typeof CONFIG.buildings];
              const owned = state.buildings[k as keyof typeof state.buildings] || 0;
              const cost = costFor(k as BuildingKey);
              const costStr = Object.entries(cost).map(([r, v]) => `${CONFIG.resources[r as keyof typeof CONFIG.resources].name} ${fmt(v as number)}`).join(' · ');
              const ok = Object.entries(cost).every(([r, v]) => (state.resources[r as keyof typeof state.resources] || 0) >= (v || 0));
              return (
                <div key={k} className={styles.build}>
                  <span className={styles.icon} style={{ color: '#bfc9ff' }}>
                    <svg className={styles.icon}><use href={`#${b.icon}`}></use></svg>
                  </span>
                  <div className={styles.meta}>
                    <div className={styles.name}>{b.name} <span className={styles.pill}>x{owned}</span></div>
                    <div className={`${styles.tiny} ${styles.dim}`}>{b.desc}</div>
                    <div className={styles.tiny}>Cost: {costStr}</div>
                  </div>
                  <div>
                    <button className={styles.button} disabled={!ok} onClick={() => handleBuyBuilding(k)}>Buy</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`${styles.card} ${styles.fullRow}`}>
          <h2>Prestige Upgrades</h2>
          <div className={`${styles.section} ${styles.grid2}`}>
            {(Object.keys(CONFIG.prestige.upgrades) as PrestigeUpgradeKey[]).map((key) => {
              const u = CONFIG.prestige.upgrades[key as keyof typeof CONFIG.prestige.upgrades];
              const lvl = state.upgrades[key as keyof typeof state.upgrades] || 0;
              const cost = Math.ceil(u.costCurve(lvl as number));
              const ok = (state.resources.prestige || 0) >= cost && (lvl as number) < u.max;
              return (
                <div key={key} className={styles.upgrade}>
                  <div className={styles.row} style={{ gap: 12, alignItems: 'center' }}>
                    <span className={styles.icon} style={{ color: '#ffd166' }}>
                      <svg className={styles.icon}><use href={`#${u.icon}`}></use></svg>
                    </span>
                    <div>
                      <div className={styles.name}>{u.name} <span className={styles.pill}>Lvl {String(lvl)}/{u.max}</span></div>
                      <div className={`${styles.tiny} ${styles.dim}`}>{u.desc}</div>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.tiny}>Cost: Prestige {fmt(cost)}</div>
                    <button className={styles.button} disabled={!ok} onClick={() => handleBuyUpgrade(key)}>Buy</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {prestigeOpen && (
        <div className={styles.modalWrap} role="dialog" aria-modal="true">
          <div className={styles.modal}>
          <div className={styles.modalHead}>
            <strong>Ascend to Greater Kingdom</strong>
            <button onClick={() => setPrestigeOpen(false)}>✕</button>
          </div>
          <div className={styles.section}>
            <p>Prestiging resets your resources and buildings, but grants <strong>Prestige</strong> based on your total <strong>Food</strong> generated. Prestige unlocks powerful permanent upgrades.</p>
            <p>Current potential Prestige: <span style={{ color: 'var(--good)' }}>{fmt(prestigePotential)}</span></p>
            <div className={styles.hr}></div>
            <div className={styles.row}>
              <button className={styles.bad} onClick={() => { handleDoPrestige(); setPrestigeOpen(false); }}>Ascend Now</button>
              <span className={styles.tiny}>Formula: floor( √(lifetimeFood / 1,000) )</span>
            </div>
          </div>
          </div>
        </div>
      )}

      {helpOpen && (
        <div className={styles.modalWrap} role="dialog" aria-modal="true">
          <div className={styles.modal}>
          <div className={styles.modalHead}>
            <strong>How to play</strong>
            <button onClick={() => setHelpOpen(false)}>✕</button>
          </div>
          <div className={styles.section}>
            <ul>
              <li>Click <em>Issue Royal Decree</em> to gain starter <strong>Gold</strong> and <strong>Food</strong>.</li>
              <li>Buy buildings. They produce resources every second; some also consume inputs.</li>
              <li>When progress slows, open <em>Ascend to Greater Kingdom</em> to prestige and spend <strong>Prestige</strong> on upgrades.</li>
              <li>Everything is data-driven – you can add new resources or buildings by editing the CONFIG object in the source.</li>
            </ul>
          </div>
          </div>
        </div>
      )}

      {/* SVG sprite for medieval theme */}
      <svg className={styles.svgSprite} aria-hidden="true">
        <symbol id="ic-gold" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#ffd700"/><path fill="#b8860b" d="M12 6v12M8 12h8"/></symbol>
        <symbol id="ic-wood" viewBox="0 0 24 24"><path fill="#8B4513" d="M10 4h4v16h-4z"/><path fill="#228B22" d="M8 2h8l-2 4H10z"/></symbol>
        <symbol id="ic-stone" viewBox="0 0 24 24"><path fill="#696969" d="M4 8h16v8H4z"/><path fill="#808080" d="M6 6h12v2H6z"/><path fill="#A9A9A9" d="M8 4h8v2H8z"/></symbol>
        <symbol id="ic-food" viewBox="0 0 24 24"><path fill="#FFD700" d="M7 2h2v9a3 3 0 1 1-2 0V2zm10 0h2v7h-2zM15 2h2v7h-2z"/></symbol>
        <symbol id="ic-prestige" viewBox="0 0 24 24"><path fill="#C0C0C0" d="M12 2l3 9h-6l3-9z"/><rect x="8" y="12" width="8" height="8" fill="#C0C0C0"/><circle cx="12" cy="16" r="2" fill="#FFD700"/></symbol>
        <symbol id="ic-woodcutter" viewBox="0 0 24 24"><path fill="#8B4513" d="M4 20h16V8l-5-3-5 3v5H4z"/><path fill="#696969" d="M10 6h4v2h-4z"/><path fill="#FFD700" d="M11 8h2v4h-2z"/></symbol>
        <symbol id="ic-quarry" viewBox="0 0 24 24"><path fill="#696969" d="M4 8h16v12H4z"/><path fill="#808080" d="M6 6h12v2H6z"/><path fill="#A9A9A9" d="M8 4h8v2H8z"/><path fill="#FFD700" d="M10 10h4v2h-4z"/></symbol>
        <symbol id="ic-farm" viewBox="0 0 24 24"><path fill="#228B22" d="M4 20h16V8l-5-3-5 3v5H4z"/><path fill="#FFD700" d="M8 12h8v2H8z"/><path fill="#FFD700" d="M10 15h4v2h-4z"/></symbol>
        <symbol id="ic-blacksmith" viewBox="0 0 24 24"><path fill="#696969" d="M4 20h16V8l-5-3-5 3v5H4z"/><path fill="#FF4500" d="M8 12h8v4H8z"/><path fill="#FFD700" d="M10 6h4v2h-4z"/></symbol>
        <symbol id="ic-castle" viewBox="0 0 24 24"><path fill="#C0C0C0" d="M4 20h16V8l-5-3-5 3v5H4z"/><path fill="#FFD700" d="M8 4h8v4H8z"/><path fill="#C0C0C0" d="M10 2h4v2h-4z"/><path fill="#696969" d="M6 16h12v2H6z"/></symbol>
      </svg>
    </div>
  );
}
