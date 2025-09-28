# 🧪 Development Guidelines

This document provides comprehensive guidelines for developing and maintaining the Medieval Kingdom codebase.

## 📝 Code Style

### TypeScript
- **Strict type checking enabled**
- Use explicit types for all function parameters and return values
- Prefer interfaces over types for object shapes
- Use proper generic constraints where applicable

### ESLint
- **Configured with Next.js rules**
- Follow the established linting rules
- Fix all linting errors before committing

### SCSS
- **Modular styling with CSS Modules**
- Use semantic class names
- Follow BEM methodology where appropriate
- Keep styles scoped to components

### React
- **Functional components with hooks**
- Use React.memo for performance optimization
- Prefer useCallback and useMemo for expensive operations
- Follow React best practices for state management

## 📦 Import Guidelines

### Use `@/` alias
- **Always use the `@/` alias** for imports instead of relative paths
- **No relative paths**: Avoid `./` and `../` in import statements
- **No example comments**: Do not include example statements in documentation comments

**Good:**
```typescript
import { GameState } from '@/lib/game/types';
import { calculateCosts } from '@/lib/game/utils/calculations';
```

**Bad:**
```typescript
import { GameState } from '../../../lib/game/types';
import { calculateCosts } from './calculations';
```

## 🎨 SCSS File Organization

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

## 🚨 Error Handling

The game uses a sophisticated, consistent error handling system that ensures stability and provides comprehensive debugging information:

### **Error Handling Pattern (Consistent Across All Functions)**
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

### **Key Principles**
- **Input Validation**: All functions validate inputs before processing
- **Descriptive Errors**: Clear error messages with context for debugging
- **Error Catching**: All thrown errors are caught and handled gracefully
- **Safe Fallbacks**: Functions always return valid state, never crash
- **Comprehensive Logging**: All errors are logged with full context and stack traces
- **Game Stability**: Errors don't interrupt gameplay or cause crashes

### **Error Handler Types**
- **`validationHandler`**: For input validation errors
- **`calculationHandler`**: For mathematical operation errors  
- **`stateErrorHandler`**: For state management errors
- **`handleGameError`**: Central error handling with categorization

### **Error Recovery Strategy**
- **State Functions**: Return original state on error (preserves game state)
- **Calculation Functions**: Return safe default values (e.g., default multipliers)
- **UI Components**: Use React error boundaries for graceful degradation
- **Game Loop**: Continues running even if individual operations fail

### **Benefits of This Approach**
- **No Game Crashes**: Errors are contained and handled gracefully
- **Easy Debugging**: Comprehensive error logging with full context
- **Maintainable Code**: Consistent error handling patterns across all functions
- **User Experience**: Game continues running smoothly even with errors
- **Development Speed**: Clear error messages help identify issues quickly

## 🧪 Testing Strategy

### Component Testing
- **React components with proper props**
- Test component rendering and user interactions
- Mock external dependencies appropriately
- Use React Testing Library best practices

### Game Logic Testing
- **Pure functions for game calculations**
- Test all calculation functions with various inputs
- Verify edge cases and error conditions
- Ensure mathematical accuracy

### Integration Testing
- **Game loop and state management**
- Test complete game flows
- Verify state transitions work correctly
- Test save/load functionality

### Performance Testing
- **Frame rate and memory usage monitoring**
- Test performance under various conditions
- Verify optimization strategies work
- Monitor for memory leaks

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Getting Started
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

#### Styling
- **Styles**: Add new SCSS files in `src/styles/` following the organized structure (see SCSS File Organization section)

All new content automatically integrates with the existing systems and UI components through the modular architecture.

## 📋 Code Review Process

### Review Checklist
- All changes require review
- Maintain code style consistency
- Ensure performance impact is minimal
- Update documentation as needed
- Verify tests pass
- Check for proper error handling
- Validate TypeScript types
- Ensure accessibility compliance

### Review Guidelines
- **Functionality**: Does the code work as intended?
- **Performance**: Are there any performance implications?
- **Maintainability**: Is the code easy to understand and modify?
- **Testing**: Are there adequate tests for the changes?
- **Documentation**: Is the documentation updated appropriately?
- **Error Handling**: Are errors handled gracefully?
- **Type Safety**: Are TypeScript types properly defined?
