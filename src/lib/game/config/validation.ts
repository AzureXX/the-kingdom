import { CONFIG } from './index';
import type { ResourceKey, BuildingKey, TechnologyKey, PrestigeUpgradeKey, EventKey } from './index';

/**
 * Configuration validation functions
 * These functions check that the game configuration is valid at startup
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate resource configuration
 */
export function validateResources(): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  // Check if all required resources exist
  const requiredResources: ResourceKey[] = ['gold', 'wood', 'stone', 'food', 'prestige', 'researchPoints'];
  
  for (const resourceKey of requiredResources) {
    if (!CONFIG.resources[resourceKey]) {
      result.errors.push(`Missing required resource: ${resourceKey}`);
      result.isValid = false;
    } else {
      const resource = CONFIG.resources[resourceKey];
      if (typeof resource.start !== 'number') {
        result.errors.push(`Resource ${resourceKey} missing start value`);
        result.isValid = false;
      }
      if (!resource.name || typeof resource.name !== 'string') {
        result.errors.push(`Resource ${resourceKey} missing or invalid name`);
        result.isValid = false;
      }
    }
  }
  
  return result;
}

/**
 * Validate building configuration
 */
export function validateBuildings(): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  // Check if all required buildings exist
  const requiredBuildings: BuildingKey[] = ['woodcutter', 'quarry', 'farm', 'blacksmith', 'castle', 'library', 'university', 'laboratory'];
  
  for (const buildingKey of requiredBuildings) {
    if (!CONFIG.buildings[buildingKey]) {
      result.errors.push(`Missing required building: ${buildingKey}`);
      result.isValid = false;
    } else {
      const building = CONFIG.buildings[buildingKey];
      if (!building.name || typeof building.name !== 'string') {
        result.errors.push(`Building ${buildingKey} missing or invalid name`);
        result.isValid = false;
      }
      if (!building.baseCost || typeof building.baseCost !== 'object') {
        result.errors.push(`Building ${buildingKey} missing or invalid baseCost`);
        result.isValid = false;
      }
      if (typeof building.costScale !== 'number' || building.costScale <= 1) {
        result.errors.push(`Building ${buildingKey} has invalid costScale: ${building.costScale}`);
        result.isValid = false;
      }
    }
  }
  
  return result;
}

/**
 * Validate technology configuration
 */
export function validateTechnologies(): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  // Check if all required technologies exist
  const requiredTechnologies: TechnologyKey[] = ['writing', 'mathematics', 'engineering', 'chemistry', 'physics', 'biology'];
  
  for (const techKey of requiredTechnologies) {
    if (!CONFIG.technologies[techKey]) {
      result.errors.push(`Missing required technology: ${techKey}`);
      result.isValid = false;
    } else {
      const tech = CONFIG.technologies[techKey];
      if (!tech.name || typeof tech.name !== 'string') {
        result.errors.push(`Technology ${techKey} missing or invalid name`);
        result.isValid = false;
      }
      if (!tech.baseCost || typeof tech.baseCost !== 'object') {
        result.errors.push(`Technology ${techKey} missing or invalid baseCost`);
        result.isValid = false;
      }
      if (typeof tech.researchTime !== 'number' || tech.researchTime <= 0) {
        result.errors.push(`Technology ${techKey} has invalid researchTime: ${tech.researchTime}`);
        result.isValid = false;
      }
    }
  }
  
  return result;
}

/**
 * Validate prestige configuration
 */
export function validatePrestige(): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  // Check if all required upgrades exist
  const requiredUpgrades: PrestigeUpgradeKey[] = ['royalDecrees', 'masterCraftsmen', 'fertileLands', 'militaryMight'];
  
  for (const upgradeKey of requiredUpgrades) {
    if (!CONFIG.prestige.upgrades[upgradeKey]) {
      result.errors.push(`Missing required prestige upgrade: ${upgradeKey}`);
      result.isValid = false;
    } else {
      const upgrade = CONFIG.prestige.upgrades[upgradeKey];
      if (!upgrade.name || typeof upgrade.name !== 'string') {
        result.errors.push(`Upgrade ${upgradeKey} missing or invalid name`);
        result.isValid = false;
      }
      if (typeof upgrade.max !== 'number' || upgrade.max <= 0) {
        result.errors.push(`Upgrade ${upgradeKey} has invalid max level: ${upgrade.max}`);
        result.isValid = false;
      }
      if (typeof upgrade.costCurve !== 'function') {
        result.errors.push(`Upgrade ${upgradeKey} missing costCurve function`);
        result.isValid = false;
      }
    }
  }
  
  return result;
}

/**
 * Validate events configuration
 */
export function validateEvents(): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  // Check if all required events exist
  const requiredEvents: EventKey[] = ['merchantVisit', 'banditRaid', 'bountifulHarvest', 'drought', 'royalTax', 'mysteriousStranger', 'plague', 'festival'];
  
  for (const eventKey of requiredEvents) {
    if (!CONFIG.events[eventKey]) {
      result.errors.push(`Missing required event: ${eventKey}`);
      result.isValid = false;
    } else {
      const event = CONFIG.events[eventKey];
      if (!event.name || typeof event.name !== 'string') {
        result.errors.push(`Event ${eventKey} missing or invalid name`);
        result.isValid = false;
      }
      if (!event.choices || !Array.isArray(event.choices) || event.choices.length === 0) {
        result.errors.push(`Event ${eventKey} missing or invalid choices`);
        result.isValid = false;
      }
      if (typeof event.weight !== 'number' || event.weight <= 0) {
        result.errors.push(`Event ${eventKey} has invalid weight: ${event.weight}`);
        result.isValid = false;
      }
    }
  }
  
  return result;
}

/**
 * Validate all configuration
 */
export function validateAllConfig(): ValidationResult {
  const result: ValidationResult = { isValid: true, errors: [], warnings: [] };
  
  // Validate each section
  const validations = [
    validateResources(),
    validateBuildings(),
    validateTechnologies(),
    validatePrestige(),
    validateEvents()
  ];
  
  // Combine all results
  for (const validation of validations) {
    if (!validation.isValid) {
      result.isValid = false;
    }
    result.errors.push(...validation.errors);
    result.warnings.push(...validation.warnings);
  }
  
  return result;
}
