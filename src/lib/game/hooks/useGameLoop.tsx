import { useEffect, useRef, useCallback } from 'react';
import { GAME_CONSTANTS } from '../constants';
import { tick } from '../actions';
import type { GameState } from '../types';

export function useGameLoop(
  state: GameState | null,
  onStateUpdate: (newState: GameState) => void,
  onTickComplete: (tickDuration: number) => void
) {
  // Use ref to track current state for tick loop to avoid conflicts with rapid clicks
  const stateRef = useRef<GameState | null>(null);
  stateRef.current = state;
  
  // Ref to collect pending state updates for batching
  // This allows multiple game ticks to be processed before updating React state
  const pendingStateUpdatesRef = useRef<GameState | null>(null);

  // Optimized tick function wrapped in useCallback to prevent recreation
  const processTick = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState) return null;
    
    // Measure tick performance
    const tickStartTime = performance.now();
    
    // Run game logic tick - this happens every 50ms (20 FPS)
    const newState = tick(currentState, 1 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // Measure tick completion time
    const tickEndTime = performance.now();
    const tickDuration = tickEndTime - tickStartTime;
    
    // Early return if no changes occurred (optimization)
    if (newState === currentState) return null;
    
    return { newState, tickDuration };
  }, []);

  // High-frequency game loop (20 FPS) for responsive building production and smooth gameplay
  // Runs independently of user actions to ensure buildings always produce resources
  useEffect(() => {
    if (!state) return;
    
    // Initialize refs with current state
    stateRef.current = state;
    pendingStateUpdatesRef.current = state;
    
    // Game loop: Collects state updates for batching
    // Game logic runs at full speed (20 FPS), but React state updates are batched
    const gameLoopInterval = setInterval(() => {
      // Use optimized tick function
      const tickResult = processTick();
      if (!tickResult) return; // Early return if no changes
      
      const { newState, tickDuration } = tickResult;
      
      // Collect state updates for batching instead of immediately updating
      pendingStateUpdatesRef.current = newState;
      
      // Notify parent about tick completion for performance monitoring
      onTickComplete(tickDuration);
    }, 1000 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // React state update interval: Processes batched updates
    // Synchronized with game loop at 20 FPS, but processes accumulated changes
    const stateUpdateInterval = setInterval(() => {
      // Update React state with batched game state updates
      if (pendingStateUpdatesRef.current) {
        // Update React state with the latest batched state
        onStateUpdate(pendingStateUpdatesRef.current);
        
        // Update stateRef for next tick to use the latest state
        stateRef.current = pendingStateUpdatesRef.current;
        
        // Clear pending updates after processing
        pendingStateUpdatesRef.current = null;
      }
    }, 1000 / GAME_CONSTANTS.UI_UPDATE_RATE);
    
    return () => {
      clearInterval(gameLoopInterval);
      clearInterval(stateUpdateInterval);
    };
  }, [state, processTick, onStateUpdate, onTickComplete]);

  return {
    processTick,
  };
}
