import type { GameState, ResourceKey, BuildingKey, TechnologyKey, PrestigeUpgradeKey, EventKey } from '@/lib/game/types'
import { createNewGameState } from '@/lib/game/initializers/gameStateFactory'

/**
 * Test utilities for creating and manipulating game states
 */

/**
 * Create a fresh game state for testing
 */
export function createTestGameState(): GameState {
  return createNewGameState()
}

/**
 * Create a game state with specific resource values
 */
export function createGameStateWithResources(resources: Partial<Record<ResourceKey, number>>): GameState {
  const state = createNewGameState()
  
  for (const [key, value] of Object.entries(resources)) {
    if (key in state.resources && value !== undefined) {
      state.resources[key as ResourceKey] = value
    }
  }
  
  return state
}

/**
 * Create a game state with specific building counts
 */
export function createGameStateWithBuildings(buildings: Partial<Record<BuildingKey, number>>): GameState {
  const state = createNewGameState()
  
  for (const [key, value] of Object.entries(buildings)) {
    if (key in state.buildings && value !== undefined) {
      state.buildings[key as BuildingKey] = value
    }
  }
  
  return state
}

/**
 * Create a game state with specific technology research status
 */
export function createGameStateWithTechnologies(technologies: Partial<Record<TechnologyKey, number>>): GameState {
  const state = createNewGameState()
  
  for (const [key, value] of Object.entries(technologies)) {
    if (key in state.technologies && value !== undefined) {
      state.technologies[key as TechnologyKey] = value
    }
  }
  
  return state
}

/**
 * Create a game state with specific upgrade levels
 */
export function createGameStateWithUpgrades(upgrades: Partial<Record<PrestigeUpgradeKey, number>>): GameState {
  const state = createNewGameState()
  
  for (const [key, value] of Object.entries(upgrades)) {
    if (key in state.upgrades && value !== undefined) {
      state.upgrades[key as PrestigeUpgradeKey] = value
    }
  }
  
  return state
}

/**
 * Mock game action functions for testing
 */
export const mockGameActions = {
  buyBuilding: jest.fn(),
  buyUpgrade: jest.fn(),
  executeAction: jest.fn(),
  researchTechnology: jest.fn(),
  doPrestige: jest.fn(),
}

/**
 * Mock game calculation functions for testing
 */
export const mockGameCalculations = {
  getPerSec: jest.fn(),
  costFor: jest.fn(),
  canAfford: jest.fn(),
  formatNumber: jest.fn(),
  getPrestigePotential: jest.fn(),
}

/**
 * Reset all mocks
 */
export function resetAllMocks(): void {
  jest.clearAllMocks()
  Object.values(mockGameActions).forEach(mock => mock.mockClear())
  Object.values(mockGameCalculations).forEach(mock => mock.mockClear())
}

/**
 * Assert that a game state has specific resource values
 */
export function expectGameStateResources(
  state: GameState,
  expectedResources: Partial<Record<ResourceKey, number>>
): void {
  for (const [key, expectedValue] of Object.entries(expectedResources)) {
    if (key in state.resources && expectedValue !== undefined) {
      expect(state.resources[key as ResourceKey]).toBe(expectedValue)
    }
  }
}

/**
 * Assert that a game state has specific building counts
 */
export function expectGameStateBuildings(
  state: GameState,
  expectedBuildings: Partial<Record<BuildingKey, number>>
): void {
  for (const [key, expectedValue] of Object.entries(expectedBuildings)) {
    if (key in state.buildings && expectedValue !== undefined) {
      expect(state.buildings[key as BuildingKey]).toBe(expectedValue)
    }
  }
}

/**
 * Assert that a game state has specific technology research status
 */
export function expectGameStateTechnologies(
  state: GameState,
  expectedTechnologies: Partial<Record<TechnologyKey, number>>
): void {
  for (const [key, expectedValue] of Object.entries(expectedTechnologies)) {
    if (key in state.technologies && expectedValue !== undefined) {
      expect(state.technologies[key as TechnologyKey]).toBe(expectedValue)
    }
  }
}

/**
 * Assert that a game state has specific upgrade levels
 */
export function expectGameStateUpgrades(
  state: GameState,
  expectedUpgrades: Partial<Record<PrestigeUpgradeKey, number>>
): void {
  for (const [key, expectedValue] of Object.entries(expectedUpgrades)) {
    if (key in state.upgrades && expectedValue !== undefined) {
      expect(state.upgrades[key as PrestigeUpgradeKey]).toBe(expectedValue)
    }
  }
}

/**
 * Wait for a specified number of milliseconds
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Mock performance.now for consistent testing
 */
export function mockPerformanceNow(returnValue: number = 1000): void {
  jest.spyOn(performance, 'now').mockReturnValue(returnValue)
}

/**
 * Restore performance.now mock
 */
export function restorePerformanceNow(): void {
  jest.restoreAllMocks()
}

/**
 * Create a game state with specific action unlocks
 */
export function createGameStateWithActionUnlocks(unlocks: Partial<Record<string, boolean>>): GameState {
  const state = createNewGameState()
  
  for (const [key, unlocked] of Object.entries(unlocks)) {
    if (key in state.actions.unlocks && unlocked !== undefined) {
      state.actions.unlocks[key as keyof typeof state.actions.unlocks] = {
        unlocked,
        unlockedAt: unlocked ? Date.now() : 0,
        lastUsed: 0
      }
    }
  }
  
  return state
}

/**
 * Create a game state with specific event state
 */
export function createGameStateWithEvents(eventState: {
  activeEvent?: EventKey | null;
  activeEventStartTime?: number;
  nextEventTime?: number;
  eventHistory?: Array<{ eventKey: EventKey; choiceIndex: number; timestamp: number }>;
}): GameState {
  const state = createNewGameState()
  
  if (eventState.activeEvent !== undefined) {
    state.events.activeEvent = eventState.activeEvent
  }
  if (eventState.activeEventStartTime !== undefined) {
    state.events.activeEventStartTime = eventState.activeEventStartTime
  }
  if (eventState.nextEventTime !== undefined) {
    state.events.nextEventTime = eventState.nextEventTime
  }
  if (eventState.eventHistory !== undefined) {
    state.events.eventHistory = eventState.eventHistory
  }
  
  return state
}

/**
 * Create a game state with specific research state
 */
export function createGameStateWithResearch(researchState: {
  activeResearch?: TechnologyKey | null;
  researchStartTime?: number;
  researchEndTime?: number;
}): GameState {
  const state = createNewGameState()
  
  if (researchState.activeResearch !== undefined) {
    state.research.activeResearch = researchState.activeResearch
  }
  if (researchState.researchStartTime !== undefined) {
    state.research.researchStartTime = researchState.researchStartTime
  }
  if (researchState.researchEndTime !== undefined) {
    state.research.researchEndTime = researchState.researchEndTime
  }
  
  return state
}

/**
 * Assert that a game state has specific action unlock states
 */
export function expectGameStateActionUnlocks(
  state: GameState,
  expectedUnlocks: Partial<Record<string, boolean>>
): void {
  for (const [key, expectedUnlocked] of Object.entries(expectedUnlocks)) {
    if (key in state.actions.unlocks && expectedUnlocked !== undefined) {
      expect(state.actions.unlocks[key as keyof typeof state.actions.unlocks]?.unlocked).toBe(expectedUnlocked)
    }
  }
}

/**
 * Assert that a game state has specific event state
 */
export function expectGameStateEvents(
  state: GameState,
  expectedEvents: {
    activeEvent?: EventKey | null;
    activeEventStartTime?: number;
    nextEventTime?: number;
    eventHistoryLength?: number;
  }
): void {
  if (expectedEvents.activeEvent !== undefined) {
    expect(state.events.activeEvent).toBe(expectedEvents.activeEvent)
  }
  if (expectedEvents.activeEventStartTime !== undefined) {
    expect(state.events.activeEventStartTime).toBe(expectedEvents.activeEventStartTime)
  }
  if (expectedEvents.nextEventTime !== undefined) {
    expect(state.events.nextEventTime).toBe(expectedEvents.nextEventTime)
  }
  if (expectedEvents.eventHistoryLength !== undefined) {
    expect(state.events.eventHistory).toHaveLength(expectedEvents.eventHistoryLength)
  }
}

/**
 * Assert that a game state has specific research state
 */
export function expectGameStateResearch(
  state: GameState,
  expectedResearch: {
    activeResearch?: TechnologyKey | null;
    researchStartTime?: number;
    researchEndTime?: number;
  }
): void {
  if (expectedResearch.activeResearch !== undefined) {
    expect(state.research.activeResearch).toBe(expectedResearch.activeResearch)
  }
  if (expectedResearch.researchStartTime !== undefined) {
    expect(state.research.researchStartTime).toBe(expectedResearch.researchStartTime)
  }
  if (expectedResearch.researchEndTime !== undefined) {
    expect(state.research.researchEndTime).toBe(expectedResearch.researchEndTime)
  }
}
