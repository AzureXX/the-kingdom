// Event system configuration - organized by tier

import type { EventKey, EventDef } from '@/lib/game/types';

// Import tier-based event definitions
import { TIER1_EVENTS } from '@/lib/game/config/events/tier1Events';

/**
 * Combined event definitions organized by tier
 */
export const EVENTS: Record<EventKey, EventDef> = {
  // Tier 1 Events - Primitive Beginnings
  ...TIER1_EVENTS,
  
  // Future tiers will be added here
  // ...TIER2_EVENTS,
  // ...TIER3_EVENTS,
  // etc.
} as Record<EventKey, EventDef>;

