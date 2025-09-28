import React, { memo } from 'react';

import { CONFIG } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import { getUnlockedBuildings } from '@/lib/game/gameState';
import { canBuyBuilding } from '@/lib/game/utils/calculations';

import type { ResourceKey, TechnologyKey } from '@/lib/game/types';
import type { BuildingSceneProps } from '@/lib/game/types/context';

import styles from '@/styles/page.module.scss';
import buildingStyles from '@/styles/components/game/BuildingList.module.scss';

export const BuildingList = memo(function BuildingList({ state, costFor, onBuyBuilding }: Pick<BuildingSceneProps, 'state' | 'costFor' | 'onBuyBuilding'>): React.JSX.Element {
  const unlockedBuildings = getUnlockedBuildings(state);

  const formatTechnologyRequirements = (requiredTechs: TechnologyKey | TechnologyKey[] | undefined): string => {
    if (!requiredTechs) return '';
    
    const techArray = Array.isArray(requiredTechs) ? requiredTechs : [requiredTechs];
    return techArray.map(techKey => CONFIG.technologies[techKey].name).join(', ');
  };

  return (
    <div className={`${styles.section} ${styles.buy}`}>
      <h3>Buildings</h3>
      {unlockedBuildings.map((buildingKey) => {
        const building = CONFIG.buildings[buildingKey];
        const owned = state.buildings[buildingKey] || 0;
        const cost = costFor(buildingKey);
        const costStr = Object.entries(cost)
          .filter(([, value]) => value !== undefined && value > 0)
          .map(([resourceKey, value]) => `${CONFIG.resources[resourceKey as ResourceKey].name} ${formatNumber(value || 0)}`)
          .join(' · ');
        const canAfford = canBuyBuilding(state, buildingKey);
        const techRequirements = formatTechnologyRequirements(building.requiresTech);
        
        const tooltipText = `${building.name}\n${building.desc}\n\nCost: ${costStr}${techRequirements ? `\nTech Required: ${techRequirements}` : ''}\nOwned: ${owned}`;
        
        return (
          <div 
            key={buildingKey} 
            className={styles.build}
            title={tooltipText}
          >
            <span className={styles.icon} style={{ color: '#bfc9ff' }}>
              <svg className={styles.icon}>
                <use href={`#${building.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.name}>
                {building.name} <span className={styles.pill}>x{owned}</span>
                {techRequirements && (
                  <span className={`${styles.pill} ${buildingStyles.techRequirementsPill}`}>
                    🔬
                  </span>
                )}
              </div>
            </div>
            <div>
              <button 
                className={styles.button} 
                disabled={!canAfford} 
                onClick={() => onBuyBuilding(buildingKey)}
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