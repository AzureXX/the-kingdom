# 🔧 Technical Implementation Guide

This document provides detailed information about the technical architecture and implementation of Medieval Kingdom.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.4.6 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: SCSS with CSS Modules
- **Build Tool**: Turbopack (development)

## 🔧 Comprehensive Utility Architecture

The game features a sophisticated utility system organized into specialized modules, each handling specific aspects of game functionality:

### **Core Utility Categories**

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

## 🎮 Game Loop Architecture

The game uses a sophisticated hook-based architecture with the following key components:

### Core Hooks
- **useGameLoop**: Manages the main game tick (20 FPS) with pause support
- **useGameActions**: Handles player interactions and action execution
- **useGameCalculations**: Computes game state and costs
- **useSaveSystem**: Manages save/load functionality with 30-second intervals
- **useGameTime**: Tracks time-based events and research progress
- **usePerformanceMonitor**: Monitors game performance with real-time metrics
- **useLoopActions**: Manages automated loop action execution

### State Management
- **GameContext**: Central React context for game state
- **Immutable Updates**: All state changes use structural sharing
- **Validation**: Comprehensive input validation and error handling
- **Performance**: Optimized re-renders with React.memo and useMemo

## 💾 Save System

- **Automatic Saves**: Every 30 seconds to localStorage
- **Manual Saves**: Export/Import functionality with `.txt` and `.save` file support
- **Offline Progress**: Capped at 1 hour of offline time for balanced progression
- **Version Control**: Save versioning for compatibility across updates
- **File Management**: Automatic filename generation (`medieval-kingdom.save.txt`)

## ⚡ Performance Optimizations

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

## 📊 Performance Metrics

The game includes built-in performance monitoring with real-time metrics:

- **Frame Rate**: Target 20 FPS for smooth gameplay with performance warnings below 1.5 FPS
- **Render Time**: Component render performance tracking with warnings above 500ms
- **Memory Usage**: Browser memory consumption monitoring with warnings above 100MB
- **Tick Duration**: Game loop execution time with warnings above 50ms
- **Performance Score**: Overall performance rating based on multiple metrics
- **Budget Monitoring**: Tracks performance against defined budgets for optimal gameplay
