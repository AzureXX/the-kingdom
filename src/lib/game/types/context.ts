import type { ActionKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey } from './index';
import type { LoopActionKey } from './loopActions';

/**
 * Interface for all game action handlers
 */
export interface GameActionHandlers {
  handleExecuteAction: (key: ActionKey) => void;
  handleBuyBuilding: (key: BuildingKey) => void;
  handleBuyUpgrade: (key: PrestigeUpgradeKey) => void;
  handleResearchTechnology: (key: TechnologyKey) => void;
  handleDoPrestige: () => void;
  handleToggleLoopAction: (actionKey: LoopActionKey) => void;
  handleTogglePause: () => void;
}

/**
 * Interface for utility functions
 */
export interface GameUtilityFunctions {
  fmt: (n: number, decimals?: number) => string;
  costFor: (key: BuildingKey) => Partial<Record<string, number>>;
  canAfford: (cost: Partial<Record<string, number>>) => boolean;
}

/**
 * Interface for time-related properties
 */
export interface GameTimeInfo {
  lastSavedAt: number | null;
  timeUntilNextEvent: string;
  secondsUntilNextEvent: number;
  timeUntilNextSave: string;
  secondsUntilNextSave: number;
}

/**
 * Interface for performance metrics
 */
export interface PerformanceMetrics {
  tickTime: number;
  renderTime: number;
  memoryUsage: number;
}
