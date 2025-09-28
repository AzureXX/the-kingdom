import { ResourceCost, ResourceProduction } from '@/lib/game/types/resources';
import { ActionUnlockCondition } from '@/lib/game/types/actions';

export type LoopActionCategory = 'gathering' | 'crafting' | 'research' | 'military';

export type LoopActionKey = 
  | 'basicGathering'
  | 'continuousMining'
  | 'continuousLogging'
  | 'continuousFarming'
  | 'massToolProduction'
  | 'weaponForging'
  | 'ongoingResearch'
  | 'advancedStudies'
  | 'trainingSoldiers'
  | 'fortification';

export interface LoopActionDef {
  name: string;
  icon: string;
  description: string;
  cost?: ResourceCost;
  gains: ResourceProduction;
  unlockConditions: ActionUnlockCondition[];
  loopPointsRequired: number;
  loopCategory: LoopActionCategory;
  showWhenLocked?: boolean;
}

export interface LoopActionState {
  actionKey: LoopActionKey;
  isActive: boolean;
  currentPoints: number;
  totalLoopsCompleted: number;
  startedAt: number;
  lastTickAt: number;
  isPaused: boolean;
}

export interface LoopActionProgress {
  actionKey: LoopActionKey;
  currentPoints: number;
  pointsRequired: number;
  progressPercentage: number;
  timeRemaining: number;
  loopsCompleted: number;
}

export interface LoopActionSettings {
  maxConcurrentActions: number;
  basePointsPerTick: number;
}
