// Event system configuration - grouped by category

import type { EventKey, EventDef } from '../../types';

// Import all event categories
import { TRADING_EVENTS } from './tradingEvents';
import { CONFLICT_EVENTS } from './conflictEvents';
import { NATURAL_EVENTS } from './naturalEvents';
import { SOCIAL_EVENTS } from './socialEvents';

/**
 * Combined event definitions organized by category
 */
export const EVENTS: Record<EventKey, EventDef> = {
  // Trading events
  ...TRADING_EVENTS,
  
  // Conflict events
  ...CONFLICT_EVENTS,
  
  // Natural events
  ...NATURAL_EVENTS,
  
  // Social events
  ...SOCIAL_EVENTS
} as Record<EventKey, EventDef>;

// Re-export individual category events for direct access
export {
  TRADING_EVENTS,
  CONFLICT_EVENTS,
  NATURAL_EVENTS,
  SOCIAL_EVENTS
};
