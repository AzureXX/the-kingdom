// Prestige operations logic

import { initNewGame } from '@/lib/game/utils/gameState';
import type { GameState } from '@/lib/game/types';
import { prestigeGain } from '@/lib/game/utils/prestige/calculations';

/**
 * Perform prestige operation - reset game state but keep prestige and upgrades
 */
export function doPrestige(state: GameState): GameState {
  const gain = prestigeGain(state);
  const keepPrestige = (state.resources.prestige || 0) + gain;
  const keepUp = { ...state.upgrades };
  
  const fresh = initNewGame();
  
  return {
    ...fresh,
    resources: {
      ...fresh.resources,
      prestige: keepPrestige
    },
    upgrades: keepUp
  };
}
