/**
 * Circular buffer implementation for efficient historical data storage
 * Replaces growing arrays with fixed-size circular buffers to prevent memory growth
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
   * Add an item to the buffer
   * If buffer is full, overwrites the oldest item
   */
  push(item: T): void {
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    
    if (this.count < this.capacity) {
      this.count++;
    } else {
      // Buffer is full, move head to next position
      this.head = (this.head + 1) % this.capacity;
    }
  }

  /**
   * Get the number of items in the buffer
   */
  get length(): number {
    return this.count;
  }

  /**
   * Check if buffer is empty
   */
  get isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Check if buffer is full
   */
  get isFull(): boolean {
    return this.count === this.capacity;
  }

  /**
   * Get all items in the buffer as an array
   * Returns items in chronological order (oldest first)
   */
  toArray(): T[] {
    if (this.isEmpty) return [];
    
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      result.push(this.buffer[index]);
    }
    return result;
  }

  /**
   * Get the average of all numeric values in the buffer
   */
  getAverage(): number {
    if (this.isEmpty) return 0;
    
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
    if (this.isEmpty) return undefined;
    const index = (this.tail - 1 + this.capacity) % this.capacity;
    return this.buffer[index];
  }

  /**
   * Clear all items from the buffer
   */
  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  /**
   * Get the capacity of the buffer
   */
  getCapacity(): number {
    return this.capacity;
  }
}

/**
 * Specialized circular buffer for performance metrics
 */
export class PerformanceCircularBuffer extends CircularBuffer<number> {
  constructor(capacity: number = 100) {
    super(capacity);
  }

  /**
   * Get the average of all values in the buffer
   */
  getAverage(): number {
    return super.getAverage();
  }

  /**
   * Get the minimum value in the buffer
   */
  getMin(): number {
    if (this.isEmpty) return 0;
    
    let min = this.buffer[this.head];
    for (let i = 1; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      min = Math.min(min, this.buffer[index]);
    }
    return min;
  }

  /**
   * Get the maximum value in the buffer
   */
  getMax(): number {
    if (this.isEmpty) return 0;
    
    let max = this.buffer[this.head];
    for (let i = 1; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      max = Math.max(max, this.buffer[index]);
    }
    return max;
  }

  /**
   * Get the standard deviation of values in the buffer
   */
  getStandardDeviation(): number {
    if (this.count < 2) return 0;
    
    const average = this.getAverage();
    let sumSquaredDiffs = 0;
    
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      const diff = this.buffer[index] - average;
      sumSquaredDiffs += diff * diff;
    }
    
    return Math.sqrt(sumSquaredDiffs / (this.count - 1));
  }
}
