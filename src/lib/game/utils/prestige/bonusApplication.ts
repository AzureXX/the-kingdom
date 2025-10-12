// Prestige bonus application system
// Separate from achievement system, applies prestige bonuses directly

import type { GameState, PrestigeUpgradeKey, PrestigeReward, PrestigeBonuses, ResourceKey } from '@/lib/game/types';
import { PRESTIGE_CONFIG } from '@/lib/game/config/prestige';
import { createStateErrorHandler } from '@/lib/game/utils/error';

const stateErrorHandler = createStateErrorHandler('prestigeSystem');

/**
 * Create default prestige bonuses
 */
function createDefaultPrestigeBonuses(): PrestigeBonuses {
  return {
    resourceGain: {},
    resourceGainMultiplier: {},
    buildingGain: {},
    buildingGainMultiplier: {},
    clickGain: {},
    clickMultiplier: {},
    actionClickGain: {},
    actionClickMultiplier: {},
    loopGain: {},
    loopMultiplier: {},
    actionLoopGain: {},
    actionLoopMultiplier: {},
    buildingCostReduction: {},
  };
}

/**
 * Apply all prestige bonuses to the game state
 */
export function applyPrestigeBonuses(state: GameState): GameState {
  try {
    // Calculate all prestige bonuses
    const prestigeBonuses = calculateAllPrestigeBonuses(state);
    
    // Update the state with calculated prestige bonuses
    return {
      ...state,
      prestigeBonuses
    };
  } catch (error) {
    stateErrorHandler('Failed to apply prestige bonuses', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {
      ...state,
      prestigeBonuses: createDefaultPrestigeBonuses()
    };
  }
}

/**
 * Calculate all prestige bonuses from upgrade levels
 */
function calculateAllPrestigeBonuses(state: GameState): PrestigeBonuses {
  const bonuses = createDefaultPrestigeBonuses();

  // Apply each prestige upgrade's rewards based on its level
  for (const [upgradeKey, level] of Object.entries(state.upgrades)) {
    if (level > 0) {
      applyPrestigeUpgradeBonuses(bonuses, upgradeKey as PrestigeUpgradeKey, level);
    }
  }

  return bonuses;
}

/**
 * Apply bonuses for a specific prestige upgrade at a given level
 */
function applyPrestigeUpgradeBonuses(
  bonuses: PrestigeBonuses,
  upgradeKey: PrestigeUpgradeKey,
  level: number
): void {
  try {
    const upgrade = PRESTIGE_CONFIG.upgrades[upgradeKey];
    if (!upgrade) {
      stateErrorHandler('Prestige upgrade not found', { upgradeKey });
      return;
    }

    // Apply each reward for each level
    for (let i = 0; i < level; i++) {
      for (const reward of upgrade.rewards) {
        applyPrestigeReward(bonuses, reward);
      }
    }
  } catch (error) {
    stateErrorHandler('Failed to apply prestige upgrade bonuses', { 
      upgradeKey,
      level,
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}

/**
 * Apply a single prestige reward
 */
function applyPrestigeReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  try {
    switch (reward.type) {
      case 'resourceGain':
        applyResourceGainReward(bonuses, reward);
        break;
      case 'resourceGainMultiplier':
        applyResourceGainMultiplierReward(bonuses, reward);
        break;
      case 'buildingGain':
        applyBuildingGainReward(bonuses, reward);
        break;
      case 'buildingGainMultiplier':
        applyBuildingGainMultiplierReward(bonuses, reward);
        break;
      case 'clickGain':
        applyClickGainReward(bonuses, reward);
        break;
      case 'clickMultiplier':
        applyClickMultiplierReward(bonuses, reward);
        break;
      case 'actionClickGain':
        applyActionClickGainReward(bonuses, reward);
        break;
      case 'actionClickMultiplier':
        applyActionClickMultiplierReward(bonuses, reward);
        break;
      case 'loopGain':
        applyLoopGainReward(bonuses, reward);
        break;
      case 'loopMultiplier':
        applyLoopMultiplierReward(bonuses, reward);
        break;
      case 'actionLoopGain':
        applyActionLoopGainReward(bonuses, reward);
        break;
      case 'actionLoopMultiplier':
        applyActionLoopMultiplierReward(bonuses, reward);
        break;
      case 'buildingCostReduction':
        applyBuildingCostReductionReward(bonuses, reward);
        break;
      default:
        stateErrorHandler('Unknown prestige reward type', { reward });
    }
  } catch (error) {
    stateErrorHandler('Failed to apply prestige reward', { 
      reward,
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}

/**
 * Apply resource gain reward (e.g., +2 wood/s)
 */
function applyResourceGainReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    // Apply to all resources
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.resourceGain[resource] = (bonuses.resourceGain[resource] || 0) + reward.value;
    }
  } else {
    // Apply to specific resource
    const resourceKey = reward.target as ResourceKey;
    bonuses.resourceGain[resourceKey] = (bonuses.resourceGain[resourceKey] || 0) + reward.value;
  }
}

/**
 * Apply resource gain multiplier reward (e.g., 1.2x wood/s)
 */
function applyResourceGainMultiplierReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    // Apply to all resources
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.resourceGainMultiplier[resource] = (bonuses.resourceGainMultiplier[resource] || 1) * reward.value;
    }
  } else {
    // Apply to specific resource
    const resourceKey = reward.target as ResourceKey;
    bonuses.resourceGainMultiplier[resourceKey] = (bonuses.resourceGainMultiplier[resourceKey] || 1) * reward.value;
  }
}

/**
 * Apply click gain reward (e.g., +1 wood per click)
 */
function applyClickGainReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    // Apply to all resources
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.clickGain[resource] = (bonuses.clickGain[resource] || 0) + reward.value;
    }
  } else {
    // Apply to specific resource
    const resourceKey = reward.target as ResourceKey;
    bonuses.clickGain[resourceKey] = (bonuses.clickGain[resourceKey] || 0) + reward.value;
  }
}

/**
 * Apply click multiplier reward (e.g., 1.2x click gains)
 */
function applyClickMultiplierReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    // Apply to all resources
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.clickMultiplier[resource] = (bonuses.clickMultiplier[resource] || 1) * reward.value;
    }
  } else {
    // Apply to specific resource
    const resourceKey = reward.target as ResourceKey;
    bonuses.clickMultiplier[resourceKey] = (bonuses.clickMultiplier[resourceKey] || 1) * reward.value;
  }
}

/**
 * Apply building cost reduction reward (e.g., -5% quarry costs)
 */
function applyBuildingCostReductionReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    // Apply to all buildings - we need to get all building keys
    // For now, we'll apply to common building types
    const commonBuildings = ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory', 'taxOffice'];
    for (const building of commonBuildings) {
      bonuses.buildingCostReduction[building] = (bonuses.buildingCostReduction[building] || 0) + reward.value;
    }
  } else {
    // Apply to specific building
    bonuses.buildingCostReduction[reward.target] = (bonuses.buildingCostReduction[reward.target] || 0) + reward.value;
  }
}

/**
 * Apply building gain reward (e.g., +2 wood/s from woodcutters)
 */
function applyBuildingGainReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (!bonuses.buildingGain[reward.target]) {
    bonuses.buildingGain[reward.target] = {};
  }
  const resourceKey = reward.resource || 'all';
  if (resourceKey === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.buildingGain[reward.target]![resource] = (bonuses.buildingGain[reward.target]![resource] || 0) + reward.value;
    }
  } else {
    bonuses.buildingGain[reward.target]![resourceKey as ResourceKey] = (bonuses.buildingGain[reward.target]![resourceKey as ResourceKey] || 0) + reward.value;
  }
}

/**
 * Apply building gain multiplier reward (e.g., 1.3x woodcutter production)
 */
function applyBuildingGainMultiplierReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (!bonuses.buildingGainMultiplier[reward.target]) {
    bonuses.buildingGainMultiplier[reward.target] = {};
  }
  const resourceKey = reward.resource || 'all';
  if (resourceKey === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.buildingGainMultiplier[reward.target]![resource] = (bonuses.buildingGainMultiplier[reward.target]![resource] || 1) * reward.value;
    }
  } else {
    bonuses.buildingGainMultiplier[reward.target]![resourceKey as ResourceKey] = (bonuses.buildingGainMultiplier[reward.target]![resourceKey as ResourceKey] || 1) * reward.value;
  }
}

/**
 * Apply action click gain reward (e.g., +2 wood from gatherWood action)
 */
function applyActionClickGainReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (!bonuses.actionClickGain[reward.target]) {
    bonuses.actionClickGain[reward.target] = {};
  }
  const resourceKey = reward.resource || 'all';
  if (resourceKey === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.actionClickGain[reward.target]![resource] = (bonuses.actionClickGain[reward.target]![resource] || 0) + reward.value;
    }
  } else {
    bonuses.actionClickGain[reward.target]![resourceKey as ResourceKey] = (bonuses.actionClickGain[reward.target]![resourceKey as ResourceKey] || 0) + reward.value;
  }
}

/**
 * Apply action click multiplier reward (e.g., 1.5x gatherWood gains)
 */
function applyActionClickMultiplierReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (!bonuses.actionClickMultiplier[reward.target]) {
    bonuses.actionClickMultiplier[reward.target] = {};
  }
  const resourceKey = reward.resource || 'all';
  if (resourceKey === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.actionClickMultiplier[reward.target]![resource] = (bonuses.actionClickMultiplier[reward.target]![resource] || 1) * reward.value;
    }
  } else {
    bonuses.actionClickMultiplier[reward.target]![resourceKey as ResourceKey] = (bonuses.actionClickMultiplier[reward.target]![resourceKey as ResourceKey] || 1) * reward.value;
  }
}

/**
 * Apply loop gain reward (e.g., +1 wood per loop)
 */
function applyLoopGainReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.loopGain[resource] = (bonuses.loopGain[resource] || 0) + reward.value;
    }
  } else {
    const resourceKey = reward.target as ResourceKey;
    bonuses.loopGain[resourceKey] = (bonuses.loopGain[resourceKey] || 0) + reward.value;
  }
}

/**
 * Apply loop multiplier reward (e.g., 1.2x loop gains)
 */
function applyLoopMultiplierReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (reward.target === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.loopMultiplier[resource] = (bonuses.loopMultiplier[resource] || 1) * reward.value;
    }
  } else {
    const resourceKey = reward.target as ResourceKey;
    bonuses.loopMultiplier[resourceKey] = (bonuses.loopMultiplier[resourceKey] || 1) * reward.value;
  }
}

/**
 * Apply action loop gain reward (e.g., +3 wood from woodcutting loop)
 */
function applyActionLoopGainReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (!bonuses.actionLoopGain[reward.target]) {
    bonuses.actionLoopGain[reward.target] = {};
  }
  const resourceKey = reward.resource || 'all';
  if (resourceKey === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.actionLoopGain[reward.target]![resource] = (bonuses.actionLoopGain[reward.target]![resource] || 0) + reward.value;
    }
  } else {
    bonuses.actionLoopGain[reward.target]![resourceKey as ResourceKey] = (bonuses.actionLoopGain[reward.target]![resourceKey as ResourceKey] || 0) + reward.value;
  }
}

/**
 * Apply action loop multiplier reward (e.g., 1.4x woodcutting loop gains)
 */
function applyActionLoopMultiplierReward(bonuses: PrestigeBonuses, reward: PrestigeReward): void {
  if (!bonuses.actionLoopMultiplier[reward.target]) {
    bonuses.actionLoopMultiplier[reward.target] = {};
  }
  const resourceKey = reward.resource || 'all';
  if (resourceKey === 'all') {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const resource of allResources) {
      bonuses.actionLoopMultiplier[reward.target]![resource] = (bonuses.actionLoopMultiplier[reward.target]![resource] || 1) * reward.value;
    }
  } else {
    bonuses.actionLoopMultiplier[reward.target]![resourceKey as ResourceKey] = (bonuses.actionLoopMultiplier[reward.target]![resourceKey as ResourceKey] || 1) * reward.value;
  }
}

