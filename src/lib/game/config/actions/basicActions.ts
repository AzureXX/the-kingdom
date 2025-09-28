// Basic action definitions - always available actions

import type { ActionDef } from '@/lib/game/types/actions';

/**
 * Basic actions - always available resource gathering actions
 */
export const BASIC_ACTIONS: Record<string, ActionDef> = {
  gatherWood: {
    name: 'Gather Wood',
    icon: '🌲',
    description: 'Collect wood from the forest. Basic resource gathering.',
    cost: {},
    gains: { wood: 2 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  gatherStone: {
    name: 'Gather Stone',
    icon: '🪨',
    description: 'Collect stone from the quarry. Basic resource gathering.',
    cost: {},
    gains: { stone: 1 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  huntFood: {
    name: 'Hunt Food',
    icon: '🍖',
    description: 'Hunt for food in the wilderness. Basic resource gathering.',
    cost: {},
    gains: { food: 1 },
    unlockConditions: [],
    oneTimeUnlock: false,
  }
};
