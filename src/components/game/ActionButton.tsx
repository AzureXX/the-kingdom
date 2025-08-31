// ActionButton component for individual game actions

import React from 'react';

import { getAction } from '@/lib/game/config/actions';

import type { ActionKey, ActionStatus } from '@/lib/game/types';

import styles from '@/styles/page.module.scss';

interface ActionButtonProps {
  actionKey: ActionKey;
  status: ActionStatus;
  onExecute: (actionKey: ActionKey) => void;
  fmt: (n: number, decimals?: number) => string;
}

export function ActionButton({ actionKey, status, onExecute, fmt }: ActionButtonProps) {
  const action = getAction(actionKey);
  if (!action) return null;

  const handleClick = () => {
    if (status.canExecute) {
      onExecute(actionKey);
    }
  };

  const formatCost = (cost: Record<string, number>) => {
    return Object.entries(cost)
      .map(([resource, amount]) => `${fmt(amount)} ${resource}`)
      .join(', ');
  };

  const formatGains = (gains: Record<string, number>) => {
    return Object.entries(gains)
      .map(([resource, amount]) => `+${fmt(amount)} ${resource}`)
      .join(', ');
  };

  const getTooltipText = () => {
    let tooltip = action.description;
    
    if (Object.keys(status.cost).length > 0) {
      tooltip += `\nCost: ${formatCost(status.cost)}`;
    }
    
    tooltip += `\nGains: ${formatGains(status.gains)}`;
    
    if (status.cooldownRemaining !== undefined) {
      tooltip += `\nCooldown: ${Math.ceil(status.cooldownRemaining)}s remaining`;
    }
    
    if (status.reason) {
      tooltip += `\n\nStatus: ${status.reason}`;
    }
    
    return tooltip;
  };

  const getButtonClass = () => {
    let className = styles.button;
    
    if (!status.canExecute) {
      if (!status.isUnlocked) {
        className += ` ${styles.disabled}`;
      } else if (status.cooldownRemaining !== undefined) {
        className += ` ${styles.cooldown}`;
      } else {
        className += ` ${styles.cannotAfford}`;
      }
    }
    
    return className;
  };

  const getButtonText = () => {
    if (status.cooldownRemaining !== undefined && status.cooldownRemaining > 0) {
      return `${action.name} (${Math.ceil(status.cooldownRemaining)}s)`;
    }
    return action.name;
  };

  return (
    <button
      className={getButtonClass()}
      onClick={handleClick}
      disabled={!status.canExecute}
      title={getTooltipText()}
      data-action-key={actionKey}
    >
      <span className={styles.actionIcon}>{action.icon}</span>
      <span className={styles.actionName}>{getButtonText()}</span>
      {Object.keys(status.cost).length > 0 && (
        <span className={styles.actionCost}>
          {formatCost(status.cost)}
        </span>
      )}
    </button>
  );
}
