// Multiplier calculation logic

import type { GameState, Multipliers, ResourceKey } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { getUpgradeLevel } from '@/lib/game/utils/gameState';
import { createValidationErrorHandler, createCalculationErrorHandler } from '@/lib/game/utils/error';

const { prestige: PRESTIGE_CONFIG } = CONFIG;

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('calculations');
const calculationHandler = createCalculationErrorHandler('calculations');

/**
 * Calculate all multipliers based on current upgrade levels
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
    
    // Initialize all resource multipliers with default value of 1
    const resourceKeys: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    for (const key of resourceKeys) {
      prodMul[key] = 1;
      useMul[key] = 1;
    }
    
    const ctx: Multipliers = {
      clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      cost: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      prodMul,
      useMul,
    };
    
    for (const key in PRESTIGE_CONFIG.upgrades) {
      const k = key as keyof typeof PRESTIGE_CONFIG.upgrades;
      const lvl = getUpgradeLevel(state, k);
      if (!lvl) continue;
      
      PRESTIGE_CONFIG.upgrades[k].effect(lvl, {
        muls: ctx,
        prodMul: ctx.prodMul,
        useMul: ctx.useMul,
      });
    }
    
    return ctx;
  } catch (error) {
    calculationHandler('Failed to calculate multipliers', { error: error instanceof Error ? error.message : String(error) });
    // Return default multipliers on error for safety
    return {
      clickGain: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      cost: GAME_CONSTANTS.GAME.DEFAULT_MULTIPLIER,
      prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
      useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1, researchPoints: 1 },
    };
  }
}
