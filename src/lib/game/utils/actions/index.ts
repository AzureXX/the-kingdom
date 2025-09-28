/**
 * Actions index file - re-exports all action functions
 * 
 * This module provides a centralized export point for all game actions,
 * maintaining backward compatibility while organizing actions into focused modules.
 */

// Building actions
export { buyBuilding, pay as payForBuilding } from '@/lib/game/utils/actions/buildingActions';

// Upgrade actions
export { buyUpgrade } from '@/lib/game/utils/actions/upgradeActions';

// Resource actions
export { pay, updateResourcesFromProduction } from '@/lib/game/utils/actions/resourceActions';

// Technology actions
export { researchTechnology } from '@/lib/game/utils/actions/technologyActions';

// Game actions
export { executeAction } from '@/lib/game/utils/actions/gameActions';

// Game loop actions
export { 
  checkAndProcessEvents, 
  checkAndProcessAchievements, 
  tick 
} from '@/lib/game/utils/actions/gameLoopActions';
