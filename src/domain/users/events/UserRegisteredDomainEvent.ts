import { DomainEvent } from "@libs/domain/core/DomainEvent";
import { User } from "../User";

export class UserRegisteredDomainEvent extends DomainEvent {
  static EVENT_NAME = 'user.registered'

  user: User

  constructor(user: User) {
    super(UserRegisteredDomainEvent.EVENT_NAME)
    this.user = user
  }
}