// Building-related type definitions

import type { ResourceCost, ResourceProduction, ResourceConsumption } from '@/lib/game/types/resources';
import type { ActionUnlockCondition } from '@/lib/game/types/actions';

export type BuildingKey = 'woodcutter' | 'quarry' | 'farm' | 'blacksmith' | 'castle' | 'library' | 'university' | 'laboratory' | 'taxOffice';

export interface BuildingDef {
  name: string;
  icon: string;
  desc: string;
  baseCost: ResourceCost;
  costScale: number;
  baseProd: ResourceProduction;
  baseUse: ResourceConsumption;
  unlockConditions?: ActionUnlockCondition[];
}
