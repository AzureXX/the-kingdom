// Prestige-related type definitions

import type { ResourceKey } from '@/lib/game/types';

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

/**
 * Types of prestige rewards (similar to achievement rewards but separate)
 */
export type PrestigeRewardType = 
  | 'resourceGain'           // Direct resource production gain (e.g., +2 wood/s)
  | 'resourceGainMultiplier' // Resource production multiplier (e.g., 1.2x wood/s)
  | 'buildingGain'           // Building-specific production gain (e.g., +2 wood/s from woodcutters)
  | 'buildingGainMultiplier' // Building-specific production multiplier (e.g., 1.3x woodcutter production)
  | 'clickGain'              // Click action gain (e.g., +1 wood per click)
  | 'clickMultiplier'        // Click action multiplier (e.g., 1.2x click gains)
  | 'actionClickGain'        // Action-specific click gain (e.g., +2 wood from gatherWood action)
  | 'actionClickMultiplier'  // Action-specific click multiplier (e.g., 1.5x gatherWood gains)
  | 'loopGain'               // Loop action gain (e.g., +1 wood per loop)
  | 'loopMultiplier'         // Loop action multiplier (e.g., 1.2x loop gains)
  | 'actionLoopGain'         // Action-specific loop gain (e.g., +3 wood from woodcutting loop)
  | 'actionLoopMultiplier'   // Action-specific loop multiplier (e.g., 1.4x woodcutting loop gains)
  | 'buildingCostReduction'; // Building cost reduction (e.g., -5% costs)

/**
 * Prestige reward definition (similar to achievement rewards but separate)
 */
export interface PrestigeReward {
  /** Type of reward */
  type: PrestigeRewardType;
  /** Target resource/multiplier/etc. */
  target: string;
  /** Resource key (for building-specific rewards) */
  resource?: ResourceKey;
  /** Reward value */
  value: number;
  /** Whether reward persists through prestige */
  permanent: boolean;
}

/**
 * Prestige bonuses (separate from achievement bonuses)
 */
export type PrestigeBonuses = {
  /** Direct resource production bonuses (e.g., +2 wood/s) */
  resourceGain: Partial<Record<ResourceKey, number>>;
  /** Resource production multipliers (e.g., 1.2x wood/s) */
  resourceGainMultiplier: Partial<Record<ResourceKey, number>>;
  /** Building-specific production bonuses (e.g., +2 wood/s from woodcutters) */
  buildingGain: Partial<Record<string, Partial<Record<ResourceKey, number>>>>;
  /** Building-specific production multipliers (e.g., 1.3x woodcutter production) */
  buildingGainMultiplier: Partial<Record<string, Partial<Record<ResourceKey, number>>>>;
  /** Click action bonuses (e.g., +1 wood per click) */
  clickGain: Partial<Record<ResourceKey, number>>;
  /** Click action multipliers (e.g., 1.2x click gains) */
  clickMultiplier: Partial<Record<ResourceKey, number>>;
  /** Action-specific click bonuses (e.g., +2 wood from gatherWood action) */
  actionClickGain: Partial<Record<string, Partial<Record<ResourceKey, number>>>>;
  /** Action-specific click multipliers (e.g., 1.5x gatherWood gains) */
  actionClickMultiplier: Partial<Record<string, Partial<Record<ResourceKey, number>>>>;
  /** Loop action bonuses (e.g., +1 wood per loop) */
  loopGain: Partial<Record<ResourceKey, number>>;
  /** Loop action multipliers (e.g., 1.2x loop gains) */
  loopMultiplier: Partial<Record<ResourceKey, number>>;
  /** Action-specific loop bonuses (e.g., +3 wood from woodcutting loop) */
  actionLoopGain: Partial<Record<string, Partial<Record<ResourceKey, number>>>>;
  /** Action-specific loop multipliers (e.g., 1.4x woodcutting loop gains) */
  actionLoopMultiplier: Partial<Record<string, Partial<Record<ResourceKey, number>>>>;
  /** Building cost reduction per building type (e.g., -5% quarry costs) */
  buildingCostReduction: Partial<Record<string, number>>;
};

export interface PrestigeUpgradeDef {
  name: string;
  icon: string;
  desc: string;
  costCurve: (level: number) => number;
  max: number;
  // Rewards that get applied per level (using prestige reward system)
  rewards: PrestigeReward[];
}
