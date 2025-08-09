export type ResourceKey = 'money' | 'food' | 'energy' | 'science' | 'influence';

export type ResourceDef = {
  name: string;
  icon: string;
  decimals: number;
  start: number;
};

export type BuildingKey = 'farm' | 'plant' | 'lab' | 'factory';

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
  | 'clickBoost'
  | 'cheapConstruction'
  | 'greenTransition'
  | 'technocracy';

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
};

export const CONFIG: GameConfig = {
  tickRate: 10,
  version: 1,
  resources: {
    money: { name: 'Money', icon: 'ic-money', decimals: 0, start: 10 },
    food: { name: 'Food', icon: 'ic-food', decimals: 0, start: 0 },
    energy: { name: 'Energy', icon: 'ic-energy', decimals: 0, start: 0 },
    science: { name: 'Science', icon: 'ic-science', decimals: 2, start: 0 },
    influence: { name: 'Influence', icon: 'ic-influence', decimals: 0, start: 0 },
  },
  click: {
    base: { money: 1, science: 0.2 },
  },
  buildings: {
    farm: {
      name: 'Farm',
      icon: 'ic-farm',
      desc: 'Produces Food each second.',
      baseCost: { money: 10 },
      costScale: 1.15,
      baseProd: { food: 1 },
      baseUse: {},
    },
    plant: {
      name: 'Power Plant',
      icon: 'ic-plant',
      desc: 'Generates Energy. Has upkeep in Money.',
      baseCost: { money: 25 },
      costScale: 1.18,
      baseProd: { energy: 1.5 },
      baseUse: { money: 0.2 },
    },
    lab: {
      name: 'Research Lab',
      icon: 'ic-lab',
      desc: 'Turns Energy into Science.',
      baseCost: { money: 40, energy: 10 },
      costScale: 1.2,
      baseProd: { science: 0.8 },
      baseUse: { energy: 0.8 },
    },
    factory: {
      name: 'Factory',
      icon: 'ic-factory',
      desc: 'Converts Food & Energy into Money.',
      baseCost: { money: 60, energy: 10, food: 10 },
      costScale: 1.22,
      baseProd: { money: 3 },
      baseUse: { energy: 1, food: 0.5 },
    },
  },
  prestige: {
    gainFrom: 'science',
    divisor: 1000,
    upgrades: {
      clickBoost: {
        name: 'Aid Packages',
        icon: 'ic-money',
        desc: '+25% click gains per level.',
        costCurve: (lvl) => 5 * Math.pow(1.6, lvl),
        max: 20,
        effect: (lvl, ctx) => {
          ctx.muls.clickGain *= 1 + 0.25 * lvl;
        },
      },
      cheapConstruction: {
        name: 'Efficient Bureaucracy',
        icon: 'ic-factory',
        desc: '-3% building costs per level.',
        costCurve: (lvl) => 8 * Math.pow(1.7, lvl),
        max: 25,
        effect: (lvl, ctx) => {
          ctx.muls.cost *= Math.pow(0.97, lvl);
        },
      },
      greenTransition: {
        name: 'Green Transition',
        icon: 'ic-plant',
        desc: '+20% Energy production per level.',
        costCurve: (lvl) => 6 * Math.pow(1.65, lvl),
        max: 25,
        effect: (lvl, ctx) => {
          ctx.prodMul.energy *= Math.pow(1.2, lvl);
        },
      },
      technocracy: {
        name: 'Technocracy',
        icon: 'ic-lab',
        desc: '+20% Science production per level.',
        costCurve: (lvl) => 10 * Math.pow(1.7, lvl),
        max: 20,
        effect: (lvl, ctx) => {
          ctx.prodMul.science *= Math.pow(1.2, lvl);
        },
      },
    },
  },
};

export const SAVE_KEY = 'country-clicker-v1';
