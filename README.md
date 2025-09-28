# 🏰 Medieval Kingdom - Idle/Clicker Game

A sophisticated browser-based idle/clicker game built with Next.js, React, and TypeScript. Players build and manage a medieval kingdom through resource management, building construction, technology research, and prestige mechanics.

## 🎮 Game Overview

**Medieval Kingdom** is an incremental game where players start with basic resources and gradually expand their kingdom through strategic decision-making. The game features:

- **Resource Management**: Gold, Wood, Stone, Food, Prestige, and Research Points
- **Action System**: 12 configurable actions with unlock conditions and progression
- **Loop Actions System**: 10 automated actions that run continuously with resource costs
- **Building System**: 8 unique buildings with different production capabilities
- **Technology Tree**: 6 technologies that unlock advanced buildings and upgrades
- **Event System**: 8 random events across 4 categories providing choices and consequences
- **Prestige System**: Reset mechanics with permanent upgrades
- **Save System**: Automatic and manual save/load functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd the-kingdom

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.4.6 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: SCSS with CSS Modules
- **Build Tool**: Turbopack (development)

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main game page
│   └── favicon.ico        # App favicon
├── components/             # React components
│   ├── game/              # Game-specific UI components
│   │   ├── AchievementCard.tsx
│   │   ├── AchievementList.tsx
│   │   ├── ActionButton.tsx
│   │   ├── ActionList.tsx
│   │   ├── BuildingList.tsx
│   │   ├── LoopActionButton.tsx
│   │   ├── LoopActionList.tsx
│   │   ├── ResourceDisplay.tsx
│   │   ├── TechnologyList.tsx
│   │   └── UpgradeList.tsx
│   ├── scenes/            # Scene-specific components
│   │   ├── AchievementScene.tsx
│   │   ├── ActionsScene.tsx
│   │   ├── BuildingsScene.tsx
│   │   ├── PerformanceScene.tsx
│   │   ├── PrestigeScene.tsx
│   │   ├── ResearchScene.tsx
│   │   ├── SceneNavigation.tsx
│   │   └── index.ts
│   └── ui/                # Reusable UI components
│       ├── AchievementNotification.tsx
│       ├── ConfigurationValidator.tsx
│       ├── ErrorBoundary.tsx
│       ├── EventModal.tsx
│       ├── EventNotification.tsx
│       ├── Modal.tsx
│       ├── PerformanceMonitor.tsx
│       └── SvgSprites.tsx
├── hooks/                  # Custom React hooks
│   └── useSceneNavigation.tsx
├── lib/game/              # Core game logic
│   ├── config/            # Game configuration (modular)
│   │   ├── achievements/  # Achievement definitions
│   │   │   ├── actionAchievements.ts
│   │   │   ├── buildingAchievements.ts
│   │   │   ├── comboAchievements.ts
│   │   │   ├── eventAchievements.ts
│   │   │   ├── hiddenAchievements.ts
│   │   │   ├── prestigeAchievements.ts
│   │   │   ├── resourceAchievements.ts
│   │   │   ├── technologyAchievements.ts
│   │   │   ├── timeAchievements.ts
│   │   │   └── index.ts
│   │   ├── actions/       # Action definitions
│   │   │   ├── basicActions.ts
│   │   │   ├── buildingActions.ts
│   │   │   ├── technologyActions.ts
│   │   │   ├── tradingActions.ts
│   │   │   └── index.ts
│   │   ├── events/        # Event definitions
│   │   │   ├── conflictEvents.ts
│   │   │   ├── naturalEvents.ts
│   │   │   ├── socialEvents.ts
│   │   │   ├── tradingEvents.ts
│   │   │   └── index.ts
│   │   ├── loopActions/   # Loop action definitions
│   │   │   ├── craftingLoopActions.ts
│   │   │   ├── gatheringLoopActions.ts
│   │   │   ├── militaryLoopActions.ts
│   │   │   ├── researchLoopActions.ts
│   │   │   └── index.ts
│   │   ├── buildings.ts   # Building definitions
│   │   ├── prestige.ts    # Prestige system config
│   │   ├── resources.ts   # Resource definitions
│   │   ├── technologies.ts # Technology definitions
│   │   └── index.ts
│   ├── constants/         # Game constants
│   │   ├── events.ts
│   │   ├── game.ts
│   │   ├── prestige.ts
│   │   ├── ui.ts
│   │   └── index.ts
│   ├── GameContext.tsx    # Main game context
│   ├── hooks/             # Custom React hooks
│   │   ├── useAchievements.tsx
│   │   ├── useGameActions.tsx
│   │   ├── useGameCalculations.tsx
│   │   ├── useGameLoop.tsx
│   │   ├── useGameTime.tsx
│   │   ├── useLoopActions.tsx
│   │   ├── usePerformanceMonitor.tsx
│   │   ├── useSaveSystem.tsx
│   │   └── index.ts
│   ├── initializers/      # Game state initializers
│   │   ├── buildingInitializer.ts
│   │   ├── eventInitializer.ts
│   │   ├── gameStateFactory.ts
│   │   ├── researchInitializer.ts
│   │   ├── resourceInitializer.ts
│   │   └── technologyInitializer.ts
│   ├── providers/         # React context providers
│   │   ├── GameActionsProvider.tsx
│   │   ├── GameCalculationsProvider.tsx
│   │   ├── GameStateProvider.tsx
│   │   └── index.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── achievements.ts
│   │   ├── actions.ts
│   │   ├── buildings.ts
│   │   ├── context.ts
│   │   ├── error.ts
│   │   ├── events.ts
│   │   ├── game.ts
│   │   ├── loopActions.ts
│   │   ├── prestige.ts
│   │   ├── resources.ts
│   │   ├── scenes.ts
│   │   ├── technologies.ts
│   │   └── index.ts
│   └── utils/             # Comprehensive utility functions
│       ├── achievement/   # Achievement utilities
│       ├── actionChecker/ # Action validation utilities
│       ├── actions/       # Action processing utilities
│       ├── calculations/  # Mathematical calculations
│       ├── error/         # Error handling utilities
│       ├── event/         # Event system utilities
│       ├── gameCalculations/ # Game calculation utilities
│       ├── gameState/     # Game state management
│       ├── loopActions/   # Loop action utilities
│       ├── loopCalculations/ # Loop calculation utilities
│       ├── migration/     # Save migration utilities
│       ├── number/        # Number formatting utilities
│       ├── performance/   # Performance monitoring utilities
│       ├── prestige/      # Prestige system utilities
│       ├── resource/      # Resource management utilities
│       ├── save/          # Save system utilities
│       ├── string/        # String processing utilities
│       ├── technology/    # Technology system utilities
│       ├── validation/    # Validation utilities
│       └── index.ts
├── __tests__/             # Test files and utilities
│   ├── game/              # Game logic tests
│   │   ├── resourceCalculations.test.ts
│   │   ├── resourceUpdates.test.ts
│   │   └── resourceValidation.test.ts
│   ├── utils/             # Utility tests and test helpers
│   │   ├── circularBuffer.test.ts
│   │   ├── errorLogger.test.ts
│   │   ├── numberUtils.test.ts
│   │   ├── performanceOptimizations.test.ts
│   │   ├── stringUtils.test.ts
│   │   ├── validationUtils.test.ts
│   │   ├── testHelpers.ts
│   │   ├── mockData.ts
│   │   └── index.ts
│   └── setup.test.ts      # Test setup verification
└── styles/                # SCSS stylesheets
    ├── components/        # Component-specific styles
    │   ├── game/         # Game component styles
    │   ├── scenes/       # Scene component styles
    │   └── ui/           # UI component styles
    ├── scenes/           # Scene layout styles
    ├── globals.scss      # Global styles
    └── page.module.scss  # Page-specific styles
```

## 🎯 Core Game Systems

### 1. Resource System
The game features 6 primary resources:

| Resource | Icon | Starting Amount | Description |
|----------|------|----------------|-------------|
| Gold | 🪙 | 10 | Primary currency for purchases |
| Wood | 🌲 | 0 | Basic building material |
| Stone | 🪨 | 0 | Advanced building material |
| Food | 🍖 | 0 | Sustains population and buildings |
| Prestige | 👑 | 0 | Hidden resource for prestige upgrades |
| Research Points | 🔬 | 0 | Hidden resource for technology research |

### 2. Action System
The game features 12 configurable actions that provide active gameplay beyond passive resource generation:

#### Basic Actions (Always Available)
- **🌲 Gather Wood**: +2 wood - Basic resource gathering
- **🪨 Gather Stone**: +1 stone - Basic resource gathering  
- **🍖 Hunt Food**: +1 food - Basic resource gathering

#### Trading Actions (Unlock with Resource Thresholds)
- **💰 Sell Wood**: -10 wood, +5 gold (unlocks at 50+ wood)
- **💰 Sell Stone**: -5 stone, +8 gold (unlocks at 25+ stone)
- **💰 Sell Food**: -20 food, +15 gold (unlocks at 100+ food)

#### Building-Dependent Actions
- **🔨 Craft Tools**: -5 wood, +2 stone (requires Blacksmith)
- **⚔️ Forge Weapons**: -3 stone, +10 gold (requires Blacksmith)
- **🌾 Farm Work**: -2 food, +5 wood (requires Farm)

#### Technology-Dependent Actions
- **🪨 Advanced Mining**: +3 stone (requires Engineering)
- **🔬 Scientific Research**: +2 research points (requires Chemistry)
- **👑 Royal Diplomacy**: +1 prestige (requires Writing)

**Action Features:**
- **Progressive Unlocking**: Actions unlock through building construction, technology research, and resource accumulation
- **One-time Unlocks**: Trading actions become permanently available after first unlock
- **Strategic Choices**: Players must balance resource costs and gains
- **Visual Feedback**: SVG icons and hover tooltips for clear understanding

### 3. Loop Actions System
The game features 10 automated loop actions that run continuously, providing passive resource generation with ongoing costs:

#### Gathering Loop Actions
- **🌾 Basic Gathering**: +5 food (no cost, available from start)
- **⛏️ Continuous Mining**: +10 stone, costs 5 food (requires Quarry)
- **🪓 Continuous Logging**: +8 wood, costs 5 food (requires Woodcutter's Hut)
- **🚜 Continuous Farming**: +12 food, costs 5 food (requires Farm + 100 food)

#### Crafting Loop Actions
- **🔨 Mass Tool Production**: +15 stone, costs 20 wood (requires Blacksmith)
- **⚔️ Weapon Forging**: +25 gold, costs 30 stone (requires Blacksmith)

#### Research Loop Actions
- **📚 Ongoing Research**: +5 research points, costs 10 food (requires Library)
- **🎓 Advanced Studies**: +10 research points, costs 15 food + 5 gold (requires University)

#### Military Loop Actions
- **🛡️ Training Soldiers**: +2 prestige, costs 20 food + 10 gold (requires Castle)
- **🏰 Fortification**: +5 prestige, costs 50 stone + 30 wood + 20 gold (requires Castle)

**Loop Action Features:**
- **Automated Operation**: Actions run continuously once activated
- **Resource Management**: Each action has ongoing costs and gains
- **Progressive Unlocking**: Actions unlock through building construction and resource thresholds
- **Strategic Depth**: Players must balance loop action costs with their resource production
- **Categories**: Actions are organized by type (Gathering, Crafting, Research, Military)

### 4. Building System
8 unique buildings with different production and consumption patterns:

#### Basic Buildings
- **Woodcutter's Hut**: Produces Wood (1.2/s) - Cost: 15 Gold
- **Quarry**: Produces Stone (0.8/s) - Cost: 30 Gold, 5 Wood
- **Farm**: Produces Food (1.5/s) - Cost: 25 Gold, 8 Wood
- **Blacksmith**: Produces Gold (2.5/s), consumes Wood (0.3/s) and Stone (0.2/s) - Cost: 50 Gold, 15 Wood, 10 Stone

#### Advanced Buildings
- **Castle**: Produces Prestige (0.1/s), consumes Food (0.5/s) - Cost: 200 Gold, 50 Wood, 100 Stone, 20 Food
- **Library**: Produces Gold (1.0/s) and Research Points (0.1/s) - Cost: 100 Gold, 30 Wood, 20 Stone - Requires Writing technology
- **University**: Produces Gold (3.0/s), Prestige (0.05/s), and Research Points (0.3/s), consumes Food (1.0/s) - Cost: 300 Gold, 80 Wood, 60 Stone, 30 Food - Requires Writing and Mathematics
- **Laboratory**: Produces Gold (5.0/s), Prestige (0.1/s), and Research Points (0.5/s), consumes Food (2.0/s) - Cost: 500 Gold, 100 Wood, 150 Stone, 50 Food - Requires Chemistry and Engineering

### 5. Technology System
6 technologies that unlock advanced buildings and provide strategic depth. Research is time-based and requires active management:

**Research Mechanics:**
- **Time-based Research**: Each technology has a specific research duration
- **Active Research**: Only one technology can be researched at a time
- **Resource Costs**: Technologies require specific resource combinations
- **Prerequisites**: Some technologies require other technologies to be completed first

| Technology | Cost | Research Time | Unlocks | Prerequisites |
|------------|------|---------------|---------|---------------|
| Writing | 50 Gold, 20 Wood | 30s | Library | None |
| Mathematics | 100 Gold, 30 Wood, 20 Stone | 60s | University | Writing |
| Engineering | 150 Gold, 50 Wood, 40 Stone | 90s | - | Writing, Mathematics |
| Chemistry | 200 Gold, 60 Wood, 50 Stone, 20 Food | 120s | Laboratory | Mathematics, Engineering |
| Physics | 300 Gold, 80 Wood, 70 Stone, 30 Food | 180s | - | Mathematics, Chemistry |
| Biology | 400 Gold, 100 Wood, 90 Stone, 50 Food | 240s | - | Chemistry, Physics |

### 6. Prestige System
Prestige is earned by resetting the game with accumulated Food. The formula is:
```
Prestige = sqrt(Total Food Generated / 1000)
```

Prestige can be spent on 4 permanent upgrades:

| Upgrade | Effect | Cost Formula | Max Level |
|---------|--------|--------------|-----------|
| Royal Decrees | +25% click gains per level | 5 × 1.6^level | 20 |
| Master Craftsmen | -3% building costs per level | 8 × 1.7^level | 25 |
| Fertile Lands | +20% Food production per level | 6 × 1.65^level | 25 |
| Military Might | +20% Prestige production per level | 10 × 1.7^level | 20 |

### 7. Event System
Random events occur at different intervals based on game progression, providing players with choices that affect resources:

**Event Timing:**
- **Initial Events**: 10-30 seconds (faster events for new players)
- **Standard Events**: 1-3 minutes (60-180 seconds)
- **Auto-resolve**: Events automatically resolve after 30 seconds if no choice is made

#### Event Types
- **🛒 Merchant Visit**: Trade resources for Gold
- **⚔️ Bandit Raid**: Lose resources or pay tribute
- **🌾 Bountiful Harvest**: Gain multiple resources
- **🌵 Drought**: Lose Food or accept reduced production
- **👑 Royal Tax**: Pay Gold or lose Prestige
- **👤 Mysterious Stranger**: Trade Gold for Prestige
- **🦠 Plague**: Lose Prestige or accept consequences
- **🎉 Festival**: Gain resources through celebration

## 🔧 Technical Implementation

### Comprehensive Utility Architecture
The game features a sophisticated utility system organized into specialized modules, each handling specific aspects of game functionality:

#### **Core Utility Categories**

**Game State Management (`utils/gameState/`)**
- State initialization and validation
- Resource, building, and technology state management
- Upgrade system integration

**Action System (`utils/actions/`, `utils/actionChecker/`)**
- Action processing and validation
- Unlock condition checking
- Building and technology-dependent actions
- Game loop action management

**Calculation Engine (`utils/calculations/`, `utils/gameCalculations/`)**
- Mathematical operations and cost calculations
- Production and multiplier calculations
- Memoization for performance optimization
- Cross-system calculation aggregation

**Event System (`utils/event/`)**
- Event triggering and timing
- Choice processing and consequences
- Event history and state management

**Loop Actions (`utils/loopActions/`, `utils/loopCalculations/`)**
- Automated action management
- Efficiency calculations and progress tracking
- Loop action validation and processing

**Performance Monitoring (`utils/performance/`)**
- Real-time performance metrics
- Circular buffer for data collection
- Performance analysis and optimization
- Budget monitoring and warnings

**Error Handling (`utils/error/`)**
- Centralized error logging and handling
- Validation error management
- State error recovery
- Comprehensive error context tracking

**Save System (`utils/save/`, `utils/migration/`)**
- Import/export functionality
- Offline progress calculation
- Save file migration and validation
- Storage management and timing

**Specialized Systems**
- **Achievements** (`utils/achievement/`): Progress tracking and notifications
- **Prestige** (`utils/prestige/`): Prestige calculations and operations
- **Technology** (`utils/technology/`): Research progress and validation
- **Resources** (`utils/resource/`): Resource management and processing
- **Validation** (`utils/validation/`): Cross-reference and input validation
- **Number/String** (`utils/number/`, `utils/string/`): Formatting and parsing utilities

### Game Loop Architecture
The game uses a sophisticated hook-based architecture with the following key components:

#### Core Hooks
- **useGameLoop**: Manages the main game tick (20 FPS) with pause support
- **useGameActions**: Handles player interactions and action execution
- **useGameCalculations**: Computes game state and costs
- **useSaveSystem**: Manages save/load functionality with 30-second intervals
- **useGameTime**: Tracks time-based events and research progress
- **usePerformanceMonitor**: Monitors game performance with real-time metrics
- **useLoopActions**: Manages automated loop action execution

#### State Management
- **GameContext**: Central React context for game state
- **Immutable Updates**: All state changes use structural sharing
- **Validation**: Comprehensive input validation and error handling
- **Performance**: Optimized re-renders with React.memo and useMemo

### Save System
- **Automatic Saves**: Every 30 seconds to localStorage
- **Manual Saves**: Export/Import functionality with `.txt` and `.save` file support
- **Offline Progress**: Capped at 1 hour of offline time for balanced progression
- **Version Control**: Save versioning for compatibility across updates
- **File Management**: Automatic filename generation (`medieval-kingdom.save.txt`)

### Performance Optimizations
- **Debounced Updates**: Prevents excessive re-renders
- **Memoized Calculations**: Cached expensive computations
- **Structural Sharing**: Minimal object recreation
- **Frame Rate Control**: 20 FPS game loop for smooth gameplay
- **Background Execution**: Game continues running even when tab is not active (uses `setInterval` instead of `requestAnimationFrame`)
- **State-Driven Architecture**: All calculations are tied to current game state, making state-independent caching suboptimal

## 🎨 UI/UX Design

### Visual Design
- **Theme**: Dark medieval aesthetic with blue/purple gradients
- **Icons**: SVG icons (using `ic-*` format) for resources, buildings, and technologies, with emoji icons for actions and events, providing intuitive visual feedback
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects

### Responsive Layout
- **Grid System**: CSS Grid for flexible layouts
- **Mobile-Friendly**: Responsive design for various screen sizes
- **Accessibility**: Proper contrast ratios and keyboard navigation

### Keyboard Shortcuts
- **Space Bar**: Toggle game pause/resume
- **Tab Navigation**: Full keyboard navigation support
- **Enter/Space**: Activate buttons and confirm actions

### User Interface Components
- **Resource Display**: Real-time resource counters with per-second rates
- **Action System**: Interactive action buttons with unlock conditions and tooltips
- **Loop Actions System**: Automated action management with toggle controls
- **Building List**: Interactive building purchase interface
- **Technology Tree**: Visual technology research system
- **Prestige Modal**: Prestige calculation and upgrade interface
- **Event System**: Modal-based event choices with consequences

## 🔍 Configuration System

The game is fully data-driven through a modular configuration system. All game content is organized into logical modules for easy maintenance and extension:

### Modular Configuration Structure

The configuration system is organized into specialized modules:

- **`config/actions/`**: Action definitions split by category
  - `basicActions.ts` - Always available actions
  - `tradingActions.ts` - Resource trading actions
  - `buildingActions.ts` - Building-dependent actions
  - `technologyActions.ts` - Technology-dependent actions
- **`config/achievements/`**: Achievement definitions by type
  - `actionAchievements.ts` - Action-based achievements
  - `buildingAchievements.ts` - Building-based achievements
  - `resourceAchievements.ts` - Resource-based achievements
  - `technologyAchievements.ts` - Technology-based achievements
  - `prestigeAchievements.ts` - Prestige-based achievements
  - `eventAchievements.ts` - Event-based achievements
  - `timeAchievements.ts` - Time-based achievements
  - `comboAchievements.ts` - Multi-condition achievements
  - `hiddenAchievements.ts` - Secret achievements
- **`config/events/`**: Event definitions by category
  - `tradingEvents.ts` - Merchant and trading events
  - `conflictEvents.ts` - Bandit raids and conflicts
  - `naturalEvents.ts` - Weather and natural events
  - `socialEvents.ts` - Royal and social events
- **`config/loopActions/`**: Loop action definitions by category
  - `gatheringLoopActions.ts` - Resource gathering loops
  - `craftingLoopActions.ts` - Crafting and production loops
  - `researchLoopActions.ts` - Research and study loops
  - `militaryLoopActions.ts` - Military and prestige loops

### Adding New Actions
```typescript
// src/lib/game/config/actions/basicActions.ts
export const BASIC_ACTIONS: Record<ActionKey, ActionDef> = {
  newAction: {
    name: 'New Action',
    icon: '🎯',
    description: 'Description of the action.',
    cost: { wood: 5 },
    gains: { gold: 10 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    oneTimeUnlock: false,
  },
};

// Then export in src/lib/game/config/actions/index.ts
export * from './basicActions';
export * from './tradingActions';
export * from './buildingActions';
export * from './technologyActions';
```

### Adding New Resources
```typescript
// src/lib/game/config/resources.ts
export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  newResource: { 
    name: 'New Resource', 
    icon: '🎯', 
    decimals: 0, 
    start: 0 
  },
};
```

### Adding New Buildings
```typescript
// src/lib/game/config/buildings.ts
export const BUILDINGS: Record<BuildingKey, BuildingDef> = {
  newBuilding: {
    name: 'New Building',
    icon: '🏗️',
    desc: 'Description of the building.',
    baseCost: { gold: 100 },
    costScale: 1.15,
    baseProd: { gold: 5.0 },
    baseUse: { food: 1.0 },
  },
};
```

### Adding New Technologies
```typescript
// src/lib/game/config/technologies.ts
export const TECHNOLOGIES: Record<TechnologyKey, TechnologyDef> = {
  newTechnology: {
    name: 'New Technology',
    icon: 'ic-research',
    desc: 'Description of the technology.',
    baseCost: { gold: 200, researchPoints: 50 },
    costScale: 1.0,
    researchTime: 120,
    requiresTech: ['prerequisite'],
  },
};
```

### Adding New Loop Actions
```typescript
// src/lib/game/config/loopActions/craftingLoopActions.ts
export const CRAFTING_LOOP_ACTIONS: Record<LoopActionKey, LoopActionDef> = {
  newLoopAction: {
    name: 'New Loop Action',
    icon: '🎯',
    description: 'Description of the loop action.',
    cost: { food: 5 },
    gains: { gold: 10 },
    unlockConditions: [
      { type: 'building', key: 'blacksmith', value: 1 }
    ],
    loopPointsRequired: 1000,
    loopCategory: 'crafting',
    showWhenLocked: false,
  },
};

// Then export in src/lib/game/config/loopActions/index.ts
export * from './gatheringLoopActions';
export * from './craftingLoopActions';
export * from './researchLoopActions';
export * from './militaryLoopActions';
```

### Adding New Achievements
```typescript
// src/lib/game/config/achievements/actionAchievements.ts
export const ACTION_ACHIEVEMENTS: Record<AchievementKey, AchievementDef> = {
  newAchievement: {
    name: 'New Achievement',
    description: 'Description of the achievement.',
    icon: '🏆',
    category: 'action',
    condition: {
      type: 'action',
      action: 'newAction',
      count: 100
    },
    reward: {
      type: 'multiplier',
      resource: 'gold',
      value: 1.1
    },
    hidden: false,
  },
};
```

### Adding New Events
```typescript
// src/lib/game/config/events/tradingEvents.ts
export const TRADING_EVENTS: Record<EventKey, EventDef> = {
  newEvent: {
    name: 'New Event',
    description: 'Description of the event.',
    icon: '🎯',
    category: 'trading',
    choices: [
      {
        text: 'Accept the offer',
        effects: { gold: 50, wood: -10 }
      },
      {
        text: 'Decline',
        effects: { prestige: -1 }
      }
    ],
    weight: 1.0,
    minInterval: 300,
    maxInterval: 600,
  },
};
```

## 🧪 Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with Next.js rules
- **SCSS**: Modular styling with CSS Modules
- **React**: Functional components with hooks

### Import Guidelines
- **Use `@/` alias**: Always use the `@/` alias for imports instead of relative paths
- **No relative paths**: Avoid `./` and `../` in import statements
- **No example comments**: Do not include example statements in documentation comments


### SCSS File Organization
All SCSS files are organized in the `src/styles/` directory with the following structure:

```
src/styles/
├── components/              # Component-specific styles
│   ├── game/               # Game component styles
│   │   ├── AchievementCard.module.scss
│   │   ├── AchievementList.module.scss
│   │   ├── BuildingList.module.scss
│   │   ├── LoopActionButton.module.scss
│   │   ├── LoopActionList.module.scss
│   │   └── ResourceDisplay.module.scss
│   ├── scenes/             # Scene component styles
│   │   └── AchievementScene.module.scss
│   └── ui/                 # UI component styles
│       ├── AchievementNotification.module.scss
│       └── ErrorBoundary.module.scss
├── scenes/                 # Scene layout styles
│   ├── SceneLayout.module.scss
│   └── SceneNavigation.module.scss
├── globals.scss            # Global styles
└── page.module.scss        # Page-specific styles
```

**Guidelines for adding new SCSS files:**
- **Component styles**: Place in `src/styles/components/[category]/` matching the component's location
- **Scene styles**: Place in `src/styles/scenes/` for scene-specific layouts
- **Global styles**: Add to `src/styles/globals.scss` for app-wide styles
- **Import paths**: Use `@/styles/` prefix for all style imports
- **Naming**: Use `.module.scss` for component-specific styles, `.scss` for global styles

**Example import:**
```typescript
import styles from '@/styles/components/game/NewComponent.module.scss';
```

### Testing Strategy
- **Component Testing**: React components with proper props
- **Game Logic Testing**: Pure functions for game calculations
- **Integration Testing**: Game loop and state management
- **Performance Testing**: Frame rate and memory usage monitoring

### Error Handling
The game uses a sophisticated, consistent error handling system that ensures stability and provides comprehensive debugging information:

#### **Error Handling Pattern (Consistent Across All Functions)**
```typescript
export function gameFunction(state: GameState): GameState {
  try {
    // 1. Input validation with descriptive errors
    if (!state || typeof state !== 'object') {
      validationHandler('Invalid state parameter', { state: typeof state });
      throw new Error('Invalid state parameter');
    }
    
    // 2. Function logic here...
    return newState;
  } catch (error) {
    // 3. Comprehensive error logging with context
    stateErrorHandler('Failed to execute function', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    
    // 4. Safe fallback - return original state or safe default
    return state; // Prevents crashes and maintains game stability
  }
}
```

#### **Key Principles**
- **Input Validation**: All functions validate inputs before processing
- **Descriptive Errors**: Clear error messages with context for debugging
- **Error Catching**: All thrown errors are caught and handled gracefully
- **Safe Fallbacks**: Functions always return valid state, never crash
- **Comprehensive Logging**: All errors are logged with full context and stack traces
- **Game Stability**: Errors don't interrupt gameplay or cause crashes

#### **Error Handler Types**
- **`validationHandler`**: For input validation errors
- **`calculationHandler`**: For mathematical operation errors  
- **`stateErrorHandler`**: For state management errors
- **`handleGameError`**: Central error handling with categorization

#### **Error Recovery Strategy**
- **State Functions**: Return original state on error (preserves game state)
- **Calculation Functions**: Return safe default values (e.g., default multipliers)
- **UI Components**: Use React error boundaries for graceful degradation
- **Game Loop**: Continues running even if individual operations fail

#### **Benefits of This Approach**
- **No Game Crashes**: Errors are contained and handled gracefully
- **Easy Debugging**: Comprehensive error logging with full context
- **Maintainable Code**: Consistent error handling patterns across all functions
- **User Experience**: Game continues running smoothly even with errors
- **Development Speed**: Clear error messages help identify issues quickly

## 📊 Performance Metrics

The game includes built-in performance monitoring with real-time metrics:

- **Frame Rate**: Target 20 FPS for smooth gameplay with performance warnings below 1.5 FPS
- **Render Time**: Component render performance tracking with warnings above 500ms
- **Memory Usage**: Browser memory consumption monitoring with warnings above 100MB
- **Tick Duration**: Game loop execution time with warnings above 50ms
- **Performance Score**: Overall performance rating based on multiple metrics
- **Budget Monitoring**: Tracks performance against defined budgets for optimal gameplay

## 🤝 Contributing

## 🧪 Testing

The project includes a comprehensive testing infrastructure built with Jest and React Testing Library.

### Test Coverage

**Current Status**: ✅ **82 passing tests** covering core game functionality

#### **Test Categories**
- **Core Utilities**: String utilities, number formatting, validation functions
- **Error Handling**: Centralized error logging and handling systems
- **Resource Management**: Resource calculations, updates, and validation
- **Game Logic**: Core game calculations and state management

#### **Running Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=stringUtils
```

#### **Test Structure**
```
src/__tests__/
├── game/                    # Game logic tests
│   ├── resourceCalculations.test.ts
│   ├── resourceUpdates.test.ts
│   └── resourceValidation.test.ts
├── utils/                   # Utility function tests
│   ├── stringUtils.test.ts
│   ├── numberUtils.test.ts
│   ├── errorLogger.test.ts
│   └── validationUtils.test.ts
├── utils/                   # Test utilities (not run as tests)
│   ├── testHelpers.ts       # Game state creation helpers
│   ├── mockData.ts          # Mock game data
│   └── index.ts             # Test utility exports
└── setup.test.ts            # Basic setup verification
```

#### **Writing Tests**

The project provides comprehensive test utilities:

```typescript
import { 
  createTestGameState, 
  createGameStateWithResources,
  expectGameStateResources 
} from '@/__tests__/utils/testHelpers'

describe('My Game Feature', () => {
  it('should work correctly', () => {
    const state = createGameStateWithResources({ gold: 100 })
    const result = myGameFunction(state)
    
    expectGameStateResources(result, { gold: 150 })
  })
})
```

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

### Adding New Content
The game is designed to be easily extensible with a modular architecture:

#### Configuration Files
- **Actions**: Add new actions in the appropriate `src/lib/game/config/actions/` module
- **Loop Actions**: Add new loop actions in the appropriate `src/lib/game/config/loopActions/` module
- **Events**: Add new events in the appropriate `src/lib/game/config/events/` module
- **Achievements**: Add new achievements in the appropriate `src/lib/game/config/achievements/` module
- **Buildings**: Add new buildings in `src/lib/game/config/buildings.ts`
- **Technologies**: Add new technologies in `src/lib/game/config/technologies.ts`
- **Resources**: Add new resources in `src/lib/game/config/resources.ts`

#### Utility Functions
The comprehensive utility system provides specialized functions for each game system:

- **`utils/achievement/`**: Achievement checking, progress tracking, and notifications
- **`utils/actionChecker/`**: Action validation, status checking, and unlock conditions
- **`utils/actions/`**: Action processing, building actions, and game loop actions
- **`utils/calculations/`**: Mathematical calculations, costs, and multipliers
- **`utils/error/`**: Centralized error handling and logging
- **`utils/event/`**: Event triggering, choices, and state management
- **`utils/gameCalculations/`**: Game-specific calculations and memoization
- **`utils/gameState/`**: Game state management and initialization
- **`utils/loopActions/`**: Loop action management and processing
- **`utils/loopCalculations/`**: Loop action efficiency and progress calculations
- **`utils/migration/`**: Save file migration and validation
- **`utils/number/`**: Number formatting and mathematical operations
- **`utils/performance/`**: Performance monitoring and optimization
- **`utils/prestige/`**: Prestige calculations and operations
- **`utils/resource/`**: Resource management and processing
- **`utils/save/`**: Save system, import/export, and offline progress
- **`utils/string/`**: String encoding and parsing utilities
- **`utils/technology/`**: Technology research and validation
- **`utils/validation/`**: Cross-reference validation and input validation

#### Styling
- **Styles**: Add new SCSS files in `src/styles/` following the organized structure (see SCSS File Organization section)

All new content automatically integrates with the existing systems and UI components through the modular architecture.

### Code Review Process
- All changes require review
- Maintain code style consistency
- Ensure performance impact is minimal
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the excellent React framework
- **React Team**: For the powerful UI library
- **TypeScript Team**: For the type-safe development experience
- **Idle Game Community**: For inspiration and feedback

---

**Happy Kingdom Building!** 🏰👑

*Built with ❤️ using Next.js, React, and TypeScript*

