"use client";

import React, { useState } from 'react';
import { AchievementList } from '@/components/game/AchievementList';
import { useAchievements } from '@/hooks';
import { formatBonusValue } from '@/lib/game/utils/achievement';
import type { AchievementFilter, AchievementSortOption, GameState, ResourceKey } from '@/lib/game/types';
import styles from '@/styles/components/scenes/AchievementScene.module.scss';

interface AchievementSceneProps {
  state: GameState;
  onAchievementClick?: (achievementKey: string) => void;
}

export function AchievementScene({ onAchievementClick }: AchievementSceneProps) {
  const { stats, pendingNotifications, allMultipliers } = useAchievements();
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
            <h3 className={styles.bonusTitle}>🎁 All Achievement Bonuses</h3>
            <p className={styles.bonusSubtitle}>Complete list of all active bonuses from unlocked achievements</p>
          </div>
          
          <div className={styles.multiplierList}>
            {/* Resource Production Bonuses */}
            {allMultipliers.resourceGain.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>📈 Resource Production Gain</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.resourceGain.map(({ resource, name, value }: { resource: ResourceKey; name: string; value: number }) => (
                    <div key={`resource-gain-${resource}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{name} Production:</span>
                      <span className={styles.multiplierValue}>+{formatBonusValue(value, 'gain')}/s</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resource Production Multipliers */}
            {allMultipliers.resourceGainMultiplier.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>📈 Resource Production Multipliers</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.resourceGainMultiplier.map(({ resource, name, value }: { resource: ResourceKey; name: string; value: number }) => (
                    <div key={`resource-mult-${resource}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{name} Production:</span>
                      <span className={styles.multiplierValue}>{formatBonusValue(value, 'multiplier')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Building Production Bonuses */}
            {allMultipliers.buildingGain.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🏗️ Building Production Gain</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.buildingGain.map(({ building, resourceName, value }: { building: string; resourceName: string; value: number }) => (
                    <div key={`building-gain-${building}-${resourceName}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{building} → {resourceName}:</span>
                      <span className={styles.multiplierValue}>+{formatBonusValue(value, 'gain')}/s</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Building Production Multipliers */}
            {allMultipliers.buildingGainMultiplier.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🏗️ Building Production Multipliers</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.buildingGainMultiplier.map(({ building, resourceName, value }: { building: string; resourceName: string; value: number }) => (
                    <div key={`building-mult-${building}-${resourceName}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{building} → {resourceName}:</span>
                      <span className={styles.multiplierValue}>{formatBonusValue(value, 'multiplier')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Click Action Bonuses */}
            {allMultipliers.clickGain.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🖱️ Click Action Gain</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.clickGain.map(({ resource, name, value }: { resource: ResourceKey; name: string; value: number }) => (
                    <div key={`click-gain-${resource}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{name} Click Actions:</span>
                      <span className={styles.multiplierValue}>+{formatBonusValue(value, 'gain')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Click Action Multipliers */}
            {allMultipliers.clickMultiplier.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🖱️ Click Action Multipliers</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.clickMultiplier.map(({ resource, name, value }: { resource: ResourceKey; name: string; value: number }) => (
                    <div key={`click-mult-${resource}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{name} Click Actions:</span>
                      <span className={styles.multiplierValue}>{formatBonusValue(value, 'multiplier')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action-Specific Click Bonuses */}
            {allMultipliers.actionClickGain.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>⚔️ Action-Specific Click Gain</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.actionClickGain.map(({ action, resourceName, value }: { action: string; resourceName: string; value: number }) => (
                    <div key={`action-click-gain-${action}-${resourceName}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{action} → {resourceName}:</span>
                      <span className={styles.multiplierValue}>+{formatBonusValue(value, 'gain')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action-Specific Click Multipliers */}
            {allMultipliers.actionClickMultiplier.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>⚔️ Action-Specific Click Multipliers</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.actionClickMultiplier.map(({ action, resourceName, value }: { action: string; resourceName: string; value: number }) => (
                    <div key={`action-click-mult-${action}-${resourceName}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{action} → {resourceName}:</span>
                      <span className={styles.multiplierValue}>{formatBonusValue(value, 'multiplier')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loop Action Bonuses */}
            {allMultipliers.loopGain.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🔄 Loop Action Gain</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.loopGain.map(({ resource, name, value }: { resource: ResourceKey; name: string; value: number }) => (
                    <div key={`loop-gain-${resource}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{name} Loop Actions:</span>
                      <span className={styles.multiplierValue}>+{formatBonusValue(value, 'gain')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loop Action Multipliers */}
            {allMultipliers.loopMultiplier.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🔄 Loop Action Multipliers</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.loopMultiplier.map(({ resource, name, value }: { resource: ResourceKey; name: string; value: number }) => (
                    <div key={`loop-mult-${resource}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{name} Loop Actions:</span>
                      <span className={styles.multiplierValue}>{formatBonusValue(value, 'multiplier')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action-Specific Loop Bonuses */}
            {allMultipliers.actionLoopGain.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🔄 Action-Specific Loop Gain</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.actionLoopGain.map(({ action, resourceName, value }: { action: string; resourceName: string; value: number }) => (
                    <div key={`action-loop-gain-${action}-${resourceName}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{action} → {resourceName}:</span>
                      <span className={styles.multiplierValue}>+{formatBonusValue(value, 'gain')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action-Specific Loop Multipliers */}
            {allMultipliers.actionLoopMultiplier.length > 0 && (
              <div className={styles.multiplierSection}>
                <h4 className={styles.multiplierSectionTitle}>🔄 Action-Specific Loop Multipliers</h4>
                <div className={styles.multiplierItems}>
                  {allMultipliers.actionLoopMultiplier.map(({ action, resourceName, value }: { action: string; resourceName: string; value: number }) => (
                    <div key={`action-loop-mult-${action}-${resourceName}`} className={styles.multiplierItem}>
                      <span className={styles.multiplierLabel}>{action} → {resourceName}:</span>
                      <span className={styles.multiplierValue}>{formatBonusValue(value, 'multiplier')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Object.values(allMultipliers).every((arr: unknown[]) => arr.length === 0) && (
              <div className={styles.noBonuses}>
                <p>No achievement bonuses active yet. Complete some achievements to unlock bonuses!</p>
              </div>
            )}
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
