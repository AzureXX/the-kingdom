import type { ActionKey, BuildingKey, PrestigeUpgradeKey, TechnologyKey, ResourceCost, GameState, ActionStatus, ResourceKey } from './index';
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

/**
 * Common prop interfaces for standardized component patterns
 */

/**
 * Base interface for components that need game state and formatting
 */
export interface BaseGameComponentProps {
  state: GameState;
  fmt: (n: number, decimals?: number) => string;
}

/**
 * Interface for action-related components
 */
export interface ActionComponentProps extends BaseGameComponentProps {
  onExecuteAction: (actionKey: ActionKey) => void;
}

/**
 * Interface for loop action-related components
 */
export interface LoopActionComponentProps {
  gameState: GameState;
  onToggleLoopAction: (actionKey: LoopActionKey) => void;
}

/**
 * Interface for individual action button components
 */
export interface ActionButtonProps {
  actionKey: ActionKey;
  status: ActionStatus;
  onExecute: (actionKey: ActionKey) => void;
  fmt: (n: number, decimals?: number) => string;
}

/**
 * Interface for individual loop action button components
 */
export interface LoopActionButtonProps {
  actionKey: LoopActionKey;
  isActive: boolean;
  currentPoints: number;
  totalLoopsCompleted: number;
  onToggle: (actionKey: LoopActionKey) => void;
  canStart: boolean;
}

/**
 * Base interface for all scene components
 */
export interface BaseSceneProps {
  state: GameState;
  perSec: Partial<Record<ResourceKey, number>>;
  fmt: (n: number, decimals?: number) => string;
}

/**
 * Interface for building-related scene components
 */
export interface BuildingSceneProps extends BaseSceneProps {
  costFor: (key: BuildingKey) => ResourceCost;
  onBuyBuilding: (key: BuildingKey) => void;
}

/**
 * Interface for research-related scene components
 */
export interface ResearchSceneProps extends BaseSceneProps {
  onResearchTechnology: (key: TechnologyKey) => void;
}

/**
 * Interface for prestige-related scene components
 */
export interface PrestigeSceneProps extends BaseSceneProps {
  onDoPrestige: () => void;
}

/**
 * Interface for performance-related scene components
 */
export interface PerformanceSceneProps extends BaseSceneProps {
  // Performance metrics and functions are optional since PerformanceMonitor handles them internally
  performanceMetrics?: PerformanceMetrics;
  performanceFunctions?: {
    getPerformanceSuggestions: () => PerformanceSuggestion[];
  };
}
