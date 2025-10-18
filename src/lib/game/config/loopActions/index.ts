// Loop action system configuration - organized by tier

import type { LoopActionKey, LoopActionDef } from '@/lib/game/types/loopActions';

// Import tier-based loop action definitions
import { TIER1_LOOP_ACTIONS } from '@/lib/game/config/loopActions/tier1LoopActions';

/**
 * Combined loop action definitions organized by tier
 */
export const LOOP_ACTIONS: Record<LoopActionKey, LoopActionDef> = {
  // Tier 1 Loop Actions - Primitive Beginnings
  ...TIER1_LOOP_ACTIONS,
  
  // Future tiers will be added here
  // ...TIER2_LOOP_ACTIONS,
  // ...TIER3_LOOP_ACTIONS,
  // etc.
} as Record<LoopActionKey, LoopActionDef>;

export const DEFAULT_LOOP_SETTINGS = {
  maxConcurrentActions: 2,
  basePointsPerTick: 100,
  pointsPerSecond: 2000,
};

