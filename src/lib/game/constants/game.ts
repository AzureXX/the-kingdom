// Game core constants and configuration
export const GAME_CONSTANTS = {
  // Save system
  SAVE_INTERVAL_MS: 30000,
  OFFLINE_PROGRESS_CAP_HOURS: 1,
  MAX_TICK_STEP: 5,
  
  // Game loop constants
  GAME_TICK_RATE: 20,
  
  // Frame skipping configuration for performance optimization
  FRAME_SKIP: {
    EVENTS: 3,        // Check events every 3 ticks (6.67 FPS)
    ACHIEVEMENTS: 5,  // Check achievements every 5 ticks (4 FPS)
  },
  
  // Performance constants
  PERFORMANCE_METRICS_UPDATE_INTERVAL: 120, // Update performance metrics every 120 frames
  NUMBER_FORMAT_THRESHOLD: 1000,
  NUMBER_FORMAT_DECIMALS: 2,
  
  // Performance monitoring configuration
  PERFORMANCE_MONITORING: {
    HISTORY_SIZE: 100, // Number of samples to keep for averages
    UPDATE_INTERVAL: 10, // Update basic metrics every N frames
    MEMORY_UPDATE_INTERVAL: 180, // Update memory usage every 180 frames (optimized from 60)
    SCORE_UPDATE_INTERVAL: 30, // Update performance score every 30 frames (1.5 seconds at 20 FPS)
    ENABLED: true, // Enable/disable performance monitoring
    THRESHOLDS: {
      TICK_TIME_WARNING: 50, // 60 FPS = 16.67ms per frame
      RENDER_TIME_WARNING: 500, // Half of 60 FPS
      MEMORY_WARNING: 100 * 1024 * 1024, // 100MB
      FPS_WARNING: 1.5
    },
    BUDGET: {
      MAX_TICK_TIME: 50, // 30 FPS = 33.33ms per frame
      MAX_RENDER_TIME: 500, // Half of 30 FPS
      MIN_FPS: 1, // Minimum acceptable FPS
      MAX_MEMORY_USAGE: 200 * 1024 * 1024 // 200MB
    },
    // Optimized monitoring configuration
    OPTIMIZED_MONITORING: {
      ENABLED: true,
      REDUCED_FREQUENCY: true, // Use reduced monitoring frequency
      CIRCULAR_BUFFERS: true, // Use circular buffers for historical data
      CACHED_CALCULATIONS: true // Use cached performance calculations
    }
  },
  
  // Performance values
  PERFORMANCE: {
    POINTS_PER_TICK: 100,
    POINTS_PER_SECOND: 2000,
  },
  
  // Game mechanics
  GAME: {
    DEFAULT_MULTIPLIER: 1,
    MIN_RESOURCE_AMOUNT: 0,
  },

  // Time constants
  TIME_CONSTANTS: {
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    MILLISECONDS_PER_SECOND: 1000,
    HOURS_PER_DAY: 24,
  },
} as const;
