// Achievement notification management logic

import type { GameState, AchievementKey } from '@/lib/game/types';
import { createStateErrorHandler } from '@/lib/game/utils/error';

// Create specialized error handler
const stateErrorHandler = createStateErrorHandler('achievementSystem');

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
