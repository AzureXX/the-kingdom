// Demo achievements showcasing all new reward types

import type { AchievementDef } from '@/lib/game/types/achievements';

/**
 * Demo achievements - showcasing all the new reward types
 */
export const DEMO_ACHIEVEMENTS: Record<string, AchievementDef> = {
  // 1. Direct resource reward
  demoFirstWood: {
    key: 'demoFirstWood',
    name: 'Demo First Wood',
    description: 'Collect 10 wood (demo)',
    icon: '🪵',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'resource', target: 'gold', value: 50, permanent: false }
    ],
    hidden: false,
    repeatable: false
  },

  // 2. Resource production gain
  demoWoodProduction: {
    key: 'demoWoodProduction',
    name: 'Demo Wood Production',
    description: 'Collect 10 wood (demo)',
    icon: '🌲',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'resourceGain', target: 'wood', value: 2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 3. Resource production multiplier
  demoWoodMultiplier: {
    key: 'demoWoodMultiplier',
    name: 'Demo Wood Multiplier',
    description: 'Collect 10 wood (demo)',
    icon: '⚡',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'resourceGainMultiplier', target: 'wood', value: 1.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 4. Building-specific production gain
  demoWoodcutterGain: {
    key: 'demoWoodcutterGain',
    name: 'Demo Woodcutter Gain',
    description: 'Collect 10 wood (demo)',
    icon: '🪓',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'buildingGain', target: 'woodcutter', resource: 'wood', value: 1, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 5. Building-specific production multiplier
  demoWoodcutterMultiplier: {
    key: 'demoWoodcutterMultiplier',
    name: 'Demo Woodcutter Multiplier',
    description: 'Collect 10 wood (demo)',
    icon: '🏭',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'buildingGainMultiplier', target: 'woodcutter', resource: 'wood', value: 1.3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 6. Click action gain
  demoClickGain: {
    key: 'demoClickGain',
    name: 'Demo Click Gain',
    description: 'Collect 10 wood (demo)',
    icon: '🖱️',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'clickGain', target: 'wood', value: 1, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 7. Click action multiplier
  demoClickMultiplier: {
    key: 'demoClickMultiplier',
    name: 'Demo Click Multiplier',
    description: 'Collect 10 wood (demo)',
    icon: '⚡',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'clickMultiplier', target: 'wood', value: 1.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 8. Action-specific click gain
  demoGatherWoodGain: {
    key: 'demoGatherWoodGain',
    name: 'Demo Gather Wood Gain',
    description: 'Collect 10 wood (demo)',
    icon: '🪚',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'actionClickGain', target: 'gatherWood', resource: 'wood', value: 2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 9. Action-specific click multiplier
  demoGatherWoodMultiplier: {
    key: 'demoGatherWoodMultiplier',
    name: 'Demo Gather Wood Multiplier',
    description: 'Collect 10 wood (demo)',
    icon: '🎯',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'actionClickMultiplier', target: 'gatherWood', resource: 'wood', value: 1.5, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 10. Loop action gain
  demoLoopGain: {
    key: 'demoLoopGain',
    name: 'Demo Loop Gain',
    description: 'Collect 10 wood (demo)',
    icon: '🔄',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'loopGain', target: 'wood', value: 1, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 11. Loop action multiplier
  demoLoopMultiplier: {
    key: 'demoLoopMultiplier',
    name: 'Demo Loop Multiplier',
    description: 'Collect 10 wood (demo)',
    icon: '⚡',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'loopMultiplier', target: 'wood', value: 1.2, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 12. Action-specific loop gain
  demoGatherWoodLoopGain: {
    key: 'demoGatherWoodLoopGain',
    name: 'Demo Gather Wood Loop Gain',
    description: 'Collect 10 wood (demo)',
    icon: '🪵',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'actionLoopGain', target: 'gatherWood', resource: 'wood', value: 3, permanent: true }
    ],
    hidden: false,
    repeatable: false
  },

  // 13. Action-specific loop multiplier
  demoGatherWoodLoopMultiplier: {
    key: 'demoGatherWoodLoopMultiplier',
    name: 'Demo Gather Wood Loop Multiplier',
    description: 'Collect 10 wood (demo)',
    icon: '🎯',
    category: 'misc',
    rarity: 'common',
    points: 10,
    requirements: [
      { type: 'resource', target: 'wood', value: 10 }
    ],
    rewards: [
      { type: 'actionLoopMultiplier', target: 'gatherWood', resource: 'wood', value: 1.4, permanent: true }
    ],
    hidden: false,
    repeatable: false
  }
};
