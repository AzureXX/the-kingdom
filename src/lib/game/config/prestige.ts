import type { ResourceKey, PrestigeUpgradeKey, PrestigeUpgradeDef } from '../types';

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
        prodMul: Record<ResourceKey, number>;
        useMul: Record<ResourceKey, number>;
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
        prodMul: Record<ResourceKey, number>;
        useMul: Record<ResourceKey, number>;
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
        prodMul: Record<ResourceKey, number>;
        useMul: Record<ResourceKey, number>;
      }) => {
        ctx.prodMul.food *= Math.pow(1.2, lvl);
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
        prodMul: Record<ResourceKey, number>;
        useMul: Record<ResourceKey, number>;
      }) => {
        ctx.prodMul.prestige *= Math.pow(1.2, lvl);
      },
    },
  } as Record<PrestigeUpgradeKey, PrestigeUpgradeDef>,
};
