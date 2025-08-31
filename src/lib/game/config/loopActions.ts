import type { LoopActionDef } from '../types/loopActions';

export const LOOP_ACTIONS: Record<string, LoopActionDef> = {
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
  },
  
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
  },
  
  ongoingResearch: {
    name: 'Ongoing Research',
    icon: '📚',
    description: 'Continuous research operation.',
    cost: { food: 10 },
    gains: { researchPoints: 5 },
    unlockConditions: [{ type: 'building', key: 'library', value: 1 }],
    loopPointsRequired: 3000,
    loopCategory: 'research',
    showWhenLocked: false,
  },
  
  advancedStudies: {
    name: 'Advanced Studies',
    icon: '🎓',
    description: 'Advanced research operation.',
    cost: { food: 15, gold: 5 },
    gains: { researchPoints: 10 },
    unlockConditions: [{ type: 'building', key: 'university', value: 1 }],
    loopPointsRequired: 5000,
    loopCategory: 'research',
    showWhenLocked: false,
  },
  
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
  },
};

export const DEFAULT_LOOP_SETTINGS = {
  maxConcurrentActions: 2,
  basePointsPerTick: 100,
} as const;
