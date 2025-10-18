// Tier 1 loop action definitions

import type { LoopActionDef } from '@/lib/game/types/loopActions';

/**
 * Tier 1 Loop Actions - Primitive Beginnings
 * Basic automation for resource gathering
 */
export const TIER1_LOOP_ACTIONS: Record<string, LoopActionDef> = {
  basicGatheringLoop: {
    name: 'Basic Gathering Loop',
    icon: '🌾',
    description: 'Basic automated gathering of wood, stone, and food.',
    cost: { food: 5 },
    gains: { wood: 10, stone: 8, food: 12 },
    unlockConditions: [],
    loopPointsRequired: 1000,
    loopCategory: 'gathering',
    showWhenLocked: true,
  },
  
  waterCollectionLoop: {
    name: 'Water Collection Loop',
    icon: '💧',
    description: 'Automated water collection from nearby sources.',
    cost: { food: 3 },
    gains: { water: 15 },
    unlockConditions: [{ type: 'technology', key: 'waterManagement', value: 1 }],
    loopPointsRequired: 800,
    loopCategory: 'gathering',
    showWhenLocked: true,
  }
};
