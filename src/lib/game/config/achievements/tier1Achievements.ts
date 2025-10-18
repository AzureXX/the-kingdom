// Tier 1 achievement definitions

import type { AchievementDef } from '@/lib/game/types/achievements';

/**
 * Tier 1 Achievements - Primitive Beginnings
 * Achievements focused on basic survival and tool making
 */
export const TIER1_ACHIEVEMENTS: Record<string, AchievementDef> = {
  firstSteps: {
    key: 'firstSteps',
    name: 'First Steps',
    description: 'Gather 100 of each basic resource',
    icon: '👣',
    category: 'resource',
    rarity: 'common',
    points: 25,
    requirements: [
      { type: 'resource', target: 'wood', value: 100 },
      { type: 'resource', target: 'stone', value: 100 },
      { type: 'resource', target: 'food', value: 100 }
    ],
    rewards: [
      { type: 'clickGain', target: 'wood', value: 0.5, permanent: true },
      { type: 'clickGain', target: 'stone', value: 0.5, permanent: true },
      { type: 'clickGain', target: 'food', value: 0.5, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  toolMaker: {
    key: 'toolMaker',
    name: 'Tool Maker',
    description: 'Craft 500 tools',
    icon: '🔨',
    category: 'action',
    rarity: 'uncommon',
    points: 50,
    requirements: [
      { type: 'resource', target: 'tools', value: 500 }
    ],
    rewards: [
      { type: 'actionClickMultiplier', target: 'craftBasicTools', resource: 'tools', value: 1.3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  primitiveBuilder: {
    key: 'primitiveBuilder',
    name: 'Primitive Builder',
    description: 'Build 5 primitive buildings',
    icon: '🏠',
    category: 'building',
    rarity: 'common',
    points: 30,
    requirements: [
      { type: 'building', target: 'primitiveHut', value: 5 }
    ],
    rewards: [
      { type: 'resourceGain', target: 'wood', value: 0.2, permanent: true },
      { type: 'resourceGain', target: 'stone', value: 0.2, permanent: true },
      { type: 'resourceGain', target: 'food', value: 0.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  knowledgeSeeker: {
    key: 'knowledgeSeeker',
    name: 'Knowledge Seeker',
    description: 'Accumulate 1000 knowledge',
    icon: '🧠',
    category: 'resource',
    rarity: 'uncommon',
    points: 40,
    requirements: [
      { type: 'resource', target: 'knowledge', value: 1000 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'knowledge', value: 1.25, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  clayMaster: {
    key: 'clayMaster',
    name: 'Clay Master',
    description: 'Process 1000 clay',
    icon: '🏺',
    category: 'action',
    rarity: 'uncommon',
    points: 45,
    requirements: [
      { type: 'resource', target: 'clay', value: 1000 }
    ],
    rewards: [
      { type: 'actionClickMultiplier', target: 'digClay', resource: 'clay', value: 1.4, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  fiberWeaver: {
    key: 'fiberWeaver',
    name: 'Fiber Weaver',
    description: 'Create 500 fiber items',
    icon: '🌿',
    category: 'action',
    rarity: 'uncommon',
    points: 35,
    requirements: [
      { type: 'resource', target: 'fiber', value: 500 }
    ],
    rewards: [
      { type: 'actionClickMultiplier', target: 'gatherFiber', resource: 'fiber', value: 1.3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  clickMaster: {
    key: 'clickMaster',
    name: 'Click Master',
    description: 'Perform 1000 manual actions',
    icon: '👑',
    category: 'action',
    rarity: 'epic',
    points: 100,
    requirements: [
      { type: 'click', target: 'total', value: 1000 }
    ],
    rewards: [
      { type: 'clickMultiplier', target: 'wood', value: 1.3, permanent: true },
      { type: 'clickMultiplier', target: 'stone', value: 1.3, permanent: true },
      { type: 'clickMultiplier', target: 'food', value: 1.3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  loopPioneer: {
    key: 'loopPioneer',
    name: 'Loop Pioneer',
    description: 'Have 2 loop actions running simultaneously',
    icon: '🔄',
    category: 'action',
    rarity: 'rare',
    points: 75,
    requirements: [
      { type: 'action', target: 'total', value: 100 }
    ],
    rewards: [
      { type: 'loopMultiplier', target: 'water', value: 1.2, permanent: true },
      { type: 'loopMultiplier', target: 'clay', value: 1.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
