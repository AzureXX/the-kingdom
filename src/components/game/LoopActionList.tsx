import React from 'react';
import { LoopActionButton } from './LoopActionButton';
import { LOOP_ACTIONS } from '../../lib/game/config/loopActions';
import type { LoopActionKey, LoopActionState } from '../../lib/game/types/loopActions';
import type { GameState } from '../../lib/game/types/game';
import { canStartLoopAction } from '../../lib/game/loopActionEngine';
import styles from './LoopActionList.module.scss';

interface LoopActionListProps {
  gameState: GameState;
  onToggleLoopAction: (actionKey: LoopActionKey) => void;
}

export function LoopActionList({ gameState, onToggleLoopAction }: LoopActionListProps) {
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
        {Object.entries(LOOP_ACTIONS).map(([actionKey, actionDef]) => {
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
      
      {activeCount >= maxConcurrent && (
        <div className={styles.warning}>
          Maximum concurrent loop actions reached. Start a new action to pause the oldest one.
        </div>
      )}
    </div>
  );
}
