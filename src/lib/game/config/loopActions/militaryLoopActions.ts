// Military loop action definitions

import type { LoopActionDef } from '../../types/loopActions';

/**
 * Military loop actions - military and defensive operations
 */
export const MILITARY_LOOP_ACTIONS: Record<string, LoopActionDef> = {
  trainingSoldiers: {
    name: 'Training Soldiers',
    icon: '🛡️',
    description: 'Continuous military training.',
    cost: { food: 20, gold: 10 },
    gains: { prestige: 2 },
    unlockConditions: [{ type: 'building', key: 'castle', value: 1 }],
    loopPointsRequired: 2500,
    loopCategory: 'military',
    showWhenLocked: false,
  },
  
  fortification: {
    name: 'Fortification',
    icon: '🏰',
    description: 'Continuous fortification work.',
    cost: { stone: 50, wood: 30, gold: 20 },
    gains: { prestige: 5 },
    unlockConditions: [{ type: 'building', key: 'castle', value: 1 }],
    loopPointsRequired: 4000,
    loopCategory: 'military',
    showWhenLocked: false,
  }
};
