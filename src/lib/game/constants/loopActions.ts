export const LOOP_ACTION_CONSTANTS = {
  DEFAULT_MAX_CONCURRENT: 2,
  BASE_POINTS_PER_TICK: 100, // Points per tick (20 FPS = 2000 points per second)
  TICK_RATE: 20, // FPS
  MIN_POINTS_PER_LOOP: 10000,
} as const;
