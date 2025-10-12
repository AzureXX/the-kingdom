"use client";

import { useCallback, useMemo } from 'react';
import { useGameStateContext } from '@/lib/game/providers';
import { 
  getAchievementProgress, 
  markNotificationShown, 
  getAchievementStats,
  getBonusSummary,
  getAllMultipliers,
  getEmptyAchievementStateObject
} from '@/lib/game/utils/achievement';
import { ACHIEVEMENTS } from '@/lib/game/config/achievements';
import type { 
  AchievementKey, 
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
    const achievementsState = state.achievements || getEmptyAchievementStateObject();

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
   * Get bonus summary
   */
  const bonusSummary = useMemo(() => {
    if (!state) {
      return {
        totalResourceGain: 0,
        totalResourceMultipliers: 0,
        totalClickBonuses: 0,
        totalClickMultipliers: 0,
        totalLoopBonuses: 0,
        totalLoopMultipliers: 0,
        resourceBreakdown: {}
      };
    }
    return getBonusSummary(state);
  }, [state]);

  /**
   * Get all multipliers list
   */
  const allMultipliers = useMemo(() => {
    if (!state) {
      return {
        resourceGain: [],
        resourceGainMultiplier: [],
        buildingGain: [],
        buildingGainMultiplier: [],
        clickGain: [],
        clickMultiplier: [],
        actionClickGain: [],
        actionClickMultiplier: [],
        loopGain: [],
        loopMultiplier: [],
        actionLoopGain: [],
        actionLoopMultiplier: []
      };
    }
    return getAllMultipliers(state);
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


  return {
    // Data
    achievements,
    stats,
    pendingNotifications,
    bonusSummary,
    allMultipliers,
    
    // Filtering and sorting
    getFilteredAchievements,
    
    // Actions
    markNotificationAsShown,
    
    // Utilities
    getRarityColor
  };
}
