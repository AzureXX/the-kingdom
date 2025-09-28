// Conflict-related event definitions

import type { EventDef } from '@/lib/game/types';
import { EVENT_CONSTANTS } from '@/lib/game/constants/events';

/**
 * Conflict events - events related to battles, raids, and conflicts
 */
export const CONFLICT_EVENTS: Record<string, EventDef> = {
  banditRaid: {
    name: 'Bandit Raid',
    icon: '⚔️',
    desc: 'Bandits attack your village, stealing resources.',
    choices: [
      {
        text: 'Fight Back',
        gives: {},
        takes: { wood: 2, stone: 1 },
        requires: { },
      },
      {
        text: 'Pay Tribute',
        gives: { gold: 5 },
        takes: { food: 1 },
        requires: { food: 1 },
      },
    ],
    defaultChoiceIndex: 1, // Pay tribute by default
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.3,
  },

  royalTax: {
    name: 'Royal Tax',
    icon: '👑',
    desc: 'The royal court demands tribute in Gold.',
    choices: [
      {
        text: 'Pay Tax',
        gives: {},
        takes: { gold: 15 },
        requires: { gold: 15 },
      },
      {
        text: 'Refuse to Pay',
        gives: {},
        takes: { prestige: 1 },
        requires: {},
      },
    ],
    defaultChoiceIndex: 0, // Pay tax by default
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.2,
  }
};
