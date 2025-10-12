// Prestige-related type definitions

import type { ResourceKey } from '@/lib/game/types/resources';

export type PrestigeUpgradeKey =
  | 'royalDecrees'
  | 'masterCraftsmen'
  | 'fertileLands'
  | 'militaryMight'
  | 'goldenTouch'
  | 'forestMastery'
  | 'stoneQuarry'
  | 'researchAcceleration'
  | 'efficientBuilders'
  | 'merchantGuilds'
  | 'royalTreasury'
  | 'militaryEngineers'
  | 'scholarlyPursuits'
  | 'agriculturalRevolution'
  | 'miningInnovation'
  | 'diplomaticRelations'
  | 'technologicalAdvancement'
  | 'economicStimulation'
  | 'culturalHeritage'
  | 'strategicPlanning';

export interface PrestigeUpgradeDef {
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
}
