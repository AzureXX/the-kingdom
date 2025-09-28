// Research loop action definitions

import type { LoopActionDef } from '@/lib/game/types/loopActions';

/**
 * Research loop actions - scientific and educational operations
 */
export const RESEARCH_LOOP_ACTIONS: Record<string, LoopActionDef> = {
  ongoingResearch: {
    name: 'Ongoing Research',
    icon: '📚',
    description: 'Continuous research operation.',
    cost: { food: 10 },
    gains: { researchPoints: 5 },
    unlockConditions: [{ type: 'building', key: 'library', value: 1 }],
    loopPointsRequired: 3000,
    loopCategory: 'research',
    showWhenLocked: false,
  },
  
  advancedStudies: {
    name: 'Advanced Studies',
    icon: '🎓',
    description: 'Advanced research operation.',
    cost: { food: 15, gold: 5 },
    gains: { researchPoints: 10 },
    unlockConditions: [{ type: 'building', key: 'university', value: 1 }],
    loopPointsRequired: 5000,
    loopCategory: 'research',
    showWhenLocked: false,
  }
};
