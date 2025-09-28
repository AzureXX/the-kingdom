// Crafting loop action definitions

import type { LoopActionDef } from '@/lib/game/types/loopActions';

/**
 * Crafting loop actions - manufacturing and production operations
 */
export const CRAFTING_LOOP_ACTIONS: Record<string, LoopActionDef> = {
  massToolProduction: {
    name: 'Mass Tool Production',
    icon: '🔨',
    description: 'Mass production of stone tools.',
    cost: { wood: 20 },
    gains: { stone: 15 },
    unlockConditions: [{ type: 'building', key: 'blacksmith', value: 1 }],
    loopPointsRequired: 1500,
    loopCategory: 'crafting',
    showWhenLocked: false,
  },
  
  weaponForging: {
    name: 'Weapon Forging',
    icon: '⚔️',
    description: 'Continuous weapon production.',
    cost: { stone: 30 },
    gains: { gold: 25 },
    unlockConditions: [{ type: 'building', key: 'blacksmith', value: 1 }],
    loopPointsRequired: 2000,
    loopCategory: 'crafting',
    showWhenLocked: false,
  }
};
