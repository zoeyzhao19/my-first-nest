import { AppError } from "./AppError";

export class UserError extends AppError {
  static UsernameLengthExceeded = '用户名长度不能超过50个字符'
  static PasswordLengthExceeded = '密码长度不能超过50个字符'
  static NicknameLengthExceeded = '昵称长度不能超过50个字符'
  static EmailInvalid = '邮箱格式不正确'
  static UsernameOrEmailExisted = '用户名 {username} 或邮箱 {email} 已存在'
  static CaptchaExpired = '验证码已失效'
  static CaptchaIncorrect = '验证码不正确'
  static UserNoExist = '用户不存在'
  static PasswordError = '密码错误'
  static OldPasswordError = '旧密码错误'
  static UserAlreadyFrozen = '该用户已是冻结状态'
  static UserAlreadyUnfrozen = '该用户未被冻结'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}