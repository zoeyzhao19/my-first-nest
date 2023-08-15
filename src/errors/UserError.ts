import { AppError } from "./AppError";

export class UserError extends AppError {
  static UsernameLengthExceeded = '用户名长度不能超过50个字符'
  static PasswordLengthExceeded = '密码长度不能超过50个字符'
  static NicknameLengthExceeded = '昵称长度不能超过50个字符'
  static EmailInvalid = '邮箱格式不正确'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}