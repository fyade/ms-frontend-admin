import { ref } from "vue";

type EventCallback<T> = (data: T) => void

class EventBus {
  private events = ref<{ [eventName: string]: EventCallback<any>[] }>({})

  emit<T>(eventName: string, data?: T): void {
    const callbacks = this.events.value[eventName]
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  on<T>(eventName: string, callback: EventCallback<T>): void {
    if (!this.events.value[eventName]) {
      this.events.value[eventName] = []
    }
    this.events.value[eventName].push(callback)
  }
}

export default new EventBus()
