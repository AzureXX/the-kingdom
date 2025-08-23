# Refactoring Priorities for The Kingdom Idle Game

This document outlines the refactoring needs identified in the codebase, prioritized by importance and estimated difficulty.

## 🔴 HIGH PRIORITY (Critical Issues)

### 1. Performance Optimization in Game Loop
**Difficulty: Medium (15-20 changes)**
- **Issue**: The main game loop runs at 20 FPS and updates state on every tick, causing unnecessary re-renders
- **Location**: `src/lib/game/GameContext.tsx` lines 180-220
- **Problems**:
  - State updates on every tick (50ms intervals)
  - Performance metrics update every 60 frames but still cause re-renders
  - No batching of state updates
- **Solution**: Implement state batching, reduce update frequency, use `useCallback` for expensive calculations

**Step-by-Step Implementation:**

**Step 1.1: Optimize Game Loop Frequency** ✅ **COMPLETED**
- Keep tick rate at minimum 20 FPS (50ms intervals) for smooth gameplay
- Separate game logic updates from React state updates
- Game logic runs at full speed (20-60 FPS), UI updates at 20 FPS
- Test that game feels responsive while reducing React re-renders

**Step 1.2: Implement State Update Batching**
- Create a `pendingStateUpdates` ref to collect changes
- Update React state every 50ms (20 FPS) to match game loop frequency
- Batch multiple tick results into single React state update
- Keep game logic running smoothly, synchronize UI updates with game updates

**Step 1.3: Optimize Performance Metrics Updates**
- Move performance metrics to refs instead of state
- Update metrics only when displayed (not every 60 frames)
- Add cleanup for performance monitoring

**Step 1.4: Memoize Expensive Calculations**
- Wrap `getPerSec`, `prestigePotential` calculations in `useMemo`
- Add dependency arrays to prevent unnecessary recalculations
- Test performance improvement with React DevTools Profiler

**Step 1.5: Optimize Tick Function**
- Reduce object creation in tick loop
- Use `useCallback` for tick function
- Implement early returns for unchanged states
- Ensure game logic runs at full speed (20-60 FPS) for smooth gameplay

**Important Note**: The goal is to keep the game running smoothly at minimum 20 FPS (50ms intervals) while optimizing React re-renders. Game logic and React state both update at 20 FPS (50ms intervals) to maintain synchronization. This ensures smooth gameplay and responsive UI updates while preventing unnecessary re-renders within the 50ms window. 20 FPS is the minimum acceptable frame rate for smooth idle game experience.

### 2. State Management Refactoring
**Difficulty: High (25-30 changes)**
- **Issue**: GameContext is doing too much - mixing game logic, UI state, and performance monitoring
- **Location**: `src/lib/game/GameContext.tsx`
- **Problems**:
  - Single context handles too many concerns
  - Complex memoization logic
  - Performance metrics mixed with game state
- **Solution**: Split into multiple contexts (GameState, UI, Performance), implement proper state management patterns

**Step-by-Step Implementation:**

**Step 2.1: Create GameState Context**
- Create new file `src/lib/game/contexts/GameStateContext.tsx`
- Move game state, actions, and calculations to this context
- Keep only game logic, remove UI and performance concerns
- Test that game functionality still works

**Step 2.2: Create UI Context**
- Create new file `src/lib/game/contexts/UIContext.tsx`
- Move modal states, help states, and UI-related state here
- Handle file import/export logic
- Test UI functionality independently

**Step 2.3: Create Performance Context**
- Create new file `src/lib/game/contexts/PerformanceContext.tsx`
- Move performance metrics and monitoring here
- Handle performance data collection and cleanup
- Test performance monitoring separately

**Step 2.4: Refactor Main GameContext**
- Update `src/lib/game/GameContext.tsx` to use the new contexts
- Remove duplicated logic and state
- Simplify the main context to just coordinate between others
- Test that all contexts work together

**Step 2.5: Update Component Dependencies**
- Update all components to use appropriate contexts
- Remove unnecessary context subscriptions
- Test that components render correctly with new structure

### 3. Type Safety and Validation Issues
**Difficulty: Medium (20-25 changes)**
- **Issue**: Inconsistent type usage and missing runtime validation
- **Location**: Throughout codebase, especially in config files and event system
- **Problems**:
  - Partial types used where full types are available
  - No runtime validation of save files or user inputs
  - Some function parameters lack proper typing
  - Event system has potential type safety issues
- **Solution**: Implement strict typing, add runtime validation with Zod, create proper discriminated unions

**Step-by-Step Implementation:**

**Step 3.1: Install and Configure Zod**
- Install Zod: `npm install zod`
- Create validation schemas for game state, resources, buildings
- Test schema validation with sample data

**Step 3.2: Improve Resource and Building Types**
- Update `src/lib/game/config/types.ts` with stricter types
- Replace `Partial<Record<ResourceKey, number>>` with proper resource objects
- Add validation for resource amounts and building costs
- Test type safety improvements

**Step 3.3: Add Save File Validation**
- Create Zod schema for save file format
- Validate imported save files before processing
- Add error handling for invalid save files
- Test with corrupted and valid save files

**Step 3.4: Improve Event System Types**
- Create discriminated union for event types
- Add proper typing for event choices and effects
- Validate event data at runtime
- Test event system type safety

**Step 3.5: Add Function Parameter Validation**
- Add Zod schemas for function parameters
- Implement runtime validation for critical functions
- Add proper error messages for validation failures
- Test validation with edge cases

## 🟡 MEDIUM PRIORITY (Important Improvements)

### 4. Error Handling and Validation
**Difficulty: Medium (15-20 changes)**
- **Issue**: Limited error handling for save/load operations and user inputs
- **Location**: `src/lib/game/saveSystem.ts`, `src/app/page.tsx`
- **Problems**:
  - Silent failures in save operations
  - No validation of imported save files
  - Limited error boundaries
- **Solution**: Add comprehensive error handling, implement save file validation, add user feedback

**Step-by-Step Implementation:**

**Step 4.1: Improve Save System Error Handling**
- Add try-catch blocks around localStorage operations
- Create user-friendly error messages for save failures
- Add retry logic for failed save operations
- Test error scenarios (quota exceeded, private browsing)

**Step 4.2: Add Import Validation and Error Handling**
- Validate file format before processing
- Check file size limits
- Add progress indicators for large imports
- Test with various file types and sizes

**Step 4.3: Enhance Error Boundaries**
- Update `src/components/ui/ErrorBoundary.tsx` with better error reporting
- Add error logging and analytics
- Create fallback UI for different error types
- Test error boundary with simulated errors

**Step 4.4: Add User Feedback for Operations**
- Show success/error notifications for save/load operations
- Add loading states for long-running operations
- Implement toast notifications for user actions
- Test user feedback in various scenarios

**Step 4.5: Add Input Validation**
- Validate user inputs in forms and modals
- Add client-side validation for resource amounts
- Show validation errors inline
- Test validation with edge cases

### 5. Component Memoization Issues
**Difficulty: Low (10-15 changes)**
- **Issue**: Some components re-render unnecessarily despite memo usage
- **Location**: `src/components/game/BuildingList.tsx`, `src/components/game/ResourceDisplay.tsx`
- **Problems**:
  - Props objects recreated on every render
  - Functions passed as props not properly memoized
  - Some calculations done in render
- **Solution**: Proper prop memoization, extract calculations to useMemo, optimize prop passing

**Step-by-Step Implementation:**

**Step 5.1: Optimize BuildingList Component**
- Extract `formatTechnologyRequirements` function outside component
- Memoize `unlockedBuildings` calculation with `useMemo`
- Use `useCallback` for click handlers
- Test re-render behavior with React DevTools

**Step 5.2: Optimize ResourceDisplay Component**
- Memoize resource calculations with `useMemo`
- Extract resource formatting logic
- Optimize conditional rendering logic
- Test performance improvements

**Step 5.3: Optimize TechnologyList Component**
- Memoize technology filtering and sorting
- Extract progress bar calculations
- Optimize prerequisite formatting
- Test component performance

**Step 5.4: Optimize UpgradeList Component**
- Memoize upgrade cost calculations
- Extract upgrade formatting logic
- Optimize button state calculations
- Test upgrade list performance

**Step 5.5: Add Performance Monitoring**
- Add `why-did-you-render` for development
- Monitor component re-render frequency
- Identify unnecessary re-renders
- Document performance improvements

### 6. Performance Monitoring Optimization
**Difficulty: Low (5-8 changes)**
- **Issue**: Performance metrics are stored in state and cause unnecessary re-renders
- **Location**: `src/components/ui/PerformanceMonitor.tsx`
- **Problems**:
  - Metrics update every 60 frames
  - No cleanup of performance data
  - Memory usage calculation may not work in all browsers
- **Solution**: Use refs for metrics, implement cleanup, add browser compatibility checks

**Step-by-Step Implementation:**

**Step 6.1: Convert Metrics to Refs**
- Replace `useState` with `useRef` for performance metrics
- Update metrics without triggering re-renders
- Keep metrics in sync with actual performance data
- Test that metrics still update correctly

**Step 6.2: Implement Cleanup and Memory Management**
- Add cleanup function for performance monitoring
- Clear intervals and timeouts on unmount
- Implement memory usage fallback for unsupported browsers
- Test cleanup in various scenarios

**Step 6.3: Optimize Update Frequency**
- Reduce metrics update frequency from 60 to 120 frames
- Only update displayed metrics when component is visible
- Add visibility API integration
- Test performance impact of reduced updates

**Step 6.4: Add Browser Compatibility**
- Check for `performance.memory` support
- Implement fallback memory calculation
- Add browser detection and warnings
- Test in different browsers and environments

### 7. Inline Event Handlers in Main Page
**Difficulty: Low (8-10 changes)**
- **Issue**: Complex inline functions in JSX cause re-renders and are hard to maintain
- **Location**: `src/app/page.tsx` lines 60-80
- **Problems**:
  - File import/export logic inline
  - Hard reset confirmation inline
  - No error handling for file operations
- **Solution**: Extract to custom hooks, add proper error handling, implement proper file validation

**Step-by-Step Implementation:**

**Step 7.1: Create File Operations Hook**
- Create `src/lib/game/hooks/useFileOperations.ts`
- Extract import/export logic from main page
- Add proper error handling and validation
- Test file operations independently

**Step 7.2: Create Game Controls Hook**
- Create `src/lib/game/hooks/useGameControls.ts`
- Extract hard reset and confirmation logic
- Add confirmation dialogs and safety checks
- Test game control functionality

**Step 7.3: Create Modal Management Hook**
- Create `src/lib/game/hooks/useModalManagement.ts`
- Extract modal state management
- Handle modal open/close logic
- Test modal functionality

**Step 7.4: Update Main Page Component**
- Replace inline handlers with hook calls
- Simplify JSX by removing complex logic
- Add proper error boundaries
- Test that all functionality still works

**Step 7.5: Add Error Handling and Validation**
- Implement proper error handling for file operations
- Add file type and size validation
- Show user feedback for operations
- Test error scenarios

## 🟢 LOW PRIORITY (Nice to Have)

### 8. Code Organization and Structure
**Difficulty: Low (15-20 changes)**
- **Issue**: Some files are getting large and could be split
- **Location**: `src/lib/game/GameContext.tsx`, `src/app/page.tsx`
- **Problems**:
  - GameContext is 316 lines
  - Main page component is 178 lines
  - Some utility functions could be grouped better
- **Solution**: Split large files, group related utilities, improve file organization

**Step-by-Step Implementation:**

**Step 8.1: Split GameContext into Modules**
- Create `src/lib/game/contexts/` directory
- Split GameContext into logical modules (state, actions, calculations)
- Create index file to re-export everything
- Test that all functionality is preserved

**Step 8.2: Split Main Page Component**
- Create `src/components/game/sections/` directory
- Extract header, resources, buildings, technologies into separate components
- Create main page as composition of sections
- Test that page renders correctly

**Step 8.3: Reorganize Utility Functions**
- Create `src/lib/game/utils/` directory with subdirectories
- Group utilities by domain (formatting, validation, calculations)
- Update imports throughout codebase
- Test that all utilities work correctly

**Step 8.4: Create Barrel Exports**
- Add index files to all directories
- Create clean import paths
- Remove circular dependencies
- Test import/export functionality

**Step 8.5: Add Documentation and Comments**
- Add JSDoc comments to all functions
- Create README files for each major directory
- Document the new file structure
- Test that documentation is accurate

### 9. Constants and Configuration
**Difficulty: Low (8-12 changes)**
- **Issue**: Some magic numbers and hardcoded values scattered throughout
- **Location**: `src/lib/game/constants.ts`, various component files
- **Problems**:
  - Hardcoded colors in components
  - Magic numbers in calculations
  - Some constants could be environment-specific
- **Solution**: Extract all magic values to constants, implement theme system, add environment configuration

**Step-by-Step Implementation:**

**Step 9.1: Extract Color Constants**
- Create `src/lib/game/constants/colors.ts`
- Move all hardcoded colors from components to constants
- Update components to use color constants
- Test that all colors display correctly

**Step 9.2: Extract Magic Numbers**
- Create `src/lib/game/constants/numbers.ts`
- Move magic numbers from calculations and components
- Add descriptive names for all constants
- Test that calculations still work correctly

**Step 9.3: Create Theme System**
- Create `src/lib/game/constants/themes.ts`
- Define light and dark theme variants
- Implement theme switching functionality
- Test theme switching and persistence

**Step 9.4: Add Environment Configuration**
- Create `src/lib/game/constants/environment.ts`
- Add development vs production constants
- Configure different values for different environments
- Test environment-specific behavior

**Step 9.5: Update Component Usage**
- Replace all hardcoded values with constants
- Update import statements throughout codebase
- Test that all components render correctly
- Verify no magic numbers remain

### 10. Testing Infrastructure
**Difficulty: Medium (20-25 changes)**
- **Issue**: No testing setup currently exists
- **Location**: Project root
- **Problems**:
  - No unit tests
  - No integration tests
  - No testing utilities
- **Solution**: Add Jest/React Testing Library, implement test utilities, add component tests

**Step-by-Step Implementation:**

**Step 10.1: Install Testing Dependencies**
- Install Jest, React Testing Library, and related packages
- Configure Jest for Next.js and TypeScript
- Set up test environment and utilities
- Test that Jest runs successfully

**Step 10.2: Create Test Configuration**
- Create `jest.config.js` with proper configuration
- Set up test utilities and helpers
- Configure test environment variables
- Test configuration with sample tests

**Step 10.3: Add Unit Tests for Game Logic**
- Create tests for `src/lib/game/` functions
- Test calculations, actions, and state management
- Add test coverage reporting
- Ensure all game logic is tested

**Step 10.4: Add Component Tests**
- Create tests for React components
- Test component rendering and interactions
- Mock game context and dependencies
- Ensure components work correctly

**Step 10.5: Add Integration Tests**
- Test game flow and user interactions
- Test save/load functionality
- Test event system and technology research
- Ensure game works end-to-end

### 11. Event System Refactoring
**Difficulty: Medium (15-20 changes)**
- **Issue**: Event system has some inefficiencies and could be better structured
- **Location**: `src/lib/game/eventSystem.ts`
- **Problems**:
  - Event triggering logic could be optimized
  - Some calculations repeated unnecessarily
  - Event history management could be improved
- **Solution**: Optimize event triggering, cache calculations, improve history management

**Step-by-Step Implementation:**

**Step 11.1: Optimize Event Triggering Logic**
- Cache event weights and total weight calculations
- Implement more efficient random event selection
- Reduce object creation in event loops
- Test event triggering performance

**Step 11.2: Improve Event History Management**
- Implement circular buffer for event history
- Add event history cleanup and compression
- Optimize history trimming operations
- Test history management with many events

**Step 11.3: Cache Event Calculations**
- Memoize event choice validation results
- Cache resource requirement checks
- Implement event effect calculation caching
- Test caching effectiveness

**Step 11.4: Optimize Event State Updates**
- Reduce object copying in event state updates
- Implement more efficient state merging
- Add early returns for unchanged states
- Test state update performance

**Step 11.5: Add Event System Monitoring**
- Add performance metrics for event system
- Monitor event frequency and processing time
- Implement event system debugging tools
- Test monitoring functionality

### 12. Technology System Optimization
**Difficulty: Low (10-15 changes)**
- **Issue**: Technology system has some redundant checks and could be optimized
- **Location**: `src/lib/game/technologySystem.ts`
- **Problems**:
  - Multiple functions checking similar prerequisites
  - Some calculations could be memoized
  - Research progress calculations repeated
- **Solution**: Consolidate prerequisite checks, add memoization, optimize progress calculations

**Step-by-Step Implementation:**

**Step 12.1: Consolidate Prerequisite Checks**
- Create single function for checking technology prerequisites
- Remove duplicate prerequisite checking logic
- Optimize prerequisite validation algorithms
- Test that all prerequisite checks still work

**Step 12.2: Add Memoization for Expensive Calculations**
- Memoize technology availability calculations
- Cache prerequisite check results
- Implement memoization for research progress
- Test memoization effectiveness

**Step 12.3: Optimize Research Progress Calculations**
- Consolidate progress calculation functions
- Cache progress calculations during research
- Reduce redundant time calculations
- Test progress calculation accuracy

**Step 12.4: Improve Technology Filtering**
- Optimize technology filtering algorithms
- Reduce array operations and object creation
- Implement more efficient sorting
- Test filtering performance

**Step 12.5: Add Technology System Monitoring**
- Add performance metrics for technology system
- Monitor research progress calculation time
- Implement technology system debugging
- Test monitoring functionality

## 📊 Summary by Difficulty

### Easy Changes (5-10 changes needed)
- Performance monitoring optimization (4 steps)
- Inline event handlers (5 steps)
- Component memoization (5 steps)
- Constants extraction (5 steps)
- Technology system optimization (5 steps)

### Medium Changes (15-25 changes needed)
- Performance optimization in game loop (5 steps)
- Type safety and validation (5 steps)
- Error handling (5 steps)
- Code organization (5 steps)
- Event system refactoring (5 steps)

### Hard Changes (25-35 changes needed)
- State management refactoring (5 steps)
- Testing infrastructure (5 steps)

## 📋 Total Steps Breakdown

**High Priority (15 steps):**
- Performance optimization: 5 steps
- State management: 5 steps  
- Type safety: 5 steps

**Medium Priority (25 steps):**
- Error handling: 5 steps
- Component memoization: 5 steps
- Performance monitoring: 4 steps
- Inline event handlers: 5 steps
- Code organization: 5 steps
- Event system: 5 steps

**Low Priority (20 steps):**
- Constants extraction: 5 steps
- Technology system: 5 steps
- Testing infrastructure: 5 steps

**Total: 60 self-contained steps**

## 🚀 Recommended Implementation Order

1. **Start with High Priority items** - Fix performance issues and state management first
2. **Move to Medium Priority** - Improve type safety, error handling, and optimize systems
3. **Finish with Low Priority** - Clean up code organization, extract constants, and add tests

**Specific Order:**
1. Performance optimization in game loop (immediate impact)
2. State management refactoring (foundation for other improvements)
3. Type safety and validation (prevents future bugs)
4. Error handling and validation (improves user experience)
5. Event and technology system optimization (performance gains)
6. Component memoization and other optimizations
7. Code organization and testing infrastructure

## 💡 Additional Considerations

- **Breaking Changes**: Most refactoring can be done incrementally without breaking existing functionality
- **Performance Impact**: Focus on the game loop optimization first as it affects user experience most
- **Testing**: Consider adding tests before major refactoring to ensure functionality is preserved
- **Documentation**: Update documentation as you refactor to maintain clarity

## 🔧 Tools and Libraries to Consider

- **State Management**: Consider Zustand or Jotai for simpler state management
- **Performance**: React DevTools Profiler, why-did-you-render for debugging
- **Testing**: Jest, React Testing Library, MSW for mocking
- **Type Safety**: Zod for runtime validation, stricter TypeScript config

## 🚨 Issues Removed/Reassessed

After re-examination, the following issues were removed or reassessed:

- **Memory Leaks**: Performance monitoring doesn't actually cause memory leaks, just unnecessary re-renders
- **Inline Event Handlers**: Moved to medium priority as they're less critical than initially thought
- **Performance Monitoring**: Moved to medium priority as it's more of an optimization than a critical issue

## ✅ New Issues Discovered

- **Event System Refactoring**: The event system has some inefficiencies that could be optimized
- **Technology System Optimization**: Some redundant checks and calculations could be consolidated
- **Type Safety**: More comprehensive than initially assessed, affecting multiple systems
