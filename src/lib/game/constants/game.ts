// Game core constants and configuration
export const GAME_CONSTANTS = {
  // Save system
  SAVE_INTERVAL_MS: 30000,
  OFFLINE_PROGRESS_CAP_HOURS: 1,
  MAX_TICK_STEP: 5,
  
  // Game loop constants
  GAME_TICK_RATE: 20, // 20 FPS = 50ms intervals - minimum for smooth gameplay
  
  // Performance constants
  PERFORMANCE_METRICS_UPDATE_INTERVAL: 60, // Update performance metrics every 60 frames
  NUMBER_FORMAT_THRESHOLD: 1000,
  NUMBER_FORMAT_DECIMALS: 2,
  
  // Game mechanics
  GAME: {
    DEFAULT_MULTIPLIER: 1,
    MIN_RESOURCE_AMOUNT: 0,
  },
} as const;
