import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG, type BuildingKey, type ResourceKey, type TechnologyKey } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import { getUnlockedBuildings } from '@/lib/game/gameState';
import { canBuyBuilding } from '@/lib/game/calculations';
import type { GameState, ResourceCost } from '@/lib/game/types';

interface BuildingListProps {
  state: GameState;
  costFor: (key: BuildingKey) => ResourceCost;
  onBuyBuilding: (key: BuildingKey) => void;
}

export const BuildingList = memo(function BuildingList({ state, costFor, onBuyBuilding }: BuildingListProps): React.JSX.Element {
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
          .map(([resourceKey, value]) => `${CONFIG.resources[resourceKey as ResourceKey].name} ${formatNumber(value || 0)}`)
          .join(' · ');
        const canAfford = canBuyBuilding(state, buildingKey);
        const techRequirements = formatTechnologyRequirements(building.requiresTech);
        
        return (
          <div key={buildingKey} className={styles.build}>
            <span className={styles.icon} style={{ color: '#bfc9ff' }}>
              <svg className={styles.icon}>
                <use href={`#${building.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.name}>
                {building.name} <span className={styles.pill}>x{owned}</span>
                {techRequirements && (
                  <span className={styles.pill} style={{ marginLeft: '8px', backgroundColor: '#1a2350' }}>
                    Tech: {techRequirements}
                  </span>
                )}
              </div>
              <div className={`${styles.tiny} ${styles.dim}`}>{building.desc}</div>
              <div className={styles.tiny}>Cost: {costStr}</div>
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