// Loop action statistics calculations

import type { LoopActionState, LoopActionProgress } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { calculateProgress } from './progress';
import { calculateLoopActionEfficiency } from './efficiency';

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
