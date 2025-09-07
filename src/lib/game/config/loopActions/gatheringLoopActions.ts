// Gathering loop action definitions

import type { LoopActionDef } from '../../types/loopActions';

/**
 * Gathering loop actions - resource gathering operations
 */
export const GATHERING_LOOP_ACTIONS: Record<string, LoopActionDef> = {
  basicGathering: {
    name: 'Basic Gathering',
    icon: '🌾',
    description: 'Basic food gathering operation. Available from the start with no cost.',
    cost: {}, // No cost
    gains: { food: 5 },
    unlockConditions: [], // No unlock conditions - available from start
    loopPointsRequired: 1000,
    loopCategory: 'gathering',
    showWhenLocked: true,
  },
  
  continuousMining: {
    name: 'Continuous Mining',
    icon: '⛏️',
    description: 'Continuous stone mining operation.',
    cost: { food: 5 },
    gains: { stone: 10 },
    unlockConditions: [{ type: 'building', key: 'quarry', value: 1 }],
    loopPointsRequired: 1000,
    loopCategory: 'gathering',
    showWhenLocked: true,
  },
  
  continuousLogging: {
    name: 'Continuous Logging',
    icon: '🪓',
    description: 'Continuous wood logging operation.',
    cost: { food: 5 },
    gains: { wood: 8 },
    unlockConditions: [{ type: 'building', key: 'woodcutter', value: 1 }],
    loopPointsRequired: 800,
    loopCategory: 'gathering',
    showWhenLocked: true,
  },
  
  continuousFarming: {
    name: 'Continuous Farming',
    icon: '🚜',
    description: 'Continuous food farming operation.',
    cost: { food: 5 },
    gains: { food: 12 },
    unlockConditions: [{ type: 'building', key: 'farm', value: 1 }, { type: 'resource', key: 'food', value: 100 }],
    loopPointsRequired: 1200,
    loopCategory: 'gathering',
    showWhenLocked: true,
  }
};
