// Production calculation logic

import type { ResourceKey, GameState } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { getBuildingCount } from '@/lib/game/utils/gameState';
import { isValidBuildingKey } from '@/lib/game/utils/validation';
import { logInvalidKey, createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/error';
import { getResourceConsumptionMultipliers } from '@/lib/game/utils/calculations/multipliers';

const { buildings: BUILDINGS } = CONFIG;

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Calculate production per second for all resources
 */
export function getPerSec(state: GameState): Record<ResourceKey, number> {
  try {
    // Validate input
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter for getPerSec', { state: typeof state });
      throw new Error('Invalid state parameter');
    }

    const useMultipliers = getResourceConsumptionMultipliers(state);
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
    
    const prestigeBonuses = state.prestigeBonuses || {
      resourceGain: {},
      resourceGainMultiplier: {},
      clickGain: {},
      clickMultiplier: {},
      buildingCostReduction: {},
    };
    
    // Step 1: Calculate building production with building-specific bonuses
    const buildingProduction: Record<ResourceKey, number> = { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
    
    for (const key in BUILDINGS) {
      if (!isValidBuildingKey(key)) {
        logInvalidKey(key, 'building', 'calculation');
        continue;
      }
      const def = BUILDINGS[key];
      const n = getBuildingCount(state, key);
      if (!n) continue;
      
      // Calculate production for each resource this building produces
      for (const r in def.baseProd) {
        const rk = r as ResourceKey;
        const baseProd = (def.baseProd[rk] || 0) * n;
        
        // Apply building-specific bonuses
        const achievementBuildingGain = achievementBonuses.buildingGain[key]?.[rk] || 0;
        const achievementBuildingMultiplier = achievementBonuses.buildingGainMultiplier[key]?.[rk] || 1;
        const prestigeBuildingGain = prestigeBonuses.buildingGain[key]?.[rk] || 0;
        const prestigeBuildingMultiplier = prestigeBonuses.buildingGainMultiplier[key]?.[rk] || 1;
        
        // Calculate: (base + achievementGain + prestigeGain) * achievementMulti * prestigeMulti
        const totalGains = baseProd + (achievementBuildingGain * n) + (prestigeBuildingGain * n);
        const totalMultiplier = achievementBuildingMultiplier * prestigeBuildingMultiplier;
        const finalProduction = totalGains * totalMultiplier;
        
        buildingProduction[rk] += finalProduction;
      }
      
      // Subtract consumption (this is separate from production bonuses)
      for (const r in def.baseUse) {
        const rk = r as ResourceKey;
        buildingProduction[rk] -= (def.baseUse[rk] || 0) * n * (useMultipliers[rk] || 1);
      }
    }
    
    // Step 2: Calculate total gains and apply multipliers per resource
    const out: Record<ResourceKey, number> = { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
    
    for (const resourceKey of ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'] as ResourceKey[]) {
      const rk = resourceKey;
      
      // Calculate total gains: buildingProduction + achievementGain + prestigeGain
      let totalGains = buildingProduction[rk];
      
      // Add achievement resourceGain
      const achievementGain = achievementBonuses.resourceGain[rk] || 0;
      totalGains += achievementGain;
      
      // Add prestige resourceGain
      const prestigeGain = prestigeBonuses.resourceGain[rk] || 0;
      totalGains += prestigeGain;
      
      // Apply combined multipliers: totalGains * achievementMulti * prestigeMulti
      const achievementMultiplier = achievementBonuses.resourceGainMultiplier[rk] || 1;
      const prestigeMultiplier = prestigeBonuses.resourceGainMultiplier[rk] || 1;
      const combinedMultiplier = achievementMultiplier * prestigeMultiplier;
      
      out[rk] = totalGains * combinedMultiplier;
    }
    
    return out;
  } catch (error) {
    calculationHandler('Failed to calculate production per second', { error: error instanceof Error ? error.message : String(error) });
    // Return zero production on error for safety
    return { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
  }
}
