// Loop action efficiency calculations

import type { LoopActionState } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';

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
