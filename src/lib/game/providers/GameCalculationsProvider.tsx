"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useGameCalculations, useGameTime } from '@/hooks';
import { formatNumber as fmt } from '@/lib/game/utils/number';
import type { GameUtilityFunctions } from '@/lib/game/types/context';
import type { Multipliers, ResourceKey, TechnologyKey, PrestigeUpgradeKey, ResourceCost } from '@/lib/game/types';
import { useGameStateContext } from '@/lib/game/providers/GameStateProvider';

interface GameCalculationsContextType extends GameUtilityFunctions {
  perSec: Record<ResourceKey, number>;
  prestigePotential: number;
  multipliers: Multipliers | null;
  technologyCosts: Record<TechnologyKey, ResourceCost>;
  upgradeCosts: Record<PrestigeUpgradeKey, number>;
  timeUntilNextEvent: string;
  secondsUntilNextEvent: number;
  timeUntilNextSave: string;
  secondsUntilNextSave: number;
}

const GameCalculationsContext = createContext<GameCalculationsContextType | undefined>(undefined);

interface GameCalculationsProviderProps {
  children: ReactNode;
}

export function GameCalculationsProvider({ children }: GameCalculationsProviderProps) {
  const { state, lastSavedAt } = useGameStateContext();
  
  // Game calculations - now flattened for direct access
  const gameCalculations = useGameCalculations(state);
  
  // Time calculations
  const { timeValues } = useGameTime(state, lastSavedAt);

  const contextValue: GameCalculationsContextType = {
    // Utility functions - direct access from flattened structure
    fmt,
    costFor: gameCalculations.memoizedCostFor,
    canAfford: gameCalculations.memoizedCanAfford,
    
    // Game calculations - direct access from flattened structure
    perSec: gameCalculations.perSec as Record<ResourceKey, number>,
    prestigePotential: gameCalculations.prestigePotential,
    multipliers: gameCalculations.multipliers,
    technologyCosts: gameCalculations.technologyCosts,
    upgradeCosts: gameCalculations.upgradeCosts,
    
    // Time info
    timeUntilNextEvent: timeValues.timeUntilNextEvent,
    secondsUntilNextEvent: timeValues.secondsUntilNextEvent,
    timeUntilNextSave: timeValues.timeUntilNextSave,
    secondsUntilNextSave: timeValues.secondsUntilNextSave,
  };

  return (
    <GameCalculationsContext.Provider value={contextValue}>
      {children}
    </GameCalculationsContext.Provider>
  );
}

export function useGameCalculationsContext(): GameCalculationsContextType {
  const context = useContext(GameCalculationsContext);
  if (context === undefined) {
    throw new Error('useGameCalculationsContext must be used within a GameCalculationsProvider');
  }
  return context;
}
