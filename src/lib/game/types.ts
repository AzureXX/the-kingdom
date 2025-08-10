import type { BuildingKey, PrestigeUpgradeKey, ResourceKey } from './config';

export type GameState = {
  t: number;
  resources: Partial<Record<ResourceKey, number>>;
  lifetime: { food: number };
  buildings: Record<BuildingKey, number>;
  upgrades: Record<PrestigeUpgradeKey, number>;
  clicks: number;
  version: number;
};

export type Multipliers = {
  clickGain: number;
  cost: number;
  prodMul: Record<ResourceKey, number>;
  useMul: Record<ResourceKey, number>;
};
