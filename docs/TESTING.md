# 🧪 Testing Documentation

This document provides comprehensive information about the testing infrastructure and strategies used in Medieval Kingdom.

## 🧪 Testing Infrastructure

The project includes a comprehensive testing infrastructure built with Jest and React Testing Library.

### Test Coverage

**Current Status**: ✅ **82 passing tests** covering core game functionality

#### **Test Categories**
- **Core Utilities**: String utilities, number formatting, validation functions
- **Error Handling**: Centralized error logging and handling systems
- **Resource Management**: Resource calculations, updates, and validation
- **Game Logic**: Core game calculations and state management

## 🏃‍♂️ Running Tests

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

## 📁 Test Structure

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

## 🛠️ Writing Tests

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

## 🎯 Testing Strategy

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

## 🧪 Test Utilities

### Test Helpers
The project provides comprehensive test utilities in `src/__tests__/utils/`:

- **`testHelpers.ts`**: Game state creation helpers
- **`mockData.ts`**: Mock game data for testing
- **`index.ts`**: Test utility exports

### Mock Data
Mock data is available for:
- Game states with various configurations
- Resource states with different values
- Building and technology states
- Event and achievement states

### Test Patterns
Common testing patterns used throughout the project:

```typescript
// Testing game state functions
describe('Game State Function', () => {
  it('should handle valid input', () => {
    const state = createTestGameState()
    const result = gameFunction(state)
    expect(result).toBeDefined()
  })

  it('should handle invalid input gracefully', () => {
    const result = gameFunction(null)
    expect(result).toBeDefined()
  })
})

// Testing calculation functions
describe('Calculation Function', () => {
  it('should calculate correctly', () => {
    const input = { gold: 100, wood: 50 }
    const result = calculateFunction(input)
    expect(result).toBe(expectedValue)
  })
})
```

## 📊 Test Coverage Goals

### Current Coverage
- **Core Utilities**: 100% coverage
- **Game Logic**: 95% coverage
- **Error Handling**: 100% coverage
- **Resource Management**: 90% coverage

### Coverage Targets
- **Overall Coverage**: Maintain above 90%
- **Critical Paths**: 100% coverage for game loop and save system
- **New Features**: 100% coverage required for new functionality
- **Bug Fixes**: Tests required for all bug fixes

## 🔧 Test Configuration

### Jest Configuration
The project uses Jest with the following configuration:
- **Test Environment**: jsdom for React component testing
- **Setup Files**: Custom setup for test environment
- **Coverage**: Comprehensive coverage reporting
- **Watch Mode**: Automatic test re-running during development

### Test Scripts
Available test scripts in `package.json`:
- `test`: Run all tests once
- `test:watch`: Run tests in watch mode
- `test:coverage`: Run tests with coverage report
- `test:ci`: Run tests in CI environment

## 🚀 Continuous Integration

### Automated Testing
- **Pre-commit Hooks**: Tests run before commits
- **Pull Request Checks**: All tests must pass
- **Coverage Requirements**: Minimum coverage thresholds enforced
- **Performance Tests**: Performance regression detection

### Test Environment
- **Node.js**: Version 18+ required
- **Dependencies**: All test dependencies included
- **Mocking**: Comprehensive mocking for external dependencies
- **Isolation**: Tests run in isolated environments

## 📝 Writing Effective Tests

### Test Naming
- Use descriptive test names that explain the scenario
- Follow the pattern: "should [expected behavior] when [condition]"
- Group related tests in describe blocks

### Test Structure
- **Arrange**: Set up test data and conditions
- **Act**: Execute the function or action being tested
- **Assert**: Verify the expected outcome

### Best Practices
- **Test one thing at a time**: Each test should verify a single behavior
- **Use meaningful assertions**: Assertions should clearly express expectations
- **Mock external dependencies**: Isolate the code under test
- **Test edge cases**: Include tests for boundary conditions and error cases
- **Keep tests simple**: Tests should be easy to understand and maintain

## 🐛 Debugging Tests

### Common Issues
- **Async operations**: Use proper async/await patterns
- **State mutations**: Ensure tests don't modify shared state
- **Mock setup**: Verify mocks are properly configured
- **Timing issues**: Use proper timing utilities for time-based tests

### Debugging Tools
- **Jest Debug Mode**: Use `--detectOpenHandles` for debugging
- **Console Logging**: Add temporary logs for debugging
- **Test Isolation**: Run individual tests to isolate issues
- **Coverage Reports**: Use coverage to identify untested code paths
