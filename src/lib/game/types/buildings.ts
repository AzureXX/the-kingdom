// Building-related type definitions

import type { ResourceCost, ResourceProduction, ResourceConsumption } from './resources';
import type { TechnologyKey } from './technologies';

export type BuildingKey = 'woodcutter' | 'quarry' | 'farm' | 'blacksmith' | 'castle' | 'library' | 'university' | 'laboratory';

export type BuildingDef = {
  name: string;
  icon: string;
  desc: string;
  baseCost: ResourceCost;
  costScale: number;
  baseProd: ResourceProduction;
  baseUse: ResourceConsumption;
  requiresTech?: TechnologyKey[];
};
