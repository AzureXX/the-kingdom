import { useState, useEffect, useRef, useMemo } from 'react';
import { getFormattedTimeUntilNextEvent, getTimeUntilNextEvent } from '../eventSystem';
import { getFormattedTimeUntilNextSave, getTimeUntilNextSave } from '../saveSystem';
import type { GameState } from '../types';
import { GAME_CONSTANTS } from '../constants';

export function useGameTime(
  state: GameState | null,
  lastSavedAt: number | null
) {
  const currentTimeRef = useRef<number>(Date.now());
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Timer to update display every second (optimized to reduce re-renders)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      currentTimeRef.current = now;
      setCurrentTime(now);
    }, GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND);
    
    return () => clearInterval(timer);
  }, []);

  // Memoize time calculations to prevent unnecessary recalculations
  const timeUntilNextEvent = useMemo(() => state ? getFormattedTimeUntilNextEvent(state) : '--', [state]);
  const secondsUntilNextEvent = useMemo(() => state ? getTimeUntilNextEvent(state) : 0, [state]);
  const timeUntilNextSave = useMemo(() => getFormattedTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);
  const secondsUntilNextSave = useMemo(() => getTimeUntilNextSave(lastSavedAt, currentTime), [lastSavedAt, currentTime]);

  // Group time-related values together for cleaner consumption
  const timeValues = useMemo(() => ({
    timeUntilNextEvent,
    secondsUntilNextEvent,
    timeUntilNextSave,
    secondsUntilNextSave,
  }), [timeUntilNextEvent, secondsUntilNextEvent, timeUntilNextSave, secondsUntilNextSave]);

  return {
    currentTime,
    currentTimeRef,
    timeValues,
  };
}
