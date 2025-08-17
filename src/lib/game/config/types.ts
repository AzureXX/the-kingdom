import type { ResourceKey } from './resources';

export type BuildingKey = 'woodcutter' | 'quarry' | 'farm' | 'blacksmith' | 'castle' | 'library' | 'university' | 'laboratory';

export type TechnologyKey = 'writing' | 'mathematics' | 'engineering' | 'chemistry' | 'physics' | 'biology';

export type BuildingDef = {
  name: string;
  icon: string;
  desc: string;
  baseCost: Partial<Record<ResourceKey, number>>;
  costScale: number;
  baseProd: Partial<Record<ResourceKey, number>>;
  baseUse: Partial<Record<ResourceKey, number>>;
  requiresTech?: TechnologyKey | TechnologyKey[]; // Technology(s) required to unlock this building
};

export type TechnologyDef = {
  name: string;
  icon: string;
  desc: string;
  baseCost: Partial<Record<ResourceKey, number>>;
  costScale: number;
  researchTime: number; // seconds to research
  requiresTech?: TechnologyKey | TechnologyKey[]; // Technology(s) required to research this
  unlocksBuildings?: BuildingKey[]; // Buildings unlocked by this technology
  effect?: (state: { resources: Partial<Record<ResourceKey, number>>; buildings: Record<BuildingKey, number>; technologies: Record<TechnologyKey, number> }) => void; // Custom effect when researched
};
