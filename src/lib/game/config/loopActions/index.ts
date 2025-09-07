// Loop action system configuration - grouped by category

import type { LoopActionKey, LoopActionDef } from '../../types/loopActions';

// Import all loop action categories
import { GATHERING_LOOP_ACTIONS } from './gatheringLoopActions';
import { CRAFTING_LOOP_ACTIONS } from './craftingLoopActions';
import { RESEARCH_LOOP_ACTIONS } from './researchLoopActions';
import { MILITARY_LOOP_ACTIONS } from './militaryLoopActions';

/**
 * Combined loop action definitions organized by category
 */
export const LOOP_ACTIONS: Record<LoopActionKey, LoopActionDef> = {
  // Gathering loop actions
  ...GATHERING_LOOP_ACTIONS,
  
  // Crafting loop actions
  ...CRAFTING_LOOP_ACTIONS,
  
  // Research loop actions
  ...RESEARCH_LOOP_ACTIONS,
  
  // Military loop actions
  ...MILITARY_LOOP_ACTIONS
} as Record<LoopActionKey, LoopActionDef>;

export const DEFAULT_LOOP_SETTINGS = {
  maxConcurrentActions: 2,
  basePointsPerTick: 100,
  pointsPerSecond: 2000,
};

// Re-export individual category loop actions for direct access
export {
  GATHERING_LOOP_ACTIONS,
  CRAFTING_LOOP_ACTIONS,
  RESEARCH_LOOP_ACTIONS,
  MILITARY_LOOP_ACTIONS
};
