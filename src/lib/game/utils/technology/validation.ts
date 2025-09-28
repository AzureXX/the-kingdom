// Technology validation logic

import { CONFIG } from '@/lib/game/config';
import type { TechnologyKey, GameState } from '@/lib/game/types';
import { getResource } from '@/lib/game/utils/gameState';
import { isValidResourceKey } from '@/lib/game/utils/validation';
import { logInvalidKey } from '@/lib/game/utils/error';

const { technologies: TECHNOLOGIES } = CONFIG;

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
  const tech = TECHNOLOGIES[technologyKey];
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
  const tech = TECHNOLOGIES[technologyKey];
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
