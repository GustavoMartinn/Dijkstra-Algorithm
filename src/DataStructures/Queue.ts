import { Cell } from './Matrix';

export class Queue {
  elements: {
    [key: string]: Cell;
  };
  head: number;
  tail: number;

  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element: Cell) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const element = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return element;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.elements[this.head];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.tail - this.head;
  }

  clear() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

}