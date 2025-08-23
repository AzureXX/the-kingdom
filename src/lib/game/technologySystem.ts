import { CONFIG, type TechnologyKey, type ResourceKey } from './config';
import { getResource, addResources, setResource, setTechnologyLevel } from './gameState';
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
    if (getResource(state, resource as ResourceKey) < amount) return false;
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
    const current = getResource(newState, resource as ResourceKey);
    newState = setResource(newState, resource as ResourceKey, Math.max(0, current - amount));
  }
  
  // Start research
  newState.research = { ...newState.research };
  newState.research.activeResearch = technologyKey;
  newState.research.researchStartTime = Date.now();
  newState.research.researchEndTime = Date.now() + (tech.researchTime * 1000);
  
  return newState;
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
  newState.research = { ...newState.research };
  newState.research.activeResearch = null;
  newState.research.researchStartTime = 0;
  newState.research.researchEndTime = 0;
  
  return newState;
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
  return Object.keys(CONFIG.technologies).filter(techKey => 
    hasPrerequisitesMet(state, techKey as TechnologyKey)
  ) as TechnologyKey[];
}

/**
 * Get all available technologies (requirements met, not researched)
 */
export function getAvailableTechnologies(state: GameState): TechnologyKey[] {
  return Object.keys(CONFIG.technologies).filter(techKey => 
    canResearchTechnology(state, techKey as TechnologyKey)
  ) as TechnologyKey[];
}

/**
 * Get all researched technologies
 */
export function getResearchedTechnologies(state: GameState): TechnologyKey[] {
  return Object.keys(CONFIG.technologies).filter(techKey => 
    state.technologies[techKey as TechnologyKey] > 0
  ) as TechnologyKey[];
}
