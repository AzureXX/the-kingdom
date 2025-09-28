/**
 * Circular buffer implementation for performance monitoring
 * Optimized for efficient historical data operations
 */

export class CircularBuffer<T> {
  protected buffer: T[];
  protected head: number = 0;
  protected tail: number = 0;
  protected count: number = 0;
  protected readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  /**
   * Get the number of items in the buffer (property accessor)
   */
  get length(): number {
    return this.count;
  }

  /**
   * Check if the buffer is empty (property accessor)
   */
  get isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Check if the buffer is full (property accessor)
   */
  get isFull(): boolean {
    return this.count === this.capacity;
  }

  /**
   * Add an item to the buffer
   */
  push(item: T): void {
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    
    if (this.count < this.capacity) {
      this.count++;
    } else {
      // Buffer is full, move head forward
      this.head = (this.head + 1) % this.capacity;
    }
  }


  /**
   * Get all items in the buffer as an array
   */
  toArray(): T[] {
    if (this.isEmpty) {
      return [];
    }

    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      result.push(this.buffer[index]);
    }
    return result;
  }

  /**
   * Get the average of numeric values in the buffer
   */
  getAverage(): number {
    if (this.isEmpty) {
      return 0;
    }

    let sum = 0;
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      sum += this.buffer[index] as unknown as number;
    }
    return sum / this.count;
  }

  /**
   * Get the latest item in the buffer
   */
  getLatest(): T | undefined {
    if (this.isEmpty) {
      return undefined;
    }
    const index = (this.tail - 1 + this.capacity) % this.capacity;
    return this.buffer[index];
  }

  /**
   * Clear the buffer
   */
  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  /**
   * Get buffer statistics for debugging
   */
  getStats(): {
    capacity: number;
    count: number;
    head: number;
    tail: number;
    isFull: boolean;
    isEmpty: boolean;
  } {
    return {
      capacity: this.capacity,
      count: this.count,
      head: this.head,
      tail: this.tail,
      isFull: this.isFull,
      isEmpty: this.isEmpty
    };
  }
}

/**
 * Specialized circular buffer for performance monitoring
 * Pre-configured for common performance metrics
 */
export class PerformanceCircularBuffer extends CircularBuffer<number> {
  constructor(capacity: number = 100) {
    super(capacity);
  }

  /**
   * Get the standard deviation of values in the buffer
   */
  getStandardDeviation(): number {
    if (this.isEmpty || this.count === 1) {
      return 0;
    }

    const mean = this.getAverage();
    let sumSquaredDiffs = 0;
    
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      const value = this.buffer[index] as unknown as number;
      const diff = value - mean;
      sumSquaredDiffs += diff * diff;
    }
    
    // Use sample standard deviation (n-1) for consistency with test expectations
    return Math.sqrt(sumSquaredDiffs / (this.count - 1));
  }

  /**
   * Get the minimum value in the buffer
   */
  getMin(): number {
    if (this.isEmpty) {
      return 0;
    }

    let min = this.buffer[this.head] as unknown as number;
    for (let i = 1; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      const value = this.buffer[index] as unknown as number;
      if (value < min) {
        min = value;
      }
    }
    return min;
  }

  /**
   * Get the maximum value in the buffer
   */
  getMax(): number {
    if (this.isEmpty) {
      return 0;
    }

    let max = this.buffer[this.head] as unknown as number;
    for (let i = 1; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      const value = this.buffer[index] as unknown as number;
      if (value > max) {
        max = value;
      }
    }
    return max;
  }
}