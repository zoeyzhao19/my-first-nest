import { UserError } from "@errors/UserError"
import { ValueObject } from "@libs/domain/core/ValueObject"

export class Username extends ValueObject<string> {
  constructor(value: string) {
    Username.ensureLengthIsLessThan50Characters(value)
    super(value)
  }

  static ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50)
      throw new UserError(UserError.UsernameLengthExceeded)
  }

  static create(value: string) {
    return new Username(value)
  }
}