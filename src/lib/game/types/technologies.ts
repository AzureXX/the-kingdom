// Technology-related type definitions

import type { ResourceCost } from './resources';
import type { BuildingKey } from './buildings';

export type TechnologyKey = 'writing' | 'mathematics' | 'engineering' | 'chemistry' | 'physics' | 'biology';

/**
 * Definition of a technology that can be researched by the player.
 * Technologies unlock advanced buildings and provide strategic depth to the game.
 */
export type TechnologyDef = {
  /** Human-readable name of the technology */
  name: string;
  
  /** Visual icon (emoji) representing the technology */
  icon: string;
  
  /** Detailed description of what the technology provides */
  desc: string;
  
  /** Base cost in resources to research this technology */
  baseCost: ResourceCost;
  
  /** Cost scaling factor for research (typically 1.0 for technologies) */
  costScale: number;
  
  /** Time in seconds required to complete research */
  researchTime: number;
  
  /** Prerequisite technologies that must be researched first (optional) */
  requiresTech?: TechnologyKey | TechnologyKey[];
  
  /** Buildings that become available after researching this technology (optional) */
  unlocksBuildings?: BuildingKey[];
  
  /** Custom effect function that runs when research completes (optional) */
  effect?: (state: { 
    resources: ResourceCost; 
    buildings: Record<BuildingKey, number>; 
    technologies: Record<TechnologyKey, number> 
  }) => void;
};
