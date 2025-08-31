# 🏰 Medieval Kingdom - Idle/Clicker Game

A sophisticated browser-based idle/clicker game built with Next.js, React, and TypeScript. Players build and manage a medieval kingdom through resource management, building construction, technology research, and prestige mechanics.

## 🎮 Game Overview

**Medieval Kingdom** is an incremental game where players start with basic resources and gradually expand their kingdom through strategic decision-making. The game features:

- **Resource Management**: Gold, Wood, Stone, Food, Prestige, and Research Points
- **Action System**: 12 configurable actions with unlock conditions and progression
- **Building System**: 8 unique buildings with different production capabilities
- **Technology Tree**: 6 technologies that unlock advanced buildings and upgrades
- **Prestige System**: Reset mechanics with permanent upgrades
- **Event System**: Random events that provide choices and consequences
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
├── components/             # React components
│   ├── game/              # Game-specific UI components
│   └── ui/                # Reusable UI components
├── lib/game/              # Core game logic
│   ├── config/            # Game configuration
│   ├── constants/         # Game constants
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── styles/                # SCSS stylesheets
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
- **Visual Feedback**: Emoji icons and hover tooltips for clear understanding

### 3. Building System
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

### 4. Technology System
6 technologies that unlock advanced buildings and provide strategic depth:

| Technology | Cost | Research Time | Unlocks | Prerequisites |
|------------|------|---------------|---------|---------------|
| Writing | 50 Gold, 20 Wood | 30s | Library | None |
| Mathematics | 100 Gold, 30 Wood, 20 Stone | 60s | University | Writing |
| Engineering | 150 Gold, 50 Wood, 40 Stone | 90s | - | Writing, Mathematics |
| Chemistry | 200 Gold, 60 Wood, 50 Stone, 20 Food | 120s | Laboratory | Mathematics, Engineering |
| Physics | 300 Gold, 80 Wood, 70 Stone, 30 Food | 180s | - | Mathematics, Chemistry |
| Biology | 400 Gold, 100 Wood, 90 Stone, 50 Food | 240s | - | Chemistry, Physics |

### 5. Prestige System
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

### 6. Event System
Random events occur every 1-3 minutes, providing players with choices that affect resources:

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

### Game Loop Architecture
The game uses a sophisticated hook-based architecture with the following key components:

#### Core Hooks
- **useGameLoop**: Manages the main game tick (20 FPS)
- **useGameActions**: Handles player interactions and action execution
- **useGameCalculations**: Computes game state and costs
- **useSaveSystem**: Manages save/load functionality
- **useGameTime**: Tracks time-based events
- **usePerformanceMonitor**: Monitors game performance

#### State Management
- **GameContext**: Central React context for game state
- **Immutable Updates**: All state changes use structural sharing
- **Validation**: Comprehensive input validation and error handling
- **Performance**: Optimized re-renders with React.memo and useMemo

### Save System
- **Automatic Saves**: Every 30 seconds
- **Manual Saves**: Export/Import functionality
- **Offline Progress**: Capped at 1 hour of offline time
- **Version Control**: Save versioning for compatibility

### Performance Optimizations
- **Debounced Updates**: Prevents excessive re-renders
- **Memoized Calculations**: Cached expensive computations
- **Structural Sharing**: Minimal object recreation
- **Frame Rate Control**: 20 FPS game loop for smooth gameplay

## 🎨 UI/UX Design

### Visual Design
- **Theme**: Dark medieval aesthetic with blue/purple gradients
- **Icons**: SVG icons (using `ic-*` format) when available, with emoji icons as alternatives, providing intuitive visual feedback
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects

### Responsive Layout
- **Grid System**: CSS Grid for flexible layouts
- **Mobile-Friendly**: Responsive design for various screen sizes
- **Accessibility**: Proper contrast ratios and keyboard navigation

### User Interface Components
- **Resource Display**: Real-time resource counters with per-second rates
- **Action System**: Interactive action buttons with unlock conditions and tooltips
- **Building List**: Interactive building purchase interface
- **Technology Tree**: Visual technology research system
- **Prestige Modal**: Prestige calculation and upgrade interface
- **Event System**: Modal-based event choices with consequences

## 🔍 Configuration System

The game is fully data-driven through configuration files:

### Adding New Actions
```typescript
// src/lib/game/config/actions.ts
export const ACTIONS: Record<ActionKey, ActionDef> = {
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
    icon: '🔬',
    desc: 'Description of the technology.',
    baseCost: { gold: 200, researchPoints: 50 },
    costScale: 1.0,
    researchTime: 120,
    requiresTech: ['prerequisite'],
  },
};
```

## 🧪 Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with Next.js rules
- **SCSS**: Modular styling with CSS Modules
- **React**: Functional components with hooks

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

The game includes built-in performance monitoring:

- **Frame Rate**: Target 20 FPS ideal for both performance for smooth gameplay,
- **Render Time**: Component render performance tracking
- **Memory Usage**: Browser memory consumption monitoring
- **Tick Duration**: Game loop execution time
- **Action System**: Optimized action validation and execution

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Adding New Content
The game is designed to be easily extensible:
- **Actions**: Add new actions in `src/lib/game/config/actions.ts`
- **Events**: Add new events in `src/lib/game/config/events.ts`
- **Buildings**: Add new buildings in `src/lib/game/config/buildings.ts`
- **Technologies**: Add new technologies in `src/lib/game/config/technologies.ts`

All new content automatically integrates with the existing systems and UI components.

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

## 🆕 Recent Updates

### Action System (v5.0)
- **12 Configurable Actions**: From basic resource gathering to advanced technology-dependent actions
- **Progressive Unlocking**: Actions unlock through building construction, technology research, and resource accumulation
- **Emoji Icons**: Intuitive visual representation for all actions and events
- **One-time Unlocks**: Trading actions become permanently available after first unlock
- **Strategic Gameplay**: Balance resource costs and gains for optimal progression

### Enhanced User Experience
- **Visual Feedback**: Hover tooltips with detailed action information
- **Action Grouping**: Actions organized by category (Basic, Trading, Building, Technology)
- **Responsive Design**: Action buttons adapt to different screen sizes
- **Performance Optimized**: Efficient action validation and execution
