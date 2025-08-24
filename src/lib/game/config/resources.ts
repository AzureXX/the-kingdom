import type { ResourceKey, ResourceDef } from '../types';

export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  gold: { name: 'Gold', icon: 'ic-gold', decimals: 0, start: 10 },
  wood: { name: 'Wood', icon: 'ic-wood', decimals: 0, start: 0 },
  stone: { name: 'Stone', icon: 'ic-stone', decimals: 0, start: 0 },
  food: { name: 'Food', icon: 'ic-food', decimals: 0, start: 0 },
  prestige: { name: 'Prestige', icon: 'ic-prestige', decimals: 0, start: 0, hidden: true },
  researchPoints: { name: 'Research Points', icon: 'ic-research', decimals: 0, start: 0, hidden: true },
};

export const CLICK_CONFIG = {
  base: { gold: 1, food: 0.1 },
};
