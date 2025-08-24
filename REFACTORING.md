# Refactoring Priorities for The Kingdom

This document outlines identified refactoring opportunities in order of priority and estimated difficulty. Only important improvements are listed - no overengineering.

## 🔴 High Priority (Critical Issues)

### 1. Duplicate Type Exports in Config Index
**File**: `src/lib/game/config/index.ts`  
**Issue**: Re-exporting types that are already exported from types/index.ts  
**Difficulty**: Easy (1 change)  
**Lines**: 20-36  
**Current**: Duplicate type exports in both config and types  
**Should be**: Remove type exports from config/index.ts, only export config objects

**Step-by-Step Breakdown:**
1. **Remove type imports** from config/index.ts (lines 20-36)
2. **Keep only config object exports** (RESOURCES, BUILDINGS, etc.)
3. **Verify all types are accessible** from `../types` in consuming files
4. **Test that game still compiles** without type errors
5. **Run game to ensure** no runtime type issues

## 🟡 Medium Priority (Code Quality)

### 3. Inconsistent Error Handling Pattern
**File**: `src/lib/game/actions.ts`  
**Issue**: Some functions return original state on error, others don't handle errors consistently  
**Difficulty**: Medium (5-8 changes)  
**Lines**: Throughout file  
**Current**: Mixed error handling approaches  
**Should be**: Consistent error handling with proper logging and fallback behavior

**Step-by-Step Breakdown:**
1. **Audit current error handling** - identify which functions handle errors and which don't
2. **Standardize error return pattern** - all functions should return original state on error
3. **Add missing error handling** to functions that currently don't have it
4. **Standardize error logging** - ensure all errors use the same logging pattern
5. **Add error context** - include relevant parameters in error logs
6. **Test error scenarios** - verify graceful degradation when errors occur
7. **Verify state consistency** - ensure no partial state changes on errors
8. **Update error handler utility** if needed for consistency

### 4. Game Loop Performance Optimization
**File**: `src/lib/game/hooks/useGameLoop.tsx`  
**Issue**: Potential unnecessary re-renders due to callback dependencies  
**Difficulty**: Medium (3-5 changes)  
**Lines**: 40-60  
**Current**: Complex callback management with refs  
**Should be**: Simplified callback handling to reduce complexity

**Step-by-Step Breakdown:**
1. **Analyze current callback flow** - understand how callbacks are passed and used
2. **Identify unnecessary refs** - determine which refs can be eliminated
3. **Simplify callback dependencies** - reduce the number of useEffect hooks
4. **Optimize callback updates** - minimize callback recreation
5. **Test performance impact** - measure render frequency before/after changes
6. **Verify game loop stability** - ensure no missed ticks or performance regressions
7. **Add performance monitoring** if not already present

## 🟢 Low Priority (Nice to Have)

### 5. Type Organization in Individual Type Files
**File**: `src/lib/game/types/*.ts`  
**Issue**: Some type files could be better organized or combined  
**Difficulty**: Easy (2-3 changes)  
**Lines**: Various  
**Current**: Some files have only 1-2 types  
**Should be**: Consider consolidating very small type files

**Step-by-Step Breakdown:**
1. **Audit type file sizes** - identify files with very few types
2. **Group related types** - find logical groupings (e.g., combine resource-related types)
3. **Create consolidation plan** - map which files can be merged
4. **Update type exports** - modify index.ts to reflect new structure
5. **Update import statements** - change imports in consuming files
6. **Verify type resolution** - ensure all types are still accessible
7. **Test compilation** - verify no broken imports

### 6. Constants Organization
**File**: `src/lib/game/constants/`  
**Issue**: Constants could be better organized by domain  
**Difficulty**: Easy (2-4 changes)  
**Lines**: Various  
**Current**: Mixed constants in single files  
**Should be**: Group constants by game system (resources, buildings, etc.)

**Step-by-Step Breakdown:**
1. **Audit constants directory** - identify all constant files and their contents
2. **Categorize constants** - group by game system (resources, buildings, technologies, etc.)
3. **Create domain-specific files** - split constants into logical groups
4. **Update imports** - change import statements in consuming files
5. **Verify constant access** - ensure all constants are still accessible
6. **Test game functionality** - verify no broken constant references
7. **Update documentation** - reflect new constant organization

## ✅ Intentional Design (Do Not Change)

The following aspects are intentionally designed this way according to the README:

- **No Early Returns in Game Loop**: The game loop is designed to process all ticks since idle games require continuous resource generation
- **20 FPS Game Logic**: This is intentional for smooth idle game mechanics
- **Continuous Updates**: Every game tick has meaningful changes by design

## 📊 Summary

**Total Changes Needed**: 11-21 changes  
**High Priority**: 1 change (Easy)  
**Medium Priority**: 8-13 changes (Medium difficulty)  
**Low Priority**: 4-7 changes (Easy)  

**Estimated Total Effort**: 1-2 days for a developer familiar with the codebase

## 🚀 Implementation Order

1. Remove duplicate type exports (High Priority)  
2. Standardize error handling (Medium Priority)
3. Optimize game loop callbacks (Medium Priority)
4. Organize constants and types (Low Priority)

## 📝 Notes

- Focus on High and Medium priority items first
- Low priority items can be addressed during routine maintenance
- All changes should maintain the existing game mechanics and performance characteristics
- Test thoroughly after each change, especially the game loop optimizations
