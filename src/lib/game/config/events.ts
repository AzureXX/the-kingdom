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

export const EVENTS: Record<EventKey, EventDef> = {
  merchantVisit: {
    name: 'Merchant Visit',
    icon: 'ic-merchant',
    desc: 'A merchant offers to trade goods for Gold.',
    choices: [
      {
        text: 'Accept Trade',
        gives: { gold: 10 },
        takes: { wood: 5 },
        requires: { wood: 5 },
      },
      {
        text: 'Reject Trade',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Reject trade by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.2,
  },
  banditRaid: {
    name: 'Bandit Raid',
    icon: 'ic-bandit',
    desc: 'Bandits attack your village, stealing resources.',
    choices: [
      {
        text: 'Fight Back',
        gives: {},
        takes: { wood: 2, stone: 1 },
        requires: { },
      },
      {
        text: 'Pay Tribute',
        gives: { gold: 5 },
        takes: { food: 1 },
        requires: { food: 1 },
      },
    ],
    defaultChoiceIndex: 1, // Pay tribute by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.3,
  },
  bountifulHarvest: {
    name: 'Bountiful Harvest',
    icon: 'ic-harvest',
    desc: 'A rare event where all resources grow naturally.',
    choices: [
      {
        text: 'Harvest All',
        gives: { gold: 10, wood: 5, stone: 3, food: 2 },
        takes: {},
        requires: {},
      },
      {
        text: 'Wait for Next Harvest',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 0, // Harvest all by default (positive event)
    minInterval: 60,
    maxInterval: 180,
    weight: 0.1,
  },
  drought: {
    name: 'Drought',
    icon: 'ic-drought',
    desc: 'A severe drought reduces resource production.',
    choices: [
      {
        text: 'Pray for Rain',
        gives: {},
        takes: { food: 1 },
        requires: { },
      },
      {
        text: 'Accept Drought',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Accept drought by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.2,
  },
  royalTax: {
    name: 'Royal Tax',
    icon: 'ic-tax',
    desc: 'The king demands a tax, reducing your resources.',
    choices: [
      {
        text: 'Pay Tax',
        gives: {},
        takes: { gold: 10 },
        requires: {},
      },
      {
        text: 'Refuse Tax',
        gives: {},
        takes: { prestige: 1 },
        requires: { },
      },
    ],
    defaultChoiceIndex: 1, // Pay tax by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.1,
  },
  mysteriousStranger: {
    name: 'Mysterious Stranger',
    icon: 'ic-stranger',
    desc: 'A mysterious stranger offers a mysterious gift.',
    choices: [
      {
        text: 'Accept Gift',
        gives: { prestige: 1 },
        takes: { gold: 10 },
        requires: {},
      },
      {
        text: 'Reject Gift',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 0, // Accept gift by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.05,
  },
  plague: {
    name: 'Plague',
    icon: 'ic-plague',
    desc: 'A deadly plague strikes your village, reducing population.',
    choices: [
      {
        text: 'Treat Plague',
        gives: {},
        takes: { prestige: 1 },
        requires: { },
      },
      {
        text: 'Let Plague Run',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 1, // Let plague run by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.15,
  },
  festival: {
    name: 'Festival',
    icon: 'ic-festival',
    desc: 'A festive event boosts resource production.',
    choices: [
      {
        text: 'Attend Festival',
        gives: { gold: 5, food: 2 },
        takes: {},
        requires: {},
      },
      {
        text: 'Ignore Festival',
        gives: {},
        takes: {},
        requires: {},
      },
    ],
    defaultChoiceIndex: 0, // Attend festival by default
    minInterval: 60,
    maxInterval: 180,
    weight: 0.1,
  },
};
