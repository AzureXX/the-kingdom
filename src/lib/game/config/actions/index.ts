// Action system configuration - grouped by category

import type { ActionKey, ActionDef } from '@/lib/game/types/actions';
import type { BuildingKey, TechnologyKey } from '@/lib/game/types';

// Import all action categories
import { BASIC_ACTIONS } from '@/lib/game/config/actions/basicActions';
import { TRADING_ACTIONS } from '@/lib/game/config/actions/tradingActions';
import { BUILDING_ACTIONS } from '@/lib/game/config/actions/buildingActions';
import { TECHNOLOGY_ACTIONS } from '@/lib/game/config/actions/technologyActions';

/**
 * Combined action definitions organized by category
 */
export const ACTIONS: Record<ActionKey, ActionDef> = {
  // Basic actions
  ...BASIC_ACTIONS,
  
  // Trading actions
  ...TRADING_ACTIONS,
  
  // Building-dependent actions
  ...BUILDING_ACTIONS,
  
  // Technology-dependent actions
  ...TECHNOLOGY_ACTIONS
} as Record<ActionKey, ActionDef>;

/**
 * Get action by key
 */
export function getAction(key: ActionKey): ActionDef {
  return ACTIONS[key];
}

/**
 * Get all available actions
 */
export function getAllActions(): Record<ActionKey, ActionDef> {
  return ACTIONS;
}

/**
 * Get actions that are always available (no unlock conditions)
 */
export function getBasicActions(): ActionKey[] {
  return Object.entries(ACTIONS)
    .filter(([, action]) => action.unlockConditions.length === 0)
    .map(([key]) => key as ActionKey);
}

/**
 * Get actions that require a specific building
 */
export function getActionsRequiringBuilding(buildingKey: BuildingKey): ActionKey[] {
  return Object.entries(ACTIONS)
    .filter(([, action]) => 
      action.unlockConditions.some(condition => 
        condition.type === 'building' && condition.key === buildingKey
      )
    )
    .map(([key]) => key as ActionKey);
}

/**
 * Get actions that require a specific technology
 */
export function getActionsRequiringTechnology(technologyKey: TechnologyKey): ActionKey[] {
  return Object.entries(ACTIONS)
    .filter(([, action]) => 
      action.unlockConditions.some(condition => 
        condition.type === 'technology' && condition.key === technologyKey
      )
    )
    .map(([key]) => key as ActionKey);
}

// Re-export individual category actions for direct access
export {
  BASIC_ACTIONS,
  TRADING_ACTIONS,
  BUILDING_ACTIONS,
  TECHNOLOGY_ACTIONS
};
