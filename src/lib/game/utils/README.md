# Game Utilities Documentation

This directory contains utility functions and classes that provide common functionality across the Medieval Kingdom game.

## 📁 File Structure

### Core Utilities
- **`index.ts`** - Main export file for all utilities
- **`numberUtils.ts`** - Number formatting and manipulation utilities
- **`stringUtils.ts`** - String processing and encoding utilities
- **`performanceUtils.ts`** - Performance monitoring and optimization utilities

### Game-Specific Utilities
- **`actionValidation.ts`** - Action validation and checking logic
- **`loopActionCalculations.ts`** - Loop action progress and efficiency calculations
- **`validationUtils.ts`** - Comprehensive configuration validation system
- **`errorLogger.ts`** - Centralized error handling and logging

## 🚀 Quick Start

```typescript
import { 
  formatNumber, 
  safeJsonParse, 
  debounce,
  validateGameConfig 
} from '@/lib/game/utils';

// Format large numbers
const formatted = formatNumber(1234567); // "1.23M"

// Safely parse JSON
const data = safeJsonParse('{"key": "value"}', {});

// Debounce function calls
const debouncedFn = debounce(() => console.log('debounced'), 300);

// Validate game configuration
const validation = validateGameConfig(gameConfig);
```

## 📊 Utility Categories

### Number Utilities (`numberUtils.ts`)
Provides functions for number manipulation and formatting.

#### `clamp(value, min, max)`
Clamps a numeric value between minimum and maximum bounds.

```typescript
clamp(15, 0, 10);    // Returns 10
clamp(-5, 0, 10);    // Returns 0
clamp(7, 0, 10);     // Returns 7
```

#### `formatNumber(n, dec?)`
Formats large numbers using K/M/B/T notation for readability.

```typescript
formatNumber(1234);           // "1.23K"
formatNumber(1234567);        // "1.23M"
formatNumber(1234567890);     // "1.23B"
formatNumber(123, 2);         // "123.00"
```

### String Utilities (`stringUtils.ts`)
Handles string processing, JSON parsing, and encoding operations.

#### `safeJsonParse(json, fallback)`
Safely parses JSON with error handling and fallback values.

```typescript
const data = safeJsonParse('{"name": "John"}', { name: 'Default' });
// Returns: { name: 'John' }

const invalid = safeJsonParse('invalid json', { name: 'Default' });
// Returns: { name: 'Default' }
```

#### `encodeBase64(str)` / `decodeBase64(str)`
Base64 encoding/decoding with environment detection.

```typescript
const encoded = encodeBase64('Hello World');     // "SGVsbG8gV29ybGQ="
const decoded = decodeBase64('SGVsbG8gV29ybGQ='); // "Hello World"
```

### Performance Utilities (`performanceUtils.ts`)
Performance optimization and monitoring utilities.

#### `debounce(func, wait)`
Creates a debounced version of a function to limit execution frequency.

```typescript
const debouncedSearch = debounce(searchFunction, 300);
// Only executes after 300ms of inactivity
```

#### `throttle(func, limit)`
Creates a throttled version of a function to limit execution rate.

```typescript
const throttledScroll = throttle(scrollHandler, 100);
// Executes at most once every 100ms
```

#### `calculateMovingAverage(values, windowSize?)`
Calculates moving average for performance metrics.

```typescript
const avg = calculateMovingAverage([1, 2, 3, 4, 5], 3); // 4 (average of last 3)
```

#### `checkPerformanceBudget(metrics, budget)`
Checks if performance metrics are within budget constraints.

```typescript
const budget = {
  maxTickTime: 16.67,
  maxRenderTime: 8.33,
  minFPS: 30,
  maxMemoryUsage: 100 * 1024 * 1024
};

const result = checkPerformanceBudget(currentMetrics, budget);
if (!result.withinBudget) {
  console.warn('Performance budget exceeded:', result.violations);
}
```

### Action Validation (`actionValidation.ts`)
Comprehensive action validation system using a class-based approach.

#### `ActionValidator.canExecuteAction(state, actionKey)`
Checks if an action can be executed based on current game state.

```typescript
const canExecute = ActionValidator.canExecuteAction(gameState, 'gatherWood');
```

#### `ActionValidator.isActionUnlocked(state, actionKey)`
Checks if an action is unlocked based on unlock conditions.

```typescript
const isUnlocked = ActionValidator.isActionUnlocked(gameState, 'sellWood');
```

### Loop Action Calculations (`loopActionCalculations.ts`)
Calculates progress, efficiency, and statistics for loop actions.

#### `calculateProgress(action)`
Calculates current progress and time estimates for a loop action.

```typescript
const progress = calculateProgress(loopActionState);
// Returns: { progressPercentage: 75, timeRemaining: 1.25, ... }
```

#### `calculateLoopActionEfficiency(action)`
Calculates efficiency score for a loop action.

```typescript
const efficiency = calculateLoopActionEfficiency(loopActionState);
// Returns: 0.5 (points per millisecond)
```

### Configuration Validation (`validationUtils.ts`)
Comprehensive validation system for game configuration.

#### `validateGameConfig(config)`
Validates entire game configuration for errors and warnings.

```typescript
const validation = validateGameConfig({
  resources: RESOURCES,
  buildings: BUILDINGS,
  technologies: TECHNOLOGIES,
  actions: ACTIONS
});

if (!validation.isValid) {
  console.error('Configuration errors:', validation.errors);
}
```

#### `formatValidationResults(results)`
Formats validation results for human-readable display.

```typescript
const formatted = formatValidationResults(validation);
console.log(formatted);
```

### Error Logging (`errorLogger.ts`)
Centralized error handling and logging system.

#### `handleGameError(error, category, context, details?)`
Handles game errors with categorization and logging.

```typescript
try {
  // ... game logic
} catch (error) {
  handleGameError(error, 'calculation', 'resourceCalculation', { resource: 'gold' });
}
```

#### `createValidationErrorHandler(context)`
Creates specialized error handlers for different contexts.

```typescript
const validationHandler = createValidationErrorHandler('resourceValidation');
const error = validationHandler('Invalid resource key', { key: 'invalid' });
```

## 🔧 Best Practices

### Error Handling
- Always use the centralized error logging system
- Categorize errors appropriately for better debugging
- Provide context and details for errors

### Performance
- Use debounce/throttle for frequent operations
- Monitor performance with the built-in utilities
- Set appropriate performance budgets

### Validation
- Validate configuration on startup
- Use type-safe validation functions
- Handle validation results gracefully

### Documentation
- All functions include comprehensive JSDoc
- Examples show common usage patterns
- Remarks explain important implementation details

## 📝 Adding New Utilities

When adding new utility functions:

1. **Follow the existing pattern** - Use comprehensive JSDoc documentation
2. **Include examples** - Show common usage patterns
3. **Add to index.ts** - Export new functions for easy importing
4. **Update this README** - Document new functionality
5. **Include tests** - Ensure reliability and correctness

## 🚨 Common Issues

### Import Errors
```typescript
// ❌ Wrong - direct import
import { formatNumber } from './utils/numberUtils';

// ✅ Correct - from index
import { formatNumber } from './utils';
```

### Type Safety
```typescript
// ❌ Wrong - no type checking
const key = 'invalid';

// ✅ Correct - use validation functions
if (isValidResourceKey(key)) {
  // key is now typed as ResourceKey
}
```

### Performance Monitoring
```typescript
// ❌ Wrong - no performance tracking
function expensiveOperation() {
  // ... heavy computation
}

// ✅ Correct - with performance monitoring
const debouncedOperation = debounce(expensiveOperation, 100);
```

## 📚 Additional Resources

- **TypeScript Documentation**: [typescriptlang.org](https://www.typescriptlang.org/)
- **JSDoc Reference**: [jsdoc.app](https://jsdoc.app/)
- **Performance Best Practices**: [web.dev/performance](https://web.dev/performance/)
- **Error Handling Patterns**: [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
