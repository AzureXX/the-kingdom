import { CONFIG, SAVE_KEY, type ResourceKey, type BuildingKey, type PrestigeUpgradeKey, type EventKey } from './config';
import type { GameState, Multipliers } from './types';
import { GAME_CONSTANTS } from './constants';
import { formatNumber, safeJsonParse, encodeBase64, decodeBase64 } from './utils';

export function initNewGame(): GameState {
  const state: GameState = {
    t: Date.now(),
    resources: {},
    lifetime: { food: 0 },
    buildings: { woodcutter: 0, quarry: 0, farm: 0, blacksmith: 0, castle: 0 },
    upgrades: { royalDecrees: 0, masterCraftsmen: 0, fertileLands: 0, militaryMight: 0 },
    clicks: 0,
    version: CONFIG.version,
    events: {
      activeEvent: null,
      activeEventStartTime: 0,
      nextEventTime: Date.now() + (60 + Math.random() * 120) * 1000, // 1-3 minutes
      eventHistory: [],
    },
  };
  for (const k in CONFIG.resources) {
    const key = k as ResourceKey;
    state.resources[key] = CONFIG.resources[key].start || 0;
  }
  return state;
}

// Re-export formatNumber for backward compatibility
export const fmt = formatNumber;

export function getMultipliers(state: GameState): Multipliers {
  const ctx: Multipliers = {
    clickGain: 1,
    cost: 1,
    prodMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1 },
    useMul: { gold: 1, wood: 1, stone: 1, food: 1, prestige: 1 },
  };
  for (const key in CONFIG.prestige.upgrades) {
    const k = key as PrestigeUpgradeKey;
    const lvl = state.upgrades[k] || 0;
    if (!lvl) continue;
    CONFIG.prestige.upgrades[k].effect(lvl, {
      muls: ctx,
      prodMul: ctx.prodMul,
      useMul: ctx.useMul,
    });
  }
  return ctx;
}

export function costFor(state: GameState, buildKey: BuildingKey): Partial<Record<ResourceKey, number>> {
  const def = CONFIG.buildings[buildKey];
  const owned = state.buildings[buildKey] || 0;
  const muls = getMultipliers(state);
  const cost: Partial<Record<ResourceKey, number>> = {};
  for (const r in def.baseCost) {
    const rk = r as ResourceKey;
    cost[rk] = Math.ceil((def.baseCost[rk] || 0) * Math.pow(def.costScale, owned) * muls.cost);
  }
  return cost;
}

export function canAfford(state: GameState, cost: Partial<Record<ResourceKey, number>>): boolean {
  for (const r in cost) {
    const rk = r as ResourceKey;
    if ((state.resources[rk] || 0) < (cost[rk] || 0)) return false;
  }
  return true;
}

export function pay(state: GameState, cost: Partial<Record<ResourceKey, number>>): void {
  for (const r in cost) {
    const rk = r as ResourceKey;
    state.resources[rk] = (state.resources[rk] || 0) - (cost[rk] || 0);
  }
}

export function addResources(state: GameState, obj: Partial<Record<ResourceKey, number>>): void {
  for (const r in obj) {
    const rk = r as ResourceKey;
    state.resources[rk] = (state.resources[rk] || 0) + (obj[rk] || 0);
  }
}

export function buyBuilding(state: GameState, key: BuildingKey): GameState {
  const cost = costFor(state, key);
  if (!canAfford(state, cost)) return state;
  pay(state, cost);
  state.buildings[key] = (state.buildings[key] || 0) + 1;
  return state;
}

export function buyUpgrade(state: GameState, key: PrestigeUpgradeKey): GameState {
  const def = CONFIG.prestige.upgrades[key];
  const lvl = state.upgrades[key] || 0;
  if (lvl >= def.max) return state;
  const cost = Math.ceil(def.costCurve(lvl));
  if ((state.resources.prestige || 0) < cost) return state;
  state.resources.prestige = (state.resources.prestige || 0) - cost;
  state.upgrades[key] = lvl + 1;
  return state;
}

export function getPerSec(state: GameState): Record<ResourceKey, number> {
  const muls = getMultipliers(state);
  const out: Record<ResourceKey, number> = { gold: 0, wood: 0, stone: 0, food: 0, prestige: 0 };
  for (const key in CONFIG.buildings) {
    const k = key as BuildingKey;
    const def = CONFIG.buildings[k];
    const n = state.buildings[k] || 0;
    if (!n) continue;
    for (const r in def.baseProd) {
      const rk = r as ResourceKey;
      out[rk] += (def.baseProd[rk] || 0) * n * (muls.prodMul[rk] || 1);
    }
    for (const r in def.baseUse) {
      const rk = r as ResourceKey;
      out[rk] -= (def.baseUse[rk] || 0) * n * (muls.useMul[rk] || 1);
    }
  }
  return out;
}

export function tick(state: GameState, dtSeconds: number): GameState {
  const perSec = getPerSec(state);
  for (const r in perSec) {
    const rk = r as ResourceKey;
    const delta = (perSec[rk] || 0) * dtSeconds;
    if (delta < 0) {
      const have = state.resources[rk] || 0;
      const allowed = Math.max(-have, delta);
      state.resources[rk] = have + allowed;
    } else {
      state.resources[rk] = (state.resources[rk] || 0) + delta;
    }
  }
  state.lifetime.food += Math.max(0, (perSec.food || 0) * dtSeconds);
  
  checkAndTriggerEvents(state);
  return state;
}

export function prestigeGain(state: GameState): number {
  const div = GAME_CONSTANTS.PRESTIGE_DIVISOR;
  const x = state.lifetime.food || 0;
  return Math.floor(Math.sqrt(x / div));
}

export function doPrestige(state: GameState): GameState {
  const gain = prestigeGain(state);
  const keepPrestige = (state.resources.prestige || 0) + gain;
  const keepUp = { ...state.upgrades };
  const fresh = initNewGame();
  fresh.resources.prestige = keepPrestige;
  fresh.upgrades = keepUp;
  return fresh;
}

export function clickAction(state: GameState): GameState {
  const muls = getMultipliers(state);
  const base = CONFIG.click.base;
  const gains: Partial<Record<ResourceKey, number>> = {};
  for (const r in base) {
    const rk = r as ResourceKey;
    gains[rk] = (base[rk] || 0) * (muls.clickGain || 1);
  }
  addResources(state, gains);
  state.clicks++;
  return state;
}

export function loadSave(): GameState | null {
  if (typeof window === 'undefined') return null;
  
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  
  const obj = safeJsonParse(raw, null as GameState | null);
  if (obj && obj.version === CONFIG.version) return obj;
  
  return null;
}

export function doSave(state: GameState): void {
  if (typeof window === 'undefined') return;
  
  try {
    state.t = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // ignore save errors
  }
}

export function exportSave(state: GameState): string {
  const json = JSON.stringify(state);
  return encodeBase64(json);
}

export function importSave(text: string): GameState | null {
  try {
    const json = decodeBase64(text);
    const obj = safeJsonParse(json, null as GameState | null);
    if (obj && obj.version === CONFIG.version) return obj;
  } catch {
    return null;
  }
  return null;
}

export function triggerRandomEvent(): EventKey | null {
  const events = Object.keys(CONFIG.events) as EventKey[];
  const totalWeight = events.reduce((sum, key) => sum + CONFIG.events[key].weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const eventKey of events) {
    random -= CONFIG.events[eventKey].weight;
    if (random <= 0) {
      return eventKey;
    }
  }
  
  return events[0]; // fallback
}

export function canMakeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): boolean {
  const event = CONFIG.events[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return false;
  
  // Check if player has required resources
  for (const resource in choice.requires) {
    const rk = resource as ResourceKey;
    if ((state.resources[rk] || 0) < (choice.requires[rk] || 0)) {
      return false;
    }
  }
  
  return true;
}

export function makeEventChoice(state: GameState, eventKey: EventKey, choiceIndex: number): void {
  const event = CONFIG.events[eventKey];
  const choice = event.choices[choiceIndex];
  if (!choice) return;
  
  // Add resources that the choice gives
  addResources(state, choice.gives);
  
  // Remove resources that the choice takes
  for (const resource in choice.takes) {
    const rk = resource as ResourceKey;
    const amount = choice.takes[rk] || 0;
    if (amount > 0) {
      // For positive amounts, reduce resources (but not below 0)
      const current = state.resources[rk] || 0;
      state.resources[rk] = Math.max(0, current - amount);
    } else if (amount < 0) {
      // For negative amounts, add resources (this is for prestige loss)
      state.resources[rk] = (state.resources[rk] || 0) + amount;
    }
  }
  
  // Record the choice in history (keep only last 50 events)
  state.events.eventHistory.push({
    eventKey,
    choiceIndex,
    timestamp: Date.now(),
  });
  
  // Keep only the last 50 events
  if (state.events.eventHistory.length > 50) {
    state.events.eventHistory = state.events.eventHistory.slice(-50);
  }
  
  // Clear active event and schedule next one
  state.events.activeEvent = null;
  state.events.activeEventStartTime = 0;
  const minInterval = event.minInterval * 1000;
  const maxInterval = event.maxInterval * 1000;
  state.events.nextEventTime = Date.now() + minInterval + Math.random() * (maxInterval - minInterval);
}

export function checkAndTriggerEvents(state: GameState): void {
  const now = Date.now();
  
  // If there's an active event, check if it's been too long (auto-resolve after 30 seconds)
  if (state.events.activeEvent && (now - state.events.activeEventStartTime) > 30000) {
    // Auto-resolve by choosing the default choice
    const event = CONFIG.events[state.events.activeEvent];
    const defaultChoiceIndex = event.defaultChoiceIndex || 0;
    makeEventChoice(state, state.events.activeEvent, defaultChoiceIndex);
  }
  
  // Check if it's time for a new event
  if (!state.events.activeEvent && now >= state.events.nextEventTime) {
    const eventKey = triggerRandomEvent();
    if (eventKey) {
      state.events.activeEvent = eventKey;
      state.events.activeEventStartTime = now;
    }
  }
}


