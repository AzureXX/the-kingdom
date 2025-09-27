import React, { memo, useState } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import type { GameState, ResourceAmount, ResourceKey } from '@/lib/game/types';
import resourceStyles from './ResourceDisplay.module.scss';

interface ResourceDisplayProps {
  state: GameState;
  perSec: ResourceAmount;
}

export const ResourceDisplay = memo(function ResourceDisplay({ state, perSec }: ResourceDisplayProps): React.JSX.Element {
  const [hoveredResource, setHoveredResource] = useState<ResourceKey | null>(null);

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
        
        const tooltipText = `${resource.name}: ${formatNumber(value, resource.decimals)}\n${
          state.isPaused ? 'PAUSED' : `${perSecond >= 0 ? '+' : ''}${formatNumber(perSecond, resource.decimals)}/s`
        }`;
        
        return (
          <div 
            key={resourceKey} 
            className={styles.res}
            onMouseEnter={() => setHoveredResource(resourceKey as ResourceKey)}
            onMouseLeave={() => setHoveredResource(null)}
            title={tooltipText}
          >
            <span className={`${styles.icon} ${resourceStyles.resourceIcon} ${
              resourceKey === 'prestige' ? resourceStyles.prestige : 
              resourceKey === 'researchPoints' ? resourceStyles.researchPoints : 
              resourceStyles.default
            }`}>
              <svg className={styles.icon}>
                <use href={`#${resource.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.amt}>
                {formatNumber(value, resource.decimals)}
              </div>
              <small className={`${styles.tiny} ${cls}`}>
                {state.isPaused ? '⏸' : `${perSecond >= 0 ? '+' : ''}${formatNumber(perSecond, resource.decimals)}/s`}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}); 