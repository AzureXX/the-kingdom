// Event-related type definitions

import type { ResourceProduction, ResourceConsumption, ResourceCost } from '@/lib/game/types/resources';

export type TierOneEventKeys = 
  | 'bountifulHarvest'
  | 'stormyWeather'
  | 'ancientCave'
  | 'clayDeposit'
  | 'wanderingTrader'
  | 'wildAnimal'
  | 'fiberDiscovery'
  | 'primitiveInvention';

export type EventKey = TierOneEventKeys;

export interface EventChoice {
  text: string;
  gives: ResourceProduction;
  takes: ResourceConsumption;
  requires: ResourceCost;
}

export interface EventDef {
  name: string;
  icon: string;
  desc: string;
  choices: EventChoice[];
  defaultChoiceIndex: number; // index of choice to auto-select if player doesn't choose
  minInterval: number; // seconds
  maxInterval: number; // seconds
  weight: number; // relative chance of this event occurring
}

