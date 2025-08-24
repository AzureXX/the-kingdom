// Types index file - re-exports all game types

// Resource types
export type {
  ResourceKey,
  ResourceDef,
  ResourceCost,
  ResourceProduction,
  ResourceConsumption,
  ResourceAmount,
} from './resources';

// Building types
export type {
  BuildingKey,
  BuildingDef,
} from './buildings';

// Technology types
export type {
  TechnologyKey,
  TechnologyDef,
} from './technologies';

// Prestige types
export type {
  PrestigeUpgradeKey,
  PrestigeUpgradeDef,
} from './prestige';

// Event types
export type {
  EventKey,
  EventChoice,
  EventDef,
} from './events';

// Game state types
export type {
  GameState,
  Multipliers,
} from './game';
