import React, { memo } from 'react';

import { CONFIG } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils/number';
import { getUnlockedBuildings } from '@/lib/game/utils/gameState';
import { canBuyBuilding } from '@/lib/game/utils/calculations';

import type { ResourceKey, TechnologyKey, BuildingKey, ActionUnlockCondition } from '@/lib/game/types';
import type { BuildingSceneProps } from '@/lib/game/types/context';

import styles from '@/styles/page.module.scss';
import buildingStyles from '@/styles/components/game/BuildingList.module.scss';

export const BuildingList = memo(function BuildingList({ state, costFor, onBuyBuilding }: Pick<BuildingSceneProps, 'state' | 'costFor' | 'onBuyBuilding'>): React.JSX.Element {
  const unlockedBuildings = getUnlockedBuildings(state);

  const formatUnlockConditions = (unlockConditions: ActionUnlockCondition[] | undefined): string => {
    if (!unlockConditions || unlockConditions.length === 0) return '';
    
    return unlockConditions.map(condition => {
      switch (condition.type) {
        case 'technology':
          return CONFIG.technologies[condition.key as TechnologyKey].name;
        case 'achievement':
          return CONFIG.achievements[condition.key]?.name || condition.key;
        case 'building':
          return CONFIG.buildings[condition.key as BuildingKey].name;
        case 'resource':
          return `${CONFIG.resources[condition.key as ResourceKey].name} ${condition.value}`;
        case 'prestige':
          return `Prestige: ${condition.key}`;
        default:
          return String(condition);
      }
    }).join(', ');
  };

  return (
    <div className={`${styles.section} ${styles.buy}`}>
      <h3>Buildings</h3>
      {unlockedBuildings.map((buildingKey) => {
        const building = CONFIG.buildings[buildingKey];
        const owned = state.buildings[buildingKey] || 0;
        const maxLimit = building.maxLimit;
        const isAtLimit = maxLimit !== undefined && owned >= maxLimit;
        const cost = costFor(buildingKey);
        const costStr = Object.entries(cost)
          .filter(([, value]) => value !== undefined && value > 0)
          .map(([resourceKey, value]) => `${CONFIG.resources[resourceKey as ResourceKey].name} ${formatNumber(value || 0)}`)
          .join(' · ');
        const canAfford = canBuyBuilding(state, buildingKey) && !isAtLimit;
        const unlockRequirements = formatUnlockConditions(building.unlockConditions);
        
        const tooltipText = `${building.name}\n${building.desc}\n\nCost: ${costStr}${unlockRequirements ? `\nRequirements: ${unlockRequirements}` : ''}\nOwned: ${owned}${maxLimit ? `/${maxLimit}` : ''}${isAtLimit ? '\n\n⚠️ Building limit reached!' : ''}`;
        
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
                {building.name} <span className={styles.pill}>x{owned}{maxLimit ? `/${maxLimit}` : ''}</span>
                {unlockRequirements && (
                  <span className={`${styles.pill} ${buildingStyles.techRequirementsPill}`}>
                    🔬
                  </span>
                )}
                {isAtLimit && (
                  <span className={`${styles.pill} ${buildingStyles.limitReachedPill}`}>
                    ⚠️
                  </span>
                )}
              </div>
            </div>
            <div>
              <button 
                className={styles.button} 
                disabled={!canAfford} 
                onClick={() => onBuyBuilding(buildingKey)}
                title={isAtLimit ? 'Building limit reached' : undefined}
              >
                {isAtLimit ? 'Max' : 'Buy'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}); 