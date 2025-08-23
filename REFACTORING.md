# Refactoring Analysis - Medieval Kingdom Idle Game

## Overview
This document identifies areas in the codebase that would benefit from refactoring, organized by priority and estimated difficulty.

## High Priority (Critical Issues)

### 1. GameContext.tsx - Massive Component Refactoring
**Difficulty: High (15+ changes needed)**
- **Issue**: Single file is 453 lines with too many responsibilities
- **Problems**:
  - Mixes game logic, state management, performance monitoring, and UI updates
  - Complex game loop logic mixed with React state management
  - Hard to test individual pieces
  - Difficult to maintain and debug

#### Step-by-Step Breakdown:

**Step 1.1: Extract Performance Monitoring (2-3 changes)** ✅ **COMPLETE**
- ✅ Create `src/lib/game/hooks/usePerformanceMonitor.tsx`
- ✅ Move performance metrics state and refs
- ✅ Move performance update logic
- ✅ Update GameContext to use the new hook
- ✅ Fully encapsulate performance monitoring within the hook
- ✅ Remove manual frame counting and update frequency logic from GameContext
- ✅ Create hooks index file for clean imports

**Step 1.2: Extract Save System Logic (3-4 changes)** ✅ **COMPLETE**
- ✅ Create `src/lib/game/hooks/useSaveSystem.tsx`
- ✅ Move autosave logic and save state management
- ✅ Move import/export handlers
- ✅ Move save timing calculations
- ✅ Update GameContext to use the new hook
- ✅ Remove unused imports from GameContext
- ✅ Fully encapsulate save system logic within the hook

**Step 1.3: Extract Game Loop Logic (4-5 changes)** ✅ **COMPLETE**
- ✅ Create `src/lib/game/hooks/useGameLoop.tsx`
- ✅ Move game loop interval logic
- ✅ Move state batching mechanism
- ✅ Move tick processing logic
- ✅ Move frame counting and timing
- ✅ Update GameContext to use the new hook
- ✅ Remove unused imports from GameContext
- ✅ Fully encapsulate game loop logic within the hook

**Step 1.4: Extract Time Management (2-3 changes)**
- Create `src/lib/game/hooks/useGameTime.tsx`
- Move current time state and updates
- Move event timing calculations
- Move save timing calculations
- Update GameContext to use the new hook

**Step 1.5: Extract Action Handlers (2-3 changes)**
- Create `src/lib/game/hooks/useGameActions.tsx`
- Move all handleClick, handleBuyBuilding, etc. functions
- Move action-related memoization
- Update GameContext to use the new hook

**Step 1.6: Extract Memoized Calculations (2-3 changes)**
- Create `src/lib/game/hooks/useGameCalculations.tsx`
- Move perSec, prestigePotential, multipliers calculations
- Move cost calculations and memoization
- Update GameContext to use the new hook

**Step 1.7: Clean Up GameContext (2-3 changes)**
- Remove extracted logic from GameContext
- Simplify context value creation
- Update imports and dependencies
- Ensure all hooks work together properly

**Step 1.8: Create Hook Index (1 change)**
- Create `src/lib/game/hooks/index.ts`
- Export all new hooks for easy importing
- Update GameContext imports

**Step 1.9: Add Error Boundaries (1-2 changes)**
- Wrap each hook with error handling
- Add fallback states for hook failures
- Ensure graceful degradation

**Step 1.10: Testing and Validation (2-3 changes)**
- Test each hook individually
- Verify game functionality still works
- Check performance impact
- Validate state consistency

### 2. Type Safety and Configuration Issues
**Difficulty: Medium (8-10 changes needed)**
- **Issue**: Inconsistent type usage and configuration structure
- **Problems**:
  - `Partial<Record<ResourceKey, number>>` used everywhere instead of proper resource cost types
  - Configuration objects lack proper typing for effects and requirements
  - Magic numbers and strings scattered throughout
- **Refactoring needed**:
  - Create proper typed interfaces for costs, effects, and requirements
  - Add validation for configuration objects
  - Replace magic numbers with named constants
  - Add runtime type checking for configuration

### 3. State Management Architecture
**Difficulty: High (12+ changes needed)**
- **Issue**: Complex state updates with manual immutability handling
- **Problems**:
  - Manual object spreading everywhere
  - Risk of mutation bugs
  - Inconsistent state update patterns
  - Performance issues with large state objects
- **Refactoring needed**:
  - Implement proper immutable state management (Immer or similar)
  - Create standardized state update patterns
  - Add state validation and debugging tools
  - Optimize state updates for performance

## Medium Priority (Important Improvements)

### 4. Performance Optimization Issues
**Difficulty: Medium (6-8 changes needed)**
- **Issue**: Complex performance monitoring mixed with game logic
- **Problems**:
  - Performance metrics update every 10 frames but game runs at 20 FPS
  - Memory usage tracking may not work in all browsers
  - Render time calculation is imprecise
- **Refactoring needed**:
  - Simplify performance monitoring
  - Use `requestAnimationFrame` instead of setInterval for game loop
  - Implement proper frame rate limiting
  - Add performance profiling tools

### 5. File Structure and Organization
**Difficulty: Low-Medium (5-7 changes needed)**
- **Issue**: Some files are too large and have mixed responsibilities
- **Problems**:
  - `actions.ts` mixes different types of actions
  - `calculations.ts` has too many different calculation functions
  - Some utility functions could be better organized
- **Refactoring needed**:
  - Split `actions.ts` into logical groups (building actions, upgrade actions, etc.)
  - Group related calculation functions
  - Create proper utility modules
  - Add index files for better imports

### 6. Error Handling and Validation
**Difficulty: Medium (4-6 changes needed)**
- **Issue**: Limited error handling and validation
- **Problems**:
  - Save system silently fails
  - No validation of imported save data
  - Limited error boundaries
  - No user feedback for errors
- **Refactoring needed**:
  - Add comprehensive error handling
  - Implement save data validation
  - Add user-friendly error messages
  - Create error recovery mechanisms

## Low Priority (Nice to Have)

### 7. Code Duplication
**Difficulty: Low (3-4 changes needed)**
- **Issue**: Some repeated patterns in state updates
- **Problems**:
  - Similar update functions for different entity types
  - Repeated validation logic
  - Similar cost calculation patterns
- **Refactoring needed**:
  - Create generic update functions
  - Extract common validation logic
  - Standardize cost calculation patterns

### 8. Styling and CSS Organization
**Difficulty: Low (2-3 changes needed)**
- **Issue**: CSS is minified and hard to maintain
- **Problems**:
  - Minified CSS in development
  - No CSS variables for common values
  - Hard to modify themes
- **Refactoring needed**:
  - Unminify CSS for development
  - Add CSS custom properties for theming
  - Create design system tokens

### 9. Testing Infrastructure
**Difficulty: Medium (5-6 changes needed)**
- **Issue**: No testing setup
- **Problems**:
  - Hard to verify refactoring changes
  - No regression testing
  - Difficult to test game logic
- **Refactoring needed**:
  - Add Jest/Testing Library setup
  - Create test utilities for game state
  - Add unit tests for core game logic
  - Add integration tests for game flow

## Implementation Strategy

### Phase 1: Foundation (High Priority)
1. Extract game loop logic from GameContext
2. Implement proper immutable state management
3. Fix type safety issues

### Phase 2: Architecture (Medium Priority)
1. Refactor GameContext into smaller hooks
2. Improve performance monitoring
3. Add proper error handling

### Phase 3: Polish (Low Priority)
1. Clean up code duplication
2. Improve styling organization
3. Add testing infrastructure

## Estimated Total Effort
- **High Priority**: 35-40 changes
- **Medium Priority**: 25-30 changes  
- **Low Priority**: 10-15 changes
- **Total**: 70-85 changes across the codebase

## Risk Assessment
- **High Risk**: GameContext refactoring (could break game functionality)
- **Medium Risk**: State management changes (could introduce bugs)
- **Low Risk**: Styling and organization changes (mostly cosmetic)

## Recommendations
1. Start with Phase 1 to establish solid foundation
2. Test thoroughly after each major refactoring
3. Consider implementing feature flags for major changes
4. Document all changes thoroughly
5. Create rollback plan for critical refactoring
