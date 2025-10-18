// Action system configuration - organized by tier

import type { ActionKey, ActionDef } from '@/lib/game/types/actions';

// Import tier-based action definitions
import { TIER1_ACTIONS } from '@/lib/game/config/actions/tier1Actions';

/**
 * Combined action definitions organized by tier
 */
export const ACTIONS: Record<ActionKey, ActionDef> = {
  // Tier 1 Actions - Primitive Beginnings
  ...TIER1_ACTIONS,
  
  // Future tiers will be added here
  // ...TIER2_ACTIONS,
  // ...TIER3_ACTIONS,
  // etc.
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



