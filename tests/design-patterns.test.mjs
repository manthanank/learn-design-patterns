import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Singleton Pattern Invariants', () => {
  class ConnectionPool {
    static instance = null;
    constructor() {
      if (ConnectionPool.instance) {
        return ConnectionPool.instance;
      }
      this.connected = true;
      ConnectionPool.instance = this;
    }
  }

  it('guarantees identical reference identity across calls', () => {
    const pool1 = new ConnectionPool();
    const pool2 = new ConnectionPool();

    assert.equal(pool1, pool2);
  });
});

describe('Observer Pattern Event Dispatch', () => {
  class EventEmitter {
    constructor() {
      this.listeners = [];
    }
    subscribe(fn) {
      this.listeners.push(fn);
    }
    emit(data) {
      for (const fn of this.listeners) fn(data);
    }
  }

  it('notifies all subscribers synchronously upon event trigger', () => {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.subscribe((val) => { count += val; });
    emitter.subscribe((val) => { count += val * 2; });

    emitter.emit(5); // 5 + 10 = 15
    assert.equal(count, 15);
  });
});

describe('Composite Pattern Hierarchical Aggregation', () => {
  class File {
    constructor(size) {
      this.size = size;
    }
    getSize() {
      return this.size;
    }
  }

  class Directory {
    constructor() {
      this.children = [];
    }
    add(item) {
      this.children.push(item);
      return this;
    }
    getSize() {
      return this.children.reduce((acc, c) => acc + c.getSize(), 0);
    }
  }

  it('correctly aggregates recursive tree sizes uniformly', () => {
    const root = new Directory();
    const sub = new Directory();

    root.add(new File(100));
    sub.add(new File(50)).add(new File(75));
    root.add(sub);

    assert.equal(root.getSize(), 225);
  });
});
