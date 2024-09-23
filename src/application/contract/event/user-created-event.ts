import { BaseEvent } from "./base-event";

export type UserCreatedEventPayload = {
  id: string;
  name: string;
  email: string;
};

export interface UserCreatedEvent extends BaseEvent<UserCreatedEventPayload> {}
