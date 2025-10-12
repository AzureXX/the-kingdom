// Action system configuration - grouped by category

import type { ActionKey, ActionDef } from '@/lib/game/types/actions';

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



