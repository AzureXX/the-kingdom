export type ResourceKey = 'gold' | 'wood' | 'stone' | 'food' | 'prestige';

export type ResourceDef = {
  name: string;
  icon: string;
  decimals: number;
  start: number;
};

export type BuildingKey = 'woodcutter' | 'quarry' | 'farm' | 'blacksmith' | 'castle';

export type BuildingDef = {
  name: string;
  icon: string;
  desc: string;
  baseCost: Partial<Record<ResourceKey, number>>;
  costScale: number;
  baseProd: Partial<Record<ResourceKey, number>>;
  baseUse: Partial<Record<ResourceKey, number>>;
};

export type PrestigeUpgradeKey =
  | 'royalDecrees'
  | 'masterCraftsmen'
  | 'fertileLands'
  | 'militaryMight';

export type PrestigeUpgradeDef = {
  name: string;
  icon: string;
  desc: string;
  costCurve: (level: number) => number;
  max: number;
  // Effect mutates multipliers in-place
  effect: (
    level: number,
    ctx: {
      muls: { clickGain: number; cost: number };
      prodMul: Record<ResourceKey, number>;
      useMul: Record<ResourceKey, number>;
    }
  ) => void;
};

export type EventKey = 
  | 'merchantVisit'
  | 'banditRaid'
  | 'bountifulHarvest'
  | 'drought'
  | 'royalTax'
  | 'mysteriousStranger'
  | 'plague'
  | 'festival';

export type EventChoice = {
  text: string;
  gives: Partial<Record<ResourceKey, number>>;
  takes: Partial<Record<ResourceKey, number>>;
  requires: Partial<Record<ResourceKey, number>>;
};

export type EventDef = {
  name: string;
  icon: string;
  desc: string;
  choices: EventChoice[];
  defaultChoiceIndex: number; // index of choice to auto-select if player doesn't choose
  minInterval: number; // seconds
  maxInterval: number; // seconds
  weight: number; // relative chance of this event occurring
};

export type GameConfig = {
  tickRate: number;
  version: number;
  resources: Record<ResourceKey, ResourceDef>;
  click: { base: Partial<Record<ResourceKey, number>> };
  buildings: Record<BuildingKey, BuildingDef>;
  prestige: {
    gainFrom: ResourceKey;
    divisor: number;
    upgrades: Record<PrestigeUpgradeKey, PrestigeUpgradeDef>;
  };
  events: Record<EventKey, EventDef>;
};

import { GAME_CONSTANTS } from './constants';

export const CONFIG: GameConfig = {
  tickRate: GAME_CONSTANTS.TICK_RATE,
  version: 3, // Increment version for save compatibility
  resources: {
    gold: { name: 'Gold', icon: 'ic-gold', decimals: 0, start: 10 },
    wood: { name: 'Wood', icon: 'ic-wood', decimals: 0, start: 0 },
    stone: { name: 'Stone', icon: 'ic-stone', decimals: 0, start: 0 },
    food: { name: 'Food', icon: 'ic-food', decimals: 0, start: 0 },
    prestige: { name: 'Prestige', icon: 'ic-prestige', decimals: 0, start: 0 },
  },
  click: {
    base: { gold: 1, food: 0.1 },
  },
  buildings: {
    woodcutter: {
      name: 'Woodcutter\'s Hut',
      icon: 'ic-woodcutter',
      desc: 'Harvests Wood from the forest.',
      baseCost: { gold: 15 },
      costScale: 1.15,
      baseProd: { wood: 1.2 },
      baseUse: {},
    },
    quarry: {
      name: 'Quarry',
      icon: 'ic-quarry',
      desc: 'Extracts Stone from the mountains.',
      baseCost: { gold: 30, wood: 5 },
      costScale: 1.18,
      baseProd: { stone: 0.8 },
      baseUse: {},
    },
    farm: {
      name: 'Farm',
      icon: 'ic-farm',
      desc: 'Grows Food to feed your people.',
      baseCost: { gold: 25, wood: 8 },
      costScale: 1.16,
      baseProd: { food: 1.5 },
      baseUse: {},
    },
    blacksmith: {
      name: 'Blacksmith',
      icon: 'ic-blacksmith',
      desc: 'Crafts tools and weapons for Gold.',
      baseCost: { gold: 50, wood: 15, stone: 10 },
      costScale: 1.20,
      baseProd: { gold: 2.5 },
      baseUse: { wood: 0.3, stone: 0.2 },
    },
    castle: {
      name: 'Castle',
      icon: 'ic-castle',
      desc: 'A grand fortress that generates Prestige.',
      baseCost: { gold: 200, wood: 50, stone: 100, food: 20 },
      costScale: 1.25,
      baseProd: { prestige: 0.1 },
      baseUse: { food: 0.5 },
    },
  },
  prestige: {
    gainFrom: 'food',
    divisor: GAME_CONSTANTS.PRESTIGE_DIVISOR,
    upgrades: {
      royalDecrees: {
        name: 'Royal Decrees',
        icon: 'ic-gold',
        desc: '+25% click gains per level.',
        costCurve: (lvl) => 5 * Math.pow(1.6, lvl),
        max: 20,
        effect: (lvl, ctx) => {
          ctx.muls.clickGain *= 1 + 0.25 * lvl;
        },
      },
      masterCraftsmen: {
        name: 'Master Craftsmen',
        icon: 'ic-blacksmith',
        desc: '-3% building costs per level.',
        costCurve: (lvl) => 8 * Math.pow(1.7, lvl),
        max: 25,
        effect: (lvl, ctx) => {
          ctx.muls.cost *= Math.pow(0.97, lvl);
        },
      },
      fertileLands: {
        name: 'Fertile Lands',
        icon: 'ic-farm',
        desc: '+20% Food production per level.',
        costCurve: (lvl) => 6 * Math.pow(1.65, lvl),
        max: 25,
        effect: (lvl, ctx) => {
          ctx.prodMul.food *= Math.pow(1.2, lvl);
        },
      },
      militaryMight: {
        name: 'Military Might',
        icon: 'ic-castle',
        desc: '+20% Prestige production per level.',
        costCurve: (lvl) => 10 * Math.pow(1.7, lvl),
        max: 20,
        effect: (lvl, ctx) => {
          ctx.prodMul.prestige *= Math.pow(1.2, lvl);
        },
      },
    },
  },
  events: {
    merchantVisit: {
      name: 'Merchant Visit',
      icon: 'ic-merchant',
      desc: 'A merchant offers to trade goods for Gold.',
      choices: [
        {
          text: 'Accept Trade',
          gives: { gold: 10 },
          takes: { wood: 5 },
          requires: { wood: 5 },
        },
        {
          text: 'Reject Trade',
          gives: {},
          takes: {},
          requires: {},
        },
      ],
      defaultChoiceIndex: 1, // Reject trade by default
      minInterval: 60,
      maxInterval: 180,
      weight: 0.2,
    },
    banditRaid: {
      name: 'Bandit Raid',
      icon: 'ic-bandit',
      desc: 'Bandits attack your village, stealing resources.',
      choices: [
        {
          text: 'Fight Back',
          gives: {},
          takes: { wood: 2, stone: 1 },
          requires: { },
        },
        {
          text: 'Pay Tribute',
          gives: { gold: 5 },
          takes: { food: 1 },
          requires: { food: 1 },
        },
      ],
      defaultChoiceIndex: 1, // Pay tribute by default
      minInterval: 60,
      maxInterval: 180,
      weight: 0.3,
    },
    bountifulHarvest: {
      name: 'Bountiful Harvest',
      icon: 'ic-harvest',
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
      minInterval: 60,
      maxInterval: 180,
      weight: 0.1,
    },
    drought: {
      name: 'Drought',
      icon: 'ic-drought',
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
      minInterval: 60,
      maxInterval: 180,
      weight: 0.2,
    },
    royalTax: {
      name: 'Royal Tax',
      icon: 'ic-tax',
      desc: 'The king demands a tax, reducing your resources.',
      choices: [
        {
          text: 'Pay Tax',
          gives: {},
          takes: { gold: 10 },
          requires: {},
        },
        {
          text: 'Refuse Tax',
          gives: {},
          takes: { prestige: 1 },
          requires: { },
        },
      ],
      defaultChoiceIndex: 1, // Pay tax by default
      minInterval: 60,
      maxInterval: 180,
      weight: 0.1,
    },
    mysteriousStranger: {
      name: 'Mysterious Stranger',
      icon: 'ic-stranger',
      desc: 'A mysterious stranger offers a mysterious gift.',
      choices: [
        {
          text: 'Accept Gift',
          gives: { prestige: 1 },
          takes: { gold: 10 },
          requires: {},
        },
        {
          text: 'Reject Gift',
          gives: {},
          takes: {},
          requires: {},
        },
      ],
      defaultChoiceIndex: 0, // Accept gift by default
      minInterval: 60,
      maxInterval: 180,
      weight: 0.05,
    },
    plague: {
      name: 'Plague',
      icon: 'ic-plague',
      desc: 'A deadly plague strikes your village, reducing population.',
      choices: [
        {
          text: 'Treat Plague',
          gives: {},
          takes: { prestige: 1 },
          requires: { },
        },
        {
          text: 'Let Plague Run',
          gives: {},
          takes: {},
          requires: {},
        },
      ],
      defaultChoiceIndex: 1, // Let plague run by default
      minInterval: 60,
      maxInterval: 180,
      weight: 0.15,
    },
    festival: {
      name: 'Festival',
      icon: 'ic-festival',
      desc: 'A festive event boosts resource production.',
      choices: [
        {
          text: 'Attend Festival',
          gives: { gold: 5, food: 2 },
          takes: {},
          requires: {},
        },
        {
          text: 'Ignore Festival',
          gives: {},
          takes: {},
          requires: {},
        },
      ],
      defaultChoiceIndex: 0, // Attend festival by default
      minInterval: 60,
      maxInterval: 180,
      weight: 0.1,
    },
  },
};

export const SAVE_KEY = 'medieval-kingdom-v3';
