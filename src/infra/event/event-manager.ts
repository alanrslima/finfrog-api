import { EventEmitter } from "events";

class EventManager extends EventEmitter {
  private static instance: EventManager;

  private constructor() {
    super();
  }

  public static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }
}

export default EventManager.getInstance();
