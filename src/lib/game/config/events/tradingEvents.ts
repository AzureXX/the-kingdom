// Trading-related event definitions

import type { EventDef } from '@/lib/game/types';
import { EVENT_CONSTANTS } from '@/lib/game/constants/events';

/**
 * Trading events - events related to commerce and trade
 */
export const TRADING_EVENTS: Record<string, EventDef> = {
  merchantVisit: {
    name: 'Merchant Visit',
    icon: '🛒',
    desc: 'A merchant offers to trade goods for Gold.',
    choices: [
      {
        text: 'Accept Trade',
        gives: { gold: 10 },
        takes: { wood: 5 },
        requires: { wood: 5 },
      },
      {
        text: 'Reject Trade',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Reject trade by default
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.2,
  },

  mysteriousStranger: {
    name: 'Mysterious Stranger',
    icon: '👤',
    desc: 'A mysterious stranger offers to trade Gold for Prestige.',
    choices: [
      {
        text: 'Accept Trade',
        gives: { prestige: 1 },
        takes: { gold: 20 },
        requires: { gold: 20 },
      },
      {
        text: 'Decline',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Decline by default
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.1,
  }
};
