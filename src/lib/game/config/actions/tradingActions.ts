// Trading action definitions - resource trading actions

import type { ActionDef } from '@/lib/game/types/actions';

/**
 * Trading actions - resource trading actions that unlock with thresholds
 */
export const TRADING_ACTIONS: Record<string, ActionDef> = {
  sellWood: {
    name: 'Sell Wood',
    icon: '💰',
    description: 'Trade wood for gold. Requires 50+ wood to unlock.',
    cost: { wood: 10 },
    gains: { gold: 5 },
    unlockConditions: [
      { type: 'resource', key: 'wood', value: 50 }
    ],
    oneTimeUnlock: true,
  },

  sellStone: {
    name: 'Sell Stone',
    icon: '💰',
    description: 'Trade stone for gold. Requires 25+ stone to unlock.',
    cost: { stone: 5 },
    gains: { gold: 8 },
    unlockConditions: [
      { type: 'resource', key: 'stone', value: 25 }
    ],
    oneTimeUnlock: true,
  },

  sellFood: {
    name: 'Sell Food',
    icon: '💰',
    description: 'Trade food for gold. Requires 100+ food to unlock.',
    cost: { food: 20 },
    gains: { gold: 15 },
    unlockConditions: [
      { type: 'resource', key: 'food', value: 100 }
    ],
    oneTimeUnlock: true,
  }
};
