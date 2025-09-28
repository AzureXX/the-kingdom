// Achievement reward application logic

import type { GameState, AchievementDef, AchievementReward, ResourceKey } from '@/lib/game/types';
import { createStateErrorHandler } from '@/lib/game/utils/error';

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
      case 'multiplier':
        return applyMultiplierReward(state, reward);
      case 'unlock':
        return applyUnlockReward(state, reward);
      case 'cosmetic':
        // Cosmetic rewards don't affect game state
        return state;
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
 * Apply a multiplier reward
 */
function applyMultiplierReward(state: GameState, reward: AchievementReward): GameState {
  try {
    // Initialize achievement multipliers if they don't exist
    if (!state.achievementMultipliers) {
      return {
        ...state,
        achievementMultipliers: {
          clickGain: 1,
          cost: 1,
          prodMul: {},
          useMul: {}
        }
      };
    }

    const currentMultipliers = { ...state.achievementMultipliers };
    
    switch (reward.target) {
      case 'clickGain':
        currentMultipliers.clickGain = (currentMultipliers.clickGain || 1) * reward.value;
        break;
      case 'cost':
        currentMultipliers.cost = (currentMultipliers.cost || 1) * reward.value;
        break;
      case 'prodMul':
        // For production multipliers, we need to apply to all resources
        // or to a specific resource if target includes resource name
        if (reward.target.includes('.')) {
          // Specific resource multiplier (e.g., 'prodMul.gold')
          const [, resourceKey] = reward.target.split('.');
          if (resourceKey in currentMultipliers.prodMul || ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'].includes(resourceKey)) {
            currentMultipliers.prodMul = {
              ...currentMultipliers.prodMul,
              [resourceKey as ResourceKey]: (currentMultipliers.prodMul[resourceKey as ResourceKey] || 1) * reward.value
            };
          }
        } else {
          // General production multiplier - apply to all resources
          const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
          const newProdMul = { ...currentMultipliers.prodMul };
          for (const resourceKey of allResources) {
            newProdMul[resourceKey] = (newProdMul[resourceKey] || 1) * reward.value;
          }
          currentMultipliers.prodMul = newProdMul;
        }
        break;
      case 'useMul':
        // Similar logic for use multipliers
        if (reward.target.includes('.')) {
          const [, resourceKey] = reward.target.split('.');
          if (resourceKey in currentMultipliers.useMul || ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'].includes(resourceKey)) {
            currentMultipliers.useMul = {
              ...currentMultipliers.useMul,
              [resourceKey as ResourceKey]: (currentMultipliers.useMul[resourceKey as ResourceKey] || 1) * reward.value
            };
          }
        } else {
          const allResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
          const newUseMul = { ...currentMultipliers.useMul };
          for (const resourceKey of allResources) {
            newUseMul[resourceKey] = (newUseMul[resourceKey] || 1) * reward.value;
          }
          currentMultipliers.useMul = newUseMul;
        }
        break;
      default:
        stateErrorHandler('Unknown multiplier target', { 
          target: reward.target,
          reward: reward
        });
        return state;
    }

    return {
      ...state,
      achievementMultipliers: currentMultipliers
    };
  } catch (error) {
    stateErrorHandler('Failed to apply multiplier reward', { 
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
    // Unlock rewards could unlock buildings, technologies, actions, etc.
    // For now, we'll handle this as a placeholder since the unlock system
    // might need to be integrated with the existing unlock mechanisms
    
    stateErrorHandler('Unlock rewards not yet implemented', { 
      reward: reward
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
