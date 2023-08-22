import { AppError } from "./AppError"

export class PermissionError extends AppError {
  static PermissionCodeLengthExceeded = '权限码不能超过20个字符长度'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}
