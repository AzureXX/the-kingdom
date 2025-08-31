# Refactoring Plan for Medieval Kingdom Idle Game

## Overview
This document outlines refactoring opportunities identified in the codebase, prioritized by importance and estimated difficulty. The analysis focuses on maintainability, performance, and code quality without over-engineering.

## High Priority Refactoring

### 1. Action System Type Safety & Validation
**Difficulty: Medium (3-4 changes needed)**
**Impact: High - Critical for game stability**

**Issues:**
- Action validation logic is scattered across multiple files
- Type safety could be improved for action unlock conditions
- Action status calculation is complex and could be simplified

**Files to modify:**
- `src/lib/game/utils/actionValidation.ts`
- `src/lib/game/types/actions.ts`
- `src/lib/game/config/actions.ts`

**Recommended changes:**
- Consolidate action validation into a single, more robust system
- Improve type safety for unlock conditions
- Simplify action status calculation logic

### 2. Game Loop Performance Optimization
**Difficulty: Medium (2-3 changes needed)**
**Impact: High - Affects game performance**

**Issues:**
- Game loop runs at 20 FPS which may be excessive for an idle game
- Tick processing could be optimized to reduce unnecessary state updates
- Performance monitoring adds overhead to every tick

**Files to modify:**
- `src/lib/game/hooks/useGameLoop.tsx`
- `src/lib/game/actions.ts`

**Recommended changes:**
- Consider reducing tick rate to 10 FPS for better performance
- Optimize tick processing to avoid unnecessary state updates
- Move performance monitoring to lower frequency

### 3. Error Handling Consolidation
**Difficulty: Low-Medium (2-3 changes needed)**
**Impact: Medium - Improves debugging and stability**

**Issues:**
- Error handling is scattered across multiple utility files
- Some error handlers return default values silently
- Error logging could be more consistent

**Files to modify:**
- `src/lib/game/utils/errorLogger.ts`
- `src/lib/game/actions.ts`
- `src/lib/game/calculations.ts`

**Recommended changes:**
- Consolidate error handling patterns
- Improve error recovery strategies
- Make error logging more consistent

## Medium Priority Refactoring

### 4. State Update Optimization
**Difficulty: Medium (3-4 changes needed)**
**Impact: Medium - Performance improvement**

**Issues:**
- Some state updates create unnecessary object copies
- Resource updates could be batched more efficiently
- Building and upgrade updates could be optimized

**Files to modify:**
- `src/lib/game/gameState.ts`
- `src/lib/game/actions.ts`
- `src/lib/game/loopActionEngine.ts`

**Recommended changes:**
- Batch resource updates where possible
- Optimize state update functions to minimize object creation
- Improve structural sharing for better performance

### 5. Configuration System Simplification
**Difficulty: Low (1-2 changes needed)**
**Impact: Low-Medium - Developer experience**

**Issues:**
- Configuration files have some duplication
- Type definitions could be more DRY
- Some config values could be computed instead of hardcoded

**Files to modify:**
- `src/lib/game/config/index.ts`
- `src/lib/game/constants/index.ts`

**Recommended changes:**
- Reduce configuration duplication
- Make some values computed rather than hardcoded
- Improve type safety in configuration

## Low Priority Refactoring

### 6. Hook Organization
**Difficulty: Low (1-2 changes needed)**
**Impact: Low - Code organization**

**Issues:**
- Some hooks could be combined or split for better organization
- Hook dependencies could be optimized

**Files to modify:**
- `src/lib/game/hooks/index.ts`
- `src/lib/game/hooks/useGameLoop.tsx`

**Recommended changes:**
- Consider combining related hooks
- Optimize hook dependencies

### 7. Type Export Organization
**Difficulty: Low (1 change needed)**
**Impact: Low - Developer experience**

**Issues:**
- Type exports could be better organized
- Some types are re-exported unnecessarily

**Files to modify:**
- `src/lib/game/types/index.ts`

**Recommended changes:**
- Clean up unnecessary type re-exports
- Better organize type exports by category

## Implementation Steps

Each refactoring item is broken down into small, self-contained steps that can be completed independently without breaking functionality.

### 1. Action System Type Safety & Validation

#### Step 1.1: Consolidate Action Validation Logic
**Files**: `src/lib/game/utils/actionValidation.ts`
**Changes**: 
- Move all action validation functions into a single `ActionValidator` class
- Consolidate `canExecuteAction`, `isActionUnlocked`, `isActionOnCooldown` into unified validation
- **Testing**: Verify all existing actions still work correctly

#### Step 1.2: Improve Type Safety for Unlock Conditions
**Files**: `src/lib/game/types/actions.ts`
**Changes**:
- Add discriminated union types for unlock conditions
- Create specific interfaces for each condition type
- **Testing**: Ensure TypeScript compilation passes and types are more restrictive

#### Step 1.3: Simplify Action Status Calculation
**Files**: `src/lib/game/utils/actionValidation.ts`
**Changes**:
- Refactor `getActionStatus` to use the new validation system
- Reduce complexity by leveraging consolidated validation logic
- **Testing**: Verify action status displays correctly in UI

#### Step 1.4: Update Action Configuration
**Files**: `src/lib/game/config/actions.ts`
**Changes**:
- Update action definitions to use new type system
- Ensure all actions have proper unlock conditions
- **Testing**: Verify all actions unlock and execute as expected

### 2. Game Loop Performance Optimization

#### Step 2.1: Reduce Tick Rate
**Files**: `src/lib/game/constants/game.ts`
**Changes**:
- Change `GAME_TICK_RATE` from 20 to 10
- Update `PERFORMANCE_METRICS_UPDATE_INTERVAL` accordingly
- **Testing**: Verify game still feels responsive, buildings produce correctly

#### Step 2.2: Optimize Tick Processing
**Files**: `src/lib/game/hooks/useGameLoop.tsx`
**Changes**:
- Add early return if state hasn't changed
- Optimize the `processTick` function to avoid unnecessary work
- **Testing**: Verify game loop performance improves, no visual glitches

#### Step 2.3: Move Performance Monitoring
**Files**: `src/lib/game/hooks/useGameLoop.tsx`, `src/lib/game/hooks/usePerformanceMonitor.tsx`
**Changes**:
- Reduce performance monitoring frequency
- Only update metrics every 5-10 ticks instead of every tick
- **Testing**: Verify performance monitoring still works, less overhead

### 3. Error Handling Consolidation

#### Step 3.1: Consolidate Error Handler Patterns
**Files**: `src/lib/game/utils/errorLogger.ts`
**Changes**:
- Create unified error handling interface
- Consolidate `createValidationErrorHandler`, `createCalculationErrorHandler`
- **Testing**: Verify error logging still works, no functionality broken

#### Step 3.2: Improve Error Recovery Strategies
**Files**: `src/lib/game/actions.ts`, `src/lib/game/calculations.ts`
**Changes**:
- Replace silent default returns with proper error recovery
- Add fallback behavior for critical errors
- **Testing**: Verify errors are handled gracefully, game doesn't crash

#### Step 3.3: Make Error Logging Consistent
**Files**: `src/lib/game/utils/errorLogger.ts`
**Changes**:
- Standardize error message format
- Add consistent error categorization
- **Testing**: Verify error messages are clear and consistent

### 4. State Update Optimization

#### Step 4.1: Batch Resource Updates
**Files**: `src/lib/game/gameState.ts`
**Changes**:
- Create `batchUpdateResources` function
- Optimize `updateMultipleResources` to minimize object creation
- **Testing**: Verify resource updates work correctly, no data corruption

#### Step 4.2: Optimize State Update Functions
**Files**: `src/lib/game/actions.ts`
**Changes**:
- Use structural sharing more effectively
- Minimize unnecessary object copying in state updates
- **Testing**: Verify actions still work, state updates are correct

#### Step 4.3: Improve Building and Upgrade Updates
**Files**: `src/lib/game/loopActionEngine.ts`
**Changes**:
- Optimize loop action state updates
- Reduce object creation in action processing
- **Testing**: Verify loop actions work correctly, no performance regression

### 5. Configuration System Simplification

#### Step 5.1: Reduce Configuration Duplication
**Files**: `src/lib/game/config/index.ts`
**Changes**:
- Identify and remove duplicate configuration values
- Create computed values where possible
- **Testing**: Verify all config values are still accessible

#### Step 5.2: Make Values Computed
**Files**: `src/lib/game/config/buildings.ts`, `src/lib/game/config/technologies.ts`
**Changes**:
- Convert hardcoded values to computed functions
- Use base values and multipliers where appropriate
- **Testing**: Verify building costs and technology requirements still work

#### Step 5.3: Improve Type Safety in Configuration
**Files**: `src/lib/game/config/index.ts`
**Changes**:
- Add stricter typing for configuration objects
- Ensure all config values have proper types
- **Testing**: Verify TypeScript compilation passes

### 6. Hook Organization

#### Step 6.1: Combine Related Hooks
**Files**: `src/lib/game/hooks/index.ts`
**Changes**:
- Group related hooks together
- Consider combining `useGameCalculations` and `useGameActions` if they're always used together
- **Testing**: Verify all hooks still work independently

#### Step 6.2: Optimize Hook Dependencies
**Files**: `src/lib/game/hooks/useGameLoop.tsx`
**Changes**:
- Review and optimize `useEffect` dependencies
- Ensure hooks don't recreate unnecessarily
- **Testing**: Verify hooks don't cause infinite re-renders

### 7. Type Export Organization

#### Step 7.1: Clean Up Type Re-exports
**Files**: `src/lib/game/types/index.ts`
**Changes**:
- Remove unnecessary type re-exports
- Organize exports by category (resources, buildings, etc.)
- **Testing**: Verify all types are still accessible where needed

### 8. Context Value Memoization Optimization

#### Step 8.1: Split Large Context Value
**Files**: `src/lib/game/GameContext.tsx`
**Changes**:
- Split `GameContextType` into smaller, focused interfaces
- Create separate contexts for different concerns (actions, calculations, time)
- **Testing**: Verify all components still receive needed context values

#### Step 8.2: Optimize Memoization Dependencies
**Files**: `src/lib/game/GameContext.tsx`
**Changes**:
- Review and optimize `useMemo` dependencies
- Ensure context value only updates when necessary
- **Testing**: Verify context updates don't cause unnecessary re-renders

#### Step 8.3: Consider Context Selectors
**Files**: `src/lib/game/GameContext.tsx`
**Changes**:
- Add context selector functions for better performance
- Allow components to subscribe to specific context values
- **Testing**: Verify selectors work correctly, performance improves

### 9. Save System Error Handling

#### Step 9.1: Add Proper Error Handling
**Files**: `src/lib/game/saveSystem.ts`
**Changes**:
- Replace silent error handling with proper error logging
- Add error recovery mechanisms
- **Testing**: Verify save errors are logged, game doesn't crash

#### Step 9.2: Provide User Feedback
**Files**: `src/lib/game/hooks/useSaveSystem.tsx`
**Changes**:
- Add error state to save system hook
- Provide user feedback when saves fail
- **Testing**: Verify users are notified of save issues

#### Step 9.3: Log Save Errors
**Files**: `src/lib/game/saveSystem.ts`
**Changes**:
- Add comprehensive error logging for save operations
- Include context information for debugging
- **Testing**: Verify errors are logged with sufficient detail

### 10. Constants Organization

#### Step 10.1: Consolidate Related Constants
**Files**: `src/lib/game/constants/game.ts`
**Changes**:
- Group related constants together
- Remove scattered constants from other files
- **Testing**: Verify all constants are still accessible

#### Step 10.2: Make Values Computed
**Files**: `src/lib/game/constants/game.ts`
**Changes**:
- Convert hardcoded values to computed based on other constants
- Use mathematical relationships where possible
- **Testing**: Verify computed values are correct

#### Step 10.3: Remove Magic Numbers
**Files**: `src/lib/game/constants/game.ts`
**Changes**:
- Identify and replace magic numbers with named constants
- Add comments explaining constant relationships
- **Testing**: Verify no functionality is broken

### 11. Hook Dependencies Optimization

#### Step 11.1: Optimize useMemo Dependencies
**Files**: `src/lib/game/hooks/useGameCalculations.tsx`
**Changes**:
- Review and optimize `useMemo` dependency arrays
- Remove unnecessary dependencies
- **Testing**: Verify calculations still update when needed

#### Step 11.2: Split Large Memoized Objects
**Files**: `src/lib/game/hooks/useGameCalculations.tsx`
**Changes**:
- Break down large memoized objects into smaller ones
- Ensure each memoized value has minimal dependencies
- **Testing**: Verify performance improves, no unnecessary recalculations

#### Step 11.3: Remove Unnecessary Dependencies
**Files**: `src/lib/game/hooks/useGameActions.tsx`
**Changes**:
- Review `useCallback` dependencies
- Remove dependencies that don't affect the callback
- **Testing**: Verify actions still work correctly

## Implementation Guidelines

### Testing Strategy
- **Each step must be tested independently** before moving to the next
- **Performance impact should be measured** for optimization steps
- **Backward compatibility must be maintained** - no breaking changes
- **Visual regression testing** for UI-related changes

### Code Review Requirements
- Each step should be reviewed separately
- Performance improvements must be measurable
- Error handling changes must improve stability
- No functionality should be broken

### Rollback Strategy
- Each step should be committed separately
- If issues arise, individual steps can be reverted
- Maintain git history for easy rollback

### Performance Measurement
- Use browser dev tools to measure before/after
- Focus on frame rate, memory usage, and render times
- Document performance improvements for each step

## Additional Refactoring Opportunities (Re-examination)

### 8. Context Value Memoization Optimization
**Difficulty: Low-Medium (2-3 changes needed)**
**Impact: Medium - Performance improvement**

**Issues:**
- GameContext creates a large memoized value that could be split
- Some context values are recalculated unnecessarily
- Context dependency array could be optimized

**Files to modify:**
- `src/lib/game/GameContext.tsx`
- `src/lib/game/hooks/useGameCalculations.tsx`

**Recommended changes:**
- Split large context value into smaller, focused contexts
- Optimize memoization dependencies
- Consider using context selectors for better performance

### 9. Save System Error Handling
**Difficulty: Low (1-2 changes needed)**
**Impact: Low-Medium - User experience**

**Issues:**
- Save system silently ignores errors
- No user feedback when saves fail
- Error handling is too permissive

**Files to modify:**
- `src/lib/game/saveSystem.ts`
- `src/lib/game/hooks/useSaveSystem.tsx`

**Recommended changes:**
- Add proper error handling for save failures
- Provide user feedback for save issues
- Log save errors for debugging

### 10. Constants Organization
**Difficulty: Low (1-2 changes needed)**
**Impact: Low - Developer experience**

**Issues:**
- Some constants could be computed rather than hardcoded
- Constants are scattered across multiple files
- Some magic numbers exist in the code

**Files to modify:**
- `src/lib/game/constants/game.ts`
- `src/lib/game/constants/index.ts`

**Recommended changes:**
- Consolidate related constants
- Make some values computed based on other constants
- Remove magic numbers

### 11. Hook Dependencies Optimization
**Difficulty: Low-Medium (2-3 changes needed)**
**Impact: Low-Medium - Performance improvement**

**Issues:**
- Some hooks have unnecessary dependencies
- Some memoization could be more granular
- Hook dependency arrays could be optimized

**Files to modify:**
- `src/lib/game/hooks/useGameCalculations.tsx`
- `src/lib/game/hooks/useGameActions.tsx`

**Recommended changes:**
- Optimize useMemo and useCallback dependencies
- Split large memoized objects into smaller ones
- Remove unnecessary dependencies

## Conclusion
The codebase is generally well-structured and follows good practices. The refactoring opportunities identified focus on improving performance, maintainability, and developer experience without over-engineering. The high-priority items should be addressed first as they have the most impact on game stability and performance.

**Total Refactoring Items Identified: 11**
- **High Priority**: 3 items
- **Medium Priority**: 4 items  
- **Low Priority**: 4 items

The additional examination revealed several more opportunities, particularly around context optimization, save system robustness, and hook performance that could provide meaningful improvements to the codebase.
