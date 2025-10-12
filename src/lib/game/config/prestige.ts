import type { ResourceKey, PrestigeUpgradeKey, PrestigeUpgradeDef } from '@/lib/game/types';

export const PRESTIGE_CONFIG = {
  gainFrom: 'food' as ResourceKey,
  upgrades: {
    royalDecrees: {
      name: 'Royal Decrees',
      icon: 'ic-gold',
      desc: '+25% click gains per level.',
      costCurve: (lvl: number) => 5 * Math.pow(1.6, lvl),
      max: 20,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.muls.clickGain *= 1 + 0.25 * lvl;
      },
    },
    masterCraftsmen: {
      name: 'Master Craftsmen',
      icon: 'ic-blacksmith',
      desc: '-3% building costs per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.7, lvl),
      max: 25,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.muls.cost *= Math.pow(0.97, lvl);
      },
    },
    fertileLands: {
      name: 'Fertile Lands',
      icon: 'ic-farm',
      desc: '+20% Food production per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.65, lvl),
      max: 25,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.food = (ctx.prodMul.food || 1) * Math.pow(1.2, lvl);
      },
    },
    militaryMight: {
      name: 'Military Might',
      icon: 'ic-castle',
      desc: '+20% Prestige production per level.',
      costCurve: (lvl: number) => 10 * Math.pow(1.7, lvl),
      max: 20,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.prestige = (ctx.prodMul.prestige || 1) * Math.pow(1.2, lvl);
      },
    },
    goldenTouch: {
      name: 'Golden Touch',
      icon: 'ic-gold',
      desc: '+30% Gold production per level.',
      costCurve: (lvl: number) => 7 * Math.pow(1.55, lvl),
      max: 30,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.gold = (ctx.prodMul.gold || 1) * Math.pow(1.3, lvl);
      },
    },
    forestMastery: {
      name: 'Forest Mastery',
      icon: 'ic-wood',
      desc: '+25% Wood production per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.6, lvl),
      max: 30,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.wood = (ctx.prodMul.wood || 1) * Math.pow(1.25, lvl);
      },
    },
    stoneQuarry: {
      name: 'Stone Quarry',
      icon: 'ic-stone',
      desc: '+25% Stone production per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.6, lvl),
      max: 30,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.stone = (ctx.prodMul.stone || 1) * Math.pow(1.25, lvl);
      },
    },
    researchAcceleration: {
      name: 'Research Acceleration',
      icon: 'ic-research',
      desc: '+35% Research Points production per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.65, lvl),
      max: 25,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.researchPoints = (ctx.prodMul.researchPoints || 1) * Math.pow(1.35, lvl);
      },
    },
    efficientBuilders: {
      name: 'Efficient Builders',
      icon: 'ic-blacksmith',
      desc: '-2% all building costs per level.',
      costCurve: (lvl: number) => 9 * Math.pow(1.68, lvl),
      max: 35,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.muls.cost *= Math.pow(0.98, lvl);
      },
    },
    merchantGuilds: {
      name: 'Merchant Guilds',
      icon: 'ic-gold',
      desc: '+15% all resource production per level.',
      costCurve: (lvl: number) => 12 * Math.pow(1.7, lvl),
      max: 20,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
        for (const key of resourceKeys) {
          ctx.prodMul[key] = (ctx.prodMul[key] || 1) * Math.pow(1.15, lvl);
        }
      },
    },
    royalTreasury: {
      name: 'Royal Treasury',
      icon: 'ic-gold',
      desc: '+40% Gold click gains per level.',
      costCurve: (lvl: number) => 6 * Math.pow(1.62, lvl),
      max: 25,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.muls.clickGain *= 1 + 0.4 * lvl;
      },
    },
    militaryEngineers: {
      name: 'Military Engineers',
      icon: 'ic-castle',
      desc: '+30% Prestige production and -5% building costs per level.',
      costCurve: (lvl: number) => 15 * Math.pow(1.75, lvl),
      max: 15,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.prestige = (ctx.prodMul.prestige || 1) * Math.pow(1.3, lvl);
        ctx.muls.cost *= Math.pow(0.95, lvl);
      },
    },
    scholarlyPursuits: {
      name: 'Scholarly Pursuits',
      icon: 'ic-research',
      desc: '+50% Research Points production and +20% click gains per level.',
      costCurve: (lvl: number) => 10 * Math.pow(1.7, lvl),
      max: 20,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.researchPoints = (ctx.prodMul.researchPoints || 1) * Math.pow(1.5, lvl);
        ctx.muls.clickGain *= 1 + 0.2 * lvl;
      },
    },
    agriculturalRevolution: {
      name: 'Agricultural Revolution',
      icon: 'ic-farm',
      desc: '+40% Food production and +20% Wood production per level.',
      costCurve: (lvl: number) => 8 * Math.pow(1.65, lvl),
      max: 25,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.food = (ctx.prodMul.food || 1) * Math.pow(1.4, lvl);
        ctx.prodMul.wood = (ctx.prodMul.wood || 1) * Math.pow(1.2, lvl);
      },
    },
    miningInnovation: {
      name: 'Mining Innovation',
      icon: 'ic-stone',
      desc: '+35% Stone production and +25% Gold production per level.',
      costCurve: (lvl: number) => 9 * Math.pow(1.68, lvl),
      max: 25,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.stone = (ctx.prodMul.stone || 1) * Math.pow(1.35, lvl);
        ctx.prodMul.gold = (ctx.prodMul.gold || 1) * Math.pow(1.25, lvl);
      },
    },
    diplomaticRelations: {
      name: 'Diplomatic Relations',
      icon: 'ic-castle',
      desc: '+25% Prestige production and +15% all resource production per level.',
      costCurve: (lvl: number) => 14 * Math.pow(1.72, lvl),
      max: 18,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.prestige = (ctx.prodMul.prestige || 1) * Math.pow(1.25, lvl);
        const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'researchPoints'];
        for (const key of resourceKeys) {
          ctx.prodMul[key] = (ctx.prodMul[key] || 1) * Math.pow(1.15, lvl);
        }
      },
    },
    technologicalAdvancement: {
      name: 'Technological Advancement',
      icon: 'ic-research',
      desc: '+60% Research Points production and -3% all costs per level.',
      costCurve: (lvl: number) => 16 * Math.pow(1.8, lvl),
      max: 15,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.researchPoints = (ctx.prodMul.researchPoints || 1) * Math.pow(1.6, lvl);
        ctx.muls.cost *= Math.pow(0.97, lvl);
      },
    },
    economicStimulation: {
      name: 'Economic Stimulation',
      icon: 'ic-gold',
      desc: '+30% Gold production and +20% all resource production per level.',
      costCurve: (lvl: number) => 11 * Math.pow(1.7, lvl),
      max: 20,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.gold = (ctx.prodMul.gold || 1) * Math.pow(1.3, lvl);
        const resourceKeys: ResourceKey[] = ['wood', 'stone', 'food', 'prestige', 'researchPoints'];
        for (const key of resourceKeys) {
          ctx.prodMul[key] = (ctx.prodMul[key] || 1) * Math.pow(1.2, lvl);
        }
      },
    },
    culturalHeritage: {
      name: 'Cultural Heritage',
      icon: 'ic-castle',
      desc: '+35% Prestige production and +25% click gains per level.',
      costCurve: (lvl: number) => 13 * Math.pow(1.75, lvl),
      max: 18,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        ctx.prodMul.prestige = (ctx.prodMul.prestige || 1) * Math.pow(1.35, lvl);
        ctx.muls.clickGain *= 1 + 0.25 * lvl;
      },
    },
    strategicPlanning: {
      name: 'Strategic Planning',
      icon: 'ic-castle',
      desc: '+20% all resource production and -4% all costs per level.',
      costCurve: (lvl: number) => 18 * Math.pow(1.8, lvl),
      max: 12,
      effect: (lvl: number, ctx: {
        muls: { clickGain: number; cost: number };
        prodMul: Partial<Record<ResourceKey, number>>;
        useMul: Partial<Record<ResourceKey, number>>;
      }) => {
        const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
        for (const key of resourceKeys) {
          ctx.prodMul[key] = (ctx.prodMul[key] || 1) * Math.pow(1.2, lvl);
        }
        ctx.muls.cost *= Math.pow(0.96, lvl);
      },
    },
  } as Record<PrestigeUpgradeKey, PrestigeUpgradeDef>,
};
