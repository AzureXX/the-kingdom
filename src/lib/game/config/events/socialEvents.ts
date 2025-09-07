// Social event definitions

import type { EventDef } from '../../types';
import { EVENT_CONSTANTS } from '../../constants/events';

/**
 * Social events - events related to celebrations, festivals, and social activities
 */
export const SOCIAL_EVENTS: Record<string, EventDef> = {
  festival: {
    name: 'Festival',
    icon: '🎉',
    desc: 'A grand festival brings joy and resources to the kingdom.',
    choices: [
      {
        text: 'Participate in Festival',
        gives: { gold: 5, food: 3, prestige: 1 },
        takes: {},
        requires: {},
      },
      {
        text: 'Stay Home',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 0, // Participate by default (positive event)
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.1,
  }
};
