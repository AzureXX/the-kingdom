// Event-related type definitions

import type { ResourceProduction, ResourceConsumption, ResourceCost } from './resources';

export type EventKey = 
  | 'merchantVisit'
  | 'banditRaid'
  | 'bountifulHarvest'
  | 'drought'
  | 'royalTax'
  | 'mysteriousStranger'
  | 'plague'
  | 'festival';

export type EventChoice = {
  text: string;
  gives: ResourceProduction;
  takes: ResourceConsumption;
  requires: ResourceCost;
};

export type EventDef = {
  name: string;
  icon: string;
  desc: string;
  choices: EventChoice[];
  defaultChoiceIndex: number; // index of choice to auto-select if player doesn't choose
  minInterval: number; // seconds
  maxInterval: number; // seconds
  weight: number; // relative chance of this event occurring
};

// Validation type for event intervals
export type ValidEventDef = EventDef & {
  minInterval: number;
  maxInterval: number;
}
