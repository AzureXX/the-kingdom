// Multiplier calculation logic

import type { GameState, Multipliers, ResourceKey, BuildingKey } from '@/lib/game/types';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/error';
// Create specialized error handlers
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Calculate all multipliers based on current upgrade levels
 * Now uses separate prestige bonus system
 */
export function getMultipliers(state: GameState): Multipliers {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getMultipliers', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    const prodMul: Partial<Record<ResourceKey, number>> = {};
    const useMul: Partial<Record<ResourceKey, number>> = {};
    const cost: Partial<Record<BuildingKey, number>> = {};
    
    // Initialize all resource multipliers with default value of 1
    const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const key of resourceKeys) {
      prodMul[key] = 1;
      useMul[key] = 1;
    }
    
    // Initialize all building cost multipliers with default value of 1
    const buildingKeys: BuildingKey[] = ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory', 'taxOffice'];
    for (const key of buildingKeys) {
      cost[key] = 1;
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
      actionLoopMultiplier: {}
    };

    // Get prestige bonuses (separate system)
    const prestigeBonuses = state.prestigeBonuses || {
      resourceGain: {},
      resourceGainMultiplier: {},
      clickGain: {},
      clickMultiplier: {},
      buildingCostReduction: {},
    };

    // Initialize production multipliers to 1 (they are now calculated directly in production.ts)
    // This keeps the interface consistent but the actual calculation is done in production.ts
    for (const resourceKey of resourceKeys) {
      prodMul[resourceKey] = 1;
    }

    // Calculate click gain multiplier (average of all resource click multipliers)
    let totalClickMultiplier = 0;
    let clickMultiplierCount = 0;
    for (const resourceKey of resourceKeys) {
      const achievementMultiplier = achievementBonuses.clickMultiplier[resourceKey] || 1;
      const prestigeMultiplier = prestigeBonuses.clickMultiplier[resourceKey] || 1;
      const combinedMultiplier = achievementMultiplier * prestigeMultiplier;
      if (combinedMultiplier > 1) {
        totalClickMultiplier += combinedMultiplier;
        clickMultiplierCount++;
      }
    }
    const clickGain = clickMultiplierCount > 0 ? totalClickMultiplier / clickMultiplierCount : 1;

    // Calculate building-specific cost multipliers
    for (const buildingKey of buildingKeys) {
      // Calculate cost multiplier (inverse of average production multiplier, plus building-specific cost reduction)
      let totalProdMultiplier = 0;
      let prodMultiplierCount = 0;
      for (const resourceKey of resourceKeys) {
        const multiplier = prodMul[resourceKey] || 1;
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
    
    const ctx: Multipliers = {
      clickGain,
      cost,
      prodMul,
      useMul,
    };
    
    return ctx;
  } catch (error) {
    calculationHandler('Failed to calculate multipliers', { error: error instanceof Error ? error.message : String(error) });
    // Return default multipliers on error for safety
    return {
      clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      cost: { woodcutter: 1, quarry: 1, farm: 1, blacksmith: 1, castle: 1, library: 1, university: 1, laboratory: 1, taxOffice: 1 },
      prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
      useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
    };
  }
}
