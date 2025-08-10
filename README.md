# 🏰 Medieval Kingdom

An idle/clicker game built with Next.js, React, and TypeScript where you manage a medieval kingdom's economy through resource management, building construction, and prestige mechanics.

## 🎮 Game Overview

Medieval Kingdom is an incremental game where you start as a small settlement and work your way up to a prosperous kingdom through strategic resource management and infrastructure development.

### Core Gameplay Loop
1. **Click** to gain initial resources (Gold and Food)
2. **Build** infrastructure to generate resources automatically
3. **Manage** resource production and consumption
4. **Handle** random events that affect your kingdom
5. **Prestige** to gain permanent upgrades and restart stronger

## 🏗️ Game Systems

### Resources
The game features 5 main resources that form a complex medieval economy:

- **💰 Gold** - Basic currency for purchasing buildings
- **🪵 Wood** - Basic building material from forests
- **🪨 Stone** - Advanced building material from quarries
- **🌾 Food** - Produced by farms, consumed by castles
- **👑 Prestige** - Prestige currency for permanent upgrades

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

### Buildings
Five types of buildings create a production chain:

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

### Prestige System
When progress slows, you can "Ascend to Greater Kingdom" (prestige) to:
- Reset all resources and buildings
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
- **Automatic saving** every 30 seconds
- **Offline progress** (capped at 1 hour)
- **Keyboard shortcuts** (Space bar for clicking)
- **Number formatting** with K/M/B/T notation for large numbers
- **Random events** every 1-3 minutes with player choices affecting resources

### Save System
- **Auto-save**: Automatic local storage saves
- **Export/Import**: Save files as text for backup/sharing
- **Hard Reset**: Complete game reset option
- **Version checking**: Prevents loading incompatible saves

### User Interface
- **Responsive design** with CSS Grid layout
- **Dark theme** with blue/purple gradient aesthetics
- **Modal dialogs** for prestige, help, and events
- **Real-time resource display** with per-second rates
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
│   │   └── UpgradeList.tsx
│   └── ui/               # Generic UI components
│       ├── Modal.tsx
│       ├── EventModal.tsx
│       ├── EventNotification.tsx
│       ├── SvgSprites.tsx
│       └── ErrorBoundary.tsx
├── lib/game/              # Game logic
│   ├── config.ts          # Game configuration
│   ├── constants.ts       # Game constants and magic numbers
│   ├── logic.ts           # Core game functions
│   ├── types.ts           # TypeScript definitions
│   ├── utils.ts           # Utility functions
│   └── GameContext.tsx    # React Context for global state
└── styles/                # Styling
    ├── globals.scss       # Global styles
    └── page.module.scss   # Component styles
```

### Key Components

#### Game Configuration (`config.ts`)
- Centralized game balance and mechanics
- Resource definitions with icons and properties
- Building definitions with costs, production, and consumption
- Prestige upgrade definitions with effects and scaling

#### Game Constants (`constants.ts`)
- Centralized magic numbers and configuration values
- Icon mappings for resources, buildings, and upgrades
- Save system configuration
- Performance tuning constants

#### Game Logic (`logic.ts`)
- Pure functions for game calculations
- Resource management and building purchases
- Prestige calculations and upgrades
- Event system with choice handling and resource validation
- Save/load system with base64 encoding

#### Game Context (`GameContext.tsx`)
- React Context provider managing global game state
- Real-time game loop with requestAnimationFrame
- Event handlers for user interactions
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
The game is highly configurable through the `CONFIG` object in `src/lib/game/config.ts`. You can easily:
- Add new resources with custom icons
- Create new buildings with different production chains
- Design new prestige upgrades with custom effects
- Adjust game balance and scaling

## 🎨 Customization

### Adding New Resources
1. Add resource key to `ResourceKey` type
2. Define resource in `CONFIG.resources`
3. Add icon to SVG sprite in `SvgSprites.tsx`
4. Update `GameState` type if needed

### Adding New Buildings
1. Add building key to `BuildingKey` type
2. Define building in `CONFIG.buildings`
3. Add icon to SVG sprite
4. Update `GameState` type

### Adding New Upgrades
1. Add upgrade key to `PrestigeUpgradeKey` type
2. Define upgrade in `CONFIG.prestige.upgrades`
3. Implement effect function
4. Add icon to SVG sprite

### Adding New Events
1. Add event key to `EventKey` type
2. Define event in `CONFIG.events` with choices, intervals, and weights
3. Add icon to SVG sprite
4. Implement choice logic in `makeEventChoice` function if needed

## 📊 Game Balance

The game is designed with exponential scaling and diminishing returns:
- Building costs increase exponentially (1.15x - 1.25x per purchase)
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
- Additional content (resources, buildings, upgrades)

## 🔄 Recent Updates

The codebase has been recently updated with new features and improvements:

### New Event System
- **Random Events**: 8 different event types with weighted random selection
- **Choice-Based Gameplay**: Multiple choices per event affecting resources
- **Resource Validation**: Choices disabled when insufficient resources
- **Event Notifications**: Visual indicators when events are available
- **Auto-Resolution**: Events auto-resolve after 30 seconds if not handled
- **Default Choices**: Each event has a predefined default choice that triggers automatically

### Code Organization
- **Component Extraction**: Large monolithic components split into smaller, focused components
- **Separation of Concerns**: UI logic separated from game logic
- **Reusable Components**: Modal, EventModal, EventNotification, ResourceDisplay, BuildingList, UpgradeList, and ErrorBoundary components
- **Constants Centralization**: Magic numbers moved to dedicated constants file

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
- **Modular Architecture**: Clear separation between game logic and UI
- **Reusable Components**: Components can be easily reused and tested
- **Configuration**: Centralized game configuration for easy balancing
- **Documentation**: Improved code documentation and structure

## 📄 License

This project is private and proprietary.
