// Technology research logic

import { CONFIG } from '@/lib/game/config';
import type { TechnologyKey, GameState } from '@/lib/game/types';
import { GAME_CONSTANTS } from '@/lib/game/constants';
import { getResource, setResource, setTechnologyLevel } from '@/lib/game/gameState';
import { isValidResourceKey } from '@/lib/game/utils';
import { logInvalidKey } from '@/lib/game/utils/errorLogger';
import { canResearchTechnology } from './validation';

const { technologies: TECHNOLOGIES } = CONFIG;

/**
 * Start researching a technology - Pure function
 */
export function startResearch(state: GameState, technologyKey: TechnologyKey): GameState {
  if (!canResearchTechnology(state, technologyKey)) return state;
  
  const tech = TECHNOLOGIES[technologyKey];
  if (!tech) return state;
  
  let newState = { ...state };
  
  // Deduct resources
  for (const [resource, amount] of Object.entries(tech.baseCost)) {
    if (!isValidResourceKey(resource)) {
      logInvalidKey(resource, 'resource', 'technology');
      continue;
    }
    const current = getResource(newState, resource);
    newState = setResource(newState, resource, Math.max(0, current - amount));
  }
  
  // Start research
  return {
    ...newState,
    research: {
      ...newState.research,
      activeResearch: technologyKey,
      researchStartTime: Date.now(),
      researchEndTime: Date.now() + (tech.researchTime * GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND)
    }
  };
}

/**
 * Check if research is complete and complete it if so - Pure function
 */
export function checkResearchProgress(state: GameState): GameState {
  if (!state.research.activeResearch) return state;
  
  if (Date.now() >= state.research.researchEndTime) {
    return completeResearch(state, state.research.activeResearch);
  }
  
  return state;
}

/**
 * Complete research for a technology - Pure function
 */
export function completeResearch(state: GameState, technologyKey: TechnologyKey): GameState {
  const tech = TECHNOLOGIES[technologyKey];
  if (!tech) return state;
  
  let newState = { ...state };
  
  // Mark as researched
  newState = setTechnologyLevel(newState, technologyKey, 1);
  
  // Apply custom effect if any
  if (tech.effect) {
    tech.effect(newState);
  }
  
  // Clear research state
  return {
    ...newState,
    research: {
      ...newState.research,
      activeResearch: null,
      researchStartTime: 0,
      researchEndTime: 0
    }
  };
}
