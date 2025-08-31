# Refactoring Priorities for Medieval Kingdom Idle Game

This document outlines the refactoring needs identified in the codebase, organized by priority and difficulty level. The analysis is based on code review and follows the principle of avoiding over-engineering while focusing on important improvements.

## 🔴 High Priority (Critical Issues)

### 1. Type Safety Improvements in GameContext
**Difficulty: Medium (15-20 changes)**
- **Issue**: The `GameContextType` interface has some type inconsistencies and could benefit from better type safety
- **Location**: `src/lib/game/GameContext.tsx`
- **Problem**: Some properties like `upgradeCosts` use generic `Record<string, number>` instead of proper typed keys
- **Solution**: Create proper union types for upgrade keys and ensure all Record types use proper key constraints
- **Impact**: Improves type safety, reduces runtime errors, better IntelliSense support

### 2. Error Handling Consolidation
**Difficulty: Low-Medium (10-15 changes)**
- **Issue**: Error handling is scattered across multiple files with some duplication
- **Location**: `src/lib/game/utils/errorLogger.ts`, `src/lib/game/actions.ts`, `src/lib/game/calculations.ts`
- **Problem**: Multiple error handler creation functions that could be unified
- **Solution**: Consolidate error handlers into a single, more efficient error handling system
- **Impact**: Cleaner code, better error tracking, easier maintenance

## 🟡 Medium Priority (Important Improvements)

### 3. Action System Type Redundancy
**Difficulty: Low (8-12 changes)**
- **Issue**: Some action types have redundant properties that could be simplified
- **Location**: `src/lib/game/types/actions.ts`, `src/lib/game/config/actions.ts`
- **Problem**: `unlockConditions` array and individual `requires*` properties serve similar purposes
- **Solution**: Consolidate unlock logic into a single, more flexible system
- **Impact**: Cleaner action definitions, easier to add new actions, better maintainability

### 4. Hook Dependencies Optimization
**Difficulty: Low (5-8 changes)**
- **Issue**: Some custom hooks have unnecessary dependencies in their dependency arrays
- **Location**: `src/lib/game/hooks/useGameActions.tsx`, `src/lib/game/GameContext.tsx`
- **Problem**: Some useCallback and useMemo dependencies could be optimized
- **Solution**: Review and optimize dependency arrays to prevent unnecessary re-renders
- **Impact**: Better performance, fewer unnecessary re-renders

### 5. Constants Organization
**Difficulty: Low (3-5 changes)**
- **Issue**: Game constants are spread across multiple files and could be better organized
- **Location**: `src/lib/game/constants/`
- **Problem**: Some constants might be duplicated or could be grouped more logically
- **Solution**: Consolidate related constants and improve the organization structure
- **Impact**: Easier to find and modify game values, better maintainability

## 🟢 Low Priority (Nice to Have)

### 6. Import Statement Cleanup
**Difficulty: Very Low (3-5 changes)**
- **Issue**: Some files have import statements that could be more organized
- **Location**: Various files throughout the codebase
- **Problem**: Import grouping could be more consistent
- **Solution**: Standardize import ordering and grouping
- **Impact**: Better code readability, easier to spot missing imports

### 7. JSDoc Comment Standardization
**Difficulty: Very Low (10-15 changes)**
- **Issue**: JSDoc comments are present but not consistently formatted
- **Location**: Throughout the codebase
- **Problem**: Some functions have detailed JSDoc while others don't
- **Solution**: Standardize JSDoc format and ensure all public functions have proper documentation
- **Impact**: Better code documentation, easier for new developers to understand

## 📋 Implementation Notes

### What NOT to Refactor (README Intentional Design)
Based on the README, these aspects are intentionally designed and should NOT be changed:
- **Action System Architecture**: The 12-action system with progressive unlocking is intentional
- **Hook-based Architecture**: The sophisticated hook-based system is a core design decision
- **Configuration-driven Design**: The data-driven approach for actions, buildings, and technologies is intentional
- **Performance Optimizations**: The 20 FPS game loop and memoization strategies are intentional

### Refactoring Principles
1. **Maintain Backward Compatibility**: All refactoring should preserve existing game functionality
2. **Preserve Performance**: Any changes should not negatively impact the 20 FPS target
3. **Keep Configuration-driven**: Maintain the ability to easily add new content through config files
4. **Respect Type Safety**: All changes should improve or maintain TypeScript type safety

## 🔧 Detailed Implementation Steps

### 1. Type Safety Improvements in GameContext
**File**: `src/lib/game/GameContext.tsx`

#### Step 1.1: Create Proper Upgrade Key Types
- **File**: `src/lib/game/types/prestige.ts`
- **Action**: Add union type for upgrade keys if not exists
- **Test**: Verify TypeScript compilation
- **Risk**: Low - type definition only

#### Step 1.2: Update GameContextType Interface
- **File**: `src/lib/game/GameContext.tsx`
- **Action**: Change `upgradeCosts: Record<string, number>` to proper typed version
- **Test**: Verify no TypeScript errors
- **Risk**: Low - interface change only

#### Step 1.3: Update Context Value Creation
- **File**: `src/lib/game/GameContext.tsx`
- **Action**: Ensure `upgradeCosts` uses proper typing in context value
- **Test**: Verify context provides correct types
- **Risk**: Low - internal implementation only

#### Step 1.4: Update useGameContext Hook
- **File**: `src/lib/game/GameContext.tsx`
- **Action**: Ensure return type is properly constrained
- **Test**: Verify hook usage maintains type safety
- **Risk**: Low - type safety improvement

### 2. Error Handling Consolidation
**Files**: `src/lib/game/utils/errorLogger.ts`, `src/lib/game/actions.ts`, `src/lib/game/calculations.ts`

#### Step 2.1: Audit Current Error Handlers
- **Action**: List all error handler creation functions across files
- **Output**: Document current error handling patterns
- **Risk**: None - analysis only

#### Step 2.2: Create Unified Error Handler Factory
- **File**: `src/lib/game/utils/errorLogger.ts`
- **Action**: Create single `createErrorHandler` function that replaces multiple specific ones
- **Test**: Verify function works with existing error types
- **Risk**: Low - new function addition

#### Step 2.3: Update Actions File Error Handling
- **File**: `src/lib/game/actions.ts`
- **Action**: Replace `createStateErrorHandler` with unified handler
- **Test**: Verify error handling still works
- **Risk**: Low - function replacement

#### Step 2.4: Update Calculations File Error Handling
- **File**: `src/lib/game/calculations.ts`
- **Action**: Replace specific error handlers with unified handler
- **Test**: Verify calculation errors still handled properly
- **Risk**: Low - function replacement

#### Step 2.5: Remove Deprecated Error Handler Functions
- **File**: `src/lib/game/utils/errorLogger.ts`
- **Action**: Remove old specific handler functions
- **Test**: Verify no compilation errors
- **Risk**: Low - cleanup only

### 3. Action System Type Redundancy
**Files**: `src/lib/game/types/actions.ts`, `src/lib/game/config/actions.ts`

#### Step 3.1: Analyze Current Unlock Properties
- **Action**: Document all unlock-related properties in ActionDef interface
- **Output**: List of redundant properties
- **Risk**: None - analysis only

#### Step 3.2: Design Unified Unlock System
- **Action**: Design new unlock condition structure
- **Output**: New interface design
- **Risk**: None - design only

#### Step 3.3: Update ActionDef Interface
- **File**: `src/lib/game/types/actions.ts`
- **Action**: Replace redundant properties with unified unlock system
- **Test**: Verify TypeScript compilation
- **Risk**: Medium - interface change

#### Step 3.4: Update Action Configurations
- **File**: `src/lib/game/config/actions.ts`
- **Action**: Convert existing actions to use new unlock system
- **Test**: Verify actions still unlock correctly
- **Risk**: Medium - logic change

#### Step 3.5: Update Action Validation Logic
- **File**: `src/lib/game/utils/actionValidation.ts`
- **Action**: Update validation functions to use new unlock system
- **Test**: Verify action validation still works
- **Risk**: Medium - logic change

### 4. Hook Dependencies Optimization
**Files**: `src/lib/game/hooks/useGameActions.tsx`, `src/lib/game/GameContext.tsx`

#### Step 4.1: Audit useGameActions Dependencies
- **File**: `src/lib/game/hooks/useGameActions.tsx`
- **Action**: Review each useCallback dependency array
- **Output**: List of potentially unnecessary dependencies
- **Risk**: None - analysis only

#### Step 4.2: Optimize Individual Hook Dependencies
- **File**: `src/lib/game/hooks/useGameActions.tsx`
- **Action**: Remove unnecessary dependencies one hook at a time
- **Test**: Verify each hook still works correctly
- **Risk**: Low - dependency optimization

#### Step 4.3: Audit GameContext Dependencies
- **File**: `src/lib/game/GameContext.tsx`
- **Action**: Review useMemo dependency array
- **Output**: List of potentially unnecessary dependencies
- **Risk**: None - analysis only

#### Step 4.4: Optimize GameContext Dependencies
- **File**: `src/lib/game/GameContext.tsx`
- **Action**: Remove unnecessary dependencies from useMemo
- **Test**: Verify context updates correctly
- **Risk**: Low - dependency optimization

#### Step 4.5: Performance Testing
- **Action**: Test that optimizations don't break functionality
- **Test**: Verify no infinite re-render loops
- **Risk**: Low - validation only

### 5. Constants Organization
**Files**: `src/lib/game/constants/`

#### Step 5.1: Audit Current Constants Structure
- **Action**: List all constants files and their contents
- **Output**: Current organization map
- **Risk**: None - analysis only

#### Step 5.2: Identify Duplicate Constants
- **Action**: Find any duplicated values across files
- **Output**: List of duplicates
- **Risk**: None - analysis only

#### Step 5.3: Group Related Constants
- **Action**: Identify logical groupings for constants
- **Output**: Proposed organization structure
- **Risk**: None - design only

#### Step 5.4: Consolidate Duplicates
- **Action**: Remove duplicate constants, use references instead
- **Test**: Verify game still works correctly
- **Risk**: Low - consolidation only

#### Step 5.5: Reorganize Constants Files
- **Action**: Move constants to more logical file locations
- **Test**: Verify imports still work
- **Risk**: Low - file organization only

### 6. Import Statement Cleanup
**Files**: Throughout the codebase

#### Step 6.1: Define Import Ordering Rules
- **Action**: Create consistent import ordering rules
- **Output**: Import style guide
- **Risk**: None - documentation only

**Import Ordering Rules:**
1. **React/Next.js imports** (react, next, etc.)
2. **Third-party libraries** (external packages)
3. **Internal absolute imports** (@/ paths)
4. **Internal relative imports** (../ paths)
5. **Type imports** (type keyword)
6. **Style imports** (CSS/SCSS files)

**Example:**
```typescript
// 1. React/Next.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 2. Third-party libraries
import { format } from 'date-fns';

// 3. Internal absolute imports
import { Button } from '@/components/ui/Button';
import { useGameContext } from '@/lib/game/GameContext';

// 4. Internal relative imports
import { calculateCost } from '../utils/calculations';
import { GameState } from './types';

// 5. Type imports
import type { GameState, ResourceKey } from './types';

// 6. Style imports
import styles from './Component.module.scss';
```

#### Step 6.2: Clean Up One File at a Time
- **Action**: Start with one file, reorder imports according to rules
- **Test**: Verify file still compiles and works
- **Risk**: Very Low - formatting only

#### Step 6.3: Apply to Game Logic Files
- **Files**: `src/lib/game/` directory
- **Action**: Clean imports in game logic files
- **Test**: Verify game functionality unchanged
- **Risk**: Very Low - formatting only

#### Step 6.4: Apply to Component Files
- **Files**: `src/components/` directory
- **Action**: Clean imports in component files
- **Test**: Verify UI renders correctly
- **Risk**: Very Low - formatting only

#### Step 6.5: Apply to Hook Files
- **Files**: `src/lib/game/hooks/` directory
- **Action**: Clean imports in hook files
- **Test**: Verify hooks work correctly
- **Risk**: Very Low - formatting only

### 7. JSDoc Comment Standardization
**Files**: Throughout the codebase

#### Step 7.1: Define JSDoc Standards
- **Action**: Create JSDoc formatting standards
- **Output**: Documentation style guide
- **Risk**: None - documentation only

#### Step 7.2: Document Public Functions in Types
- **Files**: `src/lib/game/types/`
- **Action**: Add JSDoc to all public type definitions
- **Test**: Verify TypeScript compilation
- **Risk**: None - documentation only

#### Step 7.3: Document Public Functions in Utils
- **Files**: `src/lib/game/utils/`
- **Action**: Add JSDoc to all public utility functions
- **Test**: Verify functions still work
- **Risk**: None - documentation only

#### Step 7.4: Document Public Functions in Hooks
- **Files**: `src/lib/game/hooks/`
- **Action**: Add JSDoc to all public hook functions
- **Test**: Verify hooks still work
- **Risk**: None - documentation only

#### Step 7.5: Document Public Functions in Components
- **Files**: `src/components/`
- **Action**: Add JSDoc to all public component functions
- **Test**: Verify components render correctly
- **Risk**: None - documentation only

## 🚀 Implementation Strategy

### Phase 1: Foundation (High Priority)
- Complete Steps 1.1-1.4 (Type Safety)
- Complete Steps 2.1-2.5 (Error Handling)

### Phase 2: Core Systems (Medium Priority)  
- Complete Steps 3.1-3.5 (Action System)
- Complete Steps 4.1-4.5 (Hook Optimization)
- Complete Steps 5.1-5.5 (Constants Organization)

### Phase 3: Polish (Low Priority)
- Complete Steps 6.1-6.5 (Import Cleanup)
- Complete Steps 7.1-7.5 (JSDoc Standardization)

### Testing Between Phases
- After each phase, run full game functionality tests
- Verify performance metrics remain stable
- Ensure save/load compatibility is maintained

## ⚠️ Risk Mitigation

### For Each Step:
1. **Create Backup Branch**: Before starting any step
2. **Test Incrementally**: Test after each small change
3. **Rollback Plan**: Keep track of changes for easy rollback
4. **Performance Check**: Verify 20 FPS target is maintained

### Breaking Changes:
- No step should break existing game functionality
- All changes are internal improvements
- External APIs remain the same
- Game save files remain compatible

## 📊 Progress Tracking

Track completion of each step:
- [ ] Step 1.1: Create Proper Upgrade Key Types
- [ ] Step 1.2: Update GameContextType Interface
- [ ] Step 1.3: Update Context Value Creation
- [ ] Step 1.4: Update useGameContext Hook
- [ ] Step 2.1: Audit Current Error Handlers
- [ ] Step 2.2: Create Unified Error Handler Factory
- [ ] Step 2.3: Update Actions File Error Handling
- [ ] Step 2.4: Update Calculations File Error Handling
- [ ] Step 2.5: Remove Deprecated Error Handler Functions
- [ ] Step 3.1: Analyze Current Unlock Properties
- [ ] Step 3.2: Design Unified Unlock System
- [ ] Step 3.3: Update ActionDef Interface
- [ ] Step 3.4: Update Action Configurations
- [ ] Step 3.5: Update Action Validation Logic
- [ ] Step 4.1: Audit useGameActions Dependencies
- [ ] Step 4.2: Optimize Individual Hook Dependencies
- [ ] Step 4.3: Audit GameContext Dependencies
- [ ] Step 4.4: Optimize GameContext Dependencies
- [ ] Step 4.5: Performance Testing
- [ ] Step 5.1: Audit Current Constants Structure
- [ ] Step 5.2: Identify Duplicate Constants
- [ ] Step 5.3: Group Related Constants
- [ ] Step 5.4: Consolidate Duplicates
- [ ] Step 5.5: Reorganize Constants Files
- [x] Step 6.1: Define Import Ordering Rules
- [x] Step 6.2: Clean Up One File at a Time
- [x] Step 6.3: Apply to Game Logic Files
- [x] Step 6.4: Apply to Component Files
- [x] Step 6.5: Apply to Hook Files
- [ ] Step 7.1: Define JSDoc Standards
- [ ] Step 7.2: Document Public Functions in Types
- [ ] Step 7.3: Document Public Functions in Utils
- [ ] Step 7.4: Document Public Functions in Hooks
- [ ] Step 7.5: Document Public Functions in Components
