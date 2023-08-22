import { DomainEvent } from "@libs/domain/core/DomainEvent";
import { User } from "../User";

export class UserRegisteredDomainEvent extends DomainEvent {
  user: User

  constructor(user: User) {
    super(user.id?.toString())
    this.user = user
  }
}