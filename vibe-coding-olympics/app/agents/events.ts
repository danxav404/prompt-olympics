/** Small typed event primitive that can be replaced by WebSocket/SSE transports later. */
export class TypedEventEmitter<Events extends object> {
  private listeners = new Map<keyof Events, Set<(payload: never) => void>>();

  on<Type extends keyof Events>(type: Type, listener: (payload: Events[Type]) => void) {
    const listeners = this.listeners.get(type) ?? new Set<(payload: never) => void>();
    listeners.add(listener as (payload: never) => void);
    this.listeners.set(type, listeners);
    return () => listeners.delete(listener as (payload: never) => void);
  }

  emit<Type extends keyof Events>(type: Type, payload: Events[Type]) {
    this.listeners.get(type)?.forEach((listener) => listener(payload as never));
  }

  clear() {
    this.listeners.clear();
  }
}
