// Prestige calculation logic

import { PRESTIGE_CONSTANTS } from '@/lib/game/constants';
import type { GameState } from '@/lib/game/types';

/**
 * Calculate prestige gain based on lifetime food production
 */
export function prestigeGain(state: GameState): number {
  const div = PRESTIGE_CONSTANTS.PRESTIGE_DIVISOR;
  const x = state.lifetime.food || 0;
  return Math.floor(Math.sqrt(x / div));
}

/**
 * Get prestige formula description
 */
export function getPrestigeFormula(): string {
  return `floor( √(lifetimeFood / ${PRESTIGE_CONSTANTS.PRESTIGE_DIVISOR}) )`;
}

