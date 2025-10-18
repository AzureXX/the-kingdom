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
    showWhenLocked: false,
  },

  clayDiggingLoop: {
    name: 'Clay Digging Loop',
    icon: '🏺',
    description: 'Automated clay extraction from the ground.',
    cost: { food: 4, water: 2 },
    gains: { clay: 12 },
    unlockConditions: [{ type: 'technology', key: 'waterManagement', value: 1 }],
    loopPointsRequired: 1200,
    loopCategory: 'gathering',
    showWhenLocked: false,
  },

  fiberHarvestingLoop: {
    name: 'Fiber Harvesting Loop',
    icon: '🌿',
    description: 'Automated fiber collection from plants.',
    cost: { food: 3, water: 1 },
    gains: { fiber: 10 },
    unlockConditions: [{ type: 'technology', key: 'waterManagement', value: 1 }],
    loopPointsRequired: 1000,
    loopCategory: 'gathering',
    showWhenLocked: false,
  },

  toolCraftingLoop: {
    name: 'Tool Crafting Loop',
    icon: '🔨',
    description: 'Automated tool crafting for efficiency.',
    cost: { wood: 8, stone: 5, food: 2 },
    gains: { tools: 6 },
    unlockConditions: [{ type: 'technology', key: 'toolMaking', value: 1 }],
    loopPointsRequired: 1500,
    loopCategory: 'crafting',
    showWhenLocked: false,
  },

  knowledgeStudyLoop: {
    name: 'Knowledge Study Loop',
    icon: '📚',
    description: 'Automated study and knowledge gathering.',
    cost: { food: 2, water: 1 },
    gains: { knowledge: 8 },
    unlockConditions: [{ type: 'building', key: 'studyCorner', value: 1 }],
    loopPointsRequired: 2000,
    loopCategory: 'research',
    showWhenLocked: false,
  }
};
