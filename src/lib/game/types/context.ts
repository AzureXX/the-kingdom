import type { ActionKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey, ResourceCost } from './index';
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
  costFor: (key: BuildingKey) => ResourceCost;
  canAfford: (cost: ResourceCost) => boolean;
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
  fps: number;
  frameCount: number;
  averageTickTime: number;
  averageRenderTime: number;
  performanceScore: number;
}

export interface PerformanceSuggestion {
  type: 'warning' | 'info' | 'optimization';
  message: string;
  priority: 'low' | 'medium' | 'high';
}

/**
 * Validation result for game operations
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Game operation result with validation
 */
export interface GameOperationResult {
  success: boolean;
  validation: ValidationResult;
  message?: string;
}
