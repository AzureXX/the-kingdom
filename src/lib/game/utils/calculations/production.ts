// Production calculation logic

import type { ResourceKey, GameState } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { getBuildingCount } from '@/lib/game/utils/gameState';
import { isValidBuildingKey } from '@/lib/game/utils/validation';
import { logInvalidKey, createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/error';
import { getMultipliers } from '@/lib/game/utils/calculations/multipliers';

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

    const muls = getMultipliers(state);
    const bonuses = state.achievementBonuses || {
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
    
    const out: Record<ResourceKey, number> = { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
    
    for (const key in BUILDINGS) {
      if (!isValidBuildingKey(key)) {
        logInvalidKey(key, 'building', 'calculation');
        continue;
      }
      const def = BUILDINGS[key];
      const n = getBuildingCount(state, key);
      if (!n) continue;
      
      // Add production
      for (const r in def.baseProd) {
        const rk = r as ResourceKey;
        const baseProduction = (def.baseProd[rk] || 0) * n;
        
        // Apply building-specific bonuses first
        const buildingGain = bonuses.buildingGain[key]?.[rk] || 0;
        const buildingMultiplier = bonuses.buildingGainMultiplier[key]?.[rk] || 1;
        
        // Apply resource-specific bonuses
        const resourceMultiplier = (muls.prodMul[rk] || 1) * (bonuses.resourceGainMultiplier[rk] || 1);
        const resourceBonus = bonuses.resourceGain[rk] || 0;
        
        // Calculate final production: (base + building bonus) * multipliers + resource bonus
        const finalProduction = ((baseProduction + buildingGain) * buildingMultiplier * resourceMultiplier) + resourceBonus;
        
        out[rk] += finalProduction;
      }
      
      // Subtract consumption
      for (const r in def.baseUse) {
        const rk = r as ResourceKey;
        out[rk] -= (def.baseUse[rk] || 0) * n * (muls.useMul[rk] || 1);
      }
    }
    
    return out;
  } catch (error) {
    calculationHandler('Failed to calculate production per second', { error: error instanceof Error ? error.message : String(error) });
    // Return zero production on error for safety
    return { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0, researchPoints: 0 };
  }
}
