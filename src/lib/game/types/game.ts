// Game state related type definitions

import type { ResourceKey } from './resources';
import type { BuildingKey } from './buildings';
import type { TechnologyKey } from './technologies';
import type { PrestigeUpgradeKey } from  './prestige';
import type { EventKey } from './events';
import type { ActionUnlocks, ActionCooldowns } from './actions';
import type { LoopActionState, LoopActionSettings } from './loopActions';

/**
 * Represents the complete state of the game at any given moment.
 * This interface contains all the data needed to restore the game to a specific point in time.
 */
export type GameState = {
  /** Current game timestamp in milliseconds since epoch */
  t: number;
  
  /** Current resource amounts for all available resources */
  resources: Partial<Record<ResourceKey, number>>;
  
  /** Lifetime statistics that persist across prestige resets */
  lifetime: { 
    /** Total food generated across all time, used for prestige calculations */
    food: number 
  };
  
  /** Number of each building type owned by the player */
  buildings: Record<BuildingKey, number>;
  
  /** Research level for each technology */
  technologies: Record<TechnologyKey, number>;
  
  /** Current level for each prestige upgrade */
  upgrades: Record<PrestigeUpgradeKey, number>;
  
  /** Total number of manual clicks performed by the player */
  clicks: number;
  
  /** Game save version for compatibility checking */
  version: number;
  
  /** Whether the game is currently paused */
  isPaused: boolean;
  
  /** Event system state and history */
  events: {
    /** Currently active event, if any */
    activeEvent: EventKey | null;
    /** When the current event started (timestamp) */
    activeEventStartTime: number;
    /** When the next random event will occur (timestamp) */
    nextEventTime: number;
    /** History of all events and player choices */
    eventHistory: Array<{
      /** The event that occurred */
      eventKey: EventKey;
      /** Which choice the player made */
      choiceIndex: number;
      /** When the event occurred (timestamp) */
      timestamp: number;
    }>;
  };
  
  /** Technology research system state */
  research: {
    /** Currently researching technology, if any */
    activeResearch: TechnologyKey | null;
    /** When research started (timestamp) */
    researchStartTime: number;
    /** When research will complete (timestamp) */
    researchEndTime: number;
  };
  
  /** Action system state */
  actions: {
    /** Tracks which actions have been unlocked */
    unlocks: ActionUnlocks;
    /** Tracks cooldown timers for actions */
    cooldowns: ActionCooldowns;
  };
  
  /** Current state of all loop actions */
  loopActions: LoopActionState[];
  
  /** Configuration settings for loop actions */
  loopSettings: LoopActionSettings;
};

export type Multipliers = {
  clickGain: number;
  cost: number;
  prodMul: Record<ResourceKey, number>;
  useMul: Record<ResourceKey, number>;
};
