// Game state related type definitions

import type { ResourceKey } from '@/lib/game/types/resources';
import type { BuildingKey } from '@/lib/game/types/buildings';
import type { TechnologyKey } from '@/lib/game/types/technologies';
import type { PrestigeUpgradeKey } from  '@/lib/game/types/prestige';
import type { EventKey } from '@/lib/game/types/events';
import type { ActionUnlocks, ActionCooldowns } from '@/lib/game/types/actions';
import type { LoopActionState, LoopActionSettings } from '@/lib/game/types/loopActions';
import type { AchievementState } from '@/lib/game/types/achievements';

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
  lifetime: Partial<Record<ResourceKey, number>>;
  
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
  
  /** Achievement system state */
  achievements: AchievementState;
  
  /** Achievement-based multipliers */
  achievementMultipliers: Multipliers;
};

export type Multipliers = {
  clickGain: number;
  cost: number;
  prodMul: Partial<Record<ResourceKey, number>>;
  useMul: Partial<Record<ResourceKey, number>>;
};
