// Save timing logic

import { GAME_CONSTANTS } from '@/lib/game/constants';

/**
 * Get time until next save in seconds
 */
export function getTimeUntilNextSave(lastSavedAt: number | null, currentTime: number): number {
  if (!lastSavedAt) {
    // If no save yet, calculate from current time
    const timeSinceStart = currentTime % GAME_CONSTANTS.SAVE_INTERVAL_MS;
    const timeUntilNextSave = GAME_CONSTANTS.SAVE_INTERVAL_MS - timeSinceStart;
    return Math.max(0, Math.ceil(timeUntilNextSave / GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND));
  }
  
  const timeSinceLastSave = currentTime - lastSavedAt;
  const timeUntilNextSave = GAME_CONSTANTS.SAVE_INTERVAL_MS - timeSinceLastSave;  
  
  // Return 0 when it's time to save (or slightly past due)
  if (timeUntilNextSave <= 0) {
    return 0;
  }
  
  const result = Math.ceil(timeUntilNextSave / GAME_CONSTANTS.TIME_CONSTANTS.MILLISECONDS_PER_SECOND);
  return result;
}

/**
 * Get formatted time until next save
 */
export function getFormattedTimeUntilNextSave(lastSavedAt: number | null, currentTime: number): string {
  const seconds = getTimeUntilNextSave(lastSavedAt, currentTime);
  
  if (seconds <= 0) {
    // If it's time to save or slightly past due, show "Saving..." briefly
    // This will be updated to the actual countdown once the save completes
    return 'Saving...';
  }
  
  const minutes = Math.floor(seconds / GAME_CONSTANTS.TIME_CONSTANTS.SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % GAME_CONSTANTS.TIME_CONSTANTS.SECONDS_PER_MINUTE;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${seconds}s`;
  }
}
