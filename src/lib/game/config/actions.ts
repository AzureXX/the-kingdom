// Action system configuration

import type { ActionKey, ActionDef } from '../types/actions';
import type { BuildingKey, TechnologyKey } from '../types';

/**
 * All available game actions with their configurations
 */
export const ACTIONS: Record<ActionKey, ActionDef> = {
  // Basic Actions - Always available
  gatherWood: {
    name: 'Gather Wood',
    icon: '🌲',
    description: 'Collect wood from the forest. Basic resource gathering.',
    cost: {},
    gains: { wood: 2 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  gatherStone: {
    name: 'Gather Stone',
    icon: '🪨',
    description: 'Collect stone from the quarry. Basic resource gathering.',
    cost: {},
    gains: { stone: 1 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  huntFood: {
    name: 'Hunt Food',
    icon: '🍖',
    description: 'Hunt for food in the wilderness. Basic resource gathering.',
    cost: {},
    gains: { food: 1 },
    unlockConditions: [],
    oneTimeUnlock: false,
  },

  // Resource Trading Actions - Unlock with thresholds
  sellWood: {
    name: 'Sell Wood',
    icon: '💰',
    description: 'Trade wood for gold. Requires 50+ wood to unlock.',
    cost: { wood: 10 },
    gains: { gold: 5 },
    unlockConditions: [
      { type: 'resource', key: 'wood', value: 50 }
    ],
    oneTimeUnlock: true,
  },

  sellStone: {
    name: 'Sell Stone',
    icon: '💰',
    description: 'Trade stone for gold. Requires 25+ stone to unlock.',
    cost: { stone: 5 },
    gains: { gold: 8 },
    unlockConditions: [
      { type: 'resource', key: 'stone', value: 25 }
    ],
    oneTimeUnlock: true,
  },

  sellFood: {
    name: 'Sell Food',
    icon: '💰',
    description: 'Trade food for gold. Requires 100+ food to unlock.',
    cost: { food: 20 },
    gains: { gold: 15 },
    unlockConditions: [
      { type: 'resource', key: 'food', value: 100 }
    ],
    oneTimeUnlock: true,
  },

  // Building-Dependent Actions
  craftTools: {
    name: 'Craft Tools',
    icon: '🔨',
    description: 'Craft stone tools using wood. Requires Blacksmith building.',
    cost: { wood: 5 },
    gains: { stone: 2 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  forgeWeapons: {
    name: 'Forge Weapons',
    icon: '⚔️',
    description: 'Forge weapons for gold. Requires Blacksmith building.',
    cost: { stone: 3 },
    gains: { gold: 10 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  farmWork: {
    name: 'Farm Work',
    icon: '🌾',
    description: 'Work the farm to produce wood. Requires Farm building.',
    cost: { food: 2 },
    gains: { wood: 5 },
    unlockConditions: [
      { type: 'building', key: 'farm', value: 1 }
    ],
    oneTimeUnlock: false,
  },

  // Technology-Dependent Actions
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
  },
};

/**
 * Get action by key
 */
export function getAction(key: ActionKey): ActionDef {
  return ACTIONS[key];
}

/**
 * Get all available actions
 */
export function getAllActions(): Record<ActionKey, ActionDef> {
  return ACTIONS;
}

/**
 * Get actions that are always available (no unlock conditions)
 */
export function getBasicActions(): ActionKey[] {
  return Object.entries(ACTIONS)
    .filter(([, action]) => action.unlockConditions.length === 0)
    .map(([key]) => key as ActionKey);
}

/**
 * Get actions that require a specific building
 */
export function getActionsRequiringBuilding(buildingKey: BuildingKey): ActionKey[] {
  return Object.entries(ACTIONS)
    .filter(([, action]) => 
      action.unlockConditions.some(condition => 
        condition.type === 'building' && condition.key === buildingKey
      )
    )
    .map(([key]) => key as ActionKey);
}

/**
 * Get actions that require a specific technology
 */
export function getActionsRequiringTechnology(technologyKey: TechnologyKey): ActionKey[] {
  return Object.entries(ACTIONS)
    .filter(([, action]) => 
      action.unlockConditions.some(condition => 
        condition.type === 'technology' && condition.key === technologyKey
      )
    )
    .map(([key]) => key as ActionKey);
}
