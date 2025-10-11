// Achievement reward application tests

import { applyAchievementRewards } from '@/lib/game/utils/achievement/rewards';
import { createTestGameState } from '../utils/testHelpers';
import type { AchievementDef, AchievementRewardType } from '@/lib/game/types/achievements';

describe('Achievement Rewards', () => {
  describe('applyAchievementRewards', () => {
    it('should apply resource rewards correctly', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testResource',
        name: 'Test Resource',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'resource', target: 'gold', value: 100, permanent: false }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      expect(result.resources.gold).toBe((state.resources.gold || 0) + 100);
    });

    it('should apply multiplier rewards correctly', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testMultiplier',
        name: 'Test Multiplier',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'resourceGainMultiplier', target: 'all', value: 1.5, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      // Should initialize achievement bonuses if they don't exist
      expect(result.achievementBonuses).toBeDefined();
      expect(result.achievementBonuses.resourceGainMultiplier).toBeDefined();
      
      // Should apply multiplier to all resources
      expect(result.achievementBonuses.resourceGainMultiplier.gold).toBe(1.5);
      expect(result.achievementBonuses.resourceGainMultiplier.wood).toBe(1.5);
      expect(result.achievementBonuses.resourceGainMultiplier.stone).toBe(1.5);
      expect(result.achievementBonuses.resourceGainMultiplier.food).toBe(1.5);
      expect(result.achievementBonuses.resourceGainMultiplier.prestige).toBe(1.5);
      expect(result.achievementBonuses.resourceGainMultiplier.researchPoints).toBe(1.5);
    });

    it('should apply click gain multiplier correctly', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testClickGain',
        name: 'Test Click Gain',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'clickMultiplier', target: 'all', value: 2.0, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      expect(result.achievementBonuses).toBeDefined();
      expect(result.achievementBonuses.clickMultiplier.gold).toBe(2.0);
      expect(result.achievementBonuses.clickMultiplier.wood).toBe(2.0);
      expect(result.achievementBonuses.clickMultiplier.stone).toBe(2.0);
      expect(result.achievementBonuses.clickMultiplier.food).toBe(2.0);
      expect(result.achievementBonuses.clickMultiplier.prestige).toBe(2.0);
      expect(result.achievementBonuses.clickMultiplier.researchPoints).toBe(2.0);
    });

    it('should apply cost multiplier correctly', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testCost',
        name: 'Test Cost',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'resourceGain', target: 'gold', value: 5, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      expect(result.achievementBonuses).toBeDefined();
      expect(result.achievementBonuses.resourceGain.gold).toBe(5);
    });

    it('should handle multiple rewards', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testMultiple',
        name: 'Test Multiple',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'resource', target: 'gold', value: 50, permanent: false },
          { type: 'resourceGainMultiplier', target: 'all', value: 1.2, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      // Should apply both rewards
      expect(result.resources.gold).toBe((state.resources.gold || 0) + 50);
      expect(result.achievementBonuses.resourceGainMultiplier.gold).toBe(1.2);
    });

    it('should handle invalid reward types gracefully', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testInvalid',
        name: 'Test Invalid',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'invalid' as AchievementRewardType, target: 'test', value: 1, permanent: false }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      // Should return original state on error
      expect(result).toEqual(state);
    });

    it('should handle state without resources gracefully', () => {
      const state = { ...createTestGameState(), resources: {} };
      const achievement: AchievementDef = {
        key: 'testNoResources',
        name: 'Test No Resources',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'resource', target: 'gold', value: 100, permanent: false }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      expect(result.resources).toBeDefined();
      expect(result.resources.gold).toBe(100);
    });
  });
});
