// Action system type definitions

import type { ResourceKey, BuildingKey, TechnologyKey, PrestigeUpgradeKey } from './index';

/**
 * Unique identifier for each action
 */
export type ActionKey = 
  | 'gatherWood'
  | 'gatherStone' 
  | 'huntFood'
  | 'sellWood'
  | 'sellStone'
  | 'sellFood'
  | 'craftTools'
  | 'forgeWeapons'
  | 'farmWork'
  | 'advancedMining'
  | 'scientificResearch'
  | 'royalDiplomacy';

/**
 * Technology unlock condition for an action
 */
export interface TechnologyUnlockCondition {
  type: 'technology';
  key: TechnologyKey;
  value: number;
}

/**
 * Building unlock condition for an action
 */
export interface BuildingUnlockCondition {
  type: 'building';
  key: BuildingKey;
  value: number;
}

/**
 * Resource unlock condition for an action
 */
export interface ResourceUnlockCondition {
  type: 'resource';
  key: ResourceKey;
  value: number;
}

/**
 * Prestige unlock condition for an action
 */
export interface PrestigeUnlockCondition {
  type: 'prestige';
  key: PrestigeUpgradeKey;
  value: number;
}

/**
 * Unlock condition for an action - discriminated union for better type safety
 */
export type ActionUnlockCondition = 
  | TechnologyUnlockCondition
  | BuildingUnlockCondition
  | ResourceUnlockCondition
  | PrestigeUnlockCondition;

/**
 * Definition of a game action
 */
export interface ActionDef {
  name: string;
  icon: string;
  description: string;
  cost?: Partial<Record<ResourceKey, number>>;
  gains: Partial<Record<ResourceKey, number>>;
  unlockConditions: ActionUnlockCondition[];
  cooldown?: number;
  oneTimeUnlock: boolean;
}

/**
 * Action availability status
 */
export interface ActionStatus {
  canExecute: boolean;
  reason?: string;
  cost: Partial<Record<ResourceKey, number>>;
  gains: Partial<Record<ResourceKey, number>>;
  cooldownRemaining?: number;
  isUnlocked: boolean;
}

/**
 * Action unlock tracking in game state
 */
export type ActionUnlocks = {
  [key in ActionKey]?: {
    unlocked: boolean;
    unlockedAt: number;
    lastUsed: number;
  };
};

/**
 * Action cooldown tracking in game state
 */
export type ActionCooldowns = {
  [key in ActionKey]?: number;
};
