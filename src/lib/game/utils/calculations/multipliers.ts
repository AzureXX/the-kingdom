// Multiplier calculation logic

import type { GameState, Multipliers, ResourceKey, BuildingKey } from '@/lib/game/types';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/error';
// Create specialized error handlers
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Calculate click gain multiplier (average of all resource click multipliers)
 */
export function getClickGainMultiplier(state: GameState): number {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getClickGainMultiplier', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    // Get base multipliers from achievement bonuses
    const achievementBonuses = state.achievementBonuses || {
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

    // Get prestige bonuses (separate system)
    const prestigeBonuses = state.prestigeBonuses || {
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

    // Calculate click gain multiplier (average of all resource click multipliers)
    let totalClickMultiplier = 0;
    let clickMultiplierCount = 0;
    const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    
    for (const resourceKey of resourceKeys) {
      const achievementMultiplier = achievementBonuses.clickMultiplier[resourceKey] || 1;
      const prestigeMultiplier = prestigeBonuses.clickMultiplier[resourceKey] || 1;
      const combinedMultiplier = achievementMultiplier * prestigeMultiplier;
      if (combinedMultiplier > 1) {
        totalClickMultiplier += combinedMultiplier;
        clickMultiplierCount++;
      }
    }
    
    return clickMultiplierCount > 0 ? totalClickMultiplier / clickMultiplierCount : 1;
  } catch (error) {
    calculationHandler('Failed to calculate click gain multiplier', { error: error instanceof Error ? error.message : String(error) });
    return GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER;
  }
}

/**
 * Calculate building-specific cost multipliers
 */
export function getBuildingCostMultipliers(state: GameState): Partial<Record<BuildingKey, number>> {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getBuildingCostMultipliers', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    // Get base multipliers from achievement bonuses
    const achievementBonuses = state.achievementBonuses || {
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

    // Get prestige bonuses (separate system)
    const prestigeBonuses = state.prestigeBonuses || {
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

    const cost: Partial<Record<BuildingKey, number>> = {};
    const buildingKeys: BuildingKey[] = ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory', 'taxOffice'];
    const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    
    // Initialize all building cost multipliers with default value of 1
    for (const key of buildingKeys) {
      cost[key] = 1;
    }

    // Calculate building-specific cost multipliers
    for (const buildingKey of buildingKeys) {
      // Calculate cost multiplier (inverse of average production multiplier, plus building-specific cost reduction)
      let totalProdMultiplier = 0;
      let prodMultiplierCount = 0;
      for (const resourceKey of resourceKeys) {
        const achievementMultiplier = achievementBonuses.resourceGainMultiplier[resourceKey] || 1;
        const prestigeMultiplier = prestigeBonuses.resourceGainMultiplier[resourceKey] || 1;
        const multiplier = achievementMultiplier * prestigeMultiplier;
        if (multiplier > 1) {
          totalProdMultiplier += multiplier;
          prodMultiplierCount++;
        }
      }
      const baseCost = prodMultiplierCount > 0 ? 1 / (totalProdMultiplier / prodMultiplierCount) : 1;
      
      // Apply building-specific cost reductions
      const achievementCostReduction = achievementBonuses.buildingCostReduction?.[buildingKey] || 0;
      const prestigeCostReduction = prestigeBonuses.buildingCostReduction?.[buildingKey] || 0;
      const totalBuildingCostReduction = achievementCostReduction + prestigeCostReduction;
      
      cost[buildingKey] = baseCost * (1 - totalBuildingCostReduction);
    }

    return cost;
  } catch (error) {
    calculationHandler('Failed to calculate building cost multipliers', { error: error instanceof Error ? error.message : String(error) });
    return { woodcutter: 1, quarry: 1, farm: 1, blacksmith: 1, castle: 1, library: 1, university: 1, laboratory: 1, taxOffice: 1 };
  }
}

/**
 * Calculate resource consumption multipliers
 */
export function getResourceConsumptionMultipliers(state: GameState): Partial<Record<ResourceKey, number>> {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getResourceConsumptionMultipliers', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    const useMul: Partial<Record<ResourceKey, number>> = {};
    const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    
    // Initialize all resource consumption multipliers with default value of 1
    for (const key of resourceKeys) {
      useMul[key] = 1;
    }

    return useMul;
  } catch (error) {
    calculationHandler('Failed to calculate resource consumption multipliers', { error: error instanceof Error ? error.message : String(error) });
    return { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 };
  }
}

/**
 * Calculate all multipliers based on current upgrade levels
 * Now uses separate prestige bonus system
 */
export function getMultipliers(state: GameState): Multipliers {
  try {
    // Use the new specific functions for better performance
    const clickGain = getClickGainMultiplier(state);
    const cost = getBuildingCostMultipliers(state);
    const useMul = getResourceConsumptionMultipliers(state);
    
    return {
      clickGain,
      cost,
      useMul,
    };
  } catch (error) {
    calculationHandler('Failed to calculate multipliers', { error: error instanceof Error ? error.message : String(error) });
    // Return default multipliers on error for safety
    return {
      clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      cost: { woodcutter: 1, quarry: 1, farm: 1, blacksmith: 1, castle: 1, library: 1, university: 1, laboratory: 1, taxOffice: 1 },
      useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
    };
  }
}
