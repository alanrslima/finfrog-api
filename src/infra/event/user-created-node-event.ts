import {
  UserCreatedEvent,
  UserCreatedEventPayload,
} from "../../application/contract/event/user-created-event";
import eventManager from "./event-manager";

export class UserCreatedNodeEvent implements UserCreatedEvent {
  eventName: string = "user:created";

  async emit(payload: UserCreatedEventPayload): Promise<boolean> {
    return eventManager.emit(this.eventName, payload);
  }

  async on(
    callback: (payload: UserCreatedEventPayload) => void
  ): Promise<void> {
    eventManager.on(this.eventName, callback);
  }
}
