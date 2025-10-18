import type { ResourceKey, PrestigeUpgradeKey, PrestigeUpgradeDef, PrestigeReward } from '@/lib/game/types';

export const TIER1_PRESTIGE_CONFIG = {
  gainFrom: 'food' as ResourceKey,
  upgrades: {
    royalDecrees: {
      name: 'Royal Decrees',
      icon: 'ic-gold',
      desc: '+25% click gains per level.',
      costCurve: (lvl: number) => 5 * Math.pow(1.6, lvl),
      max: 20,
      rewards: [
        { type: 'clickMultiplier', target: 'all', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    masterCraftsmen: {
      name: 'Master Craftsmen',
      icon: 'ic-blacksmith',
      desc: '-3% building costs per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.7, lvl),
      max: 25,
      rewards: [
        { type: 'buildingCostReduction', target: 'all', value: 0.03, permanent: true }
      ] as PrestigeReward[],
    },
    fertileLands: {
      name: 'Fertile Lands',
      icon: 'ic-farm',
      desc: '+2 Food/s and +20% Food production per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.65, lvl),
      max: 25,
      rewards: [
        { type: 'resourceGain', target: 'food', value: 2, permanent: true },
        { type: 'resourceGainMultiplier', target: 'food', value: 1.2, permanent: true }
      ] as PrestigeReward[],
    },
    militaryMight: {
      name: 'Military Might',
      icon: 'ic-castle',
      desc: '+0.1 Prestige/s and +20% Prestige production per level.',
      costCurve: (lvl: number) => 10 * Math.pow(1.7, lvl),
      max: 20,
      rewards: [
        { type: 'resourceGain', target: 'prestige', value: 0.1, permanent: true },
        { type: 'resourceGainMultiplier', target: 'prestige', value: 1.2, permanent: true }
      ] as PrestigeReward[],
    },
    goldenTouch: {
      name: 'Golden Touch',
      icon: 'ic-gold',
      desc: '+1 Gold/s and +30% Gold production per level.',
      costCurve: (lvl: number) => 7 * Math.pow(1.55, lvl),
      max: 30,
      rewards: [
        { type: 'resourceGain', target: 'gold', value: 1, permanent: true },
        { type: 'resourceGainMultiplier', target: 'gold', value: 1.3, permanent: true }
      ] as PrestigeReward[],
    },
    forestMastery: {
      name: 'Forest Mastery',
      icon: 'ic-wood',
      desc: '+1.5 Wood/s and +25% Wood production per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.6, lvl),
      max: 30,
      rewards: [
        { type: 'resourceGain', target: 'wood', value: 1.5, permanent: true },
        { type: 'resourceGainMultiplier', target: 'wood', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    stoneQuarry: {
      name: 'Stone Quarry',
      icon: 'ic-stone',
      desc: '+1 Stone/s and +25% Stone production per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.6, lvl),
      max: 30,
      rewards: [
        { type: 'resourceGain', target: 'stone', value: 1, permanent: true },
        { type: 'resourceGainMultiplier', target: 'stone', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    researchAcceleration: {
      name: 'Research Acceleration',
      icon: 'ic-research',
      desc: '+0.2 Research/s and +35% Research Points production per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.65, lvl),
      max: 25,
      rewards: [
        { type: 'resourceGain', target: 'researchPoints', value: 0.2, permanent: true },
        { type: 'resourceGainMultiplier', target: 'researchPoints', value: 1.35, permanent: true }
      ] as PrestigeReward[],
    },
    efficientBuilders: {
      name: 'Efficient Builders',
      icon: 'ic-blacksmith',
      desc: '-2% all building costs per level.',
      costCurve: (lvl: number) => 9 * Math.pow(1.68, lvl),
      max: 35,
      rewards: [
        { type: 'buildingCostReduction', target: 'all', value: 0.02, permanent: true }
      ] as PrestigeReward[],
    },
    merchantGuilds: {
      name: 'Merchant Guilds',
      icon: 'ic-gold',
      desc: '+0.5 all resources/s and +15% all resource production per level.',
      costCurve: (lvl: number) => 12 * Math.pow(1.7, lvl),
      max: 20,
      rewards: [
        { type: 'resourceGain', target: 'all', value: 0.5, permanent: true },
        { type: 'resourceGainMultiplier', target: 'all', value: 1.15, permanent: true }
      ] as PrestigeReward[],
    },
    royalTreasury: {
      name: 'Royal Treasury',
      icon: 'ic-gold',
      desc: '+1 Gold per click and +40% Gold click gains per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.62, lvl),
      max: 25,
      rewards: [
        { type: 'clickGain', target: 'gold', value: 1, permanent: true },
        { type: 'clickMultiplier', target: 'gold', value: 1.4, permanent: true }
      ] as PrestigeReward[],
    },
    militaryEngineers: {
      name: 'Military Engineers',
      icon: 'ic-castle',
      desc: '+0.2 Prestige/s, +30% Prestige production and -5% building costs per level.',
      costCurve: (lvl: number) => 15 * Math.pow(1.75, lvl),
      max: 15,
      rewards: [
        { type: 'resourceGain', target: 'prestige', value: 0.2, permanent: true },
        { type: 'resourceGainMultiplier', target: 'prestige', value: 1.3, permanent: true },
        { type: 'buildingCostReduction', target: 'all', value: 0.05, permanent: true }
      ] as PrestigeReward[],
    },
    scholarlyPursuits: {
      name: 'Scholarly Pursuits',
      icon: 'ic-research',
      desc: '+0.3 Research/s, +50% Research Points production and +20% click gains per level.',
      costCurve: (lvl: number) => 10 * Math.pow(1.7, lvl),
      max: 20,
      rewards: [
        { type: 'resourceGain', target: 'researchPoints', value: 0.3, permanent: true },
        { type: 'resourceGainMultiplier', target: 'researchPoints', value: 1.5, permanent: true },
        { type: 'clickMultiplier', target: 'all', value: 1.2, permanent: true }
      ] as PrestigeReward[],
    },
    agriculturalRevolution: {
      name: 'Agricultural Revolution',
      icon: 'ic-farm',
      desc: '+3 Food/s, +1.5 Wood/s, +40% Food production and +20% Wood production per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.65, lvl),
      max: 25,
      rewards: [
        { type: 'resourceGain', target: 'food', value: 3, permanent: true },
        { type: 'resourceGain', target: 'wood', value: 1.5, permanent: true },
        { type: 'resourceGainMultiplier', target: 'food', value: 1.4, permanent: true },
        { type: 'resourceGainMultiplier', target: 'wood', value: 1.2, permanent: true }
      ] as PrestigeReward[],
    },
    miningInnovation: {
      name: 'Mining Innovation',
      icon: 'ic-stone',
      desc: '+2 Stone/s, +1.5 Gold/s, +35% Stone production and +25% Gold production per level.',
      costCurve: (lvl: number) => 9 * Math.pow(1.68, lvl),
      max: 25,
      rewards: [
        { type: 'resourceGain', target: 'stone', value: 2, permanent: true },
        { type: 'resourceGain', target: 'gold', value: 1.5, permanent: true },
        { type: 'resourceGainMultiplier', target: 'stone', value: 1.35, permanent: true },
        { type: 'resourceGainMultiplier', target: 'gold', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    diplomaticRelations: {
      name: 'Diplomatic Relations',
      icon: 'ic-castle',
      desc: '+0.3 Prestige/s, +1 all resources/s, +25% Prestige production and +15% all resource production per level.',
      costCurve: (lvl: number) => 14 * Math.pow(1.72, lvl),
      max: 18,
      rewards: [
        { type: 'resourceGain', target: 'prestige', value: 0.3, permanent: true },
        { type: 'resourceGain', target: 'all', value: 1, permanent: true },
        { type: 'resourceGainMultiplier', target: 'prestige', value: 1.25, permanent: true },
        { type: 'resourceGainMultiplier', target: 'all', value: 1.15, permanent: true }
      ] as PrestigeReward[],
    },
    technologicalAdvancement: {
      name: 'Technological Advancement',
      icon: 'ic-research',
      desc: '+0.5 Research/s, +60% Research Points production and -3% all costs per level.',
      costCurve: (lvl: number) => 16 * Math.pow(1.8, lvl),
      max: 15,
      rewards: [
        { type: 'resourceGain', target: 'researchPoints', value: 0.5, permanent: true },
        { type: 'resourceGainMultiplier', target: 'researchPoints', value: 1.6, permanent: true },
        { type: 'buildingCostReduction', target: 'all', value: 0.03, permanent: true }
      ] as PrestigeReward[],
    },
    economicStimulation: {
      name: 'Economic Stimulation',
      icon: 'ic-gold',
      desc: '+2 Gold/s, +1 all resources/s, +30% Gold production and +20% all resource production per level.',
      costCurve: (lvl: number) => 11 * Math.pow(1.7, lvl),
      max: 20,
      rewards: [
        { type: 'resourceGain', target: 'gold', value: 2, permanent: true },
        { type: 'resourceGain', target: 'all', value: 1, permanent: true },
        { type: 'resourceGainMultiplier', target: 'gold', value: 1.3, permanent: true },
        { type: 'resourceGainMultiplier', target: 'all', value: 1.2, permanent: true }
      ] as PrestigeReward[],
    },
    culturalHeritage: {
      name: 'Cultural Heritage',
      icon: 'ic-castle',
      desc: '+0.4 Prestige/s, +35% Prestige production and +25% click gains per level.',
      costCurve: (lvl: number) => 13 * Math.pow(1.75, lvl),
      max: 18,
      rewards: [
        { type: 'resourceGain', target: 'prestige', value: 0.4, permanent: true },
        { type: 'resourceGainMultiplier', target: 'prestige', value: 1.35, permanent: true },
        { type: 'clickMultiplier', target: 'all', value: 1.25, permanent: true }
      ] as PrestigeReward[],
    },
    strategicPlanning: {
      name: 'Strategic Planning',
      icon: 'ic-castle',
      desc: '+2 all resources/s, +20% all resource production and -4% all costs per level.',
      costCurve: (lvl: number) => 18 * Math.pow(1.8, lvl),
      max: 12,
      rewards: [
        { type: 'resourceGain', target: 'all', value: 2, permanent: true },
        { type: 'resourceGainMultiplier', target: 'all', value: 1.2, permanent: true },
        { type: 'buildingCostReduction', target: 'all', value: 0.04, permanent: true }
      ] as PrestigeReward[],
    },
  } as Record<PrestigeUpgradeKey, PrestigeUpgradeDef>,
};
