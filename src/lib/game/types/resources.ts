// Resource-related type definitions

export type ResourceKey = 'gold' | 'wood' | 'stone' | 'food' | 'prestige' | 'researchPoints';

export type ResourceDef = {
  name: string;
  icon: string;
  decimals: number;
  start: number;
  hidden?: boolean; // Whether to hide this resource until first earned
};

// More specific types for resource-related operations
export type ResourceCost = Partial<Record<ResourceKey, number>>;
export type ResourceProduction = Partial<Record<ResourceKey, number>>;
export type ResourceConsumption = Partial<Record<ResourceKey, number>>;
export type ResourceAmount = Record<ResourceKey, number>;

// Generic resource operation type
export type ResourceOperation<T extends 'cost' | 'gain' | 'requirement'> = 
  T extends 'cost' ? ResourceCost :
  T extends 'gain' ? ResourceProduction :
  T extends 'requirement' ? Record<ResourceKey, number> : never;
