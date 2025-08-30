import { useEffect, useRef, useCallback } from 'react';
import { GAME_CONSTANTS } from '../constants';
import { tick } from '../actions';
import { processLoopActionTick } from '../loopActionEngine';
import type { GameState } from '../types';

export function useGameLoop(
  state: GameState | null,
  onStateUpdate: (newState: GameState) => void,
  onTickComplete: (tickDuration: number) => void
) {
  // Use refs to track stable references and avoid unnecessary re-renders
  const stateRef = useRef<GameState | null>(null);
  const onStateUpdateRef = useRef(onStateUpdate);
  const onTickCompleteRef = useRef(onTickComplete);
  
  // Update refs when callbacks change to maintain latest references
  useEffect(() => {
    onStateUpdateRef.current = onStateUpdate;
  }, [onStateUpdate]);
  
  useEffect(() => {
    onTickCompleteRef.current = onTickComplete;
  }, [onTickComplete]);
  
  const processTick = useCallback(() => {
    const currentState = stateRef.current;
    if (!currentState) return null;
    
    // Measure tick performance
    const tickStartTime = performance.now();
    
    // Run game logic tick - this happens every 50ms (20 FPS)
    let newState = tick(currentState, 1 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // Process loop actions
    newState = processLoopActionTick(newState, 1 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    // Measure tick completion time
    const tickEndTime = performance.now();
    const tickDuration = tickEndTime - tickStartTime;
    
    // Early return if no changes occurred (optimization)
    if (newState === currentState) return null;
    
    return { newState, tickDuration };
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // High-frequency game loop (20 FPS) for responsive building production and smooth gameplay
  // Runs independently of user actions to ensure buildings always produce resources
  useEffect(() => {
    const gameLoopInterval = setInterval(() => {
      if(!stateRef.current) return;
      const tickResult = processTick();
      if (!tickResult) return;
      
      const { newState, tickDuration } = tickResult;
      
      onStateUpdateRef.current(newState);
      onTickCompleteRef.current(tickDuration);
    }, 1000 / GAME_CONSTANTS.GAME_TICK_RATE);
    
    return () => {
      clearInterval(gameLoopInterval);
    };
  }, [processTick]);

  return {
    processTick,
  };
}
