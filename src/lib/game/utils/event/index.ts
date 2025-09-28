// Event system exports

// Event triggering
export { triggerRandomEvent } from '@/lib/game/utils/event/triggering';

// Event choices
export { canMakeEventChoice, makeEventChoice } from '@/lib/game/utils/event/choices';

// Event timing
export { checkAndTriggerEvents, getTimeUntilNextEvent, getFormattedTimeUntilNextEvent } from '@/lib/game/utils/event/timing';

// Event history
export { getEventHistory } from '@/lib/game/utils/event/history';

// Event state
export { getActiveEvent } from '@/lib/game/utils/event/state';
