import { 
  handleGameError, 
  createErrorHandler,
  createValidationErrorHandler, 
  createCalculationErrorHandler, 
  createStateErrorHandler,
  logMessage,
  logInvalidKey,
  logSaveOperation,
  logErrorBoundaryOperation
} from '@/lib/game/utils/error'

// Mock console methods to avoid noise in tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation()
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation()
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()

describe('errorLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    mockConsoleError.mockRestore()
    mockConsoleWarn.mockRestore()
    mockConsoleLog.mockRestore()
  })

  describe('handleGameError', () => {
    it('should log error with category and details', () => {
      const error = new Error('Test error')
      const details = { key: 'test', value: 123 }
      
      const result = handleGameError(error, 'validation', 'testContext', details)
      
      expect(result.message).toBe('Test error')
      expect(result.category).toBe('validation')
      expect(result.context).toBe('testContext')
      expect(result.details).toEqual(details)
      expect(result.timestamp).toBeDefined()
      expect(result.stack).toBeDefined()
    })

    it('should handle string errors', () => {
      const error = 'String error message'
      
      const result = handleGameError(error, 'calculation', 'testContext')
      
      expect(result.message).toBe('String error message')
      expect(result.category).toBe('calculation')
      expect(result.context).toBe('testContext')
      expect(result.stack).toBeUndefined()
    })

    it('should handle errors without details', () => {
      const error = new Error('Test error')
      
      const result = handleGameError(error, 'state', 'testContext')
      
      expect(result.message).toBe('Test error')
      expect(result.category).toBe('state')
      expect(result.context).toBe('testContext')
      expect(result.details).toBeUndefined()
    })
  })

  describe('createErrorHandler', () => {
    it('should create a generic error handler with any category', () => {
      const handler = createErrorHandler('config', 'testConfig')
      const message = 'Config error'
      const details = { key: 'test' }
      
      const result = handler(message, details)
      
      expect(result.message).toBe('Config error')
      expect(result.category).toBe('config')
      expect(result.context).toBe('testConfig')
      expect(result.details).toEqual(details)
    })

    it('should create a system error handler', () => {
      const handler = createErrorHandler('system', 'testSystem')
      const message = 'System error'
      
      const result = handler(message)
      
      expect(result.message).toBe('System error')
      expect(result.category).toBe('system')
      expect(result.context).toBe('testSystem')
      expect(result.details).toBeUndefined()
    })

    it('should create a user error handler', () => {
      const handler = createErrorHandler('user', 'testUser')
      const message = 'User error'
      const details = { action: 'click' }
      
      const result = handler(message, details)
      
      expect(result.message).toBe('User error')
      expect(result.category).toBe('user')
      expect(result.context).toBe('testUser')
      expect(result.details).toEqual(details)
    })
  })

  describe('createValidationErrorHandler', () => {
    it('should create a validation error handler', () => {
      const handler = createValidationErrorHandler('testValidation')
      const message = 'Validation failed'
      const details = { field: 'test' }
      
      const result = handler(message, details)
      
      expect(result.message).toBe('Validation failed')
      expect(result.category).toBe('validation')
      expect(result.context).toBe('testValidation')
      expect(result.details).toEqual(details)
    })

    it('should handle errors without details', () => {
      const handler = createValidationErrorHandler('testValidation')
      const message = 'Validation failed'
      
      const result = handler(message)
      
      expect(result.message).toBe('Validation failed')
      expect(result.category).toBe('validation')
      expect(result.context).toBe('testValidation')
      expect(result.details).toBeUndefined()
    })
  })

  describe('createCalculationErrorHandler', () => {
    it('should create a calculation error handler', () => {
      const handler = createCalculationErrorHandler('testCalculation')
      const message = 'Calculation failed'
      const details = { operation: 'add', values: [1, 2] }
      
      const result = handler(message, details)
      
      expect(result.message).toBe('Calculation failed')
      expect(result.category).toBe('calculation')
      expect(result.context).toBe('testCalculation')
      expect(result.details).toEqual(details)
    })
  })

  describe('createStateErrorHandler', () => {
    it('should create a state error handler', () => {
      const handler = createStateErrorHandler('testState')
      const message = 'State update failed'
      const details = { stateKey: 'test', newValue: 123 }
      
      const result = handler(message, details)
      
      expect(result.message).toBe('State update failed')
      expect(result.category).toBe('state')
      expect(result.context).toBe('testState')
      expect(result.details).toEqual(details)
    })
  })

  describe('logMessage', () => {
    it('should log error level messages', () => {
      logMessage('Test error', { level: 'error', context: 'test' })
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('[TEST] Test error'),
        '' // Empty string when no details provided
      )
    })

    it('should log warn level messages', () => {
      logMessage('Test warning', { level: 'warn', context: 'test' })
      
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('[TEST] Test warning'),
        '' // Empty string when no details provided
      )
    })

    it('should log info level messages', () => {
      logMessage('Test info', { level: 'log', context: 'test' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[TEST] Test info'),
        '' // Empty string when no details provided
      )
    })
  })

  describe('logInvalidKey', () => {
    it('should log invalid key warnings', () => {
      logInvalidKey('invalidKey', 'resource', 'testContext')
      
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Invalid resource key: invalidKey'),
        expect.objectContaining({ key: 'invalidKey', expectedType: 'resource' })
      )
    })
  })

  describe('logSaveOperation', () => {
    it('should log successful save operations', () => {
      logSaveOperation('save game', true, { file: 'test.json' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('✅ save game completed successfully'),
        expect.objectContaining({ file: 'test.json' })
      )
    })

    it('should log failed save operations', () => {
      logSaveOperation('save game', false, { error: 'permission denied' })
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('❌ save game failed'),
        expect.objectContaining({ error: 'permission denied' })
      )
    })
  })

  describe('logErrorBoundaryOperation', () => {
    it('should log successful error boundary operations', () => {
      logErrorBoundaryOperation('recover from error', true, { component: 'GameScene' })
      
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('✅ recover from error completed successfully'),
        expect.objectContaining({ component: 'GameScene' })
      )
    })

    it('should log failed error boundary operations', () => {
      logErrorBoundaryOperation('recover from error', false, { error: 'recovery failed' })
      
      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('❌ recover from error failed'),
        expect.objectContaining({ error: 'recovery failed' })
      )
    })
  })
})