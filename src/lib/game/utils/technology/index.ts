// Technology system exports

// Technology validation
export { hasAllRequiredTechnologies, hasPrerequisitesMet, canResearchTechnology } from '@/lib/game/utils/technology/validation';

// Technology research
export { startResearch, checkResearchProgress, completeResearch } from '@/lib/game/utils/technology/research';

// Technology progress
export { getResearchProgress, getResearchTimeRemaining } from '@/lib/game/utils/technology/progress';

// Technology queries
export { getTechnologiesWithPrerequisitesMet, getAvailableTechnologies, getResearchedTechnologies } from '@/lib/game/utils/technology/queries';
