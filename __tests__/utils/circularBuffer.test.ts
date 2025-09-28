import { CircularBuffer, PerformanceCircularBuffer } from '@/lib/game/utils/performance/circularBuffer';

describe('CircularBuffer', () => {
  let buffer: CircularBuffer<number>;

  beforeEach(() => {
    buffer = new CircularBuffer<number>(3);
  });

  describe('Basic Operations', () => {
    it('should start empty', () => {
      expect(buffer.isEmpty).toBe(true);
      expect(buffer.length).toBe(0);
      expect(buffer.isFull).toBe(false);
    });

    it('should add items correctly', () => {
      buffer.push(1);
      expect(buffer.length).toBe(1);
      expect(buffer.isEmpty).toBe(false);
      expect(buffer.isFull).toBe(false);
    });

    it('should fill to capacity', () => {
      buffer.push(1);
      buffer.push(2);
      buffer.push(3);
      expect(buffer.length).toBe(3);
      expect(buffer.isFull).toBe(true);
    });

    it('should overwrite oldest items when full', () => {
      buffer.push(1);
      buffer.push(2);
      buffer.push(3);
      buffer.push(4); // Should overwrite 1
      
      expect(buffer.length).toBe(3);
      expect(buffer.isFull).toBe(true);
      
      const items = buffer.toArray();
      expect(items).toEqual([2, 3, 4]);
    });
  });

  describe('Array Conversion', () => {
    it('should return items in chronological order', () => {
      buffer.push(1);
      buffer.push(2);
      buffer.push(3);
      
      expect(buffer.toArray()).toEqual([1, 2, 3]);
    });

    it('should handle overwrites correctly', () => {
      buffer.push(1);
      buffer.push(2);
      buffer.push(3);
      buffer.push(4);
      buffer.push(5);
      
      expect(buffer.toArray()).toEqual([3, 4, 5]);
    });
  });

  describe('Latest Item', () => {
    it('should return the most recently added item', () => {
      buffer.push(1);
      expect(buffer.getLatest()).toBe(1);
      
      buffer.push(2);
      expect(buffer.getLatest()).toBe(2);
    });

    it('should return undefined when empty', () => {
      expect(buffer.getLatest()).toBeUndefined();
    });
  });

  describe('Clear', () => {
    it('should clear all items', () => {
      buffer.push(1);
      buffer.push(2);
      buffer.clear();
      
      expect(buffer.isEmpty).toBe(true);
      expect(buffer.length).toBe(0);
    });
  });
});

describe('PerformanceCircularBuffer', () => {
  let buffer: PerformanceCircularBuffer;

  beforeEach(() => {
    buffer = new PerformanceCircularBuffer(5);
  });

  describe('Average Calculation', () => {
    it('should calculate average correctly', () => {
      buffer.push(10);
      buffer.push(20);
      buffer.push(30);
      
      expect(buffer.getAverage()).toBe(20);
    });

    it('should return 0 for empty buffer', () => {
      expect(buffer.getAverage()).toBe(0);
    });
  });

  describe('Min/Max Calculation', () => {
    it('should find minimum value', () => {
      buffer.push(10);
      buffer.push(5);
      buffer.push(15);
      
      expect(buffer.getMin()).toBe(5);
    });

    it('should find maximum value', () => {
      buffer.push(10);
      buffer.push(5);
      buffer.push(15);
      
      expect(buffer.getMax()).toBe(15);
    });

    it('should handle single value', () => {
      buffer.push(42);
      expect(buffer.getMin()).toBe(42);
      expect(buffer.getMax()).toBe(42);
    });
  });

  describe('Standard Deviation', () => {
    it('should calculate standard deviation correctly', () => {
      buffer.push(2);
      buffer.push(4);
      buffer.push(4);
      buffer.push(4);
      buffer.push(5);
      
      // Mean = 3.8, expected std dev ≈ 1.095
      const stdDev = buffer.getStandardDeviation();
      expect(stdDev).toBeCloseTo(1.095, 2);
    });

    it('should return 0 for single value', () => {
      buffer.push(10);
      expect(buffer.getStandardDeviation()).toBe(0);
    });

    it('should return 0 for empty buffer', () => {
      expect(buffer.getStandardDeviation()).toBe(0);
    });
  });

  describe('Overwrite Behavior', () => {
    it('should maintain correct statistics after overwrites', () => {
      // Fill buffer
      buffer.push(1);
      buffer.push(2);
      buffer.push(3);
      buffer.push(4);
      buffer.push(5);
      
      // Overwrite with new values
      buffer.push(10);
      buffer.push(20);
      
      // Should only consider the last 5 values: [3, 4, 5, 10, 20]
      expect(buffer.getAverage()).toBe(8.4);
      expect(buffer.getMin()).toBe(3);
      expect(buffer.getMax()).toBe(20);
    });
  });
});
