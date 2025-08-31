import React, { useState, memo } from 'react';
import type { LoopActionKey } from '../../lib/game/types/loopActions';
import { LOOP_ACTIONS } from '../../lib/game/config/loopActions';
import { getLoopActionProgress } from '../../lib/game/loopActionEngine';
import styles from './LoopActionButton.module.scss';

interface LoopActionButtonProps {
  actionKey: LoopActionKey;
  isActive: boolean;
  currentPoints: number;
  totalLoopsCompleted: number;
  onToggle: (actionKey: LoopActionKey) => void;
  canStart: boolean;
}

export const LoopActionButton = memo(function LoopActionButton({
  actionKey,
  isActive,
  currentPoints,
  totalLoopsCompleted,
  onToggle,
  canStart,
}: LoopActionButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const actionDef = LOOP_ACTIONS[actionKey];
  
  if (!actionDef) return null;
  
  const progress = getLoopActionProgress({
    actionKey,
    isActive,
    currentPoints,
    totalLoopsCompleted,
    startedAt: 0,
    lastTickAt: 0,
    isPaused: false,
  });
  
  const progressPercentage = progress.progressPercentage;
  const isDisabled = !canStart && !isActive;
  
  const handleClick = () => {
    if (!isDisabled) {
      onToggle(actionKey);
    }
  };
  
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  
  const tooltipContent = (
    <div className={styles.tooltip}>
      <div className={styles.tooltipHeader}>
        <span className={styles.tooltipIcon}>{actionDef.icon}</span>
        <span className={styles.tooltipName}>{actionDef.name}</span>
      </div>
      <div className={styles.tooltipDescription}>{actionDef.description}</div>
      
      {isActive || currentPoints > 0 ? (
        <div className={styles.tooltipStats}>
          <div>Progress: {progress.currentPoints.toFixed(0)} / {progress.pointsRequired.toFixed(0)}</div>
          <div>Loops Completed: {totalLoopsCompleted}</div>
          {isActive && (
            <div>Time Remaining: ~{progress.timeRemaining.toFixed(1)}s</div>
          )}
        </div>
      ) : (
        <div className={styles.tooltipRequirements}>
          <div>Requirements:</div>
          {actionDef.unlockConditions.length === 0 ? (
            <div>No requirements</div>
          ) : (
            actionDef.unlockConditions.map((condition, index) => (
              <div key={index}>
                {condition.type === 'building' && `${condition.key}: ${condition.value}`}
                {condition.type === 'technology' && `${condition.key}: ${condition.value}`}
                {condition.type === 'resource' && `${condition.key}: ${condition.value}`}
              </div>
            ))
          )}
        </div>
      )}
      {actionDef.cost && Object.keys(actionDef.cost).length > 0 && (
        <div className={styles.tooltipCosts}>
          <div>Costs:</div>
          {Object.entries(actionDef.cost).map(([resource, amount]) => (
            <div key={resource}>{resource}: {amount}</div>
        ))}
        </div>
      )}
      <div className={styles.tooltipGains}>
        <div>Gains:</div>
        {Object.entries(actionDef.gains).map(([resource, amount]) => (
          <div key={resource}>{resource}: +{amount}</div>
        ))}
      </div>
      <div className={styles.tooltipStatus}>
        Status: {isActive ? 'Active' : isDisabled ? 'Locked' : 'Paused'}
        {!isActive && currentPoints > 0 && (
          <div style={{ fontSize: '10px', marginTop: '4px', color: '#cbd5e0' }}>
            Progress saved: {currentPoints.toFixed(0)} / {progress.pointsRequired.toFixed(0)}
          </div>
        )}
        {isDisabled && actionDef.showWhenLocked && (
          <div style={{ fontSize: '10px', marginTop: '4px', color: '#fbbf24' }}>
            Preview mode - build requirements to unlock
          </div>
        )}
      </div>
    </div>
  );
  

  
  return (
    <div 
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${styles.button} ${isActive ? styles.active : ''} ${!isActive && !isDisabled ? styles.paused : ''} ${isDisabled ? (actionDef.showWhenLocked ? styles.preview : styles.disabled) : ''}`}
        onClick={handleClick}
        disabled={isDisabled}
        title={isActive ? `Pause ${actionDef.name}` : isDisabled ? `Locked: ${actionDef.name} - Build requirements to unlock` : `Start/Resume ${actionDef.name}`}
      >
        <div className={styles.icon}>{actionDef.icon}</div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {isActive && (
          <div className={styles.loopCount}>
            {totalLoopsCompleted}
          </div>
        )}
      </button>
      
      {showTooltip && (
        <div className={styles.tooltipContainer}>
          {tooltipContent}
        </div>
      )}
    </div>
  );
});
