import type { ResourceKey, ResourceDef } from '@/lib/game/types';

export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  gold: { name: 'Gold', icon: 'ic-gold', decimals: 3, start: 10 },
  wood: { name: 'Wood', icon: 'ic-wood', decimals: 3, start: 0 },
  stone: { name: 'Stone', icon: 'ic-stone', decimals: 3, start: 0 },
  food: { name: 'Food', icon: 'ic-food', decimals: 3, start: 0 },
  prestige: { name: 'Prestige', icon: 'ic-prestige', decimals: 3, start: 0, hidden: true },
  researchPoints: { name: 'Research Points', icon: 'ic-research', decimals: 3, start: 0, hidden: true },
};


