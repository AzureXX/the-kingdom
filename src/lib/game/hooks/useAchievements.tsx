"use client";

import { useCallback, useMemo } from 'react';
import { useGameStateContext } from '@/lib/game/providers';
import { 
  checkAchievements, 
  getAchievementProgress, 
  markNotificationShown, 
  getAchievementStats 
} from '@/lib/game/utils/achievement';
import { ACHIEVEMENTS } from '@/lib/game/config/achievements';
import type { 
  AchievementKey, 
  AchievementDef, 
  AchievementFilter, 
  AchievementSortOption,
  AchievementStats 
} from '@/lib/game/types';

/**
 * Hook for managing achievement-related functionality
 */
export function useAchievements() {
  const { state, setState } = useGameStateContext();

  /**
   * Get all achievements with their current progress
   */
  const achievements = useMemo(() => {
    if (!state) return [];

    // Ensure achievements state exists
    const achievementsState = state.achievements || {
      unlocked: {},
      progress: {},
      notifications: [],
      totalPoints: 0,
      stats: {
        unlockedCount: 0,
        sessionUnlocks: 0
      }
    };

    return Object.entries(ACHIEVEMENTS).map(([key, achievement]) => {
      const progress = getAchievementProgress(state, key as AchievementKey);
      const unlocked = !!achievementsState.unlocked[key];
      const unlockLevel = achievementsState.unlocked[key] || 0;

      return {
        ...achievement,
        progress,
        unlocked,
        unlockLevel
      };
    });
  }, [state]);

  /**
   * Get filtered and sorted achievements
   */
  const getFilteredAchievements = useCallback((
    filter: AchievementFilter = {},
    sortBy: AchievementSortOption = 'progress'
  ) => {
    let filtered = achievements;

    // Apply category filter
    if (filter.category && filter.category !== 'all') {
      filtered = filtered.filter(a => a.category === filter.category);
    }

    // Apply rarity filter
    if (filter.rarity && filter.rarity !== 'all') {
      filtered = filtered.filter(a => a.rarity === filter.rarity);
    }

    // Apply status filter
    if (filter.status) {
      switch (filter.status) {
        case 'unlocked':
          filtered = filtered.filter(a => a.unlocked);
          break;
        case 'locked':
          filtered = filtered.filter(a => !a.unlocked);
          break;
        case 'in_progress':
          filtered = filtered.filter(a => !a.unlocked && a.progress.progress > 0);
          break;
      }
    }

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchLower) ||
        a.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'points':
          return b.points - a.points;
        case 'progress':
          return b.progress.progress - a.progress.progress;
        case 'rarity':
          const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'category':
          return a.category.localeCompare(b.category);
        case 'unlock_time':
          // Sort by unlock time (unlocked first, then by progress)
          if (a.unlocked && !b.unlocked) return -1;
          if (!a.unlocked && b.unlocked) return 1;
          return b.progress.progress - a.progress.progress;
        default:
          return 0;
      }
    });

    return filtered;
  }, [achievements]);

  /**
   * Get achievement by key
   */
  const getAchievement = useCallback((key: AchievementKey) => {
    return achievements.find(a => a.key === key);
  }, [achievements]);

  /**
   * Get achievements by category
   */
  const getAchievementsByCategory = useCallback((category: string) => {
    return achievements.filter(a => category === 'all' || a.category === category);
  }, [achievements]);

  /**
   * Get achievements by rarity
   */
  const getAchievementsByRarity = useCallback((rarity: string) => {
    return achievements.filter(a => rarity === 'all' || a.rarity === rarity);
  }, [achievements]);

  /**
   * Get unlocked achievements
   */
  const getUnlockedAchievements = useCallback(() => {
    return achievements.filter(a => a.unlocked);
  }, [achievements]);

  /**
   * Get locked achievements
   */
  const getLockedAchievements = useCallback(() => {
    return achievements.filter(a => !a.unlocked);
  }, [achievements]);

  /**
   * Get achievements in progress
   */
  const getInProgressAchievements = useCallback(() => {
    return achievements.filter(a => !a.unlocked && a.progress.progress > 0);
  }, [achievements]);

  /**
   * Get achievement statistics
   */
  const stats: AchievementStats = useMemo(() => {
    if (!state) {
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

    // Ensure achievements state exists
    if (!state.achievements) {
      return {
        totalAchievements: Object.keys(ACHIEVEMENTS).length,
        unlockedAchievements: 0,
        completionPercentage: 0,
        totalPoints: 0,
        maxPoints: Object.values(ACHIEVEMENTS).reduce((total, a) => total + a.points, 0),
        categoryBreakdown: {},
        rarityBreakdown: {},
        recentUnlocks: []
      };
    }

    return getAchievementStats(state);
  }, [state]);

  /**
   * Get pending notifications
   */
  const pendingNotifications = useMemo(() => {
    if (!state || !state.achievements) return [];
    return state.achievements.notifications.filter(n => !n.shown);
  }, [state]);

  /**
   * Mark notification as shown
   */
  const markNotificationAsShown = useCallback((achievementKey: AchievementKey) => {
    if (!state) return;
    
    const newState = markNotificationShown(state, achievementKey);
    setState(newState);
  }, [state, setState]);

  /**
   * Check achievements (called by game loop)
   */
  const checkAchievementsNow = useCallback(() => {
    if (!state) return;
    
    const newState = checkAchievements(state);
    if (newState !== state) {
      setState(newState);
    }
  }, [state, setState]);

  /**
   * Get achievement progress for display
   */
  const getProgressDisplay = useCallback((achievement: AchievementDef) => {
    const progress = getAchievementProgress(state!, achievement.key);
    
    if (progress.isComplete) {
      return 'Complete';
    }
    
    if (progress.targetValue > 0) {
      return `${Math.floor(progress.currentValue)} / ${progress.targetValue}`;
    }
    
    return `${Math.floor(progress.progress * 100)}%`;
  }, [state]);

  /**
   * Get achievement rarity color
   */
  const getRarityColor = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common': return '#9CA3AF'; // gray
      case 'uncommon': return '#10B981'; // green
      case 'rare': return '#3B82F6'; // blue
      case 'epic': return '#8B5CF6'; // purple
      case 'legendary': return '#F59E0B'; // orange
      default: return '#9CA3AF';
    }
  }, []);

  /**
   * Get achievement category icon
   */
  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'resource': return '🪙';
      case 'building': return '🏗️';
      case 'technology': return '🔬';
      case 'action': return '⚔️';
      case 'prestige': return '👑';
      case 'event': return '🎲';
      case 'time': return '⏰';
      case 'misc': return '🎯';
      default: return '🏆';
    }
  }, []);

  return {
    // Data
    achievements,
    stats,
    pendingNotifications,
    
    // Filtering and sorting
    getFilteredAchievements,
    getAchievement,
    getAchievementsByCategory,
    getAchievementsByRarity,
    getUnlockedAchievements,
    getLockedAchievements,
    getInProgressAchievements,
    
    // Actions
    markNotificationAsShown,
    checkAchievementsNow,
    
    // Utilities
    getProgressDisplay,
    getRarityColor,
    getCategoryIcon
  };
}
