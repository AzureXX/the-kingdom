import React, { memo } from 'react';
import styles from '@/styles/page.module.scss';
import { CONFIG } from '@/lib/game/config';
import type { TechnologyKey, ResourceKey } from '@/lib/game/types';
import type { ResearchSceneProps } from '@/lib/game/types/context';
import { formatNumber } from '@/lib/game/utils';
import { canResearchTechnology, getResearchProgress, getResearchTimeRemaining, getTechnologiesWithPrerequisitesMet } from '@/lib/game/technologySystem';

export const TechnologyList = memo(function TechnologyList({ state, onResearchTechnology }: Pick<ResearchSceneProps, 'state' | 'onResearchTechnology'>): React.JSX.Element {
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
        
        const tooltipText = `${tech.name}\n${tech.desc}\n\nCost: ${cost}\nTime: ${tech.researchTime}s${prerequisites ? `\nRequires: ${prerequisites}` : ''}${tech.unlocksBuildings ? `\nUnlocks: ${tech.unlocksBuildings.map(b => CONFIG.buildings[b].name).join(', ')}` : ''}`;
        
        return (
          <div 
            key={techKey} 
            className={styles.build}
            title={tooltipText}
          >
            <span className={styles.icon} style={{ color: canResearch ? '#4CAF50' : '#FF9800' }}>
              <svg className={styles.icon}>
                <use href={`#${tech.icon}`}></use>
              </svg>
            </span>
            <div className={styles.meta}>
              <div className={styles.name}>
                {tech.name}
                {prerequisites && (
                  <span className={styles.pill}>🔗</span>
                )}
                {!canResearch && !isCurrentlyResearching && (
                  <span className={styles.pill} style={{ backgroundColor: '#FF9800', color: '#000' }}>
                    ⚠
                  </span>
                )}
              </div>
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
