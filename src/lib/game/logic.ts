import { CONFIG, SAVE_KEY, type ResourceKey, type BuildingKey, type PrestigeUpgradeKey } from './config';
import type { GameState, Multipliers } from './types';

export function initNewGame(): GameState {
  const state: GameState = {
    t: Date.now(),
    resources: {},
    lifetime: { science: 0 },
    buildings: { farm: 0, plant: 0, lab: 0, factory: 0 },
    upgrades: { clickBoost: 0, cheapConstruction: 0, greenTransition: 0, technocracy: 0 },
    clicks: 0,
    version: CONFIG.version,
  };
  for (const k in CONFIG.resources) {
    const key = k as ResourceKey;
    state.resources[key] = CONFIG.resources[key].start || 0;
  }
  return state;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function fmt(n: number, dec = 0): string {
  if (!isFinite(n)) return '—';
  if (Math.abs(n) >= 1e6) {
    const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
    let i = 0;
    let x = n;
    while (Math.abs(x) >= 1000 && i < units.length - 1) {
      x /= 1000;
      i++;
    }
    return x.toFixed(dec > 2 ? 2 : 2) + units[i];
  }
  return n.toFixed(dec);
}

export function getMultipliers(state: GameState): Multipliers {
  const ctx: Multipliers = {
    clickGain: 1,
    cost: 1,
    prodMul: { money: 1, food: 1, energy: 1, science: 1, influence: 1 },
    useMul: { money: 1, food: 1, energy: 1, science: 1, influence: 1 },
  };
  for (const key in CONFIG.prestige.upgrades) {
    const k = key as PrestigeUpgradeKey;
    const lvl = state.upgrades[k] || 0;
    if (!lvl) continue;
    CONFIG.prestige.upgrades[k].effect(lvl, {
      muls: ctx as unknown as any,
      prodMul: ctx.prodMul,
      useMul: ctx.useMul,
    } as any);
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
  if ((state.resources.influence || 0) < cost) return state;
  state.resources.influence = (state.resources.influence || 0) - cost;
  state.upgrades[key] = lvl + 1;
  return state;
}

export function getPerSec(state: GameState): Record<ResourceKey, number> {
  const muls = getMultipliers(state);
  const out: Record<ResourceKey, number> = { money: 0, food: 0, energy: 0, science: 0, influence: 0 };
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
  state.lifetime.science += Math.max(0, (perSec.science || 0) * dtSeconds);
  return state;
}

export function prestigeGain(state: GameState): number {
  const div = CONFIG.prestige.divisor;
  const x = state.lifetime.science || 0;
  return Math.floor(Math.sqrt(x / div));
}

export function doPrestige(state: GameState): GameState {
  const gain = prestigeGain(state);
  const keepInfluence = (state.resources.influence || 0) + gain;
  const keepUp = { ...state.upgrades };
  const fresh = initNewGame();
  fresh.resources.influence = keepInfluence;
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
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as GameState;
    if (obj && obj.version === CONFIG.version) return obj;
  } catch {
    // ignore
  }
  return null;
}

export function doSave(state: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function exportSave(state: GameState): string {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  return encoded;
}

export function importSave(text: string): GameState | null {
  try {
    const decoded = decodeURIComponent(escape(atob(text)));
    const obj = JSON.parse(decoded) as GameState;
    if (obj.version === CONFIG.version) return obj;
  } catch {
    return null;
  }
  return null;
}
