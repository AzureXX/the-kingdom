// Building-dependent action definitions

import type { ActionDef } from '../../types/actions';

/**
 * Building-dependent actions - actions that require specific buildings
 */
export const BUILDING_ACTIONS: Record<string, ActionDef> = {
  craftTools: {
    name: 'Craft Tools',
    icon: '🔨',
    description: 'Craft stone tools using wood. Requires Blacksmith building.',
    cost: { wood: 5 },
    gains: { stone: 2 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  forgeWeapons: {
    name: 'Forge Weapons',
    icon: '⚔️',
    description: 'Forge weapons for gold. Requires Blacksmith building.',
    cost: { stone: 3 },
    gains: { gold: 10 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  farmWork: {
    name: 'Farm Work',
    icon: '🌾',
    description: 'Work the farm to produce wood. Requires Farm building.',
    cost: { food: 2 },
    gains: { wood: 5 },
    unlockConditions: [
      { type: 'building', key: 'farm', value: 1 }
    ],
    oneTimeUnlock: false,
  }
};
