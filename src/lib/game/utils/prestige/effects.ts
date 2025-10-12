// Prestige effect functions
// These functions apply prestige bonuses to the achievement bonus system

import type { AchievementBonuses, ResourceKey, PrestigeUpgradeKey } from '@/lib/game/types';

/**
 * Apply prestige bonuses to achievement bonuses based on upgrade levels
 */
export function applyPrestigeBonuses(
  baseBonuses: AchievementBonuses,
  upgradeLevels: Record<PrestigeUpgradeKey, number>
): AchievementBonuses {
  let bonuses = { ...baseBonuses };

  // Apply each prestige upgrade effect
  for (const [upgradeKey, level] of Object.entries(upgradeLevels)) {
    if (level > 0) {
      bonuses = applyPrestigeEffect(bonuses, upgradeKey as PrestigeUpgradeKey, level);
    }
  }

  return bonuses;
}

/**
 * Apply a specific prestige upgrade effect
 */
function applyPrestigeEffect(
  bonuses: AchievementBonuses,
  upgradeKey: PrestigeUpgradeKey,
  level: number
): AchievementBonuses {
  switch (upgradeKey) {
    case 'royalDecrees':
      return applyRoyalDecrees(bonuses, level);
    case 'masterCraftsmen':
      return applyMasterCraftsmen(bonuses, level);
    case 'fertileLands':
      return applyFertileLands(bonuses, level);
    case 'militaryMight':
      return applyMilitaryMight(bonuses, level);
    case 'goldenTouch':
      return applyGoldenTouch(bonuses, level);
    case 'forestMastery':
      return applyForestMastery(bonuses, level);
    case 'stoneQuarry':
      return applyStoneQuarry(bonuses, level);
    case 'researchAcceleration':
      return applyResearchAcceleration(bonuses, level);
    case 'efficientBuilders':
      return applyEfficientBuilders(bonuses, level);
    case 'merchantGuilds':
      return applyMerchantGuilds(bonuses, level);
    case 'royalTreasury':
      return applyRoyalTreasury(bonuses, level);
    case 'militaryEngineers':
      return applyMilitaryEngineers(bonuses, level);
    case 'scholarlyPursuits':
      return applyScholarlyPursuits(bonuses, level);
    case 'agriculturalRevolution':
      return applyAgriculturalRevolution(bonuses, level);
    case 'miningInnovation':
      return applyMiningInnovation(bonuses, level);
    case 'diplomaticRelations':
      return applyDiplomaticRelations(bonuses, level);
    case 'technologicalAdvancement':
      return applyTechnologicalAdvancement(bonuses, level);
    case 'economicStimulation':
      return applyEconomicStimulation(bonuses, level);
    case 'culturalHeritage':
      return applyCulturalHeritage(bonuses, level);
    case 'strategicPlanning':
      return applyStrategicPlanning(bonuses, level);
    default:
      return bonuses;
  }
}

// Individual prestige effect functions

function applyRoyalDecrees(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +25% click gains per level
  const multiplier = 1 + 0.25 * level;
  return applyClickMultiplierToAll(bonuses, multiplier);
}

function applyMasterCraftsmen(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // -3% building costs per level (applied as production multiplier)
  const multiplier = Math.pow(0.97, level);
  return applyResourceGainMultiplierToAll(bonuses, 1 / multiplier);
}

function applyFertileLands(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +20% Food production per level
  const multiplier = Math.pow(1.2, level);
  return applyResourceGainMultiplier(bonuses, 'food', multiplier);
}

function applyMilitaryMight(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +20% Prestige production per level
  const multiplier = Math.pow(1.2, level);
  return applyResourceGainMultiplier(bonuses, 'prestige', multiplier);
}

function applyGoldenTouch(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +30% Gold production per level
  const multiplier = Math.pow(1.3, level);
  return applyResourceGainMultiplier(bonuses, 'gold', multiplier);
}

function applyForestMastery(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +25% Wood production per level
  const multiplier = Math.pow(1.25, level);
  return applyResourceGainMultiplier(bonuses, 'wood', multiplier);
}

function applyStoneQuarry(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +25% Stone production per level
  const multiplier = Math.pow(1.25, level);
  return applyResourceGainMultiplier(bonuses, 'stone', multiplier);
}

function applyResearchAcceleration(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +35% Research Points production per level
  const multiplier = Math.pow(1.35, level);
  return applyResourceGainMultiplier(bonuses, 'researchPoints', multiplier);
}

function applyEfficientBuilders(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // -2% all building costs per level (applied as production multiplier)
  const multiplier = Math.pow(0.98, level);
  return applyResourceGainMultiplierToAll(bonuses, 1 / multiplier);
}

function applyMerchantGuilds(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +15% all resource production per level
  const multiplier = Math.pow(1.15, level);
  return applyResourceGainMultiplierToAll(bonuses, multiplier);
}

function applyRoyalTreasury(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +40% Gold click gains per level
  const multiplier = 1 + 0.4 * level;
  return applyClickMultiplier(bonuses, 'gold', multiplier);
}

function applyMilitaryEngineers(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +30% Prestige production and -5% building costs per level
  let newBonuses = bonuses;
  const prestigeMultiplier = Math.pow(1.3, level);
  const costMultiplier = Math.pow(0.95, level);
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'prestige', prestigeMultiplier);
  newBonuses = applyResourceGainMultiplierToAll(newBonuses, 1 / costMultiplier);
  
  return newBonuses;
}

function applyScholarlyPursuits(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +50% Research Points production and +20% click gains per level
  let newBonuses = bonuses;
  const researchMultiplier = Math.pow(1.5, level);
  const clickMultiplier = 1 + 0.2 * level;
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'researchPoints', researchMultiplier);
  newBonuses = applyClickMultiplierToAll(newBonuses, clickMultiplier);
  
  return newBonuses;
}

function applyAgriculturalRevolution(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +40% Food production and +20% Wood production per level
  let newBonuses = bonuses;
  const foodMultiplier = Math.pow(1.4, level);
  const woodMultiplier = Math.pow(1.2, level);
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'food', foodMultiplier);
  newBonuses = applyResourceGainMultiplier(newBonuses, 'wood', woodMultiplier);
  
  return newBonuses;
}

function applyMiningInnovation(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +35% Stone production and +25% Gold production per level
  let newBonuses = bonuses;
  const stoneMultiplier = Math.pow(1.35, level);
  const goldMultiplier = Math.pow(1.25, level);
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'stone', stoneMultiplier);
  newBonuses = applyResourceGainMultiplier(newBonuses, 'gold', goldMultiplier);
  
  return newBonuses;
}

function applyDiplomaticRelations(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +25% Prestige production and +15% all resource production per level
  let newBonuses = bonuses;
  const prestigeMultiplier = Math.pow(1.25, level);
  const allMultiplier = Math.pow(1.15, level);
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'prestige', prestigeMultiplier);
  newBonuses = applyResourceGainMultiplierToAll(newBonuses, allMultiplier);
  
  return newBonuses;
}

function applyTechnologicalAdvancement(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +60% Research Points production and -3% all costs per level
  let newBonuses = bonuses;
  const researchMultiplier = Math.pow(1.6, level);
  const costMultiplier = Math.pow(0.97, level);
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'researchPoints', researchMultiplier);
  newBonuses = applyResourceGainMultiplierToAll(newBonuses, 1 / costMultiplier);
  
  return newBonuses;
}

function applyEconomicStimulation(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +30% Gold production and +20% all resource production per level
  let newBonuses = bonuses;
  const goldMultiplier = Math.pow(1.3, level);
  const allMultiplier = Math.pow(1.2, level);
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'gold', goldMultiplier);
  newBonuses = applyResourceGainMultiplierToAll(newBonuses, allMultiplier);
  
  return newBonuses;
}

function applyCulturalHeritage(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +35% Prestige production and +25% click gains per level
  let newBonuses = bonuses;
  const prestigeMultiplier = Math.pow(1.35, level);
  const clickMultiplier = 1 + 0.25 * level;
  
  newBonuses = applyResourceGainMultiplier(newBonuses, 'prestige', prestigeMultiplier);
  newBonuses = applyClickMultiplierToAll(newBonuses, clickMultiplier);
  
  return newBonuses;
}

function applyStrategicPlanning(bonuses: AchievementBonuses, level: number): AchievementBonuses {
  // +20% all resource production and -4% all costs per level
  let newBonuses = bonuses;
  const productionMultiplier = Math.pow(1.2, level);
  const costMultiplier = Math.pow(0.96, level);
  
  newBonuses = applyResourceGainMultiplierToAll(newBonuses, productionMultiplier);
  newBonuses = applyResourceGainMultiplierToAll(newBonuses, 1 / costMultiplier);
  
  return newBonuses;
}

// Helper functions for applying bonuses

function applyResourceGainMultiplier(
  bonuses: AchievementBonuses,
  resource: ResourceKey,
  multiplier: number
): AchievementBonuses {
  return {
    ...bonuses,
    resourceGainMultiplier: {
      ...bonuses.resourceGainMultiplier,
      [resource]: (bonuses.resourceGainMultiplier[resource] || 1) * multiplier
    }
  };
}

function applyResourceGainMultiplierToAll(
  bonuses: AchievementBonuses,
  multiplier: number
): AchievementBonuses {
  const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
  const newResourceGainMultiplier = { ...bonuses.resourceGainMultiplier };
  
  for (const resource of allResources) {
    newResourceGainMultiplier[resource] = (newResourceGainMultiplier[resource] || 1) * multiplier;
  }
  
  return {
    ...bonuses,
    resourceGainMultiplier: newResourceGainMultiplier
  };
}

function applyClickMultiplier(
  bonuses: AchievementBonuses,
  resource: ResourceKey,
  multiplier: number
): AchievementBonuses {
  return {
    ...bonuses,
    clickMultiplier: {
      ...bonuses.clickMultiplier,
      [resource]: (bonuses.clickMultiplier[resource] || 1) * multiplier
    }
  };
}

function applyClickMultiplierToAll(
  bonuses: AchievementBonuses,
  multiplier: number
): AchievementBonuses {
  const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
  const newClickMultiplier = { ...bonuses.clickMultiplier };
  
  for (const resource of allResources) {
    newClickMultiplier[resource] = (newClickMultiplier[resource] || 1) * multiplier;
  }
  
  return {
    ...bonuses,
    clickMultiplier: newClickMultiplier
  };
}
