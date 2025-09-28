// Game state system exports

// Initialization
export { initNewGame, updateTimestamp } from '@/lib/game/utils/gameState/initialization';

// Resources
export { 
  getResource, 
  setResource, 
  updateResource, 
  updateMultipleResources, 
  addResources 
} from '@/lib/game/utils/gameState/resources';

// Buildings
export { 
  updateBuildingCount, 
  getBuildingCount, 
  setBuildingCount, 
  hasAllRequiredTechnologiesForBuilding, 
  isBuildingUnlocked, 
  getUnlockedBuildings 
} from '@/lib/game/utils/gameState/buildings';

// Technologies
export { 
  updateTechnologyLevel, 
  getTechnologyLevel, 
  setTechnologyLevel, 
  isTechnologyResearched 
} from '@/lib/game/utils/gameState/technologies';

// Upgrades
export { 
  updateUpgradeLevel, 
  getUpgradeLevel, 
  setUpgradeLevel 
} from '@/lib/game/utils/gameState/upgrades';
