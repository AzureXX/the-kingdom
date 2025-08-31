// Game state related type definitions

import type { ResourceKey } from './resources';
import type { BuildingKey } from './buildings';
import type { TechnologyKey } from './technologies';
import type { PrestigeUpgradeKey } from  './prestige';
import type { EventKey } from './events';
import type { ActionUnlocks, ActionCooldowns } from './actions';
import type { LoopActionState, LoopActionSettings } from './loopActions';

export type GameState = {
  t: number;
  resources: Partial<Record<ResourceKey, number>>;
  lifetime: { food: number };
  buildings: Record<BuildingKey, number>;
  technologies: Record<TechnologyKey, number>;
  upgrades: Record<PrestigeUpgradeKey, number>;
  clicks: number;
  version: number;
  isPaused: boolean;
  events: {
    activeEvent: EventKey | null;
    activeEventStartTime: number;
    nextEventTime: number;
    eventHistory: Array<{
      eventKey: EventKey;
      choiceIndex: number;
      timestamp: number;
    }>;
  };
  research: {
    activeResearch: TechnologyKey | null;
    researchStartTime: number;
    researchEndTime: number;
  };
  actions: {
    unlocks: ActionUnlocks;
    cooldowns: ActionCooldowns;
  };
  loopActions: LoopActionState[];
  loopSettings: LoopActionSettings;
};

export type Multipliers = {
  clickGain: number;
  cost: number;
  prodMul: Record<ResourceKey, number>;
  useMul: Record<ResourceKey, number>;
};
