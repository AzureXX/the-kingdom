import type { BuildingKey, PrestigeUpgradeKey, ResourceKey, EventKey, TechnologyKey } from './config';

export type GameState = {
  t: number;
  resources: Partial<Record<ResourceKey, number>>;
  lifetime: { food: number };
  buildings: Record<BuildingKey, number>;
  technologies: Record<TechnologyKey, number>;
  upgrades: Record<PrestigeUpgradeKey, number>;
  clicks: number;
  version: number;
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
};

export type Multipliers = {
  clickGain: number;
  cost: number;
  prodMul: Record<ResourceKey, number>;
  useMul: Record<ResourceKey, number>;
};
