// Technology query and listing logic

import { CONFIG } from '@/lib/game/config';
import type { TechnologyKey, GameState } from '@/lib/game/types';
import { isValidTechnologyKey } from '@/lib/game/utils';
import { logInvalidKey } from '@/lib/game/utils/error';
import { hasPrerequisitesMet, canResearchTechnology } from '@/lib/game/utils/technology/validation';

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
