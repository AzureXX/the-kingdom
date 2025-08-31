// Main constants index - re-exports all constants organized by system
export * from './game';
export * from './prestige';
export * from './events';
export * from './ui';

// Import constants for validation
import { GAME_CONSTANTS } from './game';
import { PRESTIGE_CONSTANTS } from './prestige';
import { EVENT_CONSTANTS } from './events';
import { UI_CONSTANTS } from './ui';

// Basic validation that all constants are properly defined
if (typeof GAME_CONSTANTS === 'undefined') {
  throw new Error('GAME_CONSTANTS not properly exported');
}
if (typeof PRESTIGE_CONSTANTS === 'undefined') {
  throw new Error('PRESTIGE_CONSTANTS not properly exported');
}
if (typeof EVENT_CONSTANTS === 'undefined') {
  throw new Error('EVENT_CONSTANTS not properly exported');
}
if (typeof UI_CONSTANTS === 'undefined') {
  throw new Error('UI_CONSTANTS not properly exported');
}

