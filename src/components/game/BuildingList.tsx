import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG, type BuildingKey, type ResourceKey, type TechnologyKey } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import { getUnlockedBuildings } from '@/lib/game/gameState';
import { canBuyBuilding } from '@/lib/game/calculations';
import type { GameState } from '@/lib/game/types';

interface BuildingListProps {
  state: GameState;
  costFor: (key: BuildingKey) => Partial<Record<ResourceKey, number>>;
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
      {unlockedBuildings.map((k) => {
        const b = CONFIG.buildings[k as BuildingKey];
        const owned = state.buildings[k as BuildingKey] || 0;
        const cost = costFor(k as BuildingKey);
        const costStr = Object.entries(cost)
          .map(([r, v]) => `${CONFIG.resources[r as ResourceKey].name} ${formatNumber(v || 0)}`)
          .join(' · ');
        const canAfford = canBuyBuilding(state, k as BuildingKey);
        const techRequirements = formatTechnologyRequirements(b.requiresTech);
        
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
                {techRequirements && (
                  <span className={styles.pill} style={{ marginLeft: '8px', backgroundColor: '#1a2350' }}>
                    Tech: {techRequirements}
                  </span>
                )}
              </div>
              <div className={`${styles.tiny} ${styles.dim}`}>{b.desc}</div>
              <div className={styles.tiny}>Cost: {costStr}</div>
            </div>
            <div>
              <button 
                className={styles.button} 
                disabled={!canAfford} 
                onClick={() => onBuyBuilding(k as BuildingKey)}
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