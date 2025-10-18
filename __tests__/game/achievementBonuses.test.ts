import { 
  getBonusSummary, 
  formatBonusValue, 
  getResourceDisplayName 
} from '@/lib/game/utils/achievement/bonusCalculator';
import { createNewGameState } from '@/lib/game/initializers/gameStateFactory';
import { applyAchievementRewards } from '@/lib/game/utils/achievement/rewards';
import type { GameState, AchievementDef, AchievementRewardType, ResourceKey } from '@/lib/game/types';
import { getEmptyAchievementBonusesObject } from '@/lib/game/utils/achievement/bonusCalculator';
describe('Achievement Bonus Calculator', () => {
  let state: GameState;

  beforeEach(() => {
    state = createNewGameState();
  });


  describe('getBonusSummary', () => {
    it('should calculate correct totals', () => {
      const newState = {
        ...state,
        achievementBonuses: {
          ...getEmptyAchievementBonusesObject(),
          resourceGain: { wood: 10, stone: 5 },
          resourceGainMultiplier: { wood: 1.2, stone: 1.1 },
          clickGain: { wood: 2, stone: 1 },
          clickMultiplier: { wood: 1.5, stone: 1.2 },
          loopGain: { wood: 3, stone: 2 },
          loopMultiplier: { wood: 1.3, stone: 1.1 },
        }
      };

      const summary = getBonusSummary(newState);
      
      expect(summary.totalResourceGain).toBe(15); // 10 + 5
      expect(summary.totalResourceMultipliers).toBeCloseTo(30, 5); // (1.2-1)*100 + (1.1-1)*100 = 20 + 10
      expect(summary.totalClickBonuses).toBe(3); // 2 + 1
      expect(summary.totalClickMultipliers).toBeCloseTo(70, 5); // (1.5-1)*100 + (1.2-1)*100 = 50 + 20
      expect(summary.totalLoopBonuses).toBe(5); // 3 + 2
      expect(summary.totalLoopMultipliers).toBeCloseTo(40, 5); // (1.3-1)*100 + (1.1-1)*100 = 30 + 10
    });

    it('should include resource breakdown', () => {
      const newState = {
        ...state,
        achievementBonuses: {
          ...getEmptyAchievementBonusesObject(),
          resourceGain: { wood: 10 },
          resourceGainMultiplier: { wood: 1.2 },
          clickGain: { wood: 2 },
          clickMultiplier: { wood: 1.5 },
          loopGain: { wood: 3 },
          loopMultiplier: { wood: 1.3 },
        }
      };

      const summary = getBonusSummary(newState);
      
      expect(summary.resourceBreakdown.wood).toEqual({
        resourceGain: 10,
        resourceMultiplier: 1.2,
        clickGain: 2,
        clickMultiplier: 1.5,
        loopGain: 3,
        loopMultiplier: 1.3
      });
    });
  });

  describe('formatBonusValue', () => {
    it('should format gain values correctly', () => {
      expect(formatBonusValue(0, 'gain')).toBe('0.000');
      expect(formatBonusValue(5, 'gain')).toBe('5.000');
      expect(formatBonusValue(1000, 'gain')).toBe('1.000k');
      expect(formatBonusValue(1500, 'gain')).toBe('1.500k');
    });

    it('should format multiplier values correctly', () => {
      expect(formatBonusValue(1, 'multiplier')).toBe('1.000x');
      expect(formatBonusValue(1.2, 'multiplier')).toBe('1.200x');
      expect(formatBonusValue(2.5, 'multiplier')).toBe('2.500x');
    });
  });

  describe('getResourceDisplayName', () => {
    it('should return correct display names', () => {
      expect(getResourceDisplayName('wood')).toBe('Wood');
      expect(getResourceDisplayName('stone')).toBe('Stone');
      expect(getResourceDisplayName('food')).toBe('Food');
      expect(getResourceDisplayName('water')).toBe('Water');
      expect(getResourceDisplayName('clay')).toBe('Clay');
      expect(getResourceDisplayName('fiber')).toBe('Fiber');
      expect(getResourceDisplayName('tools')).toBe('Tools');
      expect(getResourceDisplayName('knowledge')).toBe('Knowledge');
      expect(getResourceDisplayName('prestige')).toBe('Prestige');
    });
  });

  describe('integration with achievement rewards', () => {
    it('should calculate bonuses after applying achievement rewards', () => {
      // Create a mock achievement with rewards
      const mockAchievement: AchievementDef = {
        key: 'testAchievement',
        name: 'Test Achievement',
        description: 'Test achievement for bonus calculation',
        icon: '🧪',
        category: 'misc',
        rarity: 'common',
        points: 10,
        requirements: [],
        rewards: [
          { type: 'resourceGain' as AchievementRewardType, target: 'wood' as ResourceKey, value: 5, permanent: true },
          { type: 'resourceGainMultiplier' as AchievementRewardType, target: 'wood' as ResourceKey, value: 1.2, permanent: true },
          { type: 'clickGain' as AchievementRewardType, target: 'wood' as ResourceKey, value: 2, permanent: true },
          { type: 'clickMultiplier' as AchievementRewardType, target: 'wood' as ResourceKey, value: 1.5, permanent: true },
          { type: 'loopGain' as AchievementRewardType, target: 'stone' as ResourceKey, value: 3, permanent: true },
          { type: 'loopMultiplier' as AchievementRewardType, target: 'stone' as ResourceKey, value: 1.3, permanent: true }
        ],
        hidden: false,
        repeatable: false
      };

      const newState = applyAchievementRewards(state, mockAchievement);
      const summary = getBonusSummary(newState);
      
      expect(summary.totalResourceGain).toBe(5);
      expect(summary.totalResourceMultipliers).toBeCloseTo(20, 5); // (1.2-1)*100
      expect(summary.totalClickBonuses).toBe(2);
      expect(summary.totalClickMultipliers).toBeCloseTo(50, 5); // (1.5-1)*100
      expect(summary.totalLoopBonuses).toBe(3);
      expect(summary.totalLoopMultipliers).toBeCloseTo(30, 5); // (1.3-1)*100
    });
  });
});
