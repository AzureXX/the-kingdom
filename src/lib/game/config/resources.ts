import type { ResourceKey, ResourceDef } from '@/lib/game/types';

export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  // Starting Resources
  wood: { name: 'Wood', icon: 'ic-wood', decimals: 2, start: 0 },
  stone: { name: 'Stone', icon: 'ic-stone', decimals: 2, start: 0 },
  food: { name: 'Food', icon: 'ic-food', decimals: 2, start: 0 },
  
  // Tier 1
  water: { name: 'Water', icon: 'ic-water', decimals: 2, start: 0, hidden: true },
  clay: { name: 'Clay', icon: 'ic-clay', decimals: 2, start: 0, hidden: true },
  fiber: { name: 'Fiber', icon: 'ic-fiber', decimals: 2, start: 0, hidden: true },
  tools: { name: 'Tools', icon: 'ic-tools', decimals: 2, start: 0, hidden: true },
  knowledge: { name: 'Knowledge', icon: 'ic-knowledge', decimals: 2, start: 0, hidden: true },
  
  // Prestige
  prestige: { name: 'Prestige', icon: 'ic-prestige', decimals: 2, start: 0, hidden: true },
};


