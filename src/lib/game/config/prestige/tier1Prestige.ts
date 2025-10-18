import type { ResourceKey, PrestigeUpgradeKey, PrestigeUpgradeDef, PrestigeReward } from '@/lib/game/types';

export const TIER1_PRESTIGE_CONFIG = {
  gainFrom: 'food' as ResourceKey,
  upgrades: {
    // Basic Tier 1 Prestige Upgrades
    primitiveMastery: {
      name: 'Primitive Mastery',
      icon: 'ic-prestige',
      desc: '+25% click gains per level.',
      costCurve: (lvl: number) => 5 * Math.pow(1.6, lvl),
      max: 20,
      minPrestige: 0,
      rewards: [
        { type: 'clickMultiplier', target: 'wood', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'stone', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'food', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'water', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'clay', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'fiber', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'tools', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'knowledge', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    gatheringExpert: {
      name: 'Gathering Expert',
      icon: 'ic-wood',
      desc: '+50% wood and stone gathering efficiency per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.65, lvl),
      max: 25,
      minPrestige: 0,
      rewards: [
        { type: 'actionClickMultiplier', target: 'gatherWood', value: 1.5, permanent: true },
        { type: 'actionClickMultiplier', target: 'gatherStone', value: 1.5, permanent: true }
      ] as PrestigeReward[],
    },
    buildersWisdom: {
      name: 'Builder\'s Wisdom',
      icon: 'ic-hut',
      desc: '-25% building costs per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.7, lvl),
      max: 15,
      minPrestige: 0,
      rewards: [
        { type: 'buildingCostReduction', target: 'primitiveHut', value: 0.25, permanent: true },
        { type: 'buildingCostReduction', target: 'toolWorkshop', value: 0.25, permanent: true },
        { type: 'buildingCostReduction', target: 'studyCorner', value: 0.25, permanent: true },
        { type: 'buildingCostReduction', target: 'waterWell', value: 0.25, permanent: true },
        { type: 'buildingCostReduction', target: 'clayPit', value: 0.25, permanent: true },
        { type: 'buildingCostReduction', target: 'fiberGarden', value: 0.25, permanent: true }
      ] as PrestigeReward[],
    },
    researchAcceleration: {
      name: 'Research Acceleration',
      icon: 'ic-knowledge',
      desc: '+50% knowledge generation per level.',
      costCurve: (lvl: number) => 7 * Math.pow(1.68, lvl),
      max: 20,
      minPrestige: 100,
      rewards: [
        { type: 'resourceGainMultiplier', target: 'knowledge', value: 1.5, permanent: true }
      ] as PrestigeReward[],
    },
    automationPioneer: {
      name: 'Automation Pioneer',
      icon: 'ic-tools',
      desc: '+50% loop action efficiency per level.',
      costCurve: (lvl: number) => 9 * Math.pow(1.72, lvl),
      max: 18,
      minPrestige: 100,
      rewards: [
        { type: 'loopMultiplier', target: 'wood', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'stone', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'food', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'water', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'clay', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'fiber', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'tools', value: 1.5, permanent: true },
        { type: 'loopMultiplier', target: 'knowledge', value: 1.5, permanent: true }
      ] as PrestigeReward[],
    },
    toolMastery: {
      name: 'Tool Mastery',
      icon: 'ic-tools',
      desc: '+100% tool crafting efficiency per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.62, lvl),
      max: 25,
      minPrestige: 0,
      rewards: [
        { type: 'actionClickMultiplier', target: 'craftBasicTools', value: 2.0, permanent: true }
      ] as PrestigeReward[],
    },
    knowledgeBoost: {
      name: 'Knowledge Boost',
      icon: 'ic-knowledge',
      desc: '+50% knowledge generation per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.68, lvl),
      max: 20,
      minPrestige: 0,
      rewards: [
        { type: 'resourceGainMultiplier', target: 'knowledge', value: 1.5, permanent: true }
      ] as PrestigeReward[],
    },
    resourceStorage: {
      name: 'Resource Storage',
      icon: 'ic-storage',
      desc: '+25% all resource production per level.',
      costCurve: (lvl: number) => 7 * Math.pow(1.65, lvl),
      max: 30,
      minPrestige: 100,
      rewards: [
        { type: 'resourceGainMultiplier', target: 'wood', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'stone', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'food', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'water', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'clay', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'fiber', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'tools', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'knowledge', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    clickEfficiency: {
      name: 'Click Efficiency',
      icon: 'ic-prestige',
      desc: '+25% click action effectiveness per level.',
      costCurve: (lvl: number) => 5 * Math.pow(1.6, lvl),
      max: 25,
      minPrestige: 0,
      rewards: [
        { type: 'clickMultiplier', target: 'wood', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'stone', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'food', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'water', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'clay', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'fiber', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'tools', value: 1.25, permanent: true },
        { type: 'clickMultiplier', target: 'knowledge', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    fastResearch: {
      name: 'Fast Research',
      icon: 'ic-research',
      desc: '+30% knowledge generation per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.65, lvl),
      max: 25,
      minPrestige: 100,
      rewards: [
        { type: 'resourceGainMultiplier', target: 'knowledge', value: 1.3, permanent: true }
      ] as PrestigeReward[],
    },
    basicAutomation: {
      name: 'Basic Automation',
      icon: 'ic-tools',
      desc: '+25% Tier 1 loop action efficiency per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.7, lvl),
      max: 20,
      minPrestige: 100,
      rewards: [
        { type: 'loopMultiplier', target: 'wood', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'stone', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'food', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'water', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'clay', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'fiber', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'tools', value: 1.25, permanent: true },
        { type: 'loopMultiplier', target: 'knowledge', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
  } as Record<PrestigeUpgradeKey, PrestigeUpgradeDef>,
};
