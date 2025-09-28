// Action system type definitions

import type { ResourceKey, BuildingKey, TechnologyKey, PrestigeUpgradeKey, ResourceCost, ResourceProduction } from '@/lib/game/types';

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
 * Definition of a game action that players can execute.
 * Actions provide the primary interactive gameplay beyond passive resource generation.
 */
export interface ActionDef {
  /** Human-readable name of the action */
  name: string;
  
  /** Visual icon (emoji) representing the action */
  icon: string;
  
  /** Detailed description of what the action does */
  description: string;
  
  /** Resources required to execute this action (optional) */
  cost?: ResourceCost;
  
  /** Resources gained when executing this action */
  gains: ResourceProduction;
  
  /** Conditions that must be met before this action becomes available */
  unlockConditions: ActionUnlockCondition[];
  
  /** Cooldown time in milliseconds before action can be used again (optional) */
  cooldown?: number;
  
  /** Whether this action becomes permanently unlocked after first use */
  oneTimeUnlock: boolean;
}

/**
 * Action availability status
 */
export interface ActionStatus {
  canExecute: boolean;
  reason?: string;
  cost: ResourceCost;
  gains: ResourceProduction;
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

// Type guard functions for unlock conditions
export const isTechnologyUnlock = (condition: ActionUnlockCondition): condition is TechnologyUnlockCondition => 
  condition.type === 'technology';

export const isBuildingUnlock = (condition: ActionUnlockCondition): condition is BuildingUnlockCondition => 
  condition.type === 'building';

export const isResourceUnlock = (condition: ActionUnlockCondition): condition is ResourceUnlockCondition => 
  condition.type === 'resource';

export const isPrestigeUnlock = (condition: ActionUnlockCondition): condition is PrestigeUnlockCondition => 
  condition.type === 'prestige';
