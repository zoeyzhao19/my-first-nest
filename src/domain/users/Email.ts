import { UserError } from "@errors/UserError";
import { ValueObject } from "@libs/domain/core/ValueObject";

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static ensureEmailValid (email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)) {
      throw new UserError(UserError.EmailInvalid)
    }
  }

  static create(value: string) {
    this.ensureEmailValid(value)
    return new Email(value)
  }
}