/**
 * Game state factory
 * Composes all individual state initializers into a complete game state
 * 
 * @remarks
 * This module provides the main factory function that:
 * - Combines all individual state initializers
 * - Creates a complete GameState object
 * - Handles error propagation from individual initializers
 * 
 * // Returns: Complete GameState object ready for use
 * ```
 */

import type { GameState, PrestigeUpgradeKey } from '@/lib/game/types';
import { CONFIG } from '@/lib/game/config';
import { DEFAULT_LOOP_SETTINGS } from '@/lib/game/config/loopActions';
import { initAchievementState } from '@/lib/game/utils/achievement';
import { createStateErrorHandler } from '@/lib/game/utils/errorLogger';

// Import all individual initializers
import { initResourceState } from '@/lib/game/initializers/resourceInitializer';
import { initBuildingState } from '@/lib/game/initializers/buildingInitializer';
import { initTechnologyState } from '@/lib/game/initializers/technologyInitializer';
import { initEventState } from '@/lib/game/initializers/eventInitializer';
import { initResearchState } from '@/lib/game/initializers/researchInitializer';

const { prestige: PRESTIGE_CONFIG, version: CONFIG_VERSION } = CONFIG;

// Create specialized error handler for game state factory
const stateErrorHandler = createStateErrorHandler('gameStateFactory');

/**
 * Create a new game state by composing all individual state initializers
 * 
 * @returns Complete GameState object ready for use
 * 
 * @remarks
 * This function:
 * - Calls all individual state initializers
 * - Combines their results into a complete GameState
 * - Handles any errors from individual initializers
 * - Sets up core game state properties (timestamp, version, etc.)
 * 
 */
export function createNewGameState(): GameState {
  try {
    // Initialize all individual state components
    const resourceState = initResourceState();
    const buildingState = initBuildingState();
    const technologyState = initTechnologyState();
    const eventState = initEventState();
    const researchState = initResearchState();
    
    // Initialize upgrades dynamically from CONFIG
    const upgrades: Record<PrestigeUpgradeKey, number> = {} as Record<PrestigeUpgradeKey, number>;
    for (const upgradeKey of Object.keys(PRESTIGE_CONFIG.upgrades)) {
      upgrades[upgradeKey as PrestigeUpgradeKey] = 0;
    }
    
    // Compose the complete game state
    const state: GameState = {
      t: Date.now(),
      version: CONFIG_VERSION,
      isPaused: false,
      clicks: 0,
      
      // Resource state
      ...resourceState,
      
      // Building state
      ...buildingState,
      
      // Technology state
      ...technologyState,
      
      // Event state
      events: eventState,
      
      // Research state
      research: researchState.research,
      actions: researchState.actions,
      
      // Upgrade state
      upgrades,
      
      // Loop actions state
      loopActions: [],
      loopSettings: DEFAULT_LOOP_SETTINGS,
      
      // Achievement state
      achievements: initAchievementState(),
      
      // Achievement multipliers (from resource state)
      achievementMultipliers: {
        clickGain: 1,
        cost: 1,
        prodMul: resourceState.achievementMultipliers.prodMul,
        useMul: resourceState.achievementMultipliers.useMul
      }
    };
    
    return state;
  } catch (error) {
    stateErrorHandler('Failed to create new game state', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    throw error; // Re-throw for critical initialization errors
  }
}
