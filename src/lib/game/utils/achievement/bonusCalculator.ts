// Achievement bonus calculation utilities

import type { GameState, ResourceKey, AchievementBonuses } from '@/lib/game/types';

/**
 * Create an empty achievement bonuses object with all properties initialized
 */
export function getEmptyAchievementBonusesObject(): AchievementBonuses {
  return {
    resourceGain: {},
    resourceGainMultiplier: {},
    buildingGain: {},
    buildingGainMultiplier: {},
    clickGain: {},
    clickMultiplier: {},
    actionClickGain: {},
    actionClickMultiplier: {},
    loopGain: {},
    loopMultiplier: {},
    actionLoopGain: {},
    actionLoopMultiplier: {},
    buildingCostReduction: {}
  };
}

/**
 * Calculate total bonuses from all unlocked achievements
 */
function calculateTotalBonuses(state: GameState): AchievementBonuses {
  if (!state || !state.achievementBonuses) {
    return getEmptyAchievementBonusesObject();
  }

  return {
    resourceGain: { ...state.achievementBonuses.resourceGain },
    resourceGainMultiplier: { ...state.achievementBonuses.resourceGainMultiplier },
    buildingGain: { ...state.achievementBonuses.buildingGain },
    buildingGainMultiplier: { ...state.achievementBonuses.buildingGainMultiplier },
    actionClickGain: { ...state.achievementBonuses.actionClickGain },
    actionClickMultiplier: { ...state.achievementBonuses.actionClickMultiplier },
    actionLoopGain: { ...state.achievementBonuses.actionLoopGain },
    actionLoopMultiplier: { ...state.achievementBonuses.actionLoopMultiplier },
    clickGain: { ...state.achievementBonuses.clickGain },
    clickMultiplier: { ...state.achievementBonuses.clickMultiplier },
    loopGain: { ...state.achievementBonuses.loopGain },
    loopMultiplier: { ...state.achievementBonuses.loopMultiplier },
    buildingCostReduction: { ...state.achievementBonuses.buildingCostReduction }
  };
}

/**
 * Get a summary of total bonuses for display
 */
export function getBonusSummary(state: GameState): {
  totalResourceGain: number;
  totalResourceMultipliers: number;
  totalClickBonuses: number;
  totalClickMultipliers: number;
  totalLoopBonuses: number;
  totalLoopMultipliers: number;
  resourceBreakdown: Partial<Record<ResourceKey, {
    resourceGain: number;
    resourceMultiplier: number;
    clickGain: number;
    clickMultiplier: number;
    loopGain: number;
    loopMultiplier: number;
  }>>;
} {
  const bonuses = calculateTotalBonuses(state);
  const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
  
  let totalResourceGain = 0;
  let totalResourceMultipliers = 0;
  let totalClickBonuses = 0;
  let totalClickMultipliers = 0;
  let totalLoopBonuses = 0;
  let totalLoopMultipliers = 0;
  
  const resourceBreakdown: Partial<Record<ResourceKey, {
    resourceGain: number;
    resourceMultiplier: number;
    clickGain: number;
    clickMultiplier: number;
    loopGain: number;
    loopMultiplier: number;
  }>> = {};

  for (const resource of allResources) {
    const resourceGain = bonuses.resourceGain[resource] || 0;
    const resourceMultiplier = bonuses.resourceGainMultiplier[resource] || 1;
    const clickGain = bonuses.clickGain[resource] || 0;
    const clickMultiplier = bonuses.clickMultiplier[resource] || 1;
    const loopGain = bonuses.loopGain[resource] || 0;
    const loopMultiplier = bonuses.loopMultiplier[resource] || 1;

    totalResourceGain += resourceGain;
    totalResourceMultipliers += (resourceMultiplier - 1) * 100; // Convert to percentage
    totalClickBonuses += clickGain;
    totalClickMultipliers += (clickMultiplier - 1) * 100; // Convert to percentage
    totalLoopBonuses += loopGain;
    totalLoopMultipliers += (loopMultiplier - 1) * 100; // Convert to percentage

    resourceBreakdown[resource] = {
      resourceGain,
      resourceMultiplier,
      clickGain,
      clickMultiplier,
      loopGain,
      loopMultiplier
    };
  }

  return {
    totalResourceGain,
    totalResourceMultipliers,
    totalClickBonuses,
    totalClickMultipliers,
    totalLoopBonuses,
    totalLoopMultipliers,
    resourceBreakdown
  };
}

/**
 * Format bonus value for display
 */
export function formatBonusValue(value: number, type: 'gain' | 'multiplier'): string {
  if (type === 'multiplier') {
    if (value === 1) return '1.000x';
    return `${value.toFixed(3)}x`;
  } else {
    if (value === 0) return '0.000';
    if (value >= 1000) return `${(value / 1000).toFixed(3)}k`;
    return value.toFixed(3);
  }
}

/**
 * Get detailed list of all multipliers for display
 */
export function getAllMultipliers(state: GameState): {
  resourceGain: Array<{ resource: ResourceKey; name: string; value: number }>;
  resourceGainMultiplier: Array<{ resource: ResourceKey; name: string; value: number }>;
  buildingGain: Array<{ building: string; resource: ResourceKey; resourceName: string; value: number }>;
  buildingGainMultiplier: Array<{ building: string; resource: ResourceKey; resourceName: string; value: number }>;
  clickGain: Array<{ resource: ResourceKey; name: string; value: number }>;
  clickMultiplier: Array<{ resource: ResourceKey; name: string; value: number }>;
  actionClickGain: Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>;
  actionClickMultiplier: Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>;
  loopGain: Array<{ resource: ResourceKey; name: string; value: number }>;
  loopMultiplier: Array<{ resource: ResourceKey; name: string; value: number }>;
  actionLoopGain: Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>;
  actionLoopMultiplier: Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>;
  buildingCostReduction: Array<{ building: string; value: number }>;
} {
  if (!state || !state.achievementBonuses) {
    return {
      resourceGain: [],
      resourceGainMultiplier: [],
      buildingGain: [],
      buildingGainMultiplier: [],
      clickGain: [],
      clickMultiplier: [],
      actionClickGain: [],
      actionClickMultiplier: [],
      loopGain: [],
      loopMultiplier: [],
      actionLoopGain: [],
      actionLoopMultiplier: [],
      buildingCostReduction: []
    };
  }

  const bonuses = state.achievementBonuses;
  const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];

  const result = {
    resourceGain: [] as Array<{ resource: ResourceKey; name: string; value: number }>,
    resourceGainMultiplier: [] as Array<{ resource: ResourceKey; name: string; value: number }>,
    buildingGain: [] as Array<{ building: string; resource: ResourceKey; resourceName: string; value: number }>,
    buildingGainMultiplier: [] as Array<{ building: string; resource: ResourceKey; resourceName: string; value: number }>,
    clickGain: [] as Array<{ resource: ResourceKey; name: string; value: number }>,
    clickMultiplier: [] as Array<{ resource: ResourceKey; name: string; value: number }>,
    actionClickGain: [] as Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>,
    actionClickMultiplier: [] as Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>,
    loopGain: [] as Array<{ resource: ResourceKey; name: string; value: number }>,
    loopMultiplier: [] as Array<{ resource: ResourceKey; name: string; value: number }>,
    actionLoopGain: [] as Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>,
    actionLoopMultiplier: [] as Array<{ action: string; resource: ResourceKey; resourceName: string; value: number }>,
    buildingCostReduction: [] as Array<{ building: string; value: number }>
  };

  // Process resource-wide bonuses
  for (const resource of allResources) {
    const resourceName = getResourceDisplayName(resource);

    // Resource gain
    const resourceGain = bonuses.resourceGain[resource];
    if (resourceGain && resourceGain > 0) {
      result.resourceGain.push({ resource, name: resourceName, value: resourceGain });
    }

    // Resource gain multiplier
    const resourceGainMultiplier = bonuses.resourceGainMultiplier[resource];
    if (resourceGainMultiplier && resourceGainMultiplier > 1) {
      result.resourceGainMultiplier.push({ resource, name: resourceName, value: resourceGainMultiplier });
    }

    // Click gain
    const clickGain = bonuses.clickGain[resource];
    if (clickGain && clickGain > 0) {
      result.clickGain.push({ resource, name: resourceName, value: clickGain });
    }

    // Click multiplier
    const clickMultiplier = bonuses.clickMultiplier[resource];
    if (clickMultiplier && clickMultiplier > 1) {
      result.clickMultiplier.push({ resource, name: resourceName, value: clickMultiplier });
    }

    // Loop gain
    const loopGain = bonuses.loopGain[resource];
    if (loopGain && loopGain > 0) {
      result.loopGain.push({ resource, name: resourceName, value: loopGain });
    }

    // Loop multiplier
    const loopMultiplier = bonuses.loopMultiplier[resource];
    if (loopMultiplier && loopMultiplier > 1) {
      result.loopMultiplier.push({ resource, name: resourceName, value: loopMultiplier });
    }
  }

  // Process building-specific bonuses
  for (const [building, buildingBonuses] of Object.entries(bonuses.buildingGain || {})) {
    for (const [resource, value] of Object.entries(buildingBonuses)) {
      if (value && value > 0) {
        result.buildingGain.push({
          building,
          resource: resource as ResourceKey,
          resourceName: getResourceDisplayName(resource as ResourceKey),
          value
        });
      }
    }
  }

  for (const [building, buildingBonuses] of Object.entries(bonuses.buildingGainMultiplier || {})) {
    for (const [resource, value] of Object.entries(buildingBonuses)) {
      if (value && value > 1) {
        result.buildingGainMultiplier.push({
          building,
          resource: resource as ResourceKey,
          resourceName: getResourceDisplayName(resource as ResourceKey),
          value
        });
      }
    }
  }

  // Process action-specific click bonuses
  for (const [action, actionBonuses] of Object.entries(bonuses.actionClickGain || {})) {
    for (const [resource, value] of Object.entries(actionBonuses)) {
      if (value && value > 0) {
        result.actionClickGain.push({
          action,
          resource: resource as ResourceKey,
          resourceName: getResourceDisplayName(resource as ResourceKey),
          value
        });
      }
    }
  }

  for (const [action, actionBonuses] of Object.entries(bonuses.actionClickMultiplier || {})) {
    for (const [resource, value] of Object.entries(actionBonuses)) {
      if (value && value > 1) {
        result.actionClickMultiplier.push({
          action,
          resource: resource as ResourceKey,
          resourceName: getResourceDisplayName(resource as ResourceKey),
          value
        });
      }
    }
  }

  // Process action-specific loop bonuses
  for (const [action, actionBonuses] of Object.entries(bonuses.actionLoopGain || {})) {
    for (const [resource, value] of Object.entries(actionBonuses)) {
      if (value && value > 0) {
        result.actionLoopGain.push({
          action,
          resource: resource as ResourceKey,
          resourceName: getResourceDisplayName(resource as ResourceKey),
          value
        });
      }
    }
  }

  for (const [action, actionBonuses] of Object.entries(bonuses.actionLoopMultiplier || {})) {
    for (const [resource, value] of Object.entries(actionBonuses)) {
      if (value && value > 1) {
        result.actionLoopMultiplier.push({
          action,
          resource: resource as ResourceKey,
          resourceName: getResourceDisplayName(resource as ResourceKey),
          value
        });
      }
    }
  }

  return result;
}

/**
 * Get resource display name
 */
export function getResourceDisplayName(resource: ResourceKey): string {
  switch (resource) {
    case 'gold': return 'Gold';
    case 'wood': return 'Wood';
    case 'stone': return 'Stone';
    case 'food': return 'Food';
    case 'prestige': return 'Prestige';
    case 'researchPoints': return 'Research';
    default: return resource;
  }
}
