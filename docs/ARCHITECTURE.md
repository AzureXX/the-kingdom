# 🏗️ Architecture Overview

This document provides a comprehensive overview of the Medieval Kingdom game architecture.

## 🎯 Architecture Principles

### Design Philosophy
- **Modular Design**: Clear separation of concerns with specialized modules
- **Data-Driven**: Game content is fully configurable through data files
- **Performance-First**: Optimized for smooth gameplay and efficient resource usage
- **Type Safety**: Full TypeScript coverage for maintainable code
- **Testability**: Comprehensive testing infrastructure for reliability

### Core Principles
- **Separation of Concerns**: Each module has a single responsibility
- **Dependency Injection**: Loose coupling through provider pattern
- **Immutable State**: All state changes use structural sharing
- **Error Resilience**: Comprehensive error handling and recovery
- **Performance Monitoring**: Real-time performance tracking and optimization

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15.4.6**: React framework with App Router
- **React 19.1.0**: UI library with hooks and functional components
- **TypeScript 5**: Type-safe development with strict checking

### Styling & UI
- **SCSS**: Styling with CSS Modules for component isolation
- **CSS Grid**: Flexible layout system
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML

### Build & Development
- **Turbopack**: Fast development builds
- **ESLint**: Code quality and consistency
- **Jest**: Testing framework with React Testing Library
- **TypeScript Compiler**: Type checking and compilation

## 🏛️ System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                        │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router                                        │
│  ├── Layout Components                                     │
│  ├── Page Components                                       │
│  └── Scene Components                                      │
├─────────────────────────────────────────────────────────────┤
│  React Context Providers                                   │
│  ├── GameStateProvider                                     │
│  ├── GameActionsProvider                                   │
│  └── GameCalculationsProvider                              │
├─────────────────────────────────────────────────────────────┤
│  Game Logic Layer                                          │
│  ├── Hooks (useGameLoop, useGameActions, etc.)            │
│  ├── Utilities (calculations, validation, etc.)           │
│  └── Configuration (actions, buildings, events, etc.)     │
├─────────────────────────────────────────────────────────────┤
│  Data Layer                                                │
│  ├── LocalStorage (Save System)                           │
│  ├── Game State (Immutable)                               │
│  └── Performance Metrics                                  │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture
```
App Layout
├── Scene Navigation
├── Game Context Providers
│   ├── GameStateProvider
│   ├── GameActionsProvider
│   └── GameCalculationsProvider
└── Scene Components
    ├── ActionsScene
    ├── BuildingsScene
    ├── ResearchScene
    ├── PrestigeScene
    ├── AchievementScene
    └── PerformanceScene
```

## 🎮 Game Logic Architecture

### State Management
- **Centralized State**: Single source of truth through React Context
- **Immutable Updates**: All state changes create new objects
- **Structural Sharing**: Minimal object recreation for performance
- **Validation**: Comprehensive input validation and error handling

### Game Loop
- **20 FPS Target**: Smooth gameplay with performance monitoring
- **Frame Skipping**: Adaptive frame rate based on performance
- **Background Execution**: Continues running when tab is inactive
- **Pause Support**: Game can be paused and resumed

### Hook Architecture
```typescript
// Core game hooks
useGameLoop()        // Main game tick management
useGameActions()     // Player action handling
useGameCalculations() // Game state calculations
useSaveSystem()      // Save/load functionality
useGameTime()        // Time-based events
usePerformanceMonitor() // Performance tracking
useLoopActions()     // Automated actions
useAchievements()    // Achievement system
```

## 📁 Module Organization

### Configuration Modules
```
config/
├── actions/           # Action definitions by category
├── achievements/      # Achievement definitions by type
├── events/           # Event definitions by category
├── loopActions/      # Loop action definitions by category
├── buildings.ts      # Building definitions
├── technologies.ts   # Technology definitions
├── resources.ts      # Resource definitions
└── prestige.ts       # Prestige system configuration
```

### Utility Modules
```
utils/
├── actions/          # Action processing utilities
├── calculations/     # Mathematical calculations
├── gameState/        # State management utilities
├── performance/      # Performance monitoring
├── save/            # Save system utilities
├── validation/      # Input validation
├── error/           # Error handling
└── [specialized]/   # Domain-specific utilities
```

### Component Modules
```
components/
├── game/            # Game-specific UI components
├── scenes/          # Scene components
└── ui/              # Reusable UI components
```

## 🔄 Data Flow

### Game State Flow
```
User Action → Action Handler → State Update → UI Re-render
     ↓              ↓              ↓              ↓
  Button Click → useGameActions → GameState → Component Update
```

### Save System Flow
```
Game State → Serialization → LocalStorage → Deserialization → Game State
     ↓              ↓              ↓              ↓              ↓
  Current State → JSON String → Browser Storage → JSON Parse → Restored State
```

### Performance Monitoring Flow
```
Game Loop → Performance Metrics → Analysis → Optimization → Game Loop
     ↓              ↓              ↓              ↓              ↓
  Each Tick → Collect Data → Process Metrics → Apply Optimizations → Next Tick
```

## 🎯 Design Patterns

### Provider Pattern
- **GameStateProvider**: Central state management
- **GameActionsProvider**: Action handling and dispatch
- **GameCalculationsProvider**: Computed values and calculations

### Hook Pattern
- **Custom Hooks**: Encapsulate complex logic
- **Separation of Concerns**: Each hook has a specific purpose
- **Reusability**: Hooks can be used across components

### Configuration Pattern
- **Data-Driven**: Game content defined in configuration files
- **Modular**: Each content type in separate modules
- **Type-Safe**: Full TypeScript coverage for configurations

### Error Handling Pattern
```typescript
try {
  // Function logic
  return result;
} catch (error) {
  // Log error with context
  errorHandler('Operation failed', { error, context });
  // Return safe fallback
  return fallbackValue;
}
```

## ⚡ Performance Architecture

### Optimization Strategies
- **Memoization**: Cached expensive calculations
- **Debouncing**: Prevent excessive re-renders
- **Structural Sharing**: Minimal object recreation
- **Frame Rate Control**: Adaptive performance based on capabilities

### Performance Monitoring
- **Real-time Metrics**: Frame rate, memory usage, render time
- **Performance Budgets**: Defined limits for optimal gameplay
- **Anomaly Detection**: Automatic performance issue identification
- **Optimization Suggestions**: Automated recommendations

### Memory Management
- **Circular Buffers**: Efficient data collection
- **Garbage Collection**: Optimized object lifecycle
- **State Cleanup**: Proper resource disposal
- **Memory Monitoring**: Real-time memory usage tracking

## 🔒 Security Architecture

### Data Validation
- **Input Sanitization**: All user inputs validated
- **Type Checking**: Runtime type validation
- **Range Validation**: Bounds checking for all values
- **Cross-Reference Validation**: Consistency checks across systems

### Save System Security
- **Data Integrity**: Checksums and validation
- **Version Control**: Save file versioning
- **Migration Safety**: Safe upgrade paths
- **Error Recovery**: Graceful handling of corrupted saves

## 🧪 Testing Architecture

### Test Organization
```
__tests__/
├── game/            # Game logic tests
├── utils/           # Utility function tests
└── utils/           # Test utilities and helpers
```

### Testing Strategy
- **Unit Tests**: Individual function testing
- **Integration Tests**: System interaction testing
- **Component Tests**: React component testing
- **Performance Tests**: Performance regression testing

### Test Utilities
- **Mock Data**: Comprehensive test data sets
- **Helper Functions**: Reusable test utilities
- **State Creators**: Game state creation helpers
- **Assertion Helpers**: Custom assertion functions

## 📊 Monitoring & Analytics

### Performance Metrics
- **Frame Rate**: Target 20 FPS with warnings below 1.5 FPS
- **Render Time**: Component render performance tracking
- **Memory Usage**: Browser memory consumption monitoring
- **Tick Duration**: Game loop execution time

### Error Tracking
- **Error Logging**: Comprehensive error context
- **Error Categorization**: Classified error types
- **Recovery Strategies**: Automatic error recovery
- **User Impact**: Minimal disruption to gameplay

## 🔮 Future Architecture Considerations

### Scalability
- **Modular Growth**: Easy addition of new features
- **Performance Scaling**: Optimized for larger game states
- **Code Organization**: Maintainable as complexity grows

### Extensibility
- **Plugin Architecture**: Potential for mod support
- **API Design**: Clean interfaces for extensions
- **Configuration System**: Easy content addition
- **Hook System**: Reusable logic patterns

### Maintainability
- **Documentation**: Comprehensive code documentation
- **Type Safety**: Full TypeScript coverage
- **Testing**: Extensive test coverage
- **Code Standards**: Consistent coding practices

---

This architecture provides a solid foundation for the Medieval Kingdom game while maintaining flexibility for future enhancements and improvements.
