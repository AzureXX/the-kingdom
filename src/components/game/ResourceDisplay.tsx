import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG, type ResourceKey } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import type { GameState } from '@/lib/game/types';

interface ResourceDisplayProps {
  state: GameState;
  perSec: Record<ResourceKey, number>;
}

export const ResourceDisplay = memo(function ResourceDisplay({ state, perSec }: ResourceDisplayProps): React.JSX.Element {
  return (
    <div className={styles.resources}>
      {Object.keys(CONFIG.resources).map((key) => {
        const res = CONFIG.resources[key as ResourceKey];
        const v = state.resources[key as ResourceKey] || 0;
        const per = perSec[key as ResourceKey] || 0;
        const cls = per >= 0 ? styles.good : styles.bad;
        
        // Hide resources that are marked as hidden and have 0 value
        if (res.hidden && v === 0) {
          return null;
        }
        
        return (
          <div key={key} className={styles.res}>
            <span className={styles.icon} style={{ color: key === 'prestige' ? '#ffd166' : key === 'researchPoints' ? '#4CAF50' : '#8ea2ff' }}>
              <svg className={styles.icon}>
                <use href={`#${res.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.amt}>
                {res.name}: {formatNumber(v, res.decimals)}
              </div>
              <small className={`${styles.tiny} ${cls}`}>
                {per >= 0 ? '+' : ''}{formatNumber(per, res.decimals)}/s
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}); 