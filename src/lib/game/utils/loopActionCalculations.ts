import type { LoopActionState, LoopActionProgress } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { GAME_CONSTANTS } from '@/lib/game/constants';

/**
 * Calculates the base points generated per game tick for loop actions.
 * This value is used as a baseline for all loop action calculations.
 * 
 * @returns The number of points generated per tick
 * 
 * 
 * @remarks
 * - Value is configured in GAME_CONSTANTS.PERFORMANCE.POINTS_PER_TICK
 * - This is the fundamental unit for loop action progress
 */
export function calculatePointsPerTick(): number {
  return GAME_CONSTANTS.PERFORMANCE.POINTS_PER_TICK;
}

/**
 * Calculates the current progress of a loop action based on points accumulated.
 * Provides progress percentage and estimated time remaining.
 * 
 * @param action - The current state of the loop action
 * @returns Progress information including percentage and time estimates
 * 
 * ```typescript
 * const progress = calculateProgress(loopActionState);
 * // Returns: {
 * //   actionKey: 'mining',
 * //   currentPoints: 750,
 * //   pointsRequired: 1000,
 * //   progressPercentage: 75,
 * //   timeRemaining: 1.25,
 * //   loopsCompleted: 2
 * // }
 * ```
 * 
 * @remarks
 * - Progress percentage is calculated as (currentPoints / pointsRequired) * 100
 * - Time remaining is estimated based on points per second performance
 * - Uses GAME_CONSTANTS.PERFORMANCE.POINTS_PER_SECOND for time calculations
 */
export function calculateProgress(action: LoopActionState): LoopActionProgress {
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const pointsRequired = actionDef.loopPointsRequired;
  const progressPercentage = (action.currentPoints / pointsRequired) * 100;
  
  // Calculate time remaining (rough estimate)
  const pointsPerSecond = GAME_CONSTANTS.PERFORMANCE.POINTS_PER_SECOND;
  const pointsRemaining = pointsRequired - action.currentPoints;
  const timeRemaining = pointsRemaining / pointsPerSecond;
  
  return {
    actionKey: action.actionKey,
    currentPoints: action.currentPoints,
    pointsRequired,
    progressPercentage,
    timeRemaining,
    loopsCompleted: action.totalLoopsCompleted,
  };
}

/**
 * Calculates the efficiency of a loop action based on points generated per time unit.
 * Higher efficiency means more points generated in less time.
 * 
 * @param action - The current state of the loop action
 * @returns Efficiency score (points per millisecond)
 * 
 * ```typescript
 * const efficiency = calculateLoopActionEfficiency(loopActionState);
 * // Returns: 0.5 (500 points generated in 1000ms)
 * ```
 * 
 * @remarks
 * - Efficiency = totalPointsGenerated / timeActive
 * - Returns 0 if no loops completed or invalid time
 * - Useful for comparing performance of different loop actions
 * - Time is measured in milliseconds for precision
 */
export function calculateLoopActionEfficiency(action: LoopActionState): number {
  if (action.totalLoopsCompleted === 0) return 0;
  
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const totalPointsGenerated = action.totalLoopsCompleted * actionDef.loopPointsRequired;
  const timeActive = action.lastTickAt - action.startedAt;
  
  if (timeActive <= 0) return 0;
  
  return totalPointsGenerated / timeActive;
}

/**
 * Generates comprehensive statistics for a loop action.
 * Combines progress, efficiency, and status information in a single object.
 * 
 * @param action - The current state of the loop action
 * @returns Complete statistics object with all relevant information
 * 
 * ```typescript
 * const stats = getLoopActionStats(loopActionState);
 * // Returns: {
 * //   name: 'Advanced Mining',
 * //   icon: '⛏️',
 * //   category: 'resource',
 * //   progress: { ... },
 * //   efficiency: 0.5,
 * //   isActive: true,
 * //   isPaused: false,
 * //   totalLoopsCompleted: 5,
 * //   startedAt: 1234567890
 * // }
 * ```
 * 
 * @remarks
 * - Aggregates data from multiple calculation functions
 * - Provides a single interface for UI components
 * - Includes both calculated values and raw state data
 * - Useful for displaying comprehensive action information
 */
export function getLoopActionStats(action: LoopActionState): {
  name: string;
  icon: string;
  category: string;
  progress: LoopActionProgress;
  efficiency: number;
  isActive: boolean;
  isPaused: boolean;
  totalLoopsCompleted: number;
  startedAt: number;
} {
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const progress = calculateProgress(action);
  
  return {
    name: actionDef.name,
    icon: actionDef.icon,
    category: actionDef.loopCategory,
    progress,
    efficiency: calculateLoopActionEfficiency(action),
    isActive: action.isActive,
    isPaused: action.isPaused,
    totalLoopsCompleted: action.totalLoopsCompleted,
    startedAt: action.startedAt,
  };
}
