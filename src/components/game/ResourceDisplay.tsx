import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG } from '@/lib/game/config';
import type { ResourceKey } from '@/lib/game/types';
import { formatNumber } from '@/lib/game/utils';
import type { GameState, ResourceAmount } from '@/lib/game/types';

interface ResourceDisplayProps {
  state: GameState;
  perSec: ResourceAmount;
}

export const ResourceDisplay = memo(function ResourceDisplay({ state, perSec }: ResourceDisplayProps): React.JSX.Element {
  return (
    <div className={styles.resources}>
      {Object.keys(CONFIG.resources).map((resourceKey) => {
        const resource = CONFIG.resources[resourceKey as ResourceKey];
        const value = state.resources[resourceKey as ResourceKey] || 0;
        const perSecond = perSec[resourceKey as ResourceKey] || 0;
        const cls = perSecond >= 0 ? styles.good : styles.bad;
        
        // Hide resources that are marked as hidden and have 0 value
        if (resource.hidden && value === 0) {
          return null;
        }
        
        return (
          <div key={resourceKey} className={styles.res}>
            <span className={styles.icon} style={{ color: resourceKey === 'prestige' ? '#ffd166' : resourceKey === 'researchPoints' ? '#4CAF50' : '#8ea2ff' }}>
              <svg className={styles.icon}>
                <use href={`#${resource.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.amt}>
                {resource.name}: {formatNumber(value, resource.decimals)}
              </div>
              <small className={`${styles.tiny} ${cls}`}>
                {perSecond >= 0 ? '+' : ''}{formatNumber(perSecond, resource.decimals)}/s
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}); 