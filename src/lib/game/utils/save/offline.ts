// Offline progress processing logic

import { tick } from '@/lib/game/utils/actions';
import type { GameState } from '@/lib/game/types';

/**
 * Optimized offline progress processing - calculates all progress in a single pass
 */
export function processOfflineProgress(savedState: GameState, dtSeconds: number): GameState {
  if (dtSeconds <= 0) return savedState;
  
  // Use a single large tick instead of multiple small ones
  // This is more efficient and avoids the overhead of multiple state copies
  return tick(savedState, dtSeconds);
}
