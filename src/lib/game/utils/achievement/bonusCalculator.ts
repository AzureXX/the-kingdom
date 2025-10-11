// Achievement bonus calculation utilities

import type { GameState, ResourceKey } from '@/lib/game/types';

/**
 * Calculate total bonuses from all unlocked achievements
 */
export function calculateTotalBonuses(state: GameState): {
  resourceGain: Partial<Record<ResourceKey, number>>;
  resourceGainMultiplier: Partial<Record<ResourceKey, number>>;
  clickGain: Partial<Record<ResourceKey, number>>;
  clickMultiplier: Partial<Record<ResourceKey, number>>;
  loopGain: Partial<Record<ResourceKey, number>>;
  loopMultiplier: Partial<Record<ResourceKey, number>>;
} {
  if (!state || !state.achievementBonuses) {
    return {
      resourceGain: {},
      resourceGainMultiplier: {},
      clickGain: {},
      clickMultiplier: {},
      loopGain: {},
      loopMultiplier: {}
    };
  }

  return {
    resourceGain: { ...state.achievementBonuses.resourceGain },
    resourceGainMultiplier: { ...state.achievementBonuses.resourceGainMultiplier },
    clickGain: { ...state.achievementBonuses.clickGain },
    clickMultiplier: { ...state.achievementBonuses.clickMultiplier },
    loopGain: { ...state.achievementBonuses.loopGain },
    loopMultiplier: { ...state.achievementBonuses.loopMultiplier }
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
