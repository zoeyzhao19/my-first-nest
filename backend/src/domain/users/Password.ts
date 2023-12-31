import { UserError } from "@errors/UserError"
import { ValueObject } from "@libs/domain/core/ValueObject"
import crypto from 'crypto'

export class Password extends ValueObject<string> {
  constructor(value: string) {
    Password.ensureLengthIsLessThan20Characters(value)
    super(Password.encrypt(value))
  }

  static encrypt(value: string) {
    const hash = crypto.createHash('md5');
    hash.update(value);
    return hash.digest('hex');
  }

  static ensureLengthIsLessThan20Characters(value: string): void {
    if (value.length > 20)
      throw new UserError(UserError.PasswordLengthExceeded)
  }

  static create(value: string) {
    return new Password(value)
  }
}