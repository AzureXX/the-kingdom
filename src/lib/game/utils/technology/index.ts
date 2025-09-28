// Technology system exports

// Technology validation
export { hasAllRequiredTechnologies, hasPrerequisitesMet, canResearchTechnology } from './validation';

// Technology research
export { startResearch, checkResearchProgress, completeResearch } from './research';

// Technology progress
export { getResearchProgress, getResearchTimeRemaining } from './progress';

// Technology queries
export { getTechnologiesWithPrerequisitesMet, getAvailableTechnologies, getResearchedTechnologies } from './queries';
