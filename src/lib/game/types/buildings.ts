// Building-related type definitions

import type { ResourceKey } from './resources';
import type { TechnologyKey } from './technologies';

export type BuildingKey = 'woodcutter' | 'quarry' | 'farm' | 'blacksmith' | 'castle' | 'library' | 'university' | 'laboratory';

export type BuildingDef = {
  name: string;
  icon: string;
  desc: string;
  baseCost: Partial<Record<ResourceKey, number>>;
  costScale: number;
  baseProd: Partial<Record<ResourceKey, number>>;
  baseUse: Partial<Record<ResourceKey, number>>;
  requiresTech?: TechnologyKey[];
};
