// Natural event definitions

import type { EventDef } from '@/lib/game/types';
import { EVENT_CONSTANTS } from '@/lib/game/constants/events';

/**
 * Natural events - events related to weather, harvests, and natural phenomena
 */
export const NATURAL_EVENTS: Record<string, EventDef> = {
  bountifulHarvest: {
    name: 'Bountiful Harvest',
    icon: '🌾',
    desc: 'A rare event where all resources grow naturally.',
    choices: [
      {
        text: 'Harvest All',
        gives: { gold: 10, wood: 5, stone: 3, food: 2 },
        takes: {},
        requires: {},
      },
      {
        text: 'Wait for Next Harvest',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 0, // Harvest all by default (positive event)
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.1,
  },

  drought: {
    name: 'Drought',
    icon: '🌵',
    desc: 'A severe drought reduces resource production.',
    choices: [
      {
        text: 'Pray for Rain',
        gives: {},
        takes: { food: 1 },
        requires: { },
      },
      {
        text: 'Accept Drought',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Accept drought by default
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.2,
  },

  plague: {
    name: 'Plague',
    icon: '🦠',
    desc: 'A plague spreads through the kingdom, affecting prestige.',
    choices: [
      {
        text: 'Quarantine',
        gives: {},
        takes: { prestige: 1 },
        requires: {},
      },
      {
        text: 'Continue Normal Life',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Continue normal life by default
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.15,
  }
};
