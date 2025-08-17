// Game constants and configuration
export const GAME_CONSTANTS = {
  // Save system
  SAVE_INTERVAL_MS: 30000,
  OFFLINE_PROGRESS_CAP_HOURS: 1,
  MAX_TICK_STEP: 5,
  
  // UI constants
  TICK_RATE: 10,
  NUMBER_FORMAT_THRESHOLD: 1e6,
  NUMBER_FORMAT_DECIMALS: 2,
  
  // Prestige
  PRESTIGE_DIVISOR: 1000,
  
  // UI feedback
  SAVE_LABEL_THRESHOLDS: {
    JUST_NOW_MS: 3000,
  },
  
  // File handling
  EXPORT_FILENAME: 'medieval-kingdom.save.txt',
  IMPORT_FILE_TYPES: '.txt,.save',
  
  // Event system
  EVENT: {
    AUTO_RESOLVE_TIMEOUT_MS: 30000, // 30 seconds
    HISTORY_MAX_ENTRIES: 50,
    INITIAL_MIN_INTERVAL_SECONDS: 60,
    INITIAL_MAX_INTERVAL_SECONDS: 120,
  },
  
  // Game mechanics
  GAME: {
    DEFAULT_MULTIPLIER: 1,
    MIN_RESOURCE_AMOUNT: 0,
  },
} as const;

// Resource icons mapping
export const RESOURCE_ICONS = {
  gold: 'ic-gold',
  wood: 'ic-wood', 
  stone: 'ic-stone',
  food: 'ic-food',
  prestige: 'ic-prestige',
} as const;

// Building icons mapping
export const BUILDING_ICONS = {
  woodcutter: 'ic-woodcutter',
  quarry: 'ic-quarry',
  farm: 'ic-farm',
  blacksmith: 'ic-blacksmith',
  castle: 'ic-castle',
} as const;

// Upgrade icons mapping
export const UPGRADE_ICONS = {
  royalDecrees: 'ic-gold',
  masterCraftsmen: 'ic-blacksmith',
  fertileLands: 'ic-farm',
  militaryMight: 'ic-castle',
} as const; 