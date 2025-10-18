import type { BuildingKey, BuildingDef } from '@/lib/game/types';

export const BUILDINGS: Record<BuildingKey, BuildingDef> = {
  primitiveHut: {
    name: 'Primitive Hut',
    icon: 'ic-hut',
    desc: 'Basic shelter that unlocks the Rest action.',
    baseCost: { wood: 25, stone: 15, food: 5 },
    costScale: 1.15,
    baseProd: { food: 0.5 },
    baseUse: {},
    maxLimit: 5,
  },
  
  toolWorkshop: {
    name: 'Tool Workshop',
    icon: 'ic-workshop',
    desc: 'Workshop for crafting tools. Provides 2.5x gathering efficiency.',
    baseCost: { wood: 60, stone: 40, tools: 8 },
    costScale: 1.18,
    baseProd: { tools: 0.3 },
    baseUse: { wood: 0.2, stone: 0.1 },
    maxLimit: 3,
  },
  
  studyCorner: {
    name: 'Study Corner',
    icon: 'ic-study',
    desc: 'A quiet place for learning and research.',
    baseCost: { wood: 40, stone: 25, knowledge: 15 },
    costScale: 1.16,
    baseProd: { knowledge: 0.2 },
    baseUse: { food: 0.1 },
    maxLimit: 2,
  },
  
  waterWell: {
    name: 'Water Well',
    icon: 'ic-well',
    desc: 'Provides a steady supply of water.',
    baseCost: { wood: 30, stone: 20, water: 10 },
    costScale: 1.14,
    baseProd: { water: 1.0 },
    baseUse: {},
    maxLimit: 4,
  },
  
  clayPit: {
    name: 'Clay Pit',
    icon: 'ic-pit',
    desc: 'Extracts clay from the ground.',
    baseCost: { wood: 20, stone: 15, clay: 5 },
    costScale: 1.12,
    baseProd: { clay: 0.8 },
    baseUse: {},
    maxLimit: 3,
  },
  
  fiberGarden: {
    name: 'Fiber Garden',
    icon: 'ic-garden',
    desc: 'Cultivates plant fibers for rope making.',
    baseCost: { wood: 25, stone: 10, fiber: 8 },
    costScale: 1.13,
    baseProd: { fiber: 0.6 },
    baseUse: { water: 0.1 },
    maxLimit: 3,
  }
};
