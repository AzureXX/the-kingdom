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
          { type: 'multiplier', target: 'prodMul', value: 1.5, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      // Should initialize achievement multipliers if they don't exist
      expect(result.achievementMultipliers).toBeDefined();
      expect(result.achievementMultipliers.prodMul).toBeDefined();
      
      // Should apply multiplier to all resources
      expect(result.achievementMultipliers.prodMul.gold).toBe(1.5);
      expect(result.achievementMultipliers.prodMul.wood).toBe(1.5);
      expect(result.achievementMultipliers.prodMul.stone).toBe(1.5);
      expect(result.achievementMultipliers.prodMul.food).toBe(1.5);
      expect(result.achievementMultipliers.prodMul.prestige).toBe(1.5);
      expect(result.achievementMultipliers.prodMul.researchPoints).toBe(1.5);
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
          { type: 'multiplier', target: 'clickGain', value: 2.0, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      expect(result.achievementMultipliers).toBeDefined();
      expect(result.achievementMultipliers.clickGain).toBe(2.0);
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
          { type: 'multiplier', target: 'cost', value: 0.8, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      expect(result.achievementMultipliers).toBeDefined();
      expect(result.achievementMultipliers.cost).toBe(0.8);
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
          { type: 'multiplier', target: 'prodMul', value: 1.2, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      // Should apply both rewards
      expect(result.resources.gold).toBe((state.resources.gold || 0) + 50);
      expect(result.achievementMultipliers.prodMul.gold).toBe(1.2);
    });

    it('should handle cosmetic rewards (no state change)', () => {
      const state = createTestGameState();
      const achievement: AchievementDef = {
        key: 'testCosmetic',
        name: 'Test Cosmetic',
        description: 'Test achievement',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'cosmetic', target: 'title', value: 1, permanent: false }
        ],
        hidden: false,
        repeatable: false
      };

      const result = applyAchievementRewards(state, achievement);

      // Should return state unchanged for cosmetic rewards
      expect(result).toEqual(state);
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
