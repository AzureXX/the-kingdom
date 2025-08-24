# 🚀 Refactoring Roadmap - The Kingdom

This document outlines the refactoring needs identified in the codebase, prioritized by impact and difficulty.

## 🔴 High Priority (Critical Issues)

### 1. **Game Loop Performance Optimization** - Difficulty: Low (4-5 changes)
**Issue**: The current game loop implementation could benefit from state batching optimization.

**Problems Identified**:
- Only state batching could be more efficient
- All other optimizations are not needed since every tick has meaningful changes
- Resource production, events, and research progress happen continuously

**Files to Modify**:
- `src/lib/game/hooks/useGameLoop.tsx` (only file that needs changes)

**Estimated Changes**: 4-5 lines in 1 file

**Step-by-Step Breakdown**:

#### Step 1.1: ~~Optimize useGameLoop Early Returns~~ - **NOT NEEDED**
- **Reason**: All game ticks have meaningful changes (resource production, events, research progress)
- **Note**: The `if (newState === currentState) return null;` check is sufficient

#### Step 1.2: Improve State Batching Logic (4-5 changes)
- **File**: `src/lib/game/hooks/useGameLoop.tsx`
- **Change**: Optimize the interval logic to batch multiple ticks before React updates
- **Risk**: Low - internal performance improvement
- **Test**: Verify state updates still work correctly

#### Step 1.3: ~~Optimize Tick Function Early Returns~~ - **NOT NEEDED**
- **Reason**: All ticks have meaningful changes (resources, events, research)
- **Note**: Early returns are not applicable since changes always occur

#### Step 1.4: ~~Reduce Context Re-renders~~ - **NOT NEEDED**
- **Reason**: All ticks have meaningful changes that require UI updates
- **Note**: React re-renders are necessary to reflect resource changes, events, etc.

---

### 2. **Context Value Optimization** - Difficulty: Low (6-10 changes)
**Issue**: GameContext creates new objects on every render, causing unnecessary re-renders.

**Problems Identified**:
- `contextValue` useMemo dependency array includes objects that change frequently
- Some memoized values could be more granular
- Stable references not properly maintained for all functions

**Files to Modify**:
- `src/lib/game/GameContext.tsx`
- `src/lib/game/hooks/useGameActions.tsx`
- `src/lib/game/hooks/useGameCalculations.tsx`

**Estimated Changes**: 6-10 lines across 3 files

**Note**: Since `state` is updated every tick (20 FPS), the `useMemo` optimization may have limited impact as the context will re-render frequently regardless.

**Step-by-Step Breakdown**:

#### Step 2.1: Stabilize Hook Return References (2-3 changes)
- **File**: `src/lib/game/hooks/useGameActions.tsx`
- **Change**: Use `useCallback` for all action handlers to prevent recreation
- **Risk**: Low - only affects performance, not functionality
- **Test**: Verify all actions still work correctly

#### Step 2.2: Optimize Calculation Dependencies (2-3 changes)
- **File**: `src/lib/game/hooks/useGameCalculations.tsx`
- **Change**: Break down `useMemo` dependencies into smaller, more stable chunks
- **Risk**: Low - internal optimization only
- **Test**: Verify calculations still produce correct results

#### Step 2.3: ~~Reduce Context Dependencies~~ - **LIMITED IMPACT**
- **File**: `src/lib/game/GameContext.tsx`
- **Change**: Optimize `contextValue` useMemo dependencies to only include essential values
- **Risk**: Low - internal optimization only
- **Test**: Verify context still provides all required values
- **Note**: Limited impact since `state` changes every tick (20 FPS), causing frequent re-renders regardless

---

## 🟡 Medium Priority (Performance & Maintainability)

### 3. **Hook Return Value Consistency** - ✅ **COMPLETED** (8-12 changes)
**Issue**: Inconsistent return patterns across custom hooks create confusion and maintenance overhead.

**Problems Identified**:
- `useGameActions` returns both grouped and individual handlers
- `useGameCalculations` has similar inconsistency
- `useGameTime` and `useSaveSystem` follow the same pattern
- Some hooks expose internal implementation details

**Files Modified**:
- `src/lib/game/hooks/useGameActions.tsx` ✅
- `src/lib/game/hooks/useGameCalculations.tsx` ✅
- `src/lib/game/hooks/useGameTime.tsx` ✅
- `src/lib/game/hooks/useSaveSystem.tsx` ✅
- `src/lib/game/GameContext.tsx` ✅ (already consuming grouped returns correctly)

**Changes Made**: 8-12 lines across 5 files

**Step-by-Step Breakdown**:

#### Step 3.1: Standardize useGameActions Return (2-3 changes)
- **File**: `src/lib/game/hooks/useGameActions.tsx`
- **Change**: Remove individual handler exports, keep only grouped `actionHandlers`
- **Risk**: Low - requires updating consumers
- **Test**: Verify all actions still work through grouped handlers

#### Step 3.2: Standardize useGameCalculations Return (2-3 changes)
- **File**: `src/lib/game/hooks/useGameCalculations.tsx`
- **Change**: Remove individual value exports, keep only grouped `gameCalculations`
- **Risk**: Low - requires updating consumers
- **Test**: Verify all calculations still accessible through grouped object

#### Step 3.3: Standardize useGameTime Return (1-2 changes)
- **File**: `src/lib/game/hooks/useGameTime.tsx`
- **Change**: Remove individual time exports, keep only grouped `timeValues`
- **Risk**: Low - requires updating consumers
- **Test**: Verify all time values still accessible through grouped object

#### Step 3.4: Standardize useSaveSystem Return (1-2 changes)
- **File**: `src/lib/game/hooks/useSaveSystem.tsx`
- **Change**: Remove individual function exports, keep only grouped `saveFunctions`
- **Risk**: Low - requires updating consumers
- **Test**: Verify all save operations still work through grouped functions

#### Step 3.5: Update Context Consumption (2-2 changes)
- **File**: `src/lib/game/GameContext.tsx`
- **Change**: Update context to use grouped hook returns instead of individual values
- **Risk**: Low - internal refactoring only
- **Test**: Verify context still provides all required values

---

### 4. **Error Handling & Logging Standardization** - Difficulty: Low (10-15 changes)
**Issue**: Inconsistent error handling and console logging patterns throughout the codebase.

**Problems Identified**:
- Multiple `console.warn` calls for invalid keys in different systems
- Some error handling could be more centralized
- Validation errors logged inconsistently

**Files to Modify**:
- `src/lib/game/eventSystem.ts`
- `src/lib/game/eventSystem.ts`
- `src/lib/game/technologySystem.ts`
- `src/lib/game/calculations.ts`
- `src/lib/game/gameState.ts`
- `src/lib/game/hooks/useSaveSystem.tsx`

**Estimated Changes**: 10-15 lines across 5 files

**Step-by-Step Breakdown**:

#### Step 4.1: Create Centralized Error Logger (3-4 changes)
- **File**: `src/lib/game/utils/errorLogger.ts` (new file)
- **Change**: Create utility functions for consistent error logging
- **Risk**: Low - new utility file only
- **Test**: Verify error logging works correctly

#### Step 4.2: Standardize Event System Errors (2-3 changes)
- **File**: `src/lib/game/eventSystem.ts`
- **Change**: Replace `console.warn` calls with centralized error logger
- **Risk**: Low - only affects logging, not functionality
- **Test**: Verify events still work and errors are logged

#### Step 4.3: Standardize Technology System Errors (2-3 changes)
- **File**: `src/lib/game/technologySystem.ts`
- **Change**: Replace `console.warn` calls with centralized error logger
- **Risk**: Low - only affects logging, not functionality
- **Test**: Verify technology research still works and errors are logged

#### Step 4.4: Standardize Calculation Errors (1-2 changes)
- **File**: `src/lib/game/calculations.ts`
- **Change**: Replace `console.warn` calls with centralized error logger
- **Risk**: Low - only affects logging, not functionality
- **Test**: Verify calculations still work and errors are logged

#### Step 4.5: Standardize Game State Errors (1-2 changes)
- **File**: `src/lib/game/gameState.ts`
- **Change**: Replace `console.warn` calls with centralized error logger
- **Risk**: Low - only affects logging, not functionality
- **Test**: Verify game state operations still work and errors are logged

#### Step 4.6: Standardize Save System Errors (1-1 changes)
- **File**: `src/lib/game/hooks/useSaveSystem.tsx`
- **Change**: Replace `console.error` and `console.log` calls with centralized error logger
- **Risk**: Low - only affects logging, not functionality
- **Test**: Verify save operations still work and errors are logged

---

### 5. **Type Safety Improvements** - Difficulty: Low (5-8 changes)
**Issue**: Some type assertions and partial types could be more strict.

**Problems Identified**:
- `Partial<Record<ResourceKey, number>>` used where full records are expected
- Type assertions in component props could be more specific
- Some generic types could be constrained

**Files to Modify**:
- `src/lib/game/types.ts`
- `src/components/game/BuildingList.tsx`
- `src/components/game/ResourceDisplay.tsx`

**Estimated Changes**: 5-8 lines across 3 files

**Step-by-Step Breakdown**:

#### Step 5.1: Improve Resource Type Definitions (2-3 changes)
- **File**: `src/lib/game/types.ts`
- **Change**: Create more specific types for resource costs and production
- **Risk**: Low - type improvements only
- **Test**: Verify TypeScript compilation still works

#### Step 5.2: Strengthen Component Prop Types (2-3 changes)
- **File**: `src/components/game/BuildingList.tsx`
- **Change**: Make component props more specific and remove type assertions
- **Risk**: Low - type safety improvement only
- **Test**: Verify component still renders correctly

#### Step 5.3: Improve Resource Display Types (1-2 changes)
- **File**: `src/components/game/ResourceDisplay.tsx`
- **Change**: Strengthen type definitions for resource display logic
- **Risk**: Low - type safety improvement only
- **Test**: Verify resource display still works correctly

---

## 🟢 Low Priority (Code Quality)

### 6. **Action Function Optimization** - Difficulty: Low (4-6 changes)
**Issue**: Minor inefficiencies in action functions.

**Problems Identified**:
- `clickAction` in `actions.ts` has unused variable
- `tick` function could be more efficient with early returns
- Some state updates could be batched better

**Files to Modify**:
- `src/lib/game/actions.ts`

**Estimated Changes**: 4-6 lines in 1 file

**Step-by-Step Breakdown**:

#### Step 6.1: Fix Unused Variable in clickAction (1-1 changes)
- **File**: `src/lib/game/actions.ts`
- **Change**: Remove unused variable or use it properly in clickAction function
- **Risk**: Low - cleanup only
- **Test**: Verify click actions still work correctly

#### Step 6.2: Optimize Tick Function Early Returns (2-3 changes)
- **File**: `src/lib/game/actions.ts`
- **Change**: Add more granular early returns for resource changes in tick function
- **Risk**: Low - performance optimization only
- **Test**: Verify resource production still works correctly

#### Step 6.3: Batch State Updates (1-2 changes)
- **File**: `src/lib/game/actions.ts`
- **Change**: Combine multiple state updates into single operations where possible
- **Risk**: Low - performance optimization only
- **Test**: Verify all state updates still work correctly

---

### 7. **Component Memoization Consistency** - Difficulty: Low (2-4 changes)
**Issue**: Minor inconsistencies in component memoization patterns.

**Problems Identified**:
- `TechnologyList` and `UpgradeList` could benefit from `useCallback` for event handlers
- Memoization could be more consistent across similar components

**Files to Modify**:
- `src/components/game/TechnologyList.tsx`
- `src/components/game/UpgradeList.tsx`

**Estimated Changes**: 2-4 changes across 2 files

**Step-by-Step Breakdown**:

#### Step 7.1: Add useCallback to TechnologyList (1-2 changes)
- **File**: `src/components/game/TechnologyList.tsx`
- **Change**: Wrap event handler functions with useCallback for consistent memoization
- **Risk**: Low - performance optimization only
- **Test**: Verify technology research still works correctly

#### Step 7.2: Add useCallback to UpgradeList (1-2 changes)
- **File**: `src/components/game/UpgradeList.tsx`
- **Change**: Wrap event handler functions with useCallback for consistent memoization
- **Risk**: Low - performance optimization only
- **Test**: Verify upgrade purchases still work correctly

---

### 8. **Configuration Structure** - Difficulty: Low (2-3 changes)
**Issue**: Minor configuration organization improvements.

**Problems Identified**:
- Some config types could be grouped better
- Export patterns could be more consistent

**Files to Modify**:
- `src/lib/game/config/index.ts`

**Estimated Changes**: 2-3 lines in 1 file

**Step-by-Step Breakdown**:

#### Step 8.1: Group Related Type Exports (1-1 changes)
- **File**: `src/lib/game/config/index.ts`
- **Change**: Group related types together for better organization
- **Risk**: Low - export organization only
- **Test**: Verify all types are still accessible

#### Step 8.2: Standardize Export Patterns (1-2 changes)
- **File**: `src/lib/game/config/index.ts`
- **Change**: Make export patterns more consistent across config sections
- **Risk**: Low - export organization only
- **Test**: Verify all config objects are still accessible

---

## ❌ **REMOVED - Redundant Issues**

### ~~Component Memoization Consistency~~ - **Already properly implemented**
- `TechnologyList` and `UpgradeList` already use `React.memo` correctly
- Event handlers are properly passed down as props
- No actual memoization issues found

---

## 📊 Summary

**Total Estimated Changes**: 37-52 lines across 8-12 files

**Priority Breakdown**:
- 🔴 **High Priority**: 8-12 changes (Critical performance issues)
- 🟡 **Medium Priority**: 23-35 changes (Performance & maintainability)
- 🟢 **Low Priority**: 6-7 changes (Code quality improvements)

**Recommended Implementation Order**:
1. Start with High Priority items (Game Loop & Context optimization)
2. Move to Medium Priority (Hook consistency & Error handling)
3. Finish with Low Priority (Action optimization & Config cleanup)

**Risk Assessment**: All refactoring tasks are low-risk with minimal breaking changes. Most changes involve internal optimizations that won't affect the public API.

---

## 🎯 Success Metrics

After refactoring, expect:
- **Performance**: 10-20% improvement in game loop efficiency
- **Maintainability**: Cleaner hook interfaces and more consistent patterns
- **Type Safety**: Reduced type assertions and better compile-time guarantees
- **Code Quality**: More predictable component behavior and easier debugging
- **Error Handling**: Centralized and consistent error management

---

## 🚀 **Implementation Guide**

### **Before You Start**
1. **Create a feature branch** for each refactoring item
2. **Run tests** to ensure current functionality works
3. **Document current behavior** for comparison

### **Implementation Order**
1. **Start with High Priority items** - they provide the biggest impact
2. **Complete each step independently** - don't mix multiple steps
3. **Test after each step** - ensure no functionality is broken
4. **Commit after each step** - makes rollback easier if needed

### **Testing Strategy**
- **Unit Tests**: Test individual functions after changes
- **Integration Tests**: Verify components still work together
- **Performance Tests**: Measure improvements where applicable
- **Manual Testing**: Play the game to ensure core functionality works

### **Rollback Plan**
- Each step is designed to be reversible
- Keep original code commented out during testing
- Use git commits to track changes
- If issues arise, revert to previous commit

### **Success Criteria**
- **No breaking changes** to public API
- **All existing functionality** continues to work
- **Performance improvements** measurable
- **Code quality** improved (cleaner, more maintainable)
- **Type safety** enhanced where applicable

---

## 📋 **Quick Reference - Step Summary**

| Priority | Item | Steps | Total Changes | Risk |
|----------|------|-------|---------------|------|
| 🔴 High | Game Loop Optimization | 1 step | 4-5 | Low |
| 🔴 High | Context Optimization | 2 steps | 4-7 | Low |
| 🟡 Medium | Hook Consistency | ✅ COMPLETED | 8-12 | Low |
| 🟡 Medium | Error Handling | 6 steps | 10-15 | Low |
| 🟡 Medium | Type Safety | 3 steps | 5-8 | Low |
| 🟢 Low | Action Optimization | 3 steps | 4-6 | Low |
| 🟢 Low | Component Memoization | 2 steps | 2-4 | Low |
| 🟢 Low | Config Structure | 2 steps | 2-3 | Low |

**Total**: 8 items, 28 steps, 37-52 total changes
