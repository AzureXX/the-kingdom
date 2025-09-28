// Loop actions system exports

// Management
export { startLoopAction, stopLoopAction, pauseLoopAction, resumeLoopAction } from '@/lib/game/utils/loopActions/management';

// Processing
export { processLoopActionTick } from '@/lib/game/utils/loopActions/processing';

// Validation
export { canStartLoopAction, canHaveMoreLoopActions } from '@/lib/game/utils/loopActions/validation';

// Progress
export { getLoopActionProgress } from '@/lib/game/utils/loopActions/progress';

// Note: getOldestLoopAction is now internal to management.ts
