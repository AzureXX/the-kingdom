# 📋 Game Modules Reference

This document provides a comprehensive list of all modules in the Medieval Kingdom idle game for future refactoring and maintenance reference.

## 🏗️ **Core Game Architecture**

### **Main Entry Points**
- `src/lib/game/GameContext.tsx` - Main game context and provider composition
- `src/lib/game/config/index.ts` - Configuration validation and exports
- `src/lib/game/types/index.ts` - TypeScript type definitions

---

## ⚙️ **Configuration Modules**

### **Game Content Configuration**
- `src/lib/game/config/resources.ts` - Resource definitions (6 resources)
- `src/lib/game/config/buildings.ts` - Building definitions (8 buildings)
- `src/lib/game/config/technologies.ts` - Technology definitions (6 technologies)
- `src/lib/game/config/prestige.ts` - Prestige system configuration

### **Action Configuration**
- `src/lib/game/config/actions/basicActions.ts` - Basic resource gathering actions
- `src/lib/game/config/actions/tradingActions.ts` - Resource trading actions
- `src/lib/game/config/actions/buildingActions.ts` - Building-dependent actions
- `src/lib/game/config/actions/technologyActions.ts` - Technology-dependent actions
- `src/lib/game/config/actions/index.ts` - Action configuration exports

### **Loop Action Configuration**
- `src/lib/game/config/loopActions/gatheringLoopActions.ts` - Resource gathering loops
- `src/lib/game/config/loopActions/craftingLoopActions.ts` - Crafting and production loops
- `src/lib/game/config/loopActions/researchLoopActions.ts` - Research and study loops
- `src/lib/game/config/loopActions/militaryLoopActions.ts` - Military and prestige loops
- `src/lib/game/config/loopActions/index.ts` - Loop action configuration exports

### **Event Configuration**
- `src/lib/game/config/events/tradingEvents.ts` - Merchant and trading events
- `src/lib/game/config/events/conflictEvents.ts` - Bandit raids and conflicts
- `src/lib/game/config/events/naturalEvents.ts` - Weather and natural events
- `src/lib/game/config/events/socialEvents.ts` - Royal and social events
- `src/lib/game/config/events/index.ts` - Event configuration exports

### **Achievement Configuration**
- `src/lib/game/config/achievements/actionAchievements.ts` - Action-based achievements
- `src/lib/game/config/achievements/buildingAchievements.ts` - Building-based achievements
- `src/lib/game/config/achievements/resourceAchievements.ts` - Resource-based achievements
- `src/lib/game/config/achievements/technologyAchievements.ts` - Technology-based achievements
- `src/lib/game/config/achievements/prestigeAchievements.ts` - Prestige-based achievements
- `src/lib/game/config/achievements/eventAchievements.ts` - Event-based achievements
- `src/lib/game/config/achievements/timeAchievements.ts` - Time-based achievements
- `src/lib/game/config/achievements/comboAchievements.ts` - Multi-condition achievements
- `src/lib/game/config/achievements/hiddenAchievements.ts` - Secret achievements
- `src/lib/game/config/achievements/index.ts` - Achievement configuration exports

---

## 🎣 **React Hooks**

### **Core Game Hooks**
- `src/hooks/useGameLoop.tsx` - Main game loop (20 FPS)
- `src/hooks/useGameActions.tsx` - Player action handling
- `src/hooks/useGameCalculations.tsx` - Game state calculations
- `src/hooks/useSaveSystem.tsx` - Save/load functionality
- `src/hooks/useGameTime.tsx` - Time-based events and research
- `src/hooks/usePerformanceMonitor.tsx` - Performance monitoring
- `src/hooks/useLoopActions.tsx` - Automated loop actions
- `src/hooks/useAchievements.tsx` - Achievement system
- `src/hooks/useSceneNavigation.tsx` - Scene navigation logic
- `src/hooks/index.ts` - Hook exports

---

## 🏭 **State Management**

### **Context Providers**
- `src/lib/game/providers/GameStateProvider.tsx` - Game state management
- `src/lib/game/providers/GameActionsProvider.tsx` - Action handling
- `src/lib/game/providers/GameCalculationsProvider.tsx` - Calculation management
- `src/lib/game/providers/index.ts` - Provider exports

### **State Initializers**
- `src/lib/game/initializers/gameStateFactory.ts` - Main state factory
- `src/lib/game/initializers/resourceInitializer.ts` - Resource state initialization
- `src/lib/game/initializers/buildingInitializer.ts` - Building state initialization
- `src/lib/game/initializers/technologyInitializer.ts` - Technology state initialization
- `src/lib/game/initializers/researchInitializer.ts` - Research state initialization
- `src/lib/game/initializers/eventInitializer.ts` - Event state initialization

---

## 🧮 **Utility Modules**

### **Core Utilities**
- `src/lib/game/utils/number/formatting.ts` - Number formatting utilities
- `src/lib/game/utils/number/math.ts` - Mathematical operations
- `src/lib/game/utils/string/encoding.ts` - String encoding utilities
- `src/lib/game/utils/string/parsing.ts` - String parsing utilities
- `src/lib/game/utils/index.ts` - Main utility exports

### **Game Logic Utilities**
- `src/lib/game/utils/actions/gameActions.ts` - Action execution logic
- `src/lib/game/utils/actions/gameLoopActions.ts` - Game loop action processing
- `src/lib/game/utils/actions/buildingActions.ts` - Building-related actions
- `src/lib/game/utils/actions/technologyActions.ts` - Technology-related actions
- `src/lib/game/utils/actions/upgradeActions.ts` - Upgrade actions
- `src/lib/game/utils/actions/resourceActions.ts` - Resource processing
- `src/lib/game/utils/actions/index.ts` - Action utility exports

### **Calculation Utilities**
- `src/lib/game/utils/calculations/production.ts` - Production calculations
- `src/lib/game/utils/calculations/costs.ts` - Cost calculations
- `src/lib/game/utils/calculations/multipliers.ts` - Multiplier calculations
- `src/lib/game/utils/calculations/affordability.ts` - Affordability checks
- `src/lib/game/utils/calculations/index.ts` - Calculation exports

### **Game State Utilities**
- `src/lib/game/utils/gameState/buildings.ts` - Building state management
- `src/lib/game/utils/gameState/resources.ts` - Resource state management
- `src/lib/game/utils/gameState/technologies.ts` - Technology state management
- `src/lib/game/utils/gameState/upgrades.ts` - Upgrade state management
- `src/lib/game/utils/gameState/initialization.ts` - State initialization
- `src/lib/game/utils/gameState/index.ts` - Game state exports

### **Loop Action Utilities**
- `src/lib/game/utils/loopActions/processing.ts` - Loop action processing
- `src/lib/game/utils/loopActions/management.ts` - Loop action management
- `src/lib/game/utils/loopActions/progress.ts` - Progress tracking
- `src/lib/game/utils/loopActions/validation.ts` - Loop action validation
- `src/lib/game/utils/loopActions/index.ts` - Loop action exports

### **Loop Calculation Utilities**
- `src/lib/game/utils/loopCalculations/efficiency.ts` - Efficiency calculations
- `src/lib/game/utils/loopCalculations/progress.ts` - Progress calculations
- `src/lib/game/utils/loopCalculations/stats.ts` - Statistics calculations
- `src/lib/game/utils/loopCalculations/index.ts` - Loop calculation exports

### **Achievement Utilities**
- `src/lib/game/utils/achievement/checker.ts` - Achievement checking logic
- `src/lib/game/utils/achievement/progress.ts` - Progress tracking
- `src/lib/game/utils/achievement/rewards.ts` - Reward processing
- `src/lib/game/utils/achievement/notifications.ts` - Notification handling
- `src/lib/game/utils/achievement/stats.ts` - Achievement statistics
- `src/lib/game/utils/achievement/initialization.ts` - Achievement initialization
- `src/lib/game/utils/achievement/index.ts` - Achievement exports

### **Event Utilities**
- `src/lib/game/utils/event/triggering.ts` - Event triggering logic
- `src/lib/game/utils/event/choices.ts` - Choice processing
- `src/lib/game/utils/event/state.ts` - Event state management
- `src/lib/game/utils/event/history.ts` - Event history tracking
- `src/lib/game/utils/event/timing.ts` - Event timing logic
- `src/lib/game/utils/event/index.ts` - Event exports

### **Technology Utilities**
- `src/lib/game/utils/technology/research.ts` - Research logic
- `src/lib/game/utils/technology/progress.ts` - Research progress
- `src/lib/game/utils/technology/queries.ts` - Technology queries
- `src/lib/game/utils/technology/validation.ts` - Technology validation
- `src/lib/game/utils/technology/index.ts` - Technology exports

### **Prestige Utilities**
- `src/lib/game/utils/prestige/calculations.ts` - Prestige calculations
- `src/lib/game/utils/prestige/operations.ts` - Prestige operations
- `src/lib/game/utils/prestige/index.ts` - Prestige exports

### **Resource Utilities**
- `src/lib/game/utils/resource/processing.ts` - Resource processing
- `src/lib/game/utils/resource/changes.ts` - Resource change handling
- `src/lib/game/utils/resource/payments.ts` - Resource payment logic
- `src/lib/game/utils/resource/index.ts` - Resource exports

### **Save System Utilities**
- `src/lib/game/utils/save/storage.ts` - Storage management
- `src/lib/game/utils/save/importExport.ts` - Import/export functionality
- `src/lib/game/utils/save/offline.ts` - Offline progress calculation
- `src/lib/game/utils/save/timing.ts` - Save timing logic
- `src/lib/game/utils/save/index.ts` - Save system exports

### **Migration Utilities**
- `src/lib/game/utils/migration/gameState.ts` - Game state migration
- `src/lib/game/utils/migration/validation.ts` - Migration validation
- `src/lib/game/utils/migration/index.ts` - Migration exports

### **Performance Utilities**
- `src/lib/game/utils/performance/monitoring.ts` - Performance monitoring
- `src/lib/game/utils/performance/calculations.ts` - Performance calculations
- `src/lib/game/utils/performance/analysis.ts` - Performance analysis
- `src/lib/game/utils/performance/optimization.ts` - Performance optimization
- `src/lib/game/utils/performance/formatting.ts` - Performance formatting
- `src/lib/game/utils/performance/budget.ts` - Performance budget management
- `src/lib/game/utils/performance/circularBuffer.ts` - Circular buffer implementation
- `src/lib/game/utils/performance/index.ts` - Performance exports

### **Validation Utilities**
- `src/lib/game/utils/validation/resourceValidation.ts` - Resource validation
- `src/lib/game/utils/validation/buildingValidation.ts` - Building validation
- `src/lib/game/utils/validation/technologyValidation.ts` - Technology validation
- `src/lib/game/utils/validation/actionValidation.ts` - Action validation
- `src/lib/game/utils/validation/crossReferenceValidation.ts` - Cross-reference validation
- `src/lib/game/utils/validation/index.ts` - Validation exports

### **Action Checker Utilities**
- `src/lib/game/utils/actionChecker/queries.ts` - Action queries
- `src/lib/game/utils/actionChecker/status.ts` - Action status checking
- `src/lib/game/utils/actionChecker/validation.ts` - Action validation
- `src/lib/game/utils/actionChecker/index.ts` - Action checker exports

### **Game Calculation Utilities**
- `src/lib/game/utils/gameCalculations/aggregation.ts` - Calculation aggregation
- `src/lib/game/utils/gameCalculations/costs.ts` - Cost calculations
- `src/lib/game/utils/gameCalculations/memoization.ts` - Memoization utilities
- `src/lib/game/utils/gameCalculations/index.ts` - Game calculation exports

### **Error Handling Utilities**
- `src/lib/game/utils/error/handlers.ts` - Error handler creation
- `src/lib/game/utils/error/logging.ts` - Error logging utilities
- `src/lib/game/utils/error/index.ts` - Error handling exports

---

## 📱 **App Router Components**

### **Next.js App Router**
- `src/app/layout.tsx` - Root layout component
- `src/app/page.tsx` - Main game page component

---

## 🎨 **UI Components**

### **Game Components**
- `src/components/game/ResourceDisplay.tsx` - Resource display component
- `src/components/game/ActionButton.tsx` - Action button component
- `src/components/game/ActionList.tsx` - Action list component
- `src/components/game/BuildingList.tsx` - Building list component
- `src/components/game/LoopActionButton.tsx` - Loop action button component
- `src/components/game/LoopActionList.tsx` - Loop action list component
- `src/components/game/TechnologyList.tsx` - Technology list component
- `src/components/game/UpgradeList.tsx` - Upgrade list component
- `src/components/game/AchievementCard.tsx` - Achievement card component
- `src/components/game/AchievementList.tsx` - Achievement list component

### **Scene Components**
- `src/components/scenes/SceneNavigation.tsx` - Scene navigation component
- `src/components/scenes/ActionsScene.tsx` - Actions scene component
- `src/components/scenes/BuildingsScene.tsx` - Buildings scene component
- `src/components/scenes/ResearchScene.tsx` - Research scene component
- `src/components/scenes/PrestigeScene.tsx` - Prestige scene component
- `src/components/scenes/AchievementScene.tsx` - Achievement scene component
- `src/components/scenes/PerformanceScene.tsx` - Performance scene component
- `src/components/scenes/index.ts` - Scene exports

### **UI Components**
- `src/components/ui/Modal.tsx` - Modal component
- `src/components/ui/EventModal.tsx` - Event modal component
- `src/components/ui/EventNotification.tsx` - Event notification component
- `src/components/ui/AchievementNotification.tsx` - Achievement notification component
- `src/components/ui/ErrorBoundary.tsx` - Error boundary component
- `src/components/ui/PerformanceMonitor.tsx` - Performance monitor component
- `src/components/ui/ConfigurationValidator.tsx` - Configuration validator component
- `src/components/ui/SvgSprites.tsx` - SVG sprites component

---

## 🎨 **Styling Modules**

### **Component Styles**
- `src/styles/components/game/AchievementCard.module.scss` - Achievement card styles
- `src/styles/components/game/AchievementList.module.scss` - Achievement list styles
- `src/styles/components/game/BuildingList.module.scss` - Building list styles
- `src/styles/components/game/LoopActionButton.module.scss` - Loop action button styles
- `src/styles/components/game/LoopActionList.module.scss` - Loop action list styles
- `src/styles/components/game/ResourceDisplay.module.scss` - Resource display styles
- `src/styles/components/scenes/AchievementScene.module.scss` - Achievement scene styles
- `src/styles/components/ui/AchievementNotification.module.scss` - Achievement notification styles
- `src/styles/components/ui/ErrorBoundary.module.scss` - Error boundary styles

### **Layout Styles**
- `src/styles/scenes/SceneLayout.module.scss` - Scene layout styles
- `src/styles/scenes/SceneNavigation.module.scss` - Scene navigation styles
- `src/styles/globals.scss` - Global styles
- `src/styles/page.module.scss` - Page-specific styles

---

## 📊 **Constants**

### **Game Constants**
- `src/lib/game/constants/game.ts` - Core game constants
- `src/lib/game/constants/events.ts` - Event constants
- `src/lib/game/constants/prestige.ts` - Prestige constants
- `src/lib/game/constants/ui.ts` - UI constants
- `src/lib/game/constants/index.ts` - Constant exports

---

## 🧪 **Testing Modules**

### **Test Files**
- `src/__tests__/setup.test.ts` - Test setup verification
- `src/__tests__/game/resourceCalculations.test.ts` - Resource calculation tests
- `src/__tests__/game/resourceUpdates.test.ts` - Resource update tests
- `src/__tests__/game/resourceValidation.test.ts` - Resource validation tests

### **Test Utilities**
- `src/__tests__/utils/testHelpers.ts` - Test helper functions
- `src/__tests__/utils/mockData.ts` - Mock data for tests
- `src/__tests__/utils/circularBuffer.test.ts` - Circular buffer tests
- `src/__tests__/utils/errorLogger.test.ts` - Error logger tests
- `src/__tests__/utils/numberUtils.test.ts` - Number utility tests
- `src/__tests__/utils/performanceOptimizations.test.ts` - Performance optimization tests
- `src/__tests__/utils/stringUtils.test.ts` - String utility tests
- `src/__tests__/utils/validationUtils.test.ts` - Validation utility tests
- `src/__tests__/utils/index.ts` - Test utility exports

---

## 📋 **Module Categories Summary**

### **By Functionality:**
- **Configuration**: 25 modules (game content definitions)
- **Utilities**: 91 modules (game logic and calculations)
- **Components**: 25 modules (UI components + App Router)
- **Hooks**: 8 modules (React hooks)
- **Styles**: 13 modules (SCSS stylesheets)
- **Types**: 12 modules (TypeScript definitions)
- **Constants**: 5 modules (game constants)
- **Tests**: 13 modules (test files and utilities)

### **By Complexity:**
- **High Complexity**: Performance monitoring, game loop, save system
- **Medium Complexity**: Achievement system, event system, validation
- **Low Complexity**: Constants, types, basic utilities

### **By Maintenance Priority:**
- **Critical**: Game loop, save system, performance monitoring
- **Important**: Validation, error handling, state management
- **Standard**: UI components, utilities, configuration
- **Low Priority**: Styles, constants, types

---

*This reference document should be updated whenever new modules are added or existing modules are significantly modified.*
