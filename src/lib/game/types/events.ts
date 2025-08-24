// Event-related type definitions

import type { ResourceKey } from './resources';

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
  gives: Partial<Record<ResourceKey, number>>;
  takes: Partial<Record<ResourceKey, number>>;
  requires: Partial<Record<ResourceKey, number>>;
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
