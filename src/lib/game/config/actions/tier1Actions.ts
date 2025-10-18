// Tier 1 action definitions

import type { ActionDef } from '@/lib/game/types/actions';

/**
 * Tier 1 Actions - Primitive Beginnings
 * Basic survival and tool making actions
 */
export const TIER1_ACTIONS: Record<string, ActionDef> = {
  gatherWood: {
    name: 'Gather Wood',
    icon: '🌲',
    description: 'Collect wood from the forest. Basic resource gathering.',
    cost: {},
    gains: { wood: 3 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  gatherStone: {
    name: 'Gather Stone',
    icon: '🪨',
    description: 'Collect stone from the quarry. Basic resource gathering.',
    cost: {},
    gains: { stone: 2 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  huntFood: {
    name: 'Hunt Food',
    icon: '🍖',
    description: 'Hunt for food in the wilderness. Basic resource gathering.',
    cost: {},
    gains: { food: 2 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  rest: {
    name: 'Rest',
    icon: '🛏️',
    description: 'Rest and recover energy. Provides food through relaxation.',
    cost: { wood: 2, stone: 1 },
    gains: { food: 8 },
    unlockConditions: [{ type: 'building', key: 'primitiveHut', value: 1 }],
    oneTimeUnlock: false,
  },

  craftBasicTools: {
    name: 'Craft Basic Tools',
    icon: '🔨',
    description: 'Create basic tools to improve efficiency.',
    cost: { wood: 8, stone: 5 },
    gains: { tools: 1 },
    unlockConditions: [
      { type: 'building', key: 'toolWorkshop', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  thinkAndLearn: {
    name: 'Think and Learn',
    icon: '🧠',
    description: 'Spend time thinking and learning new things.',
    cost: { food: 3 },
    gains: { knowledge: 1 },
    unlockConditions: [
      { type: 'resource', key: 'food', value: 10 }
    ],
    oneTimeUnlock: true,
  },

  collectWater: {
    name: 'Collect Water',
    icon: '💧',
    description: 'Gather water from nearby sources.',
    cost: { food: 1 },
    gains: { water: 2 },
    unlockConditions: [
      { type: 'building', key: 'waterWell', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  digClay: {
    name: 'Dig Clay',
    icon: '🏺',
    description: 'Extract clay from the ground for pottery.',
    cost: { food: 2 },
    gains: { clay: 1 },
    unlockConditions: [
      { type: 'technology', key: 'clayProcessing', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  gatherFiber: {
    name: 'Gather Fiber',
    icon: '🌿',
    description: 'Collect plant fibers for rope making.',
    cost: { food: 1 },
    gains: { fiber: 1 },
    unlockConditions: [
      { type: 'technology', key: 'fiberWeaving', value: 1 }
    ],
    oneTimeUnlock: false,
  }
};
