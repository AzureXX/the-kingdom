// Loop action progress calculations

import type { LoopActionState, LoopActionProgress } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { GAME_CONSTANTS } from '@/lib/game/constants';

/**
 * Calculates the base points generated per game tick for loop actions.
 * This value is used as a baseline for all loop action calculations.
 * 
 * @returns The number of points generated per tick
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
