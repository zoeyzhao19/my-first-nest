import { UserError } from "@errors/UserError"
import { ValueObject } from "@libs/domain/core/ValueObject"

export class Nickname extends ValueObject<string> {
  constructor(value: string) {
    Nickname.ensureLengthIsLessThan50Characters(value)
    super(value)
  }

  static ensureLengthIsLessThan50Characters(value: string): void {
    if (value.length > 50)
      throw new UserError(UserError.NicknameLengthExceeded)
  }

  static create(value: string) {
    return new Nickname(value)
  }
}