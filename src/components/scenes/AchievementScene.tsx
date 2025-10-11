"use client";

import React, { useState } from 'react';
import { AchievementList } from '@/components/game/AchievementList';
import { useAchievements } from '@/hooks';
import { formatBonusValue, getResourceDisplayName } from '@/lib/game/utils/achievement';
import type { AchievementFilter, AchievementSortOption, GameState, ResourceKey } from '@/lib/game/types';
import styles from '@/styles/components/scenes/AchievementScene.module.scss';

interface AchievementSceneProps {
  state: GameState;
  onAchievementClick?: (achievementKey: string) => void;
}

export function AchievementScene({ onAchievementClick }: AchievementSceneProps) {
  const { stats, pendingNotifications, bonusSummary } = useAchievements();
  const [filter, setFilter] = useState<AchievementFilter>({});
  const [sortBy, setSortBy] = useState<AchievementSortOption>('progress');
  const [showStats, setShowStats] = useState(false);
  const [showBonuses, setShowBonuses] = useState(false);

  const handleAchievementClick = (achievementKey: string) => {
    if (onAchievementClick) {
      onAchievementClick(achievementKey);
    }
  };

  const handleFilterChange = (newFilter: Partial<AchievementFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleSortChange = (newSortBy: AchievementSortOption) => {
    setSortBy(newSortBy);
  };

  const getCompletionPercentage = () => {
    return Math.round(stats.completionPercentage);
  };

  const getRarityBreakdown = () => {
    return Object.entries(stats.rarityBreakdown).map(([rarity, count]) => ({
      rarity,
      count,
      percentage: Math.round((count / stats.unlockedAchievements) * 100) || 0
    }));
  };

  const getCategoryBreakdown = () => {
    return Object.entries(stats.categoryBreakdown).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / stats.unlockedAchievements) * 100) || 0
    }));
  };

  const getResourceBreakdown = () => {
    const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
    return allResources.map(resource => {
      const breakdown = bonusSummary.resourceBreakdown[resource];
      if (!breakdown) return null;
      
      return {
        resource,
        name: getResourceDisplayName(resource),
        ...breakdown
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  };


  return (
    <div className={styles.achievementScene}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>
            🏆 Achievements
            {pendingNotifications.length > 0 && (
              <span className={styles.notificationBadge}>
                {pendingNotifications.length}
              </span>
            )}
          </h2>
          <p className={styles.subtitle}>
            Complete achievements to earn rewards and track your progress
          </p>
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.unlockedAchievements}</div>
            <div className={styles.statLabel}>Unlocked</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.totalAchievements}</div>
            <div className={styles.statLabel}>Total</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{getCompletionPercentage()}%</div>
            <div className={styles.statLabel}>Complete</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.totalPoints}</div>
            <div className={styles.statLabel}>Points</div>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category:</label>
            <select
              value={filter.category || 'all'}
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
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Rarity:</label>
            <select
              value={filter.rarity || 'all'}
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
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status:</label>
            <select
              value={filter.status || 'all'}
              onChange={(e) => handleFilterChange({ status: e.target.value as AchievementFilter['status'] })}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="unlocked">Unlocked</option>
              <option value="locked">Locked</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
        </div>

        <div className={styles.sortControls}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as AchievementSortOption)}
              className={styles.filterSelect}
            >
              <option value="progress">Progress</option>
              <option value="points">Points</option>
              <option value="name">Name</option>
              <option value="rarity">Rarity</option>
              <option value="category">Category</option>
              <option value="unlock_time">Unlock Time</option>
            </select>
          </div>

          <button
            className={styles.statsButton}
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>

          <button
            className={styles.statsButton}
            onClick={() => setShowBonuses(!showBonuses)}
          >
            {showBonuses ? 'Hide Bonuses' : 'Show Bonuses'}
          </button>

        </div>
      </div>

      {showStats && (
        <div className={styles.statsPanel}>
          <div className={styles.statsGrid}>
            <div className={styles.statsSection}>
              <h3 className={styles.statsTitle}>Rarity Breakdown</h3>
              <div className={styles.breakdownList}>
                {getRarityBreakdown().map(({ rarity, count, percentage }) => (
                  <div key={rarity} className={styles.breakdownItem}>
                    <span className={styles.breakdownLabel}>{rarity}</span>
                    <span className={styles.breakdownValue}>{count} ({percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.statsSection}>
              <h3 className={styles.statsTitle}>Category Breakdown</h3>
              <div className={styles.breakdownList}>
                {getCategoryBreakdown().map(({ category, count, percentage }) => (
                  <div key={category} className={styles.breakdownItem}>
                    <span className={styles.breakdownLabel}>{category}</span>
                    <span className={styles.breakdownValue}>{count} ({percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showBonuses && (
        <div className={styles.bonusPanel}>
          <div className={styles.bonusHeader}>
            <h3 className={styles.bonusTitle}>🎁 Total Achievement Bonuses</h3>
            <p className={styles.bonusSubtitle}>Active bonuses from all unlocked achievements</p>
          </div>
          
          <div className={styles.bonusGrid}>
            {/* Production Bonuses Section */}
            <div className={styles.bonusSection}>
              <h4 className={styles.bonusSectionTitle}>📈 Production Bonuses</h4>
              <p className={styles.bonusSectionDescription}>Bonuses that affect your automatic resource production per second</p>
              <div className={styles.bonusStats}>
                <div className={styles.bonusStat}>
                  <span className={styles.bonusLabel}>Resource Gain Bonus:</span>
                  <span className={styles.bonusValue}>+{bonusSummary.totalResourceGain.toFixed(0)}/s</span>
                </div>
                <div className={styles.bonusStat}>
                  <span className={styles.bonusLabel}>Production Multiplier:</span>
                  <span className={styles.bonusValue}>+{bonusSummary.totalResourceMultipliers.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Click Bonuses Section */}
            <div className={styles.bonusSection}>
              <h4 className={styles.bonusSectionTitle}>🖱️ Click Bonuses</h4>
              <p className={styles.bonusSectionDescription}>Bonuses that affect your manual click actions</p>
              <div className={styles.bonusStats}>
                <div className={styles.bonusStat}>
                  <span className={styles.bonusLabel}>Click Gain Bonus:</span>
                  <span className={styles.bonusValue}>+{bonusSummary.totalClickBonuses.toFixed(0)}</span>
                </div>
                <div className={styles.bonusStat}>
                  <span className={styles.bonusLabel}>Click Multiplier:</span>
                  <span className={styles.bonusValue}>+{bonusSummary.totalClickMultipliers.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Loop Bonuses Section */}
            <div className={styles.bonusSection}>
              <h4 className={styles.bonusSectionTitle}>🔄 Loop Bonuses</h4>
              <p className={styles.bonusSectionDescription}>Bonuses that affect your automated loop actions</p>
              <div className={styles.bonusStats}>
                <div className={styles.bonusStat}>
                  <span className={styles.bonusLabel}>Loop Gain Bonus:</span>
                  <span className={styles.bonusValue}>+{bonusSummary.totalLoopBonuses.toFixed(0)}</span>
                </div>
                <div className={styles.bonusStat}>
                  <span className={styles.bonusLabel}>Loop Multiplier:</span>
                  <span className={styles.bonusValue}>+{bonusSummary.totalLoopMultipliers.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.resourceBreakdown}>
            <h4 className={styles.bonusSectionTitle}>📊 Resource Breakdown</h4>
            <div className={styles.resourceGrid}>
              {getResourceBreakdown().map(({ resource, name, resourceGain, resourceMultiplier, clickGain, clickMultiplier, loopGain, loopMultiplier }) => (
                <div key={resource} className={styles.resourceCard}>
                  <h5 className={styles.resourceName}>{name}</h5>
                  <div className={styles.resourceBonuses}>
                    {/* Production Bonuses */}
                    {(resourceGain > 0 || resourceMultiplier > 1) && (
                      <div className={styles.bonusCategory}>
                        <span className={styles.bonusCategoryTitle}>📈 Production:</span>
                        {resourceGain > 0 && (
                          <div className={styles.resourceBonus}>
                            <span className={styles.bonusType}>Gain:</span>
                            <span className={styles.bonusValue}>+{formatBonusValue(resourceGain, 'gain')}/s</span>
                          </div>
                        )}
                        {resourceMultiplier > 1 && (
                          <div className={styles.resourceBonus}>
                            <span className={styles.bonusType}>Multiplier:</span>
                            <span className={styles.bonusValue}>{formatBonusValue(resourceMultiplier, 'multiplier')}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Click Bonuses */}
                    {(clickGain > 0 || clickMultiplier > 1) && (
                      <div className={styles.bonusCategory}>
                        <span className={styles.bonusCategoryTitle}>🖱️ Click:</span>
                        {clickGain > 0 && (
                          <div className={styles.resourceBonus}>
                            <span className={styles.bonusType}>Gain:</span>
                            <span className={styles.bonusValue}>+{formatBonusValue(clickGain, 'gain')}</span>
                          </div>
                        )}
                        {clickMultiplier > 1 && (
                          <div className={styles.resourceBonus}>
                            <span className={styles.bonusType}>Multiplier:</span>
                            <span className={styles.bonusValue}>{formatBonusValue(clickMultiplier, 'multiplier')}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Loop Bonuses */}
                    {(loopGain > 0 || loopMultiplier > 1) && (
                      <div className={styles.bonusCategory}>
                        <span className={styles.bonusCategoryTitle}>🔄 Loop:</span>
                        {loopGain > 0 && (
                          <div className={styles.resourceBonus}>
                            <span className={styles.bonusType}>Gain:</span>
                            <span className={styles.bonusValue}>+{formatBonusValue(loopGain, 'gain')}</span>
                          </div>
                        )}
                        {loopMultiplier > 1 && (
                          <div className={styles.resourceBonus}>
                            <span className={styles.bonusType}>Multiplier:</span>
                            <span className={styles.bonusValue}>{formatBonusValue(loopMultiplier, 'multiplier')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search achievements..."
          value={filter.search || ''}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className={styles.searchInput}
        />
      </div>

      <AchievementList
        filter={filter}
        sortBy={sortBy}
        onAchievementClick={handleAchievementClick}
        className={styles.achievementList}
      />
    </div>
  );
}
