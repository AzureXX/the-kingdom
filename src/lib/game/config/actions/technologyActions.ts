// Technology-dependent action definitions

import type { ActionDef } from '@/lib/game/types/actions';

/**
 * Technology-dependent actions - actions that require specific technologies
 */
export const TECHNOLOGY_ACTIONS: Record<string, ActionDef> = {
  advancedMining: {
    name: 'Advanced Mining',
    icon: '🪨',
    description: 'Use advanced mining techniques. Requires Engineering technology.',
    cost: {},
    gains: { stone: 3 },
    unlockConditions: [
      { type: 'technology', key: 'engineering', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  scientificResearch: {
    name: 'Scientific Research',
    icon: '🔬',
    description: 'Conduct scientific research. Requires Chemistry technology.',
    cost: {},
    gains: { researchPoints: 2 },
    unlockConditions: [
      { type: 'technology', key: 'chemistry', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  royalDiplomacy: {
    name: 'Royal Diplomacy',
    icon: '👑',
    description: 'Engage in royal diplomacy. Requires Writing technology.',
    cost: {},
    gains: { prestige: 1 },
    unlockConditions: [
      { type: 'technology', key: 'writing', value: 1 }
    ],
    oneTimeUnlock: false,
  }
};
