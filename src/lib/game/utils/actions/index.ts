/**
 * Actions index file - re-exports all action functions
 * 
 * This module provides a centralized export point for all game actions,
 * maintaining backward compatibility while organizing actions into focused modules.
 */

// Building actions
export { buyBuilding, pay as payForBuilding } from './buildingActions';

// Upgrade actions
export { buyUpgrade } from './upgradeActions';

// Resource actions
export { pay, updateResourcesFromProduction } from './resourceActions';

// Technology actions
export { researchTechnology } from './technologyActions';

// Game actions
export { executeAction } from './gameActions';

// Game loop actions
export { 
  checkAndProcessEvents, 
  checkAndProcessAchievements, 
  tick 
} from './gameLoopActions';
