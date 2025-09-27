"use client";

import React, { useState, useMemo } from 'react';
import { AchievementCard } from './AchievementCard';
import { useAchievements } from '@/lib/game/hooks';
import type { AchievementFilter, AchievementSortOption } from '@/lib/game/types';
import styles from '@/styles/components/game/AchievementList.module.scss';

interface AchievementListProps {
  filter?: AchievementFilter;
  sortBy?: AchievementSortOption;
  compact?: boolean;
  onAchievementClick?: (achievementKey: string) => void;
  className?: string;
}

export function AchievementList({ 
  filter = {}, 
  sortBy = 'progress',
  compact = false,
  onAchievementClick,
  className = ''
}: AchievementListProps) {
  const { getFilteredAchievements } = useAchievements();
  const [localFilter, setLocalFilter] = useState<AchievementFilter>(filter);
  const [localSortBy, setLocalSortBy] = useState<AchievementSortOption>(sortBy);

  const achievements = useMemo(() => {
    return getFilteredAchievements(localFilter, localSortBy);
  }, [getFilteredAchievements, localFilter, localSortBy]);

  const handleFilterChange = (newFilter: Partial<AchievementFilter>) => {
    setLocalFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleSortChange = (newSortBy: AchievementSortOption) => {
    setLocalSortBy(newSortBy);
  };

  const handleAchievementClick = (achievementKey: string) => {
    if (onAchievementClick) {
      onAchievementClick(achievementKey);
    }
  };

  return (
    <div className={`${styles.achievementList} ${className}`}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          <select
            value={localFilter.category || 'all'}
            onChange={(e) => handleFilterChange({ category: e.target.value as AchievementFilter['category'] })}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            <option value="resource">Resources</option>
            <option value="building">Buildings</option>
            <option value="technology">Technology</option>
            <option value="action">Actions</option>
            <option value="prestige">Prestige</option>
            <option value="event">Events</option>
            <option value="time">Time</option>
            <option value="misc">Miscellaneous</option>
          </select>

          <select
            value={localFilter.rarity || 'all'}
            onChange={(e) => handleFilterChange({ rarity: e.target.value as AchievementFilter['rarity'] })}
            className={styles.filterSelect}
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>

          <select
            value={localFilter.status || 'all'}
            onChange={(e) => handleFilterChange({ status: e.target.value as AchievementFilter['status'] })}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="unlocked">Unlocked</option>
            <option value="locked">Locked</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>

        <div className={styles.sortControls}>
          <label htmlFor="sort-select" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={localSortBy}
            onChange={(e) => handleSortChange(e.target.value as AchievementSortOption)}
            className={styles.sortSelect}
          >
            <option value="progress">Progress</option>
            <option value="points">Points</option>
            <option value="name">Name</option>
            <option value="rarity">Rarity</option>
            <option value="category">Category</option>
            <option value="unlock_time">Unlock Time</option>
          </select>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search achievements..."
          value={localFilter.search || ''}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.achievementsGrid}>
        {achievements.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No achievements found matching your filters.</p>
          </div>
        ) : (
          achievements.map((achievement) => (
            <AchievementCard
              key={achievement.key}
              achievement={achievement}
              onClick={handleAchievementClick}
              compact={compact}
            />
          ))
        )}
      </div>
    </div>
  );
}
