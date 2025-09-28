// Achievement progress calculation logic

import type { 
  GameState, 
  AchievementDef, 
  AchievementRequirement, 
  AchievementProgress,
  ResourceKey,
  BuildingKey,
  TechnologyKey,
  ActionKey,
} from '@/lib/game/types';
import { ACHIEVEMENTS } from '@/lib/game/config/achievements';
import { getResource, getBuildingCount, getTechnologyLevel } from '@/lib/game/utils/gameState';
import { createValidationErrorHandler, createStateErrorHandler } from '@/lib/game/utils/errorLogger';

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('achievementSystem');
const stateErrorHandler = createStateErrorHandler('achievementSystem');

/**
 * Calculate progress toward a specific achievement
 */
export function calculateAchievementProgress(
  state: GameState, 
  achievement: AchievementDef
): AchievementProgress {
  try {
    if (!state || !achievement) {
      validationHandler('Invalid parameters for calculateAchievementProgress', { 
        state: !!state, 
        achievement: !!achievement 
      });
      return { progress: 0, currentValue: 0, targetValue: 0, isComplete: false };
    }

    let totalProgress = 0;
    let completedRequirements = 0;
    let primaryCurrentValue = 0;
    let primaryTargetValue = 0;

    for (const requirement of achievement.requirements) {
      const requirementProgress = checkRequirement(state, requirement);
      
      if (requirementProgress.isMet) {
        completedRequirements++;
        totalProgress += 1;
      } else {
        totalProgress += requirementProgress.progress;
      }

      // Use the first requirement as primary for display
      if (completedRequirements === 0) {
        primaryCurrentValue = requirementProgress.currentValue;
        primaryTargetValue = requirementProgress.targetValue;
      }
    }

    const overallProgress = totalProgress / achievement.requirements.length;
    const isComplete = completedRequirements === achievement.requirements.length;

    return {
      progress: Math.min(1.0, overallProgress),
      currentValue: primaryCurrentValue,
      targetValue: primaryTargetValue,
      isComplete
    };
  } catch (error) {
    stateErrorHandler('Failed to calculate achievement progress', { 
      achievementKey: achievement.key,
      error: error instanceof Error ? error.message : String(error) 
    });
    return { progress: 0, currentValue: 0, targetValue: 0, isComplete: false };
  }
}

/**
 * Check if a specific requirement is met
 */
function checkRequirement(
  state: GameState, 
  requirement: AchievementRequirement
): { isMet: boolean; progress: number; currentValue: number; targetValue: number } {
  try {
    const { type, target, value, operator = '>=' } = requirement;
    let currentValue = 0;
    const targetValue = value;

    switch (type) {
      case 'resource':
        currentValue = getResource(state, target as ResourceKey);
        break;
      
      case 'building':
        if (target === 'total') {
          currentValue = Object.values(state.buildings).reduce((sum, count) => sum + count, 0);
        } else {
          currentValue = getBuildingCount(state, target as BuildingKey);
        }
        break;
      
      case 'technology':
        currentValue = getTechnologyLevel(state, target as TechnologyKey);
        break;
      
      case 'action':
        if (target === 'total') {
          currentValue = Object.values(state.actions.unlocks).filter(Boolean).length;
        } else {
          currentValue = state.actions.unlocks[target as ActionKey] ? 1 : 0;
        }
        break;
      
      case 'event':
        if (target === 'count') {
          currentValue = state.events.eventHistory.length;
        } else {
          currentValue = state.events.eventHistory.filter(e => e.eventKey === target).length;
        }
        break;
      
      case 'click':
        if (target === 'total') {
          currentValue = state.clicks;
        }
        break;
      
      case 'prestige':
        if (target === 'count') {
          currentValue = state.upgrades.royalDecrees || 0; // Use upgrade level as prestige count proxy
        }
        break;
      
      case 'time':
        if (target === 'total') {
          // Calculate total play time (simplified - would need session tracking)
          currentValue = Math.floor((Date.now() - state.t) / 1000);
        } else if (target === 'session') {
          currentValue = Math.floor((Date.now() - state.t) / 1000);
        }
        break;
      
      case 'combo':
        // Special combo requirements
        if (target === 'category_complete') {
          // Check if all achievements in a category are complete
          const categoryAchievements = Object.values(ACHIEVEMENTS).filter(a => a.category === 'resource');
          currentValue = categoryAchievements.every(a => state.achievements?.unlocked?.[a.key]) ? 1 : 0;
        } else if (target === 'all_complete') {
          const allAchievements = Object.keys(ACHIEVEMENTS);
          currentValue = allAchievements.every(key => state.achievements?.unlocked?.[key]) ? 1 : 0;
        }
        break;
      
      default:
        validationHandler('Unknown requirement type', { type, target });
        return { isMet: false, progress: 0, currentValue: 0, targetValue };
    }

    const isMet = compareValues(currentValue, targetValue, operator);
    const progress = Math.min(1.0, currentValue / targetValue);

    return { isMet, progress, currentValue, targetValue };
  } catch (error) {
    stateErrorHandler('Failed to check requirement', { 
      requirement: requirement,
      error: error instanceof Error ? error.message : String(error) 
    });
    return { isMet: false, progress: 0, currentValue: 0, targetValue: requirement.value };
  }
}

/**
 * Compare two values using the specified operator
 */
function compareValues(current: number, target: number, operator: string): boolean {
  switch (operator) {
    case '>=': return current >= target;
    case '>': return current > target;
    case '=': return current === target;
    case '<=': return current <= target;
    case '<': return current < target;
    default: return current >= target;
  }
}

/**
 * Get achievement progress for display
 */
export function getAchievementProgress(
  state: GameState, 
  achievementKey: string
): AchievementProgress {
  try {
    const achievement = ACHIEVEMENTS[achievementKey];
    if (!achievement) {
      validationHandler('Unknown achievement key', { achievementKey });
      return { progress: 0, currentValue: 0, targetValue: 0, isComplete: false };
    }

    return calculateAchievementProgress(state, achievement);
  } catch (error) {
    stateErrorHandler('Failed to get achievement progress', { 
      achievementKey,
      error: error instanceof Error ? error.message : String(error) 
    });
    return { progress: 0, currentValue: 0, targetValue: 0, isComplete: false };
  }
}
