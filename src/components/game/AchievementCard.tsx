"use client";

import React from 'react';
import type { AchievementDef, AchievementProgress } from '@/lib/game/types';
import styles from './AchievementCard.module.scss';

interface AchievementCardProps {
  achievement: AchievementDef & {
    progress: AchievementProgress;
    unlocked: boolean;
    unlockLevel: number;
  };
  onClick?: (achievementKey: string) => void;
  showProgress?: boolean;
  compact?: boolean;
}

export function AchievementCard({ 
  achievement, 
  onClick, 
  showProgress = true, 
  compact = false 
}: AchievementCardProps) {
  const {
    key,
    name,
    description,
    icon,
    category,
    rarity,
    points,
    progress,
    unlocked,
    unlockLevel,
    hidden
  } = achievement;

  const handleClick = () => {
    if (onClick) {
      onClick(key);
    }
  };

  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'common': return styles.common;
      case 'uncommon': return styles.uncommon;
      case 'rare': return styles.rare;
      case 'epic': return styles.epic;
      case 'legendary': return styles.legendary;
      default: return styles.common;
    }
  };

  const getProgressPercentage = () => {
    return Math.min(100, Math.floor(progress.progress * 100));
  };

  const getProgressText = () => {
    if (progress.isComplete) {
      return 'Complete';
    }
    
    if (progress.targetValue > 0) {
      return `${Math.floor(progress.currentValue)} / ${progress.targetValue}`;
    }
    
    return `${getProgressPercentage()}%`;
  };

  return (
    <div 
      className={`${styles.achievementCard} ${getRarityClass(rarity)} ${unlocked ? styles.unlocked : styles.locked} ${compact ? styles.compact : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>{icon}</span>
          {unlocked && (
            <div className={styles.unlockBadge}>
              {unlockLevel > 1 ? unlockLevel : '✓'}
            </div>
          )}
        </div>
        
        <div className={styles.titleSection}>
          <h3 className={styles.name}>
            {hidden && !unlocked ? '???' : name}
          </h3>
          <div className={styles.meta}>
            <span className={styles.category}>{category}</span>
            <span className={styles.points}>{points} pts</span>
            <span className={styles.rarity}>{rarity}</span>
          </div>
        </div>
      </div>

      {!hidden || unlocked ? (
        <div className={styles.content}>
          <p className={styles.description}>
            {description}
          </p>
          
          {showProgress && !unlocked && (
            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {getProgressText()}
              </span>
            </div>
          )}
          
          {unlocked && unlockLevel > 1 && (
            <div className={styles.levelInfo}>
              Level {unlockLevel}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.hiddenContent}>
          <p className={styles.hiddenText}>
            Complete other achievements to reveal this one
          </p>
        </div>
      )}
    </div>
  );
}
