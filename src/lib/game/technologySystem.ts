import { CONFIG, type TechnologyKey } from './config';
import { getResource, setResource, setTechnologyLevel } from './gameState';
import { isValidResourceKey, isValidTechnologyKey } from './utils';
import { logInvalidKey } from './utils/errorLogger';
import type { GameState } from './types';

/**
 * Check if all required technologies are researched
 */
export function hasAllRequiredTechnologies(state: GameState, requiredTechs: TechnologyKey | TechnologyKey[] | undefined): boolean {
  if (!requiredTechs) return true;
  
  const techArray = Array.isArray(requiredTechs) ? requiredTechs : [requiredTechs];
  
  return techArray.every(techKey => state.technologies[techKey] > 0);
}

/**
 * Check if a technology has prerequisites met (regardless of resources)
 */
export function hasPrerequisitesMet(state: GameState, technologyKey: TechnologyKey): boolean {
  const tech = CONFIG.technologies[technologyKey];
  if (!tech) return false;
  
  // Check if already researched
  if (state.technologies[technologyKey] > 0) return false;
  
  // Check if required technologies are researched
  return hasAllRequiredTechnologies(state, tech.requiresTech);
}

/**
 * Check if a technology can be researched (requirements met and not already researched)
 */
export function canResearchTechnology(state: GameState, technologyKey: TechnologyKey): boolean {
  const tech = CONFIG.technologies[technologyKey];
  if (!tech) return false;
  
  // Check if already researched
  if (state.technologies[technologyKey] > 0) return false;
  
  // Check if required technologies are researched
  if (!hasAllRequiredTechnologies(state, tech.requiresTech)) return false;
  
  // Check if we have enough resources
  for (const [resource, amount] of Object.entries(tech.baseCost)) {
    if (!isValidResourceKey(resource)) {
      logInvalidKey(resource, 'resource', 'technology');
      return false;
    }
    if (getResource(state, resource) < amount) return false;
  }
  
  return true;
}

/**
 * Start researching a technology - Pure function
 */
export function startResearch(state: GameState, technologyKey: TechnologyKey): GameState {
  if (!canResearchTechnology(state, technologyKey)) return state;
  
  const tech = CONFIG.technologies[technologyKey];
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
      researchEndTime: Date.now() + (tech.researchTime * 1000)
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
  const tech = CONFIG.technologies[technologyKey];
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

/**
 * Get research progress as a percentage (0-100)
 */
export function getResearchProgress(state: GameState): number {
  if (!state.research.activeResearch) return 0;
  
  const now = Date.now();
  const start = state.research.researchStartTime;
  const end = state.research.researchEndTime;
  
  if (now >= end) return 100;
  if (now <= start) return 0;
  
  return ((now - start) / (end - start)) * 100;
}

/**
 * Get time remaining for current research in seconds
 */
export function getResearchTimeRemaining(state: GameState): number {
  if (!state.research.activeResearch) return 0;
  
  const remaining = state.research.researchEndTime - Date.now();
  return Math.max(0, Math.ceil(remaining / 1000));
}

/**
 * Get all technologies with prerequisites met (regardless of resources)
 */
export function getTechnologiesWithPrerequisitesMet(state: GameState): TechnologyKey[] {
  const validKeys: TechnologyKey[] = [];
  for (const techKey of Object.keys(CONFIG.technologies)) {
    if (!isValidTechnologyKey(techKey)) {
      logInvalidKey(techKey, 'technology', 'technology');
      continue;
    }
    if (hasPrerequisitesMet(state, techKey)) {
      validKeys.push(techKey);
    }
  }
  return validKeys;
}

/**
 * Get all available technologies (requirements met, not researched)
 */
export function getAvailableTechnologies(state: GameState): TechnologyKey[] {
  const validKeys: TechnologyKey[] = [];
  for (const techKey of Object.keys(CONFIG.technologies)) {
    if (!isValidTechnologyKey(techKey)) {
      logInvalidKey(techKey, 'technology', 'technology');
      continue;
    }
    if (canResearchTechnology(state, techKey)) {
      validKeys.push(techKey);
    }
  }
  return validKeys;
}

/**
 * Get all researched technologies
 */
export function getResearchedTechnologies(state: GameState): TechnologyKey[] {
  const validKeys: TechnologyKey[] = [];
  for (const techKey of Object.keys(CONFIG.technologies)) {
    if (!isValidTechnologyKey(techKey)) {
      logInvalidKey(techKey, 'technology', 'technology');
      continue;
    }
    if (state.technologies[techKey] > 0) {
      validKeys.push(techKey);
    }
  }
  return validKeys;
}
