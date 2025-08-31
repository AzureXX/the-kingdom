// ActionList component to display all available actions

import React, { useMemo } from 'react';
import type { GameState, ActionKey, ActionUnlockCondition } from '@/lib/game/types';
import { getAllActions } from '@/lib/game/config/actions';
import { getActionStatus } from '@/lib/game/utils/actionValidation';
import { ActionButton } from './ActionButton';
import styles from '@/styles/page.module.scss';

interface ActionListProps {
  state: GameState;
  onExecuteAction: (actionKey: ActionKey) => void;
  fmt: (n: number, decimals?: number) => string;
}

export function ActionList({ state, onExecuteAction, fmt }: ActionListProps) {
  const allActions = useMemo(() => getAllActions(), []);
  const actionKeys = useMemo(() => Object.keys(allActions) as ActionKey[], [allActions]);
  
  const actionStatuses = useMemo(() => {
    const statuses: Record<ActionKey, ReturnType<typeof getActionStatus>> = {} as Record<ActionKey, ReturnType<typeof getActionStatus>>;
    
    for (const actionKey of actionKeys) {
      statuses[actionKey] = getActionStatus(state, actionKey);
    }
    
    return statuses;
  }, [state, actionKeys]);

  // Group actions by category for better organization
  const groupedActions = useMemo(() => {
    const groups = {
      basic: [] as ActionKey[],
      trading: [] as ActionKey[],
      building: [] as ActionKey[],
      technology: [] as ActionKey[],
    };

    for (const actionKey of actionKeys) {
      const action = allActions[actionKey];
      if (!action) continue;

      if (action.unlockConditions.length === 0) {
        groups.basic.push(actionKey);
      } else if (action.unlockConditions.some((c: ActionUnlockCondition) => c.type === 'resource')) {
        groups.trading.push(actionKey);
      } else if (action.unlockConditions.some((c: ActionUnlockCondition) => c.type === 'building')) {
        groups.building.push(actionKey);
      } else if (action.unlockConditions.some((c: ActionUnlockCondition) => c.type === 'technology')) {
        groups.technology.push(actionKey);
      }
    }

    return groups;
  }, [allActions, actionKeys]);

  const renderActionGroup = (title: string, actions: ActionKey[]) => {
    if (actions.length === 0) return null;

    return (
      <div key={title} className={styles.actionGroup}>
        <h4 className={styles.actionGroupTitle}>{title}</h4>
        <div className={styles.actionButtons}>
          {actions.map(actionKey => (
            <ActionButton
              key={actionKey}
              actionKey={actionKey}
              status={actionStatuses[actionKey]}
              onExecute={onExecuteAction}
              fmt={fmt}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.actionList}>
      {renderActionGroup('Basic Actions', groupedActions.basic)}
      {renderActionGroup('Trading Actions', groupedActions.trading)}
      {renderActionGroup('Building Actions', groupedActions.building)}
      {renderActionGroup('Technology Actions', groupedActions.technology)}
    </div>
  );
}
