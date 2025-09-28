// Types index file - re-exports all game types

// Resource types
export type {
  ResourceKey,
  ResourceDef,
  ResourceCost,
  ResourceProduction,
  ResourceConsumption,
  ResourceAmount,
  ResourceOperation,
} from '@/lib/game/types/resources';

// Building types
export type {
  BuildingKey,
  BuildingDef,
} from '@/lib/game/types/buildings';

// Technology types
export type {
  TechnologyKey,
  TechnologyDef,
} from '@/lib/game/types/technologies';

// Prestige types
export type {
  PrestigeUpgradeKey,
  PrestigeUpgradeDef,
} from '@/lib/game/types/prestige';

// Event types
export type {
  EventKey,
  EventChoice,
  EventDef,
} from '@/lib/game/types/events';

// Action types
export type {
  ActionKey,
  ActionDef,
  ActionStatus,
  ActionUnlocks,
  ActionCooldowns,
  ActionUnlockCondition,
} from '@/lib/game/types/actions';

// Loop Action types
export type {
  LoopActionKey,
  LoopActionDef,
  LoopActionState,
  LoopActionProgress,
  LoopActionSettings,
  LoopActionCategory,
} from '@/lib/game/types/loopActions';

// Achievement types
export type {
  AchievementKey,
  AchievementCategory,
  AchievementRarity,
  AchievementRequirementType,
  AchievementOperator,
  AchievementRewardType,
  AchievementRequirement,
  AchievementReward,
  AchievementDef,
  AchievementNotification,
  AchievementProgress,
  AchievementState,
  AchievementFilter,
  AchievementSortOption,
  AchievementCheckContext,
  AchievementValidationResult,
  AchievementStats,
} from '@/lib/game/types/achievements';

// Game state types
export type {
  GameState,
  Multipliers,
  // Focused state interfaces for better maintainability
  CoreGameState,
  ResourceState,
  BuildingState,
  TechnologyState,
  PrestigeState,
  EventState,
  ResearchState,
  ActionState,
  LoopActionSystemState,
  AchievementSystemState,
} from '@/lib/game/types/game';
