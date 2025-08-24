// Event system constants
export const EVENT_CONSTANTS = {
  // Event timing and behavior
  AUTO_RESOLVE_TIMEOUT_MS: 30000, // 30 seconds
  HISTORY_MAX_ENTRIES: 50,
  INITIAL_MIN_INTERVAL_SECONDS: 10, // Reduced from 60 to 10 seconds for faster initial events
  INITIAL_MAX_INTERVAL_SECONDS: 30, // Reduced from 120 to 30 seconds for faster initial events
} as const;
