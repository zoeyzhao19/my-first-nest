import { AppError } from "./AppError";

export class RoleError extends AppError {
  static RoleNoFound = '角色 {role} 不存在'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}