import type { LoopActionState, LoopActionProgress } from '../types/loopActions';
import { LOOP_ACTIONS } from '../config/loopActions';

export function calculatePointsPerTick(): number {
  // Returns 100 points per tick (20 FPS = 2000 points per second)
  return 100;
}

export function calculateProgress(action: LoopActionState, pointsPerTick: number): LoopActionProgress {
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const pointsRequired = actionDef.loopPointsRequired;
  const progressPercentage = (action.currentPoints / pointsRequired) * 100;
  
  // Calculate time remaining (rough estimate)
  // 100 points per tick, 20 FPS = 2000 points per second
  const pointsPerSecond = 2000;
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

export function shouldAutoRestart(state: any, actionKey: string): boolean {
  // This will be implemented when we have the full game state context
  // For now, return false to prevent auto-restart
  return false;
}

export function calculateLoopActionEfficiency(action: LoopActionState): number {
  if (action.totalLoopsCompleted === 0) return 0;
  
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const totalPointsGenerated = action.totalLoopsCompleted * actionDef.loopPointsRequired;
  const timeActive = action.lastTickAt - action.startedAt;
  
  if (timeActive <= 0) return 0;
  
  return totalPointsGenerated / timeActive;
}

export function getLoopActionStats(action: LoopActionState) {
  const actionDef = LOOP_ACTIONS[action.actionKey];
  const progress = calculateProgress(action, 100);
  
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
