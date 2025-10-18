// Tier 1 event definitions - Primitive Beginnings

import type { EventDef } from '@/lib/game/types';
import { EVENT_CONSTANTS } from '@/lib/game/constants/events';

/**
 * Tier 1 Events - Primitive Beginnings
 * Events focused on basic survival, discovery, and primitive challenges
 */
export const TIER1_EVENTS: Record<string, EventDef> = {
  // Natural Events
  bountifulHarvest: {
    name: 'Bountiful Harvest',
    icon: '🌾',
    desc: 'The wild plants and berries are unusually abundant this season.',
    choices: [
      {
        text: 'Gather Everything',
        gives: { food: 15, wood: 5 },
        takes: {},
        requires: {},
      },
      {
        text: 'Share with Others',
        gives: { food: 8, knowledge: 2 },
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.15,
  },

  stormyWeather: {
    name: 'Stormy Weather',
    icon: '⛈️',
    desc: 'A fierce storm approaches. You need to find shelter and protect your resources.',
    choices: [
      {
        text: 'Wait it Out',
        gives: {},
        takes: {},
        requires: {},
      },
      {
        text: 'Build Emergency Shelter',
        gives: { water: 10 },
        takes: { wood: 8, stone: 5 },
        requires: { wood: 8, stone: 5 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.12,
    unlockConditions: [
      { type: 'resource', key: 'wood', value: 5 }
    ],
  },

  // Discovery Events
  ancientCave: {
    name: 'Ancient Cave',
    icon: '🕳️',
    desc: 'You discover a mysterious cave with primitive drawings on the walls.',
    choices: [
      {
        text: 'Mark the Location',
        gives: { knowledge: 2 },
        takes: {},
        requires: {},
      },
      {
        text: 'Explore the Cave',
        gives: { knowledge: 5, stone: 8 },
        takes: { food: 2 },
        requires: { food: 2 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.08,
    unlockConditions: [
      { type: 'resource', key: 'stone', value: 5 }
    ],
  },

  clayDeposit: {
    name: 'Rich Clay Deposit',
    icon: '🏺',
    desc: 'You find a particularly rich deposit of clay near a water source.',
    choices: [
      {
        text: 'Mark the Location',
        gives: {},
        takes: {},
        requires: {},
      },
      {
        text: 'Study the Formation',
        gives: { clay: 6, knowledge: 3 },
        takes: { food: 1 },
        requires: { food: 1 },
      },
      {
        text: 'Mine the Clay',
        gives: { clay: 12, water: 5 },
        takes: { food: 3 },
        requires: { food: 3 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.10,
    unlockConditions: [
      { type: 'resource', key: 'water', value: 5 }
    ],
  },

  // Social Events
  wanderingTrader: {
    name: 'Wandering Trader',
    icon: '🧳',
    desc: 'A friendly trader passes through your area with primitive goods.',
    choices: [
      {
        text: 'Exchange Pleasantries',
        gives: {},
        takes: {},
        requires: {},
      },
      {
        text: 'Share Knowledge',
        gives: { knowledge: 4, food: 2 },
        takes: { knowledge: 2 },
        requires: { knowledge: 2 },
      },
      {
        text: 'Trade for Tools',
        gives: { tools: 3 },
        takes: { food: 8, wood: 5 },
        requires: { food: 8, wood: 5 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.12,
    unlockConditions: [
      { type: 'resource', key: 'knowledge', value: 3 }
    ],
  },

  // Challenge Events
  wildAnimal: {
    name: 'Wild Animal Encounter',
    icon: '🐺',
    desc: 'A wild animal approaches your camp. You must decide how to handle it.',
    choices: [
      {
        text: 'Stay Still and Quiet',
        gives: {},
        takes: {},
        requires: {},
      },
      {
        text: 'Scare it Away',
        gives: { food: 3 },
        takes: { wood: 2 },
        requires: { wood: 2 },
      },
      {
        text: 'Hunt the Animal',
        gives: { food: 12, fiber: 3 },
        takes: { tools: 1 },
        requires: { tools: 1 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.10,
    unlockConditions: [
      { type: 'resource', key: 'food', value: 15 }
    ],
  },

  // Resource Events
  fiberDiscovery: {
    name: 'Fiber Discovery',
    icon: '🌿',
    desc: 'You discover a new type of plant with strong, flexible fibers.',
    choices: [
      {
        text: 'Observe from Afar',
        gives: {},
        takes: {},
        requires: {},
      },
      {
        text: 'Study the Plant',
        gives: { fiber: 5, knowledge: 4 },
        takes: { food: 1 },
        requires: { food: 1 },
      },
      {
        text: 'Harvest the Fibers',
        gives: { fiber: 10, knowledge: 2 },
        takes: { food: 2 },
        requires: { food: 2 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.08,
    unlockConditions: [
      { type: 'resource', key: 'fiber', value: 3 }
    ],
  },

  // Learning Events
  primitiveInvention: {
    name: 'Primitive Invention',
    icon: '💡',
    desc: 'While working with your tools, you have a breakthrough idea.',
    choices: [
      {
        text: 'Think About It',
        gives: {},
        takes: {},
        requires: {},
      },
      {
        text: 'Document the Idea',
        gives: { knowledge: 5 },
        takes: { food: 1 },
        requires: { food: 1 },
      },
      {
        text: 'Build the Invention',
        gives: { tools: 2, knowledge: 3 },
        takes: { wood: 6, stone: 4, food: 2 },
        requires: { wood: 6, stone: 4, food: 2 },
      },
    ],
    defaultChoiceIndex: 0,
    minInterval: EVENT_CONSTANTS.STANDARD_MIN_INTERVAL_SECONDS,
    maxInterval: EVENT_CONSTANTS.STANDARD_MAX_INTERVAL_SECONDS,
    weight: 0.06,
    unlockConditions: [
      { type: 'resource', key: 'tools', value: 2 }
    ],
  }
};
