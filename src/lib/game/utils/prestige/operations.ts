// Prestige operations logic

import { initNewGame } from '@/lib/game/utils/gameState';
import type { GameState } from '@/lib/game/types';
import { prestigeGain } from '@/lib/game/utils/prestige/calculations';
import { getEmptyAchievementBonusesObject } from '@/lib/game/utils/achievement/bonusCalculator';
import { getEmptyPrestigeBonusesObject } from '@/lib/game/utils/prestige/bonusApplication';
import { applyPrestigeBonuses } from '@/lib/game/utils/prestige/bonusApplication';

/**
 * Perform prestige operation - reset game state but keep prestige, upgrades, achievements, and bonuses
 */
export function doPrestige(state: GameState): GameState {
  const gain = prestigeGain(state);
  const keepPrestige = (state.resources.prestige || 0) + gain;
  const keepUpgrades = { ...state.upgrades };
  
  // Preserve achievement state and bonuses
  const keepAchievements = state.achievements ? { ...state.achievements } : undefined;
  const keepAchievementBonuses = state.achievementBonuses ? { ...state.achievementBonuses } : getEmptyAchievementBonusesObject();
  
  // Preserve prestige bonuses (will be recalculated based on upgrades)
  const keepPrestigeBonuses = state.prestigeBonuses ? { ...state.prestigeBonuses } : getEmptyPrestigeBonusesObject();
  
  const fresh = initNewGame();
  
  const newState = {
    ...fresh,
    resources: {
      ...fresh.resources,
      prestige: keepPrestige
    },
    upgrades: keepUpgrades,
    achievements: keepAchievements || fresh.achievements,
    achievementBonuses: keepAchievementBonuses,
    prestigeBonuses: keepPrestigeBonuses
  };
  
  // Recalculate and apply prestige bonuses based on preserved upgrades
  return applyPrestigeBonuses(newState);
}
