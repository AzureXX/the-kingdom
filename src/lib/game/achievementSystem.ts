// Core achievement system logic

import type { 
  GameState, 
  AchievementKey, 
  AchievementDef, 
  AchievementRequirement, 
  AchievementReward, 
  AchievementProgress,
  AchievementNotification,
  AchievementState,
  ResourceKey,
  BuildingKey,
  TechnologyKey,
  ActionKey,
} from './types';
import { ACHIEVEMENTS } from './config/achievements';
import { getResource, getBuildingCount, getTechnologyLevel } from './gameState';
import { createValidationErrorHandler, createStateErrorHandler } from './utils/errorLogger';

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('achievementSystem');
const stateErrorHandler = createStateErrorHandler('achievementSystem');

/**
 * Initialize achievement state for a new game
 */
export function initAchievementState(): AchievementState {
  try {
    return {
      unlocked: {},
      progress: {},
      notifications: [],
      totalPoints: 0,
      stats: {
        unlockedCount: 0,
        sessionUnlocks: 0,
        lastUnlocked: undefined,
        lastUnlockTime: undefined
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to initialize achievement state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {
      unlocked: {},
      progress: {},
      notifications: [],
      totalPoints: 0,
      stats: {
        unlockedCount: 0,
        sessionUnlocks: 0
      }
    };
  }
}

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
 * Check all achievements and update progress
 */
export function checkAchievements(state: GameState): GameState {
  try {
    if (!state) {
      validationHandler('Invalid state for checkAchievements', { 
        state: !!state
      });
      return state;
    }

    // Ensure achievements state exists, initialize if missing
    if (!state.achievements) {
      return {
        ...state,
        achievements: initAchievementState()
      };
    }

    const newUnlocked: Record<AchievementKey, number> = { ...state.achievements.unlocked };
    const newProgress: Record<AchievementKey, number> = { ...state.achievements.progress };
    const newNotifications: AchievementNotification[] = [...state.achievements.notifications];
    let hasChanges = false;

    for (const [achievementKey, achievement] of Object.entries(ACHIEVEMENTS)) {
      // Skip if already unlocked (unless repeatable)
      if (!achievement.repeatable && newUnlocked[achievementKey]) continue;

      // Calculate progress
      const progressData = calculateAchievementProgress(state, achievement);
      newProgress[achievementKey] = progressData.progress;

      // Check if achievement is unlocked
      if (progressData.isComplete && (!newUnlocked[achievementKey] || achievement.repeatable)) {
        const currentLevel = newUnlocked[achievementKey] || 0;
        const wasAlreadyUnlocked = !!newUnlocked[achievementKey];
        newUnlocked[achievementKey] = currentLevel + 1;
        hasChanges = true;

        // Only add notification if this is a new unlock (not already unlocked)
        // and no notification already exists for this achievement
        if (!wasAlreadyUnlocked && !newNotifications.some(n => n.achievementKey === achievementKey)) {
          newNotifications.push({
            achievementKey,
            timestamp: Date.now(),
            level: currentLevel + 1,
            shown: false
          });
        }

        // Apply rewards
        const stateWithRewards = applyAchievementRewards(state, achievement);
        // Update the state reference to include rewards
        state = stateWithRewards;
      }
    }

    if (!hasChanges && Object.keys(newProgress).length === Object.keys(state.achievements.progress).length) {
      // No changes detected
      return state;
    }

    // Calculate total points
    const totalPoints = Object.entries(newUnlocked).reduce((total, [key, level]) => {
      const achievement = ACHIEVEMENTS[key];
      return total + (achievement ? achievement.points * level : 0);
    }, 0);

    // Update stats
    const unlockedCount = Object.keys(newUnlocked).length;
    const sessionUnlocks = newNotifications.filter(n => !n.shown).length;
    const lastUnlocked = newNotifications.length > 0 ? newNotifications[newNotifications.length - 1].achievementKey : state.achievements.stats.lastUnlocked;
    const lastUnlockTime = newNotifications.length > 0 ? newNotifications[newNotifications.length - 1].timestamp : state.achievements.stats.lastUnlockTime;

    return {
      ...state,
      achievements: {
        ...state.achievements,
        unlocked: newUnlocked,
        progress: newProgress,
        notifications: newNotifications,
        totalPoints,
        stats: {
          unlockedCount,
          sessionUnlocks,
          lastUnlocked,
          lastUnlockTime
        }
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to check achievements', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply rewards for an unlocked achievement
 */
function applyAchievementRewards(state: GameState, achievement: AchievementDef): GameState {
  try {
    let newState = { ...state };

    for (const reward of achievement.rewards) {
      newState = applyReward(newState, reward);
    }

    return newState;
  } catch (error) {
    stateErrorHandler('Failed to apply achievement rewards', { 
      achievementKey: achievement.key,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a single reward
 */
function applyReward(state: GameState, reward: AchievementReward): GameState {
  try {
    // Skip reward application for now - just return state unchanged
    return state;
  } catch (error) {
    stateErrorHandler('Failed to apply reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Get achievement progress for display
 */
export function getAchievementProgress(
  state: GameState, 
  achievementKey: AchievementKey
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

/**
 * Mark achievement notification as shown
 */
export function markNotificationShown(
  state: GameState, 
  achievementKey: AchievementKey
): GameState {
  try {
    // Ensure achievements state exists
    if (!state.achievements) {
      return state;
    }

    const newNotifications = state.achievements.notifications.map(notification => 
      notification.achievementKey === achievementKey 
        ? { ...notification, shown: true }
        : notification
    );

    return {
      ...state,
      achievements: {
        ...state.achievements,
        notifications: newNotifications
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to mark notification as shown', { 
      achievementKey,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Get achievement statistics
 */
export function getAchievementStats(state: GameState) {
  try {
    const achievements = Object.values(ACHIEVEMENTS);
    const unlocked = state.achievements?.unlocked || {};
    
    const categoryBreakdown: Record<string, number> = {};
    const rarityBreakdown: Record<string, number> = {};
    
    achievements.forEach(achievement => {
      if (unlocked[achievement.key]) {
        categoryBreakdown[achievement.category] = (categoryBreakdown[achievement.category] || 0) + 1;
        rarityBreakdown[achievement.rarity] = (rarityBreakdown[achievement.rarity] || 0) + 1;
      }
    });

    const recentUnlocks = (state.achievements?.notifications || [])
      .filter(n => !n.shown)
      .slice(-10)
      .map(n => n.achievementKey);

    return {
      totalAchievements: achievements.length,
      unlockedAchievements: Object.keys(unlocked).length,
      completionPercentage: (Object.keys(unlocked).length / achievements.length) * 100,
      totalPoints: state.achievements.totalPoints,
      maxPoints: achievements.reduce((total, a) => total + a.points, 0),
      categoryBreakdown,
      rarityBreakdown,
      recentUnlocks
    };
  } catch (error) {
    stateErrorHandler('Failed to get achievement stats', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return {
      totalAchievements: 0,
      unlockedAchievements: 0,
      completionPercentage: 0,
      totalPoints: 0,
      maxPoints: 0,
      categoryBreakdown: {},
      rarityBreakdown: {},
      recentUnlocks: []
    };
  }
}
