import { OnEvent } from "@nestjs/event-emitter";
import { UserRegisteredDomainEvent } from "src/domain/users/events/UserRegisteredDomainEvent";

export class OnUserRegistered {

  @OnEvent(UserRegisteredDomainEvent.EVENT_NAME)
  on(events: UserRegisteredDomainEvent[]) {

  }
}