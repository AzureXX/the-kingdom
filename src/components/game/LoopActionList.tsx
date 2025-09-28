import React, { memo } from 'react';
import { LoopActionButton } from '@/components/game/LoopActionButton';
import { LOOP_ACTIONS } from '@/lib/game/config';
import type { LoopActionKey, LoopActionState } from '@/lib/game/types/loopActions';
import type { LoopActionComponentProps } from '@/lib/game/types/context';
import { canStartLoopAction } from '@/lib/game/loopActionEngine';
import styles from '@/styles/components/game/LoopActionList.module.scss';

export const LoopActionList = memo(function LoopActionList({ gameState, onToggleLoopAction }: LoopActionComponentProps) {
  const getLoopActionState = (actionKey: LoopActionKey): LoopActionState => {
    const existingState = gameState.loopActions.find(la => la.actionKey === actionKey);
    if (existingState) {
      return existingState;
    }
    
    // Return default inactive state
    return {
      actionKey,
      isActive: false,
      currentPoints: 0,
      totalLoopsCompleted: 0,
      startedAt: 0,
      lastTickAt: 0,
      isPaused: false,
    };
  };

  const canStartAction = (actionKey: LoopActionKey): boolean => {
    return canStartLoopAction(gameState, actionKey);
  };

  const shouldShowAction = (actionKey: LoopActionKey): boolean => {
    const actionDef = LOOP_ACTIONS[actionKey];
    if (!actionDef) return false;
    
    // Always show if the action is currently active
    const existingState = gameState.loopActions.find(la => la.actionKey === actionKey);
    if (existingState && existingState.isActive) return true;
    
    // If showWhenLocked is true, always show the action
    if (actionDef.showWhenLocked) return true;
    
    // If showWhenLocked is false or undefined, only show if requirements are met
    return canStartAction(actionKey);
  };

  const visibleActions = Object.entries(LOOP_ACTIONS).filter(([actionKey]) => 
    shouldShowAction(actionKey as LoopActionKey)
  );
  const hiddenActions = Object.entries(LOOP_ACTIONS).length - visibleActions.length;
  const activeCount = gameState.loopActions.filter(la => la.isActive).length;
  const maxConcurrent = gameState.loopSettings.maxConcurrentActions;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Loop Actions</h3>
        <div className={styles.status}>
          {activeCount} / {maxConcurrent} Active
        </div>
      </div>
      
      <div className={styles.grid}>
        {visibleActions.map(([actionKey]) => {
          const state = getLoopActionState(actionKey as LoopActionKey);
          const canStart = canStartAction(actionKey as LoopActionKey);
          
          return (
            <LoopActionButton
              key={actionKey}
              actionKey={actionKey as LoopActionKey}
              isActive={state.isActive}
              currentPoints={state.currentPoints}
              totalLoopsCompleted={state.totalLoopsCompleted}
              onToggle={onToggleLoopAction}
              canStart={canStart}
            />
          );
        })}
      </div>
      
      {hiddenActions > 0 && (
        <div className={styles.hiddenInfo}>
          {hiddenActions} loop action{hiddenActions !== 1 ? 's' : ''} hidden (build requirements to unlock)
        </div>
      )}
      
      {activeCount >= maxConcurrent && (
        <div className={styles.warning}>
          Maximum concurrent loop actions reached. Start a new action to pause the oldest one.
        </div>
      )}
    </div>
  );
});
