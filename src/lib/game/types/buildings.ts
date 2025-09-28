// Building-related type definitions

import type { ResourceCost, ResourceProduction, ResourceConsumption } from '@/lib/game/types/resources';
import type { TechnologyKey } from '@/lib/game/types/technologies';

export type BuildingKey = 'woodcutter' | 'quarry' | 'farm' | 'blacksmith' | 'castle' | 'library' | 'university' | 'laboratory';

export interface BuildingDef {
  name: string;
  icon: string;
  desc: string;
  baseCost: ResourceCost;
  costScale: number;
  baseProd: ResourceProduction;
  baseUse: ResourceConsumption;
  requiresTech?: TechnologyKey[];
}
