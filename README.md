# 🏰 Medieval Kingdom

An idle/clicker game built with Next.js, React, and TypeScript where you manage a medieval kingdom's economy through resource management, building construction, technology research, and prestige mechanics.

## 🎮 Game Overview

Medieval Kingdom is an incremental game where you start as a small settlement and work your way up to a prosperous kingdom through strategic resource management, infrastructure development, and technological advancement.

### Core Gameplay Loop
1. **Click** to gain initial resources (Gold and Food)
2. **Research** technologies to unlock new buildings and capabilities
3. **Build** infrastructure to generate resources automatically
4. **Manage** resource production and consumption
5. **Handle** random events that affect your kingdom
6. **Prestige** to gain permanent upgrades and restart stronger

## 🏗️ Game Systems

### Resources
The game features 5 main resources that form a complex medieval economy:

- **💰 Gold** - Basic currency for purchasing buildings and researching technologies
- **🪵 Wood** - Basic building material from forests
- **🪨 Stone** - Advanced building material from quarries
- **🌾 Food** - Produced by farms, consumed by castles
- **👑 Prestige** - Prestige currency for permanent upgrades

### Technology System
Research technologies to unlock new buildings and advance your kingdom:

- **📝 Writing** (Cost: 50 Gold, 20 Wood, 30s) - Foundation of knowledge
- **🔢 Mathematics** (Cost: 100 Gold, 30 Wood, 20 Stone, 60s) - Requires Writing
- **⚙️ Engineering** (Cost: 150 Gold, 50 Wood, 40 Stone, 90s) - Requires Writing + Mathematics
- **🧪 Chemistry** (Cost: 200 Gold, 60 Wood, 50 Stone, 20 Food, 120s) - Requires Mathematics + Engineering
- **⚛️ Physics** (Cost: 300 Gold, 80 Wood, 70 Stone, 30 Food, 180s) - Requires Mathematics + Chemistry
- **🧬 Biology** (Cost: 400 Gold, 100 Wood, 90 Stone, 50 Food, 240s) - Requires Chemistry + Physics

Technologies can have multiple prerequisites and unlock multiple buildings. Research takes time and can only be done one at a time.

### Buildings
Eight types of buildings create a production chain, with advanced buildings requiring multiple technologies:

1. **🪵 Woodcutter's Hut** (Cost: 15 Gold)
   - Produces: 1.2 Wood/second
   - Base cost scaling: 1.15x

2. **🪨 Quarry** (Cost: 30 Gold + 5 Wood)
   - Produces: 0.8 Stone/second
   - Base cost scaling: 1.18x

3. **🌾 Farm** (Cost: 25 Gold + 8 Wood)
   - Produces: 1.5 Food/second
   - Base cost scaling: 1.16x

4. **⚒️ Blacksmith** (Cost: 50 Gold + 15 Wood + 10 Stone)
   - Produces: 2.5 Gold/second
   - Consumes: 0.3 Wood/second + 0.2 Stone/second
   - Base cost scaling: 1.20x

5. **🏰 Castle** (Cost: 200 Gold + 50 Wood + 100 Stone + 20 Food)
   - Produces: 0.1 Prestige/second
   - Consumes: 0.5 Food/second
   - Base cost scaling: 1.25x

6. **📚 Library** (Cost: 100 Gold + 30 Wood + 20 Stone)
   - Produces: 1.0 Gold/second
   - Base cost scaling: 1.22x
   - Requires: Writing

7. **🎓 University** (Cost: 300 Gold + 80 Wood + 60 Stone + 30 Food)
   - Produces: 3.0 Gold/second + 0.05 Prestige/second
   - Consumes: 1.0 Food/second
   - Base cost scaling: 1.28x
   - Requires: Writing + Mathematics

8. **🔬 Laboratory** (Cost: 500 Gold + 100 Wood + 150 Stone + 50 Food)
   - Produces: 5.0 Gold/second + 0.1 Prestige/second
   - Consumes: 2.0 Food/second
   - Base cost scaling: 1.30x
   - Requires: Chemistry + Engineering

### Events
Random events occur every 1-3 minutes, presenting players with choices that affect their resources:

- **🛒 Merchant Visit** - Trade opportunities for resources
- **⚔️ Bandit Raid** - Defend your village or pay tribute
- **🌾 Bountiful Harvest** - Rare windfall of multiple resources
- **☀️ Drought** - Environmental challenges affecting production
- **👑 Royal Tax** - Government demands affecting your wealth
- **👤 Mysterious Stranger** - Mysterious offers with prestige rewards
- **🦠 Plague** - Deadly outbreaks requiring treatment
- **🎉 Festival** - Celebratory events boosting morale

Each event offers multiple choices with different resource costs and rewards. Choices may be disabled if you lack required resources, and some events can reduce resources to zero if chosen without sufficient reserves. If a player doesn't make a choice within 30 seconds or before the next event time, the event automatically resolves using a predefined default choice for each event type.

### Prestige System
When progress slows, you can "Ascend to Greater Kingdom" (prestige) to:
- Reset all resources, buildings, and technologies
- Gain **Prestige** based on total Food generated
- Keep Prestige and permanent upgrades
- Formula: `floor(√(lifetimeFood / 1,000))`

### Permanent Upgrades
Spend Prestige on upgrades that persist across prestiges:

1. **📜 Royal Decrees** (Cost: 5 Prestige, scales 1.6x)
   - Effect: +25% click gains per level
   - Max level: 20

2. **⚒️ Master Craftsmen** (Cost: 8 Prestige, scales 1.7x)
   - Effect: -3% building costs per level
   - Max level: 25

3. **🌱 Fertile Lands** (Cost: 6 Prestige, scales 1.65x)
   - Effect: +20% Food production per level
   - Max level: 25

4. **⚔️ Military Might** (Cost: 10 Prestige, scales 1.7x)
   - Effect: +20% Prestige production per level
   - Max level: 20

## 🎯 Game Features

### Core Mechanics
- **Real-time resource generation** with 10 FPS tick rate
- **Technology research system** with multiple prerequisites and time-based research
- **Building unlocking** through technology advancement
- **Automatic saving** every 30 seconds
- **Offline progress** (capped at 1 hour)
- **Keyboard shortcuts** (Space bar for clicking)
- **Number formatting** with K/M/B/T notation for large numbers
- **Random events** every 1-3 minutes with player choices affecting resources

### Technology Research
- **Research Queue**: Only one technology can be researched at a time
- **Prerequisites**: Technologies can require multiple other technologies
- **Building Unlocks**: Advanced buildings require multiple technologies
- **Research Time**: Each technology takes a specific amount of time to research
- **Progress Tracking**: Visual progress bar shows research completion

### Save System
- **Auto-save**: Automatic local storage saves every 30 seconds
- **Export/Import**: Save files as text for backup/sharing
- **Hard Reset**: Complete game reset option
- **Version checking**: Prevents loading incompatible saves

### User Interface
- **Responsive design** with CSS Grid layout
- **Dark theme** with blue/purple gradient aesthetics
- **Modal dialogs** for prestige, help, and events
- **Real-time resource display** with per-second rates
- **Technology research progress** with visual indicators
- **Building requirement display** showing technology prerequisites
- **Visual feedback** for affordable/unaffordable purchases
- **Event notifications** with animated indicators

## 🛠️ Technical Architecture

### State Management Architecture

The game uses React Context for centralized state management:

- **GameProvider**: Wraps the entire app and provides global game state
- **useGameContext**: Hook to access game state and actions from any component

This architecture provides several benefits:
- **Global State Access**: Any component can access game state without prop drilling
- **Centralized Logic**: All game logic is contained in the context provider
- **Performance**: Optimized re-renders with React's context optimization
- **Maintainability**: Clear separation of concerns between state and UI

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5
- **Styling**: SCSS with CSS Modules
- **State Management**: React Context with centralized game state
- **Build Tool**: Turbopack for development
- **Event System**: Weighted random events with choice-based outcomes

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with GameProvider and ErrorBoundary
│   └── page.tsx           # Main game page
├── components/            # Reusable UI components
│   ├── game/             # Game-specific components
│   │   ├── ResourceDisplay.tsx
│   │   ├── BuildingList.tsx
│   │   ├── TechnologyList.tsx
│   │   └── UpgradeList.tsx
│   └── ui/               # Generic UI components
│       ├── Modal.tsx
│       ├── EventModal.tsx
│       ├── EventNotification.tsx
│       ├── SvgSprites.tsx
│       └── ErrorBoundary.tsx
├── lib/game/              # Game logic (modular architecture)
│   ├── gameState.ts       # State initialization and management
│   ├── calculations.ts    # Resource calculations and costs
│   ├── saveSystem.ts      # Save/load functionality
│   ├── eventSystem.ts     # Event handling logic
│   ├── prestigeSystem.ts  # Prestige calculations
│   ├── technologySystem.ts # Technology research logic
│   ├── actions.ts         # Game actions (buying, clicking, ticking)
│   ├── config/            # Modular configuration system
│   │   ├── index.ts       # Main config aggregator
│   │   ├── resources.ts   # Resource definitions
│   │   ├── buildings.ts   # Building definitions
│   │   ├── technologies.ts # Technology definitions
│   │   ├── prestige.ts    # Prestige upgrade definitions
│   │   └── events.ts      # Event definitions
│   ├── config.ts          # Legacy config re-exports
│   ├── constants.ts       # Game constants and configuration
│   ├── types.ts           # TypeScript definitions
│   ├── utils.ts           # Utility functions
│   └── GameContext.tsx    # React Context for global state
└── styles/                # Styling
    ├── globals.scss       # Global styles
    └── page.module.scss   # Component styles
```

### Key Components

#### Modular Configuration System (`config/`)
The game configuration has been split into focused modules for better organization:

- **`config/index.ts`** - Main aggregator that combines all config modules
- **`config/resources.ts`** - Resource definitions with icons and properties
- **`config/buildings.ts`** - Building definitions with costs, production, consumption, and technology requirements
- **`config/technologies.ts`** - Technology definitions with costs, research time, prerequisites, and building unlocks
- **`config/prestige.ts`** - Prestige upgrade definitions with effects and scaling
- **`config/events.ts`** - Event definitions with choices, intervals, and weights

This modular structure provides:
- **Better Organization**: Each game system has its own configuration file
- **Easier Maintenance**: Changes to specific systems are isolated
- **Improved Readability**: Smaller, focused files are easier to understand
- **Better Collaboration**: Multiple developers can work on different config files
- **Type Safety**: Each module exports its own types and configurations

#### Game Constants (`constants.ts`)
- Centralized magic numbers and configuration values
- Icon mappings for resources, buildings, technologies, and upgrades
- Save system configuration
- Performance tuning constants

#### Game Logic (Modular Architecture)
The game logic has been refactored into focused modules for better maintainability:

- **`gameState.ts`** - State initialization and safe access functions
- **`calculations.ts`** - Resource calculations, costs, and multipliers
- **`saveSystem.ts`** - Save/load functionality with error handling
- **`eventSystem.ts`** - Event handling logic and choice processing
- **`prestigeSystem.ts`** - Prestige calculations and operations
- **`technologySystem.ts`** - Technology research logic and validation
- **`actions.ts`** - Game actions like buying buildings, upgrades, and ticking

This modular structure provides:
- **Single Responsibility**: Each file has a clear, focused purpose
- **Better Testing**: Individual modules can be tested in isolation
- **Easier Maintenance**: Changes are isolated to specific modules
- **Improved Readability**: Smaller, focused files are easier to understand
- **Direct Imports**: No unnecessary abstraction layers

#### Game Context (`GameContext.tsx`)
- React Context provider managing global game state
- **Optimized game loop** with fixed timestep and proper state management
- Event handlers for user interactions
- Technology research management
- Auto-save scheduling with setInterval (every 30 seconds)
- Offline progress calculation and application
- Provides centralized state management for the entire app

#### Error Boundary (`ErrorBoundary.tsx`)
- React class component for error handling
- Graceful error recovery with user-friendly messages
- Automatic error logging for debugging
- Refresh functionality for error recovery

#### Utility Functions (`utils.ts`)
- Number formatting with K/M/B/T notation
- Safe JSON parsing with error handling
- Base64 encoding/decoding utilities
- Debounce function for performance optimization
- Time formatting utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

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

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Development
The game is highly configurable through the modular configuration system in `src/lib/game/config/`. You can easily:
- Add new resources with custom icons in `config/resources.ts`
- Create new buildings with different production chains and technology requirements in `config/buildings.ts`
- Design new technologies with multiple prerequisites in `config/technologies.ts`
- Create new prestige upgrades with custom effects in `config/prestige.ts`
- Add new events with choices and effects in `config/events.ts`
- Adjust game balance and scaling across all modules

## 🎨 Customization

### Adding New Resources
1. Add resource key to `ResourceKey` type in `config/resources.ts`
2. Define resource in `RESOURCES` object in `config/resources.ts`
3. Add icon to SVG sprite in `SvgSprites.tsx`
4. Update `GameState` type if needed

### Adding New Buildings
1. Add building key to `BuildingKey` type in `config/buildings.ts`
2. Define building in `BUILDINGS` object in `config/buildings.ts`
3. Add technology requirements (single or multiple)
4. Add icon to SVG sprite
5. Update `GameState` type

### Adding New Technologies
1. Add technology key to `TechnologyKey` type in `config/technologies.ts`
2. Define technology in `TECHNOLOGIES` object in `config/technologies.ts`
3. Set prerequisites (single or multiple technologies)
4. Define buildings to unlock
5. Add icon to SVG sprite
6. Update `GameState` type

### Adding New Upgrades
1. Add upgrade key to `PrestigeUpgradeKey` type in `config/prestige.ts`
2. Define upgrade in `PRESTIGE_CONFIG.upgrades` object in `config/prestige.ts`
3. Implement effect function
4. Add icon to SVG sprite

### Adding New Events
1. Add event key to `EventKey` type in `config/events.ts`
2. Define event in `EVENTS` object in `config/events.ts` with choices, intervals, and weights
3. Add icon to SVG sprite
4. Implement choice logic in `makeEventChoice` function if needed

## 📊 Game Balance

The game is designed with exponential scaling and diminishing returns:
- Building costs increase exponentially (1.15x - 1.30x per purchase)
- Technology research creates progression gates
- Multiple technology requirements create strategic depth
- Prestige upgrades have exponential cost curves
- Resource production creates complex interdependencies
- Prestige formula encourages strategic timing

## 🔧 Performance Features

- **Efficient rendering** with React optimization
- **Interval-based saves** every 30 seconds to prevent excessive localStorage writes
- **Capped offline progress** to prevent exploitation
- **Optimized game loop** with configurable tick rate
- **Memory-efficient** state management
- **Component memoization** for expensive operations

## 📱 Browser Compatibility

- Modern browsers with ES2020+ support
- LocalStorage for save functionality
- CSS Grid and Flexbox for layout
- SVG icons for crisp scaling

## 🤝 Contributing

The game is designed to be easily extensible. Key areas for contribution:
- New game mechanics and systems
- UI/UX improvements
- Balance adjustments
- Performance optimizations
- Additional content (resources, buildings, technologies, upgrades)

## 🔄 Recent Updates

The codebase has been recently updated with new features and improvements:

### Configuration Refactoring
- **Modular Configuration**: Monolithic `config.ts` (384 lines) split into 6 focused configuration modules
- **Separated Concerns**: Resources, buildings, technologies, prestige upgrades, and events each have their own files
- **Better Organization**: Each game system has its own configuration file for easier maintenance
- **Improved Collaboration**: Multiple developers can work on different config files without conflicts
- **Type Safety**: Each module exports its own types and configurations
- **Legacy Support**: Original `config.ts` re-exports everything for backward compatibility

### New Technology System
- **Technology Research**: 6 different technologies with research time and costs
- **Multiple Prerequisites**: Technologies can require multiple other technologies
- **Building Unlocks**: Advanced buildings require multiple technologies
- **Research Progress**: Visual progress tracking with time remaining
- **Technology Tree**: Strategic progression through technology advancement
- **Research Queue**: Only one technology can be researched at a time

### New Buildings
- **Library**: Basic knowledge building requiring Writing
- **University**: Advanced education requiring Writing + Mathematics
- **Laboratory**: Research facility requiring Chemistry + Engineering

### Code Organization & Architecture
- **Modular Game Logic**: Monolithic `logic.ts` (307 lines) split into 7 focused modules with direct imports
- **Component Extraction**: Large monolithic components split into smaller, focused components
- **Separation of Concerns**: UI logic separated from game logic
- **Reusable Components**: Modal, EventModal, EventNotification, ResourceDisplay, BuildingList, TechnologyList, UpgradeList, and ErrorBoundary components
- **Constants Centralization**: Magic numbers moved to dedicated constants file
- **Clean Architecture**: Direct imports from source modules without unnecessary abstraction layers

### Performance Improvements
- **Optimized Save System**: Simple setInterval-based saves every 30 seconds
- **Removed Debug Code**: Eliminated console.log statements
- **Optimized Re-renders**: Better component structure for React optimization
- **Utility Functions**: Extracted common operations for better performance

### Code Quality
- **Type Safety**: Improved TypeScript usage with React.JSX.Element types
- **Error Handling**: Added ErrorBoundary component and better error recovery
- **Utility Functions**: Centralized common operations like number formatting
- **Constants**: Eliminated magic numbers throughout the codebase

### Maintainability
- **Modular Architecture**: Clear separation between game logic and UI with focused modules
- **Single Responsibility**: Each module has a clear, focused purpose
- **Reusable Components**: Components can be easily reused and tested
- **Configuration**: Modular game configuration for easy balancing and maintenance
- **Documentation**: Improved code documentation and structure
- **Type Safety**: Enhanced TypeScript usage with proper generic types

## 📄 License

This project is private and proprietary.
