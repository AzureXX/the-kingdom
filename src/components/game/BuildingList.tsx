import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG, type BuildingKey, type ResourceKey } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import type { GameState } from '@/lib/game/types';

interface BuildingListProps {
  state: GameState;
  costFor: (key: BuildingKey) => Partial<Record<ResourceKey, number>>;
  onBuyBuilding: (key: BuildingKey) => void;
}

export const BuildingList = memo(function BuildingList({ state, costFor, onBuyBuilding }: BuildingListProps): React.JSX.Element {
  return (
    <div className={`${styles.section} ${styles.buy}`}>
      {(Object.keys(CONFIG.buildings) as BuildingKey[]).map((k) => {
        const b = CONFIG.buildings[k];
        const owned = state.buildings[k] || 0;
        const cost = costFor(k);
        const costStr = Object.entries(cost)
          .map(([r, v]) => `${CONFIG.resources[r as ResourceKey].name} ${formatNumber(v || 0)}`)
          .join(' · ');
        const canAfford = Object.entries(cost).every(
          ([r, v]) => (state.resources[r as ResourceKey] || 0) >= (v || 0)
        );
        
        return (
          <div key={k} className={styles.build}>
            <span className={styles.icon} style={{ color: '#bfc9ff' }}>
              <svg className={styles.icon}>
                <use href={`#${b.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.name}>
                {b.name} <span className={styles.pill}>x{owned}</span>
              </div>
              <div className={`${styles.tiny} ${styles.dim}`}>{b.desc}</div>
              <div className={styles.tiny}>Cost: {costStr}</div>
            </div>
            <div>
              <button 
                className={styles.button} 
                disabled={!canAfford} 
                onClick={() => onBuyBuilding(k)}
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