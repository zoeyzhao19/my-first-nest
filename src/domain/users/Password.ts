import { UserError } from "@errors/UserError"
import { ValueObject } from "@libs/domain/core/ValueObject"

export class Password extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan20Characters(value)
  }

  private ensureLengthIsLessThan20Characters(value: string): void {
    if (value.length > 20)
      throw new UserError(UserError.PasswordLengthExceeded)
  }
}