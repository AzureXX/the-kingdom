// Prestige calculation logic

import { PRESTIGE_CONSTANTS, GAME_CONSTANTS } from '@/lib/game/constants';
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

/**
 * Calculate prestige efficiency (prestige per hour of food production)
 */
export function getPrestigeEfficiency(state: GameState): number {
  const lifetimeFood = state.lifetime.food || 0;
  if (lifetimeFood <= 0) return 0;
  
  const prestige = prestigeGain(state);
  const hours = lifetimeFood / (GAME_CONSTANTS.TIME_CONSTANTS.SECONDS_PER_MINUTE * GAME_CONSTANTS.TIME_CONSTANTS.MINUTES_PER_HOUR);
  
  return prestige / hours;
}
