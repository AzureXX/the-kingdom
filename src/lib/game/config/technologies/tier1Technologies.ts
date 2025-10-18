import type { TechnologyKey, TechnologyDef } from '@/lib/game/types';

export const TIER1_TECHNOLOGIES: Record<TechnologyKey, TechnologyDef> = {
  basicAgriculture: {
    name: 'Basic Agriculture',
    icon: 'ic-agriculture',
    desc: 'Learn to cultivate plants for food.',
    baseCost: { knowledge: 150 },
    costScale: 1.0,
    researchTime: 3,
    unlocksBuildings: [],
  },
  
  basicConstruction: {
    name: 'Basic Construction',
    icon: 'ic-construction',
    desc: 'Learn to build more advanced structures.',
    baseCost: { knowledge: 300 },
    costScale: 1.0,
    researchTime: 4,
    unlocksBuildings: [],
  },
  
  toolMaking: {
    name: 'Tool Making',
    icon: 'ic-tools',
    desc: 'Learn to create better tools for efficiency.',
    baseCost: { knowledge: 200, tools: 10 },
    costScale: 1.0,
    researchTime: 2,
  },
  
  waterManagement: {
    name: 'Water Management',
    icon: 'ic-water',
    desc: 'Learn to manage water resources effectively.',
    baseCost: { knowledge: 180, water: 15 },
    costScale: 1.0,
    researchTime: 3,
  },
  
  clayProcessing: {
    name: 'Clay Processing',
    icon: 'ic-clay',
    desc: 'Learn to work with clay for pottery.',
    baseCost: { knowledge: 250, clay: 20 },
    costScale: 1.0,
    researchTime: 4,
  },
  
  fiberWeaving: {
    name: 'Fiber Weaving',
    icon: 'ic-fiber',
    desc: 'Learn to weave fibers into useful materials.',
    baseCost: { knowledge: 220, fiber: 25 },
    costScale: 1.0,
    researchTime: 3,
  },
  
  primitiveMedicine: {
    name: 'Primitive Medicine',
    icon: 'ic-medicine',
    desc: 'Learn basic healing and health practices.',
    baseCost: { knowledge: 400, food: 30, water: 20 },
    costScale: 1.0,
    researchTime: 5,
  },
  
  basicStorage: {
    name: 'Basic Storage',
    icon: 'ic-storage',
    desc: 'Learn to store resources efficiently.',
    baseCost: { knowledge: 350, wood: 40, stone: 20 },
    costScale: 1.0,
    researchTime: 4,
  }
};
