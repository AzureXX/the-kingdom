// Achievement system type definitions

import type { GameState } from './game';


/**
 * Unique identifier for an achievement
 * Using string type for compatibility with dynamic key access patterns
 */
export type AchievementKey = string;

/**
 * Categories for organizing achievements
 */
export type AchievementCategory = 
  | 'resource' 
  | 'building' 
  | 'technology' 
  | 'action' 
  | 'prestige' 
  | 'event' 
  | 'time' 
  | 'misc';

/**
 * Rarity levels for achievements
 */
export type AchievementRarity = 
  | 'common' 
  | 'uncommon' 
  | 'rare' 
  | 'epic' 
  | 'legendary';

/**
 * Types of achievement requirements
 */
export type AchievementRequirementType = 
  | 'resource' 
  | 'building' 
  | 'technology' 
  | 'action' 
  | 'event' 
  | 'time' 
  | 'click' 
  | 'prestige' 
  | 'combo';

/**
 * Comparison operators for requirements
 */
export type AchievementOperator = '>=' | '>' | '=' | '<=' | '<';

/**
 * Types of achievement rewards
 */
export type AchievementRewardType = 
  | 'resource' 
  | 'multiplier' 
  | 'unlock' 
  | 'cosmetic';

/**
 * Individual requirement for an achievement
 */
export interface AchievementRequirement {
  /** Type of requirement */
  type: AchievementRequirementType;
  /** Target resource/building/technology/etc. */
  target: string;
  /** Required value/amount */
  value: number;
  /** Comparison operator (default: '>=') */
  operator?: AchievementOperator;
  /** Timeframe for time-based achievements (seconds) */
  timeframe?: number;
}

/**
 * Reward given for completing an achievement
 */
export interface AchievementReward {
  /** Type of reward */
  type: AchievementRewardType;
  /** Target resource/multiplier/etc. */
  target: string;
  /** Reward value */
  value: number;
  /** Whether reward persists through prestige */
  permanent: boolean;
}

/**
 * Complete achievement definition
 */
export interface AchievementDef {
  /** Unique identifier */
  key: AchievementKey;
  /** Display name */
  name: string;
  /** Description text */
  description: string;
  /** Icon (emoji or SVG reference) */
  icon: string;
  /** Category for organization */
  category: AchievementCategory;
  /** Rarity level */
  rarity: AchievementRarity;
  /** Points awarded for completion */
  points: number;
  /** Requirements to unlock */
  requirements: AchievementRequirement[];
  /** Rewards given on unlock */
  rewards: AchievementReward[];
  /** Whether to hide until unlocked */
  hidden: boolean;
  /** Whether it can be earned multiple times */
  repeatable: boolean;
  /** Maximum level for tiered achievements */
  maxLevel?: number;
}

/**
 * Achievement notification for UI display
 */
export interface AchievementNotification {
  /** Achievement that was unlocked */
  achievementKey: AchievementKey;
  /** When it was unlocked (timestamp) */
  timestamp: number;
  /** Level for tiered achievements */
  level?: number;
  /** Whether notification has been shown */
  shown: boolean;
}

/**
 * Achievement progress tracking
 */
export interface AchievementProgress {
  /** Current progress (0.0 to 1.0) */
  progress: number;
  /** Current value for the primary requirement */
  currentValue: number;
  /** Target value for the primary requirement */
  targetValue: number;
  /** Whether all requirements are met */
  isComplete: boolean;
}

/**
 * Achievement state in game save
 */
export type AchievementState = {
  /** Unlocked achievements (key -> unlock count/level) */
  unlocked: Record<AchievementKey, number>;
  /** Progress toward achievements (key -> progress value) */
  progress: Record<AchievementKey, number>;
  /** Pending notifications */
  notifications: AchievementNotification[];
  /** Total achievement points earned */
  totalPoints: number;
  /** Achievement statistics */
  stats: {
    /** Total achievements unlocked */
    unlockedCount: number;
    /** Achievements unlocked this session */
    sessionUnlocks: number;
    /** Last achievement unlocked */
    lastUnlocked?: AchievementKey;
    /** Last unlock timestamp */
    lastUnlockTime?: number;
  };
};

/**
 * Achievement filter options for UI
 */
export type AchievementFilter = {
  /** Category filter */
  category?: AchievementCategory | 'all';
  /** Rarity filter */
  rarity?: AchievementRarity | 'all';
  /** Completion status filter */
  status?: 'all' | 'unlocked' | 'locked' | 'in_progress';
  /** Search text */
  search?: string;
};

/**
 * Achievement sort options for UI
 */
export type AchievementSortOption = 
  | 'name' 
  | 'points' 
  | 'progress' 
  | 'rarity' 
  | 'category' 
  | 'unlock_time';

/**
 * Achievement checking context
 */
export type AchievementCheckContext = {
  /** Current game state */
  state: GameState;
  /** Time since last check (seconds) */
  deltaTime: number;
  /** Whether this is a full check or incremental */
  fullCheck: boolean;
  /** Specific achievements to check (if any) */
  specificAchievements?: AchievementKey[];
};

/**
 * Achievement validation result
 */
export type AchievementValidationResult = {
  /** Whether the achievement definition is valid */
  isValid: boolean;
  /** Validation errors */
  errors: string[];
  /** Validation warnings */
  warnings: string[];
};

/**
 * Achievement statistics for analytics
 */
export type AchievementStats = {
  /** Total achievements defined */
  totalAchievements: number;
  /** Achievements unlocked by player */
  unlockedAchievements: number;
  /** Completion percentage */
  completionPercentage: number;
  /** Points earned */
  totalPoints: number;
  /** Points available */
  maxPoints: number;
  /** Achievements by category */
  categoryBreakdown: Record<AchievementCategory, number>;
  /** Achievements by rarity */
  rarityBreakdown: Record<AchievementRarity, number>;
  /** Recent unlocks (last 10) */
  recentUnlocks: AchievementKey[];
  /** Average time to unlock (for completed achievements) */
  averageUnlockTime?: number;
};
