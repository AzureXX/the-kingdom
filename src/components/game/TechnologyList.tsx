import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG, type TechnologyKey, type ResourceKey } from '@/lib/game/config';
import { formatNumber } from '@/lib/game/utils';
import { canResearchTechnology, getResearchProgress, getResearchTimeRemaining, getTechnologiesWithPrerequisitesMet } from '@/lib/game/technologySystem';
import type { GameState } from '@/lib/game/types';

interface TechnologyListProps {
  state: GameState;
  onResearchTechnology: (key: TechnologyKey) => void;
}

export const TechnologyList = memo(function TechnologyList({ state, onResearchTechnology }: TechnologyListProps): React.JSX.Element {
  const technologiesWithPrerequisitesMet = getTechnologiesWithPrerequisitesMet(state);
  const researchProgress = getResearchProgress(state);
  const timeRemaining = getResearchTimeRemaining(state);
  const activeResearch = state.research.activeResearch;

  const formatPrerequisites = (requiredTechs: TechnologyKey | TechnologyKey[] | undefined): string => {
    if (!requiredTechs) return '';
    
    const techArray = Array.isArray(requiredTechs) ? requiredTechs : [requiredTechs];
    return techArray.map(techKey => CONFIG.technologies[techKey].name).join(', ');
  };

  return (
    <div className={`${styles.section} ${styles.buy}`}>
      <h3>Technologies</h3>
      
      {/* Active Research Progress */}
      {activeResearch && (
        <div className={styles.build}>
          <span className={styles.icon} style={{ color: '#ffd700' }}>
            <svg className={styles.icon}>
              <use href={`#${CONFIG.technologies[activeResearch].icon}`}></use>
            </svg>
          </span>
          <div className={styles.meta}>
            <div className={styles.name}>
              Researching: {CONFIG.technologies[activeResearch].name}
            </div>
            <div className={styles.tiny}>
              Progress: {researchProgress.toFixed(1)}% ({timeRemaining}s remaining)
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${researchProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Technologies with Prerequisites Met */}
      {technologiesWithPrerequisitesMet.map((techKey) => {
        const tech = CONFIG.technologies[techKey];
        const cost = Object.entries(tech.baseCost)
          .map(([r, v]) => `${CONFIG.resources[r as ResourceKey].name} ${formatNumber(v || 0)}`)
          .join(' · ');
        const canResearch = canResearchTechnology(state, techKey);
        const isCurrentlyResearching = activeResearch === techKey;
        const prerequisites = formatPrerequisites(tech.requiresTech);
        
        return (
          <div key={techKey} className={styles.build}>
            <span className={styles.icon} style={{ color: canResearch ? '#4CAF50' : '#FF9800' }}>
              <svg className={styles.icon}>
                <use href={`#${tech.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.name}>
                {tech.name}
                {prerequisites && (
                  <span className={styles.pill}>Requires: {prerequisites}</span>
                )}
                {!canResearch && !isCurrentlyResearching && (
                  <span className={styles.pill} style={{ backgroundColor: '#FF9800', color: '#000' }}>
                    Insufficient Resources
                  </span>
                )}
              </div>
              <div className={`${styles.tiny} ${styles.dim}`}>{tech.desc}</div>
              <div className={styles.tiny}>
                Cost: {cost} • Time: {tech.researchTime}s
              </div>
              {tech.unlocksBuildings && (
                <div className={styles.tiny}>
                  Unlocks: {tech.unlocksBuildings.map(b => CONFIG.buildings[b].name).join(', ')}
                </div>
              )}
            </div>
            <div>
              <button 
                className={styles.button} 
                disabled={!canResearch || !!activeResearch} 
                onClick={() => onResearchTechnology(techKey)}
              >
                Research
              </button>
            </div>
          </div>
        );
      })}

      {/* Researched Technologies */}
      {Object.keys(CONFIG.technologies).map((techKey) => {
        const tech = CONFIG.technologies[techKey as TechnologyKey];
        const isResearched = state.technologies[techKey as TechnologyKey] > 0;
        
        if (!isResearched) return null;
        
        return (
          <div key={techKey} className={styles.build}>
            <span className={styles.icon} style={{ color: '#2196F3' }}>
              <svg className={styles.icon}>
                <use href={`#${tech.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.name}>
                {tech.name} <span className={styles.pill}>Researched</span>
              </div>
              <div className={`${styles.tiny} ${styles.dim}`}>{tech.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
