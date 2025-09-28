# 📁 Project Structure

This document provides a complete overview of the Medieval Kingdom idle game project structure.

## 🏗️ **Root Directory Structure**

```
the-kingdom/
├── __tests__/                    # Test files and utilities
├── docs/                         # Documentation
├── public/                       # Static assets
├── src/                          # Source code
├── eslint.config.mjs             # ESLint configuration
├── jest.config.mjs               # Jest testing configuration
├── jest.setup.js                 # Jest setup file
├── next-env.d.ts                 # Next.js TypeScript declarations
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Dependency lock file
├── README.md                     # Project overview
├── STRUCTURE.md                  # This file - project structure
├── tsconfig.json                 # TypeScript configuration
└── tsconfig.tsbuildinfo          # TypeScript build info
```

---

## 🧪 **Test Structure (`__tests__/`)**

```
__tests__/
├── game/                         # Game logic tests
│   ├── resourceCalculations.test.ts
│   ├── resourceUpdates.test.ts
│   └── resourceValidation.test.ts
├── utils/                        # Test utilities and helpers
│   ├── circularBuffer.test.ts
│   ├── errorLogger.test.ts
│   ├── index.ts                  # Test utilities barrel export
│   ├── mockData.ts               # Mock data for tests
│   ├── numberUtils.test.ts
│   ├── performanceOptimizations.test.ts
│   ├── stringUtils.test.ts
│   ├── testHelpers.ts            # Test helper functions
│   └── validationUtils.test.ts
└── setup.test.ts                 # Test setup verification
```

---

## 📚 **Documentation Structure (`docs/`)**

```
docs/
├── MODULES.md                    # Complete module reference
└── REFACTORING.md                # Refactoring analysis
```

---

## 🎨 **Public Assets (`public/`)**

```
public/
├── file.svg                      # File icon
├── globe.svg                     # Globe icon
├── next.svg                      # Next.js logo
├── vercel.svg                    # Vercel logo
└── window.svg                    # Window icon
```

---

## 💻 **Source Code Structure (`src/`)**

```
src/
├── app/                          # Next.js App Router
├── components/                   # React components
├── hooks/                        # Custom React hooks
├── lib/                          # Core game logic
└── styles/                       # SCSS stylesheets
```

---

## 📱 **App Router (`src/app/`)**

```
src/app/
├── favicon.ico                   # App favicon
├── layout.tsx                    # Root layout component
└── page.tsx                      # Main game page
```

---

## 🧩 **Components (`src/components/`)**

```
src/components/
├── game/                         # Game-specific UI components
│   ├── AchievementCard.tsx       # Achievement card component
│   ├── AchievementList.tsx       # Achievement list component
│   ├── ActionButton.tsx          # Action button component
│   ├── ActionList.tsx            # Action list component
│   ├── BuildingList.tsx          # Building list component
│   ├── LoopActionButton.tsx      # Loop action button component
│   ├── LoopActionList.tsx        # Loop action list component
│   ├── ResourceDisplay.tsx       # Resource display component
│   ├── TechnologyList.tsx        # Technology list component
│   └── UpgradeList.tsx           # Upgrade list component
├── scenes/                       # Scene-specific components
│   ├── AchievementScene.tsx      # Achievement scene component
│   ├── ActionsScene.tsx          # Actions scene component
│   ├── BuildingsScene.tsx        # Buildings scene component
│   ├── index.ts                  # Scene components barrel export
│   ├── PerformanceScene.tsx      # Performance scene component
│   ├── PrestigeScene.tsx         # Prestige scene component
│   ├── ResearchScene.tsx         # Research scene component
│   └── SceneNavigation.tsx       # Scene navigation component
└── ui/                           # Reusable UI components
    ├── AchievementNotification.tsx # Achievement notification component
    ├── ConfigurationValidator.tsx  # Configuration validator UI
    ├── ErrorBoundary.tsx          # Error boundary component
    ├── EventModal.tsx             # Event modal component
    ├── EventNotification.tsx      # Event notification component
    ├── Modal.tsx                  # Generic modal component
    ├── PerformanceMonitor.tsx     # Performance monitor UI
    └── SvgSprites.tsx             # SVG sprites component
```

---

## 🎣 **Custom Hooks (`src/hooks/`)**

```
src/hooks/
└── useSceneNavigation.tsx        # Scene navigation hook
```

---

## 🎮 **Core Game Logic (`src/lib/game/`)**

```
src/lib/game/
├── config/                       # Game configuration (modular)
├── constants/                    # Game constants
├── GameContext.tsx               # Main game context
├── hooks/                        # Game-specific React hooks
├── initializers/                 # Game state initializers
├── providers/                    # React context providers
├── types/                        # TypeScript type definitions
└── utils/                        # Comprehensive utility functions
```

---

## ⚙️ **Game Configuration (`src/lib/game/config/`)**

```
src/lib/game/config/
├── achievements/                 # Achievement definitions
│   ├── actionAchievements.ts     # Action-based achievements
│   ├── buildingAchievements.ts   # Building-based achievements
│   ├── comboAchievements.ts      # Combination achievements
│   ├── eventAchievements.ts      # Event-based achievements
│   ├── hiddenAchievements.ts     # Hidden achievements
│   ├── index.ts                  # Achievement configuration export
│   ├── prestigeAchievements.ts   # Prestige-based achievements
│   ├── resourceAchievements.ts   # Resource-based achievements
│   ├── technologyAchievements.ts # Technology-based achievements
│   └── timeAchievements.ts       # Time-based achievements
├── actions/                      # Action definitions
│   ├── basicActions.ts           # Basic action definitions
│   ├── buildingActions.ts        # Building action definitions
│   ├── index.ts                  # Action configuration export
│   ├── technologyActions.ts      # Technology action definitions
│   └── tradingActions.ts         # Trading action definitions
├── events/                       # Event definitions
│   ├── conflictEvents.ts         # Conflict event definitions
│   ├── index.ts                  # Event configuration export
│   ├── naturalEvents.ts          # Natural event definitions
│   ├── socialEvents.ts           # Social event definitions
│   └── tradingEvents.ts          # Trading event definitions
├── loopActions/                  # Loop action definitions
│   ├── craftingLoopActions.ts    # Crafting loop actions
│   ├── gatheringLoopActions.ts   # Gathering loop actions
│   ├── index.ts                  # Loop action configuration export
│   ├── militaryLoopActions.ts    # Military loop actions
│   └── researchLoopActions.ts    # Research loop actions
├── buildings.ts                  # Building definitions
├── index.ts                      # Main configuration export
├── prestige.ts                   # Prestige system configuration
├── resources.ts                  # Resource definitions
└── technologies.ts               # Technology definitions
```

---

## 📊 **Game Constants (`src/lib/game/constants/`)**

```
src/lib/game/constants/
├── events.ts                     # Event constants
├── game.ts                       # Core game constants
├── index.ts                      # Constants barrel export
├── prestige.ts                   # Prestige constants
└── ui.ts                         # UI constants
```

---

## 🎣 **Game Hooks (`src/lib/game/hooks/`)**

```
src/lib/game/hooks/
├── index.ts                      # Hooks barrel export
├── useAchievements.tsx           # Achievement system hook
├── useGameActions.tsx            # Game actions hook
├── useGameCalculations.tsx       # Game calculations hook
├── useGameLoop.tsx               # Main game loop hook
├── useGameTime.tsx               # Game time management hook
├── useLoopActions.tsx            # Loop actions hook
├── usePerformanceMonitor.tsx     # Performance monitoring hook
└── useSaveSystem.tsx             # Save system hook
```

---

## 🏗️ **Game Initializers (`src/lib/game/initializers/`)**

```
src/lib/game/initializers/
├── buildingInitializer.ts        # Building initialization
├── eventInitializer.ts           # Event initialization
├── gameStateFactory.ts           # Game state factory
├── researchInitializer.ts        # Research initialization
├── resourceInitializer.ts        # Resource initialization
└── technologyInitializer.ts      # Technology initialization
```

---

## 🔄 **Game Providers (`src/lib/game/providers/`)**

```
src/lib/game/providers/
├── GameActionsProvider.tsx       # Game actions provider
├── GameCalculationsProvider.tsx  # Game calculations provider
├── GameStateProvider.tsx         # Game state provider
└── index.ts                      # Provider barrel export
```

---

## 📝 **Type Definitions (`src/lib/game/types/`)**

```
src/lib/game/types/
├── achievements.ts               # Achievement types
├── actions.ts                    # Action types
├── buildings.ts                  # Building types
├── context.ts                    # Context types
├── error.ts                      # Error types
├── events.ts                     # Event types
├── game.ts                       # Core game types
├── index.ts                      # Type definitions barrel export
├── loopActions.ts                # Loop action types
├── prestige.ts                   # Prestige types
├── resources.ts                  # Resource types
├── scenes.ts                     # Scene types
└── technologies.ts               # Technology types
```

---

## 🛠️ **Utility Functions (`src/lib/game/utils/`)**

```
src/lib/game/utils/
├── achievement/                  # Achievement utilities
│   ├── checker.ts                # Achievement checking logic
│   ├── index.ts                  # Achievement utilities export
│   ├── initialization.ts         # Achievement initialization
│   ├── notifications.ts          # Achievement notifications
│   ├── progress.ts               # Achievement progress tracking
│   ├── rewards.ts                # Achievement reward processing
│   └── stats.ts                  # Achievement statistics
├── actionChecker/                # Action validation utilities
│   ├── index.ts                  # Action checker utilities export
│   ├── queries.ts                # Action queries
│   ├── status.ts                 # Action status checking
│   └── validation.ts             # Action validation checking
├── actions/                      # Action processing utilities
│   ├── buildingActions.ts        # Building action processing
│   ├── gameActions.ts            # Core game action processing
│   ├── gameLoopActions.ts        # Game loop action processing
│   ├── index.ts                  # Action utilities export
│   ├── resourceActions.ts        # Resource action processing
│   ├── technologyActions.ts      # Technology action processing
│   └── upgradeActions.ts         # Upgrade action processing
├── calculations/                 # Mathematical calculations
│   ├── affordability.ts          # Affordability calculations
│   ├── costs.ts                  # Cost calculations
│   ├── index.ts                  # Calculation utilities export
│   ├── multipliers.ts            # Multiplier calculations
│   └── production.ts             # Production calculations
├── error/                        # Error handling utilities
│   ├── handlers.ts               # Error handlers
│   ├── index.ts                  # Error utilities export
│   └── logging.ts                # Error logging
├── event/                        # Event system utilities
│   ├── choices.ts                # Event choice processing
│   ├── history.ts                # Event history tracking
│   ├── index.ts                  # Event utilities export
│   ├── state.ts                  # Event state management
│   ├── timing.ts                 # Event timing logic
│   └── triggering.ts             # Event triggering
├── gameCalculations/             # Game-specific calculations
│   ├── aggregation.ts            # Calculation aggregation
│   ├── costs.ts                  # Cost calculations
│   ├── index.ts                  # Game calculation utilities export
│   └── memoization.ts            # Memoization utilities
├── gameState/                    # Game state management
│   ├── buildings.ts              # Building state management
│   ├── index.ts                  # Game state utilities export
│   ├── initialization.ts         # State initialization
│   ├── resources.ts              # Resource state management
│   ├── technologies.ts           # Technology state management
│   └── upgrades.ts               # Upgrade state management
├── loopActions/                  # Loop action utilities
│   ├── index.ts                  # Loop action utilities export
│   ├── management.ts             # Loop action management
│   ├── processing.ts             # Loop action processing
│   ├── progress.ts               # Loop progress tracking
│   └── validation.ts             # Loop action validation
├── loopCalculations/             # Loop calculation utilities
│   ├── efficiency.ts             # Loop efficiency calculations
│   ├── index.ts                  # Loop calculation utilities export
│   ├── progress.ts               # Loop progress calculations
│   └── stats.ts                  # Loop statistics calculations
├── migration/                    # Save migration utilities
│   ├── gameState.ts              # Game state migration
│   ├── index.ts                  # Migration utilities export
│   └── validation.ts             # Migration validation
├── number/                       # Number formatting utilities
│   ├── formatting.ts             # Number formatting
│   ├── index.ts                  # Number utilities export
│   └── math.ts                   # Mathematical utilities
├── performance/                  # Performance monitoring utilities
│   ├── analysis.ts               # Performance analysis
│   ├── budget.ts                 # Performance budget checking
│   ├── calculations.ts           # Performance calculations
│   ├── circularBuffer.ts         # Circular buffer implementation
│   ├── formatting.ts             # Performance formatting
│   ├── index.ts                  # Performance utilities export
│   ├── monitoring.ts             # Performance monitoring
│   └── optimization.ts           # Performance optimization
├── prestige/                     # Prestige system utilities
│   ├── calculations.ts           # Prestige calculations
│   ├── index.ts                  # Prestige utilities export
│   └── operations.ts             # Prestige operations
├── resource/                     # Resource management utilities
│   ├── changes.ts                # Resource change processing
│   ├── index.ts                  # Resource utilities export
│   ├── payments.ts               # Resource payment logic
│   └── processing.ts             # Resource processing
├── save/                         # Save system utilities
│   ├── importExport.ts           # Save import/export
│   ├── index.ts                  # Save utilities export
│   ├── offline.ts                # Offline progress calculation
│   ├── storage.ts                # Save storage management
│   └── timing.ts                 # Save timing management
├── string/                       # String processing utilities
│   ├── encoding.ts               # String encoding
│   ├── index.ts                  # String utilities export
│   └── parsing.ts                # String parsing
├── technology/                   # Technology system utilities
│   ├── index.ts                  # Technology utilities export
│   ├── progress.ts               # Technology progress tracking
│   ├── queries.ts                # Technology queries
│   ├── research.ts               # Technology research processing
│   └── validation.ts             # Technology validation
└── validation/                   # Validation utilities
    ├── actionValidation.ts       # Action validation
    ├── buildingValidation.ts     # Building validation
    ├── crossReferenceValidation.ts # Cross-reference validation
    ├── index.ts                  # Validation utilities export
    ├── resourceValidation.ts     # Resource validation
    └── technologyValidation.ts   # Technology validation
```

---

## 🎨 **Styling (`src/styles/`)**

```
src/styles/
├── components/                   # Component-specific styles
│   ├── game/                     # Game component styles
│   │   ├── AchievementCard.module.scss
│   │   ├── AchievementList.module.scss
│   │   ├── BuildingList.module.scss
│   │   ├── LoopActionButton.module.scss
│   │   ├── LoopActionList.module.scss
│   │   └── ResourceDisplay.module.scss
│   ├── scenes/                   # Scene component styles
│   │   └── AchievementScene.module.scss
│   └── ui/                       # UI component styles
│       ├── AchievementNotification.module.scss
│       └── ErrorBoundary.module.scss
├── scenes/                       # Scene layout styles
│   ├── SceneLayout.module.scss
│   └── SceneNavigation.module.scss
├── globals.scss                  # Global styles
└── page.module.scss              # Page-specific styles
```

---

## 📊 **Structure Statistics**

### **File Count by Category:**
- **Configuration Files**: 8
- **Test Files**: 13
- **Documentation Files**: 3
- **App Router Files**: 3
- **Component Files**: 25
- **Hook Files**: 8
- **Game Logic Files**: 159
- **Style Files**: 13
- **Total Files**: ~232

### **Directory Count by Category:**
- **Root Directories**: 4
- **Test Directories**: 2
- **Component Directories**: 3
- **Game Logic Directories**: 8
- **Utility Directories**: 20
- **Style Directories**: 4
- **Total Directories**: ~41

---

## 🔗 **Key Relationships**

### **Import Patterns:**
- Components import from `@/lib/game/` for game logic
- Game logic imports from `@/lib/game/utils/` for utilities
- Tests import from both source and test utilities
- Styles use CSS Modules for component-specific styling

### **Configuration Dependencies:**
- Game logic depends on configuration files
- Utilities depend on type definitions
- Components depend on game hooks and providers
- Tests depend on mock data and test helpers

### **Build Dependencies:**
- Next.js App Router handles routing and SSR
- TypeScript provides type safety
- Jest handles testing
- ESLint ensures code quality
- SCSS provides styling capabilities

---

*This structure document should be updated whenever significant changes are made to the project organization.*
