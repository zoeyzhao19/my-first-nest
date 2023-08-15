import { UserError } from "@errors/UserError"
import { ValueObject } from "@libs/domain/core/ValueObject"

export class Username extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan50Characters(value)
  }

  private ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50)
      throw new UserError(UserError.UsernameLengthExceeded)
  }
}