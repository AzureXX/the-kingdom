// Technology management logic

import type { TechnologyKey } from '@/lib/game/types';
import type { GameState } from '@/lib/game/types';

/**
 * Update technology level with structural sharing - Pure function
 */
export function updateTechnologyLevel(state: GameState, technologyKey: TechnologyKey, level: number): GameState {
  const currentLevel = state.technologies[technologyKey] || 0;
  if (currentLevel === level) return state;
  
  return {
    ...state,
    technologies: {
      ...state.technologies,
      [technologyKey]: Math.max(0, level)
    }
  };
}

/**
 * Get technology level safely, returning 0 if not found
 */
export function getTechnologyLevel(state: GameState, technologyKey: TechnologyKey): number {
  return state.technologies[technologyKey] || 0;
}

/**
 * Set technology level - Pure function
 */
export function setTechnologyLevel(state: GameState, technologyKey: TechnologyKey, level: number): GameState {
  const currentLevel = state.technologies[technologyKey] || 0;
  const newLevel = Math.max(0, level);
  if (currentLevel === newLevel) return state;
  
  return {
    ...state,
    technologies: {
      ...state.technologies,
      [technologyKey]: newLevel
    }
  };
}

/**
 * Check if a technology is researched
 */
export function isTechnologyResearched(state: GameState, technologyKey: TechnologyKey): boolean {
  return getTechnologyLevel(state, technologyKey) > 0;
}
