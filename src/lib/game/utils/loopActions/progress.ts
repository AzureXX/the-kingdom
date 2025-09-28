// Loop action progress tracking logic

import type { LoopActionState, LoopActionProgress } from '@/lib/game/types/loopActions';
import { LOOP_ACTIONS } from '@/lib/game/config/loopActions';
import { GAME_CONSTANTS } from '@/lib/game/constants';

export function getLoopActionProgress(action: LoopActionState): LoopActionProgress {
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
