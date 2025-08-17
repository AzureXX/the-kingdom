import { GAME_CONSTANTS } from './constants';
import { initNewGame } from './gameState';
import type { GameState } from './types';

/**
 * Calculate prestige gain based on lifetime food production
 */
export function prestigeGain(state: GameState): number {
  const div = GAME_CONSTANTS.PRESTIGE_DIVISOR;
  const x = state.lifetime.food || 0;
  return Math.floor(Math.sqrt(x / div));
}

/**
 * Perform prestige operation - reset game state but keep prestige and upgrades
 */
export function doPrestige(state: GameState): GameState {
  const gain = prestigeGain(state);
  const keepPrestige = (state.resources.prestige || 0) + gain;
  const keepUp = { ...state.upgrades };
  
  const fresh = initNewGame();
  fresh.resources.prestige = keepPrestige;
  fresh.upgrades = keepUp;
  
  return fresh;
}

/**
 * Get prestige formula description
 */
export function getPrestigeFormula(): string {
  return `floor( √(lifetimeFood / ${GAME_CONSTANTS.PRESTIGE_DIVISOR}) )`;
}

/**
 * Calculate prestige efficiency (prestige per hour of food production)
 */
export function getPrestigeEfficiency(state: GameState): number {
  const lifetimeFood = state.lifetime.food || 0;
  if (lifetimeFood <= 0) return 0;
  
  const prestige = prestigeGain(state);
  const hours = lifetimeFood / 3600; // Assuming 1 food per second = 3600 per hour
  
  return prestige / hours;
}
