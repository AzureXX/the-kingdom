// Achievement reward application logic

import type { GameState, AchievementDef, AchievementReward, ResourceKey, BuildingKey, ActionKey } from '@/lib/game/types';
import { createStateErrorHandler } from '@/lib/game/utils/error';
import { getEmptyAchievementBonusesObject } from '@/lib/game/utils/achievement/bonusCalculator';

// Create specialized error handler
const stateErrorHandler = createStateErrorHandler('achievementSystem');

/**
 * Apply rewards for an unlocked achievement
 */
export function applyAchievementRewards(state: GameState, achievement: AchievementDef): GameState {
  try {
    let newState = { ...state };

    for (const reward of achievement.rewards) {
      newState = applyReward(newState, reward);
    }

    return newState;
  } catch (error) {
    stateErrorHandler('Failed to apply achievement rewards', { 
      achievementKey: achievement.key,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a single reward
 */
function applyReward(state: GameState, reward: AchievementReward): GameState {
  try {
    switch (reward.type) {
      case 'resource':
        return applyResourceReward(state, reward);
      case 'resourceGain':
        return applyResourceGainReward(state, reward);
      case 'resourceGainMultiplier':
        return applyResourceGainMultiplierReward(state, reward);
      case 'buildingGain':
        return applyBuildingGainReward(state, reward);
      case 'buildingGainMultiplier':
        return applyBuildingGainMultiplierReward(state, reward);
      case 'clickGain':
        return applyClickGainReward(state, reward);
      case 'clickMultiplier':
        return applyClickMultiplierReward(state, reward);
      case 'actionClickGain':
        return applyActionClickGainReward(state, reward);
      case 'actionClickMultiplier':
        return applyActionClickMultiplierReward(state, reward);
      case 'loopGain':
        return applyLoopGainReward(state, reward);
      case 'loopMultiplier':
        return applyLoopMultiplierReward(state, reward);
      case 'actionLoopGain':
        return applyActionLoopGainReward(state, reward);
      case 'actionLoopMultiplier':
        return applyActionLoopMultiplierReward(state, reward);
      case 'buildingCostReduction':
        return applyBuildingCostReductionReward(state, reward);
      case 'unlock':
        return applyUnlockReward(state, reward);
      default:
        stateErrorHandler('Unknown reward type', { 
          rewardType: reward.type,
          reward: reward
        });
        return state;
    }
  } catch (error) {
    stateErrorHandler('Failed to apply reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a resource reward
 */
function applyResourceReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const resourceKey = reward.target as keyof typeof state.resources;
    
    if (!state.resources) {
      return {
        ...state,
        resources: { [resourceKey]: reward.value }
      };
    }

    const currentAmount = state.resources[resourceKey] || 0;
    
    return {
      ...state,
      resources: {
        ...state.resources,
        [resourceKey]: currentAmount + reward.value
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply resource reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}


/**
 * Apply a resource gain reward (e.g., +3 wood/s)
 */
function applyResourceGainReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const resourceKey = reward.target as ResourceKey;
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    
    const newResourceGain = {
      ...currentBonuses.resourceGain,
      [resourceKey]: (currentBonuses.resourceGain[resourceKey] || 0) + reward.value
    };
    
    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        resourceGain: newResourceGain
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply resource gain reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a resource gain multiplier reward (e.g., 1.2x wood/s)
 */
function applyResourceGainMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    
    if (reward.target === 'all') {
      // Apply to all resources
      const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
      const newResourceGainMultiplier = { ...currentBonuses.resourceGainMultiplier };
      for (const resourceKey of allResources) {
        newResourceGainMultiplier[resourceKey] = (newResourceGainMultiplier[resourceKey] || 1) * reward.value;
      }
      
      return {
        ...state,
        achievementBonuses: {
          ...currentBonuses,
          resourceGainMultiplier: newResourceGainMultiplier
        }
      };
    } else {
      // Apply to specific resource
      const resourceKey = reward.target as ResourceKey;
      const newResourceGainMultiplier = {
        ...currentBonuses.resourceGainMultiplier,
        [resourceKey]: (currentBonuses.resourceGainMultiplier[resourceKey] || 1) * reward.value
      };
      
      return {
        ...state,
        achievementBonuses: {
          ...currentBonuses,
          resourceGainMultiplier: newResourceGainMultiplier
        }
      };
    }
  } catch (error) {
    stateErrorHandler('Failed to apply resource gain multiplier reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a click gain reward (e.g., +1 wood per click)
 */
function applyClickGainReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const resourceKey = reward.target as ResourceKey;
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    
    const newClickGain = {
      ...currentBonuses.clickGain,
      [resourceKey]: (currentBonuses.clickGain[resourceKey] || 0) + reward.value
    };
    
    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        clickGain: newClickGain
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply click gain reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a click multiplier reward (e.g., 1.2x click gains)
 */
function applyClickMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    
    if (reward.target === 'all') {
      // Apply to all resources
          const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
      const newClickMultiplier = { ...currentBonuses.clickMultiplier };
          for (const resourceKey of allResources) {
        newClickMultiplier[resourceKey] = (newClickMultiplier[resourceKey] || 1) * reward.value;
      }
      
      return {
        ...state,
        achievementBonuses: {
          ...currentBonuses,
          clickMultiplier: newClickMultiplier
        }
      };
    } else {
      // Apply to specific resource
      const resourceKey = reward.target as ResourceKey;
      const newClickMultiplier = {
        ...currentBonuses.clickMultiplier,
        [resourceKey]: (currentBonuses.clickMultiplier[resourceKey] || 1) * reward.value
      };
      
      return {
        ...state,
        achievementBonuses: {
          ...currentBonuses,
          clickMultiplier: newClickMultiplier
        }
      };
    }
  } catch (error) {
    stateErrorHandler('Failed to apply click multiplier reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a loop gain reward (e.g., +1 wood per loop)
 */
function applyLoopGainReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const resourceKey = reward.target as ResourceKey;
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    
    const newLoopGain = {
      ...currentBonuses.loopGain,
      [resourceKey]: (currentBonuses.loopGain[resourceKey] || 0) + reward.value
    };
    
    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        loopGain: newLoopGain
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply loop gain reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply a loop multiplier reward (e.g., 1.2x loop gains)
 */
function applyLoopMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    
    if (reward.target === 'all') {
      // Apply to all resources
          const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
      const newLoopMultiplier = { ...currentBonuses.loopMultiplier };
          for (const resourceKey of allResources) {
        newLoopMultiplier[resourceKey] = (newLoopMultiplier[resourceKey] || 1) * reward.value;
      }
      
      return {
        ...state,
        achievementBonuses: {
          ...currentBonuses,
          loopMultiplier: newLoopMultiplier
        }
      };
    } else {
      // Apply to specific resource
      const resourceKey = reward.target as ResourceKey;
      const newLoopMultiplier = {
        ...currentBonuses.loopMultiplier,
        [resourceKey]: (currentBonuses.loopMultiplier[resourceKey] || 1) * reward.value
      };
      
      return {
        ...state,
        achievementBonuses: {
          ...currentBonuses,
          loopMultiplier: newLoopMultiplier
        }
      };
    }
  } catch (error) {
    stateErrorHandler('Failed to apply loop multiplier reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}


/**
 * Apply a building gain reward
 */
function applyBuildingGainReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    const buildingKey = reward.target as BuildingKey;
    const resourceKey = reward.resource as ResourceKey;
    
    if (!buildingKey || !resourceKey) {
      stateErrorHandler('Building gain reward missing building or resource target', {
        reward: reward
      });
      return state;
    }

    const newBuildingGain = {
      ...currentBonuses.buildingGain,
      [buildingKey]: {
        ...(currentBonuses.buildingGain[buildingKey] || {}),
        [resourceKey]: ((currentBonuses.buildingGain[buildingKey] || {})[resourceKey] || 0) + reward.value
      }
    };

    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        buildingGain: newBuildingGain
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply building gain reward', {
      reward: reward,
      error: error instanceof Error ? error.message : String(error)
    });
    return state;
  }
}

/**
 * Apply a building gain multiplier reward
 */
function applyBuildingGainMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    const buildingKey = reward.target as BuildingKey;
    const resourceKey = reward.resource as ResourceKey;
    
    if (!buildingKey || !resourceKey) {
      stateErrorHandler('Building gain multiplier reward missing building or resource target', {
        reward: reward
      });
      return state;
    }

    const newBuildingGainMultiplier = {
      ...currentBonuses.buildingGainMultiplier,
      [buildingKey]: {
        ...(currentBonuses.buildingGainMultiplier[buildingKey] || {}),
        [resourceKey]: ((currentBonuses.buildingGainMultiplier[buildingKey] || {})[resourceKey] || 1) * reward.value
      }
    };

    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        buildingGainMultiplier: newBuildingGainMultiplier
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply building gain multiplier reward', {
      reward: reward,
      error: error instanceof Error ? error.message : String(error)
    });
    return state;
  }
}

/**
 * Apply an action-specific click gain reward
 */
function applyActionClickGainReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    const actionKey = reward.target as ActionKey;
    const resourceKey = reward.resource as ResourceKey;
    
    if (!actionKey || !resourceKey) {
      stateErrorHandler('Action click gain reward missing action or resource target', {
        reward: reward
      });
      return state;
    }

    const newActionClickGain = {
      ...currentBonuses.actionClickGain,
      [actionKey]: {
        ...(currentBonuses.actionClickGain[actionKey] || {}),
        [resourceKey]: ((currentBonuses.actionClickGain[actionKey] || {})[resourceKey] || 0) + reward.value
      }
    };

    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        actionClickGain: newActionClickGain
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply action click gain reward', {
      reward: reward,
      error: error instanceof Error ? error.message : String(error)
    });
    return state;
  }
}

/**
 * Apply an action-specific click multiplier reward
 */
function applyActionClickMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    const actionKey = reward.target as ActionKey;
    const resourceKey = reward.resource as ResourceKey;
    
    if (!actionKey || !resourceKey) {
      stateErrorHandler('Action click multiplier reward missing action or resource target', {
        reward: reward
      });
      return state;
    }

    const newActionClickMultiplier = {
      ...currentBonuses.actionClickMultiplier,
      [actionKey]: {
        ...(currentBonuses.actionClickMultiplier[actionKey] || {}),
        [resourceKey]: ((currentBonuses.actionClickMultiplier[actionKey] || {})[resourceKey] || 1) * reward.value
      }
    };

    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        actionClickMultiplier: newActionClickMultiplier
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply action click multiplier reward', {
      reward: reward,
      error: error instanceof Error ? error.message : String(error)
    });
    return state;
  }
}

/**
 * Apply an action-specific loop gain reward
 */
function applyActionLoopGainReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    const actionKey = reward.target as ActionKey;
    const resourceKey = reward.resource as ResourceKey;
    
    if (!actionKey || !resourceKey) {
      stateErrorHandler('Action loop gain reward missing action or resource target', {
        reward: reward
      });
      return state;
    }

    const newActionLoopGain = {
      ...currentBonuses.actionLoopGain,
      [actionKey]: {
        ...(currentBonuses.actionLoopGain[actionKey] || {}),
        [resourceKey]: ((currentBonuses.actionLoopGain[actionKey] || {})[resourceKey] || 0) + reward.value
      }
    };

    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        actionLoopGain: newActionLoopGain
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply action loop gain reward', {
      reward: reward,
      error: error instanceof Error ? error.message : String(error)
    });
    return state;
  }
}

/**
 * Apply an action-specific loop multiplier reward
 */
function applyActionLoopMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const currentBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();
    const actionKey = reward.target as ActionKey;
    const resourceKey = reward.resource as ResourceKey;
    
    if (!actionKey || !resourceKey) {
      stateErrorHandler('Action loop multiplier reward missing action or resource target', {
          reward: reward
        });
        return state;
    }

    const newActionLoopMultiplier = {
      ...currentBonuses.actionLoopMultiplier,
      [actionKey]: {
        ...(currentBonuses.actionLoopMultiplier[actionKey] || {}),
        [resourceKey]: ((currentBonuses.actionLoopMultiplier[actionKey] || {})[resourceKey] || 1) * reward.value
      }
    };

    return {
      ...state,
      achievementBonuses: {
        ...currentBonuses,
        actionLoopMultiplier: newActionLoopMultiplier
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply action loop multiplier reward', {
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}


/**
 * Apply an unlock reward
 */
function applyUnlockReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const target = reward.target;
    
    // Handle different types of unlocks
    if (target === 'taxOffice') {
      // The unlock is handled by the building system checking unlockConditions
      // The achievement being unlocked is what makes the building available
      // No additional state changes needed here
      return state;
    }
    
    // Add more unlock types here as needed
    // - technologies
    // - actions
    // - other buildings
    // - etc.
    
    stateErrorHandler('Unknown unlock target', { 
      reward: reward,
      target: target
    });
    return state;
  } catch (error) {
    stateErrorHandler('Failed to apply unlock reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}

/**
 * Apply building cost reduction reward (e.g., -5% costs)
 */
function applyBuildingCostReductionReward(state: GameState, reward: AchievementReward): GameState {
  try {
    const achievementBonuses = state.achievementBonuses || getEmptyAchievementBonusesObject();

    // Apply building cost reduction to specific building or all buildings
    const newBuildingCostReduction = { ...achievementBonuses.buildingCostReduction };
    
    if (reward.target === 'all') {
      // Apply to all buildings - we need to get all building keys
      const commonBuildings = ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory', 'taxOffice'];
      for (const building of commonBuildings) {
        newBuildingCostReduction[building as BuildingKey] = (newBuildingCostReduction[building as BuildingKey] || 0) + reward.value;
      }
    } else {
      // Apply to specific building
      newBuildingCostReduction[reward.target as BuildingKey] = (newBuildingCostReduction[reward.target as BuildingKey] || 0) + reward.value;
    }

    return {
      ...state,
      achievementBonuses: {
        ...achievementBonuses,
        buildingCostReduction: newBuildingCostReduction
      }
    };
  } catch (error) {
    stateErrorHandler('Failed to apply building cost reduction reward', { 
      reward: reward,
      error: error instanceof Error ? error.message : String(error) 
    });
    return state;
  }
}
