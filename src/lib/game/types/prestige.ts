// Prestige-related type definitions

import type { ResourceKey } from './resources';

export type PrestigeUpgradeKey =
  | 'royalDecrees'
  | 'masterCraftsmen'
  | 'fertileLands'
  | 'militaryMight';

export type PrestigeUpgradeDef = {
  name: string;
  icon: string;
  desc: string;
  costCurve: (level: number) => number;
  max: number;
  // Effect mutates multipliers in-place
  effect: (
    level: number,
    ctx: {
      muls: { clickGain: number; cost: number };
      prodMul: Partial<Record<ResourceKey, number>>;
      useMul: Partial<Record<ResourceKey, number>>;
    }
  ) => void;
};
