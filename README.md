# 🏰 Medieval Kingdom

An idle/clicker game built with Next.js, React, and TypeScript where you manage a medieval kingdom's economy through resource management, building construction, and prestige mechanics.

## 🎮 Game Overview

Medieval Kingdom is an incremental game where you start as a small settlement and work your way up to a prosperous kingdom through strategic resource management and infrastructure development.

### Core Gameplay Loop
1. **Click** to gain initial resources (Gold and Food)
2. **Build** infrastructure to generate resources automatically
3. **Manage** resource production and consumption
4. **Prestige** to gain permanent upgrades and restart stronger

## 🏗️ Game Systems

### Resources
The game features 5 main resources that form a complex medieval economy:

- **💰 Gold** - Basic currency for purchasing buildings
- **🪵 Wood** - Basic building material from forests
- **🪨 Stone** - Advanced building material from quarries
- **🌾 Food** - Produced by farms, consumed by castles
- **👑 Prestige** - Prestige currency for permanent upgrades

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
- **Automatic saving** every 1.2 seconds
- **Offline progress** (capped at 1 hour)
- **Keyboard shortcuts** (Space bar for clicking)
- **Number formatting** with K/M/B/T notation for large numbers

### Save System
- **Auto-save**: Automatic local storage saves
- **Export/Import**: Save files as text for backup/sharing
- **Hard Reset**: Complete game reset option
- **Version checking**: Prevents loading incompatible saves

### User Interface
- **Responsive design** with CSS Grid layout
- **Dark theme** with blue/purple gradient aesthetics
- **Modal dialogs** for prestige and help
- **Real-time resource display** with per-second rates
- **Visual feedback** for affordable/unaffordable purchases

## 🛠️ Technical Architecture

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5
- **Styling**: SCSS with CSS Modules
- **State Management**: React hooks with custom game logic
- **Build Tool**: Turbopack for development

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main game page
├── lib/game/              # Game logic
│   ├── config.ts          # Game configuration
│   ├── logic.ts           # Core game functions
│   ├── types.ts           # TypeScript definitions
│   └── useGame.ts         # React hook for game state
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

#### Game Logic (`logic.ts`)
- Pure functions for game calculations
- Resource management and building purchases
- Prestige calculations and upgrades
- Save/load system with base64 encoding

#### Game Hook (`useGame.ts`)
- React hook managing game state
- Real-time game loop with requestAnimationFrame
- Event handlers for user interactions
- Auto-save scheduling and offline progress

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
3. Add icon to SVG sprite in `page.tsx`
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

## 📊 Game Balance

The game is designed with exponential scaling and diminishing returns:
- Building costs increase exponentially (1.15x - 1.25x per purchase)
- Prestige upgrades have exponential cost curves
- Resource production creates complex interdependencies
- Prestige formula encourages strategic timing

## 🔧 Performance Features

- **Efficient rendering** with React optimization
- **Throttled saves** to prevent excessive localStorage writes
- **Capped offline progress** to prevent exploitation
- **Optimized game loop** with configurable tick rate
- **Memory-efficient** state management

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

## 📄 License

This project is private and proprietary.
