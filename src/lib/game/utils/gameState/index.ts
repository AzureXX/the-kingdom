// Game state system exports

// Initialization
export { initNewGame, updateTimestamp } from './initialization';

// Resources
export { 
  getResource, 
  setResource, 
  updateResource, 
  updateMultipleResources, 
  addResources 
} from './resources';

// Buildings
export { 
  updateBuildingCount, 
  getBuildingCount, 
  setBuildingCount, 
  hasAllRequiredTechnologiesForBuilding, 
  isBuildingUnlocked, 
  getUnlockedBuildings 
} from './buildings';

// Technologies
export { 
  updateTechnologyLevel, 
  getTechnologyLevel, 
  setTechnologyLevel, 
  isTechnologyResearched 
} from './technologies';

// Upgrades
export { 
  updateUpgradeLevel, 
  getUpgradeLevel, 
  setUpgradeLevel 
} from './upgrades';
