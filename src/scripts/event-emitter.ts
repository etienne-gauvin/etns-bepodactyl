export default class EventEmitter {
  private readonly events: Map<string, Set<() => void>> = new Map();

  public on(event: string, listener: () => void) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(listener);
  }

  public removeListener(event: string, listener: () => void) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }

  public emit(event: string, ...args: unknown[]) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener.apply(this, args);
      }
    }
  }

  public once(event: string, listener: () => void) {
    this.on(event, function fn(...args: unknown[]) {
      this.removeListener(event, fn);
      listener.apply(this, args);
    });
  }
}
