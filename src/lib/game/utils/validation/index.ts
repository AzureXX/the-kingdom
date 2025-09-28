/**
 * Validation utilities barrel export
 * Provides a single entry point for all validation functions
 * 
 * @remarks
 * This module re-exports all validation functions from individual modules:
 * - Resource validation
 * - Building validation
 * - Technology validation
 * - Action validation
 * - Cross-reference validation
 * 
 * @example
 * ```typescript
 * import { 
 *   isValidResourceKey, 
 *   validateBuildings, 
 *   validateGameConfig 
 * } from './validation';
 * ```
 */

// Re-export all validation functions and types
export * from '@/lib/game/utils/validation/resourceValidation';
export * from '@/lib/game/utils/validation/buildingValidation';
export * from '@/lib/game/utils/validation/technologyValidation';
export * from '@/lib/game/utils/validation/actionValidation';
export * from '@/lib/game/utils/validation/crossReferenceValidation';
