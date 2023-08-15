import { UserError } from "@errors/UserError"
import { ValueObject } from "@libs/domain/core/ValueObject"

export class Nickname extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  static ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50)
      throw new UserError(UserError.NicknameLengthExceeded)
  }

  static create(value: string) {
    this.ensureLengthIsLessThan50Characters(value)
    return new Nickname(value)
  }
}