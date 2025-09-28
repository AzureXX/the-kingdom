// Achievement checking and unlocking logic

import type { 
  GameState, 
  AchievementKey, 
  AchievementNotification,
} from '@/lib/game/types';
import { ACHIEVEMENTS } from '@/lib/game/config/achievements';
import { calculateAchievementProgress } from './progress';
import { applyAchievementRewards } from './rewards';
import { createValidationErrorHandler, createStateErrorHandler } from '@/lib/game/utils/error';

// Create specialized error handlers
const validationHandler = createValidationErrorHandler('achievementSystem');
const stateErrorHandler = createStateErrorHandler('achievementSystem');

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
        achievements: {
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
        }
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
