import { ValueObject } from "@libs/domain/core/ValueObject";
import { PermissionError } from "@errors/PermissionError";

export class Code extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan20Characters(value)
  }

  private ensureLengthIsLessThan20Characters(value: string): void {
    if (value.length > 20)
      throw new PermissionError(PermissionError.PermissionCodeLengthExceeded)
  }
}