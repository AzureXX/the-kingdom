import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG } from '@/lib/game/config';
import type { PrestigeUpgradeKey } from '@/lib/game/types';
import { formatNumber } from '@/lib/game/utils';
import type { GameState } from '@/lib/game/types';

interface UpgradeListProps {
  state: GameState;
  onBuyUpgrade: (key: PrestigeUpgradeKey) => void;
}

export const UpgradeList = memo(function UpgradeList({ state, onBuyUpgrade }: UpgradeListProps): React.JSX.Element {
  return (
    <div className={`${styles.section} ${styles.grid2}`}>
      {(Object.keys(CONFIG.prestige.upgrades) as PrestigeUpgradeKey[]).map((key) => {
        const u = CONFIG.prestige.upgrades[key];
        const lvl = state.upgrades[key] || 0;
        const cost = Math.ceil(u.costCurve(lvl));
        const canAfford = (state.resources.prestige || 0) >= cost && lvl < u.max;
        
        return (
          <div key={key} className={styles.upgrade}>
            <div className={styles.row} style={{ gap: 12, alignItems: 'center' }}>
              <span className={styles.icon} style={{ color: '#ffd166' }}>
                <svg className={styles.icon}>
                  <use href={`#${u.icon}`}></use>
                </svg>
              </span>
              <div>
                <div className={styles.name}>
                  {u.name} <span className={styles.pill}>Lvl {String(lvl)}/{u.max}</span>
                </div>
                <div className={`${styles.tiny} ${styles.dim}`}>{u.desc}</div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.tiny}>Cost: Prestige {formatNumber(cost)}</div>
              <button 
                className={styles.button} 
                disabled={!canAfford} 
                onClick={() => onBuyUpgrade(key)}
              >
                Buy
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}); 